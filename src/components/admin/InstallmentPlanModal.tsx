"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CalendarClock, CheckCircle2, X } from "lucide-react";
import api from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";

type Installment = {
  _id: string;
  installmentNumber: number;
  amount: number;
  dueDate: string;
  status: "pending" | "paid" | "overdue";
};

const statusClass: Record<Installment["status"], string> = {
  pending: "bg-gray-100 text-text-muted",
  paid: "bg-success-light text-success",
  overdue: "bg-destructive-light text-destructive",
};

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [numberOfInstallments, setNumberOfInstallments] = useState("3");
  const [isGenerating, setIsGenerating] = useState(false);
  const [payingId, setPayingId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const load = async () => {
    setIsLoading(true);
    try {
      const res = await api.get(`/payments/installments/student/${studentId}`);
      setInstallments(res.data.data || []);
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

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-text-primary flex items-center gap-2">
            <CalendarClock className="w-5 h-5 text-secondary" /> Installments — {studentName}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>

        {error && <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm"><AlertCircle className="w-4 h-4" /> {error}</div>}

        {isLoading ? (
          <p className="text-sm text-text-muted">Loading...</p>
        ) : installments.length === 0 ? (
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
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">Payment method for next "Mark Paid"</label>
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-border text-sm">
                <option value="cash">Cash</option>
                <option value="upi">UPI</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="card">Card</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="border border-border rounded-lg overflow-hidden">
              {installments.map((inst) => (
                <div key={inst._id} className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 px-4 py-3 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-text-primary">#{inst.installmentNumber} — {formatCurrency(inst.amount)}</p>
                    <p className="text-xs text-text-muted">Due {formatDate(inst.dueDate)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusClass[inst.status]}`}>{inst.status}</span>
                    {inst.status !== "paid" && (
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
