import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import WorkContent from "./WorkContent";

export const metadata: Metadata = pageMetadata({
  title: "Our Work",
  description: "Explore our recent projects and case studies showcasing premium digital solutions.",
  path: "/work",
});

export default function WorkPage() {
  return <WorkContent />;
}
