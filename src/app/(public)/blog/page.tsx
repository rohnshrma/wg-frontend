import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read articles on Data Science, AI, Web Development, career tips, and tech trends from the WebiGeeks team.",
};

export default function BlogPage() {
  return <BlogContent />;
}
