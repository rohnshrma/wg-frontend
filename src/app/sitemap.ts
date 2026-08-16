import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// /blog and /testimonials are deliberately left out. Both routes exist and
// are reachable, but every post/testimonial currently on them is leftover
// coding-institute content (course reviews, job-hunting articles) — see the
// `noindex: true` on those routes' own metadata. Add them back here once
// their content actually matches what the site is about; a sitemap entry
// for a noindexed page just wastes crawl budget in the meantime.
const staticRoutes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "", changeFrequency: "daily", priority: 1 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/work", changeFrequency: "weekly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
