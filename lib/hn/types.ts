// Feed identifiers used in routes and the Firebase list endpoints.
export type Feed = "top" | "new" | "best" | "ask" | "show" | "jobs";

export const FEEDS: { id: Feed; label: string; firebase: string }[] = [
  { id: "top", label: "Top", firebase: "topstories" },
  { id: "new", label: "New", firebase: "newstories" },
  { id: "best", label: "Best", firebase: "beststories" },
  { id: "ask", label: "Ask", firebase: "askstories" },
  { id: "show", label: "Show", firebase: "showstories" },
  { id: "jobs", label: "Jobs", firebase: "jobstories" },
];

export function isFeed(value: string): value is Feed {
  return FEEDS.some((f) => f.id === value);
}

// An item from the official Firebase API (story / comment / job / poll).
export interface HNItem {
  id: number;
  deleted?: boolean;
  type?: "job" | "story" | "comment" | "poll" | "pollopt";
  by?: string;
  time?: number; // unix seconds
  text?: string; // HTML
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  parts?: number[];
  descendants?: number; // total comment count
}

// A user from the official Firebase API.
export interface HNUser {
  id: string;
  created: number; // unix seconds
  karma: number;
  about?: string; // HTML
  submitted?: number[];
}

// A nested comment node from the Algolia items endpoint.
export interface AlgoliaComment {
  id: number;
  created_at: string;
  author: string | null;
  text: string | null; // HTML
  points: number | null;
  parent_id: number | null;
  children: AlgoliaComment[];
}

// The root of the Algolia items/{id} response (story with its comment tree).
export interface AlgoliaItem extends AlgoliaComment {
  title: string | null;
  url: string | null;
  type: string;
}

// A single hit from the Algolia search endpoint.
export interface AlgoliaHit {
  objectID: string;
  title: string | null;
  url: string | null;
  author: string;
  points: number | null;
  story_text: string | null;
  comment_text: string | null;
  num_comments: number | null;
  created_at_i: number; // unix seconds
  _tags: string[];
  story_id?: number | null;
  story_title?: string | null;
}

export interface AlgoliaSearchResponse {
  hits: AlgoliaHit[];
  page: number;
  nbPages: number;
  nbHits: number;
  hitsPerPage: number;
}

export type SearchSort = "relevance" | "date";
