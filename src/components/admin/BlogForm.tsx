"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Save } from "lucide-react";
import api from "@/lib/api";
import DocumentUploadField from "@/components/forms/DocumentUploadField";
import RichTextEditor from "@/components/admin/RichTextEditor";
import type { Blog } from "@/types/blog";

type BlogFormValues = {
  title: string;
  excerpt: string;
  content: string;
  contentType: "html" | "plain";
  coverImageUrl: string;
  category: string;
  tags: string;
  relatedPosts: string;
  isPublished: boolean;
  metaTitle: string;
  metaDescription: string;
};

const toFormValues = (blog?: Blog | Partial<Blog> | null): BlogFormValues => ({
  title: blog?.title || "",
  excerpt: blog?.excerpt || "",
  content: blog?.content || "",
  contentType: (blog?.contentType as "html" | "plain") || "html",
  coverImageUrl: blog?.coverImageUrl || "",
  category: blog?.category || "",
  tags: Array.isArray(blog?.tags) ? blog.tags.join(", ") : "",
  relatedPosts: Array.isArray(blog?.relatedPosts) ? (blog.relatedPosts as any[]).map((p) => typeof p === "string" ? p : p._id || "").join(", ") : "",
  isPublished: blog?.isPublished ?? false,
  metaTitle: blog?.metaTitle || "",
  metaDescription: blog?.metaDescription || "",
});

export default function BlogForm({ blog, initialData }: { blog?: Blog | null; initialData?: Partial<Blog> | null }) {
  const router = useRouter();
  const [values, setValues] = useState<BlogFormValues>(toFormValues(blog || initialData));
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const update = <K extends keyof BlogFormValues>(key: K, value: BlogFormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const inputClass = "w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");

    const payload = {
      title: values.title,
      excerpt: values.excerpt,
      content: values.content,
      contentType: values.contentType,
      coverImageUrl: values.coverImageUrl,
      category: values.category,
      tags: values.tags.split(",").map((t) => t.trim()).filter(Boolean),
      relatedPosts: values.relatedPosts.split(",").map((id) => id.trim()).filter(Boolean),
      isPublished: values.isPublished,
      metaTitle: values.metaTitle,
      metaDescription: values.metaDescription,
    };

    try {
      if (blog) {
        await api.put(`/blogs/${blog._id}`, payload);
      } else {
        await api.post("/blogs", payload);
      }
      router.push("/admin/blogs");
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not save blog post");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm"><AlertCircle className="w-4 h-4" /> {error}</div>}

      <div className="bg-white rounded-xl border border-border p-6 space-y-4">
        <h3 className="font-bold text-text-primary">Content</h3>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Title *</label>
          <input required value={values.title} onChange={(e) => update("title", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Excerpt * (max 300 chars)</label>
          <textarea required maxLength={300} rows={2} value={values.excerpt} onChange={(e) => update("excerpt", e.target.value)} className={`${inputClass} resize-none`} />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Content * (Use the editor below for rich formatting)</label>
          <RichTextEditor value={values.content} onChange={(content) => update("content", content)} />
        </div>
        <DocumentUploadField
          label="Cover Image *"
          value={values.coverImageUrl}
          onChange={(url) => update("coverImageUrl", url)}
          uploadType="image"
          folder="webigeeks/blog"
          accept="image/jpeg,image/png,image/webp"
        />
      </div>

      <div className="bg-white rounded-xl border border-border p-6 space-y-4">
        <h3 className="font-bold text-text-primary">Details</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Category *</label>
            <input required value={values.category} onChange={(e) => update("category", e.target.value)} className={inputClass} placeholder="e.g. Career, Tech, AI" />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Tags (comma-separated)</label>
            <input value={values.tags} onChange={(e) => update("tags", e.target.value)} className={inputClass} placeholder="python, data-science" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Related Posts (comma-separated blog IDs for backlinks)</label>
          <input value={values.relatedPosts} onChange={(e) => update("relatedPosts", e.target.value)} className={inputClass} placeholder="paste blog IDs here" />
        </div>
        <label className="flex items-center gap-2 text-sm text-text-secondary">
          <input type="checkbox" checked={values.isPublished} onChange={(e) => update("isPublished", e.target.checked)} className="rounded border-border" />
          Published / visible on site
        </label>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 space-y-4">
        <h3 className="font-bold text-text-primary">SEO (optional)</h3>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Meta Title</label>
          <input value={values.metaTitle} onChange={(e) => update("metaTitle", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Meta Description</label>
          <textarea rows={2} value={values.metaDescription} onChange={(e) => update("metaDescription", e.target.value)} className={`${inputClass} resize-none`} />
        </div>
      </div>

      <button type="submit" disabled={isSaving} className="px-6 py-3 rounded-xl gradient-primary text-white font-bold shadow-md hover:shadow-glow transition-all disabled:opacity-50 flex items-center gap-2">
        {isSaving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
        {blog ? "Save Changes" : "Create Blog Post"}
      </button>
    </form>
  );
}
