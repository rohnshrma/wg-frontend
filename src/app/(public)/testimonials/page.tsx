import type { Metadata } from "next";
import TestimonialsContent from "./TestimonialsContent";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read success stories from 500+ placed students. See how WebiGeeks transformed their careers with practical training.",
};

export default function TestimonialsPage() {
  return <TestimonialsContent />;
}
