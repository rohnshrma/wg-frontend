import type { Metadata } from "next";
import ContactContent from "./ContactContent";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with WebiGeeks — Book a free demo class, ask about our courses, or visit our campus. We respond within 30 minutes!",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactContent />;
}
