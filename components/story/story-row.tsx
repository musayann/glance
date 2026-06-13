import Link from "next/link";
import { ArrowUp, MessageSquare } from "lucide-react";

import type { HNItem } from "@/lib/hn/types";
import { getDomain, timeAgo } from "@/lib/hn/format";

export function StoryRow({ story, rank }: { story: HNItem; rank?: number }) {
  const domain = getDomain(story.url);
  // Jobs and text posts ("Ask HN") have no external URL — link to the discussion.
  const titleHref = story.url ?? `/item/${story.id}`;
  const external = Boolean(story.url);
  const comments = story.descendants ?? 0;

  return (
    <article className="flex gap-3 py-3">
      {rank !== undefined && (
        <span className="text-muted-foreground w-6 shrink-0 pt-0.5 text-right text-sm tabular-nums">
          {rank}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <h2 className="text-[15px] leading-snug font-medium">
          {external ? (
            <a href={titleHref} target="_blank" rel="noreferrer" className="hover:underline">
              {story.title}
            </a>
          ) : (
            <Link href={titleHref} className="hover:underline">
              {story.title}
            </Link>
          )}
          {domain && (
            <span className="text-muted-foreground ml-2 text-xs font-normal">
              ({domain})
            </span>
          )}
        </h2>

        <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          {typeof story.score === "number" && (
            <span className="inline-flex items-center gap-0.5">
              <ArrowUp className="size-3.5" />
              {story.score}
            </span>
          )}
          {story.by && (
            <Link href={`/user/${story.by}`} className="hover:text-foreground hover:underline">
              {story.by}
            </Link>
          )}
          {story.time && <span>{timeAgo(story.time)}</span>}
          <Link
            href={`/item/${story.id}`}
            className="hover:text-foreground inline-flex items-center gap-1 hover:underline"
          >
            <MessageSquare className="size-3.5" />
            {comments} {comments === 1 ? "comment" : "comments"}
          </Link>
        </div>
      </div>
    </article>
  );
}
