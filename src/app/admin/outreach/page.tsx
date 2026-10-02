"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlertTriangle, Phone, Plus, Search, Upload } from "lucide-react";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import LeadDrawer from "@/components/outreach/LeadDrawer";
import { Lead, Meta, apiError, fmtDateTime, fmtMoney, label, parseCsv } from "@/components/outreach/types";

type Stats = {
  byStage: Record<string, { count: number; value: number }>;
  dueToday: number;
  won: { count: number; value: number };
  lostReasons: { reason: string; count: number }[];
};

const TABS = ["Today", "Pipeline", "Leads", "Import"] as const;
type Tab = (typeof TABS)[number];

const inputCls =
  "rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

export default function OutreachPage() {
  const [tab, setTab] = useState<Tab>("Today");
  const [meta, setMeta] = useState<Meta | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [openId, setOpenId] = useState("");
  const [adding, setAdding] = useState(false);
  const [version, setVersion] = useState(0); // bump to refetch the active tab
  const [error, setError] = useState("");

  const refresh = useCallback(() => setVersion((v) => v + 1), []);

  useEffect(() => {
    api.get("/outreach/meta").then((r) => setMeta(r.data.data)).catch((e) => setError(apiError(e)));
  }, []);
  useEffect(() => {
    api.get("/outreach/stats").then((r) => setStats(r.data.data)).catch(() => {});
  }, [version]);

  const openCount = meta
    ? meta.stages.filter((s) => !s.terminal).reduce((n, s) => n + (stats?.byStage[s.key]?.count ?? 0), 0)
    : 0;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Outreach CRM</h1>
          <p className="text-sm text-text-muted">WebiGeeks Digital · US agency leads</p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          <Plus className="h-4 w-4" /> Add lead
        </button>
      </header>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Due today" value={stats?.dueToday ?? "–"} tone={stats?.dueToday ? "warn" : undefined} />
        <Stat label="Open leads" value={stats ? openCount : "–"} />
        <Stat label="Won" value={stats?.won.count ?? "–"} />
        <Stat label="Won value" value={stats ? fmtMoney(stats.won.value) : "–"} />
      </div>

      <nav className="flex gap-1 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "-mb-px border-b-2 px-4 py-2 text-sm font-medium",
              tab === t ? "border-primary text-primary" : "border-transparent text-text-muted hover:text-text-primary",
            )}
          >
            {t}
          </button>
        ))}
      </nav>

      {error && <p className="rounded-lg bg-destructive-light px-3 py-2 text-sm text-destructive">{error}</p>}

      {meta && tab === "Today" && <TodayTab version={version} onOpen={setOpenId} />}
      {meta && tab === "Pipeline" && <PipelineTab meta={meta} stats={stats} version={version} onOpen={setOpenId} />}
      {meta && tab === "Leads" && <LeadsTab meta={meta} version={version} onOpen={setOpenId} />}
      {meta && tab === "Import" && <ImportTab onDone={() => { refresh(); setTab("Today"); }} />}

      {stats && stats.lostReasons.length > 0 && tab === "Pipeline" && (
        <section className="rounded-xl border border-border bg-surface p-4">
          <h3 className="mb-2 text-sm font-bold">Why leads are lost</h3>
          <ul className="space-y-1 text-sm">
            {stats.lostReasons.map((l) => (
              <li key={l.reason} className="flex justify-between"><span>{l.reason}</span><span className="text-text-muted">{l.count}</span></li>
            ))}
          </ul>
        </section>
      )}

      {openId && meta && (
        <LeadDrawer leadId={openId} meta={meta} onClose={() => setOpenId("")} onChanged={refresh} />
      )}
      {adding && <AddLeadModal onClose={() => setAdding(false)} onCreated={(id) => { setAdding(false); refresh(); setOpenId(id); }} />}
    </div>
  );
}

function Stat({ label: l, value, tone }: { label: string; value: React.ReactNode; tone?: "warn" }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-text-muted">{l}</p>
      <p className={cn("mt-1 text-2xl font-bold", tone === "warn" ? "text-warning" : "text-text-primary")}>{value}</p>
    </div>
  );
}

