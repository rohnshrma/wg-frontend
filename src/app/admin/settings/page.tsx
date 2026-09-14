"use client";
import { motion } from "framer-motion";
import { Settings, Save, CheckCircle2, Palette } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import NextImage from "next/image";
import api from "@/lib/api";
import DocumentUploadField from "@/components/forms/DocumentUploadField";
import type { TenantColors } from "@/lib/tenant";

const DEFAULT_COLORS: TenantColors = { primary: "#2563eb", secondary: "#1e293b", accent: "#f59e0b" };

// Pre-existing `catch (err: any)` pattern elsewhere in the codebase trips
// @typescript-eslint/no-explicit-any; typed narrowing here instead so this
// file lints clean.
function getErrorMessage(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err)) {
    const message = (err.response?.data as { message?: string } | undefined)?.message;
    if (message) return message;
  }
  return fallback;
}

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Tenant branding — a separate backend model (Tenant) from the Settings
  // singleton above, so it gets its own fetch/save lifecycle and feedback
  // state rather than being folded into the section above.
  const [tenantName, setTenantName] = useState("");
  const [tenantDescription, setTenantDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [colors, setColors] = useState<TenantColors>(DEFAULT_COLORS);
  const [tenantPhone, setTenantPhone] = useState("");
  const [tenantEmail, setTenantEmail] = useState("");
  const [tenantAddress, setTenantAddress] = useState("");
  const [isTenantLoading, setIsTenantLoading] = useState(true);
  const [isTenantSaving, setIsTenantSaving] = useState(false);
  const [tenantError, setTenantError] = useState("");
  const [tenantSuccessMessage, setTenantSuccessMessage] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);
      setError("");
      try {
        const res = await api.get("/settings");
        const data = res.data.data;
        setSiteName(data.siteName);
        setPhone(data.contactPhone);
        setEmail(data.contactEmail);
        setAddress(data.address);
      } catch (err: unknown) {
        setError(getErrorMessage(err, "Could not load settings"));
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const fetchTenant = async () => {
      setIsTenantLoading(true);
      setTenantError("");
      try {
        const res = await api.get("/tenant/current");
        const data = res.data.data;
        setTenantName(data.name || "");
        setTenantDescription(data.description || "");
        setLogoUrl(data.logoUrl || "");
        setColors({ ...DEFAULT_COLORS, ...data.colors });
        setTenantPhone(data.contactPhone || "");
        setTenantEmail(data.contactEmail || "");
        setTenantAddress(data.address || "");
      } catch (err: unknown) {
        setTenantError(getErrorMessage(err, "Could not load tenant branding"));
      } finally {
        setIsTenantLoading(false);
      }
    };
    fetchTenant();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    try {
      await api.put("/settings", {
        siteName,
        contactPhone: phone,
        contactEmail: email,
        address,
      });
      setSuccessMessage("Settings saved");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Could not save settings"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveTenant = async () => {
    setIsTenantSaving(true);
    setTenantError("");
    try {
      const res = await api.put("/tenant/current", {
        name: tenantName,
        description: tenantDescription,
        logoUrl,
        colors,
        contactPhone: tenantPhone,
        contactEmail: tenantEmail,
        address: tenantAddress,
      });
      const data = res.data.data;
      setTenantName(data.name || "");
      setTenantDescription(data.description || "");
      setLogoUrl(data.logoUrl || "");
      setColors({ ...DEFAULT_COLORS, ...data.colors });
      setTenantPhone(data.contactPhone || "");
      setTenantEmail(data.contactEmail || "");
      setTenantAddress(data.address || "");
      setTenantSuccessMessage("Branding saved");
      setTimeout(() => setTenantSuccessMessage(""), 4000);
    } catch (err: unknown) {
      setTenantError(getErrorMessage(err, "Could not save branding"));
    } finally {
      setIsTenantSaving(false);
    }
  };

  const updateColor = (key: keyof TenantColors, value: string) => {
    setColors((prev) => ({ ...prev, [key]: value }));
  };

  const inputClass = "w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";

  if (isLoading) {
    return <div className="text-center py-16 text-text-muted">Loading settings...</div>;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 max-w-2xl">
      {successMessage && <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-success-light text-success text-sm"><CheckCircle2 className="w-4 h-4" /> {successMessage}</div>}
      {error && <div className="px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">{error}</div>}

      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" /> General Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Site Name</label>
            <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Contact Phone</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Contact Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Address</label>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} className={`${inputClass} resize-none`} rows={2} />
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl gradient-primary text-white font-bold text-sm shadow-sm hover:shadow-glow transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {tenantSuccessMessage && <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-success-light text-success text-sm"><CheckCircle2 className="w-4 h-4" /> {tenantSuccessMessage}</div>}
      {tenantError && <div className="px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">{tenantError}</div>}

      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" /> Tenant Branding
        </h3>
        {isTenantLoading ? (
          <div className="text-center py-8 text-text-muted text-sm">Loading branding...</div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">Logo</label>
              {logoUrl && (
                <div className="mb-2 w-20 h-20 rounded-lg border border-border bg-gray-50 flex items-center justify-center overflow-hidden">
                  <NextImage src={logoUrl} alt="Tenant logo preview" width={80} height={80} className="w-full h-full object-contain" />
                </div>
              )}
              <DocumentUploadField
                label="Logo"
                value={logoUrl}
                onChange={setLogoUrl}
                uploadType="image"
                folder="tenants/branding"
                accept="image/jpeg,image/png,image/webp"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">Name</label>
              <input type="text" value={tenantName} onChange={(e) => setTenantName(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">Description</label>
              <textarea value={tenantDescription} onChange={(e) => setTenantDescription(e.target.value)} className={`${inputClass} resize-none`} rows={2} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(["primary", "secondary", "accent"] as const).map((key) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-text-secondary mb-1 capitalize">{key} Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={colors[key]}
                      onChange={(e) => updateColor(key, e.target.value)}
                      className="w-10 h-10 rounded-lg border border-border shrink-0 cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={colors[key]}
                      onChange={(e) => updateColor(key, e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">Contact Phone</label>
              <input type="tel" value={tenantPhone} onChange={(e) => setTenantPhone(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">Contact Email</label>
              <input type="email" value={tenantEmail} onChange={(e) => setTenantEmail(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">Address</label>
              <textarea value={tenantAddress} onChange={(e) => setTenantAddress(e.target.value)} className={`${inputClass} resize-none`} rows={2} />
            </div>
            <button
              onClick={handleSaveTenant}
              disabled={isTenantSaving}
              className="px-6 py-2.5 rounded-xl gradient-primary text-white font-bold text-sm shadow-sm hover:shadow-glow transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isTenantSaving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
              {isTenantSaving ? "Saving..." : "Save Branding"}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
