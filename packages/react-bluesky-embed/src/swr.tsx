"use client";

import { type ReactNode } from "react";
import {
  EmbeddedPostThread,
  PostThreadNotFound,
  PostThreadSkeleton,
} from "./bluesky-theme/components.js";
import { Theme, type PostThreadCoreProps } from "./utils.js";
import { usePostThread } from "./hooks.js";
import { PostThreadConfig, PostThreadParams } from "./api/index.js";

export type PostThreadProps = Omit<PostThreadCoreProps, "params"> & {
  fallback?: ReactNode;
} & {
  params: PostThreadParams;
  theme?: Theme;
  hidePost?: boolean;
  config?: PostThreadConfig;
};

export const PostThread = ({
  params,
  theme = "light",
  fallback = <PostThreadSkeleton theme={theme} />,
  config,
  onError,
  hidePost,
}: PostThreadProps) => {
  const { data, error, isLoading } = usePostThread(params, config);

  if (isLoading) return fallback;
  if (error || !data) {
    const NotFound = PostThreadNotFound;
    return <NotFound theme={theme} error={onError ? onError(error) : error} />;
  }

  return (
    <>
      <EmbeddedPostThread theme={theme} postThread={data} hidePost={hidePost} />
    </>
  );
};
