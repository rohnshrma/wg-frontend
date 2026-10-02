"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function StickyProjectCta() {
  return (
    <Link
      href="/contact"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 inline-flex items-center gap-2 whitespace-nowrap px-5 sm:px-6 py-3.5 sm:py-4 bg-white hover:bg-agency-accent text-ink hover:text-white text-sm font-semibold rounded-full shadow-xl transition-colors duration-300 font-display"
    >
      Start your project
      <ArrowUpRight className="w-4 h-4" />
    </Link>
  );
}
