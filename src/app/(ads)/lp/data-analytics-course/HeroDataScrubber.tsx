"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
  type AnimationPlaybackControls,
} from "framer-motion";

/**
 * The hero's interactive piece: drag the divider to wipe a raw, dirty dataset
 * into the dashboard it becomes.
 *
 * It exists to do one job — make someone want to keep going. It states the
 * course's actual promise ("raw data doesn't create value on its own") as
 * something you do rather than something you read, and the moment you've
 * played with it the obvious next question is *how do I learn that*, which is
 * exactly what the chapter below answers. The scroll cue underneath makes that
 * next step explicit.
 *
 * Built on `clip-path: inset()` — the two layers are always both mounted and
 * full-width, so the wipe is a single GPU-composited property change with no
 * layout and no DOM churn while dragging.
 */

// Each row is a set of cell fill widths (%). `dirty` marks the cells rendered
// as missing/at-fault values — the mess the right-hand side resolves.
const RAW_ROWS = [
  { cells: [72, 48, 90, 34, 64], dirty: [2] },
  { cells: [55, 82, 40, 76, 50], dirty: [] },
  { cells: [88, 36, 62, 44, 80], dirty: [1, 3] },
  { cells: [42, 70, 55, 92, 38] , dirty: [] },
  { cells: [66, 58, 78, 30, 70], dirty: [4] },
];

const BARS = [34, 52, 41, 68, 57, 79, 64, 88, 74, 96];

