"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TestimonialForm from "@/components/admin/TestimonialForm";
import api from "@/lib/api";
import type { Testimonial } from "@/types/testimonial";

export default function EditTestimonialPage() {
  const params = useParams<{ id: string }>();
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/testimonials/admin/all");
        const found = (res.data.data as Testimonial[]).find((t) => t._id === params.id);
        if (!found) throw new Error("Testimonial not found");
        setTestimonial(found);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Could not load testimonial");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [params.id]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-text-primary">Edit Testimonial</h2>
      {error && <div className="px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm max-w-2xl">{error}</div>}
      {isLoading ? (
        <p className="text-sm text-text-muted">Loading...</p>
      ) : (
        testimonial && <TestimonialForm testimonial={testimonial} />
      )}
    </div>
  );
}
