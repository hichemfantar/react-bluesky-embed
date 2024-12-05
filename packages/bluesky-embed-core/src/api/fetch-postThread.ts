import { AppBskyFeedDefs, AtpAgent } from "@atproto/api";
import type {
  PostThread,
  PostThreadConfig,
  PostThreadParams,
} from "./types/index.js";

export class BlueskyApiError extends Error {
  status: number;
  data: any;

  constructor({
    message,
    status,
    data,
  }: {
    message: string;
    status: number;
    data: any;
  }) {
    super(message);
    this.name = "BlueskyApiError";
    this.status = status;
    this.data = data;
  }
}

const DEFAULT_URI =
  "at://did:plc:zl7kgfro2rx3pavbslhhdhuy/app.bsky.feed.post/3lblfjf4evs2v";

export async function fetchPostThread({
  params,
  config = {
    depth: 0,
    parentHeight: 0,
  },
}: {
  params: PostThreadParams;
  config?: PostThreadConfig;
}): Promise<{ data?: PostThread; notFound?: true; tombstone?: true }> {
  const agent = new AtpAgent({
    service: "https://public.api.bsky.app",
  });
  try {
    let atUri = DEFAULT_URI;

    atUri = `at://${decodeURIComponent(params.did)}/app.bsky.feed.post/${decodeURIComponent(params.rkey)}`;

    const { data } = await agent.getPostThread({
      uri: atUri,
      depth: config.depth ?? 0,
      parentHeight: config.parentHeight ?? 0,
    });

    if (!AppBskyFeedDefs.isThreadViewPost(data.thread)) {
      return { notFound: true };
    }
    const pwiOptOut = !!data.thread.post.author.labels?.find(
      (label) => label.val === "!no-unauthenticated"
    );
    if (pwiOptOut) {
      // return { tombstone: true };
      throw new BlueskyApiError({
        message:
          "The author of this post has requested their posts not be displayed on external sites.",
        status: 400,
        data: null,
      });
    }

    return { data: JSON.parse(JSON.stringify(data.thread)) };
  } catch (error) {
    console.error(error);

    throw new BlueskyApiError({
      message: error instanceof Error ? error.message : "Invalid Bluesky URL",
      status: 500,
      data: "null",
    });

    // return { notFound: true };
  }
}
