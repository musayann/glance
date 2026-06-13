"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getUserSubmissions } from "@/lib/hn/algolia";

export function useSubmissions(username: string) {
  return useInfiniteQuery({
    queryKey: ["submissions", username],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getUserSubmissions(username, pageParam),
    getNextPageParam: (last) =>
      last.page + 1 < last.nbPages ? last.page + 1 : undefined,
  });
}
