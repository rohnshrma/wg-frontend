import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  ChevronRight,
  Code2,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { getLocationPageContent } from "@/data/locationPages";
import { pageMetadata } from "@/lib/seo";
import { faqPageSchema } from "@/lib/schema";
import { getTestimonials } from "@/lib/testimonials";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

import HeroLeadForm from "./HeroLeadForm";
import HeroStackVisual from "./HeroStackVisual";
import StackDiagram from "./StackDiagram";
import CurriculumTimeline from "./CurriculumTimeline";
import CurriculumDownload from "./CurriculumDownload";
import ProjectShowcase from "./ProjectShowcase";
import ApiFlow from "./ApiFlow";
import MernFaq from "./MernFaq";
import TechStrip from "./TechStrip";
import CountUp from "./CountUp";
import CopyButton from "./CopyButton";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { curriculum, mernMeta, projects, technologies } from "./mern-data";
import {
  canBuild,
  careerPath,
  CAREER_FOOTNOTE,
  curriculumPhases,
  differentiators,
  faqs,
  hero,
  learningModes,
  pricing,
  TRUST_FOOTNOTE,
  trustStats,
  whyMern,
} from "./mern-content";

const content = getLocationPageContent("mern-stack-development")!;
const WHATSAPP_URL =
  "https://wa.me/918766367815?text=Hi%2C%20I%20want%20details%20about%20the%20MERN%20Stack%20course";

const baseMeta = pageMetadata({
  title: content.metaTitle,
  description: content.metaDescription,
  path: content.path,
});

export const metadata: Metadata = {
  ...baseMeta,
  keywords: [
    "MERN Stack course in Gurugram",
    "MERN Stack course Gurgaon",
    "MERN Stack training in Gurugram",
    "full stack development course Gurugram",
    "MERN developer course",
    "React Node MongoDB course",
    "full stack developer training Gurgaon",
  ],
  openGraph: { ...baseMeta.openGraph, type: "website" },
  twitter: { ...baseMeta.twitter, card: "summary_large_image" },
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "MERN Stack Development Course",
  description: mernMeta.description,
  provider: {
    "@type": "EducationalOrganization",
    name: siteConfig.name,
    sameAs: siteConfig.url,
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: ["Onsite", "Online"],
    courseWorkload: "P7M",
    location: {
      "@type": "Place",
      name: "WebiGeeks, Sector-14, Gurugram",
      address: siteConfig.contact.address,
    },
  },
  offers: {
    "@type": "Offer",
    price: "19999",
    priceCurrency: "INR",
    category: "Paid",
    url: `${siteConfig.url}${content.path}`,
  },
};

