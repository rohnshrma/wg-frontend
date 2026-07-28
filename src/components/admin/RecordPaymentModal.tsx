"use client";

import { useEffect, useState } from "react";
import { AlertCircle, X } from "lucide-react";
import api from "@/lib/api";

type StudentOption = {
  _id: string;
  fullName: string;
  admissionId?: string;
  courseId?: { _id: string; title: string };
};

export default function RecordPaymentModal({ onClose, onSaved }: { onClose: () => void; onSaved: (message: string) => void }) {
  const [students, setStudents] = useState<StudentOption[]>([]);
  const [studentId, setStudentId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [transactionId, setTransactionId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/students?status=approved&limit=200");
        setStudents(res.data.data || []);
      } catch {
        setError("Could not load students");
      }
    };
    load();
  }, []);

  const inputClass = "w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    try {
      const selected = students.find((s) => s._id === studentId);
      const res = await api.post("/payments", {
        studentId,
        courseId: selected?.courseId?._id,
        amount: Number(amount),
        paymentMethod,
        transactionId: transactionId || undefined,
      });
      onSaved(res.data.message || "Payment recorded");
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not record payment");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6 max-h-[90dvh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-text-primary">Record Payment</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>

        {error && <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm"><AlertCircle className="w-4 h-4" /> {error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Student *</label>
            <select required value={studentId} onChange={(e) => setStudentId(e.target.value)} className={inputClass}>
              <option value="">Select student</option>
              {students.map((s) => (
                <option key={s._id} value={s._id}>{s.fullName} {s.admissionId ? `(${s.admissionId})` : ""}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Amount (₹) *</label>
            <input required type="number" min={1} value={amount} onChange={(e) => setAmount(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Payment Method *</label>
            <select required value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className={inputClass}>
              <option value="cash">Cash</option>
              <option value="upi">UPI</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="card">Card</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Transaction ID</label>
            <input value={transactionId} onChange={(e) => setTransactionId(e.target.value)} className={inputClass} placeholder="Optional" />
          </div>
          <button type="submit" disabled={isSaving} className="w-full py-3 rounded-xl gradient-primary text-white font-bold text-sm shadow-sm hover:shadow-glow disabled:opacity-50 flex items-center justify-center gap-2">
            {isSaving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Record Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}
