import { PostThread } from "react-bluesky-embed";
import { getPostThread } from "react-bluesky-embed/api";

type Props = {
  params: { postThread: string };
};

export const revalidate = 1800;

export async function generateMetadata({ params }: Props) {
  const did = params.postThread.split("-")[0];
  const rkey = params.postThread.split("-")[1];

  const postThread = await getPostThread({
    did,
    rkey,
  }).catch(() => undefined);

  if (!postThread) return { title: "Next PostThread" };

  const username = ` - @${postThread.user.screen_name}`;
  const maxLength = 68 - username.length;
  const text =
    postThread.text.length > maxLength
      ? `${postThread.text.slice(0, maxLength)}…`
      : postThread.text;

  return { title: `${text}${username}` };
}

export default function Page({ params }: Props) {
  const did = params.postThread.split("-")[0];
  const rkey = params.postThread.split("-")[1];

  return (
    <PostThread
      params={{
        did,
        rkey,
      }}
    />
  );
}
