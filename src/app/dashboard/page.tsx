"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Bell, BookOpen, CheckCircle2, Clock, CreditCard, FileText } from "lucide-react";
import Link from "next/link";

type DashboardStudent = {
  fullName: string;
  admissionId?: string;
  status: "pending" | "approved" | "rejected";
  email: string;
  studentContactNumber?: string;
  courseId?: { title?: string; duration?: string; fees?: number };
  rejectionReason?: string;
};

type DashboardData = {
  student: DashboardStudent | null;
  unreadNotifications: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

const statusCopy = {
  pending: {
    title: "Registration Pending Approval",
    body: "Your profile has been submitted. Admin approval is pending.",
    icon: Clock,
    box: "bg-warning-light/50",
    text: "text-warning",
  },
  approved: {
    title: "Registration Approved",
    body: "Your registration is approved. Your student details are now locked for admin review.",
    icon: CheckCircle2,
    box: "bg-success-light",
    text: "text-success",
  },
  rejected: {
    title: "Registration Needs Attention",
    body: "Your registration was not approved. Please review the reason and contact support.",
    icon: AlertCircle,
    box: "bg-destructive-light",
    text: "text-destructive",
  },
};

export default function DashboardOverview() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      setIsLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/students/me/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Could not load dashboard");
        setDashboard(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const student = dashboard?.student;
  const status = student ? statusCopy[student.status] : null;
  const StatusIcon = status?.icon;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-primary rounded-2xl p-6 md:p-8 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/4 translate-x-1/4" />
        <h2 className="text-2xl font-extrabold mb-2">Welcome Back</h2>
        <p className="text-white/60 max-w-md">Track registration approval, course details, payments, and notifications.</p>
      </motion.div>

      {error && <div className="px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">{error}</div>}

      <div className="bg-white rounded-xl border border-border p-6">
        {isLoading ? (
          <p className="text-sm text-text-muted">Loading student information...</p>
        ) : !student ? (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning-light flex items-center justify-center">
              <FileText className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary">Complete Your Student Profile</h3>
              <p className="text-sm text-text-muted mt-1">Submit your student information so admin can review and approve your registration.</p>
              <Link href="/dashboard/profile" className="inline-flex mt-4 px-4 py-2 rounded-lg gradient-primary text-white text-sm font-semibold">
                Complete Profile
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className={`flex items-start gap-3 p-4 rounded-lg ${status?.box}`}>
              {StatusIcon && <StatusIcon className={`w-5 h-5 shrink-0 mt-0.5 ${status.text}`} />}
              <div>
                <h3 className="font-bold text-text-primary">{status?.title}</h3>
                <p className="text-sm text-text-secondary mt-1">{status?.body}</p>
                {student.rejectionReason && <p className="text-sm text-destructive mt-2">Reason: {student.rejectionReason}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Info label="Name" value={student.fullName} />
              <Info label="Admission ID" value={student.admissionId || "Will be assigned after approval"} />
              <Info label="Course" value={student.courseId?.title || "Not selected"} />
              <Info label="Contact" value={student.studentContactNumber || student.email} />
            </div>
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: BookOpen, label: "My Course", href: "/dashboard/course", color: "from-primary to-primary-dark", desc: "View course details" },
          { icon: CreditCard, label: "Payments", href: "/dashboard/payments", color: "from-secondary to-secondary-dark", desc: "View payment history" },
          { icon: Bell, label: "Notifications", href: "/dashboard/notifications", color: "from-accent to-accent-warm", desc: `${dashboard?.unreadNotifications || 0} unread updates` },
          { icon: CheckCircle2, label: "Documents", href: "/dashboard/documents", color: "from-success to-emerald-600", desc: "Upload documents" },
        ].map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link href={item.href} className="block bg-white rounded-xl border border-border p-5 card-hover">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-3`}>
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <p className="font-bold text-text-primary text-sm">{item.label}</p>
              <p className="text-xs text-text-muted">{item.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <p className="text-xs text-text-muted mb-1">{label}</p>
      <p className="text-sm font-semibold text-text-primary">{value}</p>
    </div>
  );
}
