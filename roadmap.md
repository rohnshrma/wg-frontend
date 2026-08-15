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

## Completed (design + QA)
- [x] Creative direction chosen: "Engineering Precision" — premium brutalism (oversized type, hard borders, asymmetry) + schematic/blueprint sci-fi detailing (coordinate labels, grid backgrounds, corner brackets — not neon/cyberpunk) + glass used sparingly (nav blur, one status pill). Chosen over literal cyberpunk because the audience is B2B decision-makers vetting a vendor, where competence reads better than spectacle.
- [x] Design system v2: added `--font-mono-agency` (IBM Plex Mono, technical/label face) alongside existing Hanken Grotesk display + Inter body; added `--color-agency-glow`; fixed stale institute `theme-color`/`viewport` meta (#1672B8 → ink).
- [x] Custom graphic: hand-coded `SystemGraphic.tsx` (SVG network/hub diagram, 4 service nodes wired to 1 hub) as the hero's visual centerpiece — no stock art, no icon packs.
- [x] Rebuilt Hero with schematic grid background, mono eyebrow tag, glass status pill, SystemGraphic
- [x] Extended the mono-label + hard-border language across ServicesOverview, ProcessSection, TrustSection, WorkPreview (homepage), and the Services/Work/About/Contact/Blog/Testimonials page heroes
- [x] Rebuilt WorkPreview and the full /work page gallery from gradient-blob cards to dark schematic-grid cards (removed a generic-AI-slop pattern)
- [x] Restyled `/blog`, `/blog/[slug]`, `/testimonials`, and `BlogComments.tsx` to the new system (was still on old institute tokens/gradients) — kept all real functionality (search, filters, comments, related posts) intact
- [x] Fixed a real bug found during restyle: `/blog/[slug]` had a dead CTA linking to `/courses` (deleted route) with institute copy ("Join our courses") — replaced with an agency-appropriate `/contact` CTA
- [x] Added `MotionConfig reducedMotion="user"` at the (public) layout level so every Framer Motion animation site-wide respects OS-level reduced-motion in one place
- [x] Mobile visual QA via browser automation (390–500px width) — hero, nav overlay, services, work, about, contact all confirmed rendering correctly
- [x] Diagnosed and ruled out a false alarm: elements appearing stuck at opacity:0 during automated browser QA is a confirmed rAF-throttling artifact of the automation environment (verified: 60 `requestAnimationFrame` ticks took 45s+ to fire), not a real bug — confirmed by force-completing animation end-states and screenshotting
- [x] **Found and fixed a real functional bug**: dev server was accidentally running on port 3001 (port 3000 held by a 5-day-stale process from earlier in this session) — the backend's CORS allowlist only permits `localhost:3000`, so every contact-form submission was silently failing with a 500 "Not allowed by CORS" in the browser while curl (no Origin header) masked it as a clean 400. Killed the stale process, restarted dev server on the correct port 3000. No backend/CORS config changed.

## Known issue — needs a decision (not yet fixed)
- **The contact form cannot succeed end-to-end against the current backend.** After fixing the CORS/port issue above, the backend's `POST /api/leads` still hard-requires a `courseInterested` field (`lead.controller.js`: `if (!name || !phone || !email || !courseInterested) throw BadRequestError(...)`). The agency-pivoted `ContactContent.tsx` sends `projectType`/`budget`/`timeline` instead — fields the institute-era Lead schema doesn't have. This means the CRM lead-capture pipeline (a feature explicitly built earlier this project) has not actually worked since the agency pivot began; QA surfaced it, it isn't a regression from this session's redesign work.
- This is a backend controller/schema change, not a frontend styling one, and not something to decide unilaterally per the explicit backend-caution instructions for this task. Options: (a) make `courseInterested` optional and accept `projectType` as an additive alternative field (safest, keeps institute leads working unchanged), (b) something else the user prefers. Flagged to user; awaiting direction before touching backend code.
- Backend actually running locally is at `~/dev/webigeeks/backend` (repo `wg-backend`), not `~/Desktop/webigeeks/backend` — noting the correct path for any future backend work.

## Known issue — dev-only, not blocking
- An intermittent React hydration console warning appears on some (not all) dev-mode page loads across multiple pages (home, work). `npm run build` completes with a full static export and zero SSR/hydration errors, so this does not reproduce in production output. Not chased further — looked like Turbopack HMR staleness after many hot-reloads during this session, not a deterministic app bug.

## Upcoming
- [ ] Resolve the Lead-schema decision above, then re-verify a real end-to-end contact form submission
- [ ] Corner-bracket / schematic framing accents on 1–2 more sections (currently only on Hero's SystemGraphic) — optional polish
- [ ] Full responsive pass at more breakpoints (tablet specifically not yet checked)
- [ ] Accessibility pass (contrast check on new mono-label text at small sizes, focus states on new pill/glass elements)
- [ ] SEO pass (verify OG/schema render correctly with new brand copy)
- [ ] Performance pass (Lighthouse/bundle check)
- [ ] Functional regression on admin/dashboard/CRM (untouched by this session but not re-verified)
- [ ] No-AI-slop final audit
- [ ] Final security audit of full diff (secrets, debug code)
- [ ] Final roadmap update + commit

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
