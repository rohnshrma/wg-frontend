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
      return { ok: false, error: data?.message || "Something went wrong. Please try again." };
    }
    reportContactConversion();
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please check your connection and try again." };
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
