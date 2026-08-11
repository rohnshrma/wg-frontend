"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, Monitor, GraduationCap, Info } from "lucide-react";
import api from "@/lib/api";
import { formatCurrency } from "@/lib/utils";

type EnrolledCourse = {
  title: string;
  duration: string;
  mode: string;
  level: string;
  fees: number;
  technologies: string[];
};

export default function CoursePage() {
  const [course, setCourse] = useState<EnrolledCourse | null>(null);
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/students/me/dashboard");
        const studentData = res.data.data?.student;
        setCourse(studentData?.courseId || null);
        setIsApproved(studentData?.status === "approved");
      } catch (err: any) {
        setError(err.response?.data?.message || "Could not load course details");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  if (isLoading) {
    return <p className="text-sm text-text-muted">Loading course details...</p>;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {error && <div className="px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">{error}</div>}

      {!course && (
        <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-primary-50 text-sm text-text-secondary">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p>Your course details will appear here once your admission is approved by the admin.</p>
        </div>
      )}

      <div className="bg-white rounded-xl border border-border p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-primary">{course?.title || "Your Course"}</h3>
            <p className="text-sm text-text-muted">
              {!course
                ? "Course assignment pending"
                : isApproved
                  ? formatCurrency(course.fees)
                  : "Fee details available after admission approval"}
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-background">
            <div className="flex items-center gap-2 text-text-muted text-xs mb-1">
              <Clock className="w-3.5 h-3.5" /> Duration
            </div>
            <p className="font-bold text-text-primary">{course?.duration || "—"}</p>
          </div>
          <div className="p-4 rounded-lg bg-background">
            <div className="flex items-center gap-2 text-text-muted text-xs mb-1">
              <Monitor className="w-3.5 h-3.5" /> Mode
            </div>
            <p className="font-bold text-text-primary capitalize">{course?.mode || "—"}</p>
          </div>
          <div className="p-4 rounded-lg bg-background">
            <div className="flex items-center gap-2 text-text-muted text-xs mb-1">
              <GraduationCap className="w-3.5 h-3.5" /> Level
            </div>
            <p className="font-bold text-text-primary capitalize">{course?.level || "—"}</p>
          </div>
        </div>

        {course ? (
          course.technologies?.length > 0 && (
            <div>
              <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Technologies</p>
              <div className="flex flex-wrap gap-2">
                {course.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-lg bg-primary-50 text-primary text-xs font-semibold">{tech}</span>
                ))}
              </div>
            </div>
          )
        ) : (
          <div className="text-center py-8 text-text-muted">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No course assigned yet</p>
            <p className="text-xs mt-1">Complete your profile and wait for admin approval.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
