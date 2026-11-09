import { FeedView } from "@/components/story/feed-view";

// Cache the front page for 15 minutes. The browser refetches it from the
// Hacker News API on load (see useFeed), so visitors still see current data.
export const revalidate = 900;

export default function HomePage() {
  return <FeedView feed="top" />;
}
