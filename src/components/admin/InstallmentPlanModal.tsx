"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CalendarClock, CheckCircle2, Copy, Smartphone, X } from "lucide-react";
import api from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";

type Installment = {
  _id: string;
  installmentNumber: number;
  amount: number;
  dueDate: string;
  status: "pending" | "paid" | "overdue";
  collectionMethod?: "manual" | "autopay";
  receiptUrl?: string;
  autoDebitFailureReason?: string;
};

type Mandate = {
  _id: string;
  status: "created" | "authenticated" | "active" | "paused" | "cancelled" | "failed";
  shortUrl?: string;
  amount: number;
  totalCount: number;
};

const statusClass: Record<Installment["status"], string> = {
  pending: "bg-gray-100 text-text-muted",
  paid: "bg-success-light text-success",
  overdue: "bg-destructive-light text-destructive",
};

const mandateStatusClass: Record<Mandate["status"], string> = {
  created: "bg-gray-100 text-text-muted",
  authenticated: "bg-primary-50 text-primary",
  active: "bg-success-light text-success",
  paused: "bg-warning-light text-warning",
  cancelled: "bg-gray-100 text-text-muted",
  failed: "bg-destructive-light text-destructive",
};

const CONSENT_TEXT =
  "The student authorizes WebiGeeks to automatically debit the installment amount shown below from their linked bank account via UPI AutoPay on each scheduled due date, until all installments are collected or the mandate is cancelled. This is a recurring auto-debit authorization, not just an intent to pay.";

