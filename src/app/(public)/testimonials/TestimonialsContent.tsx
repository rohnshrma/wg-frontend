"use client";

import { motion } from "framer-motion";
import { Star, Award, ArrowRight, GraduationCap } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
const Hero3DBackground = dynamic(() => import("@/components/three/Hero3DBackground"), { ssr: false });
import type { Testimonial } from "@/types/testimonial";

export default function TestimonialsContent({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-10 right-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <Hero3DBackground variant="compact" />
        <div className="container-custom relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium mb-6">
              <Award className="w-4 h-4 text-accent" />
              Success Stories
            </span>
            <h1 className="heading-hero mb-4">
              What Our <span className="bg-gradient-to-r from-accent to-accent-warm bg-clip-text text-transparent">Students Say</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Real stories from real students who transformed their careers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {testimonials.length === 0 ? (
            <div className="text-center py-20">
              <Award className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-30" />
              <h3 className="text-xl font-bold text-text-primary">Success Stories Coming Soon</h3>
              <p className="text-text-secondary">Check back shortly to read about our students&apos; journeys.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-xl border border-border p-6 card-hover"
                >
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-4 h-4 ${j < t.rating ? "text-accent-warm fill-accent-warm" : "text-gray-200"}`} />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-sm text-text-secondary leading-relaxed mb-5 italic">
                    &ldquo;{t.testimonialText}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-3">
                      {t.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={t.photoUrl} alt={t.studentName} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm">
                          {t.studentName[0]}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-text-primary text-sm">{t.studentName}</p>
                        {(t.designation || t.companyPlaced) && (
                          <p className="text-xs text-text-muted">
                            {t.designation}{t.designation && t.companyPlaced ? " at " : ""}{t.companyPlaced}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-text-muted">{t.courseName}</p>
                      {t.salaryPackage && <p className="text-sm font-bold text-success">{t.salaryPackage}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-primary text-white text-center">
        <div className="container-custom">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-extrabold mb-3">Be the Next Success Story</h2>
          <p className="text-white/60 text-lg mb-6 max-w-lg mx-auto">
            Join WebiGeeks and start your journey towards a rewarding tech career.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl gradient-accent text-white font-bold shadow-lg hover:shadow-glow-accent transition-shadow">
            Start Your Journey <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
