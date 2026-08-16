import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, servicesSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import ServicesContent from "./ServicesContent";
import { serviceDetails } from "./serviceDetails";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Premium digital services including web development, product engineering, AI automation, and design.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[breadcrumbSchema("Services", "/services"), servicesSchema(serviceDetails)]}
      />
      <ServicesContent />
    </>
  );
}