export default function HeroDataScrubber() {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<AnimationPlaybackControls | null>(null);
  const [pctLabel, setPctLabel] = useState(50);

  const pct = useMotionValue(50);
  // Stiff enough to feel 1:1 under the finger — the spring is here so the
  // intro hint and keyboard steps glide instead of teleporting, not to add
  // lag between the pointer and the divider.
  const smooth = useSpring(pct, { stiffness: 900, damping: 60, mass: 0.35 });

  const clip = useTransform(smooth, (v) => `inset(0 ${100 - v}% 0 0)`);
  const dividerLeft = useTransform(smooth, (v) => `${v}%`);
  const rawLabelOpacity = useTransform(smooth, [12, 42], [0.4, 1]);
  const insightLabelOpacity = useTransform(smooth, [58, 88], [1, 0.4]);

  useMotionValueEvent(smooth, "change", (v) => setPctLabel(Math.round(v)));

  // A single unprompted sweep on load: without it the divider reads as a
  // decorative seam and nobody discovers it can be moved.
  useEffect(() => {
    if (reduce) return;
    hintRef.current = animate(pct, [50, 78, 28, 52], {
      duration: 2.6,
      times: [0, 0.34, 0.72, 1],
      ease: [0.23, 1, 0.32, 1],
      delay: 1,
    });
    return () => hintRef.current?.stop();
  }, [pct, reduce]);

  const stopHint = () => {
    hintRef.current?.stop();
    hintRef.current = null;
  };

  const setFromClientX = (clientX: number) => {
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    pct.set(Math.max(2, Math.min(98, next)));
  };

  // Drag lives on the handle alone. Making the whole panel `touch-action: none`
  // would trap vertical swipes on phones — on a page whose entire goal is to
  // get the visitor scrolling, that is the one thing not to break.
  const handlePointerDown = (e: React.PointerEvent) => {
    stopHint();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!(e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) return;
    setFromClientX(e.clientX);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 12 : 5;
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      stopHint();
      pct.set(Math.max(2, Math.min(98, pct.get() + (e.key === "ArrowRight" ? step : -step))));
    }
  };

  return (
    <div className="w-full">
      <div
        ref={panelRef}
        onPointerDown={(e) => {
          // A tap anywhere jumps the divider; only the handle captures a drag.
          stopHint();
          setFromClientX(e.clientX);
        }}
        className="relative h-[188px] sm:h-[210px] rounded-2xl overflow-hidden border border-white/15 bg-white/[0.06] backdrop-blur-md select-none cursor-ew-resize"
      >
        {/* ---- Base layer: the insight ---- */}
        <div className="absolute inset-0 flex items-end gap-[3px] sm:gap-1.5 px-5 pb-5 pt-12 bg-white/[0.03]">
          {BARS.map((h, i) => (
            <motion.div
              key={i}
              className={`flex-1 rounded-t-[3px] ${i >= BARS.length - 3 ? "bg-accent" : "bg-white/45"}`}
              initial={reduce ? { height: `${h}%` } : { height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.045, ease: [0.23, 1, 0.32, 1] }}
            />
          ))}
          {/* Wrapped rather than positioned directly: an absolutely positioned
              <svg> with a viewBox is a replaced element, so its intrinsic 1:1
              ratio wins over `bottom` and it renders as tall as it is wide —
              which threw the trend line clean out of the panel. The wrapper
              owns the box; the svg just fills it. */}
          {/* Revealed with clip-path rather than a pathLength draw-on. Under
              `preserveAspectRatio="none"` the horizontal scale is ~8× the
              vertical, which stretches a stroke-dasharray unevenly and breaks
              the line into visible segments. Wiping the wrapper gives the same
              left-to-right reveal and leaves the geometry alone.
              Points trace the bar tops: x = 5 + i·10, y = 100 − BARS[i]. */}
          <motion.div
            className="absolute inset-x-5 top-12 bottom-5 pointer-events-none"
            initial={reduce ? { clipPath: "inset(0 0 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }}
          >
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full" aria-hidden="true">
              <path
                d="M5,66 L15,48 L25,59 L35,32 L45,43 L55,21 L65,36 L75,12 L85,26 L95,4"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                opacity="0.85"
              />
            </svg>
          </motion.div>
        </div>

        {/* ---- Overlay layer: the raw data, clipped to the left of the divider ----
             Opaque, not glass: left transparent the chart behind bled through the
             table and the divider stopped reading as a before/after boundary. */}
        <motion.div
          className="absolute inset-0 px-5 pb-5 pt-12 bg-[#0d2340]"
          style={{ clipPath: clip }}
        >
          <div className="h-full flex flex-col justify-between">
            {/* header row */}
            <div className="flex gap-2.5">
              {[38, 30, 34, 26, 32].map((w, i) => (
                <div key={i} className="flex-1">
                  <span className="block h-1.5 rounded-full bg-white/55" style={{ width: `${w + 22}%` }} />
                </div>
              ))}
            </div>
            {RAW_ROWS.map((row, r) => (
              <div key={r} className="flex gap-2.5">
                {row.cells.map((w, c) => (
                  <div key={c} className="flex-1">
                    <span
                      className={`block h-1.5 rounded-full ${
                        row.dirty.includes(c) ? "bg-accent/70" : "bg-white/22"
                      }`}
                      style={{ width: `${row.dirty.includes(c) ? 26 : w}%` }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ---- Labels ---- */}
        <motion.span
          className="absolute top-4 left-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80"
          style={{ opacity: rawLabelOpacity }}
        >
          Raw data
        </motion.span>
        <motion.span
          className="absolute top-4 right-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent"
          style={{ opacity: insightLabelOpacity }}
        >
          Insight
        </motion.span>

        {/* ---- Divider + handle ---- */}
        <motion.div className="absolute top-0 bottom-0 w-px bg-white/70" style={{ left: dividerLeft }}>
          <div
            role="slider"
            tabIndex={0}
            aria-label="Reveal how raw data becomes a dashboard"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pctLabel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onKeyDown={handleKeyDown}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center touch-none cursor-ew-resize focus:outline-none group"
          >
            <span className="w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center transition-transform duration-150 ease-snappy group-active:scale-90 group-focus-visible:ring-2 group-focus-visible:ring-accent group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-transparent">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-text-primary" fill="none" aria-hidden="true">
                <path
                  d="M9.5 8.5L6 12l3.5 3.5M14.5 8.5L18 12l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </motion.div>
      </div>

      <p className="mt-3 text-xs text-white/45 text-center">
        Drag to turn a messy dataset into the dashboard it becomes — that&apos;s the job.
      </p>
    </div>
  );
}
