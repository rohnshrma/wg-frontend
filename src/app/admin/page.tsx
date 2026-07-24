"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, UserPlus, CreditCard, BookOpen, TrendingUp, ArrowUpRight, BarChart3, AlertCircle } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

type Overview = {
  totalStudents: number;
  totalLeads: number;
  pendingAdmissions: number;
  totalCourses: number;
  totalRevenue: number;
  pendingFees: number;
};

const recentActions = [
  { text: "System initialized — add your first course", time: "Just now", type: "info" },
  { text: "Create student records from the Students section", time: "Get started", type: "info" },
  { text: "Manage leads and inquiries from the Leads section", time: "Get started", type: "info" },
];

export default function AdminDashboard() {
  const [overview, setOverview] = useState<Overview | null>(null);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/analytics/overview`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setOverview(data.data);
      } catch {
        // Stats stay at their loading placeholders if this fails.
      }
    };

    fetchOverview();
  }, []);

  const stats = [
    { label: "Total Students", value: overview ? String(overview.totalStudents) : "—", icon: Users, change: overview ? `${overview.pendingAdmissions} pending` : "", color: "from-primary to-primary-dark", href: "/admin/students" },
    { label: "Active Leads", value: overview ? String(overview.totalLeads) : "—", icon: UserPlus, change: "", color: "from-accent to-accent-warm", href: "/admin/leads" },
    { label: "Revenue", value: formatCurrency(overview?.totalRevenue || 0), icon: CreditCard, change: overview ? `${formatCurrency(overview.pendingFees)} pending` : "", color: "from-success to-emerald-600", href: "/admin/payments" },
    { label: "Courses", value: overview ? String(overview.totalCourses) : "—", icon: BookOpen, change: "Active", color: "from-secondary to-secondary-dark", href: "/admin/courses" },
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

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link href={stat.href} className="block bg-white rounded-xl border border-border p-5 card-hover">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                {stat.change && (
                  <span className="flex items-center gap-1 text-xs font-medium text-success">
                    <TrendingUp className="w-3 h-3" /> {stat.change}
                  </span>
                )}
              </div>
              <p className="text-2xl font-extrabold text-text-primary">{stat.value}</p>
              <p className="text-xs text-text-muted mt-1">{stat.label}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions + Recent */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="font-bold text-text-primary mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Add Student", href: "/admin/students", color: "bg-primary" },
              { label: "View Leads", href: "/admin/leads", color: "bg-accent" },
              { label: "Add Course", href: "/admin/courses", color: "bg-secondary" },
              { label: "Record Payment", href: "/admin/payments", color: "bg-success" },
            ].map((action) => (
              <Link key={action.label} href={action.href} className={`${action.color} text-white text-sm font-semibold rounded-lg py-3 text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-1`}>
                {action.label} <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="font-bold text-text-primary mb-4">Getting Started</h3>
          <div className="space-y-3">
            {recentActions.map((action, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className="w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-text-secondary">{action.text}</p>
                  <p className="text-xs text-text-muted">{action.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
