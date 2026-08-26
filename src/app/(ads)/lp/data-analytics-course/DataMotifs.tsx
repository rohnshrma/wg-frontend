"use client";

import { useRef, type RefObject } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * The page's data-analytics artwork — one artifact per chapter.
 *
 * These are deliberately the things a data analyst actually produces: a BI
 * dashboard, a query result grid, a conversion funnel, an activity heatmap, a
 * KPI board. An earlier pass used abstract geometry (a cube, orbit rings, a
 * fanned deck) and it read as generic decoration — a shape next to a heading,
 * not a picture of the job. Recognisability is the whole point: someone
 * scanning the page should see the work they'd be doing.
 *
 * They're built as SVG artwork inside a shared 3D wrapper rather than as
 * assemblies of CSS faces. SVG gets the detail that makes a dashboard read as
 * a dashboard; the wrapper supplies the perspective, the scroll-linked drift,
 * and a foreground element at a different depth to sell the third dimension.
 *
 * No WebGL: this is a paid-traffic landing page where every KB delays the LCP
 * the ad click is paying for.
 */

const EASE_SNAPPY = [0.23, 1, 0.32, 1] as const;
const VIEW = { once: true, margin: "-60px" } as const;
const PANEL_SHADOW = "drop-shadow-[0_26px_50px_rgba(15,23,42,0.22)]";

/** Normalised 0→1 progress as a section travels bottom-to-top of the viewport. */
function useTravel(ref: RefObject<HTMLDivElement | null>) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return scrollYProgress;
}

/**
 * Shared stage: perspective, a fixed lean, and a gentle scroll-linked turn and
 * drift so the artifact is alive as you read past it without ever looping.
 * `flip` mirrors the lean so a motif on the left leans into the page rather
 * than away from it.
 */
