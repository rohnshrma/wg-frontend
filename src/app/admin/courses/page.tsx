"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Plus, Search, Pencil, Trash2, Star } from "lucide-react";
import api from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";
import type { Course } from "@/types/course";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");
  const [deleteModalCourse, setDeleteModalCourse] = useState<Course | null>(null);

  const fetchCourses = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await api.get("/courses/admin/all");
      setCourses(res.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not load courses");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return courses;
    return courses.filter((c) => c.title.toLowerCase().includes(term));
  }, [courses, search]);

  const reactivate = async (course: Course) => {
    setBusyId(course._id);
    try {
      await api.put(`/courses/${course._id}`, { isActive: true });
      await fetchCourses();
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not update course");
    } finally {
      setBusyId("");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <Link href="/admin/courses/new" className="px-4 py-2.5 rounded-lg gradient-primary text-white text-sm font-bold shadow-sm hover:shadow-glow flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Add Course
        </Link>
      </div>

      {error && <div className="px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">{error}</div>}

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="scroll-x">
          <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="border-b border-border bg-gray-50/50">
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Course</th>
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Duration</th>
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Fees</th>
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} className="text-center py-16 text-text-muted">Loading courses...</td></tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-16">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 text-text-muted opacity-30" />
                  <p className="font-medium text-text-muted">No courses yet</p>
                </td>
              </tr>
            ) : filtered.map((course) => (
              <tr key={course._id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {course.isFeatured && <Star className="w-3.5 h-3.5 text-accent fill-accent shrink-0" />}
                    <span className="font-semibold text-text-primary">{course.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-text-secondary">{course.duration}</td>
                <td className="px-4 py-3 text-text-secondary">{formatCurrency(course.fees)}</td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${course.isActive ? "bg-success-light text-success" : "bg-gray-100 text-text-muted"}`}>
                    {course.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/courses/${course._id}/edit`} className="p-1.5 rounded-lg hover:bg-gray-100 text-text-secondary" title="Edit">
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => (course.isActive ? setDeleteModalCourse(course) : reactivate(course))}
                      disabled={busyId === course._id}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-destructive disabled:opacity-50"
                      title={course.isActive ? "Deactivate" : "Reactivate"}
                    >
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

      {deleteModalCourse && (
        <ConfirmDeleteModal
          title="Deactivate Course"
          message={`This removes "${deleteModalCourse.title}" from the public site. It can be reactivated later from this page. Existing student enrollments are unaffected.`}
          confirmLabel="Deactivate"
          onClose={() => setDeleteModalCourse(null)}
          onConfirm={async () => {
            await api.delete(`/courses/${deleteModalCourse._id}`);
            setDeleteModalCourse(null);
            await fetchCourses();
          }}
        />
      )}
    </motion.div>
  );
}
