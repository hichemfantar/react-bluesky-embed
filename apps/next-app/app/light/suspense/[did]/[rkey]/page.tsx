import { Suspense } from "react";
import { PostThreadSkeleton } from "react-bluesky-embed";
import PostThreadPage from "./postThread-page";

export const revalidate = 3600;

const Page = ({ params }: { params: { did: string; rkey: string } }) => {
  const did = params.did;
  const rkey = params.rkey;

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
