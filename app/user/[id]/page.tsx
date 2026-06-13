import { notFound } from "next/navigation";
import { Award, CalendarDays } from "lucide-react";

import { HnHtml } from "@/components/hn-html";
import { UserSubmissions } from "@/components/user/user-submissions";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/lib/hn/firebase";
import { formatDate } from "@/lib/hn/format";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return { title: id };
}

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUser(id);
  if (!user) notFound();

  return (
    <div>
      <header>
        <h1 className="text-2xl font-bold tracking-tight">{user.id}</h1>
        <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span className="inline-flex items-center gap-1.5">
            <Award className="size-4" />
            {user.karma.toLocaleString()} karma
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-4" />
            Joined {formatDate(user.created)}
          </span>
          <a
            href={`https://news.ycombinator.com/user?id=${encodeURIComponent(user.id)}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground hover:underline"
          >
            View on HN
          </a>
        </div>

        {user.about && (
          <div className="bg-muted/40 mt-4 rounded-lg p-4">
            <HnHtml html={user.about} />
          </div>
        )}
      </header>

      <Separator className="my-5" />

      <h2 className="mb-2 text-sm font-semibold tracking-wide uppercase">
        Submissions
      </h2>
      <UserSubmissions username={user.id} />
    </div>
  );
}
