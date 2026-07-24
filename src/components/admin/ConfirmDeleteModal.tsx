"use client";

import { useState } from "react";
import { AlertTriangle, Lock, X } from "lucide-react";
import api from "@/lib/api";
import FormInput from "@/components/ui/FormInput";

interface ConfirmDeleteModalProps {
  title: string;
  message: string;
  confirmLabel?: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function ConfirmDeleteModal({
  title,
  message,
  confirmLabel = "Delete",
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      await api.post("/auth/verify-password", { password });
      await onConfirm();
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-text-primary flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" /> {title}
          </h3>
          <button type="button" onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>

        <p className="text-sm text-text-secondary mb-4">{message}</p>

        {error && <div className="mb-4 px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Confirm your admin password"
            type="password"
            icon={Lock}
            required
            autoFocus
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
              disabled={isSubmitting || !password}
              className="flex-1 py-2.5 rounded-xl bg-destructive text-white text-sm font-bold shadow-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : confirmLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
