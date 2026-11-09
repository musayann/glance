import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUp, ExternalLink, MessageSquare } from "lucide-react";

import { CommentTree } from "@/components/comments/comment-tree";
import { HnHtml } from "@/components/hn-html";
import { TimeAgo } from "@/components/time-ago";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getItem } from "@/lib/hn/firebase";
import { getItemTree } from "@/lib/hn/algolia";
import { getDomain, hnItemUrl } from "@/lib/hn/format";
import type { AlgoliaComment } from "@/lib/hn/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getItem(Number(id));
  return { title: item?.title ?? "Discussion" };
}

export default async function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isFinite(numId)) notFound();

  const [item, tree] = await Promise.all([
    getItem(numId),
    getItemTree(numId),
  ]);

  if (!item && !tree) notFound();

  // Prefer canonical Firebase metadata, fall back to the Algolia tree root.
  const title = item?.title ?? tree?.title ?? "Untitled";
  const url = item?.url ?? tree?.url ?? undefined;
  const text = item?.text ?? tree?.text ?? undefined;
  const score = item?.score ?? tree?.points ?? undefined;
  const author = item?.by ?? tree?.author ?? undefined;
  const time =
    item?.time ??
    (tree ? Math.floor(new Date(tree.created_at).getTime() / 1000) : undefined);
  const domain = getDomain(url);
  const comments: AlgoliaComment[] = tree?.children ?? [];
  const commentCount = item?.descendants ?? countTree(comments);

  return (
    <article>
      <header>
        <h1 className="text-xl leading-snug font-semibold tracking-tight">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              {title}
              <ExternalLink className="text-muted-foreground ml-1.5 inline size-4 align-baseline" />
            </a>
          ) : (
            title
          )}
        </h1>

        {domain && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground mt-1 inline-block text-xs hover:underline"
          >
            {domain}
          </a>
        )}

        <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          {typeof score === "number" && (
            <Badge variant="secondary" className="gap-1">
              <ArrowUp className="size-3.5" />
              {score} points
            </Badge>
          )}
          {author && (
            <Link
              href={`/user/${author}`}
              prefetch={false}
              className="hover:text-foreground hover:underline"
            >
              {author}
            </Link>
          )}
          {time && <TimeAgo time={time} />}
          <span className="inline-flex items-center gap-1">
            <MessageSquare className="size-3.5" />
            {commentCount} {commentCount === 1 ? "comment" : "comments"}
          </span>
          <a
            href={hnItemUrl(numId)}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground ml-auto text-xs hover:underline"
          >
            View on HN
          </a>
        </div>

        {text && (
          <div className="bg-muted/40 mt-4 rounded-lg p-4">
            <HnHtml html={text} />
          </div>
        )}
      </header>

      <Separator className="my-5" />

      <CommentTree comments={comments} />
    </article>
  );
}

function countTree(comments: AlgoliaComment[]): number {
  return comments.reduce(
    (sum, c) => sum + 1 + countTree(c.children),
    0,
  );
}
