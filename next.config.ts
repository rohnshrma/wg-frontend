import type { NextConfig } from "next";

// Proxied so the browser only ever talks to webigeeks.com — the backend's
// auth cookie is then first-party instead of cross-site, which Chrome's
// third-party cookie blocking would otherwise silently drop.
//
// BACKEND_URL is resolved once here, at `next build` time — Next.js bakes
// the rewrite destination into .next/routes-manifest.json, so setting the
// env var only at `next start` has no effect on an already-built output.
// Vercel's Production environment sets BACKEND_URL explicitly (verified via
// `vercel env ls production`), so this fallback is dead code there. It used
// to default to the live production backend for every *other* context
// (local builds, Vercel Preview builds — which does NOT set BACKEND_URL
// today) — meaning a local `npm run build` without the var set, or any
// Preview deploy, would silently proxy real traffic, including lead
// submissions, to production. That happened once already during a local
// testing session (2026-08-17). A real Vercel deploy's Production build
// always supplies BACKEND_URL and is unaffected by this change.
const isVercelProductionBuild = process.env.VERCEL_ENV === "production";
const BACKEND_URL =
  process.env.BACKEND_URL ??
  (isVercelProductionBuild
    ? "https://wg-backend-dgtd.onrender.com"
    : "http://localhost:5001");

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
