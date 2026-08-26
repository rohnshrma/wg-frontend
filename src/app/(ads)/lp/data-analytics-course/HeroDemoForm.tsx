"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IconArrowRight, IconCheck, IconSpinner } from "./AppleIcons";
import { EMAIL_REGEX, MOBILE_REGEX, downloadCurriculum, submitLead } from "./submitLead";

const EASE_SNAPPY = [0.23, 1, 0.32, 1] as const;
const INPUT_BASE =
  "w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white text-text-primary placeholder:text-text-muted transition-[border-color,box-shadow] duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-primary/20";

const ROLE_OPTIONS = ["Student", "Working Professional", "Career Changer"];

// Course/mode/urgency used to be separate form fields — dropped from the UI
// to shorten the form, but kept here as fixed defaults so the CRM
// webhook/email notification (which read them out of `message`) keep
// getting a value instead of silently losing that context.
const FIXED_COURSE = "Data Analytics";

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  role: "",
};

export default function HeroDemoForm() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const reduceMotion = useReducedMotion();

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
      courseInterested: FIXED_COURSE,
      message: `Role: ${form.role}`,
    });

    setIsSubmitting(false);

    if (!result.ok) {
      setServerError(result.error || "Something went wrong. Please try again.");
      return;
    }

    downloadCurriculum();
    setIsSubmitted(true);
  };

  // `id="demo-form"` lives on the outer wrapper (not the <form> itself) so it
  // survives the swap to the success card — StickyCta's IntersectionObserver
  // and every `href="#demo-form"` CTA on the page target this node.
  const enterOffset = reduceMotion ? 0 : 16;

  return (
    <div id="demo-form" className="scroll-mt-6">
      <AnimatePresence mode="wait" initial={false}>
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: enterOffset, scale: reduceMotion ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: EASE_SNAPPY }}
            className="bg-white rounded-2xl p-8 text-center shadow-xl"
          >
            <IconCheck className="w-12 h-12 mx-auto mb-4 text-success" />
            <h3 className="text-xl font-extrabold text-text-primary mb-2">You&apos;re in!</h3>
            <p className="text-text-secondary text-sm mb-1">
              Your curriculum PDF is downloading now. We&apos;ll call you within 2 hours.
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
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: enterOffset }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -enterOffset }}
            transition={{ duration: 0.3, ease: EASE_SNAPPY }}
            className="bg-white rounded-2xl p-6 sm:p-7 shadow-xl"
            noValidate
          >
            <h3 className="text-lg font-extrabold text-text-primary mb-0.5">Get Your Free Demo + Career Roadmap</h3>
            <p className="text-sm text-text-secondary mb-5">Not sure where to start? We&apos;ll help you.</p>

            {serverError && (
              <div className="mb-4 px-3 py-2.5 rounded-lg bg-destructive-light text-destructive text-xs">
                {serverError}
              </div>
            )}

            <div className="space-y-3.5">
              <div>
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="Full name *"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  className={`${INPUT_BASE} ${errors.name ? "border-destructive" : "border-border focus:border-primary"}`}
                />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="tel"
                    autoComplete="tel-national"
                    inputMode="numeric"
                    placeholder="Mobile number *"
                    value={form.phone}
                    onChange={(e) => setField("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className={`${INPUT_BASE} ${errors.phone ? "border-destructive" : "border-border focus:border-primary"}`}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="Email *"
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    className={`${INPUT_BASE} ${errors.email ? "border-destructive" : "border-border focus:border-primary"}`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>
              </div>

              <div>
                <select
                  value={form.role}
                  onChange={(e) => setField("role", e.target.value)}
                  className={`${INPUT_BASE} ${errors.role ? "border-destructive" : "border-border focus:border-primary"} ${!form.role ? "text-text-muted" : "text-text-primary"}`}
                >
                  <option value="">Current role *</option>
                  {ROLE_OPTIONS.map((r) => (
                    <option key={r} value={r} className="text-text-primary">
                      {r}
                    </option>
                  ))}
                </select>
                {errors.role && <p className="mt-1 text-xs text-destructive">{errors.role}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full gradient-accent text-white font-bold shadow-lg hover:shadow-glow-accent active:scale-[0.97] transition-[transform,box-shadow] duration-150 ease-snappy disabled:opacity-60 disabled:active:scale-100"
            >
              {isSubmitting ? <IconSpinner className="w-4 h-4 animate-spin" /> : null}
              {isSubmitting ? "Submitting..." : "Book My Free Demo"}
              {!isSubmitting && <IconArrowRight className="w-4 h-4" />}
            </button>

            <p className="mt-3 text-[11px] text-text-muted text-center">
              Your details are 100% secure. We&apos;ll call within 2 hours.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
