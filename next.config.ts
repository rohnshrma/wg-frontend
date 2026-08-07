import type { NextConfig } from "next";

// Proxied so the browser only ever talks to webigeeks.com — the backend's
// auth cookie is then first-party instead of cross-site, which Chrome's
// third-party cookie blocking would otherwise silently drop.
const BACKEND_URL = process.env.BACKEND_URL || "https://wg-backend-dgtd.onrender.com";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      // www.webigeeks.com was serving as a live, uncached duplicate of the
      // canonical bare domain (confirmed via PageSpeed Insights + curl,
      // 2026-08-07) — self-canonicalized in metadata but never actually
      // redirected, so any real visitor/backlink using "www." got a
      // separately-cached, worse-performing copy of the site instead of
      // landing on the canonical, well-cached host.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.webigeeks.com" }],
        destination: "https://webigeeks.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
