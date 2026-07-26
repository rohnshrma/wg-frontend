"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Save, Star } from "lucide-react";
import api from "@/lib/api";
import DocumentUploadField from "@/components/forms/DocumentUploadField";
import type { Testimonial } from "@/types/testimonial";

type TestimonialFormValues = {
  studentName: string;
  courseName: string;
  companyPlaced: string;
  designation: string;
  salaryPackage: string;
  photoUrl: string;
  testimonialText: string;
  rating: number;
  displayOrder: string;
  isActive: boolean;
};

const toFormValues = (testimonial?: Testimonial | null): TestimonialFormValues => ({
  studentName: testimonial?.studentName || "",
  courseName: testimonial?.courseName || "",
  companyPlaced: testimonial?.companyPlaced || "",
  designation: testimonial?.designation || "",
  salaryPackage: testimonial?.salaryPackage || "",
  photoUrl: testimonial?.photoUrl || "",
  testimonialText: testimonial?.testimonialText || "",
  rating: testimonial?.rating ?? 5,
  displayOrder: testimonial?.displayOrder?.toString() || "0",
  isActive: testimonial?.isActive ?? true,
});

export default function TestimonialForm({ testimonial }: { testimonial?: Testimonial | null }) {
  const router = useRouter();
  const [values, setValues] = useState<TestimonialFormValues>(toFormValues(testimonial));
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const update = <K extends keyof TestimonialFormValues>(key: K, value: TestimonialFormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const inputClass = "w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");

    const payload = {
      studentName: values.studentName,
      courseName: values.courseName,
      companyPlaced: values.companyPlaced,
      designation: values.designation,
      salaryPackage: values.salaryPackage,
      photoUrl: values.photoUrl,
      testimonialText: values.testimonialText,
      rating: values.rating,
      displayOrder: Number(values.displayOrder) || 0,
      isActive: values.isActive,
    };

    try {
      if (testimonial) {
        await api.put(`/testimonials/${testimonial._id}`, payload);
      } else {
        await api.post("/testimonials", payload);
      }
      router.push("/admin/testimonials");
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not save testimonial");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm"><AlertCircle className="w-4 h-4" /> {error}</div>}

      <div className="bg-white rounded-xl border border-border p-6 space-y-4">
        <h3 className="font-bold text-text-primary">Student Details</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Student Name *</label>
            <input required value={values.studentName} onChange={(e) => update("studentName", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Course Name *</label>
            <input required value={values.courseName} onChange={(e) => update("courseName", e.target.value)} className={inputClass} placeholder="e.g. Data Science" />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Company Placed At</label>
            <input value={values.companyPlaced} onChange={(e) => update("companyPlaced", e.target.value)} className={inputClass} placeholder="e.g. TCS" />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Designation</label>
            <input value={values.designation} onChange={(e) => update("designation", e.target.value)} className={inputClass} placeholder="e.g. Data Analyst" />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Salary Package</label>
            <input value={values.salaryPackage} onChange={(e) => update("salaryPackage", e.target.value)} className={inputClass} placeholder="e.g. 6.5 LPA" />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Display Order</label>
            <input type="number" value={values.displayOrder} onChange={(e) => update("displayOrder", e.target.value)} className={inputClass} />
          </div>
        </div>
        <DocumentUploadField
          label="Student Photo (optional)"
          value={values.photoUrl}
          onChange={(url) => update("photoUrl", url)}
          uploadType="image"
          folder="webigeeks/testimonials"
          accept="image/jpeg,image/png,image/webp"
        />
      </div>

      <div className="bg-white rounded-xl border border-border p-6 space-y-4">
        <h3 className="font-bold text-text-primary">Testimonial</h3>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Testimonial Text *</label>
          <textarea required rows={4} value={values.testimonialText} onChange={(e) => update("testimonialText", e.target.value)} className={`${inputClass} resize-none`} />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Rating *</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" onClick={() => update("rating", n)} className="p-0.5">
                <Star className={`w-6 h-6 ${n <= values.rating ? "text-accent-warm fill-accent-warm" : "text-gray-200"}`} />
              </button>
            ))}
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-text-secondary">
          <input type="checkbox" checked={values.isActive} onChange={(e) => update("isActive", e.target.checked)} className="rounded border-border" />
          Active / visible on site
        </label>
      </div>

      <button type="submit" disabled={isSaving} className="px-6 py-3 rounded-xl gradient-primary text-white font-bold shadow-md hover:shadow-glow transition-all disabled:opacity-50 flex items-center gap-2">
        {isSaving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
        {testimonial ? "Save Changes" : "Add Testimonial"}
      </button>
    </form>
  );
}
