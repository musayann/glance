import { Search } from "lucide-react";

import { SearchResults } from "@/components/search/search-results";
import type { SearchSort } from "@/lib/hn/types";

export const metadata = { title: "Search" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const { q, sort } = await searchParams;
  const query = (q ?? "").trim();
  const sortMode: SearchSort = sort === "date" ? "date" : "relevance";

  if (!query) {
    return (
      <div className="text-muted-foreground flex flex-col items-center gap-2 py-16 text-sm">
        <Search className="size-6 opacity-50" />
        Type a query in the search box above to find stories.
      </div>
    );
  }

  return <SearchResults query={query} sort={sortMode} />;
}
