"use client";

import { motion } from "framer-motion";
import { CreditCard, Download, Info } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function PaymentsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-border p-5">
          <p className="text-xs text-text-muted mb-1">Total Fees</p>
          <p className="text-2xl font-extrabold text-text-primary">—</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <p className="text-xs text-text-muted mb-1">Paid</p>
          <p className="text-2xl font-extrabold text-success">{formatCurrency(0)}</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <p className="text-xs text-text-muted mb-1">Pending</p>
          <p className="text-2xl font-extrabold text-warning">{formatCurrency(0)}</p>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl border border-border">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-bold text-text-primary flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Payment History
          </h3>
        </div>
        <div className="p-6 text-center py-12">
          <CreditCard className="w-12 h-12 mx-auto mb-3 text-text-muted opacity-30" />
          <p className="font-medium text-text-muted">No payments yet</p>
          <p className="text-xs text-text-muted mt-1">
            Payment history will appear here once you start your course.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
