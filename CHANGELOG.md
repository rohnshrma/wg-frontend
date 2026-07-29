# Changelog

Notable changes to the frontend. Full context and rationale for each entry lives in the backend's `ROADMAP.md` (shared source of truth across both repos); this file is a scannable index.

## 2026-07-29

- **Layout fix**: the admin/dashboard/counsellor sidebars and their sticky top headers scrolled away with the page instead of staying pinned. Cause was `body { overflow-x: hidden }` in `globals.css`, which makes the body a scroll container so every `position: sticky` descendant resolves against the body's (never-scrolling) scrollport rather than the viewport. Changed to `overflow-x: clip`, which clips identically without creating a scroll container. `html`'s own `overflow-x: hidden` is unchanged — it propagates to the viewport and was never the problem. Verified in real headless Chrome against the running app, including a control run that re-injected the old rule and reproduced the bug.

## 2026-07-25

- Wired the public `/testimonials`, `/gallery`, `/blog`, and `/blog/[slug]` pages to real backend data (previously hardcoded placeholder arrays) via `lib/{testimonials,gallery,blog}.ts`, following the existing `lib/courses.ts` server-fetch + ISR pattern. Added empty states.
- Built out the admin `/admin/testimonials`, `/admin/gallery`, `/admin/blogs` CRUD UIs (previously non-functional static stubs) — list, create, edit, delete, following the existing `admin/courses` conventions.
- Added `images.remotePatterns` for `res.cloudinary.com` in `next.config.ts` to enable `next/image` for uploaded content.
- Added a Vitest + React Testing Library suite covering the new CMS pages' loading/empty/error/populated states.
- **Known pre-existing issue, not addressed here**: `npm run lint` has ~55 pre-existing errors app-wide (confirmed present before this session's changes) — mostly `no-explicit-any` in `catch` blocks and a stricter `react-hooks` ruleset flagging the app's established `useEffect`-based data-fetching pattern used throughout `useAuth.ts` and every dashboard/admin page. Flagged as a Phase 10/11 cleanup item rather than risked as an unscoped refactor of auth-critical code.