function SectionHeading({
  eyebrow,
  title,
  sub,
  dark = false,
  center = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={`${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} mb-10`}>
      <p
        className={`mb-2 font-mono text-xs font-bold uppercase tracking-[0.14em] ${
          dark ? "text-[var(--mern-cyan)]" : "text-primary"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`heading-section ${dark ? "text-white" : "text-text-primary"}`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`mt-3 text-[15px] leading-relaxed ${dark ? "text-[var(--mern-text-dim)]" : "text-text-secondary"}`}>
          {sub}
        </p>
      )}
    </Reveal>
  );
}

export default async function MernCourseGurugramPage() {
  // Real, DB-backed reviews only — and never let a testimonials-API blip take
  // the whole page down: on failure the section just doesn't render.
  const all = await getTestimonials().catch(() => []);
  const seen = new Set<string>();
  const stories = all
    .filter((t) => /mern|full[\s-]?stack/i.test(`${t.courseName} ${t.testimonialText}`))
    .filter((t) => {
      const key = t.studentName.trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 6);

  const avgRating =
    stories.length > 0
      ? (stories.reduce((s, t) => s + t.rating, 0) / stories.length).toFixed(1)
      : null;

  return (
    <div className="mern-lp">
      <JsonLd
        data={
          avgRating
            ? {
                ...courseSchema,
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: avgRating,
                  reviewCount: stories.length,
                },
              }
            : courseSchema
        }
      />
      <JsonLd data={faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a })))} />

      {/* ============================ HERO ============================ */}
      <section className="mern-dark relative overflow-hidden">
        <div className="mern-grid pointer-events-none absolute inset-0 opacity-70" />
        <div
          className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full opacity-30 blur-[120px]"
          style={{ background: "radial-gradient(circle, #1672B8, transparent 70%)" }}
        />
        <div className="container-custom relative py-12 md:py-16">
          <Breadcrumbs
            items={[
              { label: "Courses", href: "/courses" },
              { label: "MERN Stack Course in Gurugram", href: content.path },
            ]}
          />

          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--mern-line)] bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--mern-green)]" />
                {hero.badge}
              </span>

              <h1 className="heading-hero mt-4 text-white">{hero.h1}</h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--mern-text-dim)]">
                {hero.lede}
              </p>

              <ul className="mt-6 space-y-2.5">
                {hero.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-slate-200">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--mern-cyan)]" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#demo-form"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-white shadow-lg shadow-primary/25 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-primary/40 active:scale-[0.98]"
                >
                  Book free demo <ArrowRight className="h-4 w-4" />
                </a>
                <CurriculumDownload buttonClassName="inline-flex items-center gap-2 rounded-xl border border-[var(--mern-line-strong)] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/5" />
              </div>
              <a
                href="#curriculum"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-white"
              >
                or browse the full 16-module syllabus <ArrowDown className="h-3.5 w-3.5" />
              </a>

              <dl className="mt-8 grid max-w-lg grid-cols-2 gap-x-6 gap-y-4 border-t border-[var(--mern-line)] pt-6 sm:grid-cols-4">
                {hero.facts.map((f) => (
                  <div key={f.label}>
                    <dt className="text-[11px] uppercase tracking-wide text-slate-500">{f.label}</dt>
                    <dd className="mt-0.5 text-sm font-bold text-white">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:pt-2">
              <HeroLeadForm />
            </div>
          </div>

          <div className="mt-12 lg:mt-14">
            <HeroStackVisual />
          </div>

          <TechStrip items={technologies} />
        </div>
      </section>

      {/* ========================= TRUST BAR ========================= */}
      <section className="border-b border-border bg-white">
        <div className="container-custom py-8">
          <Stagger
            step={0.06}
            className="grid grid-cols-3 gap-x-4 gap-y-6 text-center sm:grid-cols-5"
          >
            {trustStats.map((s) => (
              <StaggerItem key={s.label}>
                <p className="text-xl font-extrabold text-primary sm:text-2xl">
                  <CountUp value={s.value} />
                </p>
                <p className="mt-1 text-[11px] leading-snug text-text-secondary sm:text-xs">
                  {s.label}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal
            delay={0.15}
            className="mx-auto mt-5 max-w-3xl text-center text-[11px] leading-relaxed text-text-muted"
          >
            {TRUST_FOOTNOTE}
          </Reveal>
        </div>
      </section>

      {/* ========================= WHY MERN ========================= */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Why MERN Stack"
            title="One language. The whole application."
            sub="MERN is MongoDB, Express, React and Node. Four tools, one language, running from the database up to the browser. Here is why that combination gets people hired."
          />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyMern.map((c) => (
              <StaggerItem
                key={c.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-colors hover:border-primary/30"
              >
                <div className="bg-[var(--mern-ink)]">
                  <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="ml-1.5 truncate font-mono text-[10.5px] text-white/35">
                      {c.file}
                    </span>
                    <span className="ml-auto shrink-0">
                      <CopyButton text={c.snippet} />
                    </span>
                  </div>
                  <pre className="overflow-x-auto px-3.5 py-3 font-mono text-[11.5px] leading-relaxed text-slate-300">
                    <code>{c.snippet}</code>
                  </pre>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-bold text-text-primary">{c.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-text-secondary">
                    {c.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* =================== INTERACTIVE STACK DIAGRAM =================== */}
      <section className="mern-dark relative overflow-hidden">
        <div className="mern-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="container-custom relative section-padding">
          <SectionHeading
            dark
            eyebrow="Explore the stack"
            title="How a MERN application works"
            sub="Tap a layer to see what it does and the kind of code you write for it. The flow runs top to bottom. React calls Express, Express runs on Node, Node reads and writes MongoDB."
          />
          <StackDiagram />
          <p className="mt-6 flex items-center gap-2 text-xs text-slate-500">
            <Code2 className="h-3.5 w-3.5" />
            Every layer above is a dedicated module in the curriculum below.
          </p>
        </div>
      </section>

      {/* ========================= CURRICULUM ========================= */}
      <section id="curriculum" className="section-padding scroll-mt-24">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Curriculum"
            title="From your first HTML tag to a deployed full-stack app"
            sub={`${mernMeta.moduleCount} modules across ${mernMeta.duration.toLowerCase()}. Open any one to see the topics inside it, the tools it uses, and what you can do once it is done.`}
          />

          <div className="mb-6 flex flex-wrap gap-2">
            {curriculumPhases.map((p, i) => (
              <span
                key={p}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-text-secondary"
              >
                <span className="text-text-muted">{i + 1}</span>
                {p}
              </span>
            ))}
          </div>

          <CurriculumTimeline modules={curriculum} />

          <p className="mt-6 text-sm text-text-secondary">
            Prefer it as one document? The full{" "}
            <Link
              href="/courses/mern-stack-development"
              className="font-semibold text-primary hover:underline"
            >
              MERN Stack course page
            </Link>{" "}
            lists every topic. If you only want one part of the stack, we also run{" "}
            <Link href="/react-course-gurugram" className="font-semibold text-primary hover:underline">
              React JS
            </Link>{" "}
            and{" "}
            <Link
              href="/typescript-course-gurugram"
              className="font-semibold text-primary hover:underline"
            >
              TypeScript
            </Link>{" "}
            courses in Gurugram.
          </p>
        </div>
      </section>

      {/* ======================= PROJECT SHOWCASE ======================= */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Projects"
            title="Build the projects that go on your resume"
            sub="These are not tutorials. They are the kind of brief a client hands you. You build each one, a mentor reviews it, then it goes on your GitHub with a proper README."
          />
          <ProjectShowcase items={projects} />
        </div>
      </section>

      {/* ========================= API FLOW ========================= */}
      <section className="mern-dark relative overflow-hidden">
        <div className="mern-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="container-custom relative section-padding">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                dark
                eyebrow="How it fits together"
                title="From an API request to the database, and back"
                sub="By the middle of the course this round trip is second nature. It looks the same whether you are loading a product list, logging someone in, or saving an order."
              />
              <ul className="space-y-2 text-sm text-slate-300">
                {["You write the React component and the fetch call", "You set up the Express route and its middleware", "You shape the data in MongoDB with Mongoose", "You deal with the errors, the auth and the status codes"].map(
                  (t) => (
                    <li key={t} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--mern-green)]" />
                      {t}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--mern-line)] bg-[var(--mern-panel)]/50 p-6 sm:p-8">
              <ApiFlow />
            </div>
          </div>
        </div>
      </section>

      {/* ======================= WHY WEBIGEEKS ======================= */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Why WebiGeeks"
            title="Built like a developer team, not a lecture hall"
            sub="Finishing a course and being ready for a job are two different things. The gap is mentorship, code reviews and a proper workflow. That is what sits here."
          />
          <Stagger step={0.045} className="grid gap-x-12 sm:grid-cols-2">
            {differentiators.map((d, i) => (
              <StaggerItem
                key={d.title}
                className={`group flex gap-4 border-t border-border py-5 ${
                  i === 0 ? "border-t-0 pt-0" : ""
                } ${i === 1 ? "sm:border-t-0 sm:pt-0" : ""}`}
              >
                <span className="shrink-0 pt-0.5 font-mono text-xs font-bold text-primary/50 transition-colors group-hover:text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-text-primary">{d.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-text-secondary">{d.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ======================= TESTIMONIALS ======================= */}
      {stories.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <SectionHeading
              center
              eyebrow="Student stories"
              title="From WebiGeeks students"
              sub="Reviews from people who took a development track with us."
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {stories.map((t) => (
                <figure
                  key={t._id}
                  className="rounded-2xl border border-border bg-white p-5 transition-[border-color,box-shadow] hover:border-primary/30 hover:shadow-md"
                >
                  <div className="mb-2 flex gap-0.5" aria-label={`${t.rating} out of 5`}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i} className="text-sm text-accent">
                        ★
                      </span>
                    ))}
                  </div>
                  <blockquote className="text-sm leading-relaxed text-text-secondary">
                    &ldquo;{t.testimonialText}&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 text-sm font-bold text-text-primary">
                    {t.studentName}
                    {t.companyPlaced && (
                      <span className="font-normal text-text-muted"> — {t.companyPlaced}</span>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======================= LEARNING MODES ======================= */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Learning modes"
            title="Learn on campus, live online, or both"
            sub="Same course, same mentors, same projects. Pick the format that fits your week."
          />
          <Stagger step={0.06} className="grid gap-5 md:grid-cols-3">
            {learningModes.map((m) => (
              <StaggerItem
                key={m.title}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-[border-color,box-shadow] hover:border-primary/30 hover:shadow-sm"
              >
                <p className="border-b border-border bg-[var(--mern-ink)] px-4 py-2 font-mono text-[11px] text-slate-400">
                  <span className="text-[var(--mern-green)]">{m.cmd.split(" ")[0]}</span>
                  {m.cmd.slice(m.cmd.indexOf(" "))}
                </p>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold uppercase tracking-wide text-primary">{m.where}</p>
                  <h3 className="mt-1 text-lg font-bold text-text-primary">{m.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary">{m.body}</p>
                  <ul className="mt-4 space-y-1.5">
                    {m.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-xs text-text-secondary">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ========================= CAREER ========================= */}
      <section className="mern-dark relative overflow-hidden">
        <div className="mern-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="container-custom relative section-padding">
          <SectionHeading
            dark
            eyebrow="Career outcomes"
            title="What can you do after MERN?"
            sub="The syllabus is checked against real full-stack job posts. These are the roles you can apply for once you finish."
          />

          <Stagger
            step={0.07}
            className="flex flex-col gap-2.5 md:flex-row md:flex-wrap md:items-stretch"
          >
            {careerPath.map((c, i) => (
              <StaggerItem key={c.role} className="flex items-center gap-2.5 md:flex-1">
                <div className="flex-1 rounded-xl border border-[var(--mern-line)] bg-[var(--mern-panel)]/60 px-4 py-3 transition-colors hover:border-[var(--mern-cyan)]/50 hover:bg-[var(--mern-panel)]">
                  <p className="text-sm font-semibold text-white">{c.role}</p>
                  <p className="mt-0.5 text-[11px] text-slate-500">{c.note}</p>
                </div>
                {i < careerPath.length - 1 && (
                  <ChevronRight className="hidden h-4 w-4 shrink-0 text-slate-600 md:block" />
                )}
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <p className="mt-10 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[var(--mern-cyan)]">
              By the end, you can
            </p>
            <div className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {canBuild.map((b) => (
                <div key={b} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--mern-cyan)]" />
                  {b}
                </div>
              ))}
            </div>
            <p className="mt-6 text-[11px] leading-relaxed text-slate-500">{CAREER_FOOTNOTE}</p>
          </Reveal>
        </div>
      </section>

      {/* ========================= PRICING ========================= */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            center
            eyebrow="Fees"
            title="One fee. The whole programme."
          />
          <Reveal className="mx-auto max-w-md rounded-2xl border-2 border-primary bg-white p-6 shadow-xl sm:p-7">
            <p className="text-xs font-bold uppercase tracking-wide text-primary">
              MERN Stack Development
            </p>
            <div className="mt-2 flex items-end gap-2.5">
              <span className="text-lg text-text-muted line-through">{pricing.listPrice}</span>
              <span className="text-4xl font-extrabold text-text-primary">{pricing.offerPrice}</span>
            </div>
            <p className="mt-1 text-xs text-text-muted">{pricing.duration}</p>

            <ul className="mt-5 space-y-2">
              {pricing.includes.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>

            <p className="mt-4 rounded-lg bg-primary-50/70 px-3 py-2.5 text-[13px] text-text-primary">
              {pricing.emiNote}
            </p>

            <a
              href="#demo-form"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-white shadow-lg shadow-primary/25 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98]"
            >
              Talk to a counsellor <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="mt-2.5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-text-secondary transition-colors hover:bg-gray-50"
            >
              <Phone className="h-4 w-4" /> {siteConfig.contact.phone}
            </a>
          </Reveal>
        </div>
      </section>

      {/* ========================= FAQ ========================= */}
      <section id="faq" className="section-padding bg-gray-50 scroll-mt-24">
        <div className="container-custom max-w-3xl">
          <SectionHeading center eyebrow="FAQ" title="Questions people ask about the course" />
          <MernFaq />
        </div>
      </section>

      {/* ========================= BOTTOM CTA ========================= */}
      <section className="mern-dark relative overflow-hidden">
        <div className="mern-grid pointer-events-none absolute inset-0 opacity-50" />
        <div
          className="pointer-events-none absolute left-1/4 top-0 h-72 w-72 rounded-full opacity-30 blur-[120px]"
          style={{ background: "radial-gradient(circle, #1672B8, transparent 70%)" }}
        />
        <Reveal className="container-custom relative py-16 text-center">
          <h2 className="heading-section mx-auto max-w-2xl text-white">
            Ready to build your first full-stack application?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--mern-text-dim)]">
            Learn the MERN Stack in Gurugram or online, with a mentor in the room. Book a free demo
            class and we will send you the full curriculum.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#demo-form"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-bold text-white shadow-lg shadow-primary/25 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98]"
            >
              Book my free demo <ArrowRight className="h-4 w-4" />
            </a>
            <CurriculumDownload buttonClassName="inline-flex items-center gap-2 rounded-xl border border-[var(--mern-line-strong)] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/5" />
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--mern-line-strong)] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/5"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp us
            </a>
          </div>
          <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <MapPin className="h-3.5 w-3.5" />
            {siteConfig.contact.address}
          </p>
        </Reveal>
      </section>
    </div>
  );
}
