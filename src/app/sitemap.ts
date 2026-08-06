import type { MetadataRoute } from "next";
import { getCourses } from "@/lib/courses";
import { getBlogs } from "@/lib/blog";
import { siteConfig } from "@/config/site";

const staticRoutes = [
  "",
  "/about",
  "/courses",
  "/testimonials",
  "/gallery",
  "/blog",
  "/contact",
];

// Local-intent landing pages — separate from staticRoutes because they get
// course-page-level priority (0.9), not generic-page priority (0.8). Add
// each new one here as it ships (see MASTER_TASK_BOARD.md C5/GROWTH-P3).
const locationRoutes = ["/mern-course-gurugram", "/python-course-gurugram"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courses, blogs] = await Promise.all([getCourses(), getBlogs()]);

  // Genuinely static routes — "now" is an honest lastModified for these.
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const locationEntries: MetadataRoute.Sitemap = locationRoutes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // DB-backed routes — use the real updatedAt so crawlers can trust this
  // field instead of every URL claiming to have changed on every build.
  const courseEntries: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${siteConfig.url}/courses/${course.slug}`,
    lastModified: course.updatedAt ? new Date(course.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Previously missing entirely — blog posts had their own generateMetadata
  // but were never enumerated here, leaving them undiscoverable via sitemap.
  const blogEntries: MetadataRoute.Sitemap = blogs.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.createdAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...locationEntries, ...courseEntries, ...blogEntries];
}
