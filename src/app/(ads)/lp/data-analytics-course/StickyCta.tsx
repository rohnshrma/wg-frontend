"use client";

import { useEffect, useState } from "react";
import { IconArrowRight, IconSparkle } from "./AppleIcons";

// Appears once the hero (with its own CTAs) has scrolled out of view, so it
// doesn't duplicate the hero button immediately — then stays visible for
// the rest of the scroll, since a paid click should always have the
// conversion action one tap away.
export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Watch the whole hero, not just the form inside it. On a phone the form
    // is stacked *below* the headline rather than beside it, so it already
    // sits outside the viewport at scroll 0 — observing it meant the pill
    // appeared instantly, on top of the hero it was supposed to wait for.
    // Desktop never showed this because there the form is next to the copy.
    const hero = document.getElementById("hero") ?? document.getElementById("demo-form");
    if (!hero) return;

    // No negative bottom margin: that shrinks the root box upward and would
    // fire while the hero is still partly on screen, which is the same bug
    // in a smaller form.
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pointer-events-none transition-[opacity,transform] duration-300 ease-snappy motion-reduce:transition-opacity ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 motion-reduce:translate-y-0"
      }`}
      aria-hidden={!visible}
    >
      <a
        href="#demo-form"
        tabIndex={visible ? 0 : -1}
        className="pointer-events-auto inline-flex items-center gap-2 pl-5 pr-6 py-3.5 rounded-full gradient-accent text-white font-bold shadow-xl hover:shadow-glow-accent active:scale-[0.97] transition-[transform,box-shadow] duration-150 ease-snappy"
      >
        <IconSparkle className="w-4 h-4 shrink-0" />
        Book My Free Demo
        <IconArrowRight className="w-4 h-4 shrink-0" />
      </a>
    </div>
  );
}
