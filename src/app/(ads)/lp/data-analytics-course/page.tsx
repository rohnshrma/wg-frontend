import type { Metadata } from "next";
import {
  CheckCircle2,
  Sparkles,
  BookOpen,
  BarChart3,
  Database,
  Flame,
  Phone,
  ArrowRight,
  MapPin,
  Monitor,
  Shuffle,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { getTestimonials } from "@/lib/testimonials";
import HeroDemoForm from "./HeroDemoForm";
import CurriculumDownload from "./CurriculumDownload";
import FaqAccordion from "./FaqAccordion";
import StickyCta from "./StickyCta";

// Ad-traffic landing page — deliberately not part of the organic
// /data-analytics-course-gurugram SEO page (which links out to /contact
// instead of capturing the lead inline). Kept out of the search index so it
// never competes with that page for rankings.
export const metadata: Metadata = {
  title: "Data Analytics Course in Gurgaon | Free Demo — WebiGeeks",
  description:
    "Master Data Analytics in 6 months — Excel, SQL, Power BI, Tableau & Python. Offline in Gurgaon or live online. 98% placement assistance. Book a free demo.",
  robots: { index: false, follow: false },
};

const CONTACT = {
  phone1: siteConfig.contact.phone,
  phone2: siteConfig.contact.phone2,
  email: siteConfig.contact.email,
  address: siteConfig.contact.address,
};

const trustStats = [
  { value: "100+", label: "Students Trained" },
  { value: "4.8★", label: "Student Rating" },
  { value: "100%", label: "Placement Assistance" },
  { value: "15 Max", label: "Students Per Batch" },
  { value: "1000+", label: "Hiring Partners" },
];

const whyChecklist = [
  { title: "Learn Industry-Relevant Tools", body: "Power BI, SQL, Tableau, Python and advanced Excel — the stack modern BI teams actually run on." },
  { title: "Build Real-World Projects", body: "Practical datasets and business scenarios you can confidently walk an interviewer through." },
  { title: "Develop Job-Ready Skills", body: "Clean data, find insights, build visualizations, and communicate findings clearly — not just theory." },
  { title: "Get Career Support", body: "Resume building, interview prep, LinkedIn optimisation and placement assistance beyond the classroom." },
];

const modules = [
  {
    icon: BookOpen,
    tag: "3–4 Weeks",
    title: "Excel & Data Analytics Foundations",
    subtitle: "Master the tool most businesses still depend on",
    points: ["Advanced Excel formulas & Pivot Tables", "Data cleaning, charts & dashboards", "MIS reporting & Power Query", "VBA fundamentals"],
    outcome: "Turn a messy spreadsheet into a structured report a business can act on.",
    tools: "Excel · Power Query · VBA",
  },
  {
    icon: BarChart3,
    tag: "6–7 Weeks",
    title: "Power BI, Tableau & Data Visualization",
    subtitle: "Turn raw numbers into dashboards people can understand",
    points: ["Power BI & Tableau", "DAX and data modeling", "Interactive dashboards & KPIs", "Data storytelling"],
    outcome: "Build a dashboard that surfaces trends, gaps and opportunities at a glance.",
    tools: "Power BI · Tableau · DAX",
  },
  {
    icon: Database,
    tag: "5–6 Weeks",
    title: "SQL & Python for Data Analytics",
    subtitle: "Go beyond spreadsheets and work with real data",
    points: ["SQL: queries, joins, aggregations", "Python fundamentals, Pandas, NumPy", "Data cleaning & EDA", "Data visualization"],
    outcome: "Query a database, analyse it in Python, and turn findings into business insight.",
    tools: "SQL · Python · Pandas · NumPy",
  },
];

const projects = [
  "COVID-19 Sales Trend Analysis",
  "E-commerce Customer Segmentation",
  "Financial Dashboard for Banks",
  "Retail Inventory Optimization",
];

const phases = [
  { phase: "Phase 1", title: "Build Your Foundation", days: "8 days · ~2 hrs/day", body: "Excel + data concepts — the fundamentals that make everything else easier." },
  { phase: "Phase 2", title: "Turn Data Into Visual Insights", days: "24 days · ~3 hrs/day", body: "Move from spreadsheets into modern BI — Power BI + Tableau." },
  { phase: "Phase 3", title: "Add SQL + Python", days: "20 days · ~3 hrs/day", body: "Work with data at a deeper level — Python, SQL, analysis." },
  { phase: "Phase 4", title: "Build Your Capstone", days: "30 days · ~2 hrs/day", body: "Everything comes together in one portfolio-ready deliverable." },
];

const differentiators = [
  { title: "Personal Mentorship", body: "Direct access to your trainer — ask questions, get feedback, work through problems 1-on-1. You're not just a name on a screen." },
  { title: "Small Batches", body: "Max 15 students per batch, so your mentor has time to understand your strengths and where you're struggling." },
  { title: "AI-Integrated Curriculum", body: "Learn to work with ChatGPT, Claude and GitHub Copilot inside real tasks — not as a separate add-on topic." },
  { title: "Placement Assistance", body: "Resume building, mock interviews, LinkedIn optimisation, and direct introductions to 1000+ hiring partners." },
  { title: "Guaranteed ROI", body: "98% job placement within 3 months. If you don't get hired within 3 months, 50% of your fees are refunded.*" },
];


const modes = [
  { icon: MapPin, title: "Offline", body: "Live training in Gurgaon with direct mentor interaction and hands-on practice.", points: ["Sector-14 Gurgaon Campus", "Morning, Evening & Weekend Batches", "Live Practical Training"], best: "Students & professionals who prefer classroom learning." },
  { icon: Monitor, title: "Online Live", body: "Live classes online with real-time interaction with your trainer.", points: ["Live Instructor-Led Classes", "Weekday & Weekend Batches", "Class Recordings Available"], best: "Working professionals and students who need flexibility." },
  { icon: Shuffle, title: "Hybrid", body: "Combine the convenience of online learning with in-person training in Gurgaon.", points: ["Switch Between Online & Offline", "Direct Mentor Access", "No Compromise on Content"], best: "Professionals and career changers who need maximum flexibility." },
];

const comparison = [
  { row: "Batch Size", us: "Max 15", a: "200+", b: "50", c: "Unlimited" },
  { row: "Placement", us: "100%*", a: "Job Board", b: "Referrals", c: "Self-search" },
  { row: "Mentoring", us: "Personal 1-on-1", a: "Group Chat", b: "TA Support", c: "Forums" },
  { row: "Cost", us: "₹28K–40K", a: "₹50K–80K", b: "₹45K", c: "₹15K–25K" },
];

const faqs = [
  { q: "Do I need prior knowledge to join the course?", a: "No. You can start from the basics — we begin with Excel fundamentals in Week 1. Already comfortable with Excel? You can start from Phase 2 and skip the fundamentals." },
  { q: "Which is better for me: Data Analytics or Full Stack Development?", a: "Data Analytics suits you if you enjoy working with data and numbers, finding trends, and creating dashboards. Full Stack is better if you enjoy building websites/apps, coding, and backend problem-solving." },
  { q: "How practical are the training sessions?", a: "100% hands-on. Every major concept is backed by practical work — you'll build the dashboard or write the code yourself, with 1-on-1 mentor feedback on every lab." },
  { q: "What jobs can I get after completing the course?", a: "Roles like Data Analyst, Business Analyst, and BI Developer — our students have gone on to companies including KPMG, Adobe, and Streams Solutions Pvt. Ltd.\n\nSalary range: ₹18–45 LPA depending on background and experience." },
  { q: "Is placement guaranteed?", a: "98% of recent graduates got placed within 3 months. Support includes resume review, mock interviews across 3 rounds, LinkedIn optimisation, introductions to 1000+ hiring partners, and a 6-week internship. If you're not hired within 3 months of completing the course, 50% of your fees are refunded, subject to the placement guarantee terms." },
  { q: "What's included in the course fee?", a: "All course materials & recordings, 10+ industry-standard projects, a 6-week paid internship, personalised career guidance, 3 mock interview rounds, placement assistance, lifetime access to recordings, and alumni community access.\n\nNot included: optional certifications (extra cost), and your own laptop." },
  { q: "Can I pay the course fee in installments?", a: "Yes — full payment (5% bonus + free advanced module), monthly EMI (no interest, no hidden charges), or 50% upfront + 50% after 1 month. All options give the same course access." },
  { q: "How much time should I dedicate to the course?", a: "2–3 hours/day, roughly 15–20 hours/week — mentor-led classes, project work and self-study combined. Designed to be manageable alongside a job." },
  { q: "How long is the course?", a: "6 months total: Foundations (4 weeks), Visualization (6 weeks), Analytics (6 weeks), Capstone (10 weeks). New batches roll every 2 weeks." },
];

export default async function DataAnalyticsAdsPage() {
  // Real, DB-backed testimonials only — company-placed ones (manual entries
  // with companyPlaced/designation set) surface first since they're the
  // strongest social proof, then Google reviews fill the rest.
  const allTestimonials = await getTestimonials();
  const seenNames = new Set<string>();
  const stories = [...allTestimonials]
    .sort((a, b) => (a.companyPlaced ? 0 : 1) - (b.companyPlaced ? 0 : 1))
    .filter((t) => {
      // Same student can appear twice (a manual entry with company info
      // *and* their own Google review) — the sort above puts the
      // richer, company-attributed record first, so keep that one.
      const key = t.studentName.trim().toLowerCase();
      if (seenNames.has(key)) return false;
      seenNames.add(key);
      return true;
    })
    .slice(0, 6)
    .map((t) => ({
      name: t.studentName,
      outcome: t.companyPlaced ? `${t.designation ? `${t.designation} @ ` : ""}${t.companyPlaced}` : t.courseName,
      quote: t.testimonialText,
    }));

  return (
    <main>
      {/* Hero */}
      <section className="gradient-hero text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute top-10 right-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="container-custom relative grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <span className="inline-flex px-3 py-1 rounded-full glass text-xs font-medium mb-4">
              Sector-14, Gurugram Campus &amp; Online
            </span>
            <h1 className="heading-hero mb-4">Master Data Analytics in 6 Months</h1>
            <p className="text-white/70 text-lg mb-6 leading-relaxed">
              Go from beginner to job-ready with hands-on training in Excel, SQL, Power BI, Tableau and Python.
              Learn at our Gurgaon campus or join live online classes.
            </p>

            <ul className="space-y-2.5 mb-6">
              {["Personal mentorship. Real projects.", "Placement assistance.", "Learn from industry experts in Gurgaon or online."].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-white/85 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {t}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70 mb-6">
              <span>✓ 100+ Students*</span>
              <span>✓ 4.8★ Rating*</span>
              <span>✓ 10+ Projects*</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#demo-form"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl gradient-accent text-white font-bold shadow-lg hover:shadow-glow-accent transition-shadow"
              >
                Book My Free Demo <ArrowRight className="w-4 h-4" />
              </a>
              <CurriculumDownload />
              <a
                href={`tel:${CONTACT.phone1}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass text-white font-semibold hover:bg-white/15 transition-colors"
              >
                <Phone className="w-4 h-4" /> {CONTACT.phone1}
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-1.5 mt-6 text-xs text-white/60">
              <span className="inline-flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-accent" /> Next batch: 15 Aug 2026
              </span>
              <span>Only 12 seats remaining</span>
              <span>Free 1-on-1 career counseling included</span>
            </div>
          </div>

          <HeroDemoForm />
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-8 border-b border-border bg-white">
        <div className="container-custom grid grid-cols-2 sm:grid-cols-5 gap-6 text-center">
          {trustStats.map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-extrabold text-primary">{s.value}</p>
              <p className="text-xs text-text-secondary mt-1 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why you need this course */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <h2 className="heading-section text-text-primary mb-3">Why You Need This Course</h2>
          <p className="text-primary font-bold text-lg mb-4">
            Data Analytics Skills = ₹18–45 LPA Salary Range in India
          </p>
          <p className="text-text-secondary leading-relaxed mb-2">
            Every business generates data — sales, customers, marketing, finance, operations, websites, apps. But
            raw data doesn&apos;t create value on its own. Businesses need people who can turn that data into
            insights, dashboards and decisions.
          </p>
          <p className="text-text-secondary leading-relaxed mb-8">That&apos;s why at WebiGeeks, you&apos;ll focus on:</p>

          <div className="grid sm:grid-cols-2 gap-5">
            {whyChecklist.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-text-primary text-sm mb-1">{item.title}</p>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum modules */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h2 className="heading-section text-text-primary text-center mb-2">
            From Excel Basics to Job-Ready Data Analytics Skills
          </h2>
          <p className="text-text-secondary text-center mb-10">What you&apos;ll master, module by module</p>

          <div className="space-y-5">
            {modules.map((m) => (
              <div key={m.title} className="bg-white rounded-xl border border-border p-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                    <m.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-text-primary">{m.title}</h3>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary-50 text-primary font-semibold">
                        {m.tag}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary italic mb-3">{m.subtitle}</p>
                    <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5 mb-3">
                      {m.points.map((p) => (
                        <li key={p} className="text-sm text-text-secondary flex items-start gap-2">
                          <span className="text-primary mt-1">•</span> {p}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-text-primary bg-primary-50/60 rounded-lg px-3 py-2 mb-2">
                      <span className="font-semibold">What you&apos;ll be able to do:</span> {m.outcome}
                    </p>
                    <p className="text-xs text-text-muted">Tools: {m.tools}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-xl bg-white border border-border">
            <p className="font-bold text-text-primary mb-3">You&apos;ll build 10+ practical projects, including:</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {projects.map((p) => (
                <p key={p} className="text-sm text-text-secondary flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {p}
                </p>
              ))}
            </div>
            <p className="text-xs text-text-muted mt-2">...and 6 more industry-scenario projects.</p>
          </div>
        </div>
      </section>

      {/* Learning journey */}
      <section className="section-padding">
        <div className="container-custom max-w-5xl">
          <h2 className="heading-section text-text-primary text-center mb-2">Your Learning Journey</h2>
          <p className="text-text-secondary text-center mb-10">A clear roadmap from beginner to portfolio-ready</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {phases.map((p) => (
              <div key={p.phase} className="bg-white rounded-xl border border-border p-5">
                <p className="text-xs font-bold text-primary mb-1">{p.phase}</p>
                <h3 className="font-bold text-text-primary mb-1">{p.title}</h3>
                <p className="text-xs text-text-muted mb-3">{p.days}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why WebiGeeks is different */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h2 className="heading-section text-text-primary text-center mb-2">Why WebiGeeks Is Different</h2>
          <p className="text-text-secondary text-center mb-10 max-w-2xl mx-auto">
            Personal mentorship, practical experience, modern tools and dedicated career support.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {differentiators.map((d, i) => (
              <div key={d.title} className={`bg-white rounded-xl border border-border p-5 ${i === 4 ? "sm:col-span-2" : ""}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-text-primary text-sm">{d.title}</h3>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success stories */}
      <section className="section-padding">
        <div className="container-custom max-w-5xl">
          <h2 className="heading-section text-text-primary text-center mb-2">Student Success Stories</h2>
          <p className="text-text-secondary text-center mb-10">Real students. Real career transformations.</p>

          <div className="grid sm:grid-cols-3 gap-5">
            {stories.map((s) => (
              <div key={s.name} className="bg-white rounded-xl border border-border p-5">
                <p className="font-bold text-text-primary text-sm">{s.name}</p>
                <p className="text-xs font-semibold text-primary mb-3">{s.outcome}</p>
                <p className="text-sm text-text-secondary leading-relaxed italic">&ldquo;{s.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning modes */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-5xl">
          <h2 className="heading-section text-text-primary text-center mb-2">Learning Modes</h2>
          <p className="text-text-secondary text-center mb-10">Learn your way, without putting your career on hold.</p>

          <div className="grid sm:grid-cols-3 gap-5">
            {modes.map((m) => (
              <div key={m.title} className="bg-white rounded-xl border border-border p-6">
                <m.icon className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-bold text-text-primary mb-1">{m.title}</h3>
                <p className="text-sm text-text-secondary mb-3">{m.body}</p>
                <ul className="space-y-1.5 mb-4">
                  {m.points.map((p) => (
                    <li key={p} className="text-xs text-text-secondary flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" /> {p}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-text-muted">
                  <span className="font-semibold text-text-secondary">Best for:</span> {m.best}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <h2 className="heading-section text-text-primary text-center mb-10">Course Fees &amp; Payment Options</h2>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="bg-white rounded-xl border border-border p-6">
              <p className="text-xs font-semibold text-text-muted mb-1">STANDARD BATCH</p>
              <p className="text-3xl font-extrabold text-text-primary mb-1">₹40,000</p>
              <p className="text-xs text-text-muted mb-4">Complete 6-month program · 282 hours</p>
              <ul className="space-y-2 mb-4">
                {["Complete Data Analytics Curriculum", "10+ Industry-Relevant Projects", "Internship Included", "Placement Assistance", "Course Certificate"].map((f) => (
                  <li key={f} className="text-sm text-text-secondary flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-text-secondary">EMI: ₹6,666/month × 6 months</p>
            </div>

            <div className="bg-primary-50 rounded-xl border-2 border-primary p-6 relative">
              <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-accent text-white text-[11px] font-bold flex items-center gap-1">
                <Flame className="w-3 h-3" /> EARLY BIRD
              </span>
              <p className="text-xs font-semibold text-primary mb-1 mt-1">SAVE ₹12,000</p>
              <p className="text-3xl font-extrabold text-text-primary mb-1">₹28,000</p>
              <p className="text-xs text-text-muted mb-4">Offer ends August 31</p>
              <ul className="space-y-2 mb-4">
                {["All Course Modules", "10+ Practical Projects", "Internship", "Placement Assistance", "Course Certificate"].map((f) => (
                  <li key={f} className="text-sm text-text-secondary flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-text-secondary">EMI: ₹4,666/month × 6 months</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 font-semibold text-text-secondary"></th>
                  <th className="text-left px-4 py-3 font-semibold text-primary">WebiGeeks</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-secondary">UpGrad</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-secondary">Coding Ninjas</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-secondary">Coursera</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.row} className="border-t border-border">
                    <td className="px-4 py-3 font-semibold text-text-primary">{row.row}</td>
                    <td className="px-4 py-3 text-primary font-semibold bg-primary-50/50">{row.us}</td>
                    <td className="px-4 py-3 text-text-secondary">{row.a}</td>
                    <td className="px-4 py-3 text-text-secondary">{row.b}</td>
                    <td className="px-4 py-3 text-text-secondary">{row.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <h2 className="heading-section text-text-primary text-center mb-10">Frequently Asked Questions</h2>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 gradient-hero text-white text-center relative overflow-hidden">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="container-custom relative max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Ready to Take the Next Step in Your Data Analytics Career?
          </h2>
          <p className="text-white/70 mb-2">🔥 Get ₹12,000 off on the Early Bird offer — valid till August 31</p>
          <p className="text-white/60 text-sm mb-8">Next batch: 15 August 2026 · Only 12 seats available</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#demo-form"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl gradient-accent text-white font-bold shadow-lg hover:shadow-glow-accent transition-shadow"
            >
              Book My Free Demo <ArrowRight className="w-4 h-4" />
            </a>
            <CurriculumDownload />
          </div>
          <p className="text-white/50 text-xs mt-6">30-minute career counseling included with every demo.</p>
        </div>
      </section>

      {/* Minimal footer — contact only, no site nav, so there's nowhere for a paid click to wander off to.
          Extra bottom padding keeps the disclaimer text clear of the sticky CTA bar. */}
      <footer className="py-8 pb-24 bg-black text-white/60 text-center text-sm">
        <p className="mb-1">
          <MapPin className="w-3.5 h-3.5 inline mr-1.5" />
          {CONTACT.address}
        </p>
        <p>
          {CONTACT.phone1} · {CONTACT.phone2} · {CONTACT.email}
        </p>
        <p className="text-xs text-white/30 mt-3">*Terms and conditions apply. See counselor for details.</p>
      </footer>

      <StickyCta />
    </main>
  );
}
