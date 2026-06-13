import { MessageSquare } from "lucide-react";

import { CommentNode } from "./comment-node";
import type { AlgoliaComment } from "@/lib/hn/types";

export function CommentTree({ comments }: { comments: AlgoliaComment[] }) {
  if (comments.length === 0) {
    return (
      <div className="text-muted-foreground flex flex-col items-center gap-2 py-12 text-sm">
        <MessageSquare className="size-6 opacity-50" />
        No comments yet.
      </div>
    );
  }

  return (
    <div className="divide-border/60 divide-y">
      {comments.map((comment) => (
        <CommentNode key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
