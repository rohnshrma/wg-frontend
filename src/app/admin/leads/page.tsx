"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Search, UserPlus } from "lucide-react";
import api from "@/lib/api";

type Lead = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  courseInterested: string;
  source: string;
  status: "new" | "contacted" | "interested" | "converted" | "lost";
  message?: string;
  createdAt?: string;
};

const sourceLabels: Record<string, string> = {
  hero_form: "Hero Form",
  popup: "Popup",
  contact_page: "Contact Page",
  exit_intent: "Exit Intent",
  course_page: "Course Page",
};

const statusBadgeClass: Record<Lead["status"], string> = {
  new: "bg-primary-50 text-primary",
  contacted: "bg-warning-light text-warning",
  interested: "bg-accent-light text-accent",
  converted: "bg-success-light text-success",
  lost: "bg-gray-100 text-text-muted",
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const filteredLeads = useMemo(() => {
    const term = search.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchesStatus = !status || lead.status === status;
      const matchesSource = !source || lead.source === source;
      const matchesSearch =
        !term ||
        lead.name.toLowerCase().includes(term) ||
        lead.email.toLowerCase().includes(term) ||
        lead.phone.toLowerCase().includes(term) ||
        lead.courseInterested.toLowerCase().includes(term);
      return matchesStatus && matchesSource && matchesSearch;
    });
  }, [leads, search, source, status]);

  useEffect(() => {
    const fetchLeads = async () => {
      setIsLoading(true);
      setError("");
      try {
        const res = await api.get("/leads?limit=100");
        setLeads(res.data.data || []);
      } catch (err: any) {
        setError(err.response?.data?.message || "Could not load enquiries");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between">
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search enquiries..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="px-4 py-2.5 rounded-lg border border-border text-sm text-text-secondary bg-white">
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="interested">Interested</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>
          <select value={source} onChange={(event) => setSource(event.target.value)} className="px-4 py-2.5 rounded-lg border border-border text-sm text-text-secondary bg-white">
            <option value="">All Sources</option>
            {Object.entries(sourceLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </div>
      </div>

      {error && <div className="px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">{error}</div>}

      {isLoading ? (
        <div className="bg-white rounded-xl border border-border py-16 text-center text-text-muted text-sm">Loading enquiries...</div>
      ) : filteredLeads.length === 0 ? (
        <div className="bg-white rounded-xl border border-border py-16 text-center">
          <UserPlus className="w-12 h-12 mx-auto mb-3 text-text-muted opacity-30" />
          <p className="font-medium text-text-muted">No enquiries yet</p>
          <p className="text-xs text-text-muted mt-1">Website enquiry forms will appear here automatically.</p>
        </div>
      ) : (
        <>
          {/* Table: comfortable on wide screens where every column fits without scrolling. */}
          <div className="hidden lg:block bg-white rounded-xl border border-border overflow-hidden">
            <div className="scroll-x">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-gray-50/50">
                    <th className="text-left px-4 py-3 font-semibold text-text-secondary">Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-secondary">Contact</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-secondary">Course</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-secondary">Message</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-secondary">Source</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-secondary">Status</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-secondary">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead._id} className="border-b border-border last:border-0 align-top">
                      <td className="px-4 py-3 font-semibold text-text-primary">{lead.name}</td>
                      <td className="px-4 py-3">
                        <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-text-secondary hover:text-primary"><Phone className="w-3.5 h-3.5" /> {lead.phone}</a>
                        <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-xs text-text-muted hover:text-primary mt-1"><Mail className="w-3.5 h-3.5" /> {lead.email}</a>
                      </td>
                      <td className="px-4 py-3 text-text-secondary">{lead.courseInterested}</td>
                      <td className="px-4 py-3 text-text-secondary max-w-xs">{lead.message || "-"}</td>
                      <td className="px-4 py-3 text-text-secondary">{sourceLabels[lead.source] || lead.source}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusBadgeClass[lead.status]}`}>{lead.status}</span>
                      </td>
                      <td className="px-4 py-3 text-text-muted">{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card grid: replaces the table below lg, where seven columns would
              otherwise force horizontal scrolling through a dense grid. */}
          <div className="lg:hidden grid grid-cols-1 xs:grid-cols-2 gap-4">
            {filteredLeads.map((lead) => (
              <div key={lead._id} className="bg-white rounded-xl border border-border p-4">
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <p className="font-semibold text-text-primary leading-snug">{lead.name}</p>
                  <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusBadgeClass[lead.status]}`}>
                    {lead.status}
                  </span>
                </div>
                <div className="space-y-1.5 mb-3">
                  <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary">
                    <Phone className="w-3.5 h-3.5 shrink-0 text-text-muted" /> {lead.phone}
                  </a>
                  <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary truncate">
                    <Mail className="w-3.5 h-3.5 shrink-0 text-text-muted" /> <span className="truncate">{lead.email}</span>
                  </a>
                </div>
                <p className="text-sm text-text-secondary mb-1">{lead.courseInterested}</p>
                {lead.message && (
                  <p className="text-xs text-text-muted mt-1.5 line-clamp-2">{lead.message}</p>
                )}
                <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-border/70">
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-text-secondary font-medium truncate">
                    {sourceLabels[lead.source] || lead.source}
                  </span>
                  <span className="text-[11px] text-text-muted shrink-0">
                    {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "-"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}
