"use client";

import { useState } from "react";
import { Download, Loader2, X, CheckCircle2 } from "lucide-react";
import { EMAIL_REGEX, MOBILE_REGEX, downloadCurriculum, submitLead } from "./submitLead";

// Lead-gated syllabus download — the same pattern as the webigeeks.in Data
// Analytics landing page (src/app/(ads)/lp/data-analytics-course/
// CurriculumDownload.tsx): a button opens a short modal, the submit posts one
// lead to /api/leads and fires the Google Ads "Contact" conversion (both via
// submitLead), then the MERN curriculum PDF downloads. `buttonClassName` lets
// each placement (dark hero, light section, bottom CTA) style its own
// trigger.
export default function CurriculumDownload({
  buttonClassName,
  label = "Download curriculum",
}: {
  buttonClassName?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const close = () => {
    setOpen(false);
    // Reset after the close so a re-open never flashes the old success state.
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
    if (isSubmitting) return;
    if (!validate()) return;

    setIsSubmitting(true);
    setServerError("");

    const result = await submitLead({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      courseInterested: "MERN Stack Development",
      message: "Requested MERN curriculum PDF download",
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
          "inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3.5 font-semibold text-text-primary transition-transform active:scale-[0.98]"
        }
      >
        <Download className="h-4 w-4" /> {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4"
          onClick={close}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92svh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:max-w-md sm:rounded-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h3 className="font-bold text-text-primary">
                {isSubmitted ? "You're all set" : "Get the curriculum PDF"}
              </h3>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="rounded-lg p-1.5 hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-text-secondary" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="px-6 py-8 text-center">
                <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-success" />
                <p className="mb-1 text-sm text-text-secondary">
                  Your download should start automatically.
                </p>
                <p className="mb-5 text-xs text-text-muted">
                  Didn&apos;t get it?{" "}
                  <button
                    type="button"
                    onClick={downloadCurriculum}
                    className="font-semibold text-primary underline"
                  >
                    Click here
                  </button>
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text-secondary hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 px-6 py-5" noValidate>
                <p className="-mt-1 mb-1 text-sm text-text-secondary">
                  The full 16-module breakdown, from HTML to deployment. Enter your details and it
                  downloads now. A mentor will follow up.
                </p>

                {serverError && (
                  <div className="rounded-lg bg-destructive-light px-3 py-2.5 text-xs text-destructive">
                    {serverError}
                  </div>
                )}

                <div>
                  <input
                    type="text"
                    placeholder="Full name *"
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                      errors.name ? "border-destructive" : "border-border focus:border-primary"
                    }`}
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
                    className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                      errors.phone ? "border-destructive" : "border-border focus:border-primary"
                    }`}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email *"
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                      errors.email ? "border-destructive" : "border-border focus:border-primary"
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white shadow-lg shadow-primary/25 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] disabled:opacity-60"
                >
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Submitting…" : "Download curriculum"}
                </button>
                <p className="text-center text-[11px] text-text-muted">
                  Your details are safe. One follow-up call, then it&apos;s your choice.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