export default function InstallmentPlanModal({
  studentId,
  studentName,
  pendingAmount,
  onClose,
}: {
  studentId: string;
  studentName: string;
  pendingAmount: number;
  onClose: () => void;
}) {
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [mandate, setMandate] = useState<Mandate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"manual" | "autopay">("manual");

  const [numberOfInstallments, setNumberOfInstallments] = useState("3");
  const [isGenerating, setIsGenerating] = useState(false);
  const [payingId, setPayingId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [autopayCount, setAutopayCount] = useState("3");
  const [autopayPeriod, setAutopayPeriod] = useState<"monthly" | "weekly" | "daily">("monthly");
  const [consentChecked, setConsentChecked] = useState(false);
  const [isCreatingMandate, setIsCreatingMandate] = useState(false);
  const [copied, setCopied] = useState(false);

  const load = async () => {
    setIsLoading(true);
    try {
      const [installmentsRes, mandateRes] = await Promise.all([
        api.get(`/payments/installments/student/${studentId}`),
        api.get(`/payments/mandate/student/${studentId}`),
      ]);
      setInstallments(installmentsRes.data.data || []);
      setMandate(mandateRes.data.data || null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not load installments");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenerate = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsGenerating(true);
    setError("");
    try {
      await api.post(`/payments/installments/student/${studentId}/generate`, {
        numberOfInstallments: Number(numberOfInstallments),
      });
      await load();
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not generate installment plan");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleMarkPaid = async (installmentId: string) => {
    setPayingId(installmentId);
    setError("");
    try {
      await api.patch(`/payments/installments/${installmentId}/pay`, { paymentMethod });
      await load();
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not mark installment paid");
    } finally {
      setPayingId("");
    }
  };

  const handleCreateMandate = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsCreatingMandate(true);
    setError("");
    try {
      await api.post(`/payments/mandate`, {
        studentId,
        numberOfInstallments: Number(autopayCount),
        period: autopayPeriod,
        interval: 1,
        consentAccepted: consentChecked,
      });
      await load();
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not create AutoPay mandate");
    } finally {
      setIsCreatingMandate(false);
    }
  };

  const handleCopyLink = () => {
    if (!mandate?.shortUrl) return;
    navigator.clipboard.writeText(mandate.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasPlan = installments.length > 0;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 max-h-[85svh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-text-primary flex items-center gap-2">
            <CalendarClock className="w-5 h-5 text-secondary" /> Installments — {studentName}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>

        {error && <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm"><AlertCircle className="w-4 h-4" /> {error}</div>}

        {isLoading ? (
          <p className="text-sm text-text-muted">Loading...</p>
        ) : !hasPlan ? (
          <div className="space-y-4">
            <div className="flex rounded-lg border border-border overflow-hidden text-sm font-semibold">
              <button
                type="button"
                onClick={() => setTab("manual")}
                className={`flex-1 py-2 ${tab === "manual" ? "bg-primary text-white" : "text-text-secondary hover:bg-gray-50"}`}
              >
                Manual Plan
              </button>
              <button
                type="button"
                onClick={() => setTab("autopay")}
                className={`flex-1 py-2 flex items-center justify-center gap-1.5 ${tab === "autopay" ? "bg-primary text-white" : "text-text-secondary hover:bg-gray-50"}`}
              >
                <Smartphone className="w-3.5 h-3.5" /> AutoPay (UPI)
              </button>
            </div>

            {tab === "manual" ? (
              <form onSubmit={handleGenerate} className="space-y-3">
                <p className="text-sm text-text-secondary">
                  No installment plan yet. Split the remaining balance of <strong>{formatCurrency(pendingAmount)}</strong> into equal installments.
                </p>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">Number of Installments</label>
                  <input
                    type="number"
                    min={1}
                    max={24}
                    required
                    value={numberOfInstallments}
                    onChange={(e) => setNumberOfInstallments(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <button type="submit" disabled={isGenerating} className="w-full py-3 rounded-xl gradient-primary text-white font-bold text-sm shadow-sm hover:shadow-glow disabled:opacity-50">
                  {isGenerating ? "Generating..." : "Generate Plan"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleCreateMandate} className="space-y-3">
                <p className="text-sm text-text-secondary">
                  Set up UPI AutoPay to auto-debit the remaining balance of <strong>{formatCurrency(pendingAmount)}</strong> in equal installments. The balance must split evenly across installments.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">Number of Installments</label>
                    <input
                      type="number"
                      min={1}
                      max={24}
                      required
                      value={autopayCount}
                      onChange={(e) => setAutopayCount(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">Frequency</label>
                    <select
                      value={autopayPeriod}
                      onChange={(e) => setAutopayPeriod(e.target.value as typeof autopayPeriod)}
                      className="w-full px-4 py-2.5 rounded-lg border border-border text-sm"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="weekly">Weekly</option>
                      <option value="daily">Daily</option>
                    </select>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 border border-border p-3">
                  <label className="flex items-start gap-2 text-xs text-text-secondary cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consentChecked}
                      onChange={(e) => setConsentChecked(e.target.checked)}
                      className="mt-0.5"
                      required
                    />
                    <span>{CONSENT_TEXT}</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isCreatingMandate || !consentChecked}
                  className="w-full py-3 rounded-xl gradient-primary text-white font-bold text-sm shadow-sm hover:shadow-glow disabled:opacity-50"
                >
                  {isCreatingMandate ? "Creating Mandate..." : "Set Up AutoPay"}
                </button>
              </form>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {mandate && (
              <div className="rounded-lg border border-border p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-secondary" /> AutoPay Mandate
                  </p>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${mandateStatusClass[mandate.status]}`}>
                    {mandate.status}
                  </span>
                </div>
                {(mandate.status === "created" || mandate.status === "authenticated") && mandate.shortUrl && (
                  <div className="space-y-2">
                    <p className="text-xs text-text-secondary">
                      Share this link with the student to complete UPI authentication and activate AutoPay.
                    </p>
                    <div className="flex gap-2">
                      <input readOnly value={mandate.shortUrl} className="flex-1 px-3 py-2 rounded-lg border border-border text-xs text-text-muted truncate" />
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="px-3 py-2 rounded-lg border border-border text-xs font-semibold flex items-center gap-1 hover:bg-gray-50 shrink-0"
                      >
                        <Copy className="w-3.5 h-3.5" /> {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                )}
                {(mandate.status === "paused" || mandate.status === "failed") && (
                  <p className="text-xs text-destructive">This mandate needs manual follow-up — check payments for the reason.</p>
                )}
              </div>
            )}

            {!mandate && (
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Payment method for next &quot;Mark Paid&quot;</label>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-border text-sm">
                  <option value="cash">Cash</option>
                  <option value="upi">UPI</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="card">Card</option>
                  <option value="other">Other</option>
                </select>
              </div>
            )}

            <div className="border border-border rounded-lg overflow-hidden">
              {installments.map((inst) => (
                <div key={inst._id} className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 px-4 py-3 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      #{inst.installmentNumber} — {formatCurrency(inst.amount)}
                      {inst.collectionMethod === "autopay" && (
                        <span className="ml-1.5 text-[10px] font-semibold uppercase text-secondary">AutoPay</span>
                      )}
                    </p>
                    <p className="text-xs text-text-muted">Due {formatDate(inst.dueDate)}</p>
                    {inst.autoDebitFailureReason && inst.status !== "paid" && (
                      <p className="text-xs text-destructive mt-0.5">Last debit attempt failed: {inst.autoDebitFailureReason}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusClass[inst.status]}`}>{inst.status}</span>
                    {inst.status !== "paid" &&
                      // AutoPay installments are normally left to the mandate — but if a
                      // debit attempt already failed, or the mandate itself is stuck
                      // (paused/cancelled/failed), admin needs a manual fallback rather
                      // than waiting indefinitely on a debit that won't retry cleanly.
                      (inst.collectionMethod !== "autopay" ||
                        Boolean(inst.autoDebitFailureReason) ||
                        (mandate ? ["paused", "cancelled", "failed"].includes(mandate.status) : false)) && (
                      <button
                        onClick={() => handleMarkPaid(inst._id)}
                        disabled={payingId === inst._id}
                        className="px-3 py-1.5 rounded-lg bg-success text-white text-xs font-semibold flex items-center gap-1 disabled:opacity-50"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Mark Paid
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
