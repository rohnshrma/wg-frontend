"use client";

import { useEffect, useState } from "react";
import { Bell, Check } from "lucide-react";
import api from "@/lib/api";
import { formatDate } from "@/lib/utils";

type NotificationItem = {
  _id: string;
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
};

export default function NotificationsList() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const res = await api.get("/notifications?limit=50");
      setNotifications(res.data.data?.notifications || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not load notifications");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const markAllRead = async () => {
    try {
      await api.patch("/notifications/read-all");
      setNotifications((current) => current.map((n) => ({ ...n, isRead: true })));
    } catch {
      setError("Could not mark notifications as read");
    }
  };

  const markOneRead = async (id: string) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications((current) => current.map((n) => (n._id === id ? { ...n, isRead: true } : n)));
    } catch {
      /* non-critical */
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="bg-white rounded-xl border border-border">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <h3 className="font-bold text-text-primary flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Notifications
        </h3>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> Mark all read
          </button>
        )}
      </div>

      {error && <div className="px-6 py-3 text-sm text-destructive">{error}</div>}

      {isLoading ? (
        <p className="p-6 text-sm text-text-muted">Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <div className="p-6 text-center py-16">
          <Bell className="w-12 h-12 mx-auto mb-3 text-text-muted opacity-30" />
          <p className="font-medium text-text-muted">No notifications yet</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {notifications.map((notification) => (
            <button
              key={notification._id}
              onClick={() => !notification.isRead && markOneRead(notification._id)}
              className="w-full text-left px-6 py-4 flex items-start gap-3 hover:bg-gray-50 transition-colors"
            >
              <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${notification.isRead ? "bg-transparent" : "bg-primary"}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${notification.isRead ? "text-text-secondary" : "font-semibold text-text-primary"}`}>
                  {notification.title}
                </p>
                <p className="text-xs text-text-muted mt-0.5">{notification.message}</p>
                <p className="text-xs text-text-muted mt-1">{formatDate(notification.createdAt)}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
