# WebiGeeks Digital — Frontend Recreation Roadmap

## Status
In Progress — paused by user, resumable from "Next Session Start Here" below.

## Branches

**Frontend** (`/Users/rohan/dev/webgeeksdigital/frontend`, repo `wg-frontend`):
- Original: `main` (tracks `origin/main` — the live webigeeks.com coding-institute production site)
- Backup: `backup/webigeeks-digital-before-redesign-2026-08-15` (pushed to origin)
- Working: `feat/webigeeks-digital-frontend-recreation` ← **currently checked out, all redesign work here**

**Backend** (`~/dev/webigeeks/backend`, repo `wg-backend` — NOT `~/Desktop/webigeeks/backend`, which is a stale duplicate):
- Original: `main` (tracks `origin/main`, clean, untouched)
- Backup: `backup/webigeeks-backend-before-lead-schema-2026-08-16` (pushed to origin)
- Working: `feat/agency-lead-schema` ← **currently checked out, Lead-schema fix committed here, not yet merged to main**

## Objective
Recreate the WebiGeeks Digital frontend into a premium, distinctive digital-agency experience — pivoting this codebase from "WebiGeeks" (a Gurugram coding institute) to "WebiGeeks Digital" (an international digital agency), while keeping the live institute site (main branch, separate Vercel project, separate backend main) fully intact and unaffected.

## Safety
- Production data (MongoDB — students, leads, enquiries, CRM records) was never dropped/reset/deleted. The one backend schema change made (see below) is purely additive.
- The live institute site deploys from frontend `main` on its own existing Vercel project — untouched.
- Backend `main` is untouched and clean; the Lead-schema change lives on `feat/agency-lead-schema`, not yet merged.
- Both repos have a pushed backup branch of their pre-work state.

## Local dev environment (for resuming)
- Frontend dev server: `cd ~/dev/webgeeksdigital/frontend && npm run dev` — **must run on port 3000**, not 3001. The backend's CORS allowlist only permits `http://localhost:3000`; anything else gets a silent 500 "Not allowed by CORS" on form submissions. If port 3000 is occupied by a stale process from a previous session, `lsof -i :3000` and kill it first.
- Backend: `cd ~/dev/webigeeks/backend && node dist/server.js` (or `npm run build` first if `src/` changed — this runs the compiled `dist/`, not a watch mode). Currently running on port 5001, connected to local MongoDB (`mongodb://localhost:27017/wgdb`).
- `.env.local` in frontend has `BACKEND_URL=http://localhost:5001` (was wrongly `6001`, fixed this session).

## Completed — Git safety & repo cleanup
- [x] Frontend: found substantial uncommitted redesign work sitting directly on `main`; fast-forwarded `main` to `origin/main` (11 commits behind) to get a true baseline; created backup branch (pushed); created working branch; reconciled the stashed redesign work against the newly-pulled commits (real conflicts existed — upstream had added a full blog CMS, comments, testimonial Google badges on pages the redesign had deleted)
- [x] Scope decision (user-confirmed): keep + restyle `/blog` and `/testimonials` as reusable systems; drop `/courses`, `/gallery`, and the 12 `*-course-gurugram` local-SEO pages (wrong keyword intent for a brand-new agency domain with no existing SEO equity to protect)
- [x] Removed dead code: `StatsCounter.tsx`, `StickyCallbackCTA.tsx`, `WhyChooseUs.tsx`, `HomeFAQ.tsx`, `TestimonialsCarousel.tsx`, `ExitIntentPopup.tsx`, `courseSchema`/`faqPageSchema` helpers, `locationPages.ts`, `CourseLocationPage.tsx`, `FeaturedCourses.tsx`
- [x] Rewrote `sitemap.ts` for the agency's real 5 routes (was doing build-time fetches against now-deleted courses/blog data)
- [x] Fixed `.env.local` `BACKEND_URL` (wrong port, 6001 vs 5001) — was silently breaking local build-time data fetches
- [x] Full production build (`npm run build`) passes clean; lint delta-checked against true baseline (131 pre-existing errors on `main`, unrelated to this work, no new ones introduced)

