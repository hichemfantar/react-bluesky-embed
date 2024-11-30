import type { PostThread } from "../api/index.js";
import { Post } from "./post.js";
import "../main.css";
import { Theme } from "../utils.js";

type Props = {
  postThread: PostThread;
  theme?: Theme;
};

export const EmbeddedPostThread = ({ postThread, theme = "light" }: Props) => {
  // useMemo does nothing for RSC but it helps when the component is used in the client (e.g by SWR)
  // const postThread = useMemo(() => enrichPostThread(t), [t])
  const thread = postThread;

  return <Post theme={theme} thread={thread} key={thread.post.uri} />;
};
