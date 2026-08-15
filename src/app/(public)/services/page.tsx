import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Premium digital services including web development, product engineering, AI automation, and design.",
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesContent />;
}
