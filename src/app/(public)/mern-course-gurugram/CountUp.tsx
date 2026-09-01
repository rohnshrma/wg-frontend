"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

// Counts a stat value up from zero the first time it scrolls into view.
// Handles the trust-bar formats "300+", "4.8★", "15", "100%" by splitting
// off a non-numeric prefix/suffix and animating only the number. Reduced
// motion (or a non-numeric value) just shows the final string. All state
// updates happen inside the rAF callback — never synchronously in the
// effect body.
const PARTS = /^(\D*)([\d.]+)(\D*)$/;

export default function CountUp({ value, durationMs = 1100 }: { value: string; durationMs?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const parsed = useMemo(() => {
    const m = value.match(PARTS);
    if (!m) return null;
    const decimals = m[2].includes(".") ? (m[2].split(".")[1]?.length ?? 0) : 0;
    return { prefix: m[1], target: parseFloat(m[2]), suffix: m[3], decimals };
  }, [value]);

  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!parsed || reduce || !inView) return;
    const { prefix, target, suffix, decimals } = parsed;
    const start = performance.now();
    let raf = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      const n = (t < 1 ? target * eased : target).toFixed(decimals);
      setDisplay(`${prefix}${n}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed, reduce, durationMs]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
