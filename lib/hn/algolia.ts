import type {
  AlgoliaItem,
  AlgoliaSearchResponse,
  SearchSort,
} from "./types";

const BASE = "https://hn.algolia.com/api/v1";

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Algolia request failed (${res.status}): ${url}`);
  }
  return res.json() as Promise<T>;
}

/**
 * Full-text search across stories. `sort` toggles between relevance (the
 * default `search` endpoint, ranked by points) and recency (`search_by_date`).
 * `page` is 0-indexed.
 */
export async function searchStories(
  query: string,
  sort: SearchSort = "relevance",
  page = 0,
  hitsPerPage = 20,
): Promise<AlgoliaSearchResponse> {
  const endpoint = sort === "date" ? "search_by_date" : "search";
  const params = new URLSearchParams({
    query,
    tags: "story",
    page: String(page),
    hitsPerPage: String(hitsPerPage),
  });
  return getJSON<AlgoliaSearchResponse>(`${BASE}/${endpoint}?${params}`);
}

/** A user's submissions (stories), most recent first. `page` is 0-indexed. */
export async function getUserSubmissions(
  username: string,
  page = 0,
  hitsPerPage = 20,
): Promise<AlgoliaSearchResponse> {
  const params = new URLSearchParams({
    tags: `author_${username},story`,
    page: String(page),
    hitsPerPage: String(hitsPerPage),
  });
  return getJSON<AlgoliaSearchResponse>(`${BASE}/search_by_date?${params}`);
}

/**
 * The full nested comment tree for a story in a single request. Returns null
 * if the item is not found.
 */
export async function getItemTree(id: number): Promise<AlgoliaItem | null> {
  try {
    return await getJSON<AlgoliaItem>(`${BASE}/items/${id}`);
  } catch {
    return null;
  }
}
