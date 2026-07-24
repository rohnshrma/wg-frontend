"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Save } from "lucide-react";
import api from "@/lib/api";
import DocumentUploadField from "@/components/forms/DocumentUploadField";
import type { Course } from "@/types/course";

type CourseFormValues = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  mode: "online" | "offline" | "hybrid";
  level: "beginner" | "intermediate" | "advanced";
  fees: string;
  technologies: string;
  thumbnailUrl: string;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: string;
};

const toFormValues = (course?: Course | null): CourseFormValues => ({
  title: course?.title || "",
  shortDescription: course?.shortDescription || "",
  fullDescription: course?.fullDescription || "",
  duration: course?.duration || "",
  mode: course?.mode || "hybrid",
  level: course?.level || "beginner",
  fees: course?.fees?.toString() || "",
  technologies: course?.technologies?.join(", ") || "",
  thumbnailUrl: course?.thumbnailUrl || "",
  isFeatured: course?.isFeatured ?? false,
  isActive: course?.isActive ?? true,
  displayOrder: course?.displayOrder?.toString() || "0",
});

export default function CourseForm({ course }: { course?: Course | null }) {
  const router = useRouter();
  const [values, setValues] = useState<CourseFormValues>(toFormValues(course));
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const update = <K extends keyof CourseFormValues>(key: K, value: CourseFormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const inputClass = "w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");

    const payload = {
      title: values.title,
      shortDescription: values.shortDescription,
      fullDescription: values.fullDescription,
      duration: values.duration,
      mode: values.mode,
      level: values.level,
      fees: Number(values.fees),
      technologies: values.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      thumbnailUrl: values.thumbnailUrl,
      isFeatured: values.isFeatured,
      isActive: values.isActive,
      displayOrder: Number(values.displayOrder) || 0,
    };

    try {
      if (course) {
        await api.put(`/courses/${course._id}`, payload);
      } else {
        await api.post("/courses", payload);
      }
      router.push("/admin/courses");
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not save course");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm"><AlertCircle className="w-4 h-4" /> {error}</div>}

      <div className="bg-white rounded-xl border border-border p-6 space-y-4">
        <h3 className="font-bold text-text-primary">Basic Details</h3>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Title *</label>
          <input required value={values.title} onChange={(e) => update("title", e.target.value)} className={inputClass} placeholder="e.g. Full Stack / MERN Stack Development" />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Short Description * (max 200 chars)</label>
          <textarea required maxLength={200} rows={2} value={values.shortDescription} onChange={(e) => update("shortDescription", e.target.value)} className={`${inputClass} resize-none`} />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1">Full Description *</label>
          <textarea required rows={4} value={values.fullDescription} onChange={(e) => update("fullDescription", e.target.value)} className={`${inputClass} resize-none`} />
        </div>
        <DocumentUploadField
          label="Thumbnail Image"
          value={values.thumbnailUrl}
          onChange={(url) => update("thumbnailUrl", url)}
          uploadType="image"
          folder="webigeeks/courses"
          accept="image/jpeg,image/png,image/webp"
        />
      </div>

      <div className="bg-white rounded-xl border border-border p-6 space-y-4">
        <h3 className="font-bold text-text-primary">Details</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Duration *</label>
            <input required value={values.duration} onChange={(e) => update("duration", e.target.value)} className={inputClass} placeholder="e.g. 3 Months" />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Fees (₹) *</label>
            <input required type="number" min={0} value={values.fees} onChange={(e) => update("fees", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Mode *</label>
            <select value={values.mode} onChange={(e) => update("mode", e.target.value as CourseFormValues["mode"])} className={inputClass}>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Level *</label>
            <select value={values.level} onChange={(e) => update("level", e.target.value as CourseFormValues["level"])} className={inputClass}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-text-secondary mb-1">Technologies (comma-separated)</label>
            <input value={values.technologies} onChange={(e) => update("technologies", e.target.value)} className={inputClass} placeholder="React.js, Node.js, MongoDB" />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Display Order</label>
            <input type="number" value={values.displayOrder} onChange={(e) => update("displayOrder", e.target.value)} className={inputClass} />
          </div>
        </div>
        <div className="flex items-center gap-6 pt-2">
          <label className="flex items-center gap-2 text-sm text-text-secondary">
            <input type="checkbox" checked={values.isFeatured} onChange={(e) => update("isFeatured", e.target.checked)} className="rounded border-border" />
            Featured on homepage
          </label>
          <label className="flex items-center gap-2 text-sm text-text-secondary">
            <input type="checkbox" checked={values.isActive} onChange={(e) => update("isActive", e.target.checked)} className="rounded border-border" />
            Active / visible on site
          </label>
        </div>
      </div>

      <p className="text-xs text-text-muted">
        Curriculum modules, projects, career opportunities, and FAQs aren&apos;t editable from this form yet — they can be updated directly via the seed script or a future dedicated editor.
      </p>

      <button type="submit" disabled={isSaving} className="px-6 py-3 rounded-xl gradient-primary text-white font-bold shadow-md hover:shadow-glow transition-all disabled:opacity-50 flex items-center gap-2">
        {isSaving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
        {course ? "Save Changes" : "Create Course"}
      </button>
    </form>
  );
}
