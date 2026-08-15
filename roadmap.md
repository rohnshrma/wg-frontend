# WebiGeeks Digital — Frontend Recreation Roadmap

## Status
In Progress

## Branches
- Original: `main` (tracks `origin/main` — the live webigeeks.com coding-institute production site)
- Backup: `backup/webigeeks-digital-before-redesign-2026-08-15` (pushed to origin, exact copy of main at the point redesign work resumed)
- Working: `feat/webigeeks-digital-frontend-recreation`

## Objective
Recreate the WebiGeeks Digital frontend into a premium, futuristic, highly distinctive digital experience — pivoting this codebase from "WebiGeeks" (a Gurugram coding institute) to "WebiGeeks Digital" (an international digital agency), while keeping the live institute site (main branch, separate Vercel project) fully intact and unaffected.

## Safety
- Production data (MongoDB — students, leads, enquiries, CRM records) is never touched by this work; only frontend route/component files are modified.
- The live institute site deploys from `main` on its own existing Vercel project — untouched by anything on this branch.
- `main` was fast-forwarded to match `origin/main` exactly before branching, so backup and original are identical to the true latest production state.
- All redesign work happens on `feat/webigeeks-digital-frontend-recreation` only.

## Completed
- [x] Git inspected — found substantial uncommitted redesign work sitting directly on `main`, and `main` itself 11 commits behind `origin/main`
- [x] Fast-forwarded `main` to `origin/main` (safe, no divergence) to establish a true production baseline
- [x] Backup branch created from that baseline: `backup/webigeeks-digital-before-redesign-2026-08-15`
- [x] Backup verified clean and pushed to `origin`
- [x] Working branch created from backup: `feat/webigeeks-digital-frontend-recreation`
- [x] Roadmap created
- [x] Reconciled prior uncommitted redesign work (stashed) against the 11 newly-pulled commits — real conflicts existed because upstream had added a blog CMS (comments, analytics, HTML import, rich-text editor) and Google-review testimonial badges on top of pages the earlier redesign pass had deleted
- [x] Scope decision made with user: keep + restyle `/blog` and `/testimonials` (reusable systems, not institute-specific); drop `/courses`, `/gallery`, and the 12 `*-course-gurugram` local-SEO pages (wrong keyword intent for a fresh agency domain, no SEO equity to preserve since webigeeksdigital.com is a new domain)
- [x] Removed now-dead code: `StatsCounter.tsx`, `StickyCallbackCTA.tsx`, `WhyChooseUs.tsx`, `HomeFAQ.tsx`, `TestimonialsCarousel.tsx`, `ExitIntentPopup.tsx`, `courseSchema`/`faqPageSchema` helpers, `locationPages.ts`, `CourseLocationPage.tsx`, `FeaturedCourses.tsx`
- [x] Rewrote `sitemap.ts` for the agency's real 5 routes (was fetching now-deleted courses/blog data at build time)
- [x] Fixed `.env.local` `BACKEND_URL` pointing at the wrong port (6001 vs. actual 5001) — was silently breaking local build-time data fetches
- [x] Full production build passes clean (`npm run build`) with backend reachable
- [x] Lint delta-checked against the true baseline — 131 pre-existing errors on `main` are unrelated to this work (Three.js scene, `useAuth`, etc.); no new lint-flagged files introduced

## In Progress
- [~] Repository architecture audit (routes/components mapped; backend/CRM boundaries understood from prior session)

## Upcoming
- [ ] Design research (premium agencies, futuristic/sci-fi interfaces, brutalist sites) → creative direction decision
- [ ] Design system v2 (typography scale, color tokens, brutalism rules, sci-fi motif library, glass usage rules)
- [ ] Custom graphics (hand-coded SVG, no stock/generic icon packs)
- [ ] Rebuild global shell (nav, footer, page transitions) under the new direction
- [ ] Rebuild hero
- [ ] Rebuild Services/Work/About/Contact under the new direction
- [ ] Restyle `/blog` and `/testimonials` to match (content itself — actual posts/reviews — is a separate, later content-authoring task, not part of this frontend pass)
- [ ] Motion system (purposeful scroll reveals, magnetic buttons, respects `prefers-reduced-motion`)
- [ ] Responsive pass (mobile gets its own composition, not a shrink)
- [ ] Accessibility pass
- [ ] SEO pass (metadata/OG/schema for the new brand — organizationSchema already updated to ProfessionalService)
- [ ] Performance pass
- [ ] Visual QA in browser
- [ ] Functional regression (forms, CRM lead submission, admin/dashboard untouched and working)
- [ ] No-AI-slop audit
- [ ] Final roadmap + security audit + commit

## Decisions
- Keep this repo's blog + testimonials infrastructure; drop institute-specific course catalog/location pages. Rationale: fresh domain has no SEO equity to protect, and course-institute local-SEO content would actively hurt topical relevance for an agency site. (User-confirmed.)
- `organizationSchema` is `ProfessionalService` (not `EducationalOrganization`/`LocalBusiness`).
- Sticky CTA is "Start your project" (`StickyProjectCta`), not the institute's "Request a Call Back".

## Issues
- Pre-existing lint debt (131 errors) on `main`/backup, unrelated to this redesign — not in scope to fix here, noting for awareness.
- `/privacy` and `/terms` footer links 404 — no real legal copy exists yet; not fabricating placeholder legal text. Flagged, not blocking.
- `.env.local` contains a `VERCEL_OIDC_TOKEN` scoped to the old `wg-frontend` Vercel project (stale, from before this codebase was re-linked to a new project) — harmless (short-lived token, gitignored file) but worth a fresh `vercel env pull` at some point.

## Git Checkpoints
- (pending first commit on this branch — see below)

## Final Notes
(to be filled in at completion)
