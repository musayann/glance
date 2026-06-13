import { StoryFeed } from "./story-feed";
import { getFeedPage } from "@/lib/hn/firebase";
import { FEEDS, type Feed } from "@/lib/hn/types";

export async function FeedView({ feed }: { feed: Feed }) {
  const { items, hasMore, total } = await getFeedPage(feed, 0);
  const label = FEEDS.find((f) => f.id === feed)?.label ?? "Stories";

  return (
    <section>
      <h1 className="mb-2 text-xl font-semibold tracking-tight">{label}</h1>
      <StoryFeed
        feed={feed}
        initialPage={{ items, hasMore, total, page: 0 }}
      />
    </section>
  );
}
