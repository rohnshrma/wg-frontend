"use client";
import { motion } from "framer-motion";
import { Bell, Plus, Send } from "lucide-react";

export default function AdminNotificationsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-text-secondary text-sm">Send notifications to students and manage announcements.</p>
        <button className="px-4 py-2.5 rounded-lg gradient-primary text-white text-sm font-bold shadow-sm hover:shadow-glow flex items-center gap-1.5"><Send className="w-4 h-4" /> Broadcast</button>
      </div>
      <div className="bg-white rounded-xl border border-border p-6 text-center py-16">
        <Bell className="w-12 h-12 mx-auto mb-3 text-text-muted opacity-30" />
        <p className="font-medium text-text-muted">No notifications sent</p>
        <p className="text-xs text-text-muted mt-1">Click &quot;Broadcast&quot; to send announcements to students.</p>
      </div>
    </motion.div>
  );
}
