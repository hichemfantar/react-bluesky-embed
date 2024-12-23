import { AppBskyFeedPost, AppBskyRichtextFacet, RichText } from "@atproto/api";

import { PostThread } from "../api/index.js";
import { Theme } from "../utils.js";
import { CommentSection } from "./comments.js";
import { Container } from "./container.js";
import { Embed } from "./embed.js";
import { BlueskyLogo, LikeIcon, ReplyIcon, RepostIcon } from "./icons.js";
import { CONTENT_LABELS } from "./labels.js";
import { Link } from "./link.js";
import { getRkey, niceDate, prettyNumber } from "./utils.js";

interface Props {
  thread: PostThread;
  theme: Theme;
  hidePost?: boolean;
}

export function Post({ thread, theme, hidePost = false }: Props) {
  const post = thread.post;

  const isAuthorLabeled = post.author.labels?.some((label) =>
    CONTENT_LABELS.includes(label.val)
  );

  let record: AppBskyFeedPost.Record | null = null;
  if (AppBskyFeedPost.isRecord(post.record)) {
    record = post.record;
  }

  const href = `/profile/${post.author.did}/post/${getRkey(post)}`;

  return (
    <Container theme={theme} href={href}>
      <div className="flex-1 flex-col flex gap-2">
        {!hidePost && (
          <div className="flex-1 flex-col flex gap-2" lang={record?.langs?.[0]}>
            <div className="flex gap-2.5 items-center">
              <Link
                href={`/profile/${post.author.did}`}
                className="rounded-full"
              >
                <div className="w-10 h-10 overflow-hidden rounded-full bg-neutral-300 shrink-0">
                  <img
                    loading="lazy"
                    src={post.author.avatar}
                    style={
                      isAuthorLabeled ? { filter: "blur(2.5px)" } : undefined
                    }
                    alt="author"
                  />
                </div>
              </Link>
              <div>
                <Link
                  href={`/profile/${post.author.did}`}
                  className="font-bold text-[17px] leading-5 line-clamp-1 hover:underline underline-offset-2 decoration-2"
                >
                  <p>{post.author.displayName}</p>
                </Link>
                <Link
                  href={`/profile/${post.author.did}`}
                  className="text-[15px] text-textLight dark:text-textDark hover:underline line-clamp-1"
                >
                  <p>@{post.author.handle}</p>
                </Link>
              </div>
              <div className="flex-1" />
              <Link
                href={href}
                className="transition-transform hover:scale-110 shrink-0 self-start"
                aria-label="See on Bluesky"
              >
                <BlueskyLogo className="h-7" />
              </Link>
            </div>
            <PostContent record={record} />
            <Embed content={post.embed} labels={post.labels} />
            <Link href={href}>
              <time
                dateTime={new Date(post.indexedAt).toISOString()}
                className="text-textLight dark:text-textDark mt-1 text-sm hover:underline"
              >
                {niceDate(post.indexedAt)}
              </time>
            </Link>
            <Link
              href={href}
              className="border-t w-full pt-2.5 flex items-center gap-5 text-sm cursor-pointer"
            >
              {!!post.likeCount && (
                <div className="flex items-center gap-2 cursor-pointer">
                  <LikeIcon className="w-5 h-5" />
                  <p className="font-semibold text-neutral-500 dark:text-neutral-400">
                    {prettyNumber(post.likeCount)}
                  </p>
                </div>
              )}
              {!!post.repostCount && (
                <div className="flex items-center gap-2 cursor-pointer">
                  <RepostIcon className="w-5 h-5" />
                  <p className="font-semibold text-neutral-500 dark:text-neutral-400">
                    {prettyNumber(post.repostCount)}
                  </p>
                </div>
              )}
              <div className="flex items-center gap-2 cursor-pointer">
                {/* <img src={replyIcon} className="w-5 h-5" alt="reply" /> */}
                <ReplyIcon className="w-5 h-5" />
                <p className="font-semibold text-neutral-500 dark:text-neutral-400">
                  Reply
                </p>
              </div>
              <div className="flex-1" />
              <p className="cursor-pointer text-brand dark:text-brandDark font-bold hover:underline hidden min-[450px]:inline">
                {post.replyCount
                  ? `Read ${prettyNumber(post.replyCount)} ${
                      post.replyCount > 1 ? "replies" : "reply"
                    } on Bluesky`
                  : `View on Bluesky`}
              </p>
              <p className="cursor-pointer text-brand dark:text-brandDark font-bold hover:underline min-[450px]:hidden">
                <span className="hidden min-[380px]:inline">View on </span>
                Bluesky
              </p>
            </Link>
          </div>
        )}
        <CommentSection thread={thread} />
      </div>
    </Container>
  );
}

export function PostContent({
  record,
  isComment = false,
}: {
  record: AppBskyFeedPost.Record | null;
  isComment?: boolean;
}) {
  if (!record) return null;

  const rt = new RichText({
    text: record.text,
    facets: record.facets,
  });

  const richText = [];

  let counter = 0;
  for (const segment of rt.segments()) {
    if (
      segment.link &&
      AppBskyRichtextFacet.validateLink(segment.link).success
    ) {
      richText.push(
        <Link
          key={counter}
          href={segment.link.uri}
          className="text-blue-600 hover:underline"
          disableTracking={
            !segment.link.uri.startsWith("https://bsky.app") &&
            !segment.link.uri.startsWith("https://go.bsky.app")
          }
        >
          {segment.text}
        </Link>
      );
    } else if (
      segment.mention &&
      AppBskyRichtextFacet.validateMention(segment.mention).success
    ) {
      richText.push(
        <Link
          key={counter}
          href={`/profile/${segment.mention.did}`}
          className="text-blue-600 hover:underline"
        >
          {segment.text}
        </Link>
      );
    } else if (
      segment.tag &&
      AppBskyRichtextFacet.validateTag(segment.tag).success
    ) {
      richText.push(
        <Link
          key={counter}
          href={`/tag/${segment.tag.tag}`}
          className="text-blue-600 hover:underline"
        >
          {segment.text}
        </Link>
      );
    } else {
      richText.push(segment.text);
    }

    counter++;
  }

  if (isComment)
    return (
      <p className={"leading-6 break-word break-words whitespace-pre-wrap"}>
        {richText}
      </p>
    );

  return (
    <p
      className={
        "min-[300px]:text-lg leading-6 break-word break-words whitespace-pre-wrap"
      }
    >
      {richText}
    </p>
  );
}
