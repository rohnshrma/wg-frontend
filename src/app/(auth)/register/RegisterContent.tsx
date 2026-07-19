"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

export default function RegisterContent() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      router.push("/dashboard");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const passwordChecks = [
    { label: "At least 6 characters", met: formData.password.length >= 6 },
    { label: "Contains a number", met: /\d/.test(formData.password) },
    { label: "Passwords match", met: formData.password === formData.confirmPassword && formData.confirmPassword.length > 0 },
  ];

  return (
    <div className="min-h-[calc(100vh-72px)] flex">
      {/* Left Visual */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-accent/15 rounded-full blur-[80px]" />
        <div className="relative text-center px-12">
          <div className="w-20 h-20 mx-auto rounded-2xl gradient-accent flex items-center justify-center mb-6 shadow-2xl">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-3">Start Your Journey!</h2>
          <p className="text-white/50 text-lg leading-relaxed max-w-sm mx-auto">
            Create your account and begin your transformation into an industry-ready professional.
          </p>
          <div className="mt-8 space-y-2 text-left max-w-xs mx-auto">
            {["Complete your profile", "Choose your course", "Start learning immediately"].map((step, i) => (
              <div key={step} className="flex items-center gap-3 text-white/60 text-sm">
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-extrabold">Webi<span className="text-primary">Geeks</span></span>
          </div>

          <h1 className="text-2xl font-extrabold text-text-primary mb-1">Create Account</h1>
          <p className="text-text-secondary text-sm mb-8">Fill in your details to get started.</p>

          {error && (
            <div className="mb-6 flex items-center gap-2 px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />{error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-muted" />
                <input type="email" placeholder="your@email.com" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full pl-10 pr-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-muted" />
                <input type={showPassword ? "text" : "password"} placeholder="Create a password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full pl-10 pr-12 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-muted" />
                <input type="password" placeholder="Confirm your password" required value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className="w-full pl-10 pr-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
            </div>

            {/* Password checks */}
            {formData.password.length > 0 && (
              <div className="space-y-1.5">
                {passwordChecks.map((check) => (
                  <div key={check.label} className={`flex items-center gap-2 text-xs ${check.met ? "text-success" : "text-text-muted"}`}>
                    <CheckCircle2 className={`w-3.5 h-3.5 ${check.met ? "text-success" : "text-gray-300"}`} />
                    {check.label}
                  </div>
                ))}
              </div>
            )}

            <button type="submit" disabled={isLoading} className="w-full py-3.5 rounded-xl gradient-primary text-white font-bold shadow-md hover:shadow-glow transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {isLoading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><ArrowRight className="w-4 h-4" />Create Account</>}
            </button>
          </form>

          <p className="text-center text-sm text-text-secondary mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
