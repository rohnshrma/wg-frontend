"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, User, Share2, ArrowUpRight, Bookmark } from "lucide-react";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import BlogComments from "@/components/blog/BlogComments";
import type { Blog } from "@/types/blog";
import { useEffect, useState } from "react";
import api from "@/lib/api";

const readTime = (content: string) => `${Math.max(1, Math.round(content.split(/\s+/).length / 200))} min`;

const formatDate = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "";

export default function BlogDetailContent({ blog }: { blog: Blog }) {
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    if (blog.relatedPosts?.length) {
      Promise.all(blog.relatedPosts.map((id) => api.get(`/blogs/${id}`)))
        .then((responses) => setRelatedBlogs(responses.map((r) => r.data)))
        .catch(() => setRelatedBlogs([]));
    }
  }, [blog.relatedPosts]);

  return (
    <main>
      {/* Hero */}
      <section className="bg-canvas">
        <div className="container-custom pt-16 pb-12 md:pt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Blog", href: "/blog" },
                { label: blog.title, href: `/blog/${blog.slug}` },
              ]}
            />
            <Link href="/blog" className="inline-flex items-center gap-1 text-agency-muted hover:text-ink text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
            <div className="flex items-center gap-4 font-mono-agency text-xs text-agency-muted mb-6 tracking-wide">
              <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" />{blog.category}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{readTime(blog.content)} read</span>
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />WebiGeeks Digital</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink leading-[1.1]">
              {blog.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-canvas">
        <div className="container-custom pb-24 md:pb-32">
          <div className="max-w-3xl mx-auto">
            <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bg-white rounded-[32px] overflow-hidden">
                <div className="relative h-64 md:h-80">
                  <Image src={blog.coverImageUrl} alt={blog.title} fill sizes="768px" className="object-cover" />
                </div>
                <div className="p-8 md:p-10">
                  <div
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                    className="prose prose-lg max-w-none mb-6 text-ink/80 leading-relaxed prose-headings:text-ink prose-headings:font-display prose-a:text-agency-accent prose-strong:text-ink prose-blockquote:border-agency-accent"
                  />

                  {blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {blog.tags.map((tag) => (
                        <span key={tag} className="font-mono-agency px-3 py-1 rounded-full bg-agency-accent-soft text-agency-accent text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-6 border-t border-ink/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center text-white font-bold">W</div>
                      <div>
                        <p className="font-semibold text-ink text-sm">WebiGeeks Digital</p>
                        <p className="text-xs text-agency-muted">Published {formatDate(blog.publishedAt || blog.createdAt)}</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-1.5 text-agency-muted hover:text-agency-accent text-sm transition-colors">
                      <Share2 className="w-4 h-4" /> Share
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Related Posts / Backlinks */}
            {relatedBlogs.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-2xl font-bold text-ink mb-6 flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-agency-accent" /> Related reading
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedBlogs.map((relatedBlog) => (
                    <Link
                      key={relatedBlog._id}
                      href={`/blog/${relatedBlog.slug}`}
                      className="group p-4 rounded-2xl border border-ink/10 bg-white hover:border-agency-accent transition-colors"
                    >
                      <h3 className="font-semibold text-ink group-hover:text-agency-accent transition-colors line-clamp-2">
                        {relatedBlog.title}
                      </h3>
                      <p className="font-mono-agency text-xs text-agency-muted mt-2">{relatedBlog.category}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section */}
            <BlogComments blogId={blog._id} />

            {/* CTA */}
            <div className="mt-10 p-10 rounded-[32px] bg-ink text-center">
              <h3 className="font-display text-2xl font-bold text-white mb-2">Have a project in mind?</h3>
              <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">
                Tell us about it — we&apos;ll respond within 24 hours.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-ink font-semibold rounded-full hover:bg-agency-accent hover:text-white transition-colors duration-300"
              >
                Start your project
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
