# AIEO WEBSITE AUDIT — WebiGeeks (webigeeks.com / webigeeks.in)

**Audit date:** 2026-09-17
**Scope:** `wg-frontend` (`main` branch, commit `7f22007`) + `wg-backend` (schema/API-relevant portions) local source, cross-checked against the live production sites `https://webigeeks.com` and `https://webigeeks.in`.
**Method:** Direct source inspection (Read/Grep) of the Next.js App Router codebase, plus live fetches of production pages, `robots.txt`, and `sitemap.xml`. Three lightweight competitor fetches for Phase 6. No code was modified. No file other than this report was written.

**Evidence tagging used throughout:** **OBSERVED** (directly read in source code or a live HTTP response) / **INFERRED** (a reasonable conclusion from observed evidence, not itself directly fetched) / **NOT TESTABLE** (would require access this audit doesn't have — e.g., real AI-assistant citation logs, Search Console data, GA4 dashboards).

---

## Executive Summary

WebiGeeks is a real, single-location coding institute in Sector-14, Gurugram, with a genuinely well-built Next.js site that already carries more AIEO-relevant infrastructure than the norm for a business this size: real `Organization`/`Course`/`FAQPage`/`BreadcrumbList` JSON-LD, Gurugram-targeted metadata, a clean `robots.txt`/`sitemap.xml`, and a prior SEO remediation history (documented in `backend/ROADMAP.md`) that already fixed several genuine crawlability bugs (OG/canonical inheritance, sitemap timestamp accuracy, WCAG contrast). Two of three competitor pages checked in this audit (ACIL, Croma Campus) had **no detectable structured data at all** — WebiGeeks is ahead of at least part of its local competitive set on this specific dimension.

That said, this audit is scoped to AI Engine Optimization specifically, not traditional SEO, and on that axis the site has real, fixable gaps: it has **zero named human identity** anywhere (no founder, no instructor, no author — a hard ceiling on E-E-A-T-style trust signals AI systems weight heavily), **exactly one blog post** in the entire content library (a severe topical-authority gap), **no Review/AggregateRating schema on the page literally dedicated to testimonials** despite having ~32 real reviews in the database, and a genuinely broken piece of self-consistency: the site publicly lists and links to 14 live courses (confirmed via the sitemap and the DB-backed `/courses` page), but every lead-capture form on the site (`InquiryPopup`, `StickyCallbackCTA`, the hero form, the contact page) only offers 10 course options in its dropdown, because those forms read a stale hardcoded list instead of the same database the `/courses` page uses. A prospective student interested in Digital Marketing or Mobile App Development — both real, live WebiGeeks courses — literally cannot select their course of interest in any form on the site.

**Current AIEO Score: 58/100** — a genuinely mid-tier result: real foundations, real gaps, nothing fabricated in either direction.

---

## Website Understanding

- **Business name:** WebiGeeks (OBSERVED, `src/config/site.ts:2`; alternate name "WebiGeeks Coding Institute", `src/lib/schema.ts:18`).
- **Business category:** Coding/IT skills training institute — dual-typed in its own schema as both `EducationalOrganization` and `LocalBusiness` (OBSERVED, `src/lib/schema.ts:15`).
- **Main services:** 14 live courses per the production sitemap and `/courses` (DB-backed) — MERN Stack Development, Python Programming, Data Analytics with Python, Data Science, Artificial Intelligence, Power BI, SQL, Java, C/C++, MS Excel, React JS, TypeScript, Digital Marketing, Mobile App Development (OBSERVED, live `sitemap.xml`). The static `siteConfig.courses` array used across marketing UI lists only 10 of these — Digital Marketing and Mobile App Development are missing from it (OBSERVED, `src/config/site.ts:27-37` vs. sitemap).
- **Target audience:** Career-changers, students, and working professionals seeking practical/placement-oriented IT skills training, framed for beginners through the FAQ ("Do I need prior knowledge?") and "beginner"-level course metadata (OBSERVED, live fetch of `/courses/digital-marketing`).
- **Geographic targeting:** Sector-14, Gurugram specifically, with heavy "Gurugram"/"Gurgaon" keyword targeting across titles/descriptions and 12 dedicated `*-course-gurugram` local-intent landing pages (OBSERVED, `src/data/locationPages.ts`).
- **Primary commercial intent:** Lead generation for course enrollment — every page funnels to a phone/WhatsApp/lead-capture form, not e-commerce checkout (OBSERVED).
- **Main pages:** Home, About, Courses (list + 12+ detail pages), Testimonials, Gallery, Blog (list + posts), Contact, 12 `*-course-gurugram` location pages, 1 paid-ads landing page (`/lp/data-analytics-course`, also served at the `webigeeks.in` root) (OBSERVED, `src/app` route tree).
- **Blog/content:** One (1) published post live in production as of this audit (OBSERVED, live `sitemap.xml` — a single `blog/...` entry).
- **Contact info:** Phone `+91 8766367815` / `+91 9871257943`, email `webigeeksofficial@gmail.com`, address "M-18, Ground Floor, Old DLF Colony, Sector-14, Gurugram, Haryana", Google Maps link (OBSERVED, `src/config/site.ts:11-17`; confirmed live on homepage fetch).
- **About/business info:** Founded narrative exists (per `backend/ROADMAP.md`'s 2026-08-06 entry, corrected to a real 2023 founding date and real alumni companies — KPMG, Extramarks, Ferns N Petals, Descriptive AI, Flick AI, Smart Data Enterprises), but **no named founder or instructor anywhere** — the About page content refers only to "an experienced instructor" generically (OBSERVED, `src/app/(public)/about/AboutContent.tsx:48`).
- **Existing schema:** `Organization`+`LocalBusiness` (root layout, sitewide), `Course` (course detail + location pages, conditional `AggregateRating`), `FAQPage` (location pages, ads LP), `BreadcrumbList` (course detail, blog detail, location pages), `BlogPosting` (blog posts). No `WebSite`, `Person`, `Product`, `Review` schema anywhere (OBSERVED, `src/lib/schema.ts`, full-repo grep).
- **Internal linking:** Footer links to all 12 location pages (per ROADMAP, added 2026-08-07 specifically to fix a link-starvation issue), course pages cross-link to related courses and their matching location page, blog posts link to course pages (OBSERVED, live blog-post fetch).

---

## AIEO Score

## AIEO SCORE: 58/100

---

## Score Breakdown

| Category | Score | Max |
|---|---:|---:|
| AI Crawlability & Accessibility | 11 | 15 |
| Semantic Understanding & Content Structure | 10 | 15 |
| Structured Data / Schema | 9 | 15 |
| Entity & Knowledge Graph Signals | 4 | 10 |
| Answer Engine Readiness | 9 | 15 |
| Topical Authority & Content Coverage | 3 | 10 |
| Trust, Experience & Information Quality | 5 | 10 |
| Technical SEO Supporting AIEO | 7 | 10 |
| **TOTAL** | **58** | **100** |

---

## AI Crawlability

**Score: 11/15**

**OBSERVED, live:**
- `robots.txt` (`https://webigeeks.com/robots.txt`) matches source exactly: `Allow: /`, sensible disallows on `/admin`, `/dashboard`, `/api`, and the four auth pages, correct `Sitemap:` directive. Clean, no over-blocking.
- `sitemap.xml` returns 35 real URLs with genuine, varied `lastModified` timestamps for DB-backed content (courses show real `updatedAt` values ranging from Aug 7 to Sep 15) — confirms the ROADMAP's documented 2026-08-06 fix (sitemap previously lied about `lastModified`) is still holding in production.
- Server-rendered content: this is a Next.js App Router site using server components for all public pages (OBSERVED, `src/app/(public)/**/page.tsx` are async server components fetching data server-side) — content is present in initial HTML, not JS-dependent for crawlers. This is a genuine strength for AI crawlers that don't execute JS (most don't).
- `www.webigeeks.com` → `webigeeks.com` 308 redirect exists per ROADMAP (2026-08-07 fix), not independently re-verified live in this audit (**NOT TESTABLE this session** — would require a second live fetch not performed).
- The known `mern-stack-course-gurugram` 404 (flagged in `backend/TASKS.md` as a stale link inside one blog post's body content) is **still live and unresolved**: `https://webigeeks.com/mern-stack-course-gurugram` returned a real 404 (OBSERVED, live fetch, this audit). The correct route is `/mern-course-gurugram`.

**Deductions:**
- −2: the one confirmed live 404, reachable from an internal link inside the site's own (only) blog post — a crawl-depth/broken-link issue that directly hurts an AI crawler's trust in the site's link graph.
- −1: no `WebSite` schema with a `potentialAction: SearchAction` anywhere (OBSERVED, full-repo grep for `"WebSite"` in `src/lib/schema.ts` and elsewhere returns nothing) — a standard, low-effort signal for "this is a distinct, searchable site" that's absent.
- −1: `/lp/data-analytics-course` is reachable and indexable at **four** distinct URLs (`webigeeks.in`, `www.webigeeks.in`, and both again under `/lp/data-analytics-course`) — correctly consolidated via a single `alternates.canonical` to `webigeeks.in` (OBSERVED, `src/app/(ads)/lp/data-analytics-course/page.tsx:10,29`), so this is *not* a duplicate-content penalty risk, but it is real complexity in the crawl graph worth a partial deduction for the four-URL surface area alone.

---

## Semantic Content Analysis

**Score: 10/15**

**OBSERVED (source + live):**
- Homepage has exactly one real `<h1>` ("Become Industry Ready...", `src/components/home/HeroSection.tsx:113`) — a live-fetch tool initially reported what looked like two H1s, but source inspection confirmed "Your AI Skill Partner" is a `<span>` inside a pill badge above the H1, not a second heading. **No duplicate-H1 bug** — correcting a false positive rather than reporting one.
- Clear H2 hierarchy on the homepage: "What Makes WebiGeeks Different?", "Our Featured Courses", "What Our Students Say", "Frequently Asked Questions", "Ready to Book a Free Demo?" (OBSERVED, live fetch) — logically organized, answer-oriented section names.
- FAQ content is genuinely present and substantive on the homepage, all 12 location pages, and the ads LP (OBSERVED across all three).
- Contextual internal linking exists (location pages ↔ course pages, blog → courses, footer → all location pages).
- Semantic HTML: `<nav aria-label="Breadcrumb">`, proper heading nesting fixed per ROADMAP's 2026-08-26 accessibility pass (`h1 → h2 → h2 → h2 → h3`, zero skips, on the ads LP specifically).

**Gaps:**
- No dedicated, crawlable "What is WebiGeeks" or "Who is WebiGeeks for" definitional block anywhere outside the FAQ — an AI system has to synthesize this from scattered hero copy + FAQ answers rather than reading one clear, quotable paragraph.
- Pricing is explicitly absent sitewide (OBSERVED — "None visible" on live homepage fetch; course cards show "On Enquiry" per `CourseDetailContent.tsx:152`). This is a deliberate business choice (course pricing requires a sales conversation), but it means **zero AI system can ever answer "how much does the MERN course cost?" from this site alone** — a direct, unavoidable gap against the Phase 3.5/Answer-Readiness framework's own example query.
- The 10-vs-14 course list inconsistency described in the Executive Summary directly undermines "what services does this business provide" — a machine reading `siteConfig.courses` (used in 4 different UI components) would conclude WebiGeeks teaches 10 things; a machine reading the sitemap or `/courses` would correctly conclude 14.

---

## Structured Data Audit

**Score: 9/15**

**Full JSON-LD inventory (OBSERVED, `src/lib/schema.ts` + component grep):**

| Type | Where | Notes |
|---|---|---|
| `EducationalOrganization` + `LocalBusiness` (dual-typed, single node) | Root layout, every page | `@id`, name, alternateName, url, logo (string URL, not `ImageObject`), image, description, telephone, email, `PostalAddress`, `areaServed`, `sameAs` (4 of 5 social profiles — Twitter/X missing despite existing in `siteConfig.social.twitter`) |
| `Course` | Course detail pages, 12 location pages | name, description, provider, `CourseInstance` (mode/workload/location), conditional `AggregateRating` (only emitted when ≥1 real linked rating exists — a genuinely good anti-fabrication guard, explicitly commented as such) |
| `FAQPage` | 12 location pages, ads LP | Built from the same array the visible accordion renders (`faqs.ts`), so markup and visible text cannot drift — correctly avoids the cloaking risk Google's guidelines flag |
| `BreadcrumbList` | Course detail, blog detail, location pages, mern-course-gurugram | Correct `ListItem`/`position`/`item` structure |
| `BlogPosting` | Blog posts | headline, description, image, dates, author (Organization, not Person — see Entity Signals), publisher with logo `ImageObject` |

**Missing entirely (OBSERVED, absence confirmed by full-repo grep for each type string):**
- `WebSite` — no site-level entity distinct from the Organization node.
- `Person` — zero instances anywhere. No founder, no instructor, no blog author as a person.
- `Review` / standalone `AggregateRating` on the **Testimonials page itself** — `src/app/(public)/testimonials/TestimonialsContent.tsx` has no `JsonLd`/schema import at all, despite the page existing specifically to display ~32 real testimonials (per `backend/ROADMAP.md`'s 2026-08-08 entry: "20 real reviews are now live" + a prior manual entry, several since supplemented). This is the single clearest, lowest-risk structured-data opportunity on the whole site — the reviews are real, sourced, and already in the database; they're just not marked up as `Review`/`AggregateRating` anywhere.
- `Service` — course offerings are modeled as `Course`, not `Service`; reasonable given they genuinely are courses, not generic services, so this is not a gap, just a note that `Service` schema doesn't apply here.
- `Product` — correctly absent; nothing here is a product in schema.org's sense.

**No fake, misleading, duplicated, or contradictory schema found.** The conditional `AggregateRating` guard on `Course` and the deliberate *absence* of `aggregateRating` on the ads-LP's `Course` node (per ROADMAP: "only 1 of the 32 reviews in the DB is Data-Analytics-specific... a rating here would borrow the institute's general reviews to rate one course — the self-serving markup Google's guidance rules out") is a genuinely disciplined, above-average practice worth crediting explicitly.

**Deductions:** −2 no `WebSite`, −2 no `Person` anywhere, −2 no `Review`/`AggregateRating` on the testimonials page.

---

## Entity / Knowledge Graph Analysis

**Score: 4/10**

**OBSERVED:**
- NAP (Name/Address/Phone) is consistent between `siteConfig.ts`, `schema.ts`, and the live homepage fetch — no contradictions found.
- `sameAs` links 4 real social profiles (Instagram, Facebook, LinkedIn, YouTube) — Twitter/X exists in config but is not included in `sameAs` (a one-line omission, `src/lib/schema.ts:38-43` vs `src/config/site.ts:20-25`).
- Single, consistent business name and alternate name.
- Geographic identity is strong and specific (exact street address, Sector-14, Gurugram — not just "Gurugram" vaguely).

**Missing (the largest single gap category in this audit):**
- **Zero named human identity anywhere on the site.** No founder name, no instructor name, no author byline on the one blog post (attributed to generic "WebiGeeks Team"), no team page, no LinkedIn profiles for real staff linked from anywhere. For an AI system trying to establish "who is behind this business, and are they credible," WebiGeeks currently offers nothing beyond the organization's own self-description — no independently verifiable human expertise signal at all.
- No `Person` entities means no `worksFor`/`founder` relationship exists for Google's Knowledge Graph or any AI system's entity graph to hang credibility on.
- No external references / citations *to* WebiGeeks from third parties were verified in this audit (**NOT TESTABLE** — would require a backlink-index tool this audit doesn't have access to; not claiming either presence or absence).
- No `areaServed`-level `geo` coordinates (`latitude`/`longitude`) on the Organization schema — deliberately, and correctly, left out per an explicit `TODO` comment in the source (`src/lib/schema.ts:33-36`: "placeholder coordinates are worse than none... left out entirely until the real values are known"). This is a disciplined choice, not carelessness, but it is still a missing signal worth 1 point of the deduction below until the real coordinates are added.

---

## Answer Engine Readiness

**Score: 9/15**

Testing the framework's own example questions against actual site content:

| Question | Answerable? | Evidence |
|---|---|---|
| What does WebiGeeks do? | ✅ Yes, explicitly | Homepage hero + meta description: "AI-integrated coding classes in Sector-14, Gurugram" |
| What services does WebiGeeks provide? | ⚠️ Partially, inconsistently | `/courses` (DB) says 14; every lead form (`siteConfig.courses`) implies 10 — see Semantic Content Analysis |
| Where is WebiGeeks located? | ✅ Yes, explicitly, with a full street address | Footer, homepage, `Organization` schema `PostalAddress` |
| How much does [course] cost? | ❌ No | Deliberately not published anywhere ("On Enquiry") |
| Who is [course] for? | ✅ Yes, per-course | Level field ("beginner"/"intermediate") shown on every course page |
| How does [service] work? | ⚠️ Partially | Course pages show curriculum/duration/mode, but no step-by-step "how our program works" explainer exists sitewide |
| What makes WebiGeeks different? | ✅ Yes, dedicated H2 section | Homepage "What Makes WebiGeeks Different?" |
| Is [course] suitable for beginners? | ✅ Yes | Per-course `level` field, explicit in FAQ ("Do I need prior knowledge to join?") |
| How long does [course] take? | ✅ Yes | `duration` field shown on every course page ("3 Months hybrid beginner" etc.) |
| What are the requirements? | ✅ Yes, in FAQ on the ads LP; ⚠️ not consistently on organic course pages | |
| How can someone contact WebiGeeks? | ✅ Yes, extensively | Phone (×2), email, WhatsApp, address, map link, contact form |

**Strengths:** the FAQ pattern (real, visible, schema-marked-up Q&A) is the single strongest Answer-Engine-Readiness asset on the site, and it's applied consistently across the homepage, all 12 location pages, and the ads LP.

**Gaps:**
- Pricing is a hard, permanent "no" for any pricing-related query — a real, structural limitation an AI system cannot work around regardless of how well the rest of the site is optimized.
- The FAQ pattern is **not** present on the plain `/courses/[slug]` detail pages themselves (only on the location-page variants) — a direct MERN course inquiry landing on `/courses/mern-stack-development` gets curriculum/duration but no Q&A block, while `/mern-course-gurugram` (a different URL, same course) does. This is an inconsistent answer-readiness experience depending on which of two URLs for the same course an AI system happens to retrieve.
- No comparison content anywhere ("MERN vs Python for beginners", "Data Analytics vs Data Science — which one should I pick") — a real, addressable content gap for the "Comparison" query category tested in Phase 4.

---

## Topical Authority

**Score: 3/10**

**TOPIC → SUBTOPIC → ENTITY → SERVICE map (constructed from observed content):**

```
Coding/IT Skills Training (Gurugram)
├── Web Development
│   ├── MERN Stack Development → WebiGeeks → /courses/mern-stack-development, /mern-course-gurugram
│   ├── React JS → WebiGeeks → /courses/react-js, /react-course-gurugram
│   └── TypeScript → WebiGeeks → /courses/typescript, /typescript-course-gurugram
├── Data
│   ├── Data Analytics with Python → WebiGeeks → /courses/data-analytics-with-python, /data-analytics-course-gurugram, /lp/data-analytics-course
│   ├── Data Science → WebiGeeks → /courses/data-science, /data-science-course-gurugram
│   ├── SQL → WebiGeeks → /courses/sql, /sql-course-gurugram
│   └── Power BI → WebiGeeks → /courses/power-bi, /power-bi-training-gurugram
├── AI → WebiGeeks → /courses/artificial-intelligence, /ai-course-gurugram
├── Programming Fundamentals
│   ├── Python Programming → WebiGeeks → /courses/python-programming (no dedicated location page)
│   ├── Java → WebiGeeks → /courses/java-programming, /java-course-gurugram
│   └── C/C++ → WebiGeeks → /courses/c-cpp-programming, /c-cpp-course-gurugram
├── Office/Productivity: MS Excel → WebiGeeks → /courses/ms-excel, /ms-excel-course-gurugram
├── Digital Marketing → WebiGeeks → /courses/digital-marketing (no location page, no siteConfig entry)
└── Mobile App Development → WebiGeeks → /courses/mobile-app-development (no location page, no siteConfig entry)
```

**Assessment: this is a set of isolated service pages with local-intent duplicates, not genuine topical depth.** Every "supporting content" layer that would demonstrate real subject-matter authority — tutorials, guides, glossaries, "how to get started with X", career-path explainers, alumni case studies with detail beyond a name/company — is absent, because the blog (the only place this kind of content could live) has exactly **one post**. That post itself is well-written and well-structured (H2/H3 hierarchy, ~2,800 words, internal links), but one article cannot establish topical authority across 14 distinct subject areas. Python Programming, Digital Marketing, and Mobile App Development have **zero** supporting content of any kind beyond their single course description page — no location page, no blog coverage, no FAQ depth.

This is, along with the missing human-identity signals, the other primary factor holding the overall score down, and it's also the item this audit's evidence most directly agrees with the project's own prior finding: `backend/ROADMAP.md`'s 2026-08-07 entry already identified "Content & Authority is the highest-leverage remaining item" for traditional SEO (scored ~4.5/10 in that audit) — this AIEO audit independently arrives at the same conclusion via a different framework, which is a meaningful cross-check, not a coincidence.

---

## Trust & Information Quality

**Score: 5/10**

**Positive signals (OBSERVED):**
- Real, specific street address (not a PO box or vague city name).
- Real testimonials with names and companies (Ravi Kumar/Adobe, Abhishek Keshri/KPMG, Akshay Baldia/Streams Solutions, plus ~20+ Google reviews per ROADMAP's 2026-08-08 entry) — genuinely sourced, not invented, per that same session's documented correction of fabricated testimonials on an earlier draft of the ads LP.
- Deliberately restrained claims: `siteConfig.ts:41-44` explicitly documents that a specific "students placed" headcount was *removed* because "a specific headcount... isn't a claim we can stand behind" — this is a genuinely unusual, positive discipline (most sites in this space do the opposite).
- No `aggregateRating` fabricated where real data doesn't support it (see Structured Data Audit) — same discipline applied to schema as to prose.
- Privacy policy page exists (`/privacy-policy`).

**Unsupported-superlative check:** searched course/marketing copy for "Best"/"No.1"/"Leading"/"Top"/"Guaranteed" — none of these appear in the reviewed on-page copy for `siteConfig.ts`, the homepage FAQ, or course descriptions (OBSERVED). The ads LP FAQ does contain the *question* "Is placement guaranteed?" but per ROADMAP's 2026-08-19 entry the answer was deliberately rewritten away from a guarantee claim toward "placement *support*, not guarantee" — the right call, and consistent with the no-superlatives pattern found elsewhere.

**Gaps:**
- No named authorship anywhere (see Entity Signals) — this is the single largest deduction in this category, since author/expertise identity is a core E-E-A-T-style signal AI systems specifically look for.
- The one blog post cites statistics ("roughly 6% of applications come through referrals, yet they account for around 37% of all hires") attributed only to unlinked "industry data" — no source, no link, not verifiable by a reader or an AI system.
- No dates-of-update shown on evergreen pages (course pages, location pages) — only the blog post has a visible publish date.
- No case studies beyond name+company testimonials — no detail on what a specific student's actual outcome/project/salary progression looked like.

---

## Technical SEO

**Score: 7/10**

**OBSERVED, live and source:**
- HTTPS on both domains, confirmed via successful `https://` fetches.
- `robots.txt`/`sitemap.xml` clean (see AI Crawlability).
- Title tags present and reasonably sized on every page checked (homepage: "WebiGeeks — Coding Institute in Gurugram | MERN & Python", 58 chars; ads LP: 58 chars — both within Google's typical display budget per ROADMAP's own documented character-count fixes).
- Open Graph present and page-specific (not a single sitewide inherited card) — per ROADMAP's 2026-08-26/27 fix, every page now sets its own OG rather than inheriting the root layout's.
- `next/image` used with `remotePatterns` configured for Cloudinary; zero empty `alt=""` attributes found in a full-repo grep of `src/components` and `src/app`.
- Mobile viewport correctly configured (`width: device-width, initialScale: 1`, per `src/app/layout.tsx:74-79`) with pinch-zoom deliberately left enabled — a genuine accessibility-correct choice, not an oversight.
- The one confirmed live 404 (`/mern-stack-course-gurugram`, linked from the site's own blog content) is a real broken-link deduction.

**Not independently re-verified this session (relying on ROADMAP's prior documented measurements, flagged NOT TESTABLE here since this audit did not re-run Lighthouse/PSI):**
- Core Web Vitals — ROADMAP's last real Lighthouse pass (2026-08-27, ads LP) reported Performance 75, SEO 100, Accessibility 95, CLS 0, with LCP "4.97s simulated vs 1.73s observed." This audit did not re-run Lighthouse and cannot confirm these numbers still hold on the current deployed build — **NOT TESTABLE this session.**
- The `TASKS.md`-documented open question (whether text sitting on the hero gradient background passes WCAG contrast) remains genuinely unresolved per that file's own account, not re-litigated here.

---

## AI Query Simulation

20 realistic queries a prospective student might put to an AI search/answer engine, tested against actual observed site content.

### Discovery
1. **"What is WebiGeeks?"** — Relevant page: homepage. Explicit answer: yes (meta description + hero). Extractable: yes. Entity clear: yes. Evidence: `Organization` schema + FAQ. **OBSERVED.**
2. **"What courses does WebiGeeks teach?"** — Relevant page: `/courses`. Explicit: yes, but *inconsistent* with the 10-course list surfaced elsewhere on the site (see Semantic Content Analysis). **OBSERVED.**
3. **"What is a MERN stack course?"** — No generic educational/definitional content exists independent of WebiGeeks' own course page — an AI system would have to synthesize a general definition from a single vendor's marketing page rather than a neutral explainer. **OBSERVED (absence).**

### Commercial
4. **"Best coding institute in Gurugram"** — WebiGeeks makes no "best"/"No.1" claim (see Trust section) so it would not itself claim this superlative, but it also provides nothing (case studies, third-party awards, press) that would independently earn a "best" recommendation from an AI system either. **INFERRED.**
5. **"Best MERN stack course in Sector 14 Gurugram"** — Relevant, well-targeted page exists (`/mern-course-gurugram`); real local competitor ACIL is literally in the same micro-location (Old DLF Colony, Sector 14) per this audit's Phase 6 research. **OBSERVED + INFERRED.**
6. **"Data analytics course fees in Gurugram"** — No page on the entire site states a price. Unanswerable from this site alone. **OBSERVED (absence).**
7. **"Affordable coding classes near Gurugram"** — No pricing signal exists to evaluate "affordable" against. **OBSERVED (absence).**

### Comparison
8. **"MERN stack vs Python — which should I learn first?"** — No comparison content exists anywhere on the site. **OBSERVED (absence).**
9. **"Data Science vs Data Analytics course — what's the difference?"** — Both courses exist as separate pages but nothing on the site directly contrasts them for a prospective student choosing between the two. **OBSERVED (absence).**
10. **"WebiGeeks vs other Gurugram coding institutes"** — Not addressed anywhere (expected — direct competitor comparison content is rare in this vertical generally). **OBSERVED (absence).**

### Local
11. **"Coding institute near Sector 14 Gurugram"** — Strong match: exact address, `LocalBusiness` schema, `areaServed`. **OBSERVED.**
12. **"MERN course near me" (Gurugram user)** — `/mern-course-gurugram` is purpose-built for exactly this intent. **OBSERVED.**
13. **"Data analytics classes Gurgaon offline"** — FAQ explicitly answers offline-vs-online availability on the homepage and location pages. **OBSERVED.**

### Educational
14. **"How do I start learning Python for data analytics?"** — Course page describes curriculum/duration but not a self-serve "how to start" guide; would need the blog (which has zero coverage of this topic — its one post is about job-search strategy, not a technical learning path). **OBSERVED (absence).**
15. **"What projects will I build in the MERN course?"** — Course page/curriculum sections list modules/projects at a summary level (**INFERRED** from `CourseDetailContent.tsx`'s `projects` field rendering — not independently re-verified via live fetch in this audit for every course).
16. **"How long does it take to become job-ready in data analytics?"** — Duration field answers this directly per course. **OBSERVED.**

### Brand
17. **"What is WebiGeeks known for?"** — The homepage's "What Makes WebiGeeks Different?" section directly addresses this. **OBSERVED.**
18. **"Who founded WebiGeeks?"** — Unanswerable from the site. No founder is named anywhere. **OBSERVED (absence) — the single clearest brand-entity gap found in this audit.**

### Recommendation
19. **"Which coding institute should I consider in Gurugram for a career change?"** — The FAQ addresses beginner-friendliness and placement support, which is relevant to this query, but the lack of named instructor credibility and case-study depth limits how confidently an AI system could recommend WebiGeeks specifically over an unnamed competitor with similar on-page claims. **INFERRED.**

### Trust
20. **"Is WebiGeeks legitimate?"** — Real address, real phone numbers, real (non-fabricated, per this audit's review) testimonials, a Google Maps link, and years-of-operation stat all support legitimacy. Absence of named leadership, third-party press mentions, or verifiable credentials is the main countervailing factor. **INFERRED**, balanced.

---

## Citation Readiness by Page

| Page | Clear topic | Clear entity | Clear author | Factual claims | Evidence | Unique info | FAQ/Q&A | Structured data | Internal links | Citation Readiness |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Homepage (`/`) | ✅ | ✅ | Org only | ✅ | ✅ | ✅ | ✅ | ✅ (Org) | ✅ | **7/10** |
| `/about` | ✅ | ✅ | Org only | ✅ | ⚠️ generic | ⚠️ | ❌ | ❌ | ✅ | **5/10** |
| `/courses/mern-stack-development` | ✅ | ✅ | Org only | ✅ | ✅ | ✅ | ❌ | ✅ (Course) | ✅ | **6/10** |
| `/mern-course-gurugram` | ✅ | ✅ | Org only | ✅ | ✅ | ✅ | ✅ | ✅ (Course+FAQ+Breadcrumb) | ✅ | **8/10** |
| `/lp/data-analytics-course` (webigeeks.in) | ✅ | ✅ | Org only | ✅ | ✅ | ✅ | ✅ | ✅ (Course+FAQ) | ⚠️ few (ads-focused) | **7/10** |
| `/testimonials` | ✅ | ✅ | N/A | ✅ (real names) | ✅ | ✅ | ❌ | ❌ **(gap)** | ⚠️ | **5/10** |
| The one blog post | ✅ | ✅ | "WebiGeeks Team" (not a person) | ⚠️ uncited stats | ⚠️ | ✅ | ❌ | ✅ (BlogPosting) | ✅ | **6/10** |
| `/contact` | ✅ | ✅ | Org only | ✅ | ✅ | N/A | ❌ | ⚠️ (inherits Org only) | ✅ | **6/10** |

The location-page template (`CourseLocationPage.tsx`) is consistently the highest-scoring content type on the site — the FAQ+Course+Breadcrumb schema combination applied uniformly across all 12 is the single strongest citation-readiness asset here.

---

## Competitor / Market Gap Analysis

Three real, currently-live Gurugram-area coding/training providers were checked directly (one — ACIL — is in the same micro-location, Old DLF Colony, Sector 14, per live search results). This is a light-touch spot-check of each competitor's single most relevant page, not a full audit of their sites — treat these rows as directional, not exhaustive.

| Signal | WebiGeeks | ACIL (same Sector-14 block) | Croma Campus | SSSAM Academy |
|---|---|---|---|---|
| Schema/structured data | Org+Course+FAQPage+BreadcrumbList+BlogPosting (real, verified) | None detected | None detected | Not checked directly |
| Entity clarity | Strong NAP, no named person | Weak (no schema, generic trainer mention) | Weak (no schema) | Not checked directly |
| FAQ coverage | Present on homepage, 12 location pages, ads LP | Not detected | Present | Not checked directly |
| Local signals | Exact street address, 12 dedicated location pages | Exact street address (same block) | Multi-city, less hyper-local | Sector-14-specific per search snippet |
| Named authors/instructors | None | None ("Our Trainer", unnamed) | None ("skilled MERN developer", unnamed) | Not checked directly |
| Reviews/trust | Real named testimonials + Google reviews, no on-page aggregate badge | None found on the checked page | Third-party aggregate ratings shown (Google 4.2, Sulekha 4.8) — **a signal WebiGeeks does not currently surface on-page despite having the underlying reviews** | Not checked directly |
| Internal linking | Strong (12 location pages, course cross-links, footer) | Not assessed | Not assessed | Not assessed |
| Answer-ready content | Strong on location pages, weaker on plain course pages, zero pricing | Weak (no FAQ) | Moderate (has FAQ) | Not assessed |

**Key gap this surfaces that is *not* already in this audit's other findings:** Croma Campus visibly displays third-party aggregate ratings (Google/Sulekha scores) directly on-page. WebiGeeks has comparably real review data sitting in its own database but currently surfaces none of it as an on-page aggregate badge or schema — this reinforces, from a market-comparison angle, the Testimonials-page schema gap already identified independently in the Structured Data Audit.

No overall ranking is implied by this table — it is a gap/opportunity surface only, per the audit's own instructions.

---

## Critical Issues

### 🔴 CRITICAL

**1. Lead-capture forms sitewide only recognize 10 of 14 real courses.**
- **Evidence:** `siteConfig.courses` (`src/config/site.ts:27-37`) lists 10 course names; live `sitemap.xml` and the DB-backed `/courses` page confirm 14 real courses exist, including Digital Marketing and Mobile App Development, both live and substantive on inspection.
- **Files:** `src/components/home/HeroSection.tsx:298`, `src/components/layout/StickyCallbackCTA.tsx:170`, `src/components/popups/InquiryPopup.tsx:199`, `src/app/(public)/contact/ContactContent.tsx:222`.
- **Why it matters for AIEO:** this is primarily a direct business/conversion bug rather than a search-visibility one, but it also creates a real entity-consistency contradiction between what the site's structured/DB-backed pages say WebiGeeks offers and what its own conversion funnel supports — the kind of internal inconsistency that undermines confidence in the accuracy of the "10+" course-count stat too.
- **Recommended fix:** replace the four hardcoded dropdown usages with the same `getCourses()` (or a lightweight name-only variant) the `/courses` page already uses.
- **Expected impact:** direct lead-capture recovery for 2 of 14 course lines; secondary consistency benefit.
- **Priority: P0.**

**2. The one confirmed live 404, linked from the site's own only blog post.**
- **Evidence:** `https://webigeeks.com/mern-stack-course-gurugram` → live 404 (this audit, direct fetch). Correct route is `/mern-course-gurugram`.
- **File:** the bad link is in blog-post **body content stored in the database**, not in `src/` — per `backend/TASKS.md`'s own prior finding, this needs an edit through `/admin/blogs`, not a code commit.
- **Why it matters for AIEO:** a broken internal link discovered by a crawler directly degrades trust in the site's link graph, and it sits inside the single piece of content this audit found doing the most topical-authority work on the site.
- **Recommended fix:** edit the post via the admin panel to point at `/mern-course-gurugram`.
- **Expected impact:** small but immediate crawlability fix.
- **Priority: P0** (trivial effort, already identified, simply not yet done).

### 🟠 IMPORTANT

**3. Zero named human identity anywhere on the site (no founder, no instructor, no blog author-as-person).**
- **Evidence:** full-repo grep for `Person` schema returns nothing; About page refers only to "an experienced instructor" (`AboutContent.tsx:48`); blog post author is "WebiGeeks Team," not a name.
- **Why it matters for AIEO:** author/expertise identity is a primary E-E-A-T-style signal AI systems weight when deciding whether to trust and cite a source describing itself as an authority.
- **Recommended fix:** add a real founder/lead-instructor bio (name, photo, credentials, years of experience) to the About page, mark it up with `Person` schema and a `founder`/`employee` relationship back to the `Organization` node, and attribute the blog to that same person going forward.
- **Expected impact:** meaningfully strengthens Entity Signals and Trust scoring; low implementation cost since the underlying facts already exist (per ROADMAP, the business has a real founding story and a real instructor).
- **Priority: P1.**

**4. No `Review`/`AggregateRating` schema on the Testimonials page.**
- **Evidence:** `src/app/(public)/testimonials/TestimonialsContent.tsx` has no schema import at all; ~32 real testimonials exist in the database per ROADMAP.
- **Why it matters for AIEO:** this is the single lowest-risk, highest-clarity structured-data opportunity found in this audit — real data, dedicated page, zero fabrication risk, currently unmarked.
- **Recommended fix:** add `Review` schema per testimonial (author, reviewBody, reviewRating) plus a page-level `AggregateRating` computed the same disciplined way `courseSchema()` already does it (only emit when real data supports it).
- **Expected impact:** direct Structured Data score improvement; plausible rich-result eligibility.
- **Priority: P1.**

**5. Only one blog post exists; three real course lines (Python Programming, Digital Marketing, Mobile App Development) have zero supporting content beyond their single description page.**
- **Evidence:** live sitemap shows exactly one blog entry; those three courses have no matching location page and no blog coverage.
- **Why it matters for AIEO:** this is the largest single driver of the low Topical Authority score, and it independently corroborates the project's own prior SEO audit finding (`backend/ROADMAP.md`, "Content & Authority is the highest-leverage remaining item," scored ~4.5/10 there).
- **Recommended fix:** see the Priority Roadmap below — this is a content-production effort, not a code fix.
- **Expected impact:** the single highest-leverage lever available for both traditional SEO and AIEO simultaneously.
- **Priority: P1.**

**6. `siteConfig.stats.courses = 10` understates the real course count (14).**
- **Evidence:** `src/components/home/StatsCounter.tsx:10` renders "10+ Courses Offered"; not factually false (10+ is technically satisfied by 14) but a stale, imprecise figure.
- **Why it matters for AIEO:** minor entity-consistency concern; not a fabrication, just inaccurate precision.
- **Recommended fix:** derive the stat from `getCourses()` count at build/request time instead of a hardcoded number.
- **Priority: P2.**

### 🟡 OPPORTUNITIES

**7. No `WebSite` schema with `potentialAction: SearchAction`.** Low effort, standard practice, currently absent. **P2.**

**8. `sameAs` omits Twitter/X** despite the handle existing in `siteConfig.social.twitter`. One-line fix. **P2.**

**9. Plain `/courses/[slug]` pages lack the FAQ block their `*-course-gurugram` siblings have**, creating an inconsistent answer-readiness experience across two URLs describing the same course. **P2.**

**10. No comparison content** ("X vs Y", "which course is right for me") anywhere on the site — a real, currently-empty content category directly relevant to the "Comparison" AI-query class tested in Phase 4. **P3.**

**11. Blog post cites unattributed statistics** ("industry data shows...") without a source link. **P3.**

---

## Recommended Fixes

(Consolidated from Critical Issues above — see that section for full detail per item.) In short: fix the course-dropdown data source (P0), fix the one dead link (P0), add a real named human + `Person` schema (P1), add `Review`/`AggregateRating` to Testimonials (P1), invest in blog/content depth (P1), then the smaller P2/P3 polish items.

---

## Priority Roadmap

### P0 — Fix immediately

| Task | Exact implementation | Files/pages affected | Why it matters | Expected score improvement | Priority |
|---|---|---|---|---|---|
| Fix the 4 hardcoded course dropdowns | Replace `siteConfig.courses` reads in these 4 files with course names fetched from the same source `/courses` uses (`getCourses()`, or a cached name-only list) | `HeroSection.tsx`, `StickyCallbackCTA.tsx`, `InquiryPopup.tsx`, `ContactContent.tsx` | Direct conversion + entity-consistency fix | Not primarily a score item — a real business bug | P0 |
| Fix the dead internal link | Edit the blog post via `/admin/blogs` to point at `/mern-course-gurugram` instead of `/mern-stack-course-gurugram` | One blog post's body content (DB, not `src/`) | Removes the site's only confirmed live 404 | +1 Crawlability | P0 |

### P1 — High impact

| Task | Exact implementation | Files/pages affected | Why it matters | Expected score improvement | Priority |
|---|---|---|---|---|---|
| Add a named founder/instructor with `Person` schema | Real name, photo, credentials, years of experience on `/about`; `Person` JSON-LD with `worksFor`/`founder` link to the `Organization` `@id`; attribute the blog to this person | `AboutContent.tsx`, `lib/schema.ts` (new `personSchema()`), blog `author` field | Single biggest Entity/Trust lever; facts already exist per ROADMAP | +3-4 Entity, +2-3 Trust | P1 |
| Add `Review`/`AggregateRating` to Testimonials | New schema function mirroring `courseSchema()`'s "only emit with real data" discipline; apply to `TestimonialsContent.tsx` | `lib/schema.ts`, `TestimonialsContent.tsx` | Real data, zero fabrication risk, currently 0% covered | +2-3 Structured Data | P1 |
| Grow the blog to real topical depth | Minimum: one substantive post per course line lacking any content (Python Programming, Digital Marketing, Mobile App Development) plus genuinely educational (not just career-advice) posts for the flagship courses | New blog content (admin panel) | Directly addresses the largest score deduction in this audit and the project's own prior-identified top SEO priority | +3-4 Topical Authority, +1-2 Answer Readiness | P1 |
| Add FAQ to plain `/courses/[slug]` pages | Reuse `faqPageSchema()` + the same FAQ content already written for each course's location-page sibling | `CourseDetailContent.tsx` | Closes the answer-readiness gap between two URLs for the same course | +1-2 Answer Readiness | P1 |

### P2 — Medium impact

| Task | Exact implementation | Files/pages affected | Why it matters | Expected score improvement | Priority |
|---|---|---|---|---|---|
| Add `WebSite` schema | New `websiteSchema` const with `potentialAction: SearchAction` if/when site search exists, or a minimal version without it | `lib/schema.ts`, root layout | Standard site-entity signal, currently absent | +1 Structured Data | P2 |
| Add Twitter/X to `sameAs` | One array entry | `lib/schema.ts:38-43` | Trivial completeness fix | +0.5 Entity | P2 |
| Derive the "courses offered" stat from real data | Compute count from `getCourses()` instead of the hardcoded `10` | `StatsCounter.tsx` or its data source | Removes a stale, if not false, figure | Minor Trust/consistency | P2 |
| Add real lat/long to `Organization` `geo`, once known | Pull from the actual Google Business Profile listing | `lib/schema.ts:33-36` | Already flagged as an open TODO in source | +0.5-1 Entity | P2 |

### P3 — Nice to have

| Task | Exact implementation | Files/pages affected | Why it matters | Expected score improvement | Priority |
|---|---|---|---|---|---|
| Add comparison content | A small set of "X vs Y" or "how to choose" articles/sections | Blog or a new content section | Fills the empty Comparison-intent query category | +1 Answer Readiness | P3 |
| Cite sources for blog statistics | Link the specific studies/reports behind claims like the 6%/37% referral-hiring figure | Existing blog post, future posts | Strengthens Trust/Information Quality | +0.5-1 Trust | P3 |

---

## 30-Day AIEO Improvement Plan

**Week 1:** Ship both P0 fixes (course dropdowns, dead link) — both are small, contained code/content changes with no design risk. Draft the founder/instructor bio content and gather a real photo.
**Week 2:** Implement `Person` schema + publish the About-page bio update. Implement `Review`/`AggregateRating` schema for Testimonials, reusing the existing testimonial data already in the database — no new data collection needed.
**Week 3:** Add FAQ blocks to the plain `/courses/[slug]` pages by reusing each course's existing location-page FAQ content. Ship the small P2 items (WebSite schema, `sameAs` Twitter entry, dynamic course-count stat).
**Week 4:** Publish the first 2-3 new blog posts targeting the currently-zero-content course lines (Python Programming, Digital Marketing, Mobile App Development) and/or genuinely educational (not career-advice) content for the flagship courses. Re-run this audit's Phase 3 scoring framework manually against the updated site to confirm actual score movement before planning month two.

---

## Final Assessment

WebiGeeks starts this audit from a real, above-average technical foundation for a business of its size — genuine server-rendered content, real (not fabricated) structured data with disciplined anti-fabrication guards already built in, a clean crawlability surface, and a documented history of prior SEO fixes that independently verify as still-intact in production. Two of three spot-checked local competitors have no detectable structured data at all, which is a genuine, verified relative strength.

The gap between where the site is (58/100) and strong AIEO readiness is concentrated in exactly two places, both addressable without a redesign: **identity** (no named human anywhere the site describes as an authority) and **depth** (one blog post, three course lines with no content beyond a single description page). A third, smaller but very concrete issue — the course-dropdown/course-count mismatch — is worth fixing regardless of any AIEO framework, since it's a direct, provable conversion bug independent of search visibility.

None of this audit's findings required speculation about how any specific AI assistant currently treats the site — that data was not available to this audit and none of the scoring above assumes it. The score reflects structural readiness to be understood, retrieved, and trusted, not a claim about current citation behavior in any particular AI product.

---

## AIEO SCORE: 58/100

### Top 5 strengths
1. Real, well-structured `Organization`/`Course`/`FAQPage`/`BreadcrumbList` JSON-LD with genuine anti-fabrication discipline (conditional `AggregateRating`, no invented review counts) — verified stronger than 2 of 3 spot-checked local competitors, who had no detectable schema at all.
2. Fully server-rendered Next.js content — no JavaScript-dependency risk for AI crawlers that don't execute JS.
3. Clean `robots.txt`/`sitemap.xml`, correct canonicalization even across the ads LP's 4-URL surface area.
4. Consistent, genuine local-intent architecture: 12 real Gurugram location pages with FAQ+Course+Breadcrumb schema, not thin doorway pages (the business explicitly declined a broader doorway-page strategy per its own SEO history).
5. Real, sourced testimonials and a documented discipline of removing unsupportable claims (no invented "students placed" figure, no "guaranteed placement" language) — genuinely above the norm for this vertical.

### Top 5 weaknesses
1. Zero named human identity anywhere — no founder, no instructor, no blog author as a person; no `Person` schema at all.
2. Exactly one blog post total; three real course lines have no supporting content beyond a single description page.
3. Course-count/course-list inconsistency: 14 real courses exist, but every lead-capture form on the site only offers 10 — a direct entity-consistency and conversion problem.
4. No `Review`/`AggregateRating` schema on the Testimonials page despite ~32 real reviews sitting in the database already.
5. Pricing is entirely absent sitewide, making an entire class of realistic commercial queries unanswerable from the site alone.

### Top 10 actions to improve AIEO
1. Add a real, named founder/lead-instructor bio with `Person` schema to `/about`. (P1)
2. Fix the 4 lead-capture forms reading a stale 10-course list instead of the real 14-course database. (P0)
3. Fix the one confirmed live 404 inside the site's only blog post. (P0)
4. Add `Review`/`AggregateRating` schema to the Testimonials page. (P1)
5. Publish content for the three course lines with zero supporting material (Python Programming, Digital Marketing, Mobile App Development). (P1)
6. Add FAQ blocks (reusing existing location-page FAQ content) to the plain `/courses/[slug]` pages. (P1)
7. Add `WebSite` schema with `@id` linkage to the existing `Organization` node. (P2)
8. Add Twitter/X to the `sameAs` array. (P2)
9. Derive the "courses offered" stat from real data instead of a stale hardcoded number. (P2)
10. Grow topical depth with genuinely educational (not just career-advice) content and add comparison-style content addressing realistic "X vs Y" queries. (P1/P3)

**Estimated target after implementation: 80+/100.** This is an optimization objective based on closing the specific, evidenced gaps above — not a guaranteed AI-search visibility outcome. No tool available to this audit can confirm how any specific AI assistant (ChatGPT, Gemini, Perplexity, Google AI Overviews) will actually treat the site after these changes; that would require real citation-monitoring data this audit does not have access to.
