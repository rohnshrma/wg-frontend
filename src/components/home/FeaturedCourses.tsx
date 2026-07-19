"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Clock,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const courses = [
  {
    title: "Data Science",
    slug: "data-science",
    duration: "4 Months",
    description: "Master Python, Machine Learning, Deep Learning, NLP, and deploy AI models.",
    color: "from-violet-500 to-purple-600",
    tags: ["Python", "ML", "AI"],
  },
  {
    title: "Data Analytics",
    slug: "data-analytics",
    duration: "3 Months",
    description: "Learn SQL, Power BI, Excel, Tableau, and become a data-driven decision maker.",
    color: "from-sky-500 to-blue-600",
    tags: ["SQL", "Power BI", "Excel"],
  },
  {
    title: "Artificial Intelligence",
    slug: "artificial-intelligence",
    duration: "5 Months",
    description: "Deep dive into Neural Networks, Computer Vision, NLP, and GenAI applications.",
    color: "from-emerald-500 to-teal-600",
    tags: ["Deep Learning", "NLP", "GenAI"],
  },
  {
    title: "MERN Stack",
    slug: "mern-stack-development",
    duration: "4 Months",
    description: "Build full-stack web apps with MongoDB, Express, React, and Node.js.",
    color: "from-amber-500 to-orange-600",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Python Programming",
    slug: "python-programming",
    duration: "2 Months",
    description: "From basics to advanced — OOP, file handling, APIs, and automation scripts.",
    color: "from-blue-500 to-indigo-600",
    tags: ["Python", "OOP", "APIs"],
  },
  {
    title: "Power BI",
    slug: "power-bi",
    duration: "2 Months",
    description: "Create stunning dashboards and reports for business intelligence.",
    color: "from-yellow-500 to-amber-600",
    tags: ["DAX", "Dashboards", "ETL"],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function FeaturedCourses() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2" />

      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-light text-accent text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Industry-Ready Courses
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">
            Our <span className="gradient-text">Featured Courses</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            AI-integrated curriculum designed with industry experts. Each course
            includes real-world projects and career support.
          </p>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {courses.map((course) => (
            <motion.div
              key={course.slug}
              variants={cardVariants}
              className="group relative bg-white rounded-xl border border-border overflow-hidden card-hover"
            >
              {/* Top gradient bar */}
              <div
                className={`h-1.5 bg-gradient-to-r ${course.color}`}
              />

              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-primary-50 text-primary text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>

                {/* Duration */}
                <div className="flex items-center gap-1.5 text-sm text-text-muted mb-3">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </div>

                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed mb-5">
                  {course.description}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-primary/20 text-primary text-sm font-semibold hover:bg-primary-50 transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    View Details
                  </Link>
                  <Link
                    href="/contact"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg gradient-primary text-white text-sm font-semibold shadow-sm hover:shadow-glow transition-shadow"
                  >
                    Book Demo
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/courses"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300"
          >
            View All Courses
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
