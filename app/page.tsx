import { FeedView } from "@/components/story/feed-view";

// Cache the front page for 60s; revalidate via the underlying fetch calls.
export const revalidate = 60;

export default function HomePage() {
  return <FeedView feed="top" />;
}
