"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, Award } from "lucide-react";
import type { Testimonial } from "@/types/testimonial";
import GoogleLogo from "@/components/shared/GoogleLogo";

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialsCarousel({ testimonials }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Real testimonial content is admin-managed and may be empty on a fresh
  // deployment — unlike the old hardcoded array, this can legitimately be
  // zero, so the section just doesn't render rather than showing placeholders.
  if (testimonials.length === 0) return null;

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[currentIndex];

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />

      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-success-light text-success text-sm font-semibold mb-4">
            <Award className="w-4 h-4" />
            Success Stories
          </span>
          <h2 className="heading-section text-text-primary mb-4">
            What Our <span className="gradient-text">Students Say</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Real stories from real students who transformed their careers with
            WebiGeeks.
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current._id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 md:p-10 border border-primary/10 shadow-md relative"
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < current.rating
                        ? "text-accent-warm fill-accent-warm"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-lg text-text-primary leading-relaxed mb-8 italic">
                &ldquo;{current.testimonialText}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {current.studentName[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-text-primary truncate">{current.studentName}</p>
                    <p className="text-sm text-text-secondary truncate">
                      {current.designation || current.companyPlaced
                        ? `${current.designation ?? ""}${current.designation && current.companyPlaced ? " at " : ""}${current.companyPlaced ?? ""}`
                        : current.courseName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {current.salaryPackage && (
                    <div className="hidden sm:block text-right">
                      <p className="text-xs text-text-muted">Package</p>
                      <p className="text-lg font-bold text-success">{current.salaryPackage}</p>
                    </div>
                  )}
                  {current.source === "google" && (
                    <div
                      className="w-9 h-9 rounded-full bg-white shadow-sm border border-border flex items-center justify-center"
                      title="Verified Google review"
                    >
                      <GoogleLogo className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-border bg-white flex items-center justify-center hover:border-primary hover:text-primary transition-colors shadow-sm"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2.5 bg-border hover:bg-primary/30"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-full border border-border bg-white flex items-center justify-center hover:border-primary hover:text-primary transition-colors shadow-sm"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
