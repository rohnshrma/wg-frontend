"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const values = [
  {
    title: "Quality First",
    description:
      "We never compromise on quality. Every line of code, every design decision is made with excellence in mind.",
  },
  {
    title: "Business-Driven",
    description: "We think like your business partners, not just vendors. Your success is our success.",
  },
  {
    title: "Transparent",
    description:
      "Clear communication, honest timelines, and genuine partnership. No surprises, no hidden agendas.",
  },
  {
    title: "Continuous Learning",
    description: "Technology evolves constantly. We stay ahead through continuous learning and experimentation.",
  },
  {
    title: "User-Centric",
    description:
      "Every solution is built with real users in mind. Usability and delight matter as much as functionality.",
  },
  {
    title: "Ownership",
    description: "We take ownership of our work. Your project's success reflects directly on us.",
  },
];

const stackGroups = [
  { category: "Frontend", technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", technologies: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Redis"] },
  { category: "AI & Tools", technologies: ["Python", "LLMs", "AWS", "Docker", "Automation"] },
];

const stats = [
  { label: "Projects Completed", value: "50+" },
  { label: "Satisfied Clients", value: "40+" },
  { label: "Years of Excellence", value: "6+" },
  { label: "Team Members", value: "15+" },
];

export default function AboutContent() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-canvas">
        <div className="container-custom pt-16 pb-16 md:pt-20 md:pb-24">
          <motion.div initial="hidden" animate="show" variants={container}>
            <motion.div variants={item} className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-agency-accent" />
              <span className="font-mono-agency text-xs text-agency-muted tracking-[0.15em] uppercase">
                WGD / 004 — About us
              </span>
            </motion.div>
            <motion.h1
              variants={item}
              className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink max-w-3xl leading-[1.05] mb-8"
            >
              A team of senior engineers, designers, and strategists.
            </motion.h1>
            <motion.p variants={item} className="text-lg text-agency-muted max-w-xl leading-relaxed">
              Building premium digital solutions for ambitious businesses worldwide.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story panel */}
      <section className="bg-canvas">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto pb-4">
          <div className="bg-white rounded-[32px] md:rounded-[48px] px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20">
            <span className="text-agency-accent font-display font-semibold text-sm">Our story</span>
            <div className="mt-6 space-y-6 text-lg text-agency-muted leading-relaxed max-w-2xl">
              <p>
                WebiGeeks Digital was founded with a simple mission: to prove that
                great digital products don&apos;t require choosing between quality and
                efficiency. Over the past six years, we&apos;ve built 50+ projects for
                40+ satisfied clients across the globe.
              </p>
              <p>
                We started as a team of passionate developers and designers frustrated
                with the status quo. We saw businesses choosing between expensive
                agencies that lacked technical depth, or cheap providers that delivered
                mediocre results. We decided to build something different.
              </p>
              <p>
                Today, we&apos;re a fully remote team of senior engineers, designers, and
                strategists based in India but serving international clients. We combine
                deep technical expertise with business acumen to deliver solutions that
                don&apos;t just work — they drive real business outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-canvas">
        <div className="container-custom py-16 md:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="pt-6 border-t border-ink/10">
                <div className="font-display text-4xl md:text-5xl font-bold text-ink mb-2">{stat.value}</div>
                <div className="text-agency-muted text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-canvas">
        <div className="container-custom pb-16 md:pb-24">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-ink mb-12 md:mb-16">
            Our values.
          </h2>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={container}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8"
          >
            {values.map((value) => (
              <motion.div key={value.title} variants={item} className="py-8 border-t border-ink/10">
                <h3 className="font-display text-xl font-semibold text-ink mb-2">{value.title}</h3>
                <p className="text-agency-muted leading-relaxed text-sm">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Who we are — dark */}
      <section className="bg-ink">
        <div className="container-custom py-24 md:py-32">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-8 max-w-2xl">
            Who we are.
          </h2>
          <div className="space-y-6 text-lg text-white/60 leading-relaxed max-w-2xl">
            <p>
              Our team consists of senior engineers with expertise in full-stack
              development, product architecture, AI integration, and strategic design.
              Many have worked at leading tech companies and understand what it takes
              to build products that scale.
            </p>
            <p>
              We&apos;re distributed across India but operate as a truly global team,
              collaborating with clients in the US, UK, Europe, Australia, and the
              Middle East. Time zones are not a limitation — they&apos;re managed through
              structured processes and asynchronous communication.
            </p>
            <p>
              We maintain a small, focused team to ensure quality and direct
              communication. You won&apos;t be handed off to junior developers — you&apos;ll work
              with the people who built your project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/10">
            {stackGroups.map((stack) => (
              <div key={stack.category}>
                <h3 className="font-display font-semibold text-white mb-4">{stack.category}</h3>
                <ul className="space-y-3">
                  {stack.technologies.map((tech) => (
                    <li key={tech} className="text-white/60 text-sm">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-canvas">
        <div className="container-custom py-24 md:py-32 text-center">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ink mb-6">
            Ready to partner with us?
          </h2>
          <p className="text-lg text-agency-muted mb-10 max-w-xl mx-auto leading-relaxed">
            Let&apos;s discuss how we can help transform your vision into reality.
          </p>
          <Link
            href="/contact"
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
