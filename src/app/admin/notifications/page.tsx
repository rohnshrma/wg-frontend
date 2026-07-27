"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import api from "@/lib/api";
import NotificationsList from "@/components/shared/NotificationsList";

export default function AdminNotificationsPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleBroadcast = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSending(true);
    setError("");
    setResult("");
    try {
      const res = await api.post("/notifications/broadcast", { title, message, type: "general" });
      setResult(res.data.message);
      setTitle("");
      setMessage("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not send broadcast");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <NotificationsList />

      <div>
        <h3 className="font-bold text-text-primary mb-1">Broadcast to Students</h3>
        <p className="text-text-secondary text-sm">Send an announcement to every active student.</p>
      </div>

      {result && <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-success-light text-success text-sm"><CheckCircle2 className="w-4 h-4" /> {result}</div>}
      {error && <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm"><AlertCircle className="w-4 h-4" /> {error}</div>}

      <form onSubmit={handleBroadcast} className="bg-white rounded-xl border border-border p-6 space-y-4">
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Title</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Diwali Holiday Notice"
            className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Message</label>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your announcement..."
            className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={isSending}
          className="px-4 py-2.5 rounded-lg gradient-primary text-white text-sm font-bold shadow-sm hover:shadow-glow flex items-center gap-1.5 disabled:opacity-50"
        >
          {isSending ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
          Broadcast to All Students
        </button>
      </form>
    </motion.div>
  );
}
