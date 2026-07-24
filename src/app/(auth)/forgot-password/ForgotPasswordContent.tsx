"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { GraduationCap, Mail, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import api from "@/lib/api";
import FormInput from "@/components/ui/FormInput";
import FormError from "@/components/ui/FormError";
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/lib/validations/auth";

export default function ForgotPasswordContent() {
  const [isSent, setIsSent] = useState(false);
  const [serverError, setServerError] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setServerError("");
    try {
      await api.post("/auth/forgot-password", values);
      setSubmittedEmail(values.email);
      setIsSent(true);
    } catch (err: any) {
      setServerError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-6 py-12 bg-background">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-extrabold">Webi<span className="text-primary">Geeks</span></span>
        </div>

        {isSent ? (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-success-light flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <h1 className="text-2xl font-extrabold text-text-primary mb-2">Check Your Email</h1>
            <p className="text-text-secondary text-sm mb-6">
              If an account with <strong>{submittedEmail}</strong> exists, we&apos;ve sent a password reset link.
            </p>
            <Link href="/login" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-extrabold text-text-primary mb-1">Forgot Password?</h1>
            <p className="text-text-secondary text-sm mb-8">
              No worries! Enter your email and we&apos;ll send you a reset link.
            </p>

            <FormError message={serverError} />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <FormInput
                label="Email Address"
                icon={Mail}
                type="email"
                placeholder="your@email.com"
                error={errors.email?.message}
                {...register("email")}
              />

              <button type="submit" disabled={isSubmitting} className="w-full py-3.5 rounded-xl gradient-primary text-white font-bold shadow-md hover:shadow-glow transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {isSubmitting ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Send Reset Link <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>

            <p className="text-center text-sm text-text-secondary mt-6">
              <Link href="/login" className="text-primary font-semibold hover:underline flex items-center justify-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </Link>
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}
