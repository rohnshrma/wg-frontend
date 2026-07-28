export const ENQUIRY_STAGES = [
  "new_enquiry",
  "follow_up",
  "demo_scheduled",
  "demo_done",
  "admitted",
  "cancelled",
] as const;

export type EnquiryStage = (typeof ENQUIRY_STAGES)[number];

export const ENQUIRY_SOURCES = [
  "justdial",
  "offline_marketing",
  "website",
  "google_maps",
] as const;

export type EnquirySource = (typeof ENQUIRY_SOURCES)[number];

export const WORKING_STATUSES = ["student", "working", "fresher", "other"] as const;
export type WorkingStatus = (typeof WORKING_STATUSES)[number];

export const STAGE_LABELS: Record<EnquiryStage, string> = {
  new_enquiry: "New Enquiry",
  follow_up: "Follow Up",
  demo_scheduled: "Demo Scheduled",
  demo_done: "Demo Done",
  admitted: "Admitted",
  cancelled: "Cancelled",
};

/**
 * Each stage gets its own accent so a column — and every card in it — reads as
 * one unit at a glance. Kept as full class strings because Tailwind only ships
 * classes it can see literally in the source.
 */
export const STAGE_STYLES: Record<
  EnquiryStage,
  { dot: string; header: string; badge: string; ring: string }
> = {
  new_enquiry: {
    dot: "bg-primary",
    header: "text-primary",
    badge: "bg-primary-100 text-primary-600",
    ring: "ring-primary/30",
  },
  follow_up: {
    dot: "bg-accent-warm",
    header: "text-accent-warm",
    badge: "bg-amber-100 text-amber-700",
    ring: "ring-amber-300/40",
  },
  demo_scheduled: {
    dot: "bg-accent",
    header: "text-accent",
    badge: "bg-orange-100 text-orange-700",
    ring: "ring-orange-300/40",
  },
  demo_done: {
    dot: "bg-violet-500",
    header: "text-violet-600",
    badge: "bg-violet-100 text-violet-700",
    ring: "ring-violet-300/40",
  },
  admitted: {
    dot: "bg-success",
    header: "text-success",
    badge: "bg-green-100 text-green-700",
    ring: "ring-green-300/40",
  },
  cancelled: {
    dot: "bg-destructive",
    header: "text-destructive",
    badge: "bg-red-100 text-red-700",
    ring: "ring-red-300/40",
  },
};

export const SOURCE_LABELS: Record<EnquirySource, string> = {
  justdial: "Justdial",
  offline_marketing: "Offline Marketing",
  website: "Website",
  google_maps: "Google Maps",
};

export const WORKING_STATUS_LABELS: Record<WorkingStatus, string> = {
  student: "Student",
  working: "Working Professional",
  fresher: "Fresher",
  other: "Other",
};

export interface StaffRef {
  _id: string;
  email: string;
  name?: string;
  role: "admin" | "counsellor" | "student";
}

export interface StageHistoryEntry {
  fromStage: EnquiryStage | null;
  toStage: EnquiryStage;
  changedBy: StaffRef | string | null;
  changedAt: string;
  note?: string;
}

export interface Enquiry {
  _id: string;
  name: string;
  course: string;
  education?: string;
  workingStatus?: WorkingStatus;
  mobile: string;
  email?: string;
  remarks?: string;
  enquiryDate: string;
  source: EnquirySource;
  stage: EnquiryStage;
  stageHistory: StageHistoryEntry[];
  owner: StaffRef | string;
  createdBy: StaffRef | string;
  createdAt: string;
  updatedAt: string;
}

export interface EnquiryStats {
  byStage: Record<EnquiryStage, number>;
  bySource: { source: EnquirySource; count: number }[];
  todayCount: number;
  total: number;
  conversionRate: number;
}

export interface StaffUser {
  _id: string;
  email: string;
  name?: string;
  role: "admin" | "counsellor";
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}