function Stage({
  children,
  flip,
  className,
}: {
  children: React.ReactNode;
  flip?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const travel = useTravel(ref);
  const dir = flip ? -1 : 1;
  const spin = useTransform(travel, [0, 1], [-20 * dir, -4 * dir]);
  const drift = useTransform(travel, [0, 1], [26, -26]);

  return (
    <div ref={ref} className={`scene-far ${className ?? ""}`} aria-hidden="true">
      <motion.div
        className={`preserve-3d ${PANEL_SHADOW}`}
        style={{
          rotateX: 7,
          rotateY: reduce ? -12 * dir : spin,
          y: reduce ? 0 : drift,
        }}
        initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={VIEW}
        transition={{ duration: 0.65, ease: EASE_SNAPPY }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** A card that floats in front of the main panel — the actual 3D cue. */
function FloatingChip({
  children,
  className,
  z = 70,
}: {
  children: React.ReactNode;
  className?: string;
  z?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`absolute rounded-2xl bg-white border border-border shadow-[0_18px_36px_-10px_rgba(15,23,42,0.30)] ${className ?? ""}`}
      style={{ transform: `translateZ(${z}px)` }}
      initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={VIEW}
      transition={{ duration: 0.5, delay: 0.35, ease: EASE_SNAPPY }}
    >
      {children}
    </motion.div>
  );
}

/* Shared SVG bits ---------------------------------------------------- */

const C = {
  ink: "#0F172A",
  line: "#E2E8F0",
  blue: "#1672B8",
  blueSoft: "#B4D2E8",
  blueFaint: "#E3EEF6",
  accent: "#F97316",
  muted: "#94A3B8",
};

function PanelFrame({ w, h, title = 3 }: { w: number; h: number; title?: number }) {
  return (
    <>
      <rect x="0" y="0" width={w} height={h} rx="16" fill="#fff" />
      <rect x="0" y="0" width={w} height={h} rx="16" fill="none" stroke={C.line} strokeWidth="1.5" />
      <path d={`M0 42h${w}`} stroke={C.line} strokeWidth="1.5" />
      {Array.from({ length: title }).map((_, i) => (
        <circle key={i} cx={20 + i * 14} cy={21} r="4" fill={i === 0 ? C.accent : C.line} />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ *
 * 1 · KPI board — the market opportunity chapter.
 * ------------------------------------------------------------------ */

export function KpiBoard({ flip, className }: { flip?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  const bars = [26, 34, 30, 44, 52, 66, 78];

  return (
    <Stage flip={flip} className={className}>
      <div className="preserve-3d relative">
        <svg viewBox="0 0 420 300" className="w-full h-auto">
          <PanelFrame w={420} h={300} />

          {/* KPI tiles */}
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${20 + i * 128}, 60)`}>
              <rect width="116" height="76" rx="10" fill={C.blueFaint} />
              <rect x="14" y="16" width={i === 2 ? 46 : 58} height="14" rx="4" fill={i === 2 ? C.accent : C.blue} />
              <rect x="14" y="38" width="72" height="7" rx="3.5" fill={C.blueSoft} />
              <rect x="14" y="52" width="46" height="7" rx="3.5" fill={C.line} />
            </g>
          ))}

          {/* Trend area + line */}
          <g transform="translate(20, 158)">
            <rect width="244" height="122" rx="10" fill="#fff" stroke={C.line} strokeWidth="1.2" />
            <path d="M16 96h212" stroke={C.line} strokeWidth="1.2" />
            <motion.path
              d="M16 84 L52 70 L88 76 L124 52 L160 58 L196 30 L228 20"
              fill="none"
              stroke={C.blue}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={VIEW}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            />
            <path
              d="M16 84 L52 70 L88 76 L124 52 L160 58 L196 30 L228 20 L228 96 L16 96 Z"
              fill={C.blue}
              opacity="0.10"
            />
            <circle cx="228" cy="20" r="5" fill={C.accent} />
          </g>

          {/* Side bars */}
          <g transform="translate(280, 158)">
            <rect width="120" height="122" rx="10" fill="#fff" stroke={C.line} strokeWidth="1.2" />
            {bars.map((b, i) => (
              <motion.rect
                key={i}
                x={14 + i * 14}
                width="9"
                rx="3"
                fill={i === bars.length - 1 ? C.accent : C.blueSoft}
                initial={reduce ? { height: b, y: 104 - b } : { height: 0, y: 104 }}
                whileInView={{ height: b, y: 104 - b }}
                viewport={VIEW}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.05, ease: EASE_SNAPPY }}
              />
            ))}
          </g>
        </svg>

        <FloatingChip className="w-[130px] p-3 -right-5 top-24" z={82}>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-lg bg-accent/15 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-accent" fill="none">
                <path d="M5 15l5-5 4 4 5-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="h-2 w-10 rounded-full bg-border" />
          </div>
          <span className="block h-3.5 w-16 rounded bg-primary mb-1.5" />
          <span className="block h-2 w-12 rounded-full bg-border" />
        </FloatingChip>
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ *
 * 2 · Query grid — the curriculum chapter (Excel → SQL).
 * ------------------------------------------------------------------ */

export function QueryGrid({ flip, className }: { flip?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  const rows = 6;
  const cols = [56, 96, 74, 62];

  return (
    <Stage flip={flip} className={className}>
      <div className="preserve-3d relative">
        <svg viewBox="0 0 420 300" className="w-full h-auto">
          <PanelFrame w={420} h={300} />

          {/* Query bar */}
          <g transform="translate(20, 58)">
            <rect width="380" height="34" rx="8" fill={C.blueFaint} />
            <rect x="12" y="13" width="30" height="8" rx="4" fill={C.blue} />
            <rect x="50" y="13" width="52" height="8" rx="4" fill={C.blueSoft} />
            <rect x="110" y="13" width="24" height="8" rx="4" fill={C.accent} />
            <rect x="142" y="13" width="64" height="8" rx="4" fill={C.blueSoft} />
            <rect x="214" y="13" width="38" height="8" rx="4" fill={C.line} />
          </g>

          {/* Result grid: header + rows */}
          <g transform="translate(20, 108)">
            <rect width="380" height="30" rx="6" fill={C.blue} opacity="0.12" />
            {cols.reduce<React.ReactNode[]>((acc, w, i) => {
              const x = 14 + cols.slice(0, i).reduce((s, c) => s + c + 22, 0);
              acc.push(<rect key={i} x={x} y="11" width={w} height="8" rx="4" fill={C.blue} opacity="0.75" />);
              return acc;
            }, [])}

            {Array.from({ length: rows }).map((_, r) => {
              const highlighted = r === 3;
              return (
                <motion.g
                  key={r}
                  initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEW}
                  transition={{ duration: 0.4, delay: 0.2 + r * 0.07, ease: EASE_SNAPPY }}
                >
                  <rect
                    y={36 + r * 24}
                    width="380"
                    height="20"
                    rx="5"
                    fill={highlighted ? C.accent : C.line}
                    opacity={highlighted ? 0.16 : 0.35}
                  />
                  {cols.map((w, i) => {
                    const x = 14 + cols.slice(0, i).reduce((s, c) => s + c + 22, 0);
                    return (
                      <rect
                        key={i}
                        x={x}
                        y={42 + r * 24}
                        width={i === 0 ? w * 0.6 : w * (0.5 + ((r + i) % 3) * 0.2)}
                        height="7"
                        rx="3.5"
                        fill={highlighted && i === cols.length - 1 ? C.accent : C.muted}
                        opacity={highlighted && i === cols.length - 1 ? 0.9 : 0.55}
                      />
                    );
                  })}
                </motion.g>
              );
            })}
          </g>
        </svg>

        <FloatingChip className="w-[150px] p-3.5 -left-6 bottom-6" z={78}>
          <span className="block h-2 w-14 rounded-full bg-border mb-2.5" />
          <div className="flex items-end gap-1.5 h-10">
            {[40, 62, 30, 78, 54].map((h, i) => (
              <span
                key={i}
                className={`flex-1 rounded-sm ${i === 3 ? "bg-accent" : "bg-primary/35"}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </FloatingChip>
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ *
 * 3 · BI dashboard — the "what you'll build" chapter.
 * ------------------------------------------------------------------ */

export function DashboardPanel({ flip, className }: { flip?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  const bars = [38, 56, 46, 72, 60, 88];
  // Donut geometry: r=34 → circumference ≈ 213.6, split into three arcs.
  const R = 34;
  const CIRC = 2 * Math.PI * R;

  return (
    <Stage flip={flip} className={className}>
      <div className="preserve-3d relative">
        <svg viewBox="0 0 420 300" className="w-full h-auto">
          <PanelFrame w={420} h={300} />

          {/* Sidebar */}
          <g transform="translate(16, 56)">
            <rect width="74" height="228" rx="10" fill={C.blueFaint} />
            {[0, 1, 2, 3].map((i) => (
              <g key={i} transform={`translate(12, ${16 + i * 30})`}>
                <rect width="12" height="12" rx="3.5" fill={i === 0 ? C.blue : C.blueSoft} />
                <rect x="18" y="3" width={i === 0 ? 34 : 28} height="6" rx="3" fill={i === 0 ? C.blue : C.blueSoft} />
              </g>
            ))}
          </g>

          {/* Bar chart card */}
          <g transform="translate(100, 56)">
            <rect width="186" height="126" rx="10" fill="#fff" stroke={C.line} strokeWidth="1.2" />
            <rect x="14" y="14" width="58" height="7" rx="3.5" fill={C.muted} opacity="0.6" />
            <path d="M14 104h158" stroke={C.line} strokeWidth="1.2" />
            {bars.map((b, i) => (
              <motion.rect
                key={i}
                x={22 + i * 26}
                width="14"
                rx="4"
                fill={i === bars.length - 1 ? C.accent : C.blue}
                opacity={i === bars.length - 1 ? 1 : 0.75}
                initial={reduce ? { height: b, y: 104 - b } : { height: 0, y: 104 }}
                whileInView={{ height: b, y: 104 - b }}
                viewport={VIEW}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.06, ease: EASE_SNAPPY }}
              />
            ))}
          </g>

          {/* Donut card */}
          <g transform="translate(296, 56)">
            <rect width="108" height="126" rx="10" fill="#fff" stroke={C.line} strokeWidth="1.2" />
            <g transform="translate(54, 66)">
              <circle r={R} fill="none" stroke={C.blueFaint} strokeWidth="14" />
              <motion.circle
                r={R}
                fill="none"
                stroke={C.blue}
                strokeWidth="14"
                strokeLinecap="round"
                transform="rotate(-90)"
                strokeDasharray={`${CIRC * 0.46} ${CIRC}`}
                initial={reduce ? { strokeDashoffset: 0 } : { strokeDashoffset: CIRC * 0.46 }}
                whileInView={{ strokeDashoffset: 0 }}
                viewport={VIEW}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              />
              <motion.circle
                r={R}
                fill="none"
                stroke={C.accent}
                strokeWidth="14"
                strokeLinecap="round"
                transform="rotate(75)"
                strokeDasharray={`${CIRC * 0.22} ${CIRC}`}
                initial={reduce ? { strokeDashoffset: 0 } : { strokeDashoffset: CIRC * 0.22 }}
                whileInView={{ strokeDashoffset: 0 }}
                viewport={VIEW}
                transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
              />
            </g>
          </g>

          {/* Wide trend card */}
          <g transform="translate(100, 194)">
            <rect width="304" height="90" rx="10" fill="#fff" stroke={C.line} strokeWidth="1.2" />
            <path
              d="M16 62 L60 46 L104 54 L148 28 L192 38 L236 18 L286 26 L286 74 L16 74 Z"
              fill={C.blue}
              opacity="0.10"
            />
            <motion.path
              d="M16 62 L60 46 L104 54 L148 28 L192 38 L236 18 L286 26"
              fill="none"
              stroke={C.blue}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={VIEW}
              transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            />
            <circle cx="236" cy="18" r="5" fill={C.accent} />
          </g>
        </svg>

        <FloatingChip className="w-[142px] p-3.5 -right-7 -top-6" z={90}>
          <div className="flex items-center justify-between mb-2.5">
            <span className="h-2 w-12 rounded-full bg-border" />
            <span className="text-[10px] font-bold text-accent">▲</span>
          </div>
          <span className="block h-4 w-20 rounded bg-primary mb-2" />
          <svg viewBox="0 0 100 24" className="w-full h-5 text-accent">
            <path d="M2 20 L20 12 L38 16 L56 6 L74 10 L98 3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </FloatingChip>
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ *
 * 4 · Conversion funnel — the proof chapter.
 * ------------------------------------------------------------------ */

export function FunnelChart({ flip, className }: { flip?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  const steps = [
    { w: 340, fill: C.blue, o: 0.85 },
    { w: 282, fill: C.blue, o: 0.62 },
    { w: 222, fill: C.blue, o: 0.42 },
    { w: 164, fill: C.accent, o: 0.9 },
  ];

  return (
    <Stage flip={flip} className={className}>
      <div className="preserve-3d relative">
        <svg viewBox="0 0 420 300" className="w-full h-auto">
          <PanelFrame w={420} h={300} />

          {steps.map((s, i) => {
            const y = 68 + i * 54;
            return (
              <motion.g
                key={i}
                initial={reduce ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.6 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={VIEW}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: EASE_SNAPPY }}
                style={{ transformBox: "view-box", transformOrigin: "210px 50%" }}
              >
                <rect x={210 - s.w / 2} y={y} width={s.w} height="38" rx="8" fill={s.fill} opacity={s.o} />
                <rect x={210 - s.w / 2 + 16} y={y + 15} width="54" height="8" rx="4" fill="#fff" opacity="0.75" />
                <rect x={210 + s.w / 2 - 52} y={y + 15} width="34" height="8" rx="4" fill="#fff" opacity="0.55" />
              </motion.g>
            );
          })}

          {/* Drop-off connectors */}
          {steps.slice(0, -1).map((s, i) => {
            const y = 68 + i * 54 + 38;
            const next = steps[i + 1];
            return (
              <path
                key={i}
                d={`M${210 - s.w / 2} ${y} L${210 - next.w / 2} ${y + 16} M${210 + s.w / 2} ${y} L${210 + next.w / 2} ${y + 16}`}
                stroke={C.line}
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            );
          })}
        </svg>

        <FloatingChip className="w-[136px] p-3.5 -left-7 bottom-10" z={84}>
          <span className="block h-2 w-10 rounded-full bg-border mb-2.5" />
          <div className="flex items-baseline gap-1.5">
            <span className="block h-5 w-12 rounded bg-accent" />
            <span className="block h-2 w-6 rounded-full bg-border" />
          </div>
        </FloatingChip>
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ *
 * 5 · Activity heatmap — the format/schedule chapter.
 * ------------------------------------------------------------------ */

const HEAT = [
  [0, 1, 2, 1, 3, 2, 0, 1, 2, 3, 1, 0],
  [1, 2, 3, 2, 1, 3, 2, 3, 1, 2, 3, 1],
  [2, 3, 1, 3, 2, 1, 3, 2, 3, 1, 2, 3],
  [0, 1, 2, 1, 3, 2, 1, 3, 2, 3, 1, 2],
  [1, 0, 1, 2, 1, 3, 2, 1, 3, 2, 0, 1],
];

const HEAT_FILL = [C.blueFaint, C.blueSoft, "#5FA3D0", C.blue];

export function Heatmap({ flip, className }: { flip?: boolean; className?: string }) {
  const reduce = useReducedMotion();

  return (
    <Stage flip={flip} className={className}>
      <div className="preserve-3d relative">
        <svg viewBox="0 0 420 300" className="w-full h-auto">
          <PanelFrame w={420} h={300} />

          <g transform="translate(28, 70)">
            {HEAT.map((row, r) =>
              row.map((v, c) => (
                <motion.rect
                  key={`${r}-${c}`}
                  x={c * 31}
                  y={r * 31}
                  width="25"
                  height="25"
                  rx="6"
                  fill={r === 2 && c === 9 ? C.accent : HEAT_FILL[v]}
                  initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={VIEW}
                  transition={{
                    duration: 0.35,
                    delay: 0.1 + (r + c) * 0.025,
                    ease: EASE_SNAPPY,
                  }}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                />
              ))
            )}
          </g>

          {/* Legend */}
          <g transform="translate(28, 244)">
            <rect width="42" height="7" rx="3.5" fill={C.muted} opacity="0.45" />
            {HEAT_FILL.map((f, i) => (
              <rect key={i} x={250 + i * 22} y="-4" width="15" height="15" rx="4" fill={f} />
            ))}
          </g>
        </svg>

        <FloatingChip className="w-[128px] p-3.5 -right-6 top-10" z={80}>
          <span className="block h-2 w-12 rounded-full bg-border mb-2.5" />
          <div className="grid grid-cols-4 gap-1.5">
            {[0, 1, 2, 3, 1, 2, 3, 2].map((v, i) => (
              <span
                key={i}
                className="aspect-square rounded-[3px]"
                style={{ background: i === 5 ? C.accent : HEAT_FILL[v] }}
              />
            ))}
          </div>
        </FloatingChip>
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ *
 * 6 · Payment schedule — the investment chapter.
 * ------------------------------------------------------------------ */

export function PaymentSchedule({ flip, className }: { flip?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  const months = 6;

  return (
    <Stage flip={flip} className={className}>
      <div className="preserve-3d relative">
        <svg viewBox="0 0 420 300" className="w-full h-auto">
          <PanelFrame w={420} h={300} />

          {/* Total bar, then the equal instalments it breaks into */}
          <g transform="translate(28, 66)">
            <rect width="364" height="42" rx="10" fill={C.blue} opacity="0.14" />
            <rect x="16" y="17" width="70" height="8" rx="4" fill={C.blue} />
            <rect x="292" y="17" width="56" height="8" rx="4" fill={C.blue} opacity="0.6" />
          </g>

          <path d="M210 118 L210 132" stroke={C.line} strokeWidth="1.5" strokeDasharray="3 3" />

          <g transform="translate(28, 140)">
            {Array.from({ length: months }).map((_, i) => (
              <motion.g
                key={i}
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEW}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.07, ease: EASE_SNAPPY }}
              >
                <rect
                  x={i * 61}
                  y="0"
                  width="52"
                  height="76"
                  rx="10"
                  fill={i === 0 ? C.accent : C.blueFaint}
                  opacity={i === 0 ? 0.22 : 1}
                />
                <rect
                  x={i * 61 + 12}
                  y="16"
                  width="28"
                  height="8"
                  rx="4"
                  fill={i === 0 ? C.accent : C.blue}
                  opacity={i === 0 ? 1 : 0.7}
                />
                <rect x={i * 61 + 12} y="34" width="20" height="6" rx="3" fill={C.muted} opacity="0.5" />
                <rect x={i * 61 + 12} y="48" width="28" height="16" rx="5" fill={i === 0 ? C.accent : C.blueSoft} opacity={i === 0 ? 0.9 : 1} />
              </motion.g>
            ))}
          </g>

          <g transform="translate(28, 240)">
            <rect width="364" height="34" rx="9" fill={C.blueFaint} />
            <rect x="16" y="13" width="88" height="8" rx="4" fill={C.blue} opacity="0.65" />
            <rect x="286" y="13" width="62" height="8" rx="4" fill={C.accent} />
          </g>
        </svg>

        <FloatingChip className="w-[132px] p-3.5 -left-6 top-8" z={82}>
          <span className="block h-2 w-10 rounded-full bg-border mb-2" />
          <span className="block h-5 w-20 rounded bg-accent mb-2" />
          <span className="block h-2 w-14 rounded-full bg-border" />
        </FloatingChip>
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ *
 * Tilt card — springy, pointer-tracked depth on a surface.
 * ------------------------------------------------------------------ */

/**
 * Leans a card toward the cursor. Springs rather than transitions so the card
 * can be redirected mid-motion and always settles from wherever it currently
 * is. Mouse only: a coarse pointer fires a phantom hover on tap, which would
 * leave a card stuck at an angle after a touch.
 */
export function TiltCard({
  children,
  className,
  max = 9,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const spring = { stiffness: 240, damping: 24, mass: 0.6 };
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);

  const handleMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rotateY.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
    rotateX.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div ref={ref} className="scene-near h-full" onPointerMove={handleMove} onPointerLeave={reset}>
      <motion.div className={`preserve-3d h-full ${className ?? ""}`} style={{ rotateX, rotateY }}>
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Data horizon — the closing section's ground plane.
 * ------------------------------------------------------------------ */

/**
 * A full-bleed trend line that sits on the section's bottom edge, with an axis
 * of ticks beneath it and a soft area fill below.
 *
 * This replaced an isometric bar chart parked at `-left-10 bottom-0`: a solid,
 * half-cropped object anchored to one corner of an otherwise centred
 * composition, with nothing balancing it on the right. It read as a stray
 * decoration that had drifted into frame rather than part of the layout.
 *
 * The fix is to stop treating the artwork as an object and make it structure —
 * it spans the full width, hugs the bottom edge, and stays far enough below the
 * text in contrast that it never competes for the eye. The growth story
 * survives (the line still climbs, and its last point is the accent), but as
 * the ground the call to action stands on.
 *
 * `slice` keeps the curve undistorted while filling any width — `none` would
 * stretch the stroke thin on desktop and fat on mobile.
 */
export function DataHorizon({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  // Gentle climb across the full width, flattening near the right so the line
  // resolves rather than shooting off the edge.
  const points = [
    [0, 190],
    [180, 184],
    [360, 172],
    [540, 176],
    [720, 158],
    [900, 146],
    [1080, 138],
    [1260, 124],
    [1440, 118],
  ] as const;

  // Catmull-Rom-ish smoothing: a cubic per span with horizontal control points,
  // which keeps the curve tangent-continuous without a spline library.
  const line = points
    .map(([x, y], i) => {
      if (i === 0) return `M${x},${y}`;
      const [px, py] = points[i - 1];
      const cx = (px + x) / 2;
      return `C${cx},${py} ${cx},${y} ${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 1440 220"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="horizon-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        {/* White only. Orange is this page's call-to-action colour and nothing
            else on the section may borrow it, or the button stops being the
            one thing the eye goes to. */}
        <linearGradient id="horizon-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.10" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.38" />
        </linearGradient>
      </defs>

      {/* Axis ticks — evenly spaced the whole way across, so the element is
          symmetric even though the line it carries is not. */}
      <g stroke="#fff" strokeOpacity="0.12" strokeWidth="1.5" strokeLinecap="round">
        {Array.from({ length: 25 }, (_, i) => {
          const x = i * 60;
          const major = i % 4 === 0;
          return <line key={i} x1={x} y1={200} x2={x} y2={major ? 186 : 193} />;
        })}
      </g>
      <line x1="0" y1="200" x2="1440" y2="200" stroke="#fff" strokeOpacity="0.14" strokeWidth="1.5" />

      <motion.path
        d={`${line} L1440,200 L0,200 Z`}
        fill="url(#horizon-fill)"
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEW}
        transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }}
      />

      <motion.path
        d={line}
        fill="none"
        stroke="url(#horizon-stroke)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={VIEW}
        transition={{ duration: 1.5, ease: EASE_SNAPPY }}
      />

      {/* No data points. Dotting the vertices turned a quiet backdrop into a
          chart the eye tried to read, and pulled attention to the right edge
          and away from the buttons. */}
    </svg>
  );
}
