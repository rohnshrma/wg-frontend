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
    <section className="bg-canvas">
      <div className="container-custom pb-4">
        <div className="flex items-baseline justify-between mb-8">
          <span className="text-sm text-agency-muted uppercase tracking-widest">Our Services</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        {services.map((service) => (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[32px] md:rounded-[48px] px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-agency-accent font-display font-semibold text-sm">{service.number}</span>
            </div>

            <h3 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ink mb-6 max-w-2xl leading-[1.05]">
              {service.title}
            </h3>

            <div className="flex flex-wrap gap-2 mb-8">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 border border-ink/15 rounded-full text-sm text-ink/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-lg text-agency-muted max-w-xl mb-10 leading-relaxed">
              {service.description}
            </p>

            <Link
              href={`/services/${service.slug}`}
              className="group inline-flex items-center gap-2 px-6 py-3 border border-ink/20 hover:border-ink hover:bg-ink hover:text-white rounded-full font-semibold text-ink transition-colors duration-300"
            >
              Find out more
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
