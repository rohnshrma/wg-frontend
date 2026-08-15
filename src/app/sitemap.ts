import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const staticRoutes = ["", "/services", "/work", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
