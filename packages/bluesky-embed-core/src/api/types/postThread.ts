import { AppBskyFeedDefs } from "@atproto/api";

/**
 * A postThread as returned by the the Bluesky API.
 */
export interface PostThread extends AppBskyFeedDefs.ThreadViewPost {}

export interface PostThreadParams {
  did: string;
  rkey: string;
  config?: {
    depth?: number;
    parentHeight?: number;
  };
}

export interface PostThreadConfig {
  depth?: number;
  parentHeight?: number;
}
