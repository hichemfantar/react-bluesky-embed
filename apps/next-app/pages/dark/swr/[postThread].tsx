import { useRouter } from "next/router";
import { PostThread } from "react-bluesky-embed";
import { PostThreadPage } from "../../../components/postThread-page";

export default function Page() {
  const router = useRouter();
  // const query = router.query as ParsedUrlQuery & { postThread: string };
  const query = router.query;
  // throw new Error(JSON.stringify(query));

  if (!query.postThread || typeof query.postThread !== "string") {
    return <div>postThread not found</div>;
    // throw new Error("postThread is required");
  }

  const did = query.postThread.split("-")[0];
  const rkey = query.postThread.split("-")[1];

  return (
    <PostThreadPage>
      <PostThread
        params={{
          did,
          rkey,
        }}
      />
    </PostThreadPage>
  );
}
