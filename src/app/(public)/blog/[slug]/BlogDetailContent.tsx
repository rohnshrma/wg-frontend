"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, User, Share2, PenSquare, ArrowRight } from "lucide-react";
import Hero3DBackground from "@/components/three/Hero3DBackground";

export default function BlogDetailContent({ slug }: { slug: string }) {
  const title = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-14 md:py-20 relative overflow-hidden">
        <div className="absolute top-10 right-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <Hero3DBackground variant="compact" />
        <div className="container-custom relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <Link href="/blog" className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
            <div className="flex items-center gap-3 text-sm text-white/50 mb-4">
              <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" />Tech</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />6 min read</span>
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />WebiGeeks Team</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">{title}</h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="prose prose-lg max-w-none">
              <div className="bg-white rounded-2xl border border-border p-8 md:p-10 shadow-sm">
                <p className="text-text-secondary leading-relaxed text-lg mb-6">
                  This article is coming soon! Our team is working on creating high-quality content
                  about <strong>{title.toLowerCase()}</strong>. Stay tuned for in-depth insights,
                  practical tips, and expert perspectives.
                </p>

                <div className="my-8 p-6 rounded-xl bg-primary-50 border border-primary/10">
                  <h3 className="text-lg font-bold text-text-primary mb-2">What You&apos;ll Learn</h3>
                  <ul className="space-y-2">
                    <li className="text-text-secondary text-sm">✅ Core concepts and fundamentals</li>
                    <li className="text-text-secondary text-sm">✅ Real-world applications and use cases</li>
                    <li className="text-text-secondary text-sm">✅ Step-by-step implementation guide</li>
                    <li className="text-text-secondary text-sm">✅ Best practices and common pitfalls</li>
                    <li className="text-text-secondary text-sm">✅ Resources for further learning</li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed mb-6">
                  In the meantime, check out our courses to learn these concepts hands-on with
                  real-world projects and expert mentorship.
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold">W</div>
                    <div>
                      <p className="font-bold text-text-primary text-sm">WebiGeeks Team</p>
                      <p className="text-xs text-text-muted">Published Dec 2024</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-1.5 text-text-muted hover:text-primary text-sm transition-colors">
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>
              </div>
            </motion.article>

            {/* CTA */}
            <div className="mt-10 p-8 rounded-2xl bg-primary-50 text-center">
              <PenSquare className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="text-xl font-bold text-text-primary mb-2">Want to Learn This Practically?</h3>
              <p className="text-text-secondary text-sm mb-5">
                Join our courses and learn with real-world projects and mentorship.
              </p>
              <Link href="/courses" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-semibold shadow-md hover:shadow-glow transition-shadow">
                Explore Courses <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
