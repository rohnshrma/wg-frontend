import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import JsonLd from "@/components/seo/JsonLd";
import GoogleAnalytics from "@/components/seo/GoogleAnalytics";
import { organizationSchema } from "@/lib/schema";
import { getCurrentTenant } from "@/lib/tenant";
import "./globals.css";

// Only accept colors that already look like valid CSS hex colors before
// interpolating them into an inline <style> tag — the value comes from the
// backend's tenant record (ultimately admin-entered), so this is a guard
// against malformed/injected CSS rather than a trust boundary we expect to
// actually trip in practice.
const isHexColor = (value: string): boolean => /^#[0-9a-fA-F]{3,8}$/.test(value);

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://webigeeks.com"),
  title: {
    default: "WebiGeeks — Coding Institute in Gurugram | MERN & Python",
    template: "%s | WebiGeeks Gurugram",
  },
  description:
    "AI-integrated coding classes in Sector-14, Gurugram — MERN, Python, Data Analytics & Power BI. Offline and online batches, 100% placement assistance.",
  keywords: [
    "coding institute Gurgaon",
    "MERN course Gurugram",
    "python course Gurgaon",
    "full stack developer course near me",
    "IT training institute Gurgaon",
    "data analytics course Gurgaon",
    "power bi training Gurgaon",
    "offline coding classes Gurgaon",
    "programming classes Gurgaon",
    "WebiGeeks",
  ],
  authors: [{ name: "WebiGeeks" }],
  creator: "WebiGeeks",
  alternates: { canonical: "https://webigeeks.com" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://webigeeks.com",
    siteName: "WebiGeeks — Coding Institute in Gurugram",
    title: "WebiGeeks — Coding Institute in Gurugram",
    description:
      "100% practical MERN, Python & Data Analytics training in Sector-14, Gurugram. Offline and online batches, with real placement assistance.",
    // No `images` array here — the app/opengraph-image.tsx file convention
    // (next/og) auto-generates and wires this up; setting it manually here
    // too would create a conflicting/duplicate og:image tag.
  },
  twitter: {
    card: "summary_large_image",
    title: "WebiGeeks — Coding Institute in Gurugram",
    description: "AI-Integrated MERN, Python & Data Analytics Courses in Sector-14, Gurugram",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

// Set explicitly rather than relying on the framework default: `initialScale: 1`
// with a device-width viewport is what stops phones rendering the desktop layout
// scaled down. `maximumScale`/`userScalable` are deliberately left alone — pinch
// zoom is an accessibility affordance and should never be disabled.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1672B8",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tenant = await getCurrentTenant();

  // Overriding just the 3 base tokens is enough — every derived shade
  // (`-dark`, `-light`, `-50`..`-900`) is defined in globals.css as a
  // color-mix() of its base, so this single override cascades through
  // hover states, tinted backgrounds, etc. across the whole site. `null`
  // (backend down, no tenant resolved, local dev) means "do nothing": the
  // hardcoded globals.css values are already the correct WebiGeeks default.
  const colors = tenant?.colors;
  const themeOverrides = colors
    ? ([
        ["--color-primary", colors.primary],
        ["--color-secondary", colors.secondary],
        ["--color-accent", colors.accent],
      ] as const).filter(([, value]) => isHexColor(value))
    : [];

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1672B8" />
        <JsonLd data={organizationSchema} />
        {themeOverrides.length > 0 && (
          <style
            id="tenant-theme"
            // Runtime brand override for a resolved tenant — see the
            // color-mix() derivation in globals.css. Values are checked
            // against isHexColor() above before interpolation.
            dangerouslySetInnerHTML={{
              __html: `:root{${themeOverrides.map(([name, value]) => `${name}:${value};`).join("")}}`,
            }}
          />
        )}
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
