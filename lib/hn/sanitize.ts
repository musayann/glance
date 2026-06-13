/**
 * Lightweight defense-in-depth sanitizer for Hacker News comment/story HTML.
 *
 * HN already restricts user content to a small tag set (<a> <i> <p> <pre>
 * <code>) and escapes the rest, so this is belt-and-suspenders: strip script /
 * style blocks, inline event handlers, and javascript: URLs before the HTML is
 * passed to dangerouslySetInnerHTML.
 */
export function sanitizeHtml(html?: string | null): string {
  if (!html) return "";
  return html
    .replace(/<\s*(script|style|iframe|object|embed)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
    .replace(/<\s*(script|style|iframe|object|embed)[^>]*\/?>/gi, "")
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
    .replace(/\son\w+\s*=\s*[^\s>]+/gi, "")
    .replace(/(href|src)\s*=\s*("|')\s*javascript:[^"']*\2/gi, '$1="#"');
}
