/**
 * Hand-drawn icon set for the Data Analytics landing page.
 *
 * Replaces the generic lucide glyphs with a single consistent family drawn the
 * way Apple draws SF Symbols: one 24×24 optical grid, one stroke weight, round
 * caps and joins everywhere, and geometry built from circles/rounded rects
 * rather than incidental line art. Because every glyph shares a grid and a
 * weight, they read as one system instead of a pile of borrowed icons.
 *
 * Weight is exposed so a glyph can be optically corrected at small sizes
 * (hairline strokes disappear under ~16px) without redrawing it.
 */
type IconProps = {
  className?: string;
  /** Stroke weight on the 24-unit grid. 1.7 is the family default. */
  weight?: number;
};

function Svg({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** Spreadsheet / tabular data — Excel & data fundamentals. */
export function IconTable({ className, weight = 1.7 }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3" y="4.5" width="18" height="15" rx="3" stroke="currentColor" strokeWidth={weight} />
      <path d="M3 9.5h18M9.5 9.5v10" stroke="currentColor" strokeWidth={weight} />
    </Svg>
  );
}

/** Stacked platters — relational databases & SQL. */
export function IconDatabase({ className, weight = 1.7 }: IconProps) {
  return (
    <Svg className={className}>
      <ellipse cx="12" cy="6" rx="7" ry="2.8" stroke="currentColor" strokeWidth={weight} />
      <path d="M5 6v6c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8V6" stroke="currentColor" strokeWidth={weight} />
      <path d="M5 12v6c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8v-6" stroke="currentColor" strokeWidth={weight} />
    </Svg>
  );
}

/** Prompt chevron and caret — Python, Pandas & code. */
export function IconTerminal({ className, weight = 1.7 }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="2.5" y="4" width="19" height="16" rx="3.5" stroke="currentColor" strokeWidth={weight} />
      <path d="M7.5 10l2.5 2.4-2.5 2.4M12.75 15.2h4" stroke="currentColor" strokeWidth={weight} />
    </Svg>
  );
}

/** Normal distribution over an axis — statistics & advanced analytics. */
export function IconDistribution({ className, weight = 1.7 }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M3 19h18" stroke="currentColor" strokeWidth={weight} />
      <path
        d="M3.5 16.5c3 0 3.2-9.5 8.5-9.5s5.5 9.5 8.5 9.5"
        stroke="currentColor"
        strokeWidth={weight}
      />
    </Svg>
  );
}

/** Ascending series — Power BI, Tableau & dashboards. */
export function IconChartBar({ className, weight = 1.7 }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M3.5 20h17" stroke="currentColor" strokeWidth={weight} />
      <path
        d="M7 20v-4.5M12 20V9.5M17 20V5.5"
        stroke="currentColor"
        strokeWidth={weight + 0.5}
      />
    </Svg>
  );
}

/** Offset documents — flexible-schema collections, MongoDB. */
export function IconLayers({ className, weight = 1.7 }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M12 3.5l8 4.2-8 4.2-8-4.2 8-4.2Z"
        stroke="currentColor"
        strokeWidth={weight}
      />
      <path d="M4 12.2l8 4.2 8-4.2M4 16.4l8 4.2 8-4.2" stroke="currentColor" strokeWidth={weight} />
    </Svg>
  );
}

/** Confirmation mark in a ring — the page's single affirmative glyph. */
export function IconCheck({ className, weight = 1.7 }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8.75" stroke="currentColor" strokeWidth={weight} />
      <path d="M8.2 12.3l2.7 2.6 5-5.4" stroke="currentColor" strokeWidth={weight + 0.15} />
    </Svg>
  );
}

/** Bare check, no ring — for dense lists where a ring would add noise. */
export function IconCheckMini({ className, weight = 1.9 }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M5 12.5l4.2 4.2L19 7" stroke="currentColor" strokeWidth={weight} />
    </Svg>
  );
}

/** Handset — the call CTA. */
export function IconPhone({ className, weight = 1.7 }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M8.4 3.8c.6 0 1.1.36 1.32.92l1.05 2.72c.2.53.07 1.13-.34 1.52l-1.2 1.13a12.4 12.4 0 0 0 4.66 4.66l1.13-1.2c.39-.41.99-.54 1.52-.34l2.72 1.05c.56.22.92.72.92 1.32v2.6c0 .87-.73 1.58-1.6 1.5C10.98 20.9 3.1 13.02 2.3 4.4c-.08-.87.63-1.6 1.5-1.6h4.6Z"
        stroke="currentColor"
        strokeWidth={weight}
      />
    </Svg>
  );
}

