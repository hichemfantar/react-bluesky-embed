import { useRouter } from "next/router";
import { EmbeddedPostThread, PostThreadSkeleton } from "react-bluesky-embed";
import { getPostThread, type PostThread } from "react-bluesky-embed/api";
import { PostThreadPage } from "../../../../components/postThread-page";

export async function getStaticProps({
  params,
}: {
  params: { did: string; rkey: string };
}) {
  try {
    const did = params.did;
    const rkey = params.rkey;
    const postThread = await getPostThread({
      did,
      rkey,
    });
    return postThread ? { props: { postThread } } : { notFound: true };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export default function Page({ postThread }: { postThread: PostThread }) {
  const { isFallback } = useRouter();

  return (
    <PostThreadPage footer>
      {isFallback ? (
        <PostThreadSkeleton />
      ) : (
        <EmbeddedPostThread postThread={postThread} />
      )}
    </PostThreadPage>
  );
}
