"use client";

import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

import { HnHtml } from "@/components/hn-html";
import { TimeAgo } from "@/components/time-ago";
import type { AlgoliaComment } from "@/lib/hn/types";
import { cn } from "@/lib/utils";

function countDescendants(comment: AlgoliaComment): number {
  return comment.children.reduce(
    (sum, child) => sum + 1 + countDescendants(child),
    0,
  );
}

export function CommentNode({
  comment,
  depth = 0,
}: {
  comment: AlgoliaComment;
  depth?: number;
}) {
  const [open, setOpen] = useState(true);

  // Dead/deleted comments still hold replies worth keeping in the tree.
  const isDeleted = !comment.text && !comment.author;
  const replyCount = countDescendants(comment);

  return (
    <div
      className={cn(
        depth > 0 && "border-border/60 border-l pl-3 sm:pl-4",
      )}
    >
      <div className="py-2">
        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <button
            onClick={() => setOpen((o) => !o)}
            className="hover:text-foreground inline-flex items-center"
            aria-label={open ? "Collapse thread" : "Expand thread"}
          >
            {open ? (
              <ChevronDown className="size-3.5" />
            ) : (
              <ChevronRight className="size-3.5" />
            )}
          </button>
          {comment.author ? (
            <Link
              href={`/user/${comment.author}`}
              prefetch={false}
              className="hover:text-foreground font-medium hover:underline"
            >
              {comment.author}
            </Link>
          ) : (
            <span className="italic">[deleted]</span>
          )}
          <TimeAgo time={Math.floor(new Date(comment.created_at).getTime() / 1000)} />
          {!open && replyCount > 0 && (
            <span className="text-muted-foreground/70">
              ({replyCount} {replyCount === 1 ? "reply" : "replies"})
            </span>
          )}
        </div>

        {open && (
          <div className="mt-1.5">
            {isDeleted ? (
              <p className="text-muted-foreground text-sm italic">
                [comment removed]
              </p>
            ) : (
              <HnHtml html={comment.text} />
            )}

            {comment.children.length > 0 && (
              <div className="mt-1">
                {comment.children.map((child) => (
                  <CommentNode key={child.id} comment={child} depth={depth + 1} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
