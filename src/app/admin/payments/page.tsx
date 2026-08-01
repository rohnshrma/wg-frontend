"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, ChevronDown, CreditCard, Download, Mail, MessageCircle, Plus, Search, Smartphone } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import RecordPaymentModal from "@/components/admin/RecordPaymentModal";

type Payment = {
  _id: string;
  studentId?: { fullName?: string; admissionId?: string };
  courseId?: { title?: string };
  amount: number;
  paymentMethod: string;
  transactionId?: string;
  receiptNumber: string;
  paymentDate: string;
};

type Mandate = {
  _id: string;
  studentId?: { _id: string; fullName?: string; admissionId?: string };
  status: "created" | "authenticated" | "active" | "paused" | "cancelled" | "failed";
  amount: number;
  totalCount: number;
  createdAt: string;
};

const mandateStatusClass: Record<Mandate["status"], string> = {
  created: "bg-gray-100 text-text-muted",
  authenticated: "bg-primary-50 text-primary",
  active: "bg-success-light text-success",
  paused: "bg-warning-light text-warning",
  cancelled: "bg-gray-100 text-text-muted",
  failed: "bg-destructive-light text-destructive",
};

const paymentMethodLabel: Record<string, string> = {
  upi_autopay: "UPI AutoPay",
};

function MandatesPanel() {
  const [mandates, setMandates] = useState<Mandate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get("/payments/mandates")
      .then((res) => setMandates(res.data.data || []))
      .catch(() => setMandates([]))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading || mandates.length === 0) return null;

  const needsAttention = (status: Mandate["status"]) => status === "paused" || status === "failed";

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-gray-50/50 flex items-center gap-2">
        <Smartphone className="w-4 h-4 text-secondary" />
        <h3 className="font-semibold text-text-primary text-sm">AutoPay Mandates</h3>
      </div>
      <div className="scroll-x">
        <table className="w-full text-sm min-w-[560px]">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-2.5 font-semibold text-text-secondary">Student</th>
              <th className="text-left px-4 py-2.5 font-semibold text-text-secondary">Amount / Installment</th>
              <th className="text-left px-4 py-2.5 font-semibold text-text-secondary">Installments</th>
              <th className="text-left px-4 py-2.5 font-semibold text-text-secondary">Status</th>
            </tr>
          </thead>
          <tbody>
            {mandates.map((m) => (
              <tr key={m._id} className={`border-b border-border last:border-0 ${needsAttention(m.status) ? "bg-destructive-light/30" : ""}`}>
                <td className="px-4 py-2.5">
                  {m.studentId?._id ? (
                    <Link href={`/admin/students/${m.studentId._id}`} className="font-semibold text-primary hover:underline">
                      {m.studentId.fullName || "-"}
                    </Link>
                  ) : (
                    <span className="font-semibold text-text-primary">-</span>
                  )}
                  <p className="text-xs text-text-muted">{m.studentId?.admissionId}</p>
                </td>
                <td className="px-4 py-2.5 text-text-secondary">{formatCurrency(m.amount)}</td>
                <td className="px-4 py-2.5 text-text-secondary">{m.totalCount}</td>
                <td className="px-4 py-2.5">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize inline-flex items-center gap-1 ${mandateStatusClass[m.status]}`}>
                    {needsAttention(m.status) && <AlertTriangle className="w-3 h-3" />}
                    {m.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SendReceiptMenu({
  paymentId,
  onSent,
  onError,
}: {
  paymentId: string;
  onSent: (message: string) => void;
  onError: (message: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState<"email" | "whatsapp" | null>(null);

  const handleSend = async (channel: "email" | "whatsapp") => {
    setIsSending(channel);
    setIsOpen(false);
    try {
      const res = await api.post(`/payments/${paymentId}/send-receipt`, { channel });
      onSent(res.data.message || `Receipt sent via ${channel === "email" ? "email" : "WhatsApp"}`);
    } catch (err: any) {
      onError(err.response?.data?.message || `Could not send receipt via ${channel}`);
    } finally {
      setIsSending(null);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        disabled={isSending !== null}
        className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-text-secondary hover:bg-gray-50 flex items-center gap-1 disabled:opacity-50"
      >
        {isSending ? "Sending..." : "Send Receipt"} <ChevronDown className="w-3.5 h-3.5" />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg border border-border shadow-lg z-20 overflow-hidden">
            <button
              type="button"
              onClick={() => handleSend("email")}
              className="w-full px-3 py-2 text-xs text-left text-text-secondary hover:bg-gray-50 flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5" /> Email
            </button>
            <button
              type="button"
              onClick={() => handleSend("whatsapp")}
              className="w-full px-3 py-2 text-xs text-left text-text-secondary hover:bg-gray-50 flex items-center gap-2"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const res = await api.get("/payments/export", { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `payments-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not export payments");
    } finally {
      setIsExporting(false);
    }
  };

  const fetchPayments = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await api.get("/payments?limit=100");
      setPayments(res.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not load payments");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return payments;
    return payments.filter((p) => p.studentId?.fullName?.toLowerCase().includes(term));
  }, [payments, search]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search by student name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div className="flex gap-2">
          <button onClick={handleExport} disabled={isExporting} className="px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-text-secondary hover:bg-gray-50 flex items-center gap-1.5 disabled:opacity-50">
            <Download className="w-4 h-4" /> {isExporting ? "Exporting..." : "Export"}
          </button>
          <button onClick={() => setShowModal(true)} className="px-4 py-2.5 rounded-lg gradient-primary text-white text-sm font-bold shadow-sm hover:shadow-glow flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> Record Payment
          </button>
        </div>
      </div>

      {successMessage && <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-success-light text-success text-sm"><CheckCircle2 className="w-4 h-4" /> {successMessage}</div>}
      {error && <div className="px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">{error}</div>}

      <MandatesPanel />

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="scroll-x">
          <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="border-b border-border bg-gray-50/50">
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Receipt #</th>
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Student</th>
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Course</th>
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Amount</th>
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Method</th>
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Date</th>
              <th className="text-left px-4 py-3 font-semibold text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={7} className="text-center py-16 text-text-muted">Loading payments...</td></tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-16">
                  <CreditCard className="w-12 h-12 mx-auto mb-3 text-text-muted opacity-30" />
                  <p className="font-medium text-text-muted">No payments recorded</p>
                </td>
              </tr>
            ) : filtered.map((payment) => (
              <tr key={payment._id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-text-secondary">{payment.receiptNumber}</td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-text-primary">{payment.studentId?.fullName || "-"}</p>
                  <p className="text-xs text-text-muted">{payment.studentId?.admissionId}</p>
                </td>
                <td className="px-4 py-3 text-text-secondary">{payment.courseId?.title || "-"}</td>
                <td className="px-4 py-3 font-semibold text-text-primary">{formatCurrency(payment.amount)}</td>
                <td className="px-4 py-3 text-text-secondary capitalize">{paymentMethodLabel[payment.paymentMethod] || payment.paymentMethod}</td>
                <td className="px-4 py-3 text-text-muted">{formatDate(payment.paymentDate)}</td>
                <td className="px-4 py-3">
                  <SendReceiptMenu
                    paymentId={payment._id}
                    onSent={(message) => {
                      setSuccessMessage(message);
                      setTimeout(() => setSuccessMessage(""), 5000);
                    }}
                    onError={(message) => {
                      setError(message);
                      setTimeout(() => setError(""), 5000);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <RecordPaymentModal
          onClose={() => setShowModal(false)}
          onSaved={(message) => {
            setShowModal(false);
            setSuccessMessage(message);
            setTimeout(() => setSuccessMessage(""), 5000);
            fetchPayments();
          }}
        />
      )}
    </motion.div>
  );
}
