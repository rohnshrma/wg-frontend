"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { EMAIL_REGEX, MOBILE_REGEX, downloadCurriculum, submitLead } from "./submitLead";

const ROLE_OPTIONS = [
  "Student",
  "Working Professional (0-2 yrs)",
  "Working Professional (2-5 yrs)",
  "Experienced (5+ yrs)",
  "Career Changer",
];

const COURSE_OPTIONS = ["Data Analytics", "Full Stack (MERN)", "Python Programming", "Both (Combo)"];

const MODE_OPTIONS = ["Offline (Gurgaon Campus)", "Online Live", "Hybrid"];

const URGENCY_OPTIONS = ["Planning for 3 months", "Planning for 1-2 months", "Want to start ASAP (Next Batch)"];

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  role: "",
  course: "Data Analytics",
  mode: "",
  urgency: "",
};

export default function HeroDemoForm() {
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
    if (!form.role) next.role = "Select one";
    if (!form.mode) next.mode = "Select one";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setServerError("");

    const message = [
      form.role && `Role: ${form.role}`,
      form.mode && `Mode: ${form.mode}`,
      form.urgency && `Urgency: ${form.urgency}`,
    ]
      .filter(Boolean)
      .join(" | ");

    const result = await submitLead({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      courseInterested: form.course,
      message,
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
      <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
        <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-success" />
        <h3 className="text-xl font-extrabold text-text-primary mb-2">You&apos;re in!</h3>
        <p className="text-text-secondary text-sm mb-1">
          Your curriculum PDF is downloading now. We&apos;ll call you within 30 minutes.
        </p>
        <p className="text-text-muted text-xs mt-4">
          Didn&apos;t get the download?{" "}
          <button
            type="button"
            onClick={downloadCurriculum}
            className="text-primary font-semibold underline underline-offset-2"
          >
            Click here
          </button>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      id="demo-form"
      className="bg-white rounded-2xl p-6 sm:p-7 shadow-xl scroll-mt-6"
      noValidate
    >
      <h3 className="text-lg font-extrabold text-text-primary mb-0.5">Get Your Free Demo + Career Roadmap</h3>
      <p className="text-sm text-text-secondary mb-5">Not sure where to start? We&apos;ll help you.</p>

      {serverError && (
        <div className="mb-4 px-3 py-2.5 rounded-lg bg-destructive-light text-destructive text-xs">{serverError}</div>
      )}

      <div className="space-y-3.5">
        <div>
          <input
            type="text"
            placeholder="Full name *"
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.name ? "border-destructive" : "border-border focus:border-primary"}`}
          />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="Mobile number *"
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.phone ? "border-destructive" : "border-border focus:border-primary"}`}
            />
            {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email *"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.email ? "border-destructive" : "border-border focus:border-primary"}`}
            />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>
        </div>

        <div>
          <select
            value={form.role}
            onChange={(e) => setField("role", e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.role ? "border-destructive" : "border-border focus:border-primary"} ${!form.role ? "text-text-muted" : "text-text-primary"}`}
          >
            <option value="">Current role / experience *</option>
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r} className="text-text-primary">
                {r}
              </option>
            ))}
          </select>
          {errors.role && <p className="mt-1 text-xs text-destructive">{errors.role}</p>}
        </div>

        <div>
          <select
            value={form.course}
            onChange={(e) => setField("course", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            {COURSE_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <select
              value={form.mode}
              onChange={(e) => setField("mode", e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.mode ? "border-destructive" : "border-border focus:border-primary"} ${!form.mode ? "text-text-muted" : "text-text-primary"}`}
            >
              <option value="">Learning mode *</option>
              {MODE_OPTIONS.map((m) => (
                <option key={m} value={m} className="text-text-primary">
                  {m}
                </option>
              ))}
            </select>
            {errors.mode && <p className="mt-1 text-xs text-destructive">{errors.mode}</p>}
          </div>
          <div>
            <select
              value={form.urgency}
              onChange={(e) => setField("urgency", e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-lg border border-border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${!form.urgency ? "text-text-muted" : "text-text-primary"}`}
            >
              <option value="">Urgency</option>
              {URGENCY_OPTIONS.map((u) => (
                <option key={u} value={u} className="text-text-primary">
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl gradient-accent text-white font-bold shadow-lg hover:shadow-glow-accent transition-shadow disabled:opacity-60"
      >
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        {isSubmitting ? "Submitting..." : "Book My Free Demo"}
        {!isSubmitting && <ArrowRight className="w-4 h-4" />}
      </button>

      <p className="mt-3 text-[11px] text-text-muted text-center">
        Your details are 100% secure. We&apos;ll call within 30 mins.
      </p>
    </form>
  );
}
