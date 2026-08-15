"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "We understand your business goals, users, and competitive landscape.",
  },
  {
    number: "02",
    title: "Strategize",
    description: "Define the product architecture, user experience, and technical strategy.",
  },
  {
    number: "03",
    title: "Design",
    description: "Create beautiful, functional interfaces with compelling user experiences.",
  },
  {
    number: "04",
    title: "Build",
    description: "Engineer robust, scalable solutions using modern technologies.",
  },
  {
    number: "05",
    title: "Refine",
    description: "Test, optimize, and polish every detail to perfection.",
  },
  {
    number: "06",
    title: "Launch",
    description: "Deploy with confidence and support you through growth.",
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-canvas">
      <div className="container-custom py-24 md:py-32">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-agency-accent" />
          <span className="font-mono-agency text-xs text-agency-muted tracking-[0.15em] uppercase">
            Process / 01–06
          </span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 md:mb-20">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ink max-w-2xl">
            Our brand-to-build framework.
          </h2>
          <p className="text-agency-muted max-w-sm">
            A proven methodology that delivers results, from discovery through launch.
          </p>
        </div>

        <div className="border-t-2 border-ink">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.05 }}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-10 py-8 border-b border-ink/10 group"
            >
              <span className="font-mono-agency text-agency-accent text-sm w-10 shrink-0 tracking-[0.1em]">
                {step.number}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ink sm:w-64 shrink-0">
                {step.title}
              </h3>
              <p className="text-agency-muted leading-relaxed sm:max-w-xl">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
