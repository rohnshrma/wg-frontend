"use client";
import { motion } from "framer-motion";
import { BookOpen, Plus, Search } from "lucide-react";

export default function AdminCoursesPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input type="text" placeholder="Search courses..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
        </div>
        <button className="px-4 py-2.5 rounded-lg gradient-primary text-white text-sm font-bold shadow-sm hover:shadow-glow flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add Course</button>
      </div>
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border bg-gray-50/50"><th className="text-left px-4 py-3 font-semibold text-text-secondary">Course</th><th className="text-left px-4 py-3 font-semibold text-text-secondary">Duration</th><th className="text-left px-4 py-3 font-semibold text-text-secondary">Fees</th><th className="text-left px-4 py-3 font-semibold text-text-secondary">Status</th><th className="text-left px-4 py-3 font-semibold text-text-secondary">Actions</th></tr></thead>
          <tbody><tr><td colSpan={5} className="text-center py-16"><BookOpen className="w-12 h-12 mx-auto mb-3 text-text-muted opacity-30" /><p className="font-medium text-text-muted">No courses yet</p></td></tr></tbody>
        </table>
      </div>
    </motion.div>
  );
}
