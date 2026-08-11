"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, User, Share2, PenSquare, ArrowRight, Bookmark } from "lucide-react";
import dynamic from "next/dynamic";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import type { Blog } from "@/types/blog";
import { useEffect, useState } from "react";
import api from "@/lib/api";

const Hero3DBackground = dynamic(() => import("@/components/three/Hero3DBackground"), { ssr: false });

const readTime = (content: string) => `${Math.max(1, Math.round(content.split(/\s+/).length / 200))} min`;

const formatDate = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "";

export default function BlogDetailContent({ blog }: { blog: Blog }) {
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  useEffect(() => {
    if (blog.relatedPosts?.length) {
      setLoadingRelated(true);
      Promise.all(blog.relatedPosts.map((id) => api.get(`/blogs/${id}`)))
        .then((responses) => setRelatedBlogs(responses.map((r) => r.data)))
        .catch(() => setRelatedBlogs([]))
        .finally(() => setLoadingRelated(false));
    }
  }, [blog.relatedPosts]);

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-14 md:py-20 relative overflow-hidden">
        <div className="absolute top-10 right-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <Hero3DBackground variant="compact" />
        <div className="container-custom relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Blog", href: "/blog" },
                { label: blog.title, href: `/blog/${blog.slug}` },
              ]}
            />
            <Link href="/blog" className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
            <div className="flex items-center gap-3 text-sm text-white/50 mb-4">
              <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" />{blog.category}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{readTime(blog.content)} read</span>
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />WebiGeeks Team</span>
            </div>
            <h1 className="heading-section leading-tight">{blog.title}</h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="prose prose-lg max-w-none">
              <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                <div className="relative h-64 md:h-80">
                  <Image src={blog.coverImageUrl} alt={blog.title} fill sizes="768px" className="object-cover" />
                </div>
                <div className="p-8 md:p-10">
                  {/* Rich HTML Content */}
                  <div className="prose prose-lg max-w-none mb-6 prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-primary prose-strong:text-text-primary prose-em:text-text-secondary prose-blockquote:border-primary prose-blockquote:text-text-secondary prose-ol:text-text-secondary prose-ul:text-text-secondary">
                    <div
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                      className="text-text-secondary leading-relaxed text-lg"
                    />
                  </div>

                  {blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {blog.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-primary-50 text-primary text-xs font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold">W</div>
                      <div>
                        <p className="font-bold text-text-primary text-sm">WebiGeeks Team</p>
                        <p className="text-xs text-text-muted">Published {formatDate(blog.publishedAt || blog.createdAt)}</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-1.5 text-text-muted hover:text-primary text-sm transition-colors">
                      <Share2 className="w-4 h-4" /> Share
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Related Posts / Backlinks */}
            {relatedBlogs.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
                  <Bookmark className="w-6 h-6 text-primary" /> Related Reading
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedBlogs.map((relatedBlog) => (
                    <Link
                      key={relatedBlog._id}
                      href={`/blog/${relatedBlog.slug}`}
                      className="group p-4 rounded-lg border border-border bg-white hover:border-primary hover:shadow-md transition-all"
                    >
                      <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors line-clamp-2">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-xs text-text-muted mt-2">{relatedBlog.category}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

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
