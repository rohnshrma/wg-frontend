"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { TrendingUp, Users, IndianRupee, AlertCircle, Percent } from "lucide-react";
import api from "@/lib/api";
import { formatCurrency } from "@/lib/utils";

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const COLORS = {
  primary: "#1672B8",
  secondary: "#606062",
  accent: "#F97316",
  accentWarm: "#EAB308",
  success: "#22C55E",
  warning: "#F59E0B",
  destructive: "#EF4444",
};

const PIE_PALETTE = [COLORS.primary, COLORS.secondary, COLORS.accent, COLORS.success, COLORS.warning, COLORS.destructive];

const sourceLabels: Record<string, string> = {
  hero_form: "Hero Form",
  popup: "Popup",
  contact_page: "Contact Page",
  exit_intent: "Exit Intent",
  course_page: "Course Page",
  book_demo: "Book Demo",
  sticky_cta: "Sticky CTA",
};

const statusColors: Record<string, string> = {
  pending: COLORS.warning,
  approved: COLORS.success,
  rejected: COLORS.destructive,
};

type Overview = {
  totalStudents: number;
  totalLeads: number;
  pendingAdmissions: number;
  totalCourses: number;
  totalRevenue: number;
  pendingFees: number;
  courseWiseStudents: { courseName: string; count: number }[];
};

type RevenuePoint = { month: number; total: number };
type PaymentMethodBreakdown = { method: string; total: number; count: number };

type LeadData = {
  total: number;
  converted: number;
  conversionRate: number;
  bySource: { _id: string; count: number }[];
  conversionBySource: { source: string; total: number; converted: number; conversionRate: number }[];
  monthlyConversion: { month: number; total: number; converted: number }[];
};

