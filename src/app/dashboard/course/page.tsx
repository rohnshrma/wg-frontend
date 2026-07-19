"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, Monitor, Users, CheckCircle2, Info } from "lucide-react";

export default function CoursePage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Info banner */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-primary-50 text-sm text-text-secondary">
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p>Your course details will appear here once your admission is approved by the admin.</p>
      </div>

      {/* Course Card Placeholder */}
      <div className="bg-white rounded-xl border border-border p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-primary">Your Course</h3>
            <p className="text-sm text-text-muted">Course assignment pending</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-background">
            <div className="flex items-center gap-2 text-text-muted text-xs mb-1">
              <Clock className="w-3.5 h-3.5" /> Duration
            </div>
            <p className="font-bold text-text-primary">—</p>
          </div>
          <div className="p-4 rounded-lg bg-background">
            <div className="flex items-center gap-2 text-text-muted text-xs mb-1">
              <Monitor className="w-3.5 h-3.5" /> Mode
            </div>
            <p className="font-bold text-text-primary">—</p>
          </div>
          <div className="p-4 rounded-lg bg-background">
            <div className="flex items-center gap-2 text-text-muted text-xs mb-1">
              <Users className="w-3.5 h-3.5" /> Batch
            </div>
            <p className="font-bold text-text-primary">—</p>
          </div>
        </div>

        <div className="text-center py-8 text-text-muted">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No course assigned yet</p>
          <p className="text-xs mt-1">Complete your profile and wait for admin approval.</p>
        </div>
      </div>
    </motion.div>
  );
}
