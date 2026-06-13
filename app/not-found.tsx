import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="text-muted-foreground">
        This page could not be found.
      </p>
      <Button asChild>
        <Link href="/">Back to top stories</Link>
      </Button>
    </div>
  );
}
