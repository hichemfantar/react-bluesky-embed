import { useRouter } from "next/router";
import { PostThread } from "react-bluesky-embed";
import { PostThreadPage } from "../../../../../components/postThread-page";

export default function Page() {
  const router = useRouter();

  const did = router.query.did;
  const rkey = router.query.rkey;

  // https://github.com/vercel/next.js/discussions/11484
  if (!router.isReady) {
    return null;
  }

  return (
    <PostThreadPage>
      <PostThread
        params={{
          did: Array.isArray(did) ? did[0] : did,
          rkey: Array.isArray(rkey) ? rkey[0] : rkey,
        }}
      />
    </PostThreadPage>
  );
}
