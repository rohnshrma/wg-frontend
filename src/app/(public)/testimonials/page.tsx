import type { Metadata } from "next";
import TestimonialsContent from "./TestimonialsContent";
import { getTestimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read success stories from 500+ placed students. See how WebiGeeks transformed their careers with practical training.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  return <TestimonialsContent testimonials={testimonials} />;
}
