import { notFound } from "next/navigation";
import BlogDetailContent from "./BlogDetailContent";
import { getBlogBySlug } from "@/lib/blog";
import { blogPostingSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return { title: "Article Not Found", robots: { index: false, follow: false } };

  return pageMetadata({
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
    path: `/blog/${blog.slug}`,
  });
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
