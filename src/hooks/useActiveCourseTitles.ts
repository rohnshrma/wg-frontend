"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/apiBaseUrl";
import { siteConfig } from "@/config/site";

/**
 * The course dropdown on every lead-capture form (hero, popup, sticky CTA,
 * contact page) used to read the static `siteConfig.courses` list, which
 * drifted out of sync with the real course catalogue — new courses (e.g.
 * Digital Marketing, Mobile App Development) were addable via the admin CMS
 * but never selectable in any enquiry form. This fetches the same
 * `isActive: true` course list `/courses` itself renders, so the dropdown
 * can never again list a course that doesn't exist or hide one that does.
 * Falls back to the static list only while loading or if the fetch fails,
 * so a form is never left with an empty dropdown.
 */
export function useActiveCourseTitles(): string[] {
  const [titles, setTitles] = useState<string[]>([...siteConfig.courses]);

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_BASE_URL}/courses`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (cancelled || !json?.data?.length) return;
        const names = json.data
          .map((c: { title?: string }) => c.title)
          .filter((title: unknown): title is string => typeof title === "string" && title.length > 0);
        if (names.length > 0) setTitles(names);
      })
      .catch(() => {
        // Keep the static fallback — a form with slightly stale course
        // names beats a form with no course options at all.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return titles;
}
