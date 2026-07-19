"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight, PenSquare, Tag, Search } from "lucide-react";
import { useState } from "react";

const blogs = [
  { slug: "why-data-science-is-best-career-2025", title: "Why Data Science is the Best Career Choice in 2025", excerpt: "Data Science continues to dominate the job market. Learn why it's the #1 career choice and how to get started.", category: "Career", readTime: "5 min", date: "Dec 15, 2024", gradient: "from-violet-500 to-purple-600" },
  { slug: "top-10-python-libraries-data-science", title: "Top 10 Python Libraries Every Data Scientist Should Know", excerpt: "From NumPy to TensorFlow — explore the essential Python libraries that power modern data science.", category: "Tech", readTime: "7 min", date: "Dec 10, 2024", gradient: "from-blue-500 to-indigo-600" },
  { slug: "mern-stack-vs-mean-stack", title: "MERN Stack vs MEAN Stack — Which Should You Learn?", excerpt: "A detailed comparison of React vs Angular in the context of full-stack web development.", category: "Web Dev", readTime: "6 min", date: "Dec 5, 2024", gradient: "from-amber-500 to-orange-600" },
  { slug: "power-bi-dashboard-best-practices", title: "Power BI Dashboard Design: Best Practices & Tips", excerpt: "Create stunning Power BI dashboards with these professional design tips and best practices.", category: "Analytics", readTime: "4 min", date: "Nov 28, 2024", gradient: "from-yellow-500 to-amber-600" },
  { slug: "how-to-crack-data-analyst-interview", title: "How to Crack a Data Analyst Interview in 2025", excerpt: "Comprehensive guide with top interview questions, preparation strategies, and tips from industry experts.", category: "Career", readTime: "8 min", date: "Nov 20, 2024", gradient: "from-emerald-500 to-teal-600" },
  { slug: "introduction-to-generative-ai", title: "Introduction to Generative AI: What You Need to Know", excerpt: "Understanding GenAI, large language models, and how they're reshaping the tech industry.", category: "AI", readTime: "6 min", date: "Nov 15, 2024", gradient: "from-rose-500 to-pink-600" },
];

const categories = ["All", "Career", "Tech", "Web Dev", "Analytics", "AI"];

export default function BlogContent() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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
        <div className="container-custom relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium mb-6">
              <PenSquare className="w-4 h-4 text-accent" />
              Our Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
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
              <h3 className="text-xl font-bold text-text-primary">No Articles Found</h3>
              <p className="text-text-secondary">Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((blog, i) => (
                <motion.div key={blog.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group bg-white rounded-xl border border-border overflow-hidden card-hover">
                  {/* Cover placeholder */}
                  <div className={`h-48 bg-gradient-to-br ${blog.gradient} flex items-center justify-center`}>
                    <PenSquare className="w-10 h-10 text-white/30" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
                      <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{blog.category}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{blog.readTime}</span>
                      <span>{blog.date}</span>
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
