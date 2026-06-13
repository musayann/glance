"use client";

import { useEffect, useRef } from "react";

/**
 * Returns a ref to attach to a sentinel element near the end of a list.
 * `onLoadMore` fires when the sentinel scrolls into view, as long as
 * `enabled` is true (e.g. there is a next page and nothing is loading).
 */
export function useInfiniteScroll<T extends HTMLElement = HTMLDivElement>(
  onLoadMore: () => void,
  enabled: boolean,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) onLoadMore();
      },
      { rootMargin: "400px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [onLoadMore, enabled]);

  return ref;
}
