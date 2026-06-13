import { sanitizeHtml } from "@/lib/hn/sanitize";
import { cn } from "@/lib/utils";

/** Renders sanitized Hacker News HTML (comments / story text) with readable styling. */
export function HnHtml({
  html,
  className,
}: {
  html?: string | null;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-sm leading-relaxed break-words",
        "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2",
        "[&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0",
        "[&_pre]:bg-muted [&_pre]:my-2 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:p-3 [&_pre]:text-xs",
        "[&_code]:text-xs",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
    />
  );
}
