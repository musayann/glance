"use client";

import { Loader2, SearchX } from "lucide-react";
import { useRouter } from "next/navigation";

import { StoryRow } from "@/components/story/story-row";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearch } from "@/hooks/use-search";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import type { AlgoliaHit, HNItem, SearchSort } from "@/lib/hn/types";

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

export function SearchResults({
  query,
  sort,
}: {
  query: string;
  sort: SearchSort;
}) {
  const router = useRouter();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useSearch(query, sort);

  const sentinelRef = useInfiniteScroll<HTMLDivElement>(
    fetchNextPage,
    hasNextPage && !isFetchingNextPage,
  );

  function setSort(next: string) {
    const params = new URLSearchParams({ q: query });
    if (next === "date") params.set("sort", "date");
    router.replace(`/search?${params}`);
  }

  const hits = data?.pages.flatMap((p) => p.hits) ?? [];
  const total = data?.pages[0]?.nbHits ?? 0;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-muted-foreground text-sm">
          {isLoading
            ? "Searching…"
            : `${total.toLocaleString()} result${total === 1 ? "" : "s"} for `}
          {!isLoading && <span className="text-foreground font-medium">“{query}”</span>}
        </p>
        <Tabs value={sort} onValueChange={setSort}>
          <TabsList>
            <TabsTrigger value="relevance">Relevance</TabsTrigger>
            <TabsTrigger value="date">Newest</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center gap-3 py-12">
          <p className="text-muted-foreground text-sm">Something went wrong.</p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      ) : hits.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center gap-2 py-12 text-sm">
          <SearchX className="size-6 opacity-50" />
          No stories matched your search.
        </div>
      ) : (
        <>
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
              <span className="text-muted-foreground text-sm">End of results.</span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
