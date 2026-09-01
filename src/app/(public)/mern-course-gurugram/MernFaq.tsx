"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs } from "./mern-content";

// Local FAQ accordion (same shape as the DA landing page's FaqAccordion,
// kept in this folder so the two routes don't share a component across the
// (public)/(ads) boundary). One panel open at a time; height animates with a
// short ease-out spring, downgraded under reduced motion.
export default function MernFaq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className="space-y-2.5">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            className="overflow-hidden rounded-xl border border-border bg-white transition-colors hover:border-primary/30"
          >
            <h3 className="text-sm font-semibold">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-text-primary transition-colors hover:bg-gray-50/70"
              >
                {f.q}
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-text-muted transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={reduce ? { duration: 0.12 } : { type: "spring", bounce: 0, duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-sm leading-relaxed text-text-secondary">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
