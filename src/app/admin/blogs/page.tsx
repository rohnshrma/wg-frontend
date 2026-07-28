"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PenSquare, Plus, Pencil, Search, Trash2 } from "lucide-react";
import api from "@/lib/api";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";
import type { Blog } from "@/types/blog";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null);

  const fetchBlogs = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await api.get("/blogs/admin/all");
      setBlogs(res.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not load blog posts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return blogs;
    return blogs.filter((b) => b.title.toLowerCase().includes(term));
  }, [blogs, search]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <Link href="/admin/blogs/new" className="px-4 py-2.5 rounded-lg gradient-primary text-white text-sm font-bold shadow-sm hover:shadow-glow flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> New Blog Post
        </Link>
      </div>

      {error && <div className="px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">{error}</div>}

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="scroll-x">
          <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="border-b border-border bg-gray-50/50">
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Title</th>
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Category</th>
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Views</th>
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} className="text-center py-16 text-text-muted">Loading blog posts...</td></tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-16">
                  <PenSquare className="w-12 h-12 mx-auto mb-3 text-text-muted opacity-30" />
                  <p className="font-medium text-text-muted">No blog posts yet</p>
                  <p className="text-xs text-text-muted mt-1">Create your first blog post to share insights.</p>
                </td>
              </tr>
            ) : filtered.map((blog) => (
              <tr key={blog._id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-semibold text-text-primary max-w-xs truncate">{blog.title}</td>
                <td className="px-4 py-3 text-text-secondary">{blog.category}</td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${blog.isPublished ? "bg-success-light text-success" : "bg-gray-100 text-text-muted"}`}>
                    {blog.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-text-secondary">{blog.viewCount}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/blogs/${blog._id}/edit`} className="p-1.5 rounded-lg hover:bg-gray-100 text-text-secondary" title="Edit">
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button onClick={() => setDeleteTarget(blog)} className="p-1.5 rounded-lg hover:bg-gray-100 text-destructive" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>

      {deleteTarget && (
        <ConfirmDeleteModal
          title="Delete Blog Post"
          message={`This permanently removes "${deleteTarget.title}".`}
          onClose={() => setDeleteTarget(null)}
          onConfirm={async () => {
            await api.delete(`/blogs/${deleteTarget._id}`);
            setDeleteTarget(null);
            await fetchBlogs();
          }}
        />
      )}
    </motion.div>
  );
}
