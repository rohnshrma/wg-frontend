"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform Redesign",
    category: "Web Development",
    metric: "45% conversion lift",
    gradient: "from-agency-accent to-blue-800",
  },
  {
    title: "SaaS Analytics Platform",
    category: "Product Engineering",
    metric: "100K+ daily active users",
    gradient: "from-indigo-700 to-agency-accent",
  },
  {
    title: "AI-Powered Customer Support",
    category: "AI & Automation",
    metric: "70% queries auto-resolved",
    gradient: "from-blue-900 to-indigo-800",
  },
];

export default function WorkPreview() {
  return (
    <section className="bg-ink">
      <div className="container-custom py-24 md:py-32">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 md:mb-20">
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white leading-none">
            Our Work
          </h2>
          <p className="text-white/50 max-w-sm">
            Dive into our projects and the decisions that shaped them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/work" className="group block">
                <div className="rounded-3xl overflow-hidden border border-white/10">
                  <div className="flex items-center justify-between px-6 py-5">
                    <span className="text-white font-semibold flex items-center gap-2">
                      <ArrowUpRight className="w-4 h-4 text-agency-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      {project.title}
                    </span>
                  </div>
                  <div
                    className={`h-56 bg-gradient-to-br ${project.gradient} flex items-end p-6`}
                  >
                    <div>
                      <p className="text-white/70 text-xs uppercase tracking-widest mb-1">
                        {project.category}
                      </p>
                      <p className="text-white font-semibold">{project.metric}</p>
                    </div>
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