/** Tray with a down arrow — Apple's download idiom. */
export function IconDownload({ className, weight = 1.7 }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 3.5v10.5m0 0l3.6-3.6M12 14l-3.6-3.6" stroke="currentColor" strokeWidth={weight} />
      <path
        d="M4.5 15.5v2.2a2.8 2.8 0 0 0 2.8 2.8h9.4a2.8 2.8 0 0 0 2.8-2.8v-2.2"
        stroke="currentColor"
        strokeWidth={weight}
      />
    </Svg>
  );
}

/** Forward arrow — every "continue" affordance on the page. */
export function IconArrowRight({ className, weight = 1.7 }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 12h15.5m0 0l-5.2-5.2M19.5 12l-5.2 5.2" stroke="currentColor" strokeWidth={weight} />
    </Svg>
  );
}

/** Disclosure chevron — FAQ rows. */
export function IconChevronDown({ className, weight = 1.9 }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M6 9.5l6 5.6 6-5.6" stroke="currentColor" strokeWidth={weight} />
    </Svg>
  );
}

/** Dismiss — modal close. */
export function IconClose({ className, weight = 1.9 }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" stroke="currentColor" strokeWidth={weight} />
    </Svg>
  );
}

/** Map pin — the Gurugram campus. */
export function IconPin({ className, weight = 1.7 }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M12 21c4.2-4.4 6.3-7.8 6.3-10.4a6.3 6.3 0 1 0-12.6 0C5.7 13.2 7.8 16.6 12 21Z"
        stroke="currentColor"
        strokeWidth={weight}
      />
      <circle cx="12" cy="10.4" r="2.4" stroke="currentColor" strokeWidth={weight} />
    </Svg>
  );
}

/** Display on a stand — live online classes. */
export function IconDisplay({ className, weight = 1.7 }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="2.5" y="4" width="19" height="12.5" rx="2.6" stroke="currentColor" strokeWidth={weight} />
      <path d="M9 20h6M12 16.5V20" stroke="currentColor" strokeWidth={weight} />
    </Svg>
  );
}

/** Crossing arrows — the hybrid, switch-between-modes format. */
export function IconSwap({ className, weight = 1.7 }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M3.5 8h12.2m0 0l-3.3-3.3M15.7 8l-3.3 3.3" stroke="currentColor" strokeWidth={weight} />
      <path d="M20.5 16H8.3m0 0l3.3-3.3M8.3 16l3.3 3.3" stroke="currentColor" strokeWidth={weight} />
    </Svg>
  );
}

/** Sparkle cluster — Apple's "intelligence / something special" mark. */
export function IconSparkle({ className, weight = 1.7 }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M11 3.5l1.5 4.1L16.6 9l-4.1 1.4L11 14.5 9.6 10.4 5.5 9l4.1-1.4L11 3.5Z"
        stroke="currentColor"
        strokeWidth={weight}
      />
      <path d="M17.8 14.2l.75 2.05 2.05.75-2.05.75-.75 2.05-.75-2.05-2.05-.75 2.05-.75.75-2.05Z" stroke="currentColor" strokeWidth={weight} />
    </Svg>
  );
}

/** Opening quotation mark — testimonials. Solid, since it sits as texture. */
export function IconQuote({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path
        d="M9.6 5.4c-3.4 1.4-5.4 4-5.4 7.6 0 3.4 1.9 5.6 4.5 5.6 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.3 0-.6 0-.9.1.4-1.6 1.6-2.9 3.3-3.7l-2-2.4ZM19.5 5.4c-3.4 1.4-5.4 4-5.4 7.6 0 3.4 1.9 5.6 4.5 5.6 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.3 0-.6 0-.9.1.4-1.6 1.6-2.9 3.3-3.7l-2-2.4Z"
        fill="currentColor"
      />
    </Svg>
  );
}

/** Indeterminate progress ring — form submission. Pair with `animate-spin`. */
export function IconSpinner({ className, weight = 2 }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth={weight} opacity={0.25} />
      <path d="M12 3.5a8.5 8.5 0 0 1 8.5 8.5" stroke="currentColor" strokeWidth={weight} />
    </Svg>
  );
}
