"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Download } from "lucide-react";
import { EMAIL_REGEX, MOBILE_REGEX, downloadCurriculum, submitLead } from "./submitLead";

const GOAL_OPTIONS = [
  "Get my first developer job",
  "Switch career into tech",
  "Upskill in my current role",
  "Build my own product",
];

const FIXED_COURSE = "MERN Stack Development";

const emptyForm = { name: "", phone: "", email: "", goal: "" };

// The hero's primary lead capture. Same architecture as the DA landing
// page's HeroDemoForm — client-side validation, one POST to /api/leads via
// submitLead (which fires the Google Ads conversion), a success state, and a
// disabled button while in-flight so a double tap can't double-submit.
export default function HeroLeadForm() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const setField = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: "" } : prev));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Enter your full name";
    if (!MOBILE_REGEX.test(form.phone.trim())) next.phone = "Enter a valid 10-digit mobile number";
    if (!EMAIL_REGEX.test(form.email.trim())) next.email = "Enter a valid email address";
    if (!form.goal) next.goal = "Select one";
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
      courseInterested: FIXED_COURSE,
      message: `Goal: ${form.goal}`,
    });

    setIsSubmitting(false);

    if (!result.ok) {
      setServerError(result.error || "Something went wrong. Please try again.");
      return;
    }

    downloadCurriculum();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-2xl shadow-black/20">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-success" />
        <h3 className="mb-2 text-xl font-extrabold text-text-primary">You&apos;re in.</h3>
        <p className="mb-1 text-sm text-text-secondary">
          The full curriculum PDF is downloading now. A mentor will call you within 2 working hours.
        </p>
        <button
          type="button"
          onClick={downloadCurriculum}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary underline underline-offset-2"
        >
          <Download className="h-3.5 w-3.5" /> Download the curriculum again
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      id="demo-form"
      className="scroll-mt-24 rounded-2xl bg-white p-6 shadow-2xl shadow-black/20 sm:p-7"
      noValidate
    >
      <h2 className="text-lg font-extrabold text-text-primary">Book a free demo class</h2>
      <p className="mb-5 mt-0.5 text-sm text-text-secondary">
        Sit in on a live session and get the full curriculum PDF.
      </p>

      {serverError && (
        <div className="mb-4 rounded-lg bg-destructive-light px-3 py-2.5 text-xs text-destructive">
          {serverError}
        </div>
      )}

      <div className="space-y-3.5">
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

        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="Mobile *"
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
        </div>

        <div>
          <select
            value={form.goal}
            onChange={(e) => setField("goal", e.target.value)}
            className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
              errors.goal ? "border-destructive" : "border-border focus:border-primary"
            } ${!form.goal ? "text-text-muted" : "text-text-primary"}`}
          >
            <option value="">What&apos;s your goal? *</option>
            {GOAL_OPTIONS.map((g) => (
              <option key={g} value={g} className="text-text-primary">
                {g}
              </option>
            ))}
          </select>
          {errors.goal && <p className="mt-1 text-xs text-destructive">{errors.goal}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-white shadow-lg shadow-primary/25 transition-[transform,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-primary/40 active:scale-[0.98] disabled:opacity-60"
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {isSubmitting ? "Submitting…" : "Book my free demo"}
        {!isSubmitting && <ArrowRight className="h-4 w-4" />}
      </button>

      <p className="mt-3 text-center text-[11px] text-text-muted">
        Your details are safe. No spam. One call from a mentor, then it&apos;s your choice.
      </p>
    </form>
  );
}
