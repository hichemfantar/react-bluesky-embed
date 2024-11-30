import { getPostThread, PostThreadParams } from "react-bluesky-embed/api";
import { EmbeddedPostThread, PostThreadNotFound } from "react-bluesky-embed";

const PostThreadPage = async ({ params }: { params: PostThreadParams }) => {
  const did = params.did.split("-")[0];
  const rkey = params.rkey.split("-")[1];

  try {
    const postThread = await getPostThread({
      did,
      rkey,
    });
    return postThread ? (
      <EmbeddedPostThread postThread={postThread} />
    ) : (
      <PostThreadNotFound theme={"light"} />
    );
  } catch (error) {
    console.error(error);
    return <PostThreadNotFound theme={"light"} error={error} />;
  }
};

export default PostThreadPage;
