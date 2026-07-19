"use client";
import { motion } from "framer-motion";
import { Image, Plus, Upload } from "lucide-react";

export default function AdminGalleryPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-text-secondary text-sm">Manage gallery images shown on the website.</p>
        <button className="px-4 py-2.5 rounded-lg gradient-primary text-white text-sm font-bold shadow-sm hover:shadow-glow flex items-center gap-1.5"><Upload className="w-4 h-4" /> Upload Images</button>
      </div>
      <div className="bg-white rounded-xl border border-border p-6">
        <div className="border-2 border-dashed border-border rounded-xl p-16 text-center hover:border-primary/30 transition-colors cursor-pointer">
          <Image className="w-12 h-12 mx-auto mb-3 text-text-muted opacity-30" />
          <p className="font-medium text-text-muted">No images uploaded</p>
          <p className="text-xs text-text-muted mt-1">Click to upload or drag & drop images here.</p>
        </div>
      </div>
    </motion.div>
  );
}
