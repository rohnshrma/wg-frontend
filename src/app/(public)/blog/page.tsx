import type { Metadata } from "next";
import BlogContent from "./BlogContent";
import { getBlogs } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description: "Read articles on Data Science, AI, Web Development, career tips, and tech trends from the WebiGeeks team.",
  path: "/blog",
});

export default async function BlogPage() {
  const blogs = await getBlogs();
  return <BlogContent blogs={blogs} />;
}
// Cache invalidation - Tue Aug 11 17:34:59 IST 2026
