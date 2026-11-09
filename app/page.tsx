import { FeedView } from "@/components/story/feed-view";

// Cache the front page for 15 minutes. The browser only refetches it from the
// Hacker News API if the cached copy is older than that (see useFeed).
export const revalidate = 900;

export default function HomePage() {
  return <FeedView feed="top" />;
}
