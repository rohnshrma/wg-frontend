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
    gradient: "from-agency-accent to-blue-800",
  },
  {
    id: 2,
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
    gradient: "from-indigo-700 to-agency-accent",
  },
  {
    id: 3,
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
    gradient: "from-blue-900 to-indigo-800",
  },
  {
    id: 4,
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
    gradient: "from-blue-700 to-indigo-900",
  },
  {
    id: 5,
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
    gradient: "from-indigo-800 to-blue-900",
  },
  {
    id: 6,
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
    gradient: "from-agency-accent to-indigo-900",
  },
];

export default function WorkContent() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-canvas">
        <div className="container-custom pt-16 pb-16 md:pt-20 md:pb-24">
          <p className="text-sm text-agency-muted uppercase tracking-widest mb-6">Case studies</p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink max-w-3xl leading-[1.05]">
            Projects built for ambitious businesses worldwide.
          </h1>
        </div>
      </section>

      {/* Work gallery — dark */}
      <section className="bg-ink">
        <div className="container-custom py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="rounded-3xl overflow-hidden border border-white/10">
                  <div className="flex items-center justify-between px-6 py-5">
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                        {project.category}
                      </p>
                      <span className="text-white font-semibold text-lg">{project.title}</span>
                    </div>
                  </div>

                  <div className={`bg-gradient-to-br ${project.gradient} p-6`}>
                    <p className="text-white/80 leading-relaxed mb-6">{project.description}</p>

                    <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-white/15">
                      {project.metrics.map((metric) => (
                        <div key={metric.label}>
                          <div className="text-lg md:text-xl font-bold text-white">
                            {metric.value}
                          </div>
                          <div className="text-[11px] text-white/60 leading-tight">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-white/10 text-white/80 text-xs font-medium rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/contact?source=work_page&projectType=${categoryToProjectType[project.category] ?? "other"}`}
                      className="group/link inline-flex items-center gap-2 text-white font-semibold text-sm"
                    >
                      Learn more
                      <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-canvas">
        <div className="container-custom py-24 md:py-32 text-center">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ink mb-6">
            Build something remarkable together.
          </h2>
          <p className="text-lg text-agency-muted mb-10 max-w-xl mx-auto leading-relaxed">
            These are just a few examples. Let&apos;s discuss how we can help bring your vision to life.
          </p>
          <Link
            href="/contact?source=work_page"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-ink hover:bg-agency-accent text-white font-semibold rounded-full transition-colors duration-300"
          >
            Start a project
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
}
