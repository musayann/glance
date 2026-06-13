"use client";

import { Loader2 } from "lucide-react";

import { StoryRow } from "@/components/story/story-row";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSubmissions } from "@/hooks/use-submissions";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import type { AlgoliaHit, HNItem } from "@/lib/hn/types";

function hitToItem(hit: AlgoliaHit): HNItem {
  return {
    id: Number(hit.objectID),
    title: hit.title ?? hit.story_title ?? "(untitled)",
    url: hit.url ?? undefined,
    score: hit.points ?? undefined,
    by: hit.author,
    time: hit.created_at_i,
    descendants: hit.num_comments ?? 0,
  };
}

export function UserSubmissions({ username }: { username: string }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useSubmissions(username);

  const sentinelRef = useInfiniteScroll<HTMLDivElement>(
    fetchNextPage,
    hasNextPage && !isFetchingNextPage,
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  const hits = data?.pages.flatMap((p) => p.hits) ?? [];

  if (hits.length === 0) {
    return (
      <p className="text-muted-foreground py-8 text-center text-sm">
        No submissions found.
      </p>
    );
  }

  return (
    <div>
      <ul className="divide-border divide-y">
        {hits.map((hit) => (
          <li key={hit.objectID}>
            <StoryRow story={hitToItem(hit)} />
          </li>
        ))}
      </ul>
      <div ref={sentinelRef} className="flex justify-center py-6">
        {isFetchingNextPage ? (
          <Loader2 className="text-muted-foreground size-5 animate-spin" />
        ) : hasNextPage ? (
          <Button variant="ghost" size="sm" onClick={() => fetchNextPage()}>
            Load more
          </Button>
        ) : (
          <span className="text-muted-foreground text-sm">End of submissions.</span>
        )}
      </div>
    </div>
  );
}
