"use client";
import { motion } from "framer-motion";
import { PenSquare, Plus, Search } from "lucide-react";

export default function AdminBlogsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input type="text" placeholder="Search blogs..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
        </div>
        <button className="px-4 py-2.5 rounded-lg gradient-primary text-white text-sm font-bold shadow-sm hover:shadow-glow flex items-center gap-1.5"><Plus className="w-4 h-4" /> New Blog Post</button>
      </div>
      <div className="bg-white rounded-xl border border-border p-6 text-center py-16">
        <PenSquare className="w-12 h-12 mx-auto mb-3 text-text-muted opacity-30" />
        <p className="font-medium text-text-muted">No blog posts yet</p>
        <p className="text-xs text-text-muted mt-1">Create your first blog post to share insights.</p>
      </div>
    </motion.div>
  );
}
