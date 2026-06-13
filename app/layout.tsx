import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/layout/site-header";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Glance — an unofficial Hacker News reader",
    template: "%s · Glance",
  },
  description:
    "Glance is a fast, modern, unofficial reader for Hacker News: top stories, comments, search, and user profiles. Not affiliated with Y Combinator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-dvh flex-col antialiased`}
      >
        <Providers>
          <SiteHeader />
          <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6">
            {children}
          </main>
          <footer className="text-muted-foreground border-t py-6 text-center text-sm">
            Data from the{" "}
            <a
              href="https://github.com/HackerNews/API"
              className="hover:text-foreground underline underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              Hacker News API
            </a>
            . Not affiliated with Y Combinator.
          </footer>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
