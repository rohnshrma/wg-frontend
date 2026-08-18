"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.q} className="bg-white rounded-xl border border-border overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <span className="font-semibold text-text-primary text-sm">{faq.q}</span>
              <ChevronDown
                className={`w-4 h-4 text-text-muted shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
