import type { Metadata } from "next";
import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import ContactContent from "./ContactContent";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Tell us about your project. Our digital agency team responds within 24 hours to discuss how we can help.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("Contact", "/contact")} />
      <Suspense>
        <ContactContent />
      </Suspense>
    </>
  );
}
