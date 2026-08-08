import Script from "next/script";

// Loaded via next/script with the "afterInteractive" strategy (Next.js's own
// recommended approach for GA4) so it never blocks the critical rendering
// path. Renders nothing at all when NEXT_PUBLIC_GA_ID isn't set, rather than
// shipping a broken gtag call — no ID is hardcoded here.
export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
