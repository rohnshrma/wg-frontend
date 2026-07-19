"use client";
import { motion } from "framer-motion";
import { Settings, Save } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site";

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState<string>(siteConfig.name);
  const [phone, setPhone] = useState<string>(siteConfig.contact.phone);
  const [email, setEmail] = useState<string>(siteConfig.contact.email);
  const [address, setAddress] = useState<string>(siteConfig.contact.address);

  const inputClass = "w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-2xl">
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
          <button className="px-6 py-2.5 rounded-xl gradient-primary text-white font-bold text-sm shadow-sm hover:shadow-glow transition-all flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>
    </motion.div>
  );
}
