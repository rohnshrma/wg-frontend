import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import WorkContent from "./WorkContent";

export const metadata: Metadata = pageMetadata({
  title: "Our Work",
  description: "Explore recent projects from our web development agency — case studies showcasing premium digital solutions.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("Work", "/work")} />
      <WorkContent />
    </>
  );
}
