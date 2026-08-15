"use client";

import { useId } from "react";

/**
 * Custom abstract-geometric illustrations for the hero cards. Hand-built from
 * native SVG primitives (no icon fonts, no images) so they read as designed
 * marks rather than stock iconography. Each composition is layered white
 * shapes at varying opacity over the card's own gradient background — the
 * opacity does the depth work instead of drop shadows.
 */

export function PerformanceGraphic() {
  return (
    <svg viewBox="0 0 200 200" className="w-24 h-24" aria-hidden="true">
      <polygon points="40,150 90,150 60,110 20,110" fill="white" opacity="0.25" />
      <polygon points="70,120 120,120 90,80 50,80" fill="white" opacity="0.45" />
      <polygon points="100,90 150,90 120,50 90,50" fill="white" opacity="0.7" />
      <polygon points="128,58 150,30 158,58" fill="white" opacity="0.95" />
    </svg>
  );
}

export function GrowthGraphic() {
  return (
    <svg viewBox="0 0 200 200" className="w-24 h-24" aria-hidden="true">
      <rect x="35" y="120" width="24" height="40" rx="4" fill="white" opacity="0.35" />
      <rect x="75" y="95" width="24" height="65" rx="4" fill="white" opacity="0.55" />
      <rect x="115" y="65" width="24" height="95" rx="4" fill="white" opacity="0.75" />
      <rect x="155" y="40" width="24" height="120" rx="4" fill="white" opacity="0.95" />
      <circle cx="167" cy="30" r="8" fill="white" />
    </svg>
  );
}

export function TargetGraphic() {
  return (
    <svg viewBox="0 0 200 200" className="w-24 h-24" aria-hidden="true">
      <circle cx="100" cy="100" r="70" fill="none" stroke="white" strokeWidth="3" opacity="0.3" />
      <circle cx="100" cy="100" r="48" fill="none" stroke="white" strokeWidth="3" opacity="0.5" />
      <circle cx="100" cy="100" r="26" fill="none" stroke="white" strokeWidth="3" opacity="0.75" />
      <circle cx="112" cy="88" r="10" fill="white" />
    </svg>
  );
}

export function DesignGraphic() {
  const id = useId();
  return (
    <svg viewBox="0 0 200 200" className="w-24 h-24" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0.9" />
          <stop offset="1" stopColor="white" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <circle cx="80" cy="80" r="42" fill="white" opacity="0.35" />
      <polygon points="140,50 175,120 105,120" fill="white" opacity="0.55" />
      <rect x="90" y="95" width="60" height="60" rx="10" fill={`url(#${id}-a)`} />
    </svg>
  );
}
