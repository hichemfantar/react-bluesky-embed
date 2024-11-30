"use client";

import { type ReactNode } from "react";
import {
  EmbeddedPostThread,
  PostThreadNotFound,
  PostThreadSkeleton,
} from "./bluesky-theme/components.js";
import { Theme, type PostThreadCoreProps } from "./utils.js";
import { usePostThread } from "./hooks.js";
import { PostThreadParams } from "./api/index.js";

export type PostThreadProps = Omit<PostThreadCoreProps, "params"> & {
  fallback?: ReactNode;
  fetchOptions?: RequestInit;
} & {
  params: PostThreadParams;
  theme?: Theme;
};

export const PostThread = ({
  params,
  theme = "light",
  fallback = <PostThreadSkeleton theme={theme} />,
  fetchOptions,
  onError,
}: PostThreadProps) => {
  const { data, error, isLoading } = usePostThread(params, fetchOptions);

  if (isLoading) return fallback;
  if (error || !data) {
    const NotFound = PostThreadNotFound;
    return <NotFound theme={theme} error={onError ? onError(error) : error} />;
  }

  return (
    <>
      <EmbeddedPostThread theme={theme} postThread={data} />
    </>
  );
};
