"use client";

import { motion } from "framer-motion";

const reasons = [
  {
    title: "Senior-Level Engineering",
    description: "Experienced engineers who build scalable, maintainable, production-ready code.",
  },
  {
    title: "Performance-First Approach",
    description: "Every project is optimized for speed, conversions, and real user impact.",
  },
  {
    title: "Strategic Thinking",
    description: "We understand business objectives and translate them into digital solutions.",
  },
  {
    title: "International Experience",
    description: "Proven track record serving global clients across multiple industries.",
  },
  {
    title: "Security & Compliance",
    description: "Production-grade security practices and attention to data protection.",
  },
  {
    title: "Transparent Communication",
    description: "Clear milestones, regular updates, and collaborative project management.",
  },
];

export default function TrustSection() {
  return (
    <section className="bg-canvas">
      <div className="container-custom py-24 md:py-32">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-agency-accent" />
          <span className="font-mono-agency text-xs text-agency-muted tracking-[0.15em] uppercase">
            Why us
          </span>
        </div>
        <div className="mb-16 md:mb-20 max-w-2xl">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ink mb-6">
            Why WebiGeeks Digital.
          </h2>
          <p className="text-lg text-agency-muted leading-relaxed">
            We&apos;re not another agency. We&apos;re technology experts who understand business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 border-t-2 border-ink">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.05 }}
              className="py-8 border-b border-ink/10"
            >
              <h3 className="font-display text-xl font-semibold text-ink mb-2">
                {reason.title}
              </h3>
              <p className="text-agency-muted leading-relaxed text-sm">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
