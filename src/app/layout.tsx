import type { Metadata, Viewport } from "next";
import { Inter, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import JsonLd from "@/components/seo/JsonLd";
import GoogleAnalytics from "@/components/seo/GoogleAnalytics";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Display face for the (public) marketing site — kept as an opt-in variable
// rather than the global default so /admin and /dashboard keep rendering in
// Inter untouched.
const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Technical/label face for the schematic layer of the design system —
// eyebrows, coordinates, numbered markers. Same opt-in pattern as above.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "WebiGeeks Digital | Premium Digital Solutions",
    template: "%s | WebiGeeks Digital",
  },
  description:
    "Premium digital solutions for international businesses. Web development, product engineering, AI automation, and design.",
  keywords: [
    "web development agency",
    "website development agency",
    "digital agency",
    "web development",
    "product engineering",
    "SaaS development",
    "AI automation",
    "UI/UX design",
    "web application development",
    "software development",
    "digital transformation",
  ],
  authors: [{ name: "WebiGeeks Digital" }],
  creator: "WebiGeeks Digital",
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "WebiGeeks Digital",
    title: "WebiGeeks Digital | Premium Digital Solutions",
    description:
      "Premium digital solutions for international businesses. Web development, product engineering, AI automation, and design.",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebiGeeks Digital | Premium Digital Solutions",
    description: "Premium digital solutions for international businesses.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
  themeColor: "#0D0D0D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${hankenGrotesk.variable} ${plexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* No manual favicon <link> — Next's file-convention favicon.ico in
            src/app/ already generates the correct tag; a hand-written one
            here just duplicated it. */}
        <meta name="theme-color" content="#0D0D0D" />
        <JsonLd data={[organizationSchema, websiteSchema]} />
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
