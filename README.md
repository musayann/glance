# Glance

A fast, user-friendly, **unofficial** reader for
[Hacker News](https://news.ycombinator.com/), built with Next.js (App Router)
and [shadcn/ui](https://ui.shadcn.com/).

> Glance is an independent project and is **not affiliated with, endorsed by, or
> sponsored by Y Combinator or Hacker News**. "Hacker News" is used here only to
> describe the public data the app reads.

## Features

- **Story feeds** — Top, New, Best, Ask HN, Show HN, and Jobs, with infinite scroll.
- **Comment threads** — nested, collapsible discussions on each story.
- **Search** — full-text search across stories, sortable by relevance or recency.
- **User profiles** — karma, about, and submission history.
- **Light / dark mode** — system-aware theme toggle.

## Tech stack

- Next.js 16 (App Router, React 19, TypeScript)
- Tailwind CSS v4 + shadcn/ui (radix-nova)
- TanStack Query (client caching + infinite scroll)
- next-themes

## Data sources

No API key required. Two public Hacker News APIs:

- **Official Firebase API** (`hacker-news.firebaseio.com/v0`) — feed lists, items, users.
  Feed pages use 15-minute ISR and refresh from the browser on load. Story and
  user pages render on demand and are cached at the Vercel CDN for 15 minutes.
  See `lib/hn/firebase.ts`.
- **Algolia HN Search API** (`hn.algolia.com/api/v1`) — search, full comment trees,
  and user submissions. See `lib/hn/algolia.ts`.

## Project layout

```
app/                 routes: / (top), /[feed], /item/[id], /search, /user/[id]
components/layout/    header, feed nav, search box, theme toggle
components/story/     story row, infinite feed, skeletons
components/comments/  recursive collapsible comment tree
components/search/    search results
components/user/      user submissions
lib/hn/               types, Firebase + Algolia clients, formatters, HTML sanitizer
hooks/                useFeed, useSearch, useSubmissions, useInfiniteScroll
```

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build
```
