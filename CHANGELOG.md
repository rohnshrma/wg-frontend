# Changelog

Notable changes to the frontend. Full context and rationale for each entry lives in the backend's `ROADMAP.md` (shared source of truth across both repos); this file is a scannable index.

## 2026-08-19

- **New**: Data Analytics paid-ads landing page at `/lp/data-analytics-course` (outside the `(public)` route group — no site nav/footer, `noindex`), live at `webigeeks.in` via host-based routing in `proxy.ts`. Two lead-capture forms (hero qualifying form + curriculum-download modal), both posting to the real `/api/leads`. Curriculum content and the downloadable PDF match the business owner's actual official curriculum deck.
- **Bug fix**: white-on-white text in the ads page's form inputs (`<input>` never set an explicit text color, inherited white from the page's dark theme).
- **Data fix**: replaced fabricated testimonials/salary-range/placement-guarantee claims from an AI-generated content brief with real data (real alumni testimonials, real ₹3.5-10 LPA salary range, no more unsubstantiated "guaranteed" placement claims). Ads-page testimonials now fetch live from the `Testimonial` collection instead of a hardcoded array.
- See `ROADMAP.md` "Data Analytics ads landing page + webigeeks.in launch" for full detail, plus an important note on `~/Desktop/webigeeks` and `~/dev/webigeeks` checkout health.

## 2026-07-29

- **Layout fix**: the admin/dashboard/counsellor sidebars and their sticky top headers scrolled away with the page instead of staying pinned. Cause was `body { overflow-x: hidden }` in `globals.css`, which makes the body a scroll container so every `position: sticky` descendant resolves against the body's (never-scrolling) scrollport rather than the viewport. Changed to `overflow-x: clip`, which clips identically without creating a scroll container. `html`'s own `overflow-x: hidden` is unchanged — it propagates to the viewport and was never the problem. Verified in real headless Chrome against the running app, including a control run that re-injected the old rule and reproduced the bug.

## 2026-07-25

- Wired the public `/testimonials`, `/gallery`, `/blog`, and `/blog/[slug]` pages to real backend data (previously hardcoded placeholder arrays) via `lib/{testimonials,gallery,blog}.ts`, following the existing `lib/courses.ts` server-fetch + ISR pattern. Added empty states.
- Built out the admin `/admin/testimonials`, `/admin/gallery`, `/admin/blogs` CRUD UIs (previously non-functional static stubs) — list, create, edit, delete, following the existing `admin/courses` conventions.
- Added `images.remotePatterns` for `res.cloudinary.com` in `next.config.ts` to enable `next/image` for uploaded content.
- Added a Vitest + React Testing Library suite covering the new CMS pages' loading/empty/error/populated states.
- **Known pre-existing issue, not addressed here**: `npm run lint` has ~55 pre-existing errors app-wide (confirmed present before this session's changes) — mostly `no-explicit-any` in `catch` blocks and a stricter `react-hooks` ruleset flagging the app's established `useEffect`-based data-fetching pattern used throughout `useAuth.ts` and every dashboard/admin page. Flagged as a Phase 10/11 cleanup item rather than risked as an unscoped refactor of auth-critical code.
