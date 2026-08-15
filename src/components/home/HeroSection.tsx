"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const pillars = [
  {
    number: "01 —",
    title: "Technical Clarity",
    description: "Decisions that make your platform reliable, secure, and built to last.",
  },
  {
    number: "02 —",
    title: "Creative Craft",
    description: "Interfaces and products people actually enjoy using.",
  },
  {
    number: "03 —",
    title: "Commercial Momentum",
    description: "Systems engineered with your next stage of growth in mind.",
  },
];

export default function HeroSection() {
  return (
    <section className="bg-canvas">
      <div className="container-custom pt-16 pb-24 md:pt-20 md:pb-32">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl">
          <motion.p variants={item} className="text-sm sm:text-base text-agency-muted mb-8 max-w-xl">
            A digital product studio based in India, building for ambitious
            companies worldwide.
          </motion.p>
          <motion.h1
            variants={item}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-ink leading-[1.05]"
          >
            We build digital
            <br />
            products that win
            <br />
            <span className="text-agency-accent">real markets.</span>
          </motion.h1>
        </motion.div>
      </div>

      <div className="container-custom pb-24 md:pb-32">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          <motion.h2
            variants={item}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-agency-muted max-w-3xl mb-16 leading-tight"
          >
            Shaping how ambitious companies build, ship, and scale their
            digital products.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {pillars.map((pillar) => (
              <motion.div key={pillar.title} variants={item} className="pt-6 border-t border-ink/10">
                <span className="text-sm text-agency-muted">{pillar.number}</span>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-ink mt-4 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-agency-muted leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="container-custom pb-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-ink hover:bg-agency-accent text-white font-semibold rounded-full transition-colors duration-300"
          >
            Start your project
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <Link
            href="/work"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-ink/20 hover:border-ink text-ink font-semibold rounded-full transition-colors duration-300"
          >
            See our work
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
