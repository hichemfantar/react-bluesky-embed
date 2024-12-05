import { fetchPostThread } from "./fetch-postThread.js";
import type {
  PostThread,
  PostThreadConfig,
  PostThreadParams,
} from "./types/index.js";

export async function getPostThread(
  params: PostThreadParams,
  config?: PostThreadConfig
): Promise<PostThread | undefined> {
  const { data, notFound, tombstone } = await fetchPostThread({
    params,
    config,
  });

  if (notFound) {
    console.error(
      `The postThread ${JSON.stringify(params)} does not exist or has been deleted by the account owner. Update your code to remove this postThread when possible.`
    );
  } else if (tombstone) {
    console.error(
      `The postThread ${JSON.stringify(params)} has been made private by the account owner. Update your code to remove this thread post when possible.`
    );
  }

  return data;
}
