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
    const heroForm = document.getElementById("demo-form");
    if (!heroForm) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      rootMargin: "0px 0px -20% 0px",
    });
    observer.observe(heroForm);
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
