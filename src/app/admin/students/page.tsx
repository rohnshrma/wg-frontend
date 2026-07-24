"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarClock,
  CheckCircle2,
  LayoutGrid,
  List,
  Mail,
  Phone,
  Search,
  Trash2,
  User,
  UserX,
  Users,
  XCircle,
} from "lucide-react";
import api from "@/lib/api";
import InstallmentPlanModal from "@/components/admin/InstallmentPlanModal";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";

type CourseSummary = {
  title?: string;
  slug?: string;
};

type Student = {
  _id: string;
  admissionId?: string;
  fullName: string;
  email: string;
  photoUrl?: string;
  studentContactNumber?: string;
  status: "pending" | "approved" | "rejected";
  courseId?: CourseSummary;
  createdAt?: string;
  rejectionReason?: string;
  pendingAmount?: number;
};

const statusClass: Record<Student["status"], string> = {
  pending: "bg-warning-light text-warning",
  approved: "bg-success-light text-success",
  rejected: "bg-destructive-light text-destructive",
};

const VIEW_STORAGE_KEY = "admin-students-view";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");
  const [installmentModalStudent, setInstallmentModalStudent] = useState<Student | null>(null);
  const [deleteModalStudent, setDeleteModalStudent] = useState<Student | null>(null);
  const [view, setView] = useState<"list" | "grid">("list");

  useEffect(() => {
    const saved = localStorage.getItem(VIEW_STORAGE_KEY);
    if (saved === "grid" || saved === "list") setView(saved);
  }, []);

  const changeView = (next: "list" | "grid") => {
    setView(next);
    localStorage.setItem(VIEW_STORAGE_KEY, next);
  };

  const filteredStudents = useMemo(() => {
    const term = search.trim().toLowerCase();
    return students.filter((student) => {
      const matchesStatus = !status || student.status === status;
      const matchesSearch =
        !term ||
        student.fullName.toLowerCase().includes(term) ||
        student.email.toLowerCase().includes(term) ||
        student.admissionId?.toLowerCase().includes(term);
      return matchesStatus && matchesSearch;
    });
  }, [search, status, students]);

  const fetchStudents = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await api.get("/students?limit=100");
      setStudents(res.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not load students");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const updateRegistration = async (studentId: string, action: "approve" | "reject") => {
    const reason = action === "reject" ? window.prompt("Reason for rejection?") : "";
    if (action === "reject" && !reason?.trim()) return;

    setBusyId(studentId);
    setError("");
    try {
      await api.patch(
        `/students/${studentId}/${action}`,
        action === "reject" ? { reason } : undefined
      );
      await fetchStudents();
    } catch (err: any) {
      setError(err.response?.data?.message || `Could not ${action} student`);
    } finally {
      setBusyId("");
    }
  };

  const actionButtons = (student: Student, stopPropagation = false) => {
    const stop = (e: React.MouseEvent) => {
      if (stopPropagation) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const deleteButton = (
      <button
        onClick={(e) => { stop(e); setDeleteModalStudent(student); }}
        title="Delete student"
        className="p-1.5 rounded-lg border border-border text-destructive hover:bg-destructive-light"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    );

    if (student.status === "pending") {
      return (
        <div className="flex gap-2">
          <button
            onClick={(e) => { stop(e); updateRegistration(student._id, "approve"); }}
            disabled={busyId === student._id}
            className="px-3 py-1.5 rounded-lg bg-success text-white text-xs font-semibold flex items-center gap-1 disabled:opacity-50"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Approve
          </button>
          <button
            onClick={(e) => { stop(e); updateRegistration(student._id, "reject"); }}
            disabled={busyId === student._id}
            className="px-3 py-1.5 rounded-lg bg-destructive text-white text-xs font-semibold flex items-center gap-1 disabled:opacity-50"
          >
            <XCircle className="w-3.5 h-3.5" /> Reject
          </button>
          {deleteButton}
        </div>
      );
    }
    if (student.status === "approved") {
      return (
        <div className="flex gap-2">
          <button
            onClick={(e) => { stop(e); setInstallmentModalStudent(student); }}
            className="px-3 py-1.5 rounded-lg border border-border text-text-secondary text-xs font-semibold flex items-center gap-1 hover:bg-gray-50"
          >
            <CalendarClock className="w-3.5 h-3.5" /> Installments
          </button>
          {deleteButton}
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-text-muted flex items-center gap-1">
          <UserX className="w-3.5 h-3.5" /> No action
        </span>
        {deleteButton}
      </div>
    );
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="px-4 py-2.5 rounded-lg border border-border text-sm text-text-secondary bg-white flex-1 sm:flex-none"
          >
            <option value="">All Status</option>
            <option value="pending">Pending Approval</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <div className="flex items-center rounded-lg border border-border overflow-hidden shrink-0">
            <button
              onClick={() => changeView("list")}
              aria-label="List view"
              className={`p-2.5 ${view === "list" ? "bg-primary text-white" : "bg-white text-text-muted hover:bg-gray-50"}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => changeView("grid")}
              aria-label="Grid view"
              className={`p-2.5 ${view === "grid" ? "bg-primary text-white" : "bg-white text-text-muted hover:bg-gray-50"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {error && <div className="px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">{error}</div>}

      {isLoading ? (
        <div className="bg-white rounded-xl border border-border py-16 text-center text-text-muted text-sm">Loading students...</div>
      ) : filteredStudents.length === 0 ? (
        <div className="bg-white rounded-xl border border-border py-16 text-center">
          <Users className="w-12 h-12 mx-auto mb-3 text-text-muted opacity-30" />
          <p className="font-medium text-text-muted">No students found</p>
          <p className="text-xs text-text-muted mt-1">Completed student profiles will appear here for approval.</p>
        </div>
      ) : view === "list" ? (
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-gray-50/50">
                  <th className="text-left px-4 py-3 font-semibold text-text-secondary">Adm. ID</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-secondary">Student</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-secondary">Contact</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-secondary">Course</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-secondary">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student._id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-text-secondary">{student.admissionId || "Pending"}</td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/students/${student._id}`} className="font-semibold text-text-primary hover:text-primary hover:underline">
                        {student.fullName}
                      </Link>
                      <p className="text-xs text-text-muted">{student.email}</p>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">{student.studentContactNumber || "-"}</td>
                    <td className="px-4 py-3 text-text-secondary">{student.courseId?.title || "-"}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusClass[student.status]}`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{actionButtons(student)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.map((student) => (
            <Link
              key={student._id}
              href={`/admin/students/${student._id}`}
              className="block bg-white rounded-xl border border-border p-5 card-hover"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-lg overflow-hidden bg-primary-50 flex items-center justify-center shrink-0">
                  {student.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={student.photoUrl} alt={student.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-text-primary truncate">{student.fullName}</p>
                  <p className="text-xs text-text-muted">{student.admissionId || "No admission ID"}</p>
                </div>
              </div>

              <div className="space-y-1.5 mb-3">
                <p className="text-xs text-text-secondary flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-text-muted shrink-0" /> {student.email}</p>
                {student.studentContactNumber && (
                  <p className="text-xs text-text-secondary flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-text-muted shrink-0" /> {student.studentContactNumber}</p>
                )}
                <p className="text-xs text-text-secondary">{student.courseId?.title || "No course assigned"}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusClass[student.status]}`}>
                  {student.status}
                </span>
                <div onClick={(e) => e.preventDefault()}>{actionButtons(student, true)}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {installmentModalStudent && (
        <InstallmentPlanModal
          studentId={installmentModalStudent._id}
          studentName={installmentModalStudent.fullName}
          pendingAmount={installmentModalStudent.pendingAmount || 0}
          onClose={() => setInstallmentModalStudent(null)}
        />
      )}

      {deleteModalStudent && (
        <ConfirmDeleteModal
          title="Delete Student"
          message={`This permanently deletes ${deleteModalStudent.fullName}'s admission record, along with their payment and installment history. This cannot be undone.`}
          onClose={() => setDeleteModalStudent(null)}
          onConfirm={async () => {
            await api.delete(`/students/${deleteModalStudent._id}`);
            setDeleteModalStudent(null);
            await fetchStudents();
          }}
        />
      )}
    </motion.div>
  );
}
