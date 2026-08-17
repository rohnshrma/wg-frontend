"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SystemGraphic from "@/components/graphics/SystemGraphic";

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
    number: "01",
    title: "Technical Clarity",
    description: "Decisions that make your platform reliable, secure, and built to last.",
  },
  {
    number: "02",
    title: "Creative Craft",
    description: "Interfaces and products people actually enjoy using.",
  },
  {
    number: "03",
    title: "Commercial Momentum",
    description: "Systems engineered with your next stage of growth in mind.",
  },
];

export default function HeroSection() {
  return (
    <section className="relative bg-ink overflow-hidden">
      {/* schematic background grid — pure CSS, no SVG needed for a repeating pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.5] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="container-custom relative pt-16 pb-10 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start">
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl">
            <motion.div variants={item} className="flex items-center gap-3 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-agency-accent animate-pulse" />
              <p className="font-mono-agency text-xs sm:text-sm text-white/50 tracking-[0.15em] uppercase">
                WGD / 001 — Digital Product Studio
              </p>
            </motion.div>
            <motion.h1
              variants={item}
              className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-white leading-[1.02]"
            >
              We build digital
              <br />
              products that win
              <br />
              <span className="text-agency-accent">real markets.</span>
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block w-[360px] shrink-0 -mt-4"
          >
            <SystemGraphic />
          </motion.div>
        </div>
      </div>

      <div className="container-custom relative pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-flex items-center gap-4 px-5 py-3 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/15 shadow-sm"
        >
          <span className="font-mono-agency text-[11px] text-white/40 tracking-[0.1em] uppercase">
            Status
          </span>
          <span className="w-px h-3.5 bg-white/15" />
          <span className="text-sm text-white font-medium">
            Remote-first, serving clients worldwide
          </span>
        </motion.div>
      </div>

      <div className="container-custom relative pb-24 md:pb-32">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          <motion.h2
            variants={item}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white/60 max-w-3xl mb-16 leading-tight"
          >
            WebiGeeks Digital is the web development agency ambitious
            companies call on to build, ship, and scale their digital
            products.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {pillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                variants={item}
                className="relative pt-6 border-t-2 border-white"
              >
                <span className="font-mono-agency text-xs text-agency-accent tracking-[0.1em]">
                  {pillar.number}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mt-4 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-white/60 leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="container-custom relative pb-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-agency-accent text-ink hover:text-white font-semibold rounded-full transition-colors duration-300"
          >
            Start your project
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <Link
            href="/work"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 hover:border-white text-white font-semibold rounded-full transition-colors duration-300"
          >
            See our work
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
