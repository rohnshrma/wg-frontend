"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  GraduationCap,
  Mail,
  Pencil,
  Phone,
  Trash2,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SOURCE_LABELS,
  STAGE_LABELS,
  STAGE_STYLES,
  WORKING_STATUS_LABELS,
  type Enquiry,
  type StageHistoryEntry,
} from "@/types/crm";

const fullDateTime = (iso: string): string =>
  new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

const actorLabel = (entry: StageHistoryEntry): string => {
  const actor = entry.changedBy;
  if (!actor) return "Unknown";
  if (typeof actor === "string") return "Unknown";
  return actor.name || actor.email;
};

const ownerLabel = (enquiry: Enquiry): string => {
  const owner = enquiry.owner;
  if (!owner || typeof owner === "string") return "Unassigned";
  return owner.name || owner.email;
};

interface Props {
  enquiry: Enquiry | null;
  onClose: () => void;
  onEdit: (enquiry: Enquiry) => void;
  onDelete?: (enquiry: Enquiry) => void;
  canDelete?: boolean;
}

export default function EnquiryDetailModal({
  enquiry,
  onClose,
  onEdit,
  onDelete,
  canDelete = false,
}: Props) {
  return (
    <AnimatePresence>
      {enquiry && (
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
            className="w-full sm:max-w-2xl bg-white rounded-t-2xl sm:rounded-2xl shadow-xl max-h-[92dvh] sm:max-h-[88dvh] flex flex-col"
          >
            <div className="flex items-start justify-between gap-3 px-5 sm:px-6 py-4 border-b border-border shrink-0">
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-bold text-text-primary truncate">
                  {enquiry.name}
                </h2>
                <span
                  className={cn(
                    "inline-block mt-1.5 text-xs font-bold px-2.5 py-1 rounded-full",
                    STAGE_STYLES[enquiry.stage].badge
                  )}
                >
                  {STAGE_LABELS[enquiry.stage]}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => onEdit(enquiry)}
                  className="p-2 rounded-lg hover:bg-gray-100 text-text-secondary hover:text-primary transition-colors"
                  aria-label="Edit enquiry"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                {canDelete && onDelete && (
                  <button
                    type="button"
                    onClick={() => onDelete(enquiry)}
                    className="p-2 rounded-lg hover:bg-destructive-light text-text-secondary hover:text-destructive transition-colors"
                    aria-label="Delete enquiry"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 text-text-secondary transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-6">
              <section>
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">
                  Details
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 text-sm">
                  <Field icon={GraduationCap} label="Course" value={enquiry.course} />
                  <Field
                    icon={Phone}
                    label="Mobile"
                    value={
                      <a href={`tel:${enquiry.mobile}`} className="text-primary hover:underline tabular-nums">
                        {enquiry.mobile}
                      </a>
                    }
                  />
                  <Field
                    icon={Mail}
                    label="Email"
                    value={
                      enquiry.email ? (
                        <a href={`mailto:${enquiry.email}`} className="text-primary hover:underline break-all">
                          {enquiry.email}
                        </a>
                      ) : (
                        "—"
                      )
                    }
                  />
                  <Field icon={GraduationCap} label="Education" value={enquiry.education || "—"} />
                  <Field
                    icon={User}
                    label="Working Status"
                    value={
                      enquiry.workingStatus
                        ? WORKING_STATUS_LABELS[enquiry.workingStatus]
                        : "—"
                    }
                  />
                  <Field icon={ArrowRight} label="Source" value={SOURCE_LABELS[enquiry.source]} />
                  <Field icon={User} label="Assigned To" value={ownerLabel(enquiry)} />
                  <Field icon={Calendar} label="Enquiry Date" value={fullDateTime(enquiry.enquiryDate)} />
                </dl>
              </section>

              {enquiry.remarks && (
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                    Remarks
                  </h3>
                  <p className="text-sm text-text-secondary whitespace-pre-wrap bg-gray-50 rounded-lg p-3 border border-border">
                    {enquiry.remarks}
                  </p>
                </section>
              )}

              <section>
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">
                  Stage Timeline
                </h3>
                <ol className="relative space-y-4">
                  {[...enquiry.stageHistory].reverse().map((entry, index) => (
                    <li key={`${entry.changedAt}-${index}`} className="flex gap-3">
                      <div className="flex flex-col items-center shrink-0">
                        <span
                          className={cn(
                            "w-2.5 h-2.5 rounded-full mt-1.5",
                            STAGE_STYLES[entry.toStage].dot
                          )}
                        />
                        {index < enquiry.stageHistory.length - 1 && (
                          <span className="w-px flex-1 bg-border mt-1" />
                        )}
                      </div>
                      <div className="pb-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary flex flex-wrap items-center gap-1.5">
                          {entry.fromStage ? (
                            <>
                              <span className="text-text-muted">{STAGE_LABELS[entry.fromStage]}</span>
                              <ArrowRight className="w-3 h-3 text-text-muted shrink-0" />
                            </>
                          ) : null}
                          <span>{STAGE_LABELS[entry.toStage]}</span>
                        </p>
                        <p className="text-xs text-text-muted mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {fullDateTime(entry.changedAt)}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {actorLabel(entry)}
                          </span>
                        </p>
                        {entry.note && (
                          <p className="text-xs text-text-secondary mt-1 italic">{entry.note}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-border text-xs text-text-muted">
                <p>Created: {fullDateTime(enquiry.createdAt)}</p>
                <p className="sm:text-right">Updated: {fullDateTime(enquiry.updatedAt)}</p>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-text-muted flex items-center gap-1.5 mb-0.5">
        <Icon className="w-3.5 h-3.5 shrink-0" />
        {label}
      </dt>
      <dd className="text-text-primary font-medium break-words">{value}</dd>
    </div>
  );
}
