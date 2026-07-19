"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Search, UserX, Users, XCircle } from "lucide-react";

type CourseSummary = {
  title?: string;
  slug?: string;
};

type Student = {
  _id: string;
  admissionId?: string;
  fullName: string;
  email: string;
  studentContactNumber?: string;
  status: "pending" | "approved" | "rejected";
  courseId?: CourseSummary;
  createdAt?: string;
  rejectionReason?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

const statusClass: Record<Student["status"], string> = {
  pending: "bg-warning-light text-warning",
  approved: "bg-success-light text-success",
  rejected: "bg-destructive-light text-destructive",
};

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");

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
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/students?limit=100`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Could not load students");
      setStudents(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load students");
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
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/students/${studentId}/${action}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: action === "reject" ? JSON.stringify({ reason }) : undefined,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `Could not ${action} student`);
      await fetchStudents();
    } catch (err) {
      setError(err instanceof Error ? err.message : `Could not ${action} student`);
    } finally {
      setBusyId("");
    }
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
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="px-4 py-2.5 rounded-lg border border-border text-sm text-text-secondary bg-white"
        >
          <option value="">All Status</option>
          <option value="pending">Pending Approval</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {error && <div className="px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">{error}</div>}

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
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-16 text-text-muted">Loading students...</td></tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16">
                    <Users className="w-12 h-12 mx-auto mb-3 text-text-muted opacity-30" />
                    <p className="font-medium text-text-muted">No students found</p>
                    <p className="text-xs text-text-muted mt-1">Completed student profiles will appear here for approval.</p>
                  </td>
                </tr>
              ) : filteredStudents.map((student) => (
                <tr key={student._id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-text-secondary">{student.admissionId || "Pending"}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-text-primary">{student.fullName}</p>
                    <p className="text-xs text-text-muted">{student.email}</p>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{student.studentContactNumber || "-"}</td>
                  <td className="px-4 py-3 text-text-secondary">{student.courseId?.title || "-"}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusClass[student.status]}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {student.status === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateRegistration(student._id, "approve")}
                          disabled={busyId === student._id}
                          className="px-3 py-1.5 rounded-lg bg-success text-white text-xs font-semibold flex items-center gap-1 disabled:opacity-50"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button
                          onClick={() => updateRegistration(student._id, "reject")}
                          disabled={busyId === student._id}
                          className="px-3 py-1.5 rounded-lg bg-destructive text-white text-xs font-semibold flex items-center gap-1 disabled:opacity-50"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-text-muted flex items-center gap-1">
                        <UserX className="w-3.5 h-3.5" /> No action
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
