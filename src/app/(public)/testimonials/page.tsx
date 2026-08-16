import type { Metadata } from "next";
import TestimonialsContent from "./TestimonialsContent";
import { getTestimonials } from "@/lib/testimonials";
import { pageMetadata } from "@/lib/seo";

// noindex: the underlying testimonials are all from the old coding-institute
// brand (course reviews, placement outcomes) — real client-facing agency
// testimonials to replace them with. Kept live (not deleted) since the
// page/search/comments plumbing is being reused, just not indexed until the
// content actually matches what the site is about.
export const metadata: Metadata = pageMetadata({
  title: "Testimonials",
  description: "Read real feedback from WebiGeeks students. See how practical, project-based training helped them build their careers.",
  path: "/testimonials",
  noindex: true,
});

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  return <TestimonialsContent testimonials={testimonials} />;
}
