"use client";

import { useRef, useState } from "react";
import { CheckCircle2, FileText, Loader2, Upload, X } from "lucide-react";
import api from "@/lib/api";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB — must match backend/src/routes/upload.routes.ts

interface DocumentUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  uploadType: "image" | "document";
  folder: string;
  disabled?: boolean;
  accept?: string;
}

export default function DocumentUploadField({
  label,
  value,
  onChange,
  uploadType,
  folder,
  disabled,
  accept = "image/jpeg,image/png,image/webp,application/pdf",
}: DocumentUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum size is 5MB.`);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const endpoint = uploadType === "image" ? "/upload/image" : "/upload/document";
      const res = await api.post(`${endpoint}?folder=${encodeURIComponent(folder)}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onChange(res.data.data.url);
    } catch (err: any) {
      setError(err.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block text-xs font-medium text-text-secondary mb-1">{label}</label>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        disabled={disabled || isUploading}
        className="hidden"
        id={`upload-${label}`}
      />
      {value ? (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-gray-50">
          <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline truncate flex-1">
            View uploaded file
          </a>
          {!disabled && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-text-muted hover:text-destructive shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          disabled={disabled || isUploading}
          onClick={() => inputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-border text-sm text-text-secondary hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
            </>
          ) : (
            <>
              {uploadType === "image" ? <Upload className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
              Upload {label}
            </>
          )}
        </button>
      )}
      {!value && !error && <p className="mt-1 text-xs text-text-muted">Max size 5MB</p>}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
