import type { Blog } from "@/types/blog";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
const REVALIDATE_SECONDS = 60;

export async function getBlogs(params?: { category?: string; search?: string }): Promise<Blog[]> {
  const query = new URLSearchParams();
  query.set("limit", "50");
  if (params?.category) query.set("category", params.category);
  if (params?.search) query.set("search", params.search);

  const res = await fetch(`${API_BASE_URL}/blogs?${query.toString()}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data ?? [];
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const res = await fetch(`${API_BASE_URL}/blogs/${slug}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data ?? null;
}
