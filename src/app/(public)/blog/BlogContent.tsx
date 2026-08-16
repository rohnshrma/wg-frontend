"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { Blog } from "@/types/blog";

const formatDate = (value?: string) =>
  value ? new Date(value).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : "";

export default function BlogContent({ blogs }: { blogs: Blog[] }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(blogs.map((b) => b.category)))],
    [blogs]
  );

  const filtered = blogs.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === "All" || b.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <main>
      {/* Hero */}
      <section className="bg-ink">
        <div className="container-custom pt-16 pb-16 md:pt-20 md:pb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-agency-accent" />
              <span className="font-mono-agency text-xs text-white/50 tracking-[0.15em] uppercase">
                WGD / 006 — Insights
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-3xl leading-[1.05]">
              Notes from the studio.
            </h1>
            <p className="text-lg text-white/60 max-w-xl mt-8 leading-relaxed">
              Perspectives on product engineering, design, and building software that lasts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-ink border-y border-white/10 sticky top-[72px] z-30 backdrop-blur-md bg-ink/90">
        <div className="container-custom py-5 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-white/15 text-sm bg-ink-soft text-white placeholder:text-white/30 focus:outline-none focus:border-agency-accent transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap font-mono-agency">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs tracking-wide transition-colors ${
                  selectedCategory === cat
                    ? "bg-white text-ink"
                    : "border border-white/15 text-white/50 hover:border-white hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="bg-ink">
        <div className="container-custom py-20 md:py-28">
          {filtered.length === 0 ? (
            <div className="text-center py-20 border-t-2 border-white">
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                {blogs.length === 0 ? "No articles yet" : "No articles found"}
              </h3>
              <p className="text-white/50">
                {blogs.length === 0 ? "Check back soon for new posts." : "Try a different search or category."}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 border-t-2 border-white pt-12">
              {filtered.map((blog, i) => (
                <motion.div
                  key={blog.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 6) * 0.05 }}
                >
                  <Link href={`/blog/${blog.slug}`} className="group block">
                    <div className="relative h-52 rounded-2xl overflow-hidden mb-5 bg-ink-soft">
                      <Image
                        src={blog.coverImageUrl}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>
                    <div className="flex items-center gap-3 font-mono-agency text-xs text-white/50 mb-3 tracking-wide">
                      <span>{blog.category}</span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-white mb-2 group-hover:text-agency-accent transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-white/60 line-clamp-2 mb-4 leading-relaxed">{blog.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-white text-sm font-semibold group-hover:gap-2.5 transition-all">
                      Read more
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
