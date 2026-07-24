"use client";

import { useState } from "react";

interface BarChartProps {
  data: { label: string; value: number }[];
  color?: string;
  formatValue?: (value: number) => string;
}

export default function BarChart({
  data,
  color = "var(--color-primary)",
  formatValue = (v) => v.toLocaleString("en-IN"),
}: BarChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const max = Math.max(...data.map((d) => d.value), 1);
  const maxIndex = data.reduce((best, d, i) => (d.value > data[best].value ? i : best), 0);

  return (
    <div className="w-full">
      <div className="flex items-end gap-2 h-40 border-b border-border relative">
        {data.map((d, i) => {
          const heightPct = (d.value / max) * 100;
          const isHovered = hoverIndex === i;
          const showLabel = i === maxIndex && d.value > 0;
          return (
            <div
              key={d.label}
              className="flex-1 h-full flex flex-col justify-end items-center relative group"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {(isHovered || showLabel) && d.value > 0 && (
                <div
                  className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-text-primary text-white text-[10px] font-semibold whitespace-nowrap z-10 shadow-md"
                >
                  {formatValue(d.value)}
                </div>
              )}
              <div
                className="w-full max-w-[24px] rounded-t-[4px] transition-opacity"
                style={{
                  height: `${Math.max(heightPct, d.value > 0 ? 2 : 0)}%`,
                  backgroundColor: color,
                  opacity: hoverIndex === null || isHovered ? 1 : 0.55,
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex items-start gap-2 mt-2">
        {data.map((d) => (
          <div key={d.label} className="flex-1 text-center text-[10px] text-text-muted">
            {d.label}
          </div>
        ))}
      </div>
    </div>
  );
}
