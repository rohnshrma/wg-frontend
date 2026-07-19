"use client";

import { motion } from "framer-motion";
import { Bell, Check } from "lucide-react";

export default function NotificationsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="bg-white rounded-xl border border-border">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-bold text-text-primary flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Notifications
          </h3>
          <button className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> Mark all read
          </button>
        </div>
        <div className="p-6 text-center py-16">
          <Bell className="w-12 h-12 mx-auto mb-3 text-text-muted opacity-30" />
          <p className="font-medium text-text-muted">No notifications yet</p>
          <p className="text-xs text-text-muted mt-1">
            You&apos;ll receive notifications about course updates, payments, and announcements here.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
