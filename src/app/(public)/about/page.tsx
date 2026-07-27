import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about WebiGeeks, your AI skill partner in practical, AI-integrated training for Data Science, MERN Stack, Python, and more.",
};

export default function AboutPage() {
  return <AboutContent />;
}
