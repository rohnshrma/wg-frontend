import type { Metadata } from "next";
import BlogContent from "./BlogContent";
import { getBlogs } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

// noindex: current posts are leftover coding-institute content (career/job
// -hunting articles), not agency-relevant material. Same reasoning as
// testimonials/page.tsx — unindex until real agency posts replace them.
export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description: "Read articles on Data Science, AI, Web Development, career tips, and tech trends from the WebiGeeks team.",
  path: "/blog",
  noindex: true,
});

export default async function BlogPage() {
  const blogs = await getBlogs();
  return <BlogContent blogs={blogs} />;
}
