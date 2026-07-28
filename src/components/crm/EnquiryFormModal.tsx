"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, X } from "lucide-react";
import {
  ENQUIRY_SOURCES,
  SOURCE_LABELS,
  WORKING_STATUSES,
  WORKING_STATUS_LABELS,
  type Enquiry,
  type StaffUser,
} from "@/types/crm";
import { createEnquiry, updateEnquiry, type EnquiryPayload } from "@/lib/crm";

/** `datetime-local` needs `YYYY-MM-DDTHH:mm` in *local* time, not an ISO UTC string. */
const toLocalInputValue = (date: Date): string => {
  const offsetMs = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
};

const emptyForm = () => ({
  name: "",
  course: "",
  education: "",
  workingStatus: "",
  mobile: "",
  email: "",
  remarks: "",
  // Prefilled with "now" so the user never types a date — the brief's explicit ask.
  enquiryDate: toLocalInputValue(new Date()),
  source: "",
  owner: "",
});

type FormState = ReturnType<typeof emptyForm>;

interface Props {
  open: boolean;
  onClose: () => void;
  onSaved: (enquiry: Enquiry, isNew: boolean) => void;
  enquiry?: Enquiry | null;
  counsellors?: StaffUser[];
  canAssign?: boolean;
}

export default function EnquiryFormModal({
  open,
  onClose,
  onSaved,
  enquiry,
  counsellors = [],
  canAssign = false,
}: Props) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const isEdit = Boolean(enquiry);

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setServerError("");
    if (enquiry) {
      setForm({
        name: enquiry.name,
        course: enquiry.course,
        education: enquiry.education || "",
        workingStatus: enquiry.workingStatus || "",
        mobile: enquiry.mobile,
        email: enquiry.email || "",
        remarks: enquiry.remarks || "",
        enquiryDate: toLocalInputValue(new Date(enquiry.enquiryDate)),
        source: enquiry.source,
        owner: typeof enquiry.owner === "string" ? enquiry.owner : enquiry.owner?._id || "",
      });
    } else {
      setForm(emptyForm());
    }
  }, [open, enquiry]);

  const setField = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: "" } : prev));
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Name must be at least 2 characters";
    if (!form.course.trim()) next.course = "Course is required";
    if (!/^[6-9]\d{9}$/.test(form.mobile.trim()))
      next.mobile = "Enter a valid 10-digit Indian mobile number";
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim()))
      next.email = "Enter a valid email address";
    if (!form.source) next.source = "Select a source";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    setServerError("");
    try {
      const payload: EnquiryPayload = {
        name: form.name.trim(),
        course: form.course.trim(),
        mobile: form.mobile.trim(),
        source: form.source,
        enquiryDate: new Date(form.enquiryDate).toISOString(),
      };
      if (form.education.trim()) payload.education = form.education.trim();
      if (form.workingStatus) payload.workingStatus = form.workingStatus;
      if (form.email.trim()) payload.email = form.email.trim();
      if (form.remarks.trim()) payload.remarks = form.remarks.trim();
      if (canAssign && form.owner) payload.owner = form.owner;

      const saved = enquiry
        ? await updateEnquiry(enquiry._id, payload)
        : await createEnquiry(payload);

      onSaved(saved, !enquiry);
      onClose();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string; errors?: { field: string; message: string }[] } } };
      const fieldErrors = error.response?.data?.errors;
      if (fieldErrors?.length) {
        setErrors(Object.fromEntries(fieldErrors.map((e) => [e.field, e.message])));
      }
      setServerError(error.response?.data?.message || "Could not save enquiry. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-3 py-2.5 rounded-lg border text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
      errors[field] ? "border-destructive" : "border-border focus:border-primary"
    }`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full sm:max-w-2xl bg-white rounded-t-2xl sm:rounded-2xl shadow-xl max-h-[92vh] sm:max-h-[88vh] flex flex-col"
          >
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border shrink-0">
              <h2 className="text-base sm:text-lg font-bold text-text-primary">
                {isEdit ? "Edit Enquiry" : "New Enquiry"}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-5 sm:px-6 py-5" noValidate>
              {serverError && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">
                  {serverError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="enq-name" className="block text-sm font-medium text-text-primary mb-1.5">
                    Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="enq-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    placeholder="Full name"
                    className={inputClass("name")}
                  />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="enq-course" className="block text-sm font-medium text-text-primary mb-1.5">
                    Course <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="enq-course"
                    type="text"
                    value={form.course}
                    onChange={(e) => setField("course", e.target.value)}
                    placeholder="e.g. Full Stack Development"
                    className={inputClass("course")}
                  />
                  {errors.course && <p className="mt-1 text-xs text-destructive">{errors.course}</p>}
                </div>

                <div>
                  <label htmlFor="enq-education" className="block text-sm font-medium text-text-primary mb-1.5">
                    Education
                  </label>
                  <input
                    id="enq-education"
                    type="text"
                    value={form.education}
                    onChange={(e) => setField("education", e.target.value)}
                    placeholder="e.g. B.Tech CSE"
                    className={inputClass("education")}
                  />
                </div>

                <div>
                  <label htmlFor="enq-working-status" className="block text-sm font-medium text-text-primary mb-1.5">
                    Working Status
                  </label>
                  <select
                    id="enq-working-status"
                    value={form.workingStatus}
                    onChange={(e) => setField("workingStatus", e.target.value)}
                    className={inputClass("workingStatus")}
                  >
                    <option value="">Select status</option>
                    {WORKING_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {WORKING_STATUS_LABELS[status]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="enq-mobile" className="block text-sm font-medium text-text-primary mb-1.5">
                    Mobile Number <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="enq-mobile"
                    type="tel"
                    inputMode="numeric"
                    value={form.mobile}
                    onChange={(e) => setField("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="10-digit mobile"
                    className={inputClass("mobile")}
                  />
                  {errors.mobile && <p className="mt-1 text-xs text-destructive">{errors.mobile}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="enq-email" className="block text-sm font-medium text-text-primary mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="enq-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    placeholder="name@example.com"
                    className={inputClass("email")}
                  />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="enq-source" className="block text-sm font-medium text-text-primary mb-1.5">
                    Source <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="enq-source"
                    value={form.source}
                    onChange={(e) => setField("source", e.target.value)}
                    className={inputClass("source")}
                  >
                    <option value="">Select source</option>
                    {ENQUIRY_SOURCES.map((source) => (
                      <option key={source} value={source}>
                        {SOURCE_LABELS[source]}
                      </option>
                    ))}
                  </select>
                  {errors.source && <p className="mt-1 text-xs text-destructive">{errors.source}</p>}
                </div>

                <div>
                  <label htmlFor="enq-date" className="block text-sm font-medium text-text-primary mb-1.5">
                    Date &amp; Time
                  </label>
                  <input
                    id="enq-date"
                    type="datetime-local"
                    value={form.enquiryDate}
                    onChange={(e) => setField("enquiryDate", e.target.value)}
                    className={inputClass("enquiryDate")}
                  />
                  <p className="mt-1 text-xs text-text-muted">Auto-filled with the current date and time</p>
                </div>

                {canAssign && counsellors.length > 0 && (
                  <div className="sm:col-span-2">
                    <label htmlFor="enq-owner" className="block text-sm font-medium text-text-primary mb-1.5">
                      Assign To
                    </label>
                    <select
                      id="enq-owner"
                      value={form.owner}
                      onChange={(e) => setField("owner", e.target.value)}
                      className={inputClass("owner")}
                    >
                      <option value="">Myself</option>
                      {counsellors.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.name || user.email} ({user.role})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="sm:col-span-2">
                  <label htmlFor="enq-remarks" className="block text-sm font-medium text-text-primary mb-1.5">
                    Remarks
                  </label>
                  <textarea
                    id="enq-remarks"
                    rows={3}
                    value={form.remarks}
                    onChange={(e) => setField("remarks", e.target.value)}
                    placeholder="Any notes about this enquiry..."
                    className={`${inputClass("remarks")} resize-y`}
                  />
                </div>
              </div>
            </form>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 px-5 sm:px-6 py-4 border-t border-border shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-text-secondary hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSaving}
                className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                {isEdit ? "Save Changes" : "Create Enquiry"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
