"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import type { User } from "@/types/user";

interface UseAuthOptions {
  /** Redirect to /login if no authenticated user is found. */
  requireAuth?: boolean;
  /** If set, redirect away when the logged-in user's role doesn't match. */
  requireRole?: "student" | "admin";
}

export function useAuth(options: UseAuthOptions = {}) {
  const { requireAuth = false, requireRole } = options;
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const res = await api.get("/auth/me");
      const fetched: User = {
        id: res.data.data.user._id ?? res.data.data.user.id,
        email: res.data.data.user.email,
        role: res.data.data.user.role,
        isActive: res.data.data.user.isActive,
        isEmailVerified: res.data.data.user.isEmailVerified,
        lastLogin: res.data.data.user.lastLogin,
      };
      setUser(fetched);
      return fetched;
    } catch {
      setUser(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser().then((fetched) => {
      if (!fetched) {
        if (requireAuth) router.push("/login");
        return;
      }
      if (requireRole && fetched.role !== requireRole) {
        router.push(fetched.role === "admin" ? "/admin" : "/dashboard");
      }
    });
  }, [fetchUser, requireAuth, requireRole, router]);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setUser(null);
      router.push("/login");
    }
  }, [router]);

  return { user, isLoading, refetch: fetchUser, logout };
}
