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
