# Changelog

Notable changes to the frontend. Full context and rationale for each entry lives in the backend's `ROADMAP.md` (shared source of truth across both repos); this file is a scannable index.

## 2026-08-31

- **New**: full bespoke redesign of `/mern-course-gurugram` (premium dark developer-bootcamp landing page). Own component folder under `src/app/(public)/mern-course-gurugram/` (16 new files); no longer renders the shared `location-pages/CourseLocationPage.tsx` template — the other 11 `*-course-gurugram` pages are untouched. Stays in `(public)` (keeps navbar/footer/canonical/sitemap/reciprocal link).
- Interactive, MERN-specific sections: clickable React/Express/Node/MongoDB architecture diagram, expandable 16-module curriculum, project cards as tabbed spec sheets (Features / Mongoose schema / REST routes), an "API request → DB → UI" flow where each hop reveals its code, count-up trust stats, code-snippet copy buttons, scroll-reveal + stagger animations (all `prefers-reduced-motion` aware).
- Conversion mechanics reused from the DA `/lp` page, not duplicated: one `POST /api/leads` (`source: "course_page"`), the same Google Ads "Contact" conversion action, GA4 via the root layout. Lead-gated `CurriculumDownload` modal in the hero / curriculum / bottom CTA; hero form auto-downloads the PDF on success. `public/downloads/mern-stack-curriculum.pdf` is the owner's real brochure.
- All copy sourced from `courseData["mern-stack-development"]` / `config/site.ts` / the owner's PDF — ₹30,000 → ₹19,999 (owner-confirmed), "placement assistance" never "guaranteed", stats asterisked, nothing invented. Testimonials section renders only if real MERN reviews exist in the DB (none today → hidden).
- Copy rewritten by hand for plain human cadence (em-dashes ~40→~5, rule-of-three lists broken up, filler cut); verified no invisible Unicode / homoglyphs. Not claimed detector-proof.
- **SEO**: `<title>` trimmed 82→~50 chars, meta description ~145, primary keyword now leads the hero body, FAQ questions in `<h3>`, `twitter:card` → `summary_large_image`. `StackDiagram` and `ProjectShowcase` panels all render in the DOM (`hidden` toggle, no `AnimatePresence`) so the code samples / schemas / routes are in the server-rendered HTML.
- **Bug fixes** (this page): `CountUp` counter froze because `value.match()` was an unstable `useEffect` dep restarting the rAF every frame; React duplicate-key crash in the project API tab (`PUT` + `DELETE` both on `/api/students/:id`, keyed by `path`); the sticky enrol bar was translucent so trust numbers ghosted through it half-clipped (that bar was later removed at the user's request); `StickyCallbackCTA` now hides on this route only via a `usePathname` guard.
- **Edits**: `src/data/locationPages.ts` (MERN entry meta/H1 copy only), `src/app/globals.css` (namespaced `.mern-lp` token/keyframe block, additive), `src/components/layout/StickyCallbackCTA.tsx` (`HIDDEN_ON` pathname guard).
- Verified: `tsc` + `eslint` + `next build` compile clean; walked in headless Chrome, no console errors. Not verified: live `/api/leads` POST and GA/Ads firing (needs a Vercel preview; no local backend). See `ROADMAP.md` "MERN Stack course page — full premium redesign".

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
