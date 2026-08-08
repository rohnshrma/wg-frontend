"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, Send, User, Mail, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { API_BASE_URL } from "@/lib/apiBaseUrl";

export default function StickyCallbackCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    courseInterested: "",
  });

  const handleClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch(`${API_BASE_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "sticky_cta" }),
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
        setFormData({ name: "", phone: "", email: "", courseInterested: "" });
      }, 2500);
    } catch {
      // silently fail
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Sticky pill — fixed, bottom-center */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-6 py-3.5 rounded-full gradient-primary text-white text-sm font-bold shadow-xl hover:shadow-glow transition-shadow flex items-center gap-2 whitespace-nowrap"
      >
        <Phone className="w-4 h-4" />
        <span className="hidden sm:inline">Request a Call Back</span>
        <span className="sm:hidden">Call Back</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={handleClose}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-sm z-50 max-h-[90svh]"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90svh] overflow-y-auto">
                <div className="gradient-primary px-6 py-5 relative">
                  <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Request a Call Back</h3>
                      <p className="text-white/70 text-sm">We&apos;ll call you within 30 minutes</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {isSubmitted ? (
                    <div className="text-center py-6">
                      <CheckCircle2 className="w-14 h-14 text-success mx-auto mb-3" />
                      <h4 className="text-lg font-bold text-text-primary mb-1">Thank You! 🎉</h4>
                      <p className="text-text-secondary text-sm">
                        Our team will call you shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                          type="text"
                          placeholder="Your Name"
                          aria-label="Your Name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          aria-label="Phone Number"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                          type="email"
                          placeholder="Email Address"
                          aria-label="Email Address"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>
                      <select
                        required
                        aria-label="Select Course"
                        value={formData.courseInterested}
                        onChange={(e) => setFormData({ ...formData, courseInterested: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none"
                      >
                        <option value="">Select Course</option>
                        {siteConfig.courses.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-xl gradient-accent text-white font-bold text-sm shadow-md hover:shadow-glow-accent transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Request Call Back
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
