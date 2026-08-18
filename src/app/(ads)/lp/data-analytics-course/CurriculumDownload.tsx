"use client";

import { useState } from "react";
import { Download, Loader2, X, CheckCircle2 } from "lucide-react";
import { EMAIL_REGEX, MOBILE_REGEX, downloadCurriculum, submitLead } from "./submitLead";

export default function CurriculumDownload({ buttonClassName }: { buttonClassName?: string }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const close = () => {
    setOpen(false);
    // Reset a beat after the close animation would run, so a re-open
    // never flashes the previous submission's success state.
    setTimeout(() => {
      setIsSubmitted(false);
      setForm({ name: "", phone: "", email: "" });
      setErrors({});
      setServerError("");
    }, 200);
  };

  const setField = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: "" } : prev));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Enter your full name";
    if (!MOBILE_REGEX.test(form.phone.trim())) next.phone = "Enter a valid 10-digit mobile number";
    if (!EMAIL_REGEX.test(form.email.trim())) next.email = "Enter a valid email address";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setServerError("");

    const result = await submitLead({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      courseInterested: "Data Analytics",
      message: "Requested curriculum PDF download",
    });

    setIsSubmitting(false);

    if (!result.ok) {
      setServerError(result.error || "Something went wrong. Please try again.");
      return;
    }

    downloadCurriculum();
    setIsSubmitted(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          buttonClassName ||
          "inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass text-white font-semibold hover:bg-white/15 transition-colors"
        }
      >
        <Download className="w-4 h-4" /> Download Curriculum
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4"
          onClick={close}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-xl max-h-[92svh] overflow-y-auto"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="font-bold text-text-primary">
                {isSubmitted ? "You're all set" : "Get the Curriculum PDF"}
              </h3>
              <button type="button" onClick={close} aria-label="Close" className="p-1.5 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="px-6 py-8 text-center">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-success" />
                <p className="text-text-secondary text-sm mb-1">Your download should start automatically.</p>
                <p className="text-text-muted text-xs mb-5">
                  Didn&apos;t get it?{" "}
                  <button type="button" onClick={downloadCurriculum} className="text-primary font-semibold underline">
                    Click here
                  </button>
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-text-secondary hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-3.5" noValidate>
                <p className="text-sm text-text-secondary -mt-1 mb-1">
                  Enter your details and we&apos;ll send the full module breakdown straight to your download.
                </p>

                {serverError && (
                  <div className="px-3 py-2.5 rounded-lg bg-destructive-light text-destructive text-xs">
                    {serverError}
                  </div>
                )}

                <div>
                  <input
                    type="text"
                    placeholder="Full name *"
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.name ? "border-destructive" : "border-border focus:border-primary"}`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="Mobile number *"
                    value={form.phone}
                    onChange={(e) => setField("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.phone ? "border-destructive" : "border-border focus:border-primary"}`}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email *"
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.email ? "border-destructive" : "border-border focus:border-primary"}`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-accent text-white font-bold shadow-lg hover:shadow-glow-accent transition-shadow disabled:opacity-60"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isSubmitting ? "Submitting..." : "Download Curriculum"}
                </button>
                <p className="text-[11px] text-text-muted text-center">Your details are 100% secure.</p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
