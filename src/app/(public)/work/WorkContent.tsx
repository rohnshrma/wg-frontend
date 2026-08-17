"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const categoryToProjectType: Record<string, string> = {
  "Web Development": "web-development",
  "Product Engineering": "product-engineering",
  "AI & Automation": "ai-automation",
  "UI/UX Design": "design",
};

const projects = [
  {
    id: 1,
    number: "01",
    title: "E-Commerce Platform Redesign",
    category: "Web Development",
    description:
      "Complete redesign and rebuild of a legacy e-commerce platform, resulting in 45% increase in conversion rates.",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    metrics: [
      { label: "Conversion Rate Increase", value: "45%" },
      { label: "Page Load Time Reduction", value: "62%" },
      { label: "Mobile Traffic Increase", value: "78%" },
    ],
  },
  {
    id: 2,
    number: "02",
    title: "SaaS Analytics Platform",
    category: "Product Engineering",
    description:
      "Built a comprehensive B2B analytics platform from scratch, handling 100K+ daily active users with real-time data processing.",
    technologies: ["Node.js", "MongoDB", "React", "AWS"],
    metrics: [
      { label: "Daily Active Users", value: "100K+" },
      { label: "Real-time Processing", value: "99.9%" },
      { label: "System Uptime", value: "99.99%" },
    ],
  },
  {
    id: 3,
    number: "03",
    title: "AI-Powered Customer Support",
    category: "AI & Automation",
    description:
      "Implemented an intelligent chatbot system that handles 70% of support queries automatically, reducing support costs by $200K annually.",
    technologies: ["Python", "OpenAI", "LLMs", "Integration APIs"],
    metrics: [
      { label: "Auto-Resolved Queries", value: "70%" },
      { label: "Annual Cost Savings", value: "$200K+" },
      { label: "Response Time", value: "<1s" },
    ],
  },
  {
    id: 4,
    number: "04",
    title: "Corporate Website & Branding",
    category: "UI/UX Design",
    description:
      "Designed and developed a premium corporate website with comprehensive design system, establishing a modern brand presence.",
    technologies: ["Figma", "Next.js", "Design Systems", "Accessibility"],
    metrics: [
      { label: "Design Components", value: "200+" },
      { label: "WCAG Score", value: "AAA" },
      { label: "Performance Score", value: "98/100" },
    ],
  },
  {
    id: 5,
    number: "05",
    title: "Marketplace MVP Development",
    category: "Product Engineering",
    description:
      "Rapid development of a peer-to-peer marketplace MVP, launched in 8 weeks with full payment integration and real-time messaging.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    metrics: [
      { label: "Time to Market", value: "8 weeks" },
      { label: "Initial Users", value: "5K+" },
      { label: "Transactions Processed", value: "$500K+" },
    ],
  },
  {
    id: 6,
    number: "06",
    title: "Workflow Automation System",
    category: "AI & Automation",
    description:
      "Designed and implemented enterprise workflow automation system that eliminated 40 hours/week of manual data processing.",
    technologies: ["Python", "Automation APIs", "Database Integration"],
    metrics: [
      { label: "Manual Work Saved/Week", value: "40 hrs" },
      { label: "Error Reduction", value: "95%" },
      { label: "ROI (1 Year)", value: "280%" },
    ],
  },
];

export default function WorkContent() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-ink">
        <div className="container-custom pt-16 pb-16 md:pt-20 md:pb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-agency-accent" />
            <span className="font-mono-agency text-xs text-white/50 tracking-[0.15em] uppercase">
              WGD / 003 — Case studies
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-3xl leading-[1.05]">
            Projects built for ambitious businesses worldwide.
          </h1>
          <p className="text-lg text-white/60 max-w-xl mt-8 leading-relaxed">
            A selection of what our web development agency has shipped for founders and teams
            who needed more than a template.
          </p>
        </div>
      </section>

      {/* Work gallery — dark */}
      <section className="relative bg-ink overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="container-custom relative py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="bg-ink p-8"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="font-mono-agency text-xs text-white/60 tracking-[0.1em]">
                    {project.number}
                  </span>
                  <span className="font-mono-agency text-white/60 text-xs uppercase tracking-widest">
                    {project.category}
                  </span>
                </div>

                <h2 className="font-display text-2xl font-semibold text-white mb-4">{project.title}</h2>
                <p className="text-white/60 leading-relaxed mb-6">{project.description}</p>

                <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-white/10">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="font-display text-lg md:text-xl font-bold text-agency-accent-text">
                        {metric.value}
                      </div>
                      <div className="text-[11px] text-white/50 leading-tight mt-1">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-6 font-mono-agency">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 border border-white/15 text-white/70 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/contact?source=work_page&projectType=${categoryToProjectType[project.category] ?? "other"}`}
                  className="group/link inline-flex items-center gap-2 text-white font-semibold text-sm"
                >
                  {/* Visible text stays "Learn more" for the compact card
                      layout, but the sr-only suffix is what actually makes
                      each of these 6 links distinct instead of identical
                      boilerplate — both to screen readers and to search
                      engines, which read the visible-DOM text, not aria-label,
                      when judging link-text quality. */}
                  Learn more<span className="sr-only"> about {project.title}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink">
        <div className="container-custom py-24 md:py-32 text-center">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Build something remarkable together.
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
            These are just a few examples. Let&apos;s discuss how we can help bring your vision to life.
          </p>
          <Link
            href="/contact?source=work_page"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-agency-accent text-ink hover:text-white font-semibold rounded-full transition-colors duration-300"
          >
            Start a project
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
}
