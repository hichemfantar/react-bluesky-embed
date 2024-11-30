import { PostThreadParams } from "./api";

export type PostThreadCoreProps = {
  params: PostThreadParams;
  onError?(error: any): any;
};

export type Theme = "light" | "dark";
