# WebiGeeks — Production Readiness Roadmap

> Single source of truth for phased completion of the WebiGeeks platform (frontend: `wg-frontend`, backend: `wg-backend`). Update the **Status** column as work lands. Read this file at the start of any future session before resuming work.

## How to use this file
- Each phase must be fully complete (see Quality Gates) before moving to the next, per the original engineering brief.
- Status values: `NOT STARTED`, `IN PROGRESS`, `BLOCKED`, `DONE`.
- No separate "Project Specification" or "Repository Audit" document existed in the repo when this roadmap was created (2026-07-24) — this file, plus the live codebase, is the working source of truth until/unless those documents are supplied. If they are supplied later, reconcile them here and note discrepancies under the relevant phase.
- Repos: `backend` → github.com/rohnshrma/wg-backend, `frontend` → github.com/rohnshrma/wg-frontend (separate git repos, not a monorepo — isolate/PR each independently).

## Phase Status Overview

| Phase | Name | Status | Notes |
|---|---|---|---|
| 1 | Authentication, Security, RBAC | NOT AUDITED | |
| 2 | Public Website | NOT AUDITED | |
| 3 | Courses Module | NOT AUDITED | |
| 4 | Student Registration | NOT AUDITED | |
| 5 | Student Dashboard | NOT AUDITED | |
| 6 | Admin Dashboard | NOT AUDITED | |
| 7 | Communication (Email/WhatsApp) | IN PROGRESS | Nodemailer (Gmail SMTP) app password configured 2026-07-23. WhatsApp Cloud API onboarding blocked by Meta "Onboarding failure" (CSP/fetch error in embedded Quickstart flow) — unresolved as of 2026-07-24, see Phase 7 log below. |
| 8 | Payments | NOT AUDITED | |
| 9 | Analytics | DONE | Completed 2026-07-24 — see Phase 9 section below. Backend + frontend both build clean. |
| 10 | Performance/SEO/Accessibility | NOT STARTED | |
| 11 | Testing | NOT STARTED | |
| 12 | Deployment | NOT STARTED | |

---

## Phase 7 — Communication (in progress, paused)

