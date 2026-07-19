"use client";

import { motion } from "framer-motion";
import { FileText, Upload, Download } from "lucide-react";

export default function DocumentsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Upload Section */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-primary" />
          Upload Documents
        </h3>
        <div className="border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-primary/30 transition-colors cursor-pointer">
          <Upload className="w-10 h-10 mx-auto mb-3 text-text-muted opacity-50" />
          <p className="text-sm font-medium text-text-primary mb-1">Click to upload or drag & drop</p>
          <p className="text-xs text-text-muted">PDF, JPG, PNG up to 5MB</p>
        </div>
      </div>

      {/* My Documents */}
      <div className="bg-white rounded-xl border border-border">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-bold text-text-primary flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            My Documents
          </h3>
        </div>
        <div className="p-6 text-center py-12">
          <FileText className="w-12 h-12 mx-auto mb-3 text-text-muted opacity-30" />
          <p className="font-medium text-text-muted">No documents uploaded</p>
          <p className="text-xs text-text-muted mt-1">Upload your Aadhar, marksheet, or other required documents.</p>
        </div>
      </div>
    </motion.div>
  );
}
