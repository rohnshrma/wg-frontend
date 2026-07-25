import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
    default: "WebiGeeks — Your AI Skill Partner",
    template: "%s | WebiGeeks",
  },
  description:
    "Become industry-ready with AI-integrated courses in Data Science, Data Analytics, MERN Stack, Python, Power BI, and more. 100% practical training with placement assistance.",
  keywords: [
    "data science course",
    "data analytics training",
    "MERN stack development",
    "python programming",
    "power bi course",
    "AI courses",
    "machine learning",
    "web development",
    "placement assistance",
    "WebiGeeks",
  ],
  authors: [{ name: "WebiGeeks" }],
  creator: "WebiGeeks",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://webigeeks.com",
    siteName: "WebiGeeks — Your AI Skill Partner",
    title: "WebiGeeks — Become Industry Ready With AI Integrated Courses",
    description:
      "100% practical training in Data Science, AI, MERN Stack, Python, and more. Join 500+ placed students.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebiGeeks — Your AI Skill Partner",
    description: "AI-Integrated Courses for Industry-Ready Careers",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
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
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
