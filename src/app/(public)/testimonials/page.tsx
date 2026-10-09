import type { Metadata } from "next";
import TestimonialsContent from "./TestimonialsContent";
import { getTestimonials } from "@/lib/testimonials";
import { pageMetadata } from "@/lib/seo";
import { testimonialsReviewSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Testimonials",
  description: "Read real feedback from WebiGeeks students. See how practical, project-based training helped them build their careers.",
  path: "/testimonials",
});

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  const reviewSchema = testimonialsReviewSchema(testimonials);
  return (
    <>
      {reviewSchema && <JsonLd data={reviewSchema} />}
      <TestimonialsContent testimonials={testimonials} />
    </>
  );
}
