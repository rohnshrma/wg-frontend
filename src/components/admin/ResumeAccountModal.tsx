"use client";

import { useState } from "react";
import { PlayCircle, X } from "lucide-react";
import api from "@/lib/api";
import FormInput from "@/components/ui/FormInput";
import { formatCurrency } from "@/lib/utils";

type PaymentMethod = "upi" | "cash" | "bank_transfer" | "other";

interface ResumeAccountModalProps {
  studentId: string;
  studentName: string;
  pauseCategory?: "fee_payment" | "policy_violation" | "other";
  pendingAmount?: number;
  onClose: () => void;
  onSuccess: (message?: string) => void;
}

const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: "upi", label: "UPI" },
  { value: "cash", label: "Cash" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "other", label: "Other" },
];

export default function ResumeAccountModal({
  studentId,
  studentName,
  pauseCategory,
  pendingAmount,
  onClose,
  onSuccess,
}: ResumeAccountModalProps) {
  const isFeePayment = pauseCategory === "fee_payment";
  const [recordPayment, setRecordPayment] = useState(true);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const needsPaymentDetails = isFeePayment && recordPayment;
  const amountValue = Number(amount);
  const amountExceedsPending =
    pendingAmount !== undefined && amountValue > pendingAmount && amountValue > 0;

  const canSubmit =
    !needsPaymentDetails ||
    (amountValue > 0 && !amountExceedsPending && !!paymentMethod && !!transactionId.trim());

  const resume = async () => {
    if (!canSubmit) return;

    setIsSubmitting(true);
    setError("");
    try {
      const res = await api.patch(
        `/students/${studentId}/resume`,
        isFeePayment
          ? needsPaymentDetails
            ? {
                recordPayment: true,
                amount: amountValue,
                paymentMethod,
                transactionId: transactionId.trim(),
              }
            : { recordPayment: false }
          : undefined
      );
      onSuccess(res.data?.message);
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not resume this account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-sm p-6 max-h-[90svh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-text-primary flex items-center gap-2">
            <PlayCircle className="w-5 h-5 text-success" /> Resume {studentName}&apos;s Account
          </h3>
          <button type="button" onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">
            {error}
          </div>
        )}

        {isFeePayment ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              resume();
            }}
            className="space-y-4"
          >
            <p className="text-sm text-text-secondary">
              This account was paused for a pending fee payment. Record the payment that resolves it
              — it&apos;s added to their payment history, updates their balance, and sends them a
              receipt.
            </p>

            {pendingAmount !== undefined && (
              <div className="px-4 py-2.5 rounded-lg bg-warning-light text-warning text-sm font-semibold">
                Pending balance: {formatCurrency(pendingAmount)}
              </div>
            )}

            {recordPayment ? (
              <>
                <div>
                  <FormInput
                    label="Amount received"
                    type="number"
                    min={1}
                    required
                    autoFocus
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g. 5000"
                    error={amountExceedsPending ? "More than the pending balance" : undefined}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    Payment method
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {PAYMENT_METHODS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setPaymentMethod(opt.value)}
                        className={`px-3 py-2 rounded-lg border text-sm font-semibold transition-colors ${
                          paymentMethod === opt.value
                            ? "border-success bg-success-light text-success"
                            : "border-border text-text-secondary hover:bg-gray-50"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <FormInput
                  label="Transaction / reference ID"
                  required
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder={
                    paymentMethod === "cash"
                      ? "e.g. Cash receipt #1234"
                      : "e.g. UPI txn ID or bank ref no."
                  }
                />
              </>
            ) : (
              <p className="px-4 py-3 rounded-lg bg-gray-50 border border-border text-sm text-text-secondary">
                No payment will be recorded — the pause is just lifted. Use this when you&apos;ve
                already recorded the payment under Payments, or you&apos;re waiving it.
              </p>
            )}

            <button
              type="button"
              onClick={() => setRecordPayment((v) => !v)}
              className="text-xs text-primary font-semibold hover:underline"
            >
              {recordPayment
                ? "Payment already recorded / waiving it →"
                : "← Record the payment here instead"}
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-border text-text-secondary text-sm font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !canSubmit}
                className="flex-1 py-2.5 rounded-xl bg-success text-white text-sm font-bold shadow-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : recordPayment ? (
                  "Record Payment & Resume"
                ) : (
                  "Resume Account"
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-text-secondary">
              This restores the student&apos;s access and clears the paused state.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-border text-text-secondary text-sm font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={resume}
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-xl bg-success text-white text-sm font-bold shadow-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Resume Account"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
