"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PenSquare, Tag, Search } from "lucide-react";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
const Hero3DBackground = dynamic(() => import("@/components/three/Hero3DBackground"), { ssr: false });
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
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-10 right-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <Hero3DBackground variant="compact" />
        <div className="container-custom relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium mb-6">
              <PenSquare className="w-4 h-4 text-accent" />
              Our Blog
            </span>
            <h1 className="heading-hero mb-4">
              Insights & <span className="bg-gradient-to-r from-accent to-accent-warm bg-clip-text text-transparent">Resources</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Stay updated with the latest in tech, career tips, and industry trends.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white border-b border-border sticky top-[72px] z-30">
        <div className="container-custom flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input type="text" placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === cat ? "bg-primary text-white" : "bg-gray-100 text-text-secondary hover:bg-gray-200"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <PenSquare className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text-primary">
                {blogs.length === 0 ? "No Articles Yet" : "No Articles Found"}
              </h3>
              <p className="text-text-secondary">
                {blogs.length === 0 ? "Check back soon for new posts." : "Try a different search or category."}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((blog, i) => (
                <motion.div key={blog.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group bg-white rounded-xl border border-border overflow-hidden card-hover">
                  <div className="relative h-48">
                    <Image
                      src={blog.coverImageUrl}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
                      <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{blog.category}</span>
                      <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                    </div>
                    <h3 className="font-bold text-text-primary mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-text-secondary line-clamp-2 mb-4">{blog.excerpt}</p>
                    <Link href={`/blog/${blog.slug}`} className="inline-flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-all">
                      Read More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
