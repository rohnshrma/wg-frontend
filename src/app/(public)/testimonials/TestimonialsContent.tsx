"use client";

import { motion } from "framer-motion";
import { Star, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Testimonial } from "@/types/testimonial";
import GoogleLogo from "@/components/shared/GoogleLogo";

export default function TestimonialsContent({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <main>
      {/* Hero */}
      <section className="bg-ink">
        <div className="container-custom pt-16 pb-16 md:pt-20 md:pb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-agency-accent" />
              <span className="font-mono-agency text-xs text-white/50 tracking-[0.15em] uppercase">
                WGD / 007 — Testimonials
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-3xl leading-[1.05]">
              What people say about working with us.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="bg-ink">
        <div className="container-custom pb-24 md:pb-32">
          {testimonials.length === 0 ? (
            <div className="text-center py-20 border-t-2 border-white">
              <h3 className="font-display text-2xl font-bold text-white mb-2">Stories coming soon</h3>
              <p className="text-white/50">Check back soon — we&apos;re adding new stories.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 border-t-2 border-white pt-12">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 6) * 0.05 }}
                  className="bg-ink-soft rounded-2xl p-6"
                >
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-4 h-4 ${j < t.rating ? "text-agency-accent fill-agency-accent" : "text-white/10"}`} />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-sm text-white/70 leading-relaxed mb-5 italic">
                    &ldquo;{t.testimonialText}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      {t.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={t.photoUrl} alt={t.studentName} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-ink font-bold text-sm">
                          {t.studentName[0]}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-white text-sm">{t.studentName}</p>
                        {(t.designation || t.companyPlaced) && (
                          <p className="font-mono-agency text-xs text-white/50">
                            {t.designation}{t.designation && t.companyPlaced ? " at " : ""}{t.companyPlaced}
                          </p>
                        )}
                      </div>
                    </div>
                    {t.source === "google" && (
                      <div
                        className="w-8 h-8 rounded-full bg-white border border-white/10 flex items-center justify-center shrink-0"
                        title="Verified Google review"
                      >
                        <GoogleLogo className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink">
        <div className="container-custom py-24 md:py-32 text-center">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Be the next story.
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
            Let&apos;s discuss how we can help bring your vision to life.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-ink font-semibold rounded-full hover:bg-agency-accent hover:text-white transition-colors duration-300"
          >
            Start your project
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
}
