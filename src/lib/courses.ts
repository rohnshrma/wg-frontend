import type { Course } from "@/types/course";
import { API_BASE_URL } from "./apiBaseUrl";

// Server-side fetch helpers (used from Server Components) — revalidated
// periodically rather than on every request, since the public catalogue
// changes infrequently.
const REVALIDATE_SECONDS = 60;

export async function getCourses(params?: {
  featured?: boolean;
  level?: string;
  mode?: string;
  search?: string;
}): Promise<Course[]> {
  const query = new URLSearchParams();
  if (params?.featured) query.set("featured", "true");
  if (params?.level) query.set("level", params.level);
  if (params?.mode) query.set("mode", params.mode);
  if (params?.search) query.set("search", params.search);

  const qs = query.toString();
  const res = await fetch(`${API_BASE_URL}/courses${qs ? `?${qs}` : ""}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data ?? [];
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const res = await fetch(`${API_BASE_URL}/courses/${slug}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data ?? null;
}
