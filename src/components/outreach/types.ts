export type Stage = {
  key: string;
  name: string;
  rotDays?: number;
  terminal?: "won" | "lost";
  next?: { type: string; afterHours: number; note: string };
};

export type Meta = {
  stages: Stage[];
  lostReasons: string[];
  activityTypes: string[];
  touchTypes: string[];
  outcomes: string[];
  sources: string[];
};

export type Activity = { _id: string; type: string; outcome?: string; note?: string; at: string };

export type CallWindow = {
  allowed: boolean | null;
  localTime?: string;
  rule?: string;
  opensAt?: string;
  reason?: string;
};

export type Lead = {
  _id: string;
  businessName: string;
  contactName?: string;
  phone?: string;
  email?: string;
  website?: string;
  mockupUrl?: string;
  mockupSentAt?: string;
  address?: string;
  city?: string;
  state?: string;
  niche?: string;
  leadType?: string;
  score: number;
  source: string;
  notes?: string;
  stage: string;
  nextAction?: { type: string; dueAt: string; note?: string };
  dealValue?: number;
  lostReason?: string;
  doNotContact: boolean;
  lastContactedAt?: string;
  activities?: Activity[];
  callWindow?: CallWindow;
  rotting?: boolean;
  createdAt: string;
};

export function apiError(err: unknown, fallback = "Something went wrong"): string {
  const e = err as { response?: { data?: { message?: string } }; message?: string };
  return e?.response?.data?.message || e?.message || fallback;
}

export const fmtDateTime = (d?: string) =>
  d
    ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(d))
    : "";

export const fmtMoney = (n = 0) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const label = (s: string) => s.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());

/** Value for <input type="datetime-local"> in the browser's local zone. */
export function toLocalInput(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

export function tomorrowMorning(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(10, 0, 0, 0);
  return toLocalInput(d);
}

/** Minimal RFC-4180 CSV parser (quoted fields, escaped quotes, CRLF). */
export function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cur = "";
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') q = false;
      else cur += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(cur); cur = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cur); cur = "";
      if (row.some((x) => x.trim())) rows.push(row);
      row = [];
    } else cur += c;
  }
  row.push(cur);
  if (row.some((x) => x.trim())) rows.push(row);
  const [head, ...body] = rows;
  if (!head) return [];
  const keys = head.map((h) => h.replace(/^﻿/, "").trim());
  return body.map((r) => Object.fromEntries(keys.map((k, i) => [k, r[i] ?? ""])));
}

export const TEMPLATES = [
  {
    id: "intro",
    name: "Intro email",
    subject: "Quick idea for {{business}}",
    body: "Hi {{name}},\n\nI took a look at {{business}} online and put together a quick idea for how your website could bring in more enquiries.\n\nWould it be OK if I sent it over?\n\nRohan Sharma\nWebiGeeks Digital",
  },
  {
    id: "mockup",
    name: "Email with design preview",
    subject: "A free homepage design for {{business}}",
    body: "Hi {{name}},\n\nI made a free sample homepage design for {{business}}, so you can see what a fresh site could look like:\n\n{{mockup}}\n\nIt is only a preview, not a live site, and there is no obligation. If you like it, I can make it real for you.\n\nRohan Sharma\nWebiGeeks Digital",
  },
  {
    id: "followup",
    name: "Follow-up email",
    subject: "Re: Quick idea for {{business}}",
    body: "Hi {{name}},\n\nJust following up on my note about {{business}}. Happy to share the design preview - no obligation.\n\nRohan Sharma\nWebiGeeks Digital",
  },
];

export function fillTemplate(t: string, lead: Lead): string {
  return t
    .replace(/{{name}}/g, lead.contactName?.split(" ")[0] || "there")
    .replace(/{{business}}/g, lead.businessName)
    .replace(/{{mockup}}/g, lead.mockupUrl || "[add design preview link]");
}
