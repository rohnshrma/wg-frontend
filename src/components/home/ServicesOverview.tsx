"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Web Development",
    tags: ["Marketing sites", "Web applications", "E-commerce"],
    description:
      "Premium marketing websites, corporate sites, and custom web applications built for performance and conversions.",
    slug: "web-development",
  },
  {
    number: "02",
    title: "Product Engineering",
    tags: ["SaaS platforms", "MVPs", "APIs"],
    description:
      "Scalable SaaS platforms, MVPs, and sophisticated web applications engineered for growth.",
    slug: "product-engineering",
  },
  {
    number: "03",
    title: "AI & Automation",
    tags: ["AI integrations", "Workflow automation", "Agents"],
    description:
      "Intelligent automation, AI integrations, and systems that drive efficiency and unlock new possibilities.",
    slug: "ai-automation",
  },
  {
    number: "04",
    title: "UI/UX Design",
    tags: ["Product design", "Design systems", "Branding"],
    description:
      "Strategic design, user experience optimization, and design systems that drive engagement.",
    slug: "design",
  },
];

export default function ServicesOverview() {
  return (
    <section className="bg-ink">
      <div className="container-custom pb-10">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-agency-accent" />
          <span className="font-mono-agency text-xs text-white/50 tracking-[0.15em] uppercase">
            Capabilities / 01–04
          </span>
        </div>
      </div>

      <div className="container-custom">
        {services.map((service) => (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-6 md:gap-10 py-12 md:py-16 border-t-2 border-white first:border-t-2"
          >
            <div>
              <span className="font-mono-agency text-sm text-agency-accent tracking-[0.1em]">
                {service.number}
              </span>
            </div>

            <div>
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 max-w-2xl leading-[1.05]">
                {service.title}
              </h3>

              <div className="flex flex-wrap gap-2 mb-8">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono-agency px-3 py-1.5 border border-white/15 rounded-full text-xs text-white/70 tracking-[0.02em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-lg text-white/60 max-w-xl mb-10 leading-relaxed">
                {service.description}
              </p>

              <Link
                href={`/services#${service.slug}`}
                className="group inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white hover:bg-white hover:text-ink rounded-full font-semibold text-white transition-colors duration-300"
              >
                Find out more
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
        <div className="border-t-2 border-white" aria-hidden="true" />
      </div>
    </section>
  );
}
