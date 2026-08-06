import type { Metadata } from "next";
import TestimonialsContent from "./TestimonialsContent";
import { getTestimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read real feedback from WebiGeeks students. See how practical, project-based training helped them build their careers.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  return <TestimonialsContent testimonials={testimonials} />;
}
