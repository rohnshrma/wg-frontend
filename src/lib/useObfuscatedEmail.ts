"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

// Keeps the real address out of the initial server-rendered HTML (SEOptimer's
// audit flagged plain-text email addresses as scraper/spam-bot bait) while
// still producing a working mailto: link for real visitors — the address is
// only assembled client-side after mount, one render pass after hydration.
export function useObfuscatedEmail() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(siteConfig.contact.email);
  }, []);

  return {
    label: email ?? "Email Us",
    href: email ? `mailto:${email}` : undefined,
  };
}