function useFetch<T>(url: string, version: number, initial: T) {
  const [data, setData] = useState<T>(initial);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let live = true;
    setLoading(true);
    api.get(url)
      .then((r) => { if (live) { setData(r.data.data); setError(""); } })
      .catch((e) => { if (live) setError(apiError(e)); })
      .finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, [url, version]);
  return { data, loading, error };
}

function TodayTab({ version, onOpen }: { version: number; onOpen: (id: string) => void }) {
  const { data, loading, error } = useFetch<Lead[]>("/outreach/today", version, []);
  const startOfToday = new Date(); startOfToday.setHours(0, 0, 0, 0);
  const overdue = data.filter((l) => l.nextAction && new Date(l.nextAction.dueAt) < startOfToday);
  const today = data.filter((l) => !overdue.includes(l));

  if (loading) return <p className="text-sm text-text-muted">Loading...</p>;
  if (error) return <p className="text-sm text-destructive">{error}</p>;
  if (data.length === 0) {
    return <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-text-muted">Nothing due. Import leads or add one to get started.</p>;
  }
  return (
    <div className="space-y-6">
      {overdue.length > 0 && <Group title={`Overdue (${overdue.length})`} leads={overdue} onOpen={onOpen} danger />}
      <Group title={`Due today (${today.length})`} leads={today} onOpen={onOpen} />
    </div>
  );
}

