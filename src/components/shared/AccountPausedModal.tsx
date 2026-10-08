"use client";

import Link from "next/link";
import { CreditCard, Mail, Phone, ShieldAlert, X } from "lucide-react";
import { siteConfig } from "@/config/site";

interface AccountPausedModalProps {
  reason?: string;
  category?: "fee_payment" | "policy_violation" | "other";
  onClose: () => void;
}

export default function AccountPausedModal({ reason, category, onClose }: AccountPausedModalProps) {
  const phoneDigits = siteConfig.contact.phone.replace(/\s+/g, "");
  const isFeePayment = category === "fee_payment";

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md overflow-hidden">
        <div className="bg-destructive px-6 py-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-white text-lg">Account Paused</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1 rounded-lg text-white/80 hover:bg-white/10 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-text-secondary">
            Your account has been temporarily paused. <strong className="text-text-primary">Your
            classes stay paused until this pause is lifted</strong> — it won&apos;t clear on its own.
          </p>

          {reason && (
            <div className="px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">
              <strong>Reason:</strong> {reason}
            </div>
          )}

          {isFeePayment ? (
            <div className="px-4 py-3 rounded-lg bg-warning-light text-warning text-sm space-y-2">
              <p>
                This is related to a pending fee payment. Once your payment is received and
                confirmed, the pause is lifted and your classes resume.
              </p>
              <Link
                href="/dashboard/payments"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-warning text-white text-sm font-semibold hover:opacity-90"
              >
                <CreditCard className="w-4 h-4" /> Make Payment to Resume
              </Link>
            </div>
          ) : (
            <p className="text-sm text-text-secondary">
              If you believe this is a mistake or would like to resolve this, please reach out to us:
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <a
              href={`tel:${phoneDigits}`}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-success text-white text-sm font-semibold hover:opacity-90"
            >
              <Phone className="w-4 h-4" /> {siteConfig.contact.phone}
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border text-text-secondary text-sm font-semibold hover:bg-gray-50"
            >
              <Mail className="w-4 h-4" /> Email Us
            </a>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-lg text-text-muted text-sm font-medium hover:text-text-secondary"
          >
            Dismiss for now
          </button>
        </div>
      </div>
    </div>
  );
}
