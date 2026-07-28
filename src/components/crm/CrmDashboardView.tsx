"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Loader2,
  PhoneCall,
  TrendingUp,
  UserPlus,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchEnquiryStats } from "@/lib/crm";
import { SOURCE_LABELS, type EnquiryStats } from "@/types/crm";

interface Props {
  /** Pipeline route differs between the admin panel and the counsellor area. */
  pipelineHref: string;
}

export default function CrmDashboardView({ pipelineHref }: Props) {
  const [stats, setStats] = useState<EnquiryStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEnquiryStats()
      .then(setStats)
      .catch((err) => setError(err.response?.data?.message || "Could not load CRM stats"))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-text-muted gap-2">
        <Loader2 className="w-5 h-5 animate-spin" />
        Loading dashboard...
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">
        {error || "No data available"}
      </div>
    );
  }

  const cards = [
    {
      label: "Today's Enquiries",
      value: stats.todayCount,
      icon: UserPlus,
      tone: "bg-primary-100 text-primary-600",
    },
    {
      label: "Follow Ups",
      value: stats.byStage.follow_up,
      icon: PhoneCall,
      tone: "bg-amber-100 text-amber-700",
    },
    {
      label: "Demo Scheduled",
      value: stats.byStage.demo_scheduled,
      icon: CalendarClock,
      tone: "bg-orange-100 text-orange-700",
    },
    {
      label: "Admissions",
      value: stats.byStage.admitted,
      icon: CheckCircle2,
      tone: "bg-green-100 text-green-700",
    },
    {
      label: "Cancelled",
      value: stats.byStage.cancelled,
      icon: XCircle,
      tone: "bg-red-100 text-red-700",
    },
    {
      label: "Conversion Rate",
      value: `${stats.conversionRate}%`,
      icon: TrendingUp,
      tone: "bg-violet-100 text-violet-700",
      hint: "Admitted vs closed enquiries",
    },
  ];

  const sourceTotal = stats.bySource.reduce((sum, row) => sum + row.count, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="bg-white rounded-xl border border-border p-4 hover:shadow-md transition-shadow"
          >
            <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center mb-3", card.tone)}>
              <card.icon className="w-4.5 h-4.5" />
            </div>
            <p className="text-2xl font-extrabold text-text-primary tabular-nums leading-none">
              {card.value}
            </p>
            <p className="text-xs text-text-secondary mt-1.5 font-medium">{card.label}</p>
            {card.hint && <p className="text-[10px] text-text-muted mt-0.5">{card.hint}</p>}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="font-bold text-text-primary mb-4">Source Breakdown</h3>
          {stats.bySource.length === 0 ? (
            <p className="text-sm text-text-muted py-6 text-center">No enquiries yet</p>
          ) : (
            <ul className="space-y-3.5">
              {stats.bySource.map((row) => {
                const pct = sourceTotal ? Math.round((row.count / sourceTotal) * 100) : 0;
                return (
                  <li key={row.source}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="font-medium text-text-secondary truncate">
                        {SOURCE_LABELS[row.source] ?? row.source}
                      </span>
                      <span className="text-text-muted tabular-nums shrink-0 ml-2">
                        {row.count} · {pct}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-xl border border-border p-5 flex flex-col">
          <h3 className="font-bold text-text-primary mb-4">Pipeline Overview</h3>
          <ul className="space-y-2.5 flex-1">
            {(
              [
                ["new_enquiry", "New Enquiry"],
                ["follow_up", "Follow Up"],
                ["demo_scheduled", "Demo Scheduled"],
                ["demo_done", "Demo Done"],
                ["admitted", "Admitted"],
                ["cancelled", "Cancelled"],
              ] as const
            ).map(([stage, label]) => (
              <li key={stage} className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">{label}</span>
                <span className="font-bold text-text-primary tabular-nums">
                  {stats.byStage[stage]}
                </span>
              </li>
            ))}
          </ul>
          <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
            <span className="text-sm text-text-muted">
              {stats.total} total enquir{stats.total === 1 ? "y" : "ies"}
            </span>
            <Link
              href={pipelineHref}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              Open Pipeline <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
