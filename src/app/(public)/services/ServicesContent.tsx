"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { serviceDetails } from "./serviceDetails";

export default function ServicesContent() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-ink">
        <div className="container-custom pt-16 pb-16 md:pt-20 md:pb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-agency-accent" />
            <span className="font-mono-agency text-xs text-white/50 tracking-[0.15em] uppercase">
              WGD / 002 — What we do
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-3xl leading-[1.05]">
            Services built around real business outcomes.
          </h1>
        </div>
      </section>

      {/* Services panels */}
      <section className="bg-ink">
        <div className="flex flex-col gap-4 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto pb-4">
          {serviceDetails.map((service) => (
            <motion.div
              key={service.slug}
              id={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              // scroll-mt so the sticky header (h-20/h-24) doesn't cover the
              // panel's top when landing here via #slug from the footer/homepage
              className="scroll-mt-28 bg-ink-soft rounded-[32px] md:rounded-[48px] px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20"
            >
              <span className="text-agency-accent-text font-display font-semibold text-sm">
                {service.number}
              </span>

              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mt-6 mb-6 max-w-2xl leading-[1.05]">
                {service.name}
              </h2>

              <p className="text-lg text-white/60 max-w-xl mb-10 leading-relaxed">
                {service.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                <div>
                  <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
                    What&apos;s included
                  </h3>
                  <ul className="space-y-3">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-white/50">
                        <span className="w-1 h-1 rounded-full bg-agency-accent mt-2.5 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-1.5 border border-white/15 rounded-full text-sm text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href={`/contact?source=services_page&projectType=${service.slug}`}
                className="group inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white hover:bg-white hover:text-ink rounded-full font-semibold text-white transition-colors duration-300"
              >
                Discuss this service
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink">
        <div className="container-custom py-24 md:py-32 text-center">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Ready to start your project?
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
            Let&apos;s discuss how we can help bring your vision to life.
          </p>
          <Link
            href="/contact?source=services_page"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-ink font-semibold rounded-full hover:bg-agency-accent hover:text-white transition-colors duration-300"
          >
            Start a project
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
}
