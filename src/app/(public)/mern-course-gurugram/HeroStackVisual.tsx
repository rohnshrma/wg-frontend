"use client";

// The hero's right-hand visual: a mock editor typing out a MERN request
// handler, wired to a small three-layer runtime diagram (React → Express /
// Node → MongoDB) with a packet travelling the connection. Pure CSS motion
// (staggered line reveal + an offset-path packet), all disabled under
// prefers-reduced-motion via the .mern-* rules in globals.css. No canvas,
// no animation library, no infinite typing loop.

const CODE_LINES: { text: string; cls?: string }[] = [
  { text: "// GET /api/courses", cls: "text-slate-500" },
  { text: "router.get('/courses', async (req, res) => {", cls: "text-slate-200" },
  { text: "  const courses = await Course.find()", cls: "text-slate-200" },
  { text: "  res.json(courses)", cls: "text-slate-200" },
  { text: "})", cls: "text-slate-200" },
];

const LAYERS = [
  { name: "React", role: "frontend", tint: "#38bdf8" },
  { name: "Express · Node", role: "api + runtime", tint: "#34d399" },
  { name: "MongoDB", role: "database", tint: "#22c55e" },
];

export default function HeroStackVisual() {
  return (
    <div className="relative">
      {/* Editor window */}
      <div className="mern-surface overflow-hidden rounded-2xl shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 border-b border-[var(--mern-line)] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[11px] text-slate-500">routes/courses.js</span>
        </div>
        <pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
          {CODE_LINES.map((line, i) => (
            <div
              key={i}
              className="mern-code-line flex gap-3"
              style={{ animationDelay: `${i * 90 + 120}ms` }}
            >
              <span className="w-4 select-none text-right text-slate-600">{i + 1}</span>
              <code className={line.cls}>
                {line.text}
                {i === CODE_LINES.length - 1 && <span className="mern-caret ml-0.5" />}
              </code>
            </div>
          ))}
        </pre>
      </div>

      {/* Runtime diagram */}
      <div className="mern-surface mt-4 rounded-2xl p-4">
        <div className="relative grid grid-cols-3 gap-2">
          {/* connector + packet */}
          <svg
            aria-hidden="true"
            viewBox="0 0 300 40"
            className="pointer-events-none absolute inset-x-6 top-1/2 -z-0 h-10 -translate-y-1/2"
            preserveAspectRatio="none"
          >
            <path className="mern-wire" d="M6 20 H294" />
            <circle
              cx="6"
              cy="20"
              r="3.5"
              className="mern-packet"
              style={{ ["--mern-path" as string]: 'path("M6 20 H294")' }}
            />
          </svg>
          {LAYERS.map((l) => (
            <div
              key={l.name}
              className="relative z-10 rounded-xl border border-[var(--mern-line)] bg-[var(--mern-ink)]/70 px-3 py-3 text-center backdrop-blur"
            >
              <span
                className="mx-auto mb-1.5 block h-1.5 w-1.5 rounded-full"
                style={{ background: l.tint, boxShadow: `0 0 8px ${l.tint}` }}
              />
              <p className="text-[12px] font-semibold text-slate-100">{l.name}</p>
              <p className="text-[10px] text-slate-500">{l.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