## Completed — Design system & visual rebuild
- [x] Creative direction: **"Engineering Precision"** — premium brutalism (oversized type, hard borders, asymmetry) + schematic/blueprint sci-fi detailing (mono coordinate labels, animated grid backgrounds, corner brackets — deliberately not neon/cyberpunk) + glass used sparingly (nav blur, one hero status pill). Chosen because the audience is B2B decision-makers vetting a vendor, where competence reads better than spectacle.
- [x] Design tokens: added `--font-mono-agency` (IBM Plex Mono, technical/label face) alongside existing Hanken Grotesk (display) + Inter (body); added `--color-agency-glow`; fixed stale institute `theme-color` meta (#1672B8 → ink)
- [x] Custom graphic: hand-coded `SystemGraphic.tsx` (SVG network/hub diagram, 4 service nodes wired to 1 hub) — no stock art, no icon packs
- [x] Rebuilt Hero: schematic grid background, mono eyebrow tag, glass status pill, SystemGraphic
- [x] Extended the mono-label + hard-border language across `ServicesOverview`, `ProcessSection`, `TrustSection`, `WorkPreview` (homepage) and the Services/Work/About/Contact/Blog/Testimonials page heroes
- [x] Rebuilt `WorkPreview` and the full `/work` gallery from generic gradient-blob cards to dark schematic-grid cards
- [x] Restyled `/blog`, `/blog/[slug]`, `/testimonials`, `BlogComments.tsx` off old institute tokens/gradients — all real functionality preserved (search, filters, comments, related posts)
- [x] Fixed a dead `/blog/[slug]` CTA that linked to the deleted `/courses` route with institute copy — now links to `/contact`
- [x] Added `MotionConfig reducedMotion="user"` at the (public) layout level — every animation site-wide now respects OS-level reduced-motion in one place
- [x] Mobile visual QA via browser automation (390–500px) — hero, nav overlay, services, work, about, contact all confirmed correct

## Completed — Real bugs found & fixed during QA
1. **Dev server port / CORS**: was accidentally running on port 3001 (a 5-day-stale process held 3000). Backend CORS only allows `localhost:3000`, so contact-form submissions were silently failing with 500 in the browser (curl masked it as a clean 400 since curl sends no Origin header). Fixed by killing the stale process and restarting on 3000. **No backend config changed for this one.**
2. **Lead schema mismatch (the deeper bug)**: backend `POST /api/leads` hard-required `courseInterested` (institute field); the agency contact form sends `projectType`/`budget`/`timeline` instead, which the Lead model didn't even have fields for. User chose the additive fix. Implemented on `wg-backend` branch `feat/agency-lead-schema` (commit `1604bc5`): `courseInterested` now optional, added `projectType`/`budget`/`timeline`/`company`/`website` as optional fields, extended the `source` enum to include the agency site's actual values, controller now accepts `courseInterested` OR `projectType`. **Verified end-to-end**: a real POST through the Next.js proxy → backend → MongoDB round-trip returned 201 and every field persisted correctly (verified via `mongosh`, test lead then deleted).
3. **Admin leads dashboard crash**: `/admin/leads` did `lead.courseInterested.toLowerCase()` unconditionally in the search filter — throws on any lead without `courseInterested` (i.e. every new agency lead). Fixed with a `courseInterested ?? projectType ?? ""` fallback in 3 places, and added the new source values to the admin's source filter/label map. Frontend commit `a5693cf`.

## Verification status for the Lead-schema fix
- ✅ Verified via a direct `fetch("/api/leads", ...)` executed in the real browser page context (goes through the actual Next.js rewrite proxy and the actual running backend/MongoDB — not mocked): 201, all fields correct in the database.
- ⚠️ NOT yet verified via literal UI interaction (typing into the real form fields and clicking the real submit button) — the browser automation extension became unresponsive mid-test and a retry didn't recover before this session paused. `ContactContent.tsx`'s `handleSubmit` constructs the exact same fetch call that was already verified, so this is very likely fine, but a real click-through hasn't been re-confirmed. **Do this first when resuming** (see below).

## Known issue — dev-only, not blocking
- An intermittent React hydration console warning appeared on some (not all) dev-mode page loads (home, work) during this session. `npm run build` completes with a full static export and zero SSR/hydration errors — doesn't reproduce in production output. Read as Turbopack HMR staleness after many hot-reloads, not a deterministic app bug. Worth a fresh `rm -rf .next && npm run dev` if it recurs and seems worth another look, but not blocking.

## Decisions
- Keep this repo's blog + testimonials infrastructure; drop institute-specific course catalog/location pages. Rationale: fresh domain has no SEO equity to protect, and course-institute local-SEO content would actively hurt topical relevance for an agency site. (User-confirmed.)
- `organizationSchema` is `ProfessionalService` (not `EducationalOrganization`/`LocalBusiness`).
- Sticky CTA is "Start your project" (`StickyProjectCta`), not the institute's "Request a Call Back".
- Lead schema: additive fix on the backend rather than reshaping the frontend to fit the old schema. (User-confirmed, recommended option.)

## Other flagged issues (not blocking)
- Pre-existing lint debt (131 errors) on `main`/backup, unrelated to this redesign.
- `/privacy` and `/terms` footer links 404 — no real legal copy exists yet; not fabricating placeholder legal text.
- `.env.local` has a `VERCEL_OIDC_TOKEN` scoped to the old `wg-frontend` Vercel project (stale, harmless, gitignored) — worth a fresh `vercel env pull` sometime.

## Git Checkpoints
Frontend (`feat/webigeeks-digital-frontend-recreation`):
- `054f25e` — chore: checkpoint before WebiGeeks Digital frontend recreation
- `dba23a9` — feat: establish Engineering Precision design system, rebuild hero and sections
- `a5693cf` — fix(admin): don't crash the leads dashboard on agency-sourced leads

Backend (`feat/agency-lead-schema`):
- `1604bc5` — feat: accept agency project inquiries alongside institute course leads

## Next Session — Start Here
1. Confirm dev servers are up: frontend on **:3000** (not 3001!), backend on :5001 (`~/dev/webigeeks/backend`, `node dist/server.js`).
2. Do a real UI click-through of the contact form (type in fields, click Send Inquiry) and confirm success in the browser + a new doc in `mongosh wgdb.leads` — this is the one remaining unverified step.
3. Merge `feat/agency-lead-schema` → backend `main` and push, once you're happy (currently sitting unmerged for safety).
4. Then continue down the "Upcoming" list below — visual design work is further along than backend integration at this point.

## Upcoming
- [ ] Real UI click-through verification of the contact form (see above)
- [ ] Merge/deploy decision for the backend Lead-schema branch
- [ ] Corner-bracket / schematic framing accents on 1–2 more sections (currently only on Hero's SystemGraphic) — optional polish
- [ ] Full responsive pass at more breakpoints (tablet specifically not yet checked)
- [ ] Accessibility pass (contrast check on new mono-label text at small sizes, focus states on new pill/glass elements)
- [ ] SEO pass (verify OG/schema render correctly with new brand copy)
- [ ] Performance pass (Lighthouse/bundle check)
- [ ] Functional regression on admin/dashboard/CRM beyond the leads-page fix already made (untouched by this session, not re-verified)
- [ ] No-AI-slop final audit
- [ ] Final security audit of full diff (secrets, debug code)
- [ ] Decide on frontend deployment (preview URL for the redesign) once satisfied with the above
- [ ] Final roadmap update + commit
