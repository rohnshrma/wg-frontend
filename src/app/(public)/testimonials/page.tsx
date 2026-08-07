import type { Metadata } from "next";
import TestimonialsContent from "./TestimonialsContent";
import { getTestimonials } from "@/lib/testimonials";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Testimonials",
  description: "Read real feedback from WebiGeeks students. See how practical, project-based training helped them build their careers.",
  path: "/testimonials",
});

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  return <TestimonialsContent testimonials={testimonials} />;
}
