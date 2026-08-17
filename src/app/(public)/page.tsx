import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import ProcessSection from "@/components/home/ProcessSection";
import WorkPreview from "@/components/home/WorkPreview";
import TrustSection from "@/components/home/TrustSection";
import { siteConfig } from "@/config/site";

const description =
  "WebiGeeks Digital is a web development agency for international businesses — web development, product engineering, AI automation, and design.";

// Deliberately doesn't use the pageMetadata() helper (or set `title`) here —
// the root layout's title.default already IS this exact string, and
// title.template ("%s | WebiGeeks Digital") applies to any title a child
// segment sets, which would have doubled the suffix
// ("...Solutions | WebiGeeks Digital | WebiGeeks Digital"). Leaving `title`
// unset lets the homepage inherit the un-templated default verbatim.
export const metadata: Metadata = {
  description,
  alternates: { canonical: siteConfig.url },
  // See pageMetadata()'s comment in src/lib/seo.ts — Next replaces
  // openGraph/twitter wholesale, so every field has to be repeated here
  // rather than relying on the root layout's values still applying.
  openGraph: {
    title: "WebiGeeks Digital | Premium Digital Solutions",
    description,
    url: siteConfig.url,
    siteName: "WebiGeeks Digital",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebiGeeks Digital | Premium Digital Solutions",
    description,
    images: ["/opengraph-image.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <ProcessSection />
      <WorkPreview />
      <TrustSection />
    </>
  );
}
