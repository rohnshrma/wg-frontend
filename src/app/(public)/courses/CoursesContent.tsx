"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Clock,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Monitor,
  Users,
  Sparkles,
  Search,
} from "lucide-react";
import { useState } from "react";
import { courseGradient } from "@/lib/courseColors";
import type { Course } from "@/types/course";
import Hero3DBackground from "@/components/three/Hero3DBackground";

const levels = ["All", "beginner", "intermediate", "advanced"] as const;
const levelLabels: Record<(typeof levels)[number], string> = {
  All: "All",
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export default function CoursesContent({ courses }: { courses: Course[] }) {
  const [search, setSearch] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<(typeof levels)[number]>("All");

  const filtered = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.technologies.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesLevel = selectedLevel === "All" || c.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-10 right-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <Hero3DBackground variant="compact" />
        <div className="container-custom relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              {courses.length}+ Industry-Ready Courses
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Explore Our{" "}
              <span className="bg-gradient-to-r from-accent to-accent-warm bg-clip-text text-transparent">
                Courses
              </span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              AI-integrated, 100% practical training designed to make you
              industry-ready.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-border sticky top-[72px] z-30">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search courses or technologies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {/* Level filters */}
            <div className="flex gap-2 flex-wrap">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedLevel === level
                      ? "bg-primary text-white shadow-sm"
                      : "bg-gray-100 text-text-secondary hover:bg-gray-200"
                  }`}
                >
                  {levelLabels[level]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text-primary mb-2">No Courses Found</h3>
              <p className="text-text-secondary">Try a different search or filter.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((course, i) => (
                <motion.div
                  key={course.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-white rounded-xl border border-border overflow-hidden card-hover"
                >
                  {/* Top bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${courseGradient(course.slug)}`} />

                  <div className="p-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {course.technologies.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-primary-50 text-primary text-xs font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                      {course.technologies.length > 3 && (
                        <span className="px-2 py-0.5 rounded-md bg-gray-100 text-text-muted text-xs">
                          +{course.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Monitor className="w-3.5 h-3.5" />
                        {course.mode}
                      </span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5" />
                        {course.level}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">
                      {course.shortDescription}
                    </p>

                    {/* Fee on enquiry + CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <p className="text-xs text-text-muted">Course Fee</p>
                        <p className="text-sm font-semibold text-text-primary">
                          On Enquiry
                        </p>
                      </div>
                      <Link
                        href={`/courses/${course.slug}`}
                        className="px-4 py-2.5 rounded-lg gradient-primary text-white text-sm font-semibold shadow-sm hover:shadow-glow transition-shadow flex items-center gap-1.5"
                      >
                        Details
                        <ArrowRight className="w-4 h-4" />
                      </Link>
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
          <Users className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-extrabold mb-3">
            Not Sure Which Course to Pick?
          </h2>
          <p className="text-white/60 text-lg mb-6 max-w-lg mx-auto">
            Book a free career counseling session and we&apos;ll help you choose the
            right path.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl gradient-accent text-white font-bold shadow-lg hover:shadow-glow-accent transition-shadow"
          >
            Book Free Counseling
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
