"use client";

import { Loader2 } from "lucide-react";

import { StoryRow } from "./story-row";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useFeed, type FeedPage } from "@/hooks/use-feed";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import type { Feed } from "@/lib/hn/types";

export function StoryFeed({
  feed,
  initialPage,
}: {
  feed: Feed;
  initialPage: FeedPage;
}) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    refetch,
  } = useFeed(feed, initialPage);

  const sentinelRef = useInfiniteScroll<HTMLDivElement>(
    fetchNextPage,
    hasNextPage && !isFetchingNextPage,
  );

  const stories = data.pages.flatMap((p) => p.items);

  return (
    <div>
      <ul className="divide-border divide-y">
        {stories.map((story, i) => (
          <li key={story.id}>
            <StoryRow story={story} rank={i + 1} />
          </li>
        ))}
      </ul>

      <Separator className="my-2" />

      <div ref={sentinelRef} className="flex justify-center py-6">
        {isFetchingNextPage ? (
          <Loader2 className="text-muted-foreground size-5 animate-spin" />
        ) : isError ? (
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        ) : hasNextPage ? (
          <Button variant="ghost" size="sm" onClick={() => fetchNextPage()}>
            Load more
          </Button>
        ) : (
          <span className="text-muted-foreground text-sm">
            You&apos;ve reached the end.
          </span>
        )}
      </div>
    </div>
  );
}
