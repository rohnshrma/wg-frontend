"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import type { CurriculumModule } from "./mern-data";
import CurriculumDownload from "./CurriculumDownload";

// Expandable 16-module timeline. One module open at a time; a progress rail
// on the left fills to the module you're viewing. Content height animates
// with a critically-damped spring (plain height toggle under reduced
// motion). The "Download full curriculum" button opens the same lead-gated
// CurriculumDownload modal used in the hero and bottom CTA.
export default function CurriculumTimeline({ modules }: { modules: CurriculumModule[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div>
      <ol className="relative space-y-2.5 border-l border-border pl-0">
        {modules.map((m, i) => {
          const isOpen = open === m.n - 1;
          return (
            <li key={m.n} className="relative">
              {/* rail node */}
              <span
                aria-hidden="true"
                className={`absolute -left-[6.5px] top-5 h-3 w-3 rounded-full border-2 transition-colors ${
                  isOpen ? "border-primary bg-primary" : "border-border bg-white"
                }`}
              />
              <div
                className={`ml-5 rounded-xl border bg-white transition-colors ${
                  isOpen ? "border-primary/40 shadow-sm" : "border-border"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start gap-4 rounded-xl px-4 py-4 text-left transition-colors hover:bg-gray-50/70 sm:px-5"
                >
                  <span className="mt-0.5 grid h-7 min-w-[2.5rem] shrink-0 place-items-center rounded-lg bg-primary-50 px-1.5 text-xs font-bold tracking-tight text-primary">
                    {m.label}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="mb-1 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                      {m.phase}
                    </span>
                    <span role="heading" aria-level={3} className="block font-bold text-text-primary">
                      {m.title}
                    </span>
                    <span className="mt-1 block text-sm text-text-secondary">{m.outcome}</span>
                  </span>
                  <Plus
                    className={`mt-1 h-4 w-4 shrink-0 text-text-muted transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={
                        reduce
                          ? { duration: 0.12 }
                          : { type: "spring", bounce: 0, duration: 0.35 }
                      }
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border px-4 pb-4 pt-3.5 sm:px-5">
                        <div className="mb-3 flex flex-wrap gap-1.5">
                          {m.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-md border border-border bg-gray-50 px-2 py-0.5 font-mono text-[11px] text-text-secondary"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <ul className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                          {m.topics.map((t) => (
                            <li key={t} className="flex gap-2 text-[13px] text-text-secondary">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/50" />
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-6">
        <CurriculumDownload
          label="Download the full curriculum (PDF)"
          buttonClassName="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-text-primary shadow-sm transition-[transform,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-md active:scale-[0.98]"
        />
      </div>
    </div>
  );
}
