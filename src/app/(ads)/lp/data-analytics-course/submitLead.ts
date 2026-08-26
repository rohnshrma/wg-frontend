import { siteConfig } from "@/config/site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Google Ads "Contact" conversion action (website, category: Contacts),
// grabbed from its event snippet in the Ads UI — Tools & Settings >
// Conversions > Contact > Manage tag > See event snippet. Fires once per
// successful lead POST below, covering both lead-capture paths on this page
// (the hero demo form and the curriculum-download modal both call
// submitLead). Label is tied to this specific conversion action, not a
// secret — same as the AW- ID, both are meant to be public (they're visible
// in the page's own network requests once this fires).
const GOOGLE_ADS_CONVERSION_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const CONTACT_CONVERSION_LABEL = "XtWiCPXs_u0ZEO_MqsQ-";

function reportContactConversion() {
  if (!GOOGLE_ADS_CONVERSION_ID || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_CONVERSION_ID}/${CONTACT_CONVERSION_LABEL}`,
  });
}

// Kept in sync with siteConfig.contact.phone — imported rather than retyped
// so the number a failing form offers can never drift from the real one.
const CONTACT_PHONE = siteConfig.contact.phone;

// Shown for anything that is our fault rather than the visitor's. Names the
// phone number because a lead that can't submit is a lead lost otherwise.
const FALLBACK_ERROR = `Something went wrong on our end. Please try again, or call us on ${CONTACT_PHONE}.`;

// Posts to the public /api/leads endpoint (Lead model — see backend
// src/models/Lead.ts / lead.controller.ts). `source: "course_page"` is one
// of the real deployed enum values; do not invent new ones here without
// checking the live schema first.
export async function submitLead(payload: {
  name: string;
  phone: string;
  email: string;
  courseInterested: string;
  message?: string;
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, source: "course_page" }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      // Only a 4xx carries a message worth showing: those are validation
      // failures phrased for the visitor ("Enter a valid mobile number").
      // A 5xx message is written for whoever reads the logs — a real 500
      // here rendered the words "Internal Server Error" into the page,
      // which tells a paid visitor nothing and loses the lead silently.
      // Every server-side fault gets the phone number instead, so the
      // enquiry has somewhere to go when the form itself is broken.
      const isClientError = res.status >= 400 && res.status < 500;
      return {
        ok: false,
        error: (isClientError && data?.message) || FALLBACK_ERROR,
      };
    }
    reportContactConversion();
    return { ok: true };
  } catch {
    return { ok: false, error: `Network error — check your connection, or call us on ${CONTACT_PHONE}.` };
  }
}

export function downloadCurriculum() {
  const link = document.createElement("a");
  link.href = "/downloads/data-analytics-curriculum.pdf";
  link.download = "WebiGeeks-Data-Analytics-Curriculum.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export const MOBILE_REGEX = /^[6-9]\d{9}$/;
export const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
