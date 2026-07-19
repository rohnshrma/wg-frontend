"use client";
import { motion } from "framer-motion";
import { MessageSquare, Plus, Star } from "lucide-react";

export default function AdminTestimonialsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-text-secondary text-sm">Manage student testimonials displayed on the website.</p>
        <button className="px-4 py-2.5 rounded-lg gradient-primary text-white text-sm font-bold shadow-sm hover:shadow-glow flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add Testimonial</button>
      </div>
      <div className="bg-white rounded-xl border border-border p-6 text-center py-16">
        <MessageSquare className="w-12 h-12 mx-auto mb-3 text-text-muted opacity-30" />
        <p className="font-medium text-text-muted">No testimonials yet</p>
        <p className="text-xs text-text-muted mt-1">Add success stories from your placed students.</p>
      </div>
    </motion.div>
  );
}
