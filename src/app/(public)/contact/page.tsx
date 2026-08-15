import type { Metadata } from "next";
import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import ContactContent from "./ContactContent";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Tell us about your project. WebiGeeks Digital responds within 24 hours to discuss how we can help.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Suspense>
      <ContactContent />
    </Suspense>
  );
}
