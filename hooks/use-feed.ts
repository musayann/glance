"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getFeedPage } from "@/lib/hn/firebase";
import type { Feed, HNItem } from "@/lib/hn/types";

export interface FeedPage {
  items: HNItem[];
  hasMore: boolean;
  total: number;
  page: number;
  fetchedAt: number;
}

// Matches `revalidate` in app/page.tsx and app/[feed]/page.tsx.
const FEED_STALE_MS = 15 * 60_000;

export function useFeed(feed: Feed, initialPage: FeedPage) {
  return useInfiniteQuery({
    queryKey: ["feed", feed],
    initialPageParam: 0,
    queryFn: async ({ pageParam }): Promise<FeedPage> => {
      const result = await getFeedPage(feed, pageParam);
      return { ...result, page: pageParam };
    },
    getNextPageParam: (last) => (last.hasMore ? last.page + 1 : undefined),
    initialData: {
      pages: [initialPage],
      pageParams: [0],
    },
    // A refresh costs 31 Firebase requests, so only refetch on mount when the
    // server copy is really past its ISR window (e.g. after a quiet spell).
    initialDataUpdatedAt: initialPage.fetchedAt,
    staleTime: FEED_STALE_MS,
  });
}
