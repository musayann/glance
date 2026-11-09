import { FEEDS, type Feed, type HNItem, type HNUser } from "./types";

const BASE = "https://hacker-news.firebaseio.com/v0";

// No per-request cache here: pages are cached as a whole, and caching each
// story separately would only add 31 cache entries per feed refresh.
async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HN request failed (${res.status}): ${url}`);
  }
  return res.json() as Promise<T>;
}

/** Ordered list of story ids for a feed (up to ~500). */
export async function getFeedIds(feed: Feed): Promise<number[]> {
  const entry = FEEDS.find((f) => f.id === feed);
  if (!entry) throw new Error(`Unknown feed: ${feed}`);
  const ids = await getJSON<number[] | null>(`${BASE}/${entry.firebase}.json`);
  return ids ?? [];
}

/** A single item (story, comment, job, poll). Returns null if missing. */
export async function getItem(id: number): Promise<HNItem | null> {
  try {
    return await getJSON<HNItem | null>(`${BASE}/item/${id}.json`);
  } catch {
    return null;
  }
}

/** Fetch many items in parallel, preserving order and dropping any that fail. */
export async function getItems(ids: number[]): Promise<HNItem[]> {
  const items = await Promise.all(ids.map((id) => getItem(id)));
  return items.filter((item): item is HNItem => Boolean(item) && !item!.deleted);
}

/** A user profile. Returns null if the user does not exist. */
export async function getUser(id: string): Promise<HNUser | null> {
  try {
    return await getJSON<HNUser | null>(`${BASE}/user/${encodeURIComponent(id)}.json`);
  } catch {
    return null;
  }
}

/**
 * Fetch one page of a feed: slice the id list and resolve the items.
 * `page` is 0-indexed; `pageSize` defaults to 30 (matching HN's own paging).
 */
export async function getFeedPage(
  feed: Feed,
  page: number,
  pageSize = 30,
): Promise<{
  items: HNItem[];
  hasMore: boolean;
  total: number;
  fetchedAt: number;
}> {
  const ids = await getFeedIds(feed);
  const start = page * pageSize;
  const slice = ids.slice(start, start + pageSize);
  const items = await getItems(slice);
  return {
    items,
    hasMore: start + pageSize < ids.length,
    total: ids.length,
    fetchedAt: Date.now(),
  };
}
