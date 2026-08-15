import type { Metadata, Viewport } from "next";
import { Inter, Hanken_Grotesk } from "next/font/google";
import JsonLd from "@/components/seo/JsonLd";
import GoogleAnalytics from "@/components/seo/GoogleAnalytics";
import { organizationSchema } from "@/lib/schema";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://webigeeksdigital.com"),
  title: {
    default: "WebiGeeks Digital | Premium Digital Solutions",
    template: "%s | WebiGeeks Digital",
  },
  description:
    "Premium digital solutions for international businesses. Web development, product engineering, AI automation, and design.",
  keywords: [
    "web development",
    "product engineering",
    "SaaS development",
    "AI automation",
    "UI/UX design",
    "digital agency",
    "web application development",
    "software development",
    "digital transformation",
  ],
  authors: [{ name: "WebiGeeks Digital" }],
  creator: "WebiGeeks Digital",
  alternates: { canonical: "https://webigeeksdigital.com" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://webigeeksdigital.com",
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
    <html
      lang="en"
      className={`${inter.variable} ${hankenGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1672B8" />
        <JsonLd data={organizationSchema} />
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