type StudentData = {
  statusBreakdown: { status: string; count: number }[];
  paymentModeBreakdown: { mode: string; count: number }[];
  genderBreakdown: { gender: string; count: number }[];
  studentsWithDues: number;
  totalDue: number;
  enrollmentTrend: { month: number; count: number }[];
};

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <div className="mb-4">
        <h3 className="font-bold text-text-primary">{title}</h3>
        {subtitle && <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function StatTile({ label, value, icon: Icon, color }: { label: string; value: string; icon: any; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <p className="text-2xl font-extrabold text-text-primary">{value}</p>
      <p className="text-xs text-text-muted mt-1">{label}</p>
    </div>
  );
}

export default function AdminAnalyticsPage() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [overview, setOverview] = useState<Overview | null>(null);
  const [admissions, setAdmissions] = useState<{ month: number; count: number }[]>([]);
  const [revenue, setRevenue] = useState<RevenuePoint[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodBreakdown[]>([]);
  const [leads, setLeads] = useState<LeadData | null>(null);
  const [courses, setCourses] = useState<{ _id: string; inquiries: number }[]>([]);
  const [students, setStudents] = useState<StudentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const yearOptions = useMemo(
    () => Array.from({ length: 4 }, (_, i) => currentYear - i),
    [currentYear]
  );

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      setError("");
      try {
        const [overviewRes, admissionsRes, revenueRes, paymentMethodsRes, leadsRes, coursesRes, studentsRes] = await Promise.all([
          api.get("/analytics/overview"),
          api.get(`/analytics/admissions?year=${year}`),
          api.get(`/analytics/revenue?year=${year}`),
          api.get(`/analytics/revenue/payment-methods?year=${year}`),
          api.get(`/analytics/leads?year=${year}`),
          api.get("/analytics/courses"),
          api.get(`/analytics/students?year=${year}`),
        ]);

        setOverview(overviewRes.data.data);
        setAdmissions(admissionsRes.data.data || []);
        setRevenue(revenueRes.data.data || []);
        setPaymentMethods(paymentMethodsRes.data.data || []);
        setLeads(leadsRes.data.data);
        setCourses(coursesRes.data.data || []);
        setStudents(studentsRes.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Could not load analytics");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, [year]);

  const admissionsChartData = admissions.map((d) => ({ month: MONTH_LABELS[d.month - 1], count: d.count }));
  const revenueChartData = revenue.map((d) => ({ month: MONTH_LABELS[d.month - 1], total: d.total }));
  const conversionTrendData = (leads?.monthlyConversion || []).map((d) => ({
    month: MONTH_LABELS[d.month - 1],
    total: d.total,
    converted: d.converted,
  }));
  const enrollmentTrendData = (students?.enrollmentTrend || []).map((d) => ({ month: MONTH_LABELS[d.month - 1], count: d.count }));

  if (isLoading) {
    return <div className="text-center py-24 text-text-muted">Loading analytics...</div>;
  }

  if (error) {
    return <div className="px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">{error}</div>;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-muted">Revenue, admissions, conversions and student trends.</p>
        <select
          value={year}
          onChange={(event) => setYear(Number(event.target.value))}
          className="px-4 py-2 rounded-lg border border-border text-sm text-text-secondary bg-white"
        >
          {yearOptions.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* Top stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile label="Total Revenue" value={formatCurrency(overview?.totalRevenue || 0)} icon={IndianRupee} color="from-success to-emerald-600" />
        <StatTile label="Lead Conversion Rate" value={`${leads?.conversionRate ?? 0}%`} icon={Percent} color="from-primary to-primary-dark" />
        <StatTile label="Students With Dues" value={String(students?.studentsWithDues ?? 0)} icon={AlertCircle} color="from-warning to-accent" />
        <StatTile label="Total Pending Dues" value={formatCurrency(students?.totalDue || 0)} icon={Users} color="from-secondary to-secondary-dark" />
      </div>

      {/* Revenue & Admissions */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title="Monthly Revenue" subtitle={`Revenue collected per month in ${year}`}>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={revenueChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Line type="monotone" dataKey="total" name="Revenue" stroke={COLORS.primary} strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Admissions" subtitle={`Approved admissions per month in ${year}`}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={admissionsChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" name="Admissions" fill={COLORS.secondary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Revenue by payment method & Conversion trend */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title="Revenue by Payment Method" subtitle={`Breakdown for ${year}`}>
          {(paymentMethods?.length || 0) === 0 ? (
            <p className="text-center py-16 text-text-muted text-sm">No payments recorded yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={paymentMethods}
                  dataKey="total"
                  nameKey="method"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  labelLine={false}
                >
                  {(paymentMethods || []).map((_, i) => (
                    <Cell key={i} fill={PIE_PALETTE[i % PIE_PALETTE.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard title="Lead Conversion Trend" subtitle={`Total enquiries vs. converted, ${year}`}>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={conversionTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" name="Total Leads" stroke={COLORS.secondary} strokeWidth={2} dot={{ r: 2.5 }} />
              <Line type="monotone" dataKey="converted" name="Converted" stroke={COLORS.success} strokeWidth={2.5} dot={{ r: 2.5 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Conversion by source & Course popularity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title="Conversion Rate by Source" subtitle="Which channels convert best">
          {(leads?.conversionBySource?.length || 0) === 0 ? (
            <p className="text-center py-16 text-text-muted text-sm">No enquiries yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={leads?.conversionBySource.map((d) => ({ ...d, label: sourceLabels[d.source] || d.source }))} layout="vertical" margin={{ left: 24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis type="number" tick={{ fontSize: 12 }} allowDecimals={false} />
                <YAxis type="category" dataKey="label" tick={{ fontSize: 12 }} width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" name="Total" fill={COLORS.secondary} radius={[0, 4, 4, 0]} />
                <Bar dataKey="converted" name="Converted" fill={COLORS.success} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard title="Course Popularity" subtitle="Top courses by enquiry volume">
          {courses.length === 0 ? (
            <p className="text-center py-16 text-text-muted text-sm">No enquiries yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={courses} layout="vertical" margin={{ left: 24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis type="number" tick={{ fontSize: 12 }} allowDecimals={false} />
                <YAxis type="category" dataKey="_id" tick={{ fontSize: 11 }} width={140} />
                <Tooltip />
                <Bar dataKey="inquiries" name="Enquiries" fill={COLORS.accent} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>

      {/* Student breakdowns */}
      <div className="grid lg:grid-cols-3 gap-6">
        <ChartCard title="Student Status" subtitle="Pending / approved / rejected">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={students?.statusBreakdown} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={75} labelLine={false}>
                {(students?.statusBreakdown || []).map((row, i) => (
                  <Cell key={i} fill={statusColors[row.status] || PIE_PALETTE[i % PIE_PALETTE.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Payment Mode" subtitle="Full payment vs. EMI">
          {(students?.paymentModeBreakdown?.length || 0) === 0 ? (
            <p className="text-center py-16 text-text-muted text-sm">No approved students yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={students?.paymentModeBreakdown} dataKey="count" nameKey="mode" cx="50%" cy="50%" outerRadius={75} labelLine={false}>
                  {(students?.paymentModeBreakdown || []).map((_, i) => (
                    <Cell key={i} fill={PIE_PALETTE[i % PIE_PALETTE.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard title="Enrollment Trend" subtitle={`New registrations per month, ${year}`}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={enrollmentTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" name="Registrations" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </motion.div>
  );
}
