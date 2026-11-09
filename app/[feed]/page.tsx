import { notFound } from "next/navigation";

import { FeedView } from "@/components/story/feed-view";
import { FEEDS, isFeed } from "@/lib/hn/types";

export const revalidate = 900;

// Only the feeds below exist. Any other path is a static 404, so scanner URLs
// like /wp-login.php never run a function or write to the ISR cache.
export const dynamicParams = false;

// Pre-render the static feed routes (skip "top" — that lives at "/").
export function generateStaticParams() {
  return FEEDS.filter((f) => f.id !== "top").map((f) => ({ feed: f.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ feed: string }>;
}) {
  const { feed } = await params;
  const label = FEEDS.find((f) => f.id === feed)?.label;
  return { title: label ? `${label} stories` : "Stories" };
}

export default async function FeedPage({
  params,
}: {
  params: Promise<{ feed: string }>;
}) {
  const { feed } = await params;
  if (feed === "top" || !isFeed(feed)) notFound();
  return <FeedView feed={feed} />;
}
