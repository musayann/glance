"use client";

import { useSyncExternalStore } from "react";

import { formatDate, timeAgo } from "@/lib/hn/format";

const subscribe = () => () => {};

/**
 * Relative time that stays out of cached HTML. The server and the hydration
 * pass render a stable date, then the browser swaps in "3 hours ago". A
 * server-rendered relative time would change on every ISR refresh, forcing a
 * cache write each time, and would mismatch when old HTML hydrates.
 */
export function TimeAgo({ time }: { time: number }) {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  return (
    <time dateTime={new Date(time * 1000).toISOString()} title={formatDate(time)}>
      {hydrated ? timeAgo(time) : formatDate(time)}
    </time>
  );
}
