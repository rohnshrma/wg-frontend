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
};

export default nextConfig;
