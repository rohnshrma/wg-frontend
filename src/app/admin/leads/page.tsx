"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Search, UserPlus } from "lucide-react";

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

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

const sourceLabels: Record<string, string> = {
  hero_form: "Hero Form",
  popup: "Popup",
  contact_page: "Contact Page",
  exit_intent: "Exit Intent",
  course_page: "Course Page",
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
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/leads?limit=100`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Could not load enquiries");
        setLeads(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load enquiries");
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

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
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
              {isLoading ? (
                <tr><td colSpan={7} className="text-center py-16 text-text-muted">Loading enquiries...</td></tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16">
                    <UserPlus className="w-12 h-12 mx-auto mb-3 text-text-muted opacity-30" />
                    <p className="font-medium text-text-muted">No enquiries yet</p>
                    <p className="text-xs text-text-muted mt-1">Website enquiry forms will appear here automatically.</p>
                  </td>
                </tr>
              ) : filteredLeads.map((lead) => (
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
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize bg-primary-50 text-primary">{lead.status}</span>
                  </td>
                  <td className="px-4 py-3 text-text-muted">{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
