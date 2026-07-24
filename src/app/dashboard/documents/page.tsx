"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import api from "@/lib/api";

type StudentDocuments = {
  photoUrl?: string;
  aadhaarUrl?: string;
};

export default function DocumentsPage() {
  const [student, setStudent] = useState<StudentDocuments | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/students/me/dashboard");
        setStudent(res.data.data?.student || null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Could not load documents");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const documents = [
    { label: "Passport Photo", url: student?.photoUrl },
    { label: "Aadhaar Card", url: student?.aadhaarUrl },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {error && <div className="px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">{error}</div>}

      <div className="bg-white rounded-xl border border-border">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-bold text-text-primary flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            My Documents
          </h3>
          <Link href="/dashboard/profile" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
            Upload / Update <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        {isLoading ? (
          <p className="p-6 text-sm text-text-muted">Loading documents...</p>
        ) : !student ? (
          <div className="p-6 text-center py-12">
            <FileText className="w-12 h-12 mx-auto mb-3 text-text-muted opacity-30" />
            <p className="font-medium text-text-muted">Complete your profile first</p>
            <p className="text-xs text-text-muted mt-1">Documents can be uploaded once you start your registration.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {documents.map((doc) => (
              <div key={doc.label} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {doc.url ? (
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-text-muted shrink-0" />
                  )}
                  <span className="text-sm font-medium text-text-primary">{doc.label}</span>
                </div>
                {doc.url ? (
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-primary hover:underline">
                    View
                  </a>
                ) : (
                  <span className="text-xs text-text-muted">Not uploaded</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
