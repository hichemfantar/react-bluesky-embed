import {
  fetchPostThread,
  PostThread,
  PostThreadParams,
} from "react-bluesky-embed/api";
import { EmbeddedPostThread, PostThreadNotFound } from "react-bluesky-embed";
import { kv } from "@vercel/kv";

async function getPostThread(params: {
  did: string;
  rkey: string;
}): Promise<PostThread | undefined> {
  const serializedParams = JSON.stringify(params);

  try {
    const { data, notFound } = await fetchPostThread({ params });

    if (data) {
      await kv.set(`postThread:${serializedParams}`, data);
      return data;
    } else if (notFound) {
      // remove the postThread from the cache if it has been made private by the author (tombstone)
      // or if it no longer exists.
      await kv.del(`postThread:${serializedParams}`);
    }
  } catch (error) {
    console.error("fetching the postThread failed with:", error);
  }

  const cachedPostThread = await kv.get<PostThread>(
    `postThread:${serializedParams}`
  );
  return cachedPostThread ?? undefined;
}

const PostThreadPage = async ({ params }: { params: PostThreadParams }) => {
  try {
    const postThread = await getPostThread(params);
    return postThread ? (
      <EmbeddedPostThread postThread={postThread} />
    ) : (
      <PostThreadNotFound theme="light" />
    );
  } catch (error) {
    console.error(error);
    return <PostThreadNotFound theme="light" error={error} />;
  }
};

export default PostThreadPage;
