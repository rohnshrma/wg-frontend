import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema } from "@/lib/schema";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://webigeeks.com"),
  title: {
    default: "WebiGeeks — Coding Institute in Gurugram | MERN, Python & Data Analytics",
    template: "%s | WebiGeeks Gurugram",
  },
  description:
    "AI-integrated coding classes in Sector-14, Gurugram — MERN Stack, Python, Data Analytics, Power BI & more. Offline and online batches, 100% placement assistance.",
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
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://webigeeks.com",
    siteName: "WebiGeeks — Coding Institute in Gurugram",
    title: "WebiGeeks — Coding Institute in Gurugram",
    description:
      "100% practical MERN, Python & Data Analytics training in Sector-14, Gurugram. Offline and online batches. Join 500+ placed students.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1672B8" />
        <JsonLd data={organizationSchema} />
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
