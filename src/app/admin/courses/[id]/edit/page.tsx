"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CourseForm from "@/components/admin/CourseForm";
import api from "@/lib/api";
import type { Course } from "@/types/course";

export default function EditCoursePage() {
  const params = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/courses/admin/${params.id}`);
        setCourse(res.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Could not load course");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [params.id]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-text-primary">Edit Course</h2>
      {error && <div className="px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm max-w-3xl">{error}</div>}
      {isLoading ? (
        <p className="text-sm text-text-muted">Loading...</p>
      ) : (
        course && <CourseForm course={course} />
      )}
    </div>
  );
}
