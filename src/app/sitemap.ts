import type { MetadataRoute } from "next";
import { getCourses } from "@/lib/courses";
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const courses = await getCourses();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const courseEntries: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${siteConfig.url}/courses/${course.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticEntries, ...courseEntries];
}
