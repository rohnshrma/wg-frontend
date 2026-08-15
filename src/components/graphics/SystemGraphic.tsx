"use client";

import { useId } from "react";
import { motion } from "framer-motion";

// A hand-built schematic — four service nodes (Web, Product, AI, Design)
// wired into one hub, drawn like an engineering diagram rather than an
// icon set. Stands in for the hero's "trust us with your systems" pitch
// without a literal illustration. No stock art, no icon fonts.
const NODES = [
  { id: "web", label: "WEB", x: 120, y: 90 },
  { id: "product", label: "PRODUCT", x: 340, y: 70 },
  { id: "ai", label: "AI", x: 360, y: 260 },
  { id: "design", label: "DESIGN", x: 100, y: 280 },
];

const HUB = { x: 230, y: 185 };

export default function SystemGraphic() {
  const gradientId = useId();

  return (
    <figure className="relative w-full max-w-md mx-auto">
      <svg
        viewBox="0 0 460 370"
        className="w-full h-auto"
        role="img"
        aria-label="Schematic diagram of four connected service nodes — web, product, AI, and design — wired into a central hub, representing how WebiGeeks Digital's disciplines work as one system."
      >
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="var(--color-agency-glow)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-agency-glow)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* background grid dots */}
        {Array.from({ length: 12 }).map((_, col) =>
          Array.from({ length: 10 }).map((_, row) => (
            <circle
              key={`${col}-${row}`}
              cx={20 + col * 40}
              cy={20 + row * 36}
              r="1"
              fill="currentColor"
              className="text-ink/10"
            />
          ))
        )}

        {/* corner brackets — schematic framing device */}
        {[
          { x: 8, y: 8, dx: 1, dy: 1 },
          { x: 452, y: 8, dx: -1, dy: 1 },
          { x: 8, y: 362, dx: 1, dy: -1 },
          { x: 452, y: 362, dx: -1, dy: -1 },
        ].map((c, i) => (
          <path
            key={i}
            d={`M ${c.x} ${c.y + c.dy * 18} L ${c.x} ${c.y} L ${c.x + c.dx * 18} ${c.y}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-ink/25"
          />
        ))}

        <circle cx={HUB.x} cy={HUB.y} r="90" fill={`url(#${gradientId})`} />

        {/* connections */}
        {NODES.map((node) => (
          <line
            key={`line-${node.id}`}
            x1={HUB.x}
            y1={HUB.y}
            x2={node.x}
            y2={node.y}
            stroke="currentColor"
            strokeWidth="1"
            className="text-ink/25"
          />
        ))}

        {/* hub node */}
        <circle cx={HUB.x} cy={HUB.y} r="7" fill="var(--color-agency-accent)" />
        <circle
          cx={HUB.x}
          cy={HUB.y}
          r="16"
          fill="none"
          stroke="var(--color-agency-accent)"
          strokeWidth="1"
          opacity="0.4"
        />
        <text
          x={HUB.x}
          y={HUB.y + 34}
          textAnchor="middle"
          className="fill-ink font-mono-agency"
          style={{ fontSize: 10, letterSpacing: "0.08em" }}
        >
          WGD
        </text>

        {/* service nodes */}
        {NODES.map((node, i) => (
          <g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="5"
              fill="var(--color-ink)"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
            />
            <circle cx={node.x} cy={node.y} r="11" fill="none" stroke="currentColor" strokeWidth="1" className="text-ink/20" />
            <text
              x={node.x}
              y={node.y - 20}
              textAnchor="middle"
              className="fill-ink/50 font-mono-agency"
              style={{ fontSize: 9, letterSpacing: "0.1em" }}
            >
              {String(i + 1).padStart(2, "0")}
            </text>
            <text
              x={node.x}
              y={node.y + 26}
              textAnchor="middle"
              className="fill-ink/60 font-mono-agency"
              style={{ fontSize: 9, letterSpacing: "0.08em" }}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="sr-only">
        Four service disciplines — web, product, AI, and design — connected to one delivery system.
      </figcaption>
    </figure>
  );
}
