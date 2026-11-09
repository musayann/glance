import type { NextConfig } from "next";

// Discussion and profile pages render per request, and the set of possible URLs
// is huge, so ISR would write every new page to durable storage. The CDN cache
// holds them for 15 minutes without any ISR writes.
const cdnCache15Minutes = [
  { key: "Vercel-CDN-Cache-Control", value: "max-age=900" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/item/:id", headers: cdnCache15Minutes },
      { source: "/user/:id", headers: cdnCache15Minutes },
    ];
  },
};

export default nextConfig;
