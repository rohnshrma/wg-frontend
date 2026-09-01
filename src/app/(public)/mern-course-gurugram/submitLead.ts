declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Mirrors src/app/(ads)/lp/data-analytics-course/submitLead.ts — same public
// /api/leads endpoint, same `source: "course_page"` enum value, and the same
// Google Ads "Contact" conversion action (the label is tied to the action,
// not the page, so both this page and the DA landing page report into it).
// GA4 rides the same gtag loader wired up once in the root layout's
// <GoogleAnalytics /> — nothing extra to load here.
const GOOGLE_ADS_CONVERSION_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const CONTACT_CONVERSION_LABEL = "XtWiCPXs_u0ZEO_MqsQ-";

function reportContactConversion() {
  if (!GOOGLE_ADS_CONVERSION_ID || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_CONVERSION_ID}/${CONTACT_CONVERSION_LABEL}`,
  });
}

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
  link.href = "/downloads/mern-stack-curriculum.pdf";
  link.download = "WebiGeeks-MERN-Stack-Curriculum.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export const MOBILE_REGEX = /^[6-9]\d{9}$/;
export const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
