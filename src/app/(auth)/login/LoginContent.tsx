"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Image from "next/image";
import api from "@/lib/api";
import FormInput from "@/components/ui/FormInput";
import FormError from "@/components/ui/FormError";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import Hero3DBackground from "@/components/three/Hero3DBackground";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

export default function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError("");
    try {
      const res = await api.post("/auth/login", values);
      const role = res.data.data.user.role;
      const redirect = searchParams.get("redirect");
      if (redirect && (role === "admin" ? redirect.startsWith("/admin") : redirect.startsWith("/dashboard"))) {
        router.push(redirect);
      } else {
        router.push(role === "admin" ? "/admin" : "/dashboard");
      }
    } catch (err: any) {
      setServerError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex">
      {/* Left — Visual */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-secondary/15 rounded-full blur-[80px]" />
        <Hero3DBackground variant="compact" />
        <div className="relative text-center px-12">
          <div className="w-24 h-24 mx-auto rounded-2xl bg-white/95 flex items-center justify-center mb-6 shadow-2xl p-3">
            <Image src="/images/logo-mark.png" alt="WebiGeeks" width={116} height={72} className="w-full h-full object-contain" />
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-3">Welcome Back!</h2>
          <p className="text-white/50 text-lg leading-relaxed max-w-sm mx-auto">
            Login to access your dashboard, track your progress, and manage your courses.
          </p>
          <div className="mt-8 flex justify-center gap-6 text-white/40 text-sm">
            <span>📊 Track Progress</span>
            <span>📚 Course Access</span>
            <span>💳 Payments</span>
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <h1 className="text-2xl font-extrabold text-text-primary mb-1">Sign In</h1>
          <p className="text-text-secondary text-sm mb-8">
            Enter your credentials to access your account.
          </p>

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

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-text-primary">Password</label>
                <Link href="/forgot-password" className="text-xs text-primary font-medium hover:underline">
                  Forgot password?
                </Link>
              </div>
              <FormInput
                type="password"
                placeholder="Enter password"
                icon={Lock}
                error={errors.password?.message}
                {...register("password")}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl gradient-primary text-white font-bold shadow-md hover:shadow-glow transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-text-muted">OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <GoogleSignInButton label="Continue with Google" />

          <p className="text-center text-sm text-text-secondary mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
