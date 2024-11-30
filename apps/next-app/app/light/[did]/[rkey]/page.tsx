import { PostThread } from "react-bluesky-embed";
import { getPostThread } from "react-bluesky-embed/api";

type Props = {
  params: { did: string; rkey: string };
};

export const revalidate = 1800;

export async function generateMetadata({ params }: Props) {
  const did = params.did;
  const rkey = params.rkey;

  const postThread = await getPostThread({
    did: did,
    rkey: rkey,
  }).catch(() => undefined);

  if (!postThread) return { title: "Next PostThread" };

  // const username = ` - @${postThread.user.screen_name}`;
  // const maxLength = 68 - username.length;
  // const text =
  //   postThread.text.length > maxLength
  //     ? `${postThread.text.slice(0, maxLength)}…`
  //     : postThread.text;

  return { title: `` };
  // return { title: `${text}${username}` };
}

export default function Page({ params }: Props) {
  const did = params.did;
  const rkey = params.rkey;

  return (
    <PostThread
      params={{
        did: did,
        rkey: rkey,
      }}
    />
  );
}
