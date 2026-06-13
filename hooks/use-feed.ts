"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getFeedPage } from "@/lib/hn/firebase";
import type { Feed, HNItem } from "@/lib/hn/types";

export interface FeedPage {
  items: HNItem[];
  hasMore: boolean;
  total: number;
  page: number;
}

export function useFeed(feed: Feed, initialPage: FeedPage) {
  return useInfiniteQuery({
    queryKey: ["feed", feed],
    initialPageParam: 0,
    queryFn: async ({ pageParam }): Promise<FeedPage> => {
      const { items, hasMore, total } = await getFeedPage(feed, pageParam);
      return { items, hasMore, total, page: pageParam };
    },
    getNextPageParam: (last) => (last.hasMore ? last.page + 1 : undefined),
    initialData: {
      pages: [initialPage],
      pageParams: [0],
    },
  });
}
