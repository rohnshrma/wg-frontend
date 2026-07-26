import type { Testimonial } from "@/types/testimonial";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
const REVALIDATE_SECONDS = 60;

export async function getTestimonials(): Promise<Testimonial[]> {
  const res = await fetch(`${API_BASE_URL}/testimonials`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data ?? [];
}
