import { Skeleton } from "@/components/ui/skeleton";

export function StoryListSkeleton({ count = 10 }: { count?: number }) {
  return (
    <ul className="divide-border divide-y">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="flex gap-3 py-3">
          <Skeleton className="mt-0.5 h-4 w-6 shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </li>
      ))}
    </ul>
  );
}
