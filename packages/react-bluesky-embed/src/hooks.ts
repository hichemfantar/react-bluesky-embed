"use client";

import { useEffect, useState } from "react";
import swr from "swr";
import {
  getPostThread,
  PostThreadConfig,
  PostThreadParams,
} from "./api/index.js";

// Avoids an error when used in the pages directory where useSWR might be in `default`.
const useSWR = ((swr as any).default as typeof swr) || swr;

async function fetcher([params, config]: [PostThreadParams, PostThreadConfig]) {
  const res = await getPostThread(
    {
      did: params.did,
      rkey: params.rkey,
    },
    config
  );
  return res;

  // // We return null in case `json.data` is undefined, that way we can check for "loading" by
  // // checking if data is `undefined`. `null` means it was fetched.
  // if (res.ok) return json.data || null;

  // throw new BlueskyApiError({
  //   message: `Failed to fetch postThread at "${url}" with "${res.status}".`,
  //   data: json,
  //   status: res.status,
  // });
}

/**
 * SWR hook for fetching a postThread in the browser.
 */
export const usePostThread = (
  params: PostThreadParams,
  config?: PostThreadConfig
) => {
  const { isLoading, data, error } = useSWR(() => [params, config], fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  return {
    // If data is `undefined` then it might be the first render where SWR hasn't started doing
    // any work, so we set `isLoading` to `true`.
    isLoading: Boolean(isLoading || (data === undefined && !error)),
    data,
    error,
  };
};

export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted;
};
