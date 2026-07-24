"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Trash2,
  User,
  Users,
  XCircle,
} from "lucide-react";
import api from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import InstallmentPlanModal from "@/components/admin/InstallmentPlanModal";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";
import type { Student } from "@/types/student";

const statusClass: Record<Student["status"], string> = {
  pending: "bg-warning-light text-warning",
  approved: "bg-success-light text-success",
  rejected: "bg-destructive-light text-destructive",
};

export default function AdminStudentDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isActing, setIsActing] = useState(false);
  const [showInstallments, setShowInstallments] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const load = async () => {
    try {
      const res = await api.get(`/students/${params.id}`);
      setStudent(res.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not load student");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const updateStatus = async (action: "approve" | "reject") => {
    const reason = action === "reject" ? window.prompt("Reason for rejection?") : "";
    if (action === "reject" && !reason?.trim()) return;

    setIsActing(true);
    setError("");
    try {
      await api.patch(`/students/${params.id}/${action}`, action === "reject" ? { reason } : undefined);
      await load();
    } catch (err: any) {
      setError(err.response?.data?.message || `Could not ${action} student`);
    } finally {
      setIsActing(false);
    }
  };

  if (isLoading) {
    return <p className="text-sm text-text-muted">Loading student...</p>;
  }

  if (!student) {
    return (
      <div className="space-y-4">
        {error && <div className="px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">{error}</div>}
        <Link href="/admin/students" className="text-sm text-primary font-semibold flex items-center gap-1 w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Students
        </Link>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <Link href="/admin/students" className="text-sm text-text-secondary font-medium flex items-center gap-1 hover:text-primary">
          <ArrowLeft className="w-4 h-4" /> Back to Students
        </Link>
        <div className="flex gap-2">
          {student.status === "approved" && (
            <button
              onClick={() => setShowInstallments(true)}
              className="px-3 py-1.5 rounded-lg border border-border text-text-secondary text-xs font-semibold flex items-center gap-1 hover:bg-gray-50"
            >
              <CalendarClock className="w-3.5 h-3.5" /> Installments
            </button>
          )}
          <button
            onClick={() => setShowDelete(true)}
            className="px-3 py-1.5 rounded-lg border border-border text-destructive text-xs font-semibold flex items-center gap-1 hover:bg-destructive-light"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      </div>

      {error && <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm"><AlertCircle className="w-4 h-4" /> {error}</div>}

      {/* Header */}
      <div className="bg-white rounded-xl border border-border p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-primary-50 flex items-center justify-center shrink-0">
              {student.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={student.photoUrl} alt={student.fullName} className="w-full h-full object-cover" />
              ) : (
                <User className="w-8 h-8 text-primary" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">{student.fullName}</h2>
              <p className="text-sm text-text-muted">{student.admissionId || "No admission ID yet"}</p>
              <span className={`inline-block mt-1 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusClass[student.status]}`}>
                {student.status}
              </span>
            </div>
          </div>

          {student.status === "pending" && (
            <div className="flex gap-2">
              <button
                onClick={() => updateStatus("approve")}
                disabled={isActing}
                className="px-4 py-2 rounded-lg bg-success text-white text-sm font-semibold flex items-center gap-1.5 disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" /> Approve
              </button>
              <button
                onClick={() => updateStatus("reject")}
                disabled={isActing}
                className="px-4 py-2 rounded-lg bg-destructive text-white text-sm font-semibold flex items-center gap-1.5 disabled:opacity-50"
              >
                <XCircle className="w-4 h-4" /> Reject
              </button>
            </div>
          )}
        </div>

        {student.status === "rejected" && student.rejectionReason && (
          <div className="mt-4 px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">
            <strong>Rejection reason:</strong> {student.rejectionReason}
          </div>
        )}
        {student.status === "approved" && student.approvedAt && (
          <div className="mt-4 px-4 py-3 rounded-lg bg-success-light text-success text-sm">
            Approved on {formatDate(student.approvedAt)}{student.approvedBy?.email ? ` by ${student.approvedBy.email}` : ""}
          </div>
        )}
      </div>

      {/* Personal Info */}
      <Section title="Personal Information" icon={User}>
        <Field label="Date of Birth" value={formatDate(student.dateOfBirth)} />
        <Field label="Gender" value={student.gender} capitalize />
        <Field label="Email" value={student.email} icon={Mail} />
        <Field label="Phone" value={student.studentContactNumber} icon={Phone} />
      </Section>

      {/* Documents */}
      <Section title="Documents" icon={FileText}>
        <DocumentField label="Passport Photo" url={student.photoUrl} />
        <DocumentField label="Aadhaar Card" url={student.aadhaarUrl} />
      </Section>

      {/* Family */}
      <Section title="Family Information" icon={Users}>
        <Field label="Father's Name" value={student.fatherName} />
        <Field label="Mother's Name" value={student.motherName} />
        <Field label="Parent Contact" value={student.parentContactNumber} icon={Phone} />
      </Section>

      {/* Address */}
      <Section title="Address" icon={MapPin}>
        <Field label="Street" value={student.address.street} wide />
        <Field label="City" value={student.address.city} />
        <Field label="State" value={student.address.state} />
        <Field label="Pincode" value={student.address.pincode} />
      </Section>

      {/* Education & Course */}
      <Section title="Education & Course" icon={GraduationCap}>
        <Field label="Qualification" value={student.qualification} />
        <Field label="Course" value={student.courseId?.title || "Not assigned"} />
        <Field label="Joining Date" value={formatDate(student.joiningDate)} />
        <Field label="Payment Mode" value={student.paymentMode} capitalize />
      </Section>

      {/* Payment Summary */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="font-bold text-text-primary mb-4">Payment Summary</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs text-text-muted mb-1">Course Fees</p>
            <p className="font-bold text-text-primary">{formatCurrency(student.courseFees)}</p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs text-text-muted mb-1">Paid</p>
            <p className="font-bold text-success">{formatCurrency(student.totalPaid)}</p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs text-text-muted mb-1">Pending</p>
            <p className="font-bold text-warning">{formatCurrency(student.pendingAmount)}</p>
          </div>
        </div>
      </div>

      {showInstallments && (
        <InstallmentPlanModal
          studentId={student._id}
          studentName={student.fullName}
          pendingAmount={student.pendingAmount}
          onClose={() => setShowInstallments(false)}
        />
      )}

      {showDelete && (
        <ConfirmDeleteModal
          title="Delete Student"
          message={`This permanently deletes ${student.fullName}'s admission record, along with their payment and installment history. This cannot be undone.`}
          onClose={() => setShowDelete(false)}
          onConfirm={async () => {
            await api.delete(`/students/${student._id}`);
            router.push("/admin/students");
          }}
        />
      )}
    </motion.div>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
        <Icon className="w-5 h-5 text-primary" /> {title}
      </h3>
      <div className="grid sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Field({ label, value, wide, capitalize, icon: Icon }: { label: string; value: string; wide?: boolean; capitalize?: boolean; icon?: any }) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <p className="text-xs text-text-muted mb-1">{label}</p>
      <p className={`text-sm font-semibold text-text-primary flex items-center gap-1.5 ${capitalize ? "capitalize" : ""}`}>
        {Icon && <Icon className="w-3.5 h-3.5 text-text-muted shrink-0" />}
        {value || "-"}
      </p>
    </div>
  );
}

function DocumentField({ label, url }: { label: string; url: string }) {
  return (
    <div>
      <p className="text-xs text-text-muted mb-1">{label}</p>
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" /> View Document
        </a>
      ) : (
        <p className="text-sm text-text-muted flex items-center gap-1.5">
          <XCircle className="w-3.5 h-3.5" /> Not uploaded
        </p>
      )}
    </div>
  );
}
