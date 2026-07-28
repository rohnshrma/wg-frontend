"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Filter, Loader2, Plus, RotateCcw, Search, X } from "lucide-react";
import {
  ENQUIRY_SOURCES,
  SOURCE_LABELS,
  STAGE_LABELS,
  ENQUIRY_STAGES,
  type Enquiry,
  type EnquiryStage,
  type StaffUser,
} from "@/types/crm";
import { deleteEnquiry, fetchEnquiries, fetchStaffUsers } from "@/lib/crm";
import PipelineBoard from "./PipelineBoard";
import EnquiryFormModal from "./EnquiryFormModal";
import EnquiryDetailModal from "./EnquiryDetailModal";

interface Props {
  /** Admins can delete enquiries and assign them to other counsellors. */
  isAdmin: boolean;
}

export default function CrmPipelineView({ isAdmin }: Props) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [counsellors, setCounsellors] = useState<StaffUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Enquiry | null>(null);
  const [detail, setDetail] = useState<Enquiry | null>(null);

  const loadEnquiries = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await fetchEnquiries();
      setEnquiries(data);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      setError(e.response?.data?.message || "Could not load enquiries");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEnquiries();
  }, [loadEnquiries]);

  useEffect(() => {
    if (!isAdmin) return;
    fetchStaffUsers().then(setCounsellors).catch(() => setCounsellors([]));
  }, [isAdmin]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  // Filtering happens client-side: the board needs every stage on screen at
  // once, so it already holds the full working set.
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const from = dateFrom ? new Date(dateFrom).setHours(0, 0, 0, 0) : null;
    const to = dateTo ? new Date(dateTo).setHours(23, 59, 59, 999) : null;

    return enquiries.filter((enquiry) => {
      if (stageFilter && enquiry.stage !== stageFilter) return false;
      if (sourceFilter && enquiry.source !== sourceFilter) return false;
      if (courseFilter && !enquiry.course.toLowerCase().includes(courseFilter.toLowerCase()))
        return false;
      if (ownerFilter) {
        const ownerId = typeof enquiry.owner === "string" ? enquiry.owner : enquiry.owner?._id;
        if (ownerId !== ownerFilter) return false;
      }
      if (from || to) {
        const stamp = new Date(enquiry.enquiryDate).getTime();
        if (from && stamp < from) return false;
        if (to && stamp > to) return false;
      }
      if (term) {
        const haystack = `${enquiry.name} ${enquiry.mobile} ${enquiry.course}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    });
  }, [enquiries, search, stageFilter, sourceFilter, courseFilter, ownerFilter, dateFrom, dateTo]);

  const activeFilterCount = [
    stageFilter,
    sourceFilter,
    courseFilter,
    ownerFilter,
    dateFrom,
    dateTo,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setStageFilter("");
    setSourceFilter("");
    setCourseFilter("");
    setOwnerFilter("");
    setDateFrom("");
    setDateTo("");
  };

  const handleOptimisticMove = useCallback((id: string, stage: EnquiryStage) => {
    setEnquiries((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, stage, updatedAt: new Date().toISOString() } : item
      )
    );
  }, []);

  const handleStageChanged = useCallback((updated: Enquiry) => {
    setEnquiries((prev) => prev.map((item) => (item._id === updated._id ? updated : item)));
    setToast(`Moved to ${STAGE_LABELS[updated.stage]}`);
  }, []);

  const handleSaved = (saved: Enquiry, isNew: boolean) => {
    setEnquiries((prev) =>
      isNew ? [saved, ...prev] : prev.map((item) => (item._id === saved._id ? saved : item))
    );
    setToast(isNew ? "Enquiry created" : "Enquiry updated");
    setDetail((prev) => (prev && prev._id === saved._id ? saved : prev));
  };

  const handleDelete = async (enquiry: Enquiry) => {
    if (!window.confirm(`Delete the enquiry from ${enquiry.name}? This cannot be undone.`)) return;
    const snapshot = enquiries;
    setEnquiries((prev) => prev.filter((item) => item._id !== enquiry._id));
    setDetail(null);
    try {
      await deleteEnquiry(enquiry._id);
      setToast("Enquiry deleted");
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      setEnquiries(snapshot);
      setError(e.response?.data?.message || "Could not delete the enquiry");
    }
  };

  const selectClass =
    "w-full px-3 py-2 rounded-lg border border-border text-sm bg-white text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
        <div className="relative flex-1 lg:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, mobile or course..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-border text-sm font-medium text-text-secondary hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={loadEnquiries}
            className="p-2.5 rounded-lg border border-border text-text-secondary hover:bg-gray-50 transition-colors"
            aria-label="Refresh"
            title="Refresh"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Enquiry
          </button>
        </div>
      </div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="overflow-hidden"
        >
          <div className="bg-white rounded-xl border border-border p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label htmlFor="flt-stage" className="block text-xs font-medium text-text-muted mb-1.5">Stage</label>
              <select id="flt-stage" value={stageFilter} onChange={(e) => setStageFilter(e.target.value)} className={selectClass}>
                <option value="">All stages</option>
                {ENQUIRY_STAGES.map((stage) => (
                  <option key={stage} value={stage}>{STAGE_LABELS[stage]}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="flt-source" className="block text-xs font-medium text-text-muted mb-1.5">Source</label>
              <select id="flt-source" value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} className={selectClass}>
                <option value="">All sources</option>
                {ENQUIRY_SOURCES.map((source) => (
                  <option key={source} value={source}>{SOURCE_LABELS[source]}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="flt-course" className="block text-xs font-medium text-text-muted mb-1.5">Course</label>
              <input
                type="text"
                id="flt-course" value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                placeholder="Course name"
                className={selectClass}
              />
            </div>
            {isAdmin && (
              <div>
                <label htmlFor="flt-owner" className="block text-xs font-medium text-text-muted mb-1.5">Counsellor</label>
                <select id="flt-owner" value={ownerFilter} onChange={(e) => setOwnerFilter(e.target.value)} className={selectClass}>
                  <option value="">All counsellors</option>
                  {counsellors.map((user) => (
                    <option key={user._id} value={user._id}>{user.name || user.email}</option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label htmlFor="flt-from" className="block text-xs font-medium text-text-muted mb-1.5">From date</label>
              <input type="date" id="flt-from" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className={selectClass} />
            </div>
            <div>
              <label htmlFor="flt-to" className="block text-xs font-medium text-text-muted mb-1.5">To date</label>
              <input type="date" id="flt-to" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className={selectClass} />
            </div>

            {activeFilterCount > 0 && (
              <div className="sm:col-span-2 lg:col-span-3 flex justify-end">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  <X className="w-3.5 h-3.5" /> Clear all filters
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {error && (
        <div className="px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm flex items-center justify-between gap-3">
          <span>{error}</span>
          <button type="button" onClick={() => setError("")} aria-label="Dismiss">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-24 text-text-muted gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading pipeline...
        </div>
      ) : (
        <>
          <p className="text-xs text-text-muted">
            Showing {filtered.length} of {enquiries.length} enquiries · drag a card to change its stage
          </p>
          <PipelineBoard
            enquiries={filtered}
            onOpen={setDetail}
            onStageChanged={handleStageChanged}
            onOptimisticMove={handleOptimisticMove}
            onRevert={setEnquiries}
            onError={setError}
          />
        </>
      )}

      <EnquiryFormModal
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSaved={handleSaved}
        enquiry={editing}
        counsellors={counsellors}
        canAssign={isAdmin}
      />

      <EnquiryDetailModal
        enquiry={detail}
        onClose={() => setDetail(null)}
        onEdit={(enquiry) => {
          setDetail(null);
          setEditing(enquiry);
          setFormOpen(true);
        }}
        onDelete={handleDelete}
        canDelete={isAdmin}
      />

      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-text-primary text-white text-sm font-medium shadow-lg"
        >
          {toast}
        </motion.div>
      )}
    </motion.div>
  );
}
