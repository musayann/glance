"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { FEEDS } from "@/lib/hn/types";
import { cn } from "@/lib/utils";

export function FeedNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center gap-1", className)}>
      {FEEDS.map((feed) => {
        const href = feed.id === "top" ? "/" : `/${feed.id}`;
        const active =
          pathname === href || (feed.id !== "top" && pathname === `/${feed.id}`);
        return (
          <Link
            key={feed.id}
            href={href}
            className={cn(
              "rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors",
              active
                ? "bg-secondary text-secondary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
            )}
          >
            {feed.label}
          </Link>
        );
      })}
    </nav>
  );
}
