import { Suspense } from "react";
import { PostThreadSkeleton } from "react-bluesky-embed";
import PostThreadPage from "./postThread-page";

export const revalidate = 3600;

const Page = ({ params }: { params: { postThread: string } }) => {
  const did = params.postThread.split("-")[0];
  const rkey = params.postThread.split("-")[1];

  return (
    <Suspense fallback={<PostThreadSkeleton />}>
      <PostThreadPage
        params={{
          did,
          rkey,
        }}
      />
    </Suspense>
  );
};

export default Page;
