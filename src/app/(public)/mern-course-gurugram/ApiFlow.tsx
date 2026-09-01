"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { apiFlowSteps } from "./mern-content";

const KIND_COLOR: Record<string, string> = {
  client: "#38bdf8",
  server: "#34d399",
  db: "#22c55e",
};
const KIND_LABEL: Record<string, string> = {
  client: "Browser",
  server: "Server",
  db: "Database",
};

// "From API request to database" — the eight hops a request makes in a MERN
// app. Steps fade/slide in with a short stagger the first time the section
// scrolls into view; a pulse runs down the rail. Each step is a button:
// click it to reveal the line of code you'd actually write for that hop.
// Reduced motion shows the finished state with no movement.
export default function ApiFlow() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const active = inView || reduce;
  const [open, setOpen] = useState<number>(0);

  return (
    <ol ref={ref} className="relative mx-auto max-w-md">
      {/* rail */}
      <span
        aria-hidden="true"
        className="absolute bottom-2 left-[11px] top-2 w-px overflow-hidden bg-[var(--mern-line-strong)]"
      >
        {active && !reduce && (
          <span className="mern-rail-pulse absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-transparent via-[var(--mern-cyan)] to-transparent" />
        )}
      </span>

      {apiFlowSteps.map((s, i) => {
        const isOpen = open === i;
        return (
          <li
            key={s.label}
            className="relative pb-2.5 last:pb-0"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? "translateY(0)" : "translateY(8px)",
              transition: reduce
                ? "none"
                : `opacity 360ms cubic-bezier(0.23,1,0.32,1) ${i * 55}ms, transform 360ms cubic-bezier(0.23,1,0.32,1) ${i * 55}ms`,
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full gap-4 rounded-lg py-1.5 pr-2 text-left transition-colors hover:bg-white/[0.03]"
            >
              <span
                className="relative z-10 mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-[var(--mern-ink)] transition-transform"
                style={{
                  background: KIND_COLOR[s.kind],
                  boxShadow: `0 0 10px ${KIND_COLOR[s.kind]}${isOpen ? "aa" : "55"}`,
                  transform: isOpen ? "scale(1.12)" : "scale(1)",
                }}
              >
                <span className="text-[10px] font-bold text-[var(--mern-ink)]">{i + 1}</span>
              </span>
              <span className="min-w-0 pt-0.5">
                <span className="flex items-baseline gap-2">
                  <span className="font-mono text-[13px] font-semibold text-slate-100">{s.label}</span>
                  <span className="text-[10px] uppercase tracking-wide text-slate-500">
                    {KIND_LABEL[s.kind]}
                  </span>
                </span>
                <span className="block text-[12.5px] text-[var(--mern-text-dim)]">{s.sub}</span>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={
                    reduce ? { duration: 0.12 } : { duration: 0.25, ease: [0.23, 1, 0.32, 1] }
                  }
                  className="overflow-hidden pl-10"
                >
                  <pre className="mt-1 overflow-x-auto rounded-md border border-white/10 bg-black/40 px-3 py-2 font-mono text-[11px] leading-relaxed text-slate-300">
                    <code>{s.detail}</code>
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}

      <p className="mt-3 pl-10 text-[11px] text-slate-500">Tap a step to see the code for that hop.</p>
    </ol>
  );
}
