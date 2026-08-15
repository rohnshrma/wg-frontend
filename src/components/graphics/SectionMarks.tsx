/**
 * Custom abstract-geometric marks that replace icon usage across the
 * Services, Process, and Trust sections. Built from native SVG primitives
 * (circle/rect/polygon only, no path data) so each stays simple, crisp at
 * small sizes, and themeable via `currentColor` — drop these in wherever an
 * icon used to sit and the existing `text-{color}-600` className still
 * controls the fill. Layering + opacity carries the depth instead of icon
 * detail.
 */

type MarkProps = { className?: string };

export function BadgeMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="6" fill="currentColor" opacity="0.25" />
      <circle cx="8" cy="8" r="3" fill="currentColor" />
    </svg>
  );
}

// ---- Services ----

export function WebDevMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="6" y="6" width="26" height="26" rx="5" fill="currentColor" opacity="0.25" transform="rotate(-8 19 19)" />
      <rect x="14" y="12" width="26" height="26" rx="5" fill="currentColor" opacity="0.5" transform="rotate(6 27 25)" />
      <rect x="16" y="16" width="20" height="20" rx="4" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

export function ProductEngMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <polygon points="24,4 42,15 42,33 24,44 6,33 6,15" fill="currentColor" opacity="0.3" />
      <polygon points="24,14 34,20 34,32 24,38 14,32 14,20" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

export function AiAutomationMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <line x1="24" y1="24" x2="10" y2="10" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="24" y1="24" x2="38" y2="10" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="24" y1="24" x2="10" y2="38" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="24" y1="24" x2="38" y2="38" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <circle cx="10" cy="10" r="5" fill="currentColor" opacity="0.55" />
      <circle cx="38" cy="10" r="5" fill="currentColor" opacity="0.55" />
      <circle cx="10" cy="38" r="5" fill="currentColor" opacity="0.55" />
      <circle cx="38" cy="38" r="5" fill="currentColor" opacity="0.55" />
      <circle cx="24" cy="24" r="8" fill="currentColor" />
    </svg>
  );
}

export function UiUxMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="18" cy="18" r="12" fill="currentColor" opacity="0.3" />
      <polygon points="34,10 44,30 24,30" fill="currentColor" opacity="0.5" />
      <rect x="18" y="22" width="18" height="18" rx="4" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

// ---- Process ----

export function DiscoverMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.4" />
      <circle cx="20" cy="20" r="7" fill="currentColor" opacity="0.6" />
      <line x1="30" y1="30" x2="41" y2="41" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function StrategizeMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="6" y="30" width="12" height="12" rx="2" fill="currentColor" opacity="0.35" />
      <rect x="18" y="18" width="12" height="24" rx="2" fill="currentColor" opacity="0.6" />
      <rect x="30" y="6" width="12" height="36" rx="2" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

export function DesignMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="20" cy="24" r="14" fill="currentColor" opacity="0.35" />
      <rect x="22" y="10" width="20" height="20" rx="5" fill="currentColor" opacity="0.85" transform="rotate(10 32 20)" />
    </svg>
  );
}

export function BuildMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="8" y="26" width="32" height="12" rx="3" fill="currentColor" opacity="0.35" />
      <rect x="12" y="14" width="24" height="12" rx="3" fill="currentColor" opacity="0.6" />
      <rect x="16" y="2" width="16" height="12" rx="3" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

export function RefineMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="7" fill="currentColor" />
      <circle cx="24" cy="6" r="4" fill="currentColor" opacity="0.75" />
      <circle cx="40" cy="17" r="3.5" fill="currentColor" opacity="0.55" />
      <circle cx="40" cy="31" r="3" fill="currentColor" opacity="0.4" />
      <circle cx="8" cy="17" r="3.5" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

export function LaunchMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="12" cy="38" r="3" fill="currentColor" opacity="0.35" />
      <circle cx="19" cy="30" r="4" fill="currentColor" opacity="0.55" />
      <polygon points="30,4 42,32 18,32" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

// ---- Trust ----

export function EngineeringMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="6" y="6" width="36" height="36" rx="8" fill="currentColor" opacity="0.2" />
      <rect x="14" y="14" width="20" height="20" rx="5" fill="currentColor" opacity="0.55" />
      <rect x="20" y="20" width="8" height="8" rx="2" fill="currentColor" />
    </svg>
  );
}

export function SpeedMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <polygon points="6,36 22,36 14,24 -2,24" fill="currentColor" opacity="0.35" transform="translate(2 0)" />
      <polygon points="18,26 34,26 26,10 10,10" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

export function StrategicMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <line x1="12" y1="34" x2="24" y2="10" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="24" y1="10" x2="36" y2="34" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="12" y1="34" x2="36" y2="34" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <circle cx="24" cy="10" r="6" fill="currentColor" opacity="0.9" />
      <circle cx="12" cy="34" r="6" fill="currentColor" opacity="0.6" />
      <circle cx="36" cy="34" r="6" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export function GlobalMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <ellipse cx="20" cy="24" rx="16" ry="16" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.35" />
      <ellipse cx="28" cy="24" rx="16" ry="16" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.55" />
      <ellipse cx="24" cy="24" rx="9" ry="16" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

export function SecurityMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <polygon points="24,4 42,12 42,26 24,44 6,26 6,12" fill="currentColor" opacity="0.3" />
      <polygon points="24,14 34,19 34,27 24,36 14,27 14,19" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

export function CommunicationMark({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="4" y="8" width="26" height="18" rx="6" fill="currentColor" opacity="0.35" />
      <rect x="18" y="22" width="26" height="18" rx="6" fill="currentColor" opacity="0.9" />
    </svg>
  );
}
