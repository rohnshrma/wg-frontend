"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Boxes, Database, Route } from "lucide-react";
import type { ShowcaseProject } from "./mern-data";
import { Stagger, StaggerItem } from "./Reveal";

// Each featured project is an interactive spec sheet: a tab bar switches
// between the feature list, a representative Mongoose model and the REST
// routes you'd build. No fake screenshots — the "preview" is real,
// project-specific code. Tech badges toggle a highlight so a visitor can
// mark the parts they care about. Mini projects expand on click.

const METHOD_COLOR: Record<string, string> = {
  GET: "text-[var(--mern-cyan)]",
  POST: "text-[var(--mern-green)]",
  PUT: "text-amber-400",
  PATCH: "text-amber-400",
  DELETE: "text-rose-400",
};

const TABS = [
  { id: "features", label: "Features", Icon: Boxes },
  { id: "schema", label: "Data model", Icon: Database },
  { id: "api", label: "API", Icon: Route },
] as const;
type TabId = (typeof TABS)[number]["id"];

function FeaturedCard({ p }: { p: ShowcaseProject }) {
  const [tab, setTab] = useState<TabId>("features");
  const [pinned, setPinned] = useState<Set<string>>(new Set());

  const features =
    p.spec?.features ?? p.desc.split(/,\s*/).map((s) => s.trim().replace(/^./, (c) => c.toUpperCase()));

  const togglePin = (t: string) =>
    setPinned((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="p-5">
        <h3 className="font-bold text-text-primary">{p.title}</h3>
        <p className="mt-1 text-sm text-text-secondary">{p.desc}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.stack.map((t) => {
            const on = pinned.has(t);
            return (
              <button
                key={t}
                type="button"
                aria-pressed={on}
                onClick={() => togglePin(t)}
                className={`rounded-md border px-2 py-0.5 font-mono text-[11px] transition-colors active:scale-95 ${
                  on
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-gray-50 text-text-secondary hover:border-primary/40"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        <p className="mt-3 rounded-lg bg-primary-50/60 px-3 py-2 text-[13px] text-text-primary">
          <span className="font-semibold">You&apos;ll build: </span>
          {p.learn}
        </p>
      </div>

      {/* Interactive spec panel */}
      <div className="mt-auto bg-[var(--mern-ink)]">
        <div role="tablist" aria-label={`${p.title} details`} className="flex border-b border-white/10">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              onClick={() => setTab(id)}
              aria-selected={tab === id}
              className={`flex flex-1 items-center justify-center gap-1.5 px-2 py-2.5 font-mono text-[11px] transition-colors ${
                tab === id
                  ? "bg-white/[0.04] text-slate-100"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
              {label}
              <span
                className={`ml-1 h-1 w-1 rounded-full transition-colors ${
                  tab === id ? "bg-[var(--mern-cyan)]" : "bg-transparent"
                }`}
              />
            </button>
          ))}
        </div>

        {/* All three panels stay in the DOM (so the schema and routes are in
            the server-rendered HTML); only the active one is shown. Tab
            switches are frequent, so they're instant, not animated. */}
        <div className="min-h-[172px] px-4 py-3.5 text-slate-300">
          <ul role="tabpanel" hidden={tab !== "features"} className="space-y-1.5">
            {features.map((f) => (
              <li key={f} className="flex gap-2 text-[12.5px]">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--mern-cyan)]" />
                {f}
              </li>
            ))}
          </ul>

          <div role="tabpanel" hidden={tab !== "schema"}>
            {p.spec?.schema ? (
              <pre className="overflow-x-auto font-mono text-[11px] leading-relaxed">
                <code>{p.spec.schema}</code>
              </pre>
            ) : (
              <p className="font-mono text-[11.5px] text-slate-500">
                {"// data model covered live in the build session"}
              </p>
            )}
          </div>

          <div role="tabpanel" hidden={tab !== "api"}>
            {p.spec?.api ? (
              <ul className="space-y-1.5 font-mono text-[11px]">
                {p.spec.api.map((r) => (
                  <li key={`${r.method} ${r.path}`} className="flex flex-wrap items-baseline gap-x-2">
                    <span className={`font-bold ${METHOD_COLOR[r.method] ?? "text-slate-300"}`}>
                      {r.method}
                    </span>
                    <span className="text-slate-200">{r.path}</span>
                    <span className="text-slate-500">{r.desc}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-mono text-[11.5px] text-slate-500">
                {"// REST routes covered live in the build session"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniCard({ p }: { p: ShowcaseProject }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      aria-expanded={open}
      className="rounded-xl border border-border bg-gray-50 p-3.5 text-left transition-colors hover:border-primary/40 hover:bg-white"
    >
      <span className="flex items-center justify-between">
        <span className="text-sm font-semibold text-text-primary">{p.title}</span>
        <span className="font-mono text-[10px] text-text-muted">{p.stack[0]}</span>
      </span>
      <AnimatePresence initial={false}>
        {open && (
          <motion.span
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduce ? { duration: 0.12 } : { duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="block overflow-hidden"
          >
            <span className="mt-1.5 block text-xs text-text-secondary">{p.learn}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function ProjectShowcase({ items }: { items: ShowcaseProject[] }) {
  const featured = items.filter((p) => p.featured);
  const mini = items.filter((p) => !p.featured);

  return (
    <div>
      <Stagger step={0.07} className="grid items-stretch gap-5 md:grid-cols-2">
        {featured.map((p) => (
          <StaggerItem key={p.title} className="h-full">
            <FeaturedCard p={p} />
          </StaggerItem>
        ))}
      </Stagger>

      {mini.length > 0 && (
        <div className="mt-6 rounded-2xl border border-border bg-white p-5">
          <p className="mb-3 text-sm font-semibold text-text-primary">
            Plus smaller portfolio builds.{" "}
            <span className="font-normal text-text-muted">Tap one to see what it covers.</span>
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {mini.map((p) => (
              <MiniCard key={p.title} p={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
