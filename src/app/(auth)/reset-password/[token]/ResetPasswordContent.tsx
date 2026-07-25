"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Lock, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import api from "@/lib/api";
import FormInput from "@/components/ui/FormInput";
import FormError from "@/components/ui/FormError";
import { resetPasswordSchema, type ResetPasswordFormValues } from "@/lib/validations/auth";

export default function ResetPasswordContent({ token }: { token: string }) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [isDone, setIsDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({ resolver: zodResolver(resetPasswordSchema) });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setServerError("");
    try {
      const res = await api.post(`/auth/reset-password/${token}`, { password: values.password });
      const role = res.data.data.user.role;
      setIsDone(true);
      setTimeout(() => router.push(role === "admin" ? "/admin" : "/dashboard"), 1500);
    } catch (err: any) {
      setServerError(err.response?.data?.message || "Invalid or expired reset link.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-6 py-12 bg-background">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <Image src="/images/logo-mark.png" alt="WebiGeeks" width={58} height={36} className="h-9 w-auto" />
          <span className="text-lg font-extrabold">Webi<span className="text-primary">Geeks</span></span>
        </div>

        {isDone ? (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-success-light flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <h1 className="text-2xl font-extrabold text-text-primary mb-2">Password Reset!</h1>
            <p className="text-text-secondary text-sm">Redirecting you to your dashboard...</p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-extrabold text-text-primary mb-1">Reset Password</h1>
            <p className="text-text-secondary text-sm mb-8">Enter a new password for your account.</p>

            <FormError message={serverError} />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <FormInput
                label="New Password"
                icon={Lock}
                type="password"
                placeholder="Create a new password"
                error={errors.password?.message}
                {...register("password")}
              />

              <FormInput
                label="Confirm Password"
                icon={Lock}
                type="password"
                placeholder="Confirm your new password"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />

              <button type="submit" disabled={isSubmitting} className="w-full py-3.5 rounded-xl gradient-primary text-white font-bold shadow-md hover:shadow-glow transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {isSubmitting ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Reset Password <ArrowRight className="w-4 h-4" /></>}
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
