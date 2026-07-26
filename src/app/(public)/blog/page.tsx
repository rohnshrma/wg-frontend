import type { Metadata } from "next";
import BlogContent from "./BlogContent";
import { getBlogs } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read articles on Data Science, AI, Web Development, career tips, and tech trends from the WebiGeeks team.",
};

export default async function BlogPage() {
  const blogs = await getBlogs();
  return <BlogContent blogs={blogs} />;
}
