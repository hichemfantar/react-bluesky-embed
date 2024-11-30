import { unstable_cache } from "next/cache";
import {
  getPostThread as _getPostThread,
  PostThreadParams,
} from "react-bluesky-embed/api";
import { EmbeddedPostThread, PostThreadNotFound } from "react-bluesky-embed";

const getPostThread = unstable_cache(
  async (params: PostThreadParams) => _getPostThread(params),
  ["postThread"],
  { revalidate: 3600 * 24 }
);

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
