"use client";

import { useCallback, useEffect, useState } from "react";
import { Copy, ExternalLink, Mail, Phone, X } from "lucide-react";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import {
  Lead, Meta, TEMPLATES, apiError, fillTemplate, fmtDateTime, fmtMoney, label, tomorrowMorning,
} from "./types";

const inputCls =
  "w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30";
const btnPrimary =
  "rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50";

export default function LeadDrawer({
  leadId, meta, onClose, onChanged,
}: { leadId: string; meta: Meta; onClose: () => void; onChanged: () => void }) {
  const [lead, setLead] = useState<Lead | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState("");

  // log-activity form
  const [type, setType] = useState("call");
  const [outcome, setOutcome] = useState("");
  const [note, setNote] = useState("");
  const [nextType, setNextType] = useState("call");
  const [nextAt, setNextAt] = useState(tomorrowMorning());
  const [nextNote, setNextNote] = useState("");
  // stage form
  const [lostReason, setLostReason] = useState("");
  const [dealValue, setDealValue] = useState("");
  const [notes, setNotes] = useState("");
  const [mockupUrl, setMockupUrl] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await api.get(`/outreach/${leadId}`);
      const l: Lead = res.data.data;
      setLead(l);
      setNotes(l.notes || "");
      setMockupUrl(l.mockupUrl || "");
      setDealValue(l.dealValue ? String(l.dealValue) : "");
    } catch (e) { setError(apiError(e)); }
  }, [leadId]);

  useEffect(() => { load(); }, [load]);

  async function run(fn: () => Promise<unknown>, after?: () => void) {
    setBusy(true); setError("");
    try { await fn(); await load(); onChanged(); after?.(); }
    catch (e) { setError(apiError(e)); }
    finally { setBusy(false); }
  }

  if (!lead) {
    return (
      <Shell onClose={onClose}>
        <p className="p-6 text-sm text-text-muted">{error || "Loading..."}</p>
      </Shell>
    );
  }

  const stage = meta.stages.find((s) => s.key === lead.stage);
  const open = !stage?.terminal && !lead.doNotContact;
  const isTouch = meta.touchTypes.includes(type);
  const where = [lead.city, lead.state].filter(Boolean).join(", ");

  function logActivity(override = false) {
    run(
      () => api.post(`/outreach/${lead!._id}/activity`, {
        type, outcome: outcome || undefined, note, override,
        nextAction: open && isTouch && outcome !== "opted_out"
          ? { type: nextType, dueAt: new Date(nextAt).toISOString(), note: nextNote }
          : undefined,
      }),
      () => { setNote(""); setOutcome(""); setNextNote(""); setNextAt(tomorrowMorning()); },
    );
  }

  function copy(id: string, text: string) {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(""), 1500);
    });
  }

  const cw = lead.callWindow;

  return (
    <Shell onClose={onClose}>
      <div className="space-y-5 p-5">
        <header className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-text-primary">{lead.businessName}</h2>
            <p className="text-sm text-text-muted">
              {[lead.niche, where].filter(Boolean).join(" · ") || "No location"}
              {lead.score ? ` · score ${lead.score}` : ""}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
              <Pill>{stage?.name}</Pill>
              {lead.leadType && <Pill>{lead.leadType}</Pill>}
              {lead.rotting && <Pill tone="warn">Going cold</Pill>}
              {lead.doNotContact && <Pill tone="bad">Do not contact</Pill>}
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 hover:bg-secondary-light">
            <X className="h-5 w-5" />
          </button>
        </header>

        {error && <p className="rounded-lg bg-destructive-light px-3 py-2 text-sm text-destructive">{error}</p>}

        <section className="grid gap-2 text-sm">
          {lead.contactName && <p><span className="text-text-muted">Contact:</span> {lead.contactName}</p>}
          {lead.phone && (
            <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-primary hover:underline">
              <Phone className="h-4 w-4" />{lead.phone}
            </a>
          )}
          {lead.email && (
            <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-primary hover:underline">
              <Mail className="h-4 w-4" />{lead.email}
            </a>
          )}
          {lead.website && (
            <a href={lead.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary hover:underline">
              <ExternalLink className="h-4 w-4" />{lead.website}
            </a>
          )}
          {lead.address && <p className="text-text-muted">{lead.address}</p>}
          {cw && cw.allowed !== null && (
            <p className={cn("rounded-lg px-3 py-2 text-xs font-medium", cw.allowed ? "bg-success-light text-success" : "bg-warning-light text-warning")}>
              {cw.allowed ? `OK to call · ${cw.localTime} their time (${cw.rule})` : `${cw.reason}. ${cw.localTime} their time.${cw.opensAt ? ` Opens ${fmtDateTime(cw.opensAt)} your time.` : ""}`}
            </p>
          )}
          {cw && cw.allowed === null && <p className="text-xs text-text-muted">{cw.reason}</p>}
        </section>

        {open && lead.nextAction && (
          <section className="rounded-lg border border-border bg-primary-50 p-3 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Next action</p>
            <p className="font-medium text-text-primary">{label(lead.nextAction.type)} · {fmtDateTime(lead.nextAction.dueAt)}</p>
            {lead.nextAction.note && <p className="text-text-secondary">{lead.nextAction.note}</p>}
          </section>
        )}

        {!lead.doNotContact && (
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-text-primary">Log activity</h3>
            <div className="grid grid-cols-2 gap-2">
              <select value={type} onChange={(e) => setType(e.target.value)} className={inputCls}>
                {meta.activityTypes.map((t) => <option key={t} value={t}>{label(t)}</option>)}
              </select>
              <select value={outcome} onChange={(e) => setOutcome(e.target.value)} className={inputCls}>
                <option value="">Outcome...</option>
                {meta.outcomes.map((o) => <option key={o} value={o}>{label(o)}</option>)}
              </select>
            </div>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="What happened?" className={inputCls} />
            {open && isTouch && outcome !== "opted_out" && (
              <div className="space-y-2 rounded-lg border border-border p-3">
                <p className="text-xs font-semibold text-text-muted">Next action (required)</p>
                <div className="grid grid-cols-2 gap-2">
                  <select value={nextType} onChange={(e) => setNextType(e.target.value)} className={inputCls}>
                    {meta.activityTypes.map((t) => <option key={t} value={t}>{label(t)}</option>)}
                  </select>
                  <input type="datetime-local" value={nextAt} onChange={(e) => setNextAt(e.target.value)} className={inputCls} />
                </div>
                <input value={nextNote} onChange={(e) => setNextNote(e.target.value)} placeholder="What to do then" className={inputCls} />
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2">
              <button disabled={busy} onClick={() => logActivity(false)} className={btnPrimary}>Save</button>
              {error.startsWith("Outside calling hours") && (
                <button disabled={busy} onClick={() => logActivity(true)} className="text-xs text-text-muted underline">
                  I already made this call - log anyway
                </button>
              )}
            </div>
          </section>
        )}

        <section className="space-y-2">
          <h3 className="text-sm font-bold text-text-primary">Stage</h3>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={lead.stage}
              disabled={busy || lead.doNotContact}
              onChange={(e) => {
                const next = meta.stages.find((s) => s.key === e.target.value);
                if (next?.terminal === "lost" && !lostReason) { setError("Pick a lost reason below, then choose Lost again."); return; }
                run(() => api.post(`/outreach/${lead._id}/stage`, { stage: e.target.value, lostReason, dealValue }));
              }}
              className={inputCls}
            >
              {meta.stages.map((s) => <option key={s.key} value={s.key}>{s.name}</option>)}
            </select>
            <select value={lostReason} onChange={(e) => setLostReason(e.target.value)} className={inputCls}>
              <option value="">Lost reason...</option>
              {meta.lostReasons.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input type="number" min={0} value={dealValue} onChange={(e) => setDealValue(e.target.value)} placeholder="Deal value (USD)" className={inputCls} />
            <button
              disabled={busy}
              onClick={() => run(() => api.patch(`/outreach/${lead._id}`, { dealValue }))}
              className="shrink-0 rounded-lg border border-border px-3 py-2 text-sm hover:bg-secondary-light"
            >
              Save
            </button>
          </div>
          {lead.dealValue ? <p className="text-xs text-text-muted">Deal value: {fmtMoney(lead.dealValue)}</p> : null}
          {lead.lostReason && <p className="text-xs text-text-muted">Lost: {lead.lostReason}</p>}
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold text-text-primary">Design preview &amp; notes</h3>
          <input value={mockupUrl} onChange={(e) => setMockupUrl(e.target.value)} placeholder="Design preview link (https://...)" className={inputCls} />
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Notes" className={inputCls} />
          <button
            disabled={busy}
            onClick={() => run(() => api.patch(`/outreach/${lead._id}`, { notes, mockupUrl }))}
            className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-secondary-light"
          >
            Save changes
          </button>
          {lead.mockupSentAt && <p className="text-xs text-text-muted">Preview sent {fmtDateTime(lead.mockupSentAt)}</p>}
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold text-text-primary">Email templates</h3>
          {TEMPLATES.map((t) => {
            const text = `Subject: ${fillTemplate(t.subject, lead)}\n\n${fillTemplate(t.body, lead)}`;
            return (
              <div key={t.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm">
                <span>{t.name}</span>
                <span className="flex gap-2">
                  {lead.email && (
                    <a
                      className="text-primary hover:underline"
                      href={`mailto:${lead.email}?subject=${encodeURIComponent(fillTemplate(t.subject, lead))}&body=${encodeURIComponent(fillTemplate(t.body, lead))}`}
                    >
                      Open
                    </a>
                  )}
                  <button onClick={() => copy(t.id, text)} className="inline-flex items-center gap-1 text-primary hover:underline">
                    <Copy className="h-3.5 w-3.5" />{copied === t.id ? "Copied" : "Copy"}
                  </button>
                </span>
              </div>
            );
          })}
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold text-text-primary">History</h3>
          {(lead.activities || []).length === 0 && <p className="text-sm text-text-muted">Nothing logged yet.</p>}
          <ul className="space-y-2">
            {[...(lead.activities || [])].reverse().map((a) => (
              <li key={a._id} className="rounded-lg border border-border px-3 py-2 text-sm">
                <p className="font-medium">
                  {label(a.type)}{a.outcome ? ` · ${label(a.outcome)}` : ""}
                  <span className="ml-2 text-xs font-normal text-text-muted">{fmtDateTime(a.at)}</span>
                </p>
                {a.note && <p className="text-text-secondary">{a.note}</p>}
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-border pt-4">
          {confirmDelete ? (
            <span className="flex items-center gap-3 text-sm">
              Delete this lead for good?
              <button
                onClick={() => run(() => api.delete(`/outreach/${lead._id}`), onClose)}
                className="font-semibold text-destructive"
              >
                Yes, delete
              </button>
              <button onClick={() => setConfirmDelete(false)} className="text-text-muted">Cancel</button>
            </span>
          ) : (
            <button onClick={() => setConfirmDelete(true)} className="text-sm text-destructive hover:underline">Delete lead</button>
          )}
        </section>
      </div>
    </Shell>
  );
}

function Shell({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={onClose}>
      <aside
        className="h-full w-full max-w-md overflow-y-auto bg-surface shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </aside>
    </div>
  );
}

function Pill({ children, tone }: { children: React.ReactNode; tone?: "warn" | "bad" }) {
  return (
    <span className={cn(
      "rounded-full px-2 py-0.5 font-medium",
      tone === "warn" ? "bg-warning-light text-warning" : tone === "bad" ? "bg-destructive-light text-destructive" : "bg-secondary-light text-text-secondary",
    )}>
      {children}
    </span>
  );
}