function Group({ title, leads, onOpen, danger }: { title: string; leads: Lead[]; onOpen: (id: string) => void; danger?: boolean }) {
  return (
    <section>
      <h2 className={cn("mb-2 text-sm font-bold", danger ? "text-destructive" : "text-text-primary")}>{title}</h2>
      <ul className="divide-y divide-border rounded-xl border border-border bg-surface">
        {leads.map((l) => (
          <li key={l._id}>
            <button onClick={() => onOpen(l._id)} className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-primary-50">
              <span className="min-w-0">
                <span className="block truncate font-medium text-text-primary">{l.businessName}</span>
                <span className="block truncate text-xs text-text-muted">
                  {[l.niche, [l.city, l.state].filter(Boolean).join(", ")].filter(Boolean).join(" · ")}
                </span>
                {l.nextAction && (
                  <span className="block text-xs text-text-secondary">
                    {label(l.nextAction.type)} · {fmtDateTime(l.nextAction.dueAt)}{l.nextAction.note ? ` — ${l.nextAction.note}` : ""}
                  </span>
                )}
              </span>
              <span className="flex shrink-0 flex-col items-end gap-1 text-xs">
                {l.nextAction?.type === "call" && l.callWindow?.allowed === true && (
                  <span className="inline-flex items-center gap-1 text-success"><Phone className="h-3 w-3" />OK to call</span>
                )}
                {l.nextAction?.type === "call" && l.callWindow?.allowed === false && (
                  <span className="inline-flex items-center gap-1 text-warning"><AlertTriangle className="h-3 w-3" />Wait</span>
                )}
                {l.rotting && <span className="text-warning">Going cold</span>}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PipelineTab({ meta, stats, version, onOpen }: { meta: Meta; stats: Stats | null; version: number; onOpen: (id: string) => void }) {
  const { data, loading } = useFetch<Lead[]>("/outreach?limit=500", version, []);
  const [dragId, setDragId] = useState("");
  const [err, setErr] = useState("");
  const [local, setLocal] = useState<Lead[] | null>(null);
  const [pendingLost, setPendingLost] = useState<{ id: string; reason: string } | null>(null);
  const leads = local ?? data;
  useEffect(() => setLocal(null), [data]);

  async function move(id: string, stage: string, extra: Record<string, unknown> = {}) {
    setErr("");
    try {
      await api.post(`/outreach/${id}/stage`, { stage, ...extra });
      const r = await api.get("/outreach?limit=500");
      setLocal(r.data.data);
    } catch (e) { setErr(apiError(e)); }
  }

  if (loading) return <p className="text-sm text-text-muted">Loading...</p>;
  return (
    <div className="space-y-3">
      {err && <p className="text-sm text-destructive">{err}</p>}
      <div className="flex gap-3 overflow-x-auto pb-3">
        {meta.stages.map((s) => {
          const col = leads.filter((l) => l.stage === s.key);
          return (
            <div
              key={s.key}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (!dragId) return;
                if (s.terminal === "lost") setPendingLost({ id: dragId, reason: "" });
                else move(dragId, s.key);
                setDragId("");
              }}
              className="w-64 shrink-0 rounded-xl border border-border bg-secondary-light/50 p-2"
            >
              <p className="mb-2 flex justify-between px-1 text-xs font-bold uppercase tracking-wide text-text-secondary">
                <span>{s.name}</span><span>{col.length}</span>
              </p>
              {s.terminal === "won" && stats && <p className="px-1 pb-2 text-xs text-text-muted">{fmtMoney(stats.won.value)}</p>}
              <div className="space-y-2">
                {col.map((l) => (
                  <button
                    key={l._id}
                    draggable
                    onDragStart={() => setDragId(l._id)}
                    onClick={() => onOpen(l._id)}
                    className="block w-full rounded-lg border border-border bg-surface p-3 text-left shadow-sm hover:border-primary"
                  >
                    <span className="block truncate text-sm font-medium">{l.businessName}</span>
                    <span className="block truncate text-xs text-text-muted">{[l.city, l.state].filter(Boolean).join(", ")}</span>
                    {l.nextAction && !s.terminal && (
                      <span className="mt-1 block text-xs text-text-secondary">{label(l.nextAction.type)} · {fmtDateTime(l.nextAction.dueAt)}</span>
                    )}
                    {l.rotting && <span className="text-xs text-warning">Going cold</span>}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {pendingLost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setPendingLost(null)}>
          <div className="w-full max-w-sm space-y-3 rounded-xl bg-surface p-5" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold">Why was this lead lost?</h3>
            <select value={pendingLost.reason} onChange={(e) => setPendingLost({ ...pendingLost, reason: e.target.value })} className={cn(inputCls, "w-full")}>
              <option value="">Pick a reason...</option>
              {meta.lostReasons.map((r) => <option key={r}>{r}</option>)}
            </select>
            <div className="flex justify-end gap-2">
              <button onClick={() => setPendingLost(null)} className="px-3 py-2 text-sm text-text-muted">Cancel</button>
              <button
                disabled={!pendingLost.reason}
                onClick={() => { move(pendingLost.id, "lost", { lostReason: pendingLost.reason }); setPendingLost(null); }}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                Mark lost
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LeadsTab({ meta, version, onOpen }: { meta: Meta; version: number; onOpen: (id: string) => void }) {
  const [q, setQ] = useState("");
  const [stage, setStage] = useState("");
  const [dq, setDq] = useState("");
  useEffect(() => { const t = setTimeout(() => setDq(q), 300); return () => clearTimeout(t); }, [q]);
  const { data, loading, error } = useFetch<Lead[]>(
    `/outreach?limit=200&q=${encodeURIComponent(dq)}&stage=${stage}`, version, [],
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, city, phone..." className={cn(inputCls, "pl-9")} />
        </div>
        <select value={stage} onChange={(e) => setStage(e.target.value)} className={inputCls}>
          <option value="">All stages</option>
          {meta.stages.map((s) => <option key={s.key} value={s.key}>{s.name}</option>)}
        </select>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead className="bg-secondary-light/60 text-left text-xs uppercase tracking-wide text-text-muted">
            <tr><th className="px-4 py-2">Business</th><th className="px-4 py-2">Location</th><th className="px-4 py-2">Phone</th><th className="px-4 py-2">Stage</th><th className="px-4 py-2">Score</th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((l) => (
              <tr key={l._id} onClick={() => onOpen(l._id)} className="cursor-pointer hover:bg-primary-50">
                <td className="px-4 py-2 font-medium">{l.businessName}<span className="block text-xs font-normal text-text-muted">{l.niche}</span></td>
                <td className="px-4 py-2">{[l.city, l.state].filter(Boolean).join(", ")}</td>
                <td className="px-4 py-2">{l.phone}</td>
                <td className="px-4 py-2">{meta.stages.find((s) => s.key === l.stage)?.name}{l.doNotContact ? " · DNC" : ""}</td>
                <td className="px-4 py-2">{l.score || ""}</td>
              </tr>
            ))}
            {!loading && data.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-text-muted">No leads found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ImportTab({ onDone }: { onDone: () => void }) {
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [fileName, setFileName] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ imported: number; skipped: number; skippedDetails: { row: number; reason: string }[] } | null>(null);
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);

  async function onFile(f?: File) {
    if (!f) return;
    setError(""); setResult(null);
    const parsed = parseCsv(await f.text());
    setFileName(f.name);
    setRows(parsed);
    if (parsed.length === 0) setError("No rows found. The file needs a header row.");
  }

  async function submit() {
    setBusy(true); setError("");
    try {
      const r = await api.post("/outreach/import", { rows });
      setResult(r.data.data);
      setRows([]);
    } catch (e) { setError(apiError(e)); }
    finally { setBusy(false); }
  }

  return (
    <div className="max-w-2xl space-y-4">
      <p className="text-sm text-text-secondary">
        Upload the daily <code>leads-YYYY-MM-DD.csv</code> from the lead finder (or any CSV with a header row:
        business, phone, email, website, city, state, niche, notes). Duplicates are skipped.
      </p>
      <input ref={input} type="file" accept=".csv,text/csv" hidden onChange={(e) => onFile(e.target.files?.[0])} />
      <button onClick={() => input.current?.click()} className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-secondary-light">
        <Upload className="h-4 w-4" /> Choose CSV file
      </button>
      {rows.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm">{fileName}: <b>{rows.length}</b> rows ready.</p>
          <button disabled={busy} onClick={submit} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
            {busy ? "Importing..." : `Import ${rows.length} leads`}
          </button>
        </div>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
      {result && (
        <div className="space-y-2 rounded-xl border border-border bg-surface p-4 text-sm">
          <p><b>{result.imported}</b> imported, <b>{result.skipped}</b> skipped.</p>
          {result.skippedDetails.length > 0 && (
            <ul className="max-h-40 list-disc overflow-y-auto pl-5 text-text-muted">
              {result.skippedDetails.map((s, i) => <li key={i}>{s.row ? `Row ${s.row}: ` : ""}{s.reason}</li>)}
            </ul>
          )}
          {result.imported > 0 && <button onClick={onDone} className="font-semibold text-primary hover:underline">Go to today&apos;s queue</button>}
        </div>
      )}
    </div>
  );
}

function AddLeadModal({ onClose, onCreated }: { onClose: () => void; onCreated: (id: string) => void }) {
  const [f, setF] = useState<Record<string, string>>({ source: "manual" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      const r = await api.post("/outreach", f);
      onCreated(r.data.data._id);
    } catch (err) { setError(apiError(err)); setBusy(false); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className="w-full max-w-md space-y-3 rounded-xl bg-surface p-5">
        <h3 className="text-lg font-bold">Add lead</h3>
        <input required placeholder="Business name *" onChange={set("businessName")} className={cn(inputCls, "w-full")} />
        <input placeholder="Contact name" onChange={set("contactName")} className={cn(inputCls, "w-full")} />
        <div className="grid grid-cols-2 gap-2">
          <input placeholder="Phone" onChange={set("phone")} className={inputCls} />
          <input type="email" placeholder="Email" onChange={set("email")} className={inputCls} />
        </div>
        <input placeholder="Website (https://...)" onChange={set("website")} className={cn(inputCls, "w-full")} />
        <div className="grid grid-cols-3 gap-2">
          <input placeholder="City" onChange={set("city")} className={cn(inputCls, "col-span-2")} />
          <input placeholder="State" maxLength={2} onChange={set("state")} className={inputCls} />
        </div>
        <input placeholder="Niche (e.g. dentist)" onChange={set("niche")} className={cn(inputCls, "w-full")} />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-3 py-2 text-sm text-text-muted">Cancel</button>
          <button disabled={busy} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">Add</button>
        </div>
      </form>
    </div>
  );
}
