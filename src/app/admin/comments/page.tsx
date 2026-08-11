"use client";

import { useEffect, useState } from "react";
import { Check, Trash2, AlertCircle, MessageCircle } from "lucide-react";
import api from "@/lib/api";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";

interface Comment {
  _id: string;
  blog: { title: string; slug: string; _id: string };
  author: string;
  email: string;
  content: string;
  isApproved: boolean;
  createdAt: string;
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Comment | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await api.get("/comments/admin/all");
      setComments(res.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not load comments");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (comment: Comment) => {
    try {
      await api.put(`/comments/${comment._id}/approve`);
      setComments((prev) =>
        prev.map((c) => (c._id === comment._id ? { ...c, isApproved: true } : c))
      );
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to approve comment");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/comments/${deleteTarget._id}`);
      setComments((prev) => prev.filter((c) => c._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete comment");
    }
  };

  const filtered = comments.filter((c) => {
    if (filter === "pending") return !c.isApproved;
    if (filter === "approved") return c.isApproved;
    return true;
  });

  const stats = {
    total: comments.length,
    pending: comments.filter((c) => !c.isApproved).length,
    approved: comments.filter((c) => c.isApproved).length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2 mb-1">
          <MessageCircle className="w-6 h-6 text-primary" />
          Comments Management
        </h1>
        <p className="text-text-secondary text-sm">Review and moderate blog comments</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: "Total", count: stats.total, color: "bg-blue-50 text-blue-600" },
          { label: "Pending Review", count: stats.pending, color: "bg-yellow-50 text-yellow-600" },
          { label: "Approved", count: stats.approved, color: "bg-green-50 text-green-600" },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.color} rounded-lg p-4`}>
            <p className="text-xs font-medium opacity-75">{stat.label}</p>
            <p className="text-3xl font-bold mt-1">{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(["all", "pending", "approved"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === f
                ? "gradient-primary text-white shadow-md"
                : "border border-border text-text-secondary hover:bg-gray-50"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {error && (
        <div className="flex gap-2 px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {/* Comments Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="border-b border-border bg-gray-50/50">
                <th className="text-left px-4 py-3 font-semibold text-text-secondary">Author</th>
                <th className="text-left px-4 py-3 font-semibold text-text-secondary">Blog</th>
                <th className="text-left px-4 py-3 font-semibold text-text-secondary">Comment</th>
                <th className="text-left px-4 py-3 font-semibold text-text-secondary">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-text-muted">
                    Loading comments...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <MessageCircle className="w-12 h-12 mx-auto mb-3 text-text-muted opacity-30" />
                    <p className="font-medium text-text-muted">No comments yet</p>
                  </td>
                </tr>
              ) : (
                filtered.map((comment) => (
                  <tr key={comment._id} className="border-b border-border last:border-0 hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-semibold text-text-primary">{comment.author}</p>
                        <p className="text-xs text-text-muted">{comment.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`/blog/${comment.blog.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-xs font-medium truncate max-w-xs block"
                        title={comment.blog.title}
                      >
                        {comment.blog.title}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-text-secondary line-clamp-2 max-w-sm">{comment.content}</p>
                      <p className="text-xs text-text-muted mt-1">
                        {new Date(comment.createdAt).toLocaleDateString("en-IN")}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          comment.isApproved
                            ? "bg-success-light text-success"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {comment.isApproved ? "Approved" : "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {!comment.isApproved && (
                          <button
                            onClick={() => handleApprove(comment)}
                            className="p-1.5 rounded-lg hover:bg-green-100 text-success hover:text-success/70 transition-colors"
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => setDeleteTarget(comment)}
                          className="p-1.5 rounded-lg hover:bg-red-100 text-destructive hover:text-destructive/70 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {deleteTarget && (
        <ConfirmDeleteModal
          title="Delete Comment"
          message={`Remove comment by "${deleteTarget.author}"?`}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
