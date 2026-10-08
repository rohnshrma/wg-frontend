"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Lock, Mail, PauseCircle, X } from "lucide-react";
import api from "@/lib/api";
import FormInput from "@/components/ui/FormInput";

type PauseCategory = "fee_payment" | "policy_violation" | "other";

interface PauseAccountModalProps {
  studentId: string;
  studentName: string;
  studentEmail: string;
  onClose: () => void;
  onSuccess: (warning?: string) => void;
}

const CATEGORY_OPTIONS: { value: PauseCategory; label: string }[] = [
  { value: "fee_payment", label: "Pending Fee Payment" },
  { value: "policy_violation", label: "Policy / Conduct Violation" },
  { value: "other", label: "Other" },
];

const buildDefaultSubject = (category: PauseCategory) =>
  category === "fee_payment"
    ? "Action Required: Your WebiGeeks account is paused — pending fee payment"
    : "Important: Your WebiGeeks account access has been paused";

const buildDefaultMessage = (studentName: string, reason: string, category: PauseCategory) => {
  const resolutionLine =
    category === "fee_payment"
      ? "Your classes will remain paused until the pending payment is received and confirmed. To resume your classes, please complete the pending payment — the pause is lifted as soon as the payment is confirmed."
      : "Your classes will remain paused until this is resolved. Please reach out to our support team to discuss the next steps.";

  return `Hi ${studentName},

Your WebiGeeks account has been temporarily paused.

Reason: ${reason || "(enter a reason above)"}

${resolutionLine}

If you believe this is a mistake or would like to discuss this further, please reach out to our support team and we'll be happy to help.

— Team WebiGeeks`;
};

export default function PauseAccountModal({
  studentId,
  studentName,
  studentEmail,
  onClose,
  onSuccess,
}: PauseAccountModalProps) {
  const [category, setCategory] = useState<PauseCategory>("fee_payment");
  const [reason, setReason] = useState("");
  const [emailSubject, setEmailSubject] = useState(buildDefaultSubject("fee_payment"));
  const [emailMessage, setEmailMessage] = useState(buildDefaultMessage(studentName, "", "fee_payment"));
  const [emailEdited, setEmailEdited] = useState(false);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Keep the email preview in sync with the reason/category as the admin
  // fills the form — but only until they start editing the email
  // themselves, so we never clobber a deliberate rewrite.
  useEffect(() => {
    if (emailEdited) return;
    setEmailSubject(buildDefaultSubject(category));
    setEmailMessage(buildDefaultMessage(studentName, reason.trim(), category));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reason, studentName, category]);

  const handleCategoryChange = (value: PauseCategory) => {
    setCategory(value);
    // Switching category changes the whole framing of the email (e.g. "pay
    // to resume" vs "contact support"), so re-arm the auto-sync even if the
    // admin had already tweaked the previous draft.
    setEmailEdited(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!reason.trim() || !emailSubject.trim() || !emailMessage.trim() || !password) return;

    setIsSubmitting(true);
    setError("");
    try {
      await api.post("/auth/verify-password", { password });
      const res = await api.patch(`/students/${studentId}/pause`, {
        category,
        reason: reason.trim(),
        emailSubject: emailSubject.trim(),
        emailMessage: emailMessage.trim(),
      });
      const emailSent = res.data?.data?.emailSent;
      onSuccess(
        emailSent === false
          ? "The account was paused, but the notification email could not be sent. You may want to follow up with the student directly."
          : undefined
      );
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not pause this account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 max-h-[90svh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-text-primary flex items-center gap-2">
            <PauseCircle className="w-5 h-5 text-destructive" /> Pause {studentName}&apos;s Account
          </h3>
          <button type="button" onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4 flex items-start gap-2 px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>
            The student can still log in, but they&apos;ll see a popup with this reason as soon as they
            do, along with contact details to reach support. We&apos;ll also email it to them now. The
            account stays paused until you resume it below — it won&apos;t clear on its own.
          </span>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Reason category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleCategoryChange(opt.value)}
                  className={`px-2 py-2 rounded-lg border text-xs font-semibold text-center transition-colors ${
                    category === opt.value
                      ? "border-destructive bg-destructive-light text-destructive"
                      : "border-border text-text-secondary hover:bg-gray-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {category === "fee_payment" && (
              <p className="mt-1.5 text-xs text-text-muted">
                Resuming this account will require you to record the payment (method + transaction/reference ID) that resolved it.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Reason details
            </label>
            <textarea
              required
              autoFocus
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={
                category === "fee_payment"
                  ? "e.g. 2nd installment overdue by 30 days"
                  : "e.g. Repeated violation of code-of-conduct policy"
              }
              className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>

          <div className="rounded-lg border border-border p-4 space-y-3 bg-gray-50/50">
            <p className="text-xs font-semibold text-text-secondary flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> Email preview — sent to {studentEmail}
            </p>
            <p className="text-xs text-text-muted">
              Review and edit this before it goes out. It won&apos;t mention who made the change.
            </p>
            <FormInput
              label="Subject"
              value={emailSubject}
              onChange={(e) => {
                setEmailEdited(true);
                setEmailSubject(e.target.value);
              }}
              required
            />
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Message</label>
              <textarea
                required
                rows={9}
                value={emailMessage}
                onChange={(e) => {
                  setEmailEdited(true);
                  setEmailMessage(e.target.value);
                }}
                className="w-full px-4 py-3 rounded-lg border border-border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y"
              />
            </div>
          </div>

          <FormInput
            label="Confirm your admin password to proceed"
            type="password"
            icon={Lock}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

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
              disabled={isSubmitting || !reason.trim() || !password}
              className="flex-1 py-2.5 rounded-xl bg-destructive text-white text-sm font-bold shadow-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Pause & Send Email"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
