"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, type Variants } from "framer-motion";
import { siteConfig } from "@/config/site";
import { faqs } from "./faqs";
import HeroDemoForm from "./HeroDemoForm";
import HeroDataScrubber from "./HeroDataScrubber";
import CurriculumDownload from "./CurriculumDownload";
import FaqAccordion from "./FaqAccordion";
import StickyCta from "./StickyCta";
import WhatsAppButton from "./WhatsAppButton";
import {
  IconTable,
  IconDatabase,
  IconTerminal,
  IconDistribution,
  IconChartBar,
  IconLayers,
  IconCheck,
  IconCheckMini,
  IconPhone,
  IconArrowRight,
  IconPin,
  IconDisplay,
  IconSwap,
  IconSparkle,
  IconQuote,
  IconChevronDown,
} from "./AppleIcons";
import {
  DataHorizon,
  KpiBoard,
  QueryGrid,
  DashboardPanel,
  FunnelChart,
  Heatmap,
  PaymentSchedule,
  TiltCard,
} from "./DataMotifs";

const EASE_SNAPPY = [0.23, 1, 0.32, 1] as const;

// The page's one surface treatment: depth from layered shadow (a tight contact
// shadow plus a broad ambient one), never a hairline border. One material,
// used everywhere, is what keeps nine sections reading as one document.
const SURFACE = "bg-white rounded-3xl shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_40px_-16px_rgba(15,23,42,0.16)]";
const SURFACE_HOVER =
  "transition-shadow duration-300 ease-snappy hover:shadow-[0_2px_4px_rgba(15,23,42,0.06),0_28px_56px_-16px_rgba(15,23,42,0.22)]";

const CONTACT = {
  phone1: siteConfig.contact.phone,
  phone2: siteConfig.contact.phone2,
  email: siteConfig.contact.email,
  address: siteConfig.contact.address,
};

/** RFC 3966 wants a bare dial string — the display number carries spaces
    ("+91 8766367815") that don't belong in the href. Most dialers cope, but
    not all, and a `tel:` a paid visitor can't tap is a lost call. */
const dialable = (phone: string) => phone.replace(/[^\d+]/g, "");

const trustStats = [
  { value: "300+", label: "Students Trained" },
  { value: "4.8★", label: "Student Rating" },
  { value: "15", label: "Max Batch Size" },
  { value: "6-7 Mo", label: "Program Duration" },
];

const whyChecklist = [
  { title: "Learn Industry-Relevant Tools", body: "Power BI, SQL, Tableau, Python and advanced Excel — the stack modern BI teams actually run on." },
  { title: "Build Real-World Projects", body: "Practical datasets and business scenarios you can confidently walk an interviewer through." },
  { title: "Develop Job-Ready Skills", body: "Clean data, find insights, build visualizations, and communicate findings clearly — not just theory." },
  { title: "Get Career Support", body: "Resume building, interview prep, LinkedIn optimisation and placement assistance beyond the classroom." },
];

