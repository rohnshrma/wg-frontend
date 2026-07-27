"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { API_BASE_URL } from "@/lib/apiBaseUrl";
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Send,
  User,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import Hero3DBackground from "@/components/three/Hero3DBackground";

const techBadges = [
  "Data Science",
  "AI / ML",
  "MERN Stack",
  "Python",
  "Power BI",
  "SQL",
  "Java",
  "Excel",
];

export default function HeroSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    courseInterested: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${API_BASE_URL}/leads`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, source: "hero_form" }),
        }
      );

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          courseInterested: "",
          message: "",
        });
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch {
      console.error("Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-72px)] gradient-hero overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/15 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* 3D neural network + floating shapes */}
      <Hero3DBackground variant="full" />

      <div className="container-custom relative z-10 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-white/90 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Your AI Skill Partner</span>
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.1] mb-6">
              Become{" "}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-accent to-accent-warm bg-clip-text text-transparent">
                  Industry Ready
                </span>
              </span>
              <br />
              With AI Integrated
              <br />
              Courses
            </h1>

            {/* Subheading */}
            <p className="text-lg text-white/60 mb-8 max-w-lg leading-relaxed">
              100% practical training with real-world projects, internship
              assistance, and dedicated career guidance.
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {techBadges.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="px-3 py-1.5 rounded-lg glass text-white/80 text-sm font-medium hover:bg-white/10 transition-colors cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group px-7 py-3.5 rounded-xl gradient-accent text-white font-bold text-base shadow-lg hover:shadow-glow-accent transition-all duration-300 flex items-center gap-2"
              >
                Book Free Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/courses"
                className="group px-7 py-3.5 rounded-xl glass text-white font-semibold text-base hover:bg-white/15 transition-all flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Explore Courses
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-white/10">
              {[
                { value: "500+", label: "Students Placed" },
                { value: "100+", label: "Batches Completed" },
                { value: "4.8", label: "Student Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/40">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side — Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            {/* Form card */}
            <div className="bg-white rounded-2xl shadow-2xl p-7 md:p-8 relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-32 h-32 gradient-primary opacity-5 rounded-bl-[80px]" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">
                      Get Free Career Counseling
                    </h3>
                    <p className="text-sm text-text-muted">
                      We&apos;ll call you back within 30 minutes
                    </p>
                  </div>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 mx-auto rounded-full bg-success-light flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-success" />
                    </div>
                    <h4 className="text-xl font-bold text-text-primary mb-2">
                      Thank You! 🎉
                    </h4>
                    <p className="text-text-secondary">
                      We&apos;ve received your inquiry. Our team will contact
                      you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-muted" />
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-muted" />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-muted" />
                      <input
                        type="email"
                        placeholder="Email Address"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>

                    {/* Course Selection */}
                    <select
                      required
                      value={formData.courseInterested}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          courseInterested: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select Course</option>
                      {siteConfig.courses.map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>

                    {/* Message */}
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4.5 h-4.5 text-text-muted" />
                      <textarea
                        placeholder="Your Message (Optional)"
                        rows={3}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl gradient-primary text-white font-bold text-base shadow-lg hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Inquiry
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-text-muted text-center">
                      🔒 Your information is secure and won&apos;t be shared
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
