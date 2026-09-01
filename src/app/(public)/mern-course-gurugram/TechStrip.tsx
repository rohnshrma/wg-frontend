"use client";

import { useState } from "react";
import { Stagger, StaggerItem } from "./Reveal";

// The full technology list from courseData.technologies, as a staggered grid
// of mono chips in the hero (styled for the dark surface). Each chip is a
// toggle — tap the ones you want to focus on and they stay highlighted, so
// the list is something you touch, not just read.
export default function TechStrip({ items }: { items: { name: string; role: string }[] }) {
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const toggle = (name: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  return (
    <div className="mt-12 border-t border-[var(--mern-line)] pt-8 lg:mt-14">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">
        {items.length} technologies, one language, front to back.
        <span className="ml-2 normal-case tracking-normal text-slate-600">Tap any you want to focus on.</span>
      </p>
      <Stagger step={0.028} className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((t) => {
          const on = picked.has(t.name);
          return (
            <StaggerItem key={t.name}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => toggle(t.name)}
                className={`w-full rounded-lg border px-3 py-2.5 text-left transition-colors active:scale-[0.98] ${
                  on
                    ? "border-[var(--mern-cyan)] bg-[var(--mern-cyan)]/10"
                    : "border-[var(--mern-line)] bg-white/[0.03] hover:border-[var(--mern-line-strong)] hover:bg-white/[0.06]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                      on ? "bg-[var(--mern-cyan)]" : "bg-slate-600"
                    }`}
                  />
                  <span className="truncate font-mono text-[12.5px] font-semibold text-slate-100">
                    {t.name}
                  </span>
                </span>
                {t.role && <span className="mt-1 block text-[11px] text-slate-500">{t.role}</span>}
              </button>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  );
}
