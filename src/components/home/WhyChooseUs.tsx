"use client";

import { motion } from "framer-motion";
import {
  Award,
  Code2,
  Brain,
  Briefcase,
  Building2,
  Monitor,
  Clock,
  Target,
} from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Personal Mentorship",
    description: "Direct access to your trainer for personalised feedback and career guidance — not a call centre.",
    color: "from-primary to-primary-dark",
  },
  {
    icon: Code2,
    title: "100% Practical Training",
    description: "Hands-on projects and real-world scenarios — no theory-only lectures.",
    color: "from-secondary to-secondary-dark",
  },
  {
    icon: Brain,
    title: "AI Integrated Curriculum",
    description: "AI tools are part of the coursework itself — not a bolted-on extra module.",
    color: "from-accent to-accent-warm",
  },
  {
    icon: Briefcase,
    title: "Industry Projects",
    description: "Work on live projects that build your portfolio and impress employers.",
    color: "from-success to-emerald-600",
  },
  {
    icon: Building2,
    title: "Internship Assistance",
    description: "Resume building, mock interviews, and direct introductions through our hiring network.",
    color: "from-violet-500 to-purple-700",
  },
  {
    icon: Monitor,
    title: "Online + Offline Classes",
    description: "Choose your preferred mode — attend from anywhere or visit our campus.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Clock,
    title: "Flexible Timings",
    description: "Morning, afternoon, and weekend batches to fit your schedule.",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: Target,
    title: "Career Guidance",
    description: "Resume building, mock interviews, and job-search strategy sessions.",
    color: "from-amber-500 to-orange-600",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Subtle background patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full blur-[60px]" />

      <div className="container-custom relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary text-sm font-semibold mb-4">
            <Award className="w-4 h-4" />
            Why Choose Us
          </span>
          <h2 className="heading-section text-text-primary mb-4">
            What Makes WebiGeeks{" "}
            <span className="gradient-text">Different?</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Here&apos;s what actually makes the difference for our students.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group relative p-6 rounded-xl border border-border bg-white hover:border-primary/20 card-hover cursor-default"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-shadow`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-base font-bold text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {feature.description}
              </p>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/[0.02] group-hover:to-secondary/[0.02] transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
