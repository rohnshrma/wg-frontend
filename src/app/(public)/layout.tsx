"use client";

import { MotionConfig } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import StickyProjectCta from "@/components/layout/StickyProjectCta";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    // reducedMotion="user" makes every Framer Motion animation on the public
    // site honor the OS-level prefers-reduced-motion setting automatically,
    // without each component needing its own useReducedMotion() check.
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main className="bg-ink">{children}</main>
      <Footer />
      <FloatingButtons />
      <StickyProjectCta />
    </MotionConfig>
  );
}
