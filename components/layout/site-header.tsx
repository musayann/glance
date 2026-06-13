import Link from "next/link";
import { Eye } from "lucide-react";
import { Suspense } from "react";

import { FeedNav } from "./feed-nav";
import { SearchBox } from "./search-box";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-4xl items-center gap-3 px-4">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-semibold">
          <span className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md">
            <Eye className="size-4" />
          </span>
          <span className="hidden sm:inline">Glance</span>
        </Link>

        <FeedNav className="hidden md:flex" />

        <div className="ml-auto flex items-center gap-2">
          <Suspense fallback={null}>
            <SearchBox className="w-36 sm:w-56" />
          </Suspense>
          <ThemeToggle />
        </div>
      </div>

      {/* Feed nav for small screens, scrollable. */}
      <div className="border-t md:hidden">
        <div className="mx-auto max-w-4xl overflow-x-auto px-2 py-1">
          <FeedNav />
        </div>
      </div>
    </header>
  );
}
