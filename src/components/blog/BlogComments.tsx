"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Send, AlertCircle } from "lucide-react";
import api from "@/lib/api";

interface Comment {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
}

export default function BlogComments({ blogId }: { blogId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    author: "",
    email: "",
    content: "",
  });

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/blog/${blogId}`);
      setComments(res.data.data || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.author.trim() || !formData.email.trim() || !formData.content.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post("/comments", {
        blog: blogId,
        author: formData.author,
        email: formData.email,
        content: formData.content,
      });
      setSuccess("Comment submitted! It will appear after moderation.");
      setFormData({ author: "", email: "", content: "" });
      setTimeout(() => setSuccess(""), 5000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="max-w-3xl mx-auto mt-16">
      <div className="border-t border-border pt-10">
        <h2 className="text-2xl font-bold text-text-primary mb-8 flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-primary" />
          Comments ({comments.length})
        </h2>

        {/* Comment Form */}
        <div className="bg-gray-50 rounded-lg p-6 mb-10">
          <h3 className="font-semibold text-text-primary mb-4">Leave a Comment</h3>
          {error && (
            <div className="flex gap-2 px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm mb-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              {error}
            </div>
          )}
          {success && (
            <div className="flex gap-2 px-4 py-3 rounded-lg bg-success-light text-success text-sm mb-4">
              ✓ {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your name"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <input
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <textarea
              placeholder="Your comment..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              maxLength={1000}
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-muted">
                {formData.content.length}/1000 characters
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg gradient-primary text-white text-sm font-semibold hover:shadow-md disabled:opacity-50 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Post Comment
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {loading ? (
            <p className="text-center py-8 text-text-muted">Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="text-center py-8 text-text-muted">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="pb-6 border-b border-border last:border-0">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {comment.author.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-text-primary">{comment.author}</p>
                      <span className="text-xs text-text-muted">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-text-secondary leading-relaxed break-words">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
