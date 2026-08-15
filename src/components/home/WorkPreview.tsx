"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    number: "01",
    title: "E-Commerce Platform Redesign",
    category: "Web Development",
    metric: "45%",
    metricLabel: "Conversion lift",
  },
  {
    number: "02",
    title: "SaaS Analytics Platform",
    category: "Product Engineering",
    metric: "100K+",
    metricLabel: "Daily active users",
  },
  {
    number: "03",
    title: "AI-Powered Customer Support",
    category: "AI & Automation",
    metric: "70%",
    metricLabel: "Queries auto-resolved",
  },
];

export default function WorkPreview() {
  return (
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

      <div className="container-custom relative py-24 md:py-32">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-agency-accent" />
          <span className="font-mono-agency text-xs text-white/40 tracking-[0.15em] uppercase">
            Selected work / 01–03
          </span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 md:mb-20">
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white leading-none">
            Our Work
          </h2>
          <p className="text-white/50 max-w-sm">
            Dive into our projects and the decisions that shaped them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {projects.map((project) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="bg-ink"
            >
              <Link href="/work" className="group block h-full p-8 flex flex-col justify-between min-h-[280px]">
                <div className="flex items-start justify-between">
                  <span className="font-mono-agency text-xs text-white/40 tracking-[0.1em]">
                    {project.number}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-agency-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <div>
                  <p className="font-mono-agency text-white/40 text-xs uppercase tracking-widest mb-3">
                    {project.category}
                  </p>
                  <h3 className="font-display text-xl font-semibold text-white mb-6 leading-snug">
                    {project.title}
                  </h3>
                  <div className="pt-4 border-t border-white/10">
                    <p className="font-display text-3xl font-bold text-agency-accent">{project.metric}</p>
                    <p className="text-white/40 text-xs mt-1">{project.metricLabel}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 px-8 py-4 border border-white/20 hover:border-white text-white font-semibold rounded-full transition-colors duration-300"
          >
            View all projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