const modules = [
  {
    icon: IconTable,
    tag: "~3 Weeks",
    title: "Excel & Data Fundamentals",
    subtitle: "Master the tool most businesses still depend on",
    points: ["Advanced formulas, lookups & dynamic arrays", "PivotTables, PivotCharts & data cleaning", "Power Query for automated data import", "Built-in AI: Ideas, Copilot features"],
    outcome: "Turn a messy spreadsheet into an executive-ready PivotTable dashboard.",
    tools: "Excel · Power Query",
  },
  {
    icon: IconDatabase,
    tag: "~3–4 Weeks",
    title: "SQL & Relational Databases",
    subtitle: "The universal language of data",
    points: ["SELECT, filtering, aggregation & CASE logic", "Joins — inner, outer, cross & self", "Window functions (RANK, LAG/LEAD)", "Subqueries, CTEs & recursive queries"],
    outcome: "Write production-level SQL queries against real relational databases.",
    tools: "SQL",
  },
  {
    icon: IconTerminal,
    tag: "~6 Weeks",
    title: "Python, Pandas & Exploratory Analysis",
    subtitle: "Go beyond spreadsheets and work with real data",
    points: ["Python fundamentals & core data structures", "Pandas: reading, cleaning & transforming data", "Handling missing data & outlier treatment", "EDA and Matplotlib visualizations"],
    outcome: "Clean, explore and visualize a real dataset end-to-end in Python.",
    tools: "Python · Pandas · Matplotlib",
  },
  {
    icon: IconDistribution,
    tag: "~3 Weeks",
    title: "Advanced Analytics — NumPy, Seaborn & Statistics",
    subtitle: "Back insights with statistical rigor, not guesswork",
    points: ["NumPy for numerical computing", "Seaborn: heatmaps, pair plots & regression plots", "Hypothesis testing with SciPy (t-tests, ANOVA)", "Correlation analysis for validating insights"],
    outcome: "Validate business insights with real statistical testing, not just a hunch.",
    tools: "NumPy · Seaborn · SciPy",
  },
  {
    icon: IconChartBar,
    tag: "~6–7 Weeks",
    title: "Power BI & Tableau",
    subtitle: "Turn raw numbers into dashboards people can understand",
    points: ["Data modeling, star schemas & DAX", "Interactive dashboards, drill-through & bookmarks", "Forecasting & AI visuals in Power BI", "Tableau: LOD expressions & Story Points"],
    outcome: "Build enterprise-grade, interactive dashboards in both major BI tools.",
    tools: "Power BI · Tableau · DAX",
  },
  {
    icon: IconLayers,
    tag: "~2 Weeks",
    title: "MongoDB — NoSQL for Analytics",
    subtitle: "Not all data lives in tables",
    points: ["Document model vs. relational tables", "CRUD operations & query operators", "Aggregation pipelines for analytics", "Connect MongoDB to Python via PyMongo"],
    outcome: "Work with modern, flexible-schema data alongside traditional SQL.",
    tools: "MongoDB · PyMongo",
  },
];

const projects = [
  "End-to-end data analysis project — raw CSV to executive-ready insights",
  "Business case studies across retail, finance, healthcare & e-commerce",
  "Portfolio development — published to GitHub for recruiters",
];

const differentiators = [
  { title: "Personal Mentorship", body: "Direct access to your trainer — ask questions, get feedback, work through problems 1-on-1. You're not just a name on a screen." },
  { title: "Small Batches", body: "Max 15 students per batch, so your mentor has time to understand your strengths and where you're struggling." },
  { title: "AI-Integrated Curriculum", body: "Learn to work with ChatGPT, Claude and GitHub Copilot inside real tasks — not as a separate add-on topic." },
  { title: "Placement Assistance", body: "Resume building, mock interviews, LinkedIn optimisation, and direct introductions within our hiring network." },
  { title: "AI-Ready Career Outcomes", body: "Graduate with practical AI + data skills employers are actively hiring for — our students typically move into ₹3.5–10 LPA data analyst roles, backed by real mentorship and placement support, not empty guarantees." },
];

// Surfaced from the FAQ into the pricing chapter itself. A single price card
// alone in a full-width section reads as an unfinished layout, and the payment
// terms are exactly the objection a visitor has at that moment — so the thing
// that fills the space is also the thing that earns the conversion.
const paymentPlans = [
  { title: "Pay in full", body: "A 5% bonus discount, plus a free advanced module." },
  { title: "Monthly EMI", body: "₹3,333/month × 6 months. No interest, no hidden charges." },
  { title: "50 / 50 split", body: "Half up front, the rest after your first month." },
];

const modes = [
  { icon: IconPin, title: "Offline", body: "Live training in Gurgaon with direct mentor interaction and hands-on practice.", points: ["Sector-14 Gurgaon Campus", "Morning, Evening & Weekend Batches", "Live Practical Training"], best: "Students & professionals who prefer classroom learning." },
  { icon: IconDisplay, title: "Online Live", body: "Live classes online with real-time interaction with your trainer.", points: ["Live Instructor-Led Classes", "Weekday & Weekend Batches", "Class Recordings Available"], best: "Working professionals and students who need flexibility." },
  { icon: IconSwap, title: "Hybrid", body: "Combine the convenience of online learning with in-person training in Gurgaon.", points: ["Switch Between Online & Offline", "Direct Mentor Access", "No Compromise on Content"], best: "Professionals and career changers who need maximum flexibility." },
];


