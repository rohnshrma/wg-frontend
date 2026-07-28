"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Plus, ShieldCheck, Trash2, UserCog, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  createStaffUser,
  deleteStaffUser,
  fetchStaffUsers,
  updateStaffUser,
} from "@/lib/crm";
import type { StaffUser } from "@/types/crm";

const emptyForm = { email: "", password: "", name: "", role: "counsellor" as "admin" | "counsellor" };

export default function AdminCrmUsersPage() {
  const [users, setUsers] = useState<StaffUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const load = () => {
    setIsLoading(true);
    fetchStaffUsers()
      .then(setUsers)
      .catch((err) => setError(err.response?.data?.message || "Could not load users"))
      .finally(() => setIsLoading(false));
  };

  useEffect(load, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    const errors: Record<string, string> = {};
    if (form.name.trim().length < 2) errors.name = "Name must be at least 2 characters";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = "Enter a valid email";
    if (form.password.length < 6) errors.password = "Password must be at least 6 characters";
    setFormErrors(errors);
    if (Object.keys(errors).length) return;

    setIsSaving(true);
    setError("");
    try {
      const created = await createStaffUser({
        email: form.email.trim(),
        password: form.password,
        name: form.name.trim(),
        role: form.role,
      });
      setUsers((prev) => [created, ...prev]);
      setForm(emptyForm);
      setShowForm(false);
      setToast(`${form.role === "admin" ? "Admin" : "Counsellor"} created`);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      setError(e.response?.data?.message || "Could not create the user");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleActive = async (user: StaffUser) => {
    const snapshot = users;
    setUsers((prev) =>
      prev.map((u) => (u._id === user._id ? { ...u, isActive: !u.isActive } : u))
    );
    try {
      await updateStaffUser(user._id, { isActive: !user.isActive });
      setToast(user.isActive ? "Account deactivated" : "Account activated");
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      setUsers(snapshot);
      setError(e.response?.data?.message || "Could not update the account");
    }
  };

  const handleDelete = async (user: StaffUser) => {
    if (
      !window.confirm(
        `Delete ${user.name || user.email}? Their enquiries will be reassigned to you.`
      )
    )
      return;
    const snapshot = users;
    setUsers((prev) => prev.filter((u) => u._id !== user._id));
    try {
      await deleteStaffUser(user._id);
      setToast("User deleted");
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      setUsers(snapshot);
      setError(e.response?.data?.message || "Could not delete the user");
    }
  };

  const inputClass = (field: string) =>
    `w-full px-3 py-2.5 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 ${
      formErrors[field] ? "border-destructive" : "border-border focus:border-primary"
    }`;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-text-primary">Team Accounts</h2>
          <p className="text-sm text-text-secondary mt-0.5">
            Counsellors can manage only their own enquiries. Admins see everything.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((prev) => !prev)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      {error && (
        <div className="px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm flex items-center justify-between gap-3">
          <span>{error}</span>
          <button type="button" onClick={() => setError("")} aria-label="Dismiss">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {showForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          onSubmit={handleCreate}
          className="bg-white rounded-xl border border-border p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-hidden"
          noValidate
        >
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Priya Sharma"
              className={inputClass("name")}
            />
            {formErrors.name && <p className="mt-1 text-xs text-destructive">{formErrors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="name@webigeeks.com"
              className={inputClass("email")}
            />
            {formErrors.email && <p className="mt-1 text-xs text-destructive">{formErrors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Minimum 6 characters"
              className={inputClass("password")}
            />
            {formErrors.password && (
              <p className="mt-1 text-xs text-destructive">{formErrors.password}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value as "admin" | "counsellor" })}
              className={inputClass("role")}
            >
              <option value="counsellor">Counsellor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="sm:col-span-2 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setForm(emptyForm);
                setFormErrors({});
              }}
              className="px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-text-secondary hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isSaving && <Loader2 className="w-4 h-4 animate-spin" />} Create Account
            </button>
          </div>
        </motion.form>
      )}

      {isLoading ? (
        <div className="bg-white rounded-xl border border-border py-16 text-center text-text-muted text-sm">
          Loading users...
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white rounded-xl border border-border py-16 text-center">
          <UserCog className="w-12 h-12 mx-auto mb-3 text-text-muted opacity-30" />
          <p className="font-medium text-text-muted">No team accounts yet</p>
        </div>
      ) : (
        <>
          {/* Table on wide screens */}
          <div className="hidden lg:block bg-white rounded-xl border border-border overflow-hidden">
            <div className="scroll-x">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className="border-b border-border bg-gray-50/60">
                    <th className="text-left px-4 py-3 font-semibold text-text-secondary">Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-secondary">Email</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-secondary">Role</th>
                    <th className="text-left px-4 py-3 font-semibold text-text-secondary">Status</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b border-border last:border-0 hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-medium text-text-primary">{user.name || "—"}</td>
                      <td className="px-4 py-3 text-text-secondary break-all">{user.email}</td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full",
                            user.role === "admin"
                              ? "bg-primary-100 text-primary-600"
                              : "bg-violet-100 text-violet-700"
                          )}
                        >
                          {user.role === "admin" && <ShieldCheck className="w-3 h-3" />}
                          {user.role === "admin" ? "Admin" : "Counsellor"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => toggleActive(user)}
                          className={cn(
                            "text-xs font-bold px-2.5 py-1 rounded-full transition-colors",
                            user.isActive
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-gray-100 text-text-muted hover:bg-gray-200"
                          )}
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleDelete(user)}
                          className="p-2 rounded-lg hover:bg-destructive-light text-text-muted hover:text-destructive transition-colors"
                          aria-label={`Delete ${user.email}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card grid below lg */}
          <div className="lg:hidden grid grid-cols-1 xs:grid-cols-2 gap-4">
            {users.map((user) => (
              <div key={user._id} className="bg-white rounded-xl border border-border p-4">
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div className="min-w-0">
                    <p className="font-semibold text-text-primary truncate">{user.name || "—"}</p>
                    <p className="text-xs text-text-muted break-all">{user.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(user)}
                    className="shrink-0 p-2 -m-2 rounded-lg hover:bg-destructive-light text-text-muted hover:text-destructive transition-colors"
                    aria-label={`Delete ${user.email}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-border/70">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full",
                      user.role === "admin"
                        ? "bg-primary-100 text-primary-600"
                        : "bg-violet-100 text-violet-700"
                    )}
                  >
                    {user.role === "admin" && <ShieldCheck className="w-3 h-3" />}
                    {user.role === "admin" ? "Admin" : "Counsellor"}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleActive(user)}
                    className={cn(
                      "text-xs font-bold px-2.5 py-1 rounded-full transition-colors",
                      user.isActive
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-100 text-text-muted hover:bg-gray-200"
                    )}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

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
