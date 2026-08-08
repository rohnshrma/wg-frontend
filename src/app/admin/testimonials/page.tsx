"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageSquare, Plus, Pencil, Star, Trash2 } from "lucide-react";
import api from "@/lib/api";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";
import type { Testimonial } from "@/types/testimonial";
import GoogleLogo from "@/components/shared/GoogleLogo";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await api.get("/testimonials/admin/all");
      setTestimonials(res.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not load testimonials");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-text-secondary text-sm">Manage student testimonials displayed on the website.</p>
        <Link href="/admin/testimonials/new" className="px-4 py-2.5 rounded-lg gradient-primary text-white text-sm font-bold shadow-sm hover:shadow-glow flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Add Testimonial
        </Link>
      </div>

      {error && <div className="px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">{error}</div>}

      {isLoading ? (
        <div className="bg-white rounded-xl border border-border p-6 text-center py-16 text-text-muted">Loading testimonials...</div>
      ) : testimonials.length === 0 ? (
        <div className="bg-white rounded-xl border border-border p-6 text-center py-16">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 text-text-muted opacity-30" />
          <p className="font-medium text-text-muted">No testimonials yet</p>
          <p className="text-xs text-text-muted mt-1">Add success stories from your placed students.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div key={t._id} className="bg-white rounded-xl border border-border p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-bold text-text-primary text-sm">{t.studentName}</p>
                  <p className="text-xs text-text-muted">{t.courseName}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${t.isActive ? "bg-success-light text-success" : "bg-gray-100 text-text-muted"}`}>
                  {t.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={`w-3.5 h-3.5 ${j < t.rating ? "text-accent-warm fill-accent-warm" : "text-gray-200"}`} />
                  ))}
                </div>
                {t.source === "google" && (
                  <span className="inline-flex items-center gap-1 text-xs text-text-muted" title="Verified Google review">
                    <GoogleLogo className="w-3.5 h-3.5" />
                    Google
                  </span>
                )}
              </div>
              <p className="text-sm text-text-secondary line-clamp-2 mb-3">{t.testimonialText}</p>
              <div className="flex items-center gap-2 pt-3 border-t border-border">
                <Link href={`/admin/testimonials/${t._id}/edit`} className="p-1.5 rounded-lg hover:bg-gray-100 text-text-secondary" title="Edit">
                  <Pencil className="w-4 h-4" />
                </Link>
                <button onClick={() => setDeleteTarget(t)} className="p-1.5 rounded-lg hover:bg-gray-100 text-destructive" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteTarget && (
        <ConfirmDeleteModal
          title="Delete Testimonial"
          message={`This removes "${deleteTarget.studentName}"'s testimonial from the site permanently.`}
          onClose={() => setDeleteTarget(null)}
          onConfirm={async () => {
            await api.delete(`/testimonials/${deleteTarget._id}`);
            setDeleteTarget(null);
            await fetchTestimonials();
          }}
        />
      )}
    </motion.div>
  );
}
