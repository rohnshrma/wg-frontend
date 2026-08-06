"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/apiBaseUrl";
import {
  Clock,
  Monitor,
  GraduationCap,
  Users,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Phone,
  User,
  Mail,
  Send,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { courseGradient } from "@/lib/courseColors";
import dynamic from "next/dynamic";
import type { Course } from "@/types/course";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

const Hero3DBackground = dynamic(() => import("@/components/three/Hero3DBackground"), { ssr: false });

export default function CourseDetailContent({ course }: { course: Course }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });

  const gradient = courseGradient(course.slug);
  const quickStats = [
    { label: "Duration", value: course.duration },
    ...(course.curriculum.length > 0 ? [{ label: "Modules", value: `${course.curriculum.length}+` }] : []),
    ...(course.projects.length > 0 ? [{ label: "Projects", value: `${course.projects.length}+` }] : []),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch(`${API_BASE_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          courseInterested: course.title,
          source: "course_page",
        }),
      });
      setIsSubmitted(true);
    } catch {
      /* ignore */
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-14 md:py-20 relative overflow-hidden">
        <div className="absolute top-10 right-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <Hero3DBackground variant="compact" />
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Breadcrumbs
                  items={[
                    { label: "Courses", href: "/courses" },
                    { label: course.title, href: `/courses/${course.slug}` },
                  ]}
                />
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${gradient} text-xs font-bold capitalize`}>
                    {course.level}
                  </span>
                  <span className="px-3 py-1 rounded-full glass text-xs font-medium capitalize">
                    {course.mode}
                  </span>
                </div>
                <h1 className="heading-hero mb-4">
                  {course.title}
                </h1>
                <p className="text-white/60 text-lg mb-6 max-w-2xl leading-relaxed">
                  {course.fullDescription}
                </p>
                <div className="flex flex-wrap gap-6 text-white/80 text-sm">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {course.duration}
                  </span>
                  <span className="flex items-center gap-2 capitalize">
                    <Monitor className="w-4 h-4" /> {course.mode}
                  </span>
                  <span className="flex items-center gap-2 capitalize">
                    <GraduationCap className="w-4 h-4" /> {course.level}
                  </span>
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" /> Max 15 students
                  </span>
                </div>

                {quickStats.length > 0 && (
                  <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {quickStats.map((s) => (
                      <div key={s.label} className="text-center rounded-xl glass py-3 px-2">
                        <p className="text-2xl font-extrabold text-white">{s.value}</p>
                        <p className="text-xs text-white/60 mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Price Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 text-text-primary shadow-2xl"
            >
              <p className="text-sm text-text-muted mb-1">Course Fees</p>
              <p className="text-2xl font-extrabold mb-1">On Enquiry</p>
              <p className="text-xs text-success font-medium mb-5">EMI options available &middot; Talk to us for pricing</p>

              {isSubmitted ? (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-10 h-10 text-success mx-auto mb-2" />
                  <p className="font-bold text-sm">We&apos;ll contact you shortly!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input type="text" placeholder="Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input type="tel" placeholder="Phone" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input type="email" placeholder="Email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full py-3 rounded-xl gradient-accent text-white font-bold text-sm shadow-md hover:shadow-glow-accent transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    {isSubmitting ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send className="w-4 h-4" />Enroll Now</>}
                  </button>
                </form>
              )}

              <div className="mt-4 flex gap-2">
                <a href={`tel:${siteConfig.contact.phone}`} className="flex-1 py-2.5 text-center rounded-lg border border-border text-sm font-medium text-text-secondary hover:bg-gray-50 transition-colors">
                  📞 Call
                </a>
                <a href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-2.5 text-center rounded-lg bg-[#25D366] text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  💬 WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      {course.technologies.length > 0 && (
        <section className="py-10 bg-white border-b border-border">
          <div className="container-custom">
            <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-4">Technologies You&apos;ll Learn</h3>
            <div className="flex flex-wrap gap-2">
              {course.technologies.map((tech) => (
                <span key={tech} className="px-4 py-2 rounded-lg bg-primary-50 text-primary text-sm font-semibold">{tech}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Curriculum */}
      {course.curriculum.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-text-primary mb-2">
                Course <span className="gradient-text">Curriculum</span>
              </h2>
              <p className="text-text-secondary">Detailed module-wise breakdown</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {course.curriculum.map((mod, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-xl border border-border overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg gradient-primary text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
                      <span className="font-bold text-text-primary">{mod.moduleTitle}</span>
                    </div>
                    {openFaq === i ? <ChevronUp className="w-5 h-5 text-text-muted" /> : <ChevronDown className="w-5 h-5 text-text-muted" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 pl-16">
                      <ul className="space-y-2">
                        {mod.topics.map((topic) => (
                          <li key={topic} className="flex items-center gap-2 text-sm text-text-secondary">
                            <CheckCircle2 className="w-4 h-4 text-success shrink-0" />{topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      {course.projects.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-text-primary mb-2">
                Hands-on <span className="gradient-text">Projects</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {course.projects.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-5 rounded-xl border border-border card-hover">
                  <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center mb-3">
                    <Briefcase className="w-5 h-5 text-accent" />
                  </div>
                  <h4 className="font-bold text-text-primary text-sm mb-1">{p.title}</h4>
                  <p className="text-xs text-text-secondary">{p.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Career Opportunities */}
      {course.careerOpportunities.length > 0 && (
        <section className="py-14 gradient-primary text-white text-center">
          <div className="container-custom">
            <h2 className="text-3xl font-extrabold mb-6">Career Opportunities</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {course.careerOpportunities.map((c) => (
                <span key={c} className="px-5 py-2.5 rounded-full bg-white/10 text-sm font-medium">{c}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {course.faqs.length > 0 && (
        <section className="section-padding">
          <div className="container-custom max-w-3xl">
            <h2 className="text-3xl font-extrabold text-text-primary text-center mb-10">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <div className="space-y-3">
              {course.faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border border-border overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === 100 + i ? null : 100 + i)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
                    <span className="font-semibold text-text-primary text-sm pr-4">{faq.question}</span>
                    {openFaq === 100 + i ? <ChevronUp className="w-5 h-5 text-text-muted shrink-0" /> : <ChevronDown className="w-5 h-5 text-text-muted shrink-0" />}
                  </button>
                  {openFaq === 100 + i && (
                    <div className="px-5 pb-4">
                      <p className="text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-14 bg-primary-50 text-center">
        <div className="container-custom">
          <h2 className="text-2xl font-extrabold text-text-primary mb-3">
            Ready to Start Your {course.title} Journey?
          </h2>
          <p className="text-text-secondary mb-6">Limited seats available. Enroll now!</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl gradient-accent text-white font-bold shadow-lg hover:shadow-glow-accent transition-shadow">
            Enroll Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
