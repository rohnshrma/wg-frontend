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

// Powers the "Related Courses" cross-links on course detail pages — every
// course page was previously a dead end with no path to any other course
// page except via the global nav, which meant no internal link equity
// flowed between related course pages at all. Ranks by shared technology
// tags (a real signal already in the data) rather than a hardcoded list, so
// it stays correct as courses are added/removed via the admin CMS.
export async function getRelatedCourses(
  currentSlug: string,
  currentTechnologies: string[],
  limit = 3
): Promise<Course[]> {
  const all = await getCourses();
  const currentTechSet = new Set(currentTechnologies.map((t) => t.toLowerCase()));

  return all
    .filter((c) => c.slug !== currentSlug)
    .map((c) => ({
      course: c,
      overlap: c.technologies.filter((t) => currentTechSet.has(t.toLowerCase())).length,
    }))
    .sort((a, b) => b.overlap - a.overlap || (a.course.displayOrder ?? 0) - (b.course.displayOrder ?? 0))
    .slice(0, limit)
    .map((x) => x.course);
}
