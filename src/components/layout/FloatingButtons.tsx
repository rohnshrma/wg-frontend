"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, X, ChevronUp } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(
    /[^0-9]/g,
    ""
  )}?text=${encodeURIComponent(
    "Hi! I'd like to discuss a project. Please share more details."
  )}`;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col-reverse items-center gap-4">
      {/* WhatsApp — bottom of the stack */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />
      </a>

      {/* Call — middle of the stack */}
      <a
        href={`tel:${siteConfig.contact.phone}`}
        className="w-14 h-14 rounded-full bg-white text-ink shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Call us"
      >
        <Phone className="w-6 h-6" />
      </a>

      {/* Scroll to Top — top of the stack */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            onClick={scrollToTop}
            className="w-14 h-14 rounded-full bg-white shadow-xl border border-white/10 flex items-center justify-center hover:scale-110 transition-all text-ink/60 hover:text-agency-accent"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
