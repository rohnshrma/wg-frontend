"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

// Copy-to-clipboard for the code snippets on the page. Shows a brief "Copied"
// state, falls back silently if the Clipboard API is unavailable.
export default function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1400);
    } catch {
      /* clipboard blocked — no-op */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[10px] text-white/40 transition-colors hover:bg-white/10 hover:text-white/70 active:scale-95"
      aria-label={done ? "Copied" : label}
    >
      {done ? (
        <>
          <Check className="h-3 w-3 text-[var(--mern-green)]" /> copied
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" /> {label.toLowerCase()}
        </>
      )}
    </button>
  );
}
