import { Suspense } from "react";
import { getPostThread } from "./api/index.js";
import {
  EmbeddedPostThread,
  PostThreadNotFound,
  PostThreadSkeleton,
} from "./bluesky-theme/components.js";
import type { PostThreadProps } from "./swr.js";

// This is not ideal because we don't use the `apiUrl` prop here and `uri` is required. But as the
// type is shared with the SWR version when the PostThread component is imported, we need to have a type
// that supports both versions of the component.
export type { PostThreadProps };

type PostThreadContentProps = Omit<PostThreadProps, "fallback">;

const PostThreadContent = async ({
  params,
  theme = "light",
  onError,
}: PostThreadContentProps) => {
  let error;
  const postThread = params
    ? await getPostThread(params).catch((err) => {
        if (onError) {
          error = onError(err);
        } else {
          console.error(err);
          error = err;
        }
      })
    : undefined;

  if (!postThread) {
    const NotFound = PostThreadNotFound;
    return <NotFound theme={theme} error={error} />;
  }

  return (
    <>
      {/* <Post thread={thread} key={thread.post.uri} /> */}
      <EmbeddedPostThread
        theme={theme}
        postThread={postThread}
        key={JSON.stringify(params)}
      />
    </>
  );
};

export const PostThread = ({
  theme,
  fallback = <PostThreadSkeleton theme={theme} />,
  ...props
}: PostThreadProps) => (
  <Suspense fallback={fallback}>
    {/* @ts-ignore: Async components are valid in the app directory */}
    <PostThreadContent theme={theme} {...props} />
  </Suspense>
);
