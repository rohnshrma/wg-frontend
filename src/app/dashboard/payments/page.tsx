"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarClock, CreditCard, Smartphone } from "lucide-react";
import api from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";

type Payment = {
  _id: string;
  amount: number;
  paymentMethod: string;
  paymentMode: string;
  transactionId?: string;
  receiptNumber: string;
  receiptUrl?: string;
  paymentDate: string;
};

type Installment = {
  _id: string;
  installmentNumber: number;
  amount: number;
  dueDate: string;
  status: "pending" | "paid" | "overdue";
  collectionMethod?: "manual" | "autopay";
};

type Mandate = {
  _id: string;
  status: "created" | "authenticated" | "active" | "paused" | "cancelled" | "failed";
};

const paymentMethodLabel: Record<string, string> = {
  upi_autopay: "UPI AutoPay",
};

type StudentSummary = {
  _id: string;
  courseFees: number;
  totalPaid: number;
  pendingAmount: number;
};

const statusClass: Record<Installment["status"], string> = {
  pending: "bg-gray-100 text-text-muted",
  paid: "bg-success-light text-success",
  overdue: "bg-destructive-light text-destructive",
};

export default function PaymentsPage() {
  const [student, setStudent] = useState<StudentSummary | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [mandate, setMandate] = useState<Mandate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const dashboardRes = await api.get("/students/me/dashboard");
        const studentData = dashboardRes.data.data?.student;
        if (!studentData) {
          setIsLoading(false);
          return;
        }
        setStudent(studentData);

        const [paymentsRes, installmentsRes, mandateRes] = await Promise.all([
          api.get(`/payments/student/${studentData._id}`),
          api.get(`/payments/installments/student/${studentData._id}`),
          api.get(`/payments/mandate/student/${studentData._id}`).catch(() => ({ data: { data: null } })),
        ]);
        setPayments(paymentsRes.data.data || []);
        setInstallments(installmentsRes.data.data || []);
        setMandate(mandateRes.data.data || null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Could not load payment details");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const nextAutopayDebit = installments
    .filter((i) => i.collectionMethod === "autopay" && i.status !== "paid")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {error && <div className="px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">{error}</div>}

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-border p-5">
          <p className="text-xs text-text-muted mb-1">Total Fees</p>
          <p className="text-2xl font-extrabold text-text-primary">{student ? formatCurrency(student.courseFees) : "—"}</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <p className="text-xs text-text-muted mb-1">Paid</p>
          <p className="text-2xl font-extrabold text-success">{formatCurrency(student?.totalPaid || 0)}</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <p className="text-xs text-text-muted mb-1">Pending</p>
          <p className="text-2xl font-extrabold text-warning">{formatCurrency(student?.pendingAmount || 0)}</p>
        </div>
      </div>

      {/* Upcoming AutoPay Debit */}
      {mandate && mandate.status === "active" && nextAutopayDebit && (
        <div className="bg-primary-50 rounded-xl border border-primary/20 p-5 flex items-center gap-3">
          <Smartphone className="w-8 h-8 text-primary shrink-0" />
          <div>
            <p className="text-sm font-bold text-text-primary">
              Next AutoPay debit: {formatCurrency(nextAutopayDebit.amount)} on {formatDate(nextAutopayDebit.dueDate)}
            </p>
            <p className="text-xs text-text-secondary mt-0.5">
              This will be automatically debited from your linked account — no action needed.
            </p>
          </div>
        </div>
      )}
      {mandate && (mandate.status === "paused" || mandate.status === "failed") && (
        <div className="bg-destructive-light rounded-xl border border-destructive/20 p-5 flex items-center gap-3">
          <Smartphone className="w-8 h-8 text-destructive shrink-0" />
          <div>
            <p className="text-sm font-bold text-destructive">Your AutoPay mandate needs attention</p>
            <p className="text-xs text-text-secondary mt-0.5">
              Our team will reach out, or contact us directly to resolve this.
            </p>
          </div>
        </div>
      )}

      {/* Installment Schedule */}
      {installments.length > 0 && (
        <div className="bg-white rounded-xl border border-border">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="font-bold text-text-primary flex items-center gap-2">
              <CalendarClock className="w-5 h-5 text-secondary" />
              Installment Schedule
            </h3>
          </div>
          <div className="scroll-x">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-gray-50/50">
                  <th className="text-left px-4 py-3 font-semibold text-text-secondary">#</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-secondary">Amount</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-secondary">Due Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-secondary">Status</th>
                </tr>
              </thead>
              <tbody>
                {installments.map((inst) => (
                  <tr key={inst._id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-text-secondary">{inst.installmentNumber}</td>
                    <td className="px-4 py-3 font-semibold text-text-primary">
                      {formatCurrency(inst.amount)}
                      {inst.collectionMethod === "autopay" && (
                        <span className="ml-1.5 text-[10px] font-semibold uppercase text-secondary">AutoPay</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-text-secondary">{formatDate(inst.dueDate)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusClass[inst.status]}`}>
                        {inst.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payment History */}
      <div className="bg-white rounded-xl border border-border">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-bold text-text-primary flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Payment History
          </h3>
        </div>
        {isLoading ? (
          <p className="p-6 text-sm text-text-muted">Loading payments...</p>
        ) : payments.length === 0 ? (
          <div className="p-6 text-center py-12">
            <CreditCard className="w-12 h-12 mx-auto mb-3 text-text-muted opacity-30" />
            <p className="font-medium text-text-muted">No payments yet</p>
            <p className="text-xs text-text-muted mt-1">
              Payment history will appear here once you start your course.
            </p>
          </div>
        ) : (
          <div className="scroll-x">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-gray-50/50">
                  <th className="text-left px-4 py-3 font-semibold text-text-secondary">Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-secondary">Amount</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-secondary">Method</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-secondary">Receipt #</th>
                  <th className="text-left px-4 py-3 font-semibold text-text-secondary">Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-text-secondary">{formatDate(payment.paymentDate)}</td>
                    <td className="px-4 py-3 font-semibold text-text-primary">{formatCurrency(payment.amount)}</td>
                    <td className="px-4 py-3 text-text-secondary capitalize">{paymentMethodLabel[payment.paymentMethod] || payment.paymentMethod}</td>
                    <td className="px-4 py-3 text-text-secondary">
                      {payment.receiptUrl ? (
                        <a href={payment.receiptUrl} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                          {payment.receiptNumber}
                        </a>
                      ) : (
                        payment.receiptNumber
                      )}
                    </td>
                    <td className="px-4 py-3 text-text-muted">{payment.transactionId || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}
