import type { Testimonial } from "@/types/testimonial";
import { API_BASE_URL } from "./apiBaseUrl";

const REVALIDATE_SECONDS = 60;

export async function getTestimonials(): Promise<Testimonial[]> {
  const res = await fetch(`${API_BASE_URL}/testimonials`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data ?? [];
}

// No backend filter endpoint exists for this yet, so filter client-side by
// the free-text courseName field admins enter on each testimonial. Used to
// build a real, attributable aggregateRating for Course schema — never an
// anonymous/aggregated number, per Google's structured-data guidance on
// self-served reviews.
export async function getTestimonialsByCourse(courseTitle: string): Promise<Testimonial[]> {
  const all = await getTestimonials();
  const needle = courseTitle.toLowerCase();
  return all.filter((t) => t.courseName.toLowerCase().includes(needle) || needle.includes(t.courseName.toLowerCase()));
}
