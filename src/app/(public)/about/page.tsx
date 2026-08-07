import type { Metadata } from "next";
import AboutContent from "./AboutContent";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Learn about WebiGeeks, your AI skill partner in practical, AI-integrated training for Data Science, MERN Stack, Python, and more.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutContent />;
}
