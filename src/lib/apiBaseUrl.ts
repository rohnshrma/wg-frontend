// In the browser, calls go to a relative path so Vercel's rewrite proxy
// (next.config.ts) forwards them to the backend server-side — this keeps
// the auth cookie first-party instead of cross-site (which Chrome's
// third-party cookie blocking silently drops). Server-side code (SSG/SSR)
// has no running proxy to resolve a relative URL against, so it needs the
// real backend URL directly.
export const API_BASE_URL =
  typeof window === "undefined"
    ? `${process.env.BACKEND_URL || "http://localhost:5001"}/api`
    : process.env.NEXT_PUBLIC_API_URL || "/api";
