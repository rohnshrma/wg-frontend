import Script from "next/script";

// Loaded via next/script with the "afterInteractive" strategy (Next.js's own
// recommended approach for GA4) so it never blocks the critical rendering
// path. Renders nothing at all when NEXT_PUBLIC_GA_ID isn't set, rather than
// shipping a broken gtag call — no ID is hardcoded here.
//
// The Google Ads conversion ID (NEXT_PUBLIC_GOOGLE_ADS_ID) rides the same
// gtag.js loader as GA4 — a second `gtag('config', ...)` call, not a second
// script tag — per Google's own recommended combined-tag setup. It's
// independent of the GA ID: either can be set without the other.
export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const gtagLoaderId = gaId || adsId;
  if (!gtagLoaderId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagLoaderId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${gaId ? `gtag('config', '${gaId}');` : ""}
          ${adsId ? `gtag('config', '${adsId}');` : ""}
        `}
      </Script>
    </>
  );
}
