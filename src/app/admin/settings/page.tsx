"use client";
import { motion } from "framer-motion";
import { Settings, Save, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      } catch (err: any) {
        setError(err.response?.data?.message || "Could not load settings");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
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
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not save settings");
    } finally {
      setIsSaving(false);
    }
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
    </motion.div>
  );
}
