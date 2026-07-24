"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { GraduationCap, Mail, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import api from "@/lib/api";
import FormInput from "@/components/ui/FormInput";
import FormError from "@/components/ui/FormError";
import { registerSchema, type RegisterFormValues } from "@/lib/validations/auth";

export default function RegisterContent() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  const password = watch("password") || "";
  const confirmPassword = watch("confirmPassword") || "";

  const onSubmit = async (values: RegisterFormValues) => {
    setServerError("");
    try {
      await api.post("/auth/register", { email: values.email, password: values.password });
      router.push("/dashboard");
    } catch (err: any) {
      setServerError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const passwordChecks = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Passwords match", met: password === confirmPassword && confirmPassword.length > 0 },
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

          <FormError message={serverError} />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormInput
              label="Email"
              icon={Mail}
              type="email"
              placeholder="your@email.com"
              error={errors.email?.message}
              {...register("email")}
            />

            <FormInput
              label="Password"
              icon={Lock}
              type="password"
              placeholder="Create a password"
              error={errors.password?.message}
              {...register("password")}
            />

            <FormInput
              label="Confirm Password"
              icon={Lock}
              type="password"
              placeholder="Confirm your password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            {/* Password checks */}
            {password.length > 0 && (
              <div className="space-y-1.5">
                {passwordChecks.map((check) => (
                  <div key={check.label} className={`flex items-center gap-2 text-xs ${check.met ? "text-success" : "text-text-muted"}`}>
                    <CheckCircle2 className={`w-3.5 h-3.5 ${check.met ? "text-success" : "text-gray-300"}`} />
                    {check.label}
                  </div>
                ))}
              </div>
            )}

            <button type="submit" disabled={isSubmitting} className="w-full py-3.5 rounded-xl gradient-primary text-white font-bold shadow-md hover:shadow-glow transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {isSubmitting ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><ArrowRight className="w-4 h-4" />Create Account</>}
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