type Story = { name: string; outcome: string; quote: string };

// Section entrance: fades and lifts into place the first time it scrolls into
// view, never re-triggering. The lift collapses to a plain fade when the
// visitor has asked for reduced motion — gentler, not absent.
function useFadeUp() {
  const reduceMotion = useReducedMotion();
  return (delay = 0): Variants => ({
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: EASE_SNAPPY } },
  });
}

const viewport = { once: true, margin: "-80px" } as const;
const num = (n: number) => String(n).padStart(2, "0");

/** Reading progress for the whole story — the page's only persistent chrome. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 inset-x-0 h-0.5 z-[70] origin-left gradient-accent"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

/** Chapter marker. Repeating it verbatim per section is what makes the page read as one narrative. */
function Eyebrow({ index, label }: { index: number; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-xs font-extrabold tabular-nums text-primary tracking-[0.18em]">{num(index)}</span>
      <span className="h-px w-7 bg-primary/30" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">{label}</span>
    </div>
  );
}

/* Matches the `lg:` breakpoint the motifs are gated on. Kept as one string so
   the CSS and the JS can never drift apart. */
const DESKTOP_QUERY = "(min-width: 1024px)";

function subscribeToDesktop(onChange: () => void) {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Whether the viewport is wide enough for the chapter motifs to be visible.
 *
 * `useSyncExternalStore` rather than `useState` + `useEffect`: it gives a
 * server snapshot (`false`) without a set-state-in-effect, so this doesn't add
 * to the react-hooks lint debt the rest of the app already carries.
 */
function useIsDesktop() {
  return useSyncExternalStore(
    subscribeToDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
}

/**
 * One chapter opening: number, title, and the chapter's 3D object beside it.
 *
 * The motif is paired with the heading rather than centred above it — floated
 * on its own it reads as an orphaned graphic with dead space around it, while
 * alongside the words it reads as the illustration for that chapter. `flip`
 * alternates which side it lands on so consecutive chapters don't march down
 * the page in the same shape.
 */
function ChapterHeader({
  index,
  label,
  title,
  subtitle,
  motif,
  flip,
}: {
  index: number;
  label: string;
  title: string;
  subtitle?: string;
  motif?: React.ReactNode;
  flip?: boolean;
}) {
  const fadeUp = useFadeUp();
  const isDesktop = useIsDesktop();

  const copy = (
    <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp()}>
      <Eyebrow index={index} label={label} />
      <h2 className="heading-section text-text-primary mb-2">{title}</h2>
      {subtitle && <p className="text-text-secondary max-w-lg">{subtitle}</p>}
    </motion.div>
  );

  // Capped rather than filling its column. Left to span half the band the
  // artwork out-measured the heading it was illustrating and started reading as
  // the subject of the section; ~340px keeps it clearly supporting the copy.
  //
  // Mounted only on desktop, not merely hidden there. `hidden lg:flex` alone
  // still built all six motifs on a phone — 349 DOM nodes, ~33KB of HTML and a
  // live scroll subscription each, for artwork that viewport never shows. On a
  // paid-traffic page that's a third of the DOM spent on nothing.
  //
  // The box is reserved with the motifs' own 420x300 viewBox ratio so the
  // column has its full height before anything mounts into it — an aspect
  // ratio rather than the measured 243px, since that height is a function of
  // the column width and a hard-coded pixel value would be wrong the moment
  // the grid changes.
  const art = motif && (
    <div className="hidden lg:flex justify-center">
      <div className="w-full max-w-[340px] aspect-[420/300]">{isDesktop && motif}</div>
    </div>
  );

  // The copy keeps the larger track whichever side the art lands on.
  const columns = flip ? "lg:grid-cols-[0.9fr_1.1fr]" : "lg:grid-cols-[1.1fr_0.9fr]";

  return (
    <div className={`grid ${columns} gap-10 lg:gap-14 items-center mb-16`}>
      {flip && art}
      {copy}
      {!flip && art}
    </div>
  );
}

export default function DataAnalyticsContent({ stories }: { stories: Story[] }) {
  const fadeUp = useFadeUp();
  const isDesktop = useIsDesktop();

  return (
    <main className="bg-white">
      <ScrollProgress />

      {/* ---------------- Hero ---------------- */}
      <section id="hero" className="gradient-hero text-white pt-16 pb-20 md:pt-24 md:pb-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[32rem] h-[32rem] bg-primary/25 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />

        <div className="container-custom relative grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          {/* Deliberately NOT a motion component. Framer renders its `initial`
              state into the SSR HTML, so this block shipped as
              `opacity:0` and stayed invisible until the JS bundle had
              downloaded, parsed and hydrated — on mobile that read as the page
              loading late, because the H1 here is the LCP element. A CSS
              animation starts at first paint instead, and `rise-in` moves
              without ever touching opacity, so the text is contentful from
              the very first frame. */}
          <div className="animate-rise-in motion-reduce:animate-none">
            <span className="inline-flex px-3.5 py-1.5 rounded-full glass text-xs font-medium tracking-wide mb-6">
              Sector-14, Gurugram Campus &amp; Online
            </span>
            <h1 className="heading-hero mb-3">Become an AI-Powered Data Analyst.</h1>
            <p className="text-accent font-semibold text-lg sm:text-xl mb-5 tracking-tight">
              Trained by a mentor, not a video.
            </p>
            <p className="text-white/65 text-lg mb-8 leading-relaxed max-w-lg">
              A 6-7 month, hands-on Data Analytics program — Excel, SQL, Python, Power BI, Tableau and MongoDB.
              Learn at our Gurgaon campus or join live online classes.
            </p>

            <ul className="space-y-3 mb-8">
              {["Personal mentorship. Real projects.", "Placement assistance.", "Learn from industry experts in Gurgaon or online."].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-white/80 text-sm">
                  <IconCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" /> {t}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <CurriculumDownload buttonClassName="inline-flex items-center gap-2 px-7 py-3.5 rounded-full gradient-accent text-white font-bold shadow-lg hover:shadow-glow-accent active:scale-[0.97] transition-[transform,box-shadow] duration-150 ease-snappy" />
              <a
                href={`tel:${dialable(CONTACT.phone1)}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass text-white font-semibold hover:bg-white/15 active:scale-[0.97] transition-[background-color,transform] duration-150 ease-snappy"
              >
                <IconPhone className="w-4 h-4" /> {CONTACT.phone1}
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-1.5 mt-7 text-xs text-white/50">
              <span className="inline-flex items-center gap-1.5">
                <IconSparkle className="w-3.5 h-3.5 text-accent" /> Next batch: 1 September 2026
              </span>
              <span>Only 12 seats remaining</span>
              <span>Free 1-on-1 career counseling included</span>
            </div>
          </div>

          {/* Below the fold on a phone, so a short opacity fade is affordable
              here — but still CSS, not JS, so it never waits on hydration.
              `backwards` fill stops the delay from flashing the card at full
              opacity before the animation starts. */}
          <div className="animate-fade-in-up [animation-delay:90ms] [animation-fill-mode:backwards] motion-reduce:animate-none">
            <HeroDemoForm />
          </div>
        </div>

        {/* The hook: something to play with, then an explicit push downward. */}
        <div className="container-custom relative mt-14 lg:mt-16 max-w-4xl animate-fade-in-up [animation-delay:180ms] [animation-fill-mode:backwards] motion-reduce:animate-none">
          <HeroDataScrubber />

          <div className="flex justify-center mt-10">
            <a
              href="#chapter-01"
              className="group inline-flex flex-col items-center gap-2 text-white/55 hover:text-white/90 transition-colors duration-200"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                See how you get there
              </span>
              <IconChevronDown className="w-5 h-5 animate-bounce-subtle motion-reduce:animate-none" />
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- Trust strip ---------------- */}
      <section className="bg-white">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center divide-x divide-border -mx-6">
            {trustStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={fadeUp(i * 0.06)}
                className="px-6 sm:px-10 py-10 text-center"
              >
                <p className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">{s.value}</p>
                <p className="text-xs text-text-muted mt-1.5 uppercase tracking-wider">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 01 · The opportunity ---------------- */}
      <section id="chapter-01" className="section-padding overflow-hidden scroll-mt-4">
        <div className="container-custom grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center max-w-5xl">
          <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp()}>
            <Eyebrow index={1} label="The opportunity" />
            <h2 className="heading-section text-text-primary mb-3">Why you need this course</h2>
            <p className="text-primary font-semibold text-lg mb-5">
              Data Analytics skills = ₹3.5–10 LPA salary range in India
            </p>
            <p className="text-text-secondary leading-relaxed mb-2">
              Every business generates data — sales, customers, marketing, finance, operations, websites, apps. But
              raw data doesn&apos;t create value on its own. Businesses need people who can turn that data into
              insights, dashboards and decisions.
            </p>
            <p className="text-text-secondary leading-relaxed">That&apos;s why at WebiGeeks, you&apos;ll focus on:</p>
          </motion.div>

          {/* Same desktop-only gating and reserved box as ChapterHeader's
              motifs — this chapter lays its own grid out rather than using
              ChapterHeader, so the treatment is repeated here deliberately. */}
          <div className="hidden lg:flex justify-center">
            <div className="w-full max-w-[340px] aspect-[420/300]">{isDesktop && <KpiBoard />}</div>
          </div>
        </div>

        <div className="container-custom max-w-5xl mt-12">
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-7">
            {whyChecklist.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={fadeUp(i * 0.06)}
                className="flex items-start gap-3"
              >
                <IconCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-text-primary text-sm mb-1">{item.title}</p>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 02 · The curriculum ---------------- */}
      <section className="section-padding overflow-hidden">
        <div className="container-custom max-w-4xl">
          <ChapterHeader
            index={2}
            label="The curriculum"
            title="From Excel basics to job-ready Data Analytics skills"
            subtitle="What you'll master, module by module — ten modules, one continuous build."
            motif={<QueryGrid flip />}
            flip
          />

          <div className="relative">
            <div className="hidden sm:block absolute left-[27px] top-4 bottom-4 w-px bg-border" />

            <div className="space-y-10 sm:space-y-14">
              {modules.map((m, i) => (
                <motion.div
                  key={m.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  variants={fadeUp(Math.min(i * 0.05, 0.25))}
                  className="relative flex gap-5 sm:gap-8"
                >
                  <div className="hidden sm:flex w-14 shrink-0 items-start justify-center pt-1">
                    <span className="text-2xl font-extrabold text-primary/25 tabular-nums bg-white relative z-10">
                      {num(i + 1)}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5 mb-1">
                      <m.icon className="w-[18px] h-[18px] text-primary shrink-0" />
                      <h3 className="font-bold text-text-primary text-lg">{m.title}</h3>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary-50 text-primary font-semibold">
                        {m.tag}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary italic mb-4">{m.subtitle}</p>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-4">
                      {m.points.map((p) => (
                        <li key={p} className="text-sm text-text-secondary flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" /> {p}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-text-primary mb-2">
                      <span className="font-semibold">What you&apos;ll be able to do —</span>{" "}
                      <span className="text-text-secondary">{m.outcome}</span>
                    </p>
                    <p className="text-xs text-text-muted">Tools: {m.tools}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp()}
            className={`mt-14 p-7 ${SURFACE}`}
          >
            <p className="font-bold text-text-primary mb-4">Real-world projects &amp; portfolio building</p>
            <div className="space-y-2.5">
              {projects.map((p) => (
                <p key={p} className="text-sm text-text-secondary flex items-start gap-2">
                  <IconCheckMini className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {p}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- 03 · The difference ---------------- */}
      <section className="section-padding bg-gray-50 overflow-hidden">
        <div className="container-custom max-w-5xl">
          <ChapterHeader
            index={3}
            label="The difference"
            title="Why WebiGeeks is different"
            subtitle="Personal mentorship, practical experience, modern tools and dedicated career support."
            motif={<DashboardPanel />}
          />
        </div>

        <div className="container-custom max-w-3xl">
          <div className="divide-y divide-border">
            {differentiators.map((d, i) => (
              <motion.div
                key={d.title}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={fadeUp(i * 0.05)}
                className="flex items-start gap-5 sm:gap-8 py-6"
              >
                <span className="text-xl font-extrabold text-primary/25 tabular-nums pt-0.5 w-8 shrink-0">
                  {num(i + 1)}
                </span>
                <div>
                  <h3 className="font-bold text-text-primary mb-1">{d.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{d.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 04 · The proof ---------------- */}
      <section className="section-padding bg-gray-50 overflow-hidden">
        <div className="container-custom max-w-5xl">
          <ChapterHeader
            index={4}
            label="The proof"
            title="What our students say"
            subtitle="Real reviews from real WebiGeeks students."
            motif={<FunnelChart flip />}
            flip
          />

          <div className="grid sm:grid-cols-3 gap-6">
            {stories.map((s, i) => (
              <motion.div
                key={s.name}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={fadeUp(i * 0.06)}
              >
                <TiltCard>
                  <div className={`p-6 h-full ${SURFACE} ${SURFACE_HOVER}`}>
                    <IconQuote className="w-6 h-6 text-primary/20 mb-3" />
                    <p className="text-sm text-text-secondary leading-relaxed mb-5">&ldquo;{s.quote}&rdquo;</p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary-50 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-text-primary text-sm leading-tight">{s.name}</p>
                        <p className="text-xs text-text-muted leading-tight">{s.outcome}</p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 05 · The format ---------------- */}
      <section className="section-padding bg-gray-50 overflow-hidden">
        <div className="container-custom max-w-5xl">
          <ChapterHeader
            index={5}
            label="The format"
            title="Learning modes"
            subtitle="Learn your way, without putting your career on hold."
            motif={<Heatmap />}
          />

          <div className="grid sm:grid-cols-3 gap-6">
            {modes.map((m, i) => (
              <motion.div
                key={m.title}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={fadeUp(i * 0.06)}
              >
                <TiltCard>
                  <div className={`p-7 h-full ${SURFACE} ${SURFACE_HOVER}`}>
                    <m.icon className="w-6 h-6 text-primary mb-4" />
                    <h3 className="font-bold text-text-primary mb-1.5">{m.title}</h3>
                    <p className="text-sm text-text-secondary mb-4 leading-relaxed">{m.body}</p>
                    <ul className="space-y-2 mb-5">
                      {m.points.map((p) => (
                        <li key={p} className="text-xs text-text-secondary flex items-start gap-2">
                          <IconCheckMini className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" /> {p}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-text-muted pt-4 border-t border-border">
                      <span className="font-semibold text-text-secondary">Best for:</span> {m.best}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 06 · The investment ---------------- */}
      <section className="section-padding overflow-hidden">
        <div className="container-custom max-w-5xl">
          <ChapterHeader
            index={6}
            label="The investment"
            title="Course fees & payment options"
            subtitle="One price, three ways to pay it — and everything below included."
            motif={<PaymentSchedule flip />}
            flip
          />
        </div>

        <div className="container-custom max-w-5xl">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={fadeUp()}
            >
              <h3 className="font-bold text-text-primary mb-1">Three ways to pay</h3>
              <p className="text-sm text-text-secondary mb-6">
                Every option gives you the same course access — pick whichever fits your cash flow.
              </p>
              <div className="divide-y divide-border">
                {paymentPlans.map((p, i) => (
                  <div key={p.title} className="flex items-start gap-5 py-5">
                    <span className="text-lg font-extrabold text-primary/25 tabular-nums w-7 shrink-0">
                      {num(i + 1)}
                    </span>
                    <div>
                      <p className="font-semibold text-text-primary text-sm mb-0.5">{p.title}</p>
                      <p className="text-sm text-text-secondary leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-muted mt-5">
                Not included: optional certifications, and your own laptop.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={fadeUp(0.1)}
              className={`w-full lg:w-[350px] max-w-sm mx-auto p-8 relative ${SURFACE} ring-1 ring-primary/15`}
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-accent text-white text-[11px] font-bold flex items-center gap-1.5 whitespace-nowrap shadow-glow-accent">
                <IconSparkle className="w-3 h-3" /> LIMITED TIME PRICE
              </span>
              <div className="text-center mt-3 mb-1.5">
                <span className="text-lg text-text-muted line-through mr-2">₹29,999</span>
                <span className="text-4xl font-extrabold text-text-primary tracking-tight">₹19,999</span>
              </div>
              <p className="text-xs text-text-muted text-center mb-6">Complete 6–7 month program · 10 modules</p>
              <ul className="space-y-2.5 mb-6">
                {["Complete Data Analytics Curriculum", "10+ Industry-Relevant Projects", "Internship Included", "Placement Assistance", "Course Certificate"].map((f) => (
                  <li key={f} className="text-sm text-text-secondary flex items-start gap-2">
                    <IconCheckMini className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-text-secondary text-center pt-5 border-t border-border">
                EMI from ₹3,333/month · no interest
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------- 07 · Questions ---------------- */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          {/* No motif here on purpose — this chapter is dense Q&A a visitor
              reads to resolve an objection, and decoration beside it competes
              with the answers rather than illustrating them. */}
          <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp()}>
            <Eyebrow index={7} label="Questions" />
            <h2 className="heading-section text-text-primary mb-14">Frequently asked questions</h2>
          </motion.div>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* ---------------- Closing CTA ---------------- */}
      <section className="py-20 sm:py-28 gradient-hero text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-primary/20 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
        {/* The hero's trend line, closing the loop — but laid down as the ground
            the CTA stands on, spanning the full width, rather than parked in a
            corner where it unbalanced the centred text. */}
        <DataHorizon className="absolute inset-x-0 bottom-0 w-full h-32 sm:h-44" />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeUp()}
          className="container-custom relative max-w-xl"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
            Ready to take the next step in your Data Analytics career?
          </h2>
          <p className="text-white/70 mb-2">Limited time price — ₹19,999 instead of ₹29,999</p>
          <p className="text-white/50 text-sm mb-9">Next batch: 1 September 2026 · Only 12 seats available</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#demo-form"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full gradient-accent text-white font-bold shadow-lg hover:shadow-glow-accent active:scale-[0.97] transition-[transform,box-shadow] duration-150 ease-snappy"
            >
              Book My Free Demo <IconArrowRight className="w-4 h-4" />
            </a>
            <CurriculumDownload buttonClassName="inline-flex items-center gap-2 px-8 py-3.5 rounded-full glass text-white font-semibold hover:bg-white/15 active:scale-[0.97] transition-[background-color,transform] duration-150 ease-snappy" />
          </div>
          <p className="text-white/40 text-xs mt-7">30-minute career counseling included with every demo.</p>
        </motion.div>
      </section>

      {/* Minimal footer — contact only, no site nav, so there's nowhere for a paid click to wander off to.
          Extra bottom padding keeps the disclaimer text clear of the sticky CTA bar. Same navy as the
          hero/CTA gradient's darkest stop, not black, so the page closes in the tone it opened in. */}
      <footer className="py-8 pb-24 bg-surface-dark text-white/60 text-center text-sm">
        <p className="mb-1 inline-flex items-center gap-1.5">
          <IconPin className="w-3.5 h-3.5" />
          {CONTACT.address}
        </p>
        <p>
          {CONTACT.phone1} · {CONTACT.phone2} · {CONTACT.email}
        </p>
        <p className="mt-2">
          <Link href="/privacy-policy" className="underline hover:text-white/90">
            Privacy Policy
          </Link>
        </p>
        {/* /50 not /30: over this footer's solid #0F172A that is 5.23:1, where /30
            measured 2.70 and failed WCAG AA for small text. Fine print still needs
            to be readable to count as disclosed. */}
        <p className="text-xs text-white/50 mt-3">*Terms and conditions apply. See counselor for details.</p>
      </footer>

      <StickyCta />
      <WhatsAppButton />
    </main>
  );
}
