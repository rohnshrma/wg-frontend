"use client";

import { useState } from "react";
import { Atom, Route, Boxes, Database, ChevronRight } from "lucide-react";
import { stackNodes, type StackNodeId } from "./mern-content";
import CopyButton from "./CopyButton";

const ICONS: Record<StackNodeId, typeof Atom> = {
  react: Atom,
  express: Route,
  node: Boxes,
  mongodb: Database,
};

// Interactive architecture diagram. The four MERN layers are toggle buttons;
// pick one and its detail panel shows. All four panels stay in the DOM
// (hidden when inactive) so every layer's description and code sample is in
// the server-rendered HTML. The connecting wire carries CSS packets, killed
// under prefers-reduced-motion. Layer switches are instant.
export default function StackDiagram() {
  const [active, setActive] = useState<StackNodeId>("react");

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-6">
      {/* Node rail */}
      <div
        aria-label="MERN stack layers"
        className="relative flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {stackNodes.map((n, i) => {
          const Icon = ICONS[n.id];
          const isActive = n.id === active;
          return (
            <div key={n.id} className="relative flex-1 lg:flex-none">
              {/* vertical connector between stacked nodes (lg only) */}
              {i > 0 && (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="absolute -top-3 left-6 hidden h-3 w-6 lg:block"
                  preserveAspectRatio="none"
                >
                  <path className="mern-wire" d="M12 0 V24" />
                  <circle
                    cx="12"
                    cy="0"
                    r="2.5"
                    className="mern-packet"
                    style={{
                      ["--mern-path" as string]: 'path("M12 0 V24")',
                      ["--mern-delay" as string]: `${i * 0.5}s`,
                    }}
                  />
                </svg>
              )}
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(n.id)}
                className={`group flex w-full min-w-[168px] items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors duration-150 lg:min-w-0 ${
                  isActive
                    ? "border-[var(--mern-line-strong)] bg-[var(--mern-panel-2)]"
                    : "border-[var(--mern-line)] bg-[var(--mern-panel)]/60 hover:bg-[var(--mern-panel)]"
                }`}
              >
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
                  style={{
                    background: isActive ? `${n.tint}22` : "rgba(148,163,184,0.10)",
                    color: isActive ? n.tint : "#94a3b8",
                  }}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-slate-100">{n.name}</span>
                  <span className="block truncate text-[11px] text-slate-500">{n.role}</span>
                </span>
                <ChevronRight
                  className={`ml-auto hidden h-4 w-4 shrink-0 text-slate-600 transition-transform lg:block ${
                    isActive ? "translate-x-0.5 text-slate-400" : ""
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Detail panels — all four rendered, only the active one shown */}
      <div className="mern-surface min-h-[340px] overflow-hidden rounded-2xl">
        {stackNodes.map((node) => (
          <div
            key={node.id}
            hidden={node.id !== active}
            className="grid gap-5 p-5 sm:p-6 md:grid-cols-2"
          >
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: node.tint, boxShadow: `0 0 10px ${node.tint}` }}
                />
                <h3 className="text-base font-bold text-slate-100">{node.name}</h3>
                <span className="text-[11px] uppercase tracking-wide text-slate-500">{node.role}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--mern-text-dim)]">{node.summary}</p>
              <ul className="mt-4 space-y-2">
                {node.points.map((p) => (
                  <li key={p} className="flex gap-2 text-[13px] text-slate-300">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: node.tint }} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[var(--mern-line)] bg-[var(--mern-ink)]/80">
              <div className="flex items-center justify-between border-b border-[var(--mern-line)] px-3 py-1.5 font-mono text-[10.5px] text-slate-500">
                <span>{node.id}.js</span>
                <CopyButton text={node.code} />
              </div>
              <pre className="overflow-x-auto px-3 py-3 font-mono text-[11.5px] leading-relaxed text-slate-300">
                <code>{node.code}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
