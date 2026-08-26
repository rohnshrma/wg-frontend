"use client";

import { useState } from "react";
import { IconChevronDown } from "./AppleIcons";

export default function FaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border rounded-3xl bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_40px_-16px_rgba(15,23,42,0.16)] overflow-hidden">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;
        return (
          <div key={faq.q}>
            <button
              type="button"
              id={buttonId}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center justify-between gap-3 px-6 sm:px-7 py-5 text-left active:scale-[0.99] transition-transform duration-150 ease-snappy"
            >
              <span className={`font-semibold text-sm sm:text-base ${isOpen ? "text-primary" : "text-text-primary"}`}>
                {faq.q}
              </span>
              <IconChevronDown
                className={`w-4 h-4 text-text-muted shrink-0 transition-transform duration-300 ease-fluid ${isOpen ? "rotate-180 text-primary" : ""}`}
              />
            </button>
            {/* Grid-rows trick: animating 0fr -> 1fr on a single-row grid gives a
                smooth height transition without measuring/JS, and without
                animating `height` directly.

                `inert` when closed because the grid collapse is purely visual —
                the answer stays rendered at zero height, so without this a
                screen reader reads all nine answers straight through
                regardless of which one is open. `inert` also takes the
                collapsed content out of the tab order, and unlike
                `visibility: hidden` it doesn't interfere with the transition. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className="grid transition-[grid-template-rows] duration-300 ease-fluid"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden min-h-0">
                <div
                  className={`px-6 sm:px-7 pb-6 text-sm text-text-secondary leading-relaxed whitespace-pre-line transition-opacity duration-200 ease-out ${isOpen ? "opacity-100 delay-100" : "opacity-0"}`}
                >
                  {faq.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
