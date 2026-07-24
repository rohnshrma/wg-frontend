import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with WebiGeeks — Book a free demo class, ask about our courses, or visit our campus. We respond within 30 minutes!",
};

export default function ContactPage() {
  return <ContactContent />;
}
