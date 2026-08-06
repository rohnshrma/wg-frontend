"use client";

import { motion } from "framer-motion";
import {
  Award,
  Target,
  Eye,
  Heart,
  Users,
  BookOpen,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import StatsCounter from "@/components/home/StatsCounter";
import dynamic from "next/dynamic";
const Hero3DBackground = dynamic(() => import("@/components/three/Hero3DBackground"), { ssr: false });

const values = [
  {
    icon: Target,
    title: "Practical Learning",
    description: "Every concept is taught with real-world projects and hands-on practice.",
    color: "from-primary to-primary-dark",
  },
  {
    icon: Heart,
    title: "Student First",
    description: "Flexible schedules, personalized attention, and career-focused curriculum.",
    color: "from-accent to-accent-warm",
  },
  {
    icon: Eye,
    title: "Industry Aligned",
    description: "Curriculum designed with industry experts and updated for current trends.",
    color: "from-secondary to-secondary-dark",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Small batch sizes ensure every student gets the attention they deserve.",
    color: "from-success to-emerald-600",
  },
];

const advantages = [
  "Hands-on mentorship from an experienced instructor",
  "100% practical, project-based learning",
  "AI tools integrated in every course",
  "Small batch sizes (max 15 students)",
  "Dedicated placement assistance team",
  "Flexible morning, afternoon, weekend batches",
  "Online + Offline hybrid mode available",
  "Resume building & mock interview sessions",
];

export default function AboutContent() {
  return (
    <>
      {/* Hero Banner */}
      <section className="gradient-hero text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 left-20 w-60 h-60 bg-secondary/15 rounded-full blur-[80px]" />
        </div>
        <Hero3DBackground variant="compact" />
        <div className="container-custom relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              About WebiGeeks
            </span>
            <h1 className="heading-hero mb-4">
              A Coding Institute Built Around
              <br />
              <span className="bg-gradient-to-r from-accent to-accent-warm bg-clip-text text-transparent">
                Practical Technology Education
              </span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Founded in 2023 in Sector-14, Gurugram — small batches, real
              projects, and AI-integrated courses built to get you hired, not
              just certified.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary text-sm font-semibold mb-4">
                <BookOpen className="w-4 h-4" />
                Our Story
              </span>
              <h2 className="heading-section text-text-primary mb-6">
                From a Small Classroom to a{" "}
                <span className="gradient-text">Real Placement Network</span>
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                WebiGeeks was founded in 2023 in Sector-14, Gurugram, with a simple
                mission: make technology education practical, accessible, and
                career-focused — small batches, real projects, and direct mentor
                access instead of a lecture hall of a hundred students.
              </p>
              <p className="text-text-secondary leading-relaxed mb-6">
                Since then, students have completed our courses, and our alumni
                are now part of teams at companies like KPMG, Extramarks, Ferns
                N Petals, Descriptive AI, Flick AI, and Smart Data Enterprises.
                Every course is built around real projects, so you leave with a
                portfolio, not just a certificate.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-semibold shadow-md hover:shadow-glow transition-shadow"
              >
                Join Us Today
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Advantages List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary-50 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-text-primary mb-6">
                The WebiGeeks Advantage
              </h3>
              <ul className="space-y-3">
                {advantages.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-text-secondary text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter />

      {/* Values */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-text-primary mb-4">
              Our <span className="gradient-text">Core Values</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              The principles that drive everything we do.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-xl border border-border bg-white card-hover"
              >
                <div
                  className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-4 shadow-md`}
                >
                  <v.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-text-primary mb-2">{v.title}</h3>
                <p className="text-sm text-text-secondary">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="container-custom relative">
          <Users className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="heading-section mb-4">
            Ready to Book a Free Demo?
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-lg mx-auto">
            Join the students who&apos;ve built real careers with WebiGeeks.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-xl gradient-accent text-white font-bold shadow-lg hover:shadow-glow-accent transition-shadow flex items-center gap-2"
            >
              Book Free Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/courses"
              className="px-8 py-3.5 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
