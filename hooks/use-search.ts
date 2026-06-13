"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { searchStories } from "@/lib/hn/algolia";
import type { SearchSort } from "@/lib/hn/types";

export function useSearch(query: string, sort: SearchSort) {
  return useInfiniteQuery({
    queryKey: ["search", query, sort],
    enabled: query.trim().length > 0,
    initialPageParam: 0,
    queryFn: ({ pageParam }) => searchStories(query, sort, pageParam),
    getNextPageParam: (last) =>
      last.page + 1 < last.nbPages ? last.page + 1 : undefined,
  });
}
