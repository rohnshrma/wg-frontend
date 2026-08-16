import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import AboutContent from "./AboutContent";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "WebiGeeks Digital is a premium digital agency building world-class solutions for international businesses.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("About", "/about")} />
      <AboutContent />
    </>
  );
}
