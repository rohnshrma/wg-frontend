import { notFound } from "next/navigation";
import BlogDetailContent from "./BlogDetailContent";
import { getBlogBySlug } from "@/lib/blog";
import { blogPostingSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return { title: "Article Not Found" };

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <>
      <JsonLd data={blogPostingSchema(blog)} />
      <BlogDetailContent blog={blog} />
    </>
  );
}
