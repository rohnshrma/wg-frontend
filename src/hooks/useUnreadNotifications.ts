"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

const POLL_INTERVAL_MS = 30000;

/** Polls the logged-in user's unread notification count (works for both admin and student, since /notifications is scoped to whoever's authenticated). */
export function useUnreadNotifications(): number {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchCount = async () => {
      try {
        const res = await api.get("/notifications?limit=1");
        if (isMounted) setUnreadCount(res.data.data?.unreadCount ?? 0);
      } catch {
        /* non-critical — badge just won't update this cycle */
      }
    };

    fetchCount();
    const interval = setInterval(fetchCount, POLL_INTERVAL_MS);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return unreadCount;
}
