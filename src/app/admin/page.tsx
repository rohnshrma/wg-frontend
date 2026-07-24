"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, UserPlus, CreditCard, BookOpen, BarChart3, TrendingUp } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import api from "@/lib/api";
import BarChart from "@/components/admin/BarChart";

type Overview = {
  totalStudents: number;
  totalLeads: number;
  pendingAdmissions: number;
  totalCourses: number;
  totalRevenue: number;
  pendingFees: number;
  courseWiseStudents: { courseName: string; count: number }[];
};

type MonthPoint = { month: number; count?: number; total?: number };

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function AdminDashboard() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [revenue, setRevenue] = useState<MonthPoint[]>([]);
  const [admissions, setAdmissions] = useState<MonthPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [overviewRes, revenueRes, admissionsRes] = await Promise.all([
          api.get("/analytics/overview"),
          api.get("/analytics/revenue"),
          api.get("/analytics/admissions"),
        ]);
        setOverview(overviewRes.data.data);
        setRevenue(revenueRes.data.data || []);
        setAdmissions(admissionsRes.data.data || []);
      } catch (err: any) {
        setError(err.response?.data?.message || "Could not load analytics");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const stats = [
    { label: "Total Students", value: overview?.totalStudents ?? 0, icon: Users, color: "from-primary to-primary-dark", href: "/admin/students" },
    { label: "Active Leads", value: overview?.totalLeads ?? 0, icon: UserPlus, color: "from-accent to-accent-warm", href: "/admin/leads" },
    { label: "Revenue", value: formatCurrency(overview?.totalRevenue ?? 0), icon: CreditCard, color: "from-success to-emerald-600", href: "/admin/payments" },
    { label: "Courses", value: overview?.totalCourses ?? 0, icon: BookOpen, color: "from-secondary to-secondary-dark", href: "/admin/courses" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="gradient-hero rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/3 rounded-full translate-y-1/4 -translate-x-1/4" />
        <div className="relative">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
            <BarChart3 className="w-4 h-4" /> Admin Dashboard
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Welcome, Admin! 🚀</h2>
          <p className="text-white/50 max-w-md">
            Manage students, leads, courses, payments, and content — all from one place.
          </p>
        </div>
      </motion.div>

      {error && <div className="px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">{error}</div>}

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link href={stat.href} className="block bg-white rounded-xl border border-border p-5 card-hover">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-extrabold text-text-primary">{isLoading ? "—" : stat.value}</p>
              <p className="text-xs text-text-muted mt-1">{stat.label}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="font-bold text-text-primary mb-1 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Monthly Revenue
          </h3>
          <p className="text-xs text-text-muted mb-4">{new Date().getFullYear()}</p>
          {isLoading ? (
            <p className="text-sm text-text-muted h-40 flex items-center justify-center">Loading...</p>
          ) : (
            <BarChart
              data={monthLabels.map((label, i) => ({ label, value: revenue.find((r) => r.month === i + 1)?.total ?? 0 }))}
              formatValue={(v) => formatCurrency(v)}
            />
          )}
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="font-bold text-text-primary mb-1 flex items-center gap-2">
            <Users className="w-4 h-4 text-secondary" /> Monthly Admissions
          </h3>
          <p className="text-xs text-text-muted mb-4">{new Date().getFullYear()}</p>
          {isLoading ? (
            <p className="text-sm text-text-muted h-40 flex items-center justify-center">Loading...</p>
          ) : (
            <BarChart
              data={monthLabels.map((label, i) => ({ label, value: admissions.find((a) => a.month === i + 1)?.count ?? 0 }))}
              color="var(--color-secondary)"
            />
          )}
        </div>
      </div>

      {/* Course-wise students + pending fees */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="font-bold text-text-primary mb-4">Students by Course</h3>
          {isLoading ? (
            <p className="text-sm text-text-muted">Loading...</p>
          ) : !overview?.courseWiseStudents.length ? (
            <p className="text-sm text-text-muted">No approved students yet.</p>
          ) : (
            <div className="space-y-3">
              {overview.courseWiseStudents.map((c) => {
                const max = Math.max(...overview.courseWiseStudents.map((x) => x.count), 1);
                return (
                  <div key={c.courseName}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-text-secondary">{c.courseName}</span>
                      <span className="font-semibold text-text-primary">{c.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${(c.count / max) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="font-bold text-text-primary mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { label: "Add Student", href: "/admin/students", color: "bg-primary" },
              { label: "View Leads", href: "/admin/leads", color: "bg-accent" },
              { label: "Add Course", href: "/admin/courses", color: "bg-secondary" },
              { label: "Record Payment", href: "/admin/payments", color: "bg-success" },
            ].map((action) => (
              <Link key={action.label} href={action.href} className={`${action.color} text-white text-sm font-semibold rounded-lg py-3 text-center hover:opacity-90 transition-opacity`}>
                {action.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Pending admissions</span>
              <span className="font-bold text-warning">{overview?.pendingAdmissions ?? 0}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-text-muted">Pending fees</span>
              <span className="font-bold text-destructive">{formatCurrency(overview?.pendingFees ?? 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