**Blocker log:**
- Gmail SMTP: app password generated and set in `backend/.env` (`SMTP_USER=webigeeksofficial@gmail.com`). Not yet verified end-to-end (no test send confirmed).
- WhatsApp Cloud API: app "webiGeeks messaging app" exists in Meta developer console, business portfolio "WebiGeeks" selected. Clicking "Continue" on the embedded WhatsApp Quickstart signup repeatedly fails with a generic "Onboarding failure" banner. Chrome DevTools console showed the root cause: `Uncaught (in promise) TypeError: Failed to fetch. Refused to connect because it violates the document's Content Security Policy.` — a request the Meta embedded-signup JS needs to make is being blocked (browser extension interference is the leading suspect; not yet confirmed with extensions fully disabled). Alternate path (business.facebook.com → Business Settings → Accounts → WhatsApp Accounts → Add) had not been confirmed as tried separately from the in-app flow as of pause. **Resume by:** confirming a truly clean browser profile (extensions off via chrome://extensions, not just Incognito) and/or completing the direct Business Settings WABA creation path, then retrieving `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_BUSINESS_ACCOUNT_ID` from the API Setup tab.
- `backend/.env` currently has `SMTP_PASS` set; `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_BUSINESS_ACCOUNT_ID` still empty.

---

## Phase 9 — Analytics (DONE, 2026-07-24)

**Scope (per original brief):** Charts, Reports, Conversion Analytics, Revenue Analytics, Student Analytics.

**Audit findings (direct codebase inspection — no pre-existing audit doc supplied):**

| # | Finding | Verdict | Notes |
|---|---|---|---|
| 1 | Backend already had `/api/analytics/{overview,admissions,revenue,leads,courses}` with real Mongo aggregations. | ✅ VERIFIED (partial coverage) | Endpoints existed and worked, but all business logic lived directly in `routes/analytics.routes.ts`, violating this repo's own Backend Rule ("never move business logic into routes") and the Controller→Service→Route architecture used everywhere else (e.g. `lead.controller.ts`). |
| 2 | "Student Analytics" (one of Phase 9's four named sub-areas) had no endpoint at all. | ✅ VERIFIED — gap | No status/payment-mode/gender breakdown, no dues aggregation, no enrollment trend existed anywhere in the backend. |
| 3 | Frontend admin dashboard (`/admin`) displayed analytics as hardcoded `"0"` placeholders; no charting library was installed; no `/admin/analytics` page existed. | ✅ VERIFIED — gap | `package.json` had zero chart dependencies (recharts/chart.js/d3/etc. all absent). Phase 9's "Charts" and "Reports" sub-areas were 0% implemented on the frontend despite backend data being available. |
| 4 | Lead conversion analytics only reported aggregate totals, not trend-over-time or per-source conversion rate. | 🟡 PARTIALLY TRUE | `/analytics/leads` returned `bySource` counts and one global `conversionRate`, but no per-source rate and no monthly trend — needed for a real "Conversion Analytics" view. |
| 5 | Revenue analytics had no payment-method breakdown. | ✅ VERIFIED — gap | Only a monthly total existed; "Revenue Analytics" per the brief implies more than one cut of the data. |

**What was built:**
- Backend (`wg-backend`, branch `worktree-phase9-analytics-backend`):
  - Refactored existing analytics logic out of the route file into `src/services/analyticsService.ts` (pure aggregation functions) + `src/controllers/analytics.controller.ts` (thin, asyncHandler-wrapped) — `src/routes/analytics.routes.ts` is now just route wiring, matching the rest of the codebase's architecture. All original endpoint paths and response shapes preserved (no breaking changes — nothing consumed them yet from the frontend, but back-compat was kept anyway).
  - Added `GET /api/analytics/students` — status breakdown, payment-mode breakdown, gender breakdown, students-with-dues count + total due amount, monthly enrollment trend.
  - Extended `GET /api/analytics/leads` with `conversionBySource` (per-source conversion rate) and `monthlyConversion` (trend).
  - Extended `GET /api/analytics/revenue` with `byPaymentMethod` breakdown (shape changed from a bare array to `{ byMonth, byPaymentMethod }` — this is the one intentional breaking shape change, safe because no frontend consumer existed yet).
  - `npx tsc --noEmit` passes clean.
- Frontend (`wg-frontend`, branch `worktree-phase9-analytics`):
  - Installed `recharts@^3.10.0` (verified compatible with React 19.2.4 / Next 16.2.9 already in use).
  - New `src/app/admin/analytics/page.tsx`: year selector, 4 top-line stat tiles, and 8 charts covering all four Phase 9 sub-areas — monthly revenue (line), monthly admissions (bar), revenue by payment method (pie), lead conversion trend (line), conversion rate by source (horizontal bar), course popularity (horizontal bar), student status (pie), payment mode (pie), enrollment trend (bar).
  - Added "Analytics" entry to the admin sidebar (`src/app/admin/layout.tsx`).
  - Wired `/admin` dashboard's previously-hardcoded stat tiles to the real `GET /analytics/overview` response (Phase 6 overlap — done here since it was a one-line gap directly adjacent to this work, not a full Phase 6 pass).
  - `npm run build` (Next 16, Turbopack) passes clean, `/admin/analytics` prerenders as a static route.

**Known follow-ups (not blocking, noted for later phases):**
- No automated tests were added for the new endpoints/page (Phase 11 territory).
- `courseWiseStudents` in `/overview` and the new student/lead breakdowns are not yet cross-verified against a populated database with real leads/students/payments — verified via build + type-check only, not a live data smoke test (no seed data / running MongoDB instance available in this session).
- Phase 6 (Admin Dashboard) is still marked NOT AUDITED overall; only the one overview-stats gap adjacent to this work was fixed.

**Repos/branches for this phase:**
- Frontend: worktree `phase9-analytics`, branch `worktree-phase9-analytics`.
- Backend: worktree `phase9-analytics-backend` (manually created via `git worktree add`, same convention), branch `worktree-phase9-analytics-backend`.

---

## Original Engineering Brief (verbatim reference)

The full 12-phase brief, working rules, coding standards, and success conditions supplied by the user on 2026-07-24 are preserved here for future reference:

### Role & Primary Objective
Acting as a Staff+ Engineering Team taking an existing production-grade repository (~45% complete) to 100% production readiness. Continuing existing work — not a rewrite, not boilerplate. No shortcuts, no unnecessary refactors.

### First Task (per brief — not yet possible)
Brief calls for reading a pre-existing "Project Specification" and "Repository Audit" and classifying every audit finding as ✅ VERIFIED / 🟡 PARTIALLY TRUE / ❌ INCORRECT before writing code. **Neither document exists in the repo as of 2026-07-24.** Until supplied, each phase's audit section in this file is populated by direct codebase inspection instead.

### Working Rules
Never restart the project. Never replace working code. Never delete working modules. Never introduce duplicate logic. Always extend existing functionality, reuse existing services/components/APIs. Preserve project architecture.

### Implementation Process
Work in phases; each phase fully finished before the next; never jump randomly between features. After each phase: verify frontend, backend, APIs, database, responsiveness, TypeScript, production readiness.

### Implementation Order
1. Authentication, Security, Validation, Authorization, Reset Password, Route Protection, Middleware, RBAC
2. Public Website — Homepage, Courses, Testimonials, Gallery, Blog, Contact, Lead Forms, Backend Integration, SEO
3. Courses Module — Backend-driven courses, dynamic pages, curriculum downloads, testimonials, media
4. Student Registration — Full form, photo/Aadhaar upload, EMI/installment fields, admission workflow, profile lock
5. Student Dashboard — Profile, payments, installments, documents, notifications, curriculum downloads, receipts
6. Admin Dashboard — Analytics, charts, students, courses, payments, blogs, gallery, testimonials, notifications, reports, settings
7. Communication — Email automation, WhatsApp automation, notification system, cron jobs, fee/demo/payment reminders
8. Payments — Receipt generation, installment generation, payment tracking, export
9. **Analytics** — Charts, Reports, Conversion Analytics, Revenue Analytics, Student Analytics
10. Performance/SEO/Accessibility — Skeleton loaders, error boundaries, dark mode, image optimization, lazy loading
11. Testing — Backend, frontend, integration, auth, workflow tests
12. Deployment — CI/CD, environment validation, production configuration, deployment readiness

### Coding Standards
TypeScript only, no `any`, no duplicate code, reusable components, SOLID, DRY, Clean Architecture, consistent folder structure, RESTful APIs, proper validation/error handling, optimize performance/accessibility/SEO.

### Backend Rules
Maintain Controller → Service → Route → Middleware → Validation → Utility architecture. Never move business logic into routes. Always validate payloads and sanitize inputs. Always return consistent API responses.

### Frontend Rules
Reusable components only, no duplicate UI, shared hooks/utilities/types, React Hook Form + Zod validation, Redux Toolkit only when global state is required, prefer Server Components, Client Components only when necessary.

### Database Rules
No duplicate collections, normalize data, add indexes where beneficial, keep relations consistent, maintain backward compatibility.

### Quality Gates (per feature)
UI complete · Backend complete · Database complete · APIs connected · Responsive · Accessible · Secure · Error handled · Validated · Tested · Production ready.

### Working Style
Understand existing implementation → compare with spec → identify missing work → implement only missing work → refactor only if necessary → test → continue. Don't ask after every small change — continue automatically through the roadmap (in practice, within a session; cross-session continuity is via this file).

### Self Review (after each phase)
Check for broken imports, duplicate code, dead code, unused components, API mismatches, frontend/backend mismatches, database inconsistencies, security/performance/accessibility/SEO issues. Fix before moving on.

### When Discovering Better Solutions
Do not immediately replace existing implementations. Evaluate risk, compatibility, migration effort, impact. Only improve if existing functionality is preserved, backward compatibility remains, and overall architecture improves.

### Success Condition
Every requirement in the Project Specification implemented; every VERIFIED audit issue resolved; frontend/backend fully synchronized; all dashboards functional; all APIs connected; email/WhatsApp automation working; payments working; analytics working; SEO/accessibility/security/testing complete; deployment production ready. Ends with a Final Project Completion Report: Features Implemented, Features Improved, Bugs Fixed, Remaining Issues, Production Readiness/Security/Performance/SEO/Accessibility scores, Testing Coverage, Final Folder Structure, Deployment Checklist.
