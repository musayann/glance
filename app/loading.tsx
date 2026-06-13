import { Skeleton } from "@/components/ui/skeleton";
import { StoryListSkeleton } from "@/components/story/story-skeleton";

export default function Loading() {
  return (
    <section>
      <Skeleton className="mb-3 h-7 w-24" />
      <StoryListSkeleton />
    </section>
  );
}
