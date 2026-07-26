"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, ArrowRight, Phone, User } from "lucide-react";
import { API_BASE_URL } from "@/lib/apiBaseUrl";

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 5) {
      const exitShown = sessionStorage.getItem("exitIntentShown");
      if (!exitShown) {
        setIsOpen(true);
        sessionStorage.setItem("exitIntentShown", "true");
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [handleMouseLeave]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch(
        `${API_BASE_URL}/leads`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            email: "",
            courseInterested: "Free Career Counseling",
            source: "exit_intent",
          }),
        }
      );
      setIsSubmitted(true);
      setTimeout(() => setIsOpen(false), 3000);
    } catch {
      // silently fail
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg z-50"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid md:grid-cols-2">
                {/* Left — Visual */}
                <div className="gradient-hero p-8 flex flex-col items-center justify-center text-center text-white">
                  <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mb-4">
                    <Gift className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold mb-2">Wait!</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Get a <span className="text-accent font-bold">FREE</span>{" "}
                    career counseling session before you go!
                  </p>
                  <div className="mt-4 px-4 py-2 rounded-full bg-white/10 text-xs font-semibold">
                    ⏰ Limited Time Offer
                  </div>
                </div>

                {/* Right — Form */}
                <div className="p-8">
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-3">🎉</div>
                      <h4 className="text-lg font-bold text-text-primary mb-1">
                        Awesome!
                      </h4>
                      <p className="text-sm text-text-secondary">
                        We&apos;ll call you shortly for your free session.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h4 className="text-lg font-bold text-text-primary mb-1">
                        Claim Your Free Session
                      </h4>
                      <p className="text-sm text-text-muted mb-5">
                        Just your name and number — takes 10 seconds.
                      </p>
                      <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                          <input
                            type="text"
                            placeholder="Your Name"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                          <input
                            type="tel"
                            placeholder="Phone Number"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3 rounded-xl gradient-accent text-white font-bold text-sm shadow-md hover:shadow-glow-accent transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              Book Free Session
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
