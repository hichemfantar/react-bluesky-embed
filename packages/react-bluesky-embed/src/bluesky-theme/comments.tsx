"use client";

import { AppBskyFeedDefs, AppBskyFeedPost } from "@atproto/api";
import { useState } from "react";
import { PostThread } from "../api/index.js";
import { Embed } from "./embed.js";
import { PostContent } from "./post.js";

export const CommentSection = ({ thread }: { thread: PostThread }) => {
  const [, , did, _, rkey] = thread.post.uri.split("/");
  const postUrl = `https://bsky.app/profile/${did}/post/${rkey}`;

  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(4);

  if (error) {
    return <p className="text-center">{error}</p>;
  }

  if (!thread) {
    return <p className="text-center">Loading comments...</p>;
  }

  const showMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const sortedReplies = thread.replies?.sort(sortByLikes) ?? [];

  return (
    <div>
      {/* <a
        target="_blank"
        href={postUrl}
        className="w-full flex items-center gap-5 text-sm"
      >
        {!!thread.post.likeCount && (
          <div className="flex items-center gap-2 cursor-pointer">
            <LikeIcon className="w-5 h-5" />
            <p className="font-semibold text-neutral-500 dark:text-neutral-400">
              {prettyNumber(thread.post.likeCount)}
            </p>
          </div>
        )}
        {!!thread.post.repostCount && (
          <div className="flex items-center gap-2 cursor-pointer">
            <RepostIcon className="w-5 h-5" />
            <p className="font-semibold text-neutral-500 dark:text-neutral-400">
              {prettyNumber(thread.post.repostCount)}
            </p>
          </div>
        )}
        <div className="flex items-center gap-2 cursor-pointer">
          <ReplyIcon className="w-5 h-5" />
          <p className="font-semibold text-neutral-500 dark:text-neutral-400">
            Reply
          </p>
        </div>
        <div className="flex-1" />
        <p className="cursor-pointer text-brand dark:text-brandDark font-bold hover:underline hidden min-[450px]:inline">
          {thread.post.replyCount
            ? `Read ${prettyNumber(thread.post.replyCount)} ${
                thread.post.replyCount > 1 ? "replies" : "reply"
              } on Bluesky`
            : `View on Bluesky`}
        </p>
        <p className="cursor-pointer text-brand dark:text-brandDark font-bold hover:underline min-[450px]:hidden">
          <span className="hidden min-[380px]:inline">View on </span>Bluesky
        </p>
      </a> */}

      <h2 className="text-xl font-bold">Comments</h2>
      <p className="mt-2 text-sm">
        Reply on Bluesky{" "}
        <a
          href={postUrl}
          className="underline"
          target="_blank"
          rel="noreferrer noopener"
        >
          here
        </a>{" "}
        to join the conversation.
      </p>
      <hr className="my-2" />
      <div className="space-y-4">
        {sortedReplies.slice(0, visibleCount).map((reply) => {
          if (!AppBskyFeedDefs.isThreadViewPost(reply)) return null;
          return <Comment key={reply.post.uri} comment={reply} />;
        })}
        {visibleCount < sortedReplies.length && (
          <button
            onClick={showMore}
            className="w-full text-sm text-blue-400 p-2 px-4 border rounded-lg hover:bg-[#2e3f51] transition"
          >
            Show more comments
          </button>
        )}
      </div>
    </div>
  );
};

const Comment = ({ comment }: { comment: AppBskyFeedDefs.ThreadViewPost }) => {
  const author = comment.post.author;
  const avatarClassName = "size-6 shrink-0 rounded-full bg-gray-300";

  if (!AppBskyFeedPost.isRecord(comment.post.record)) return null;

  return (
    <div className="text-base space-y-4">
      <div className="flex xmax-w-xl flex-col gap-2">
        <a
          className="flex flex-row items-center gap-2 hover:underline"
          href={`https://bsky.app/profile/${author.did}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          {author.avatar ? (
            <img
              src={comment.post.author.avatar}
              alt="avatar"
              className={avatarClassName}
              loading="lazy"
            />
          ) : (
            <div className={avatarClassName} />
          )}
          <p className="line-clamp-1">
            {(author.displayName || author.handle) && (
              <>{author.displayName || author.handle} </>
            )}
            {author.handle && (
              <span className="text-sm text-textLight dark:text-textDark">
                @{author.handle}
              </span>
            )}
          </p>
        </a>
        <a
          href={`https://bsky.app/profile/${author.did}/post/${comment.post.uri
            .split("/")
            .pop()}`}
          target="_blank"
          rel="noreferrer noopener"
          className="flex-1 flex-col flex gap-2"
        >
          {/* <p>{comment.post.record.text}</p> */}
          <PostContent record={comment.post.record} isComment />
          <div className="max-w-xl">
            <Embed
              key={comment.post.uri}
              content={comment.post.embed}
              labels={comment.post.labels}
            />
          </div>
          <Actions post={comment.post} />
        </a>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-4 border-l-2  pl-2 dark:hover:border-[#4c6784] hover:border-[#3b5169] transition">
          {comment.replies.sort(sortByLikes).map((reply) => {
            if (!AppBskyFeedDefs.isThreadViewPost(reply)) return null;
            return <Comment key={reply.post.uri} comment={reply} />;
          })}
        </div>
      )}
    </div>
  );
};
const Actions = ({ post }: { post: AppBskyFeedDefs.PostView }) => (
  <div className="flex w-full max-w-[150px] flex-row items-center justify-between opacity-60">
    <div className="flex flex-row items-center gap-1.5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="size-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
        />
      </svg>

      <p className="text-xs">{post.replyCount ?? 0}</p>
    </div>
    <div className="flex flex-row items-center gap-1.5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="size-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
        />
      </svg>
      <p className="text-xs">{post.repostCount ?? 0}</p>
    </div>
    <div className="flex flex-row items-center gap-1.5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="size-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
      <p className="text-xs">{post.likeCount ?? 0}</p>
    </div>
  </div>
);

const sortByLikes = (a: unknown, b: unknown) => {
  if (
    !AppBskyFeedDefs.isThreadViewPost(a) ||
    !AppBskyFeedDefs.isThreadViewPost(b)
  ) {
    return 0;
  }
  return (b.post.likeCount ?? 0) - (a.post.likeCount ?? 0);
};
