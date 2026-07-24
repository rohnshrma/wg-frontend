"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, Users, UserPlus, BookOpen, CreditCard, MessageSquare,
  Image, PenSquare, Bell, Settings, LogOut, Menu, X, GraduationCap, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const iconMap: Record<string, any> = {
  LayoutDashboard, Users, UserPlus, BookOpen, CreditCard, MessageSquare, Image, PenSquare, Bell, Settings,
};

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Students", href: "/admin/students", icon: "Users" },
  { label: "Leads", href: "/admin/leads", icon: "UserPlus" },
  { label: "Courses", href: "/admin/courses", icon: "BookOpen" },
  { label: "Payments", href: "/admin/payments", icon: "CreditCard" },
  { label: "Testimonials", href: "/admin/testimonials", icon: "MessageSquare" },
  { label: "Gallery", href: "/admin/gallery", icon: "Image" },
  { label: "Blogs", href: "/admin/blogs", icon: "PenSquare" },
  { label: "Notifications", href: "/admin/notifications", icon: "Bell" },
  { label: "Settings", href: "/admin/settings", icon: "Settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, isLoading, logout } = useAuth({ requireAuth: true, requireRole: "admin" });

  if (isLoading || !user) return null;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-surface-dark text-white flex flex-col transition-transform lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-white text-sm">WebiGeeks</span>
              <p className="text-[9px] text-white/40 uppercase tracking-widest">Admin Panel</p>
            </div>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1.5 rounded-lg hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {sidebarLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <Link key={link.href} href={link.href} onClick={() => setIsSidebarOpen(false)} className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:bg-white/5 hover:text-white/80"
              )}>
                {Icon && <Icon className="w-5 h-5" />}
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2.5 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center text-white text-xs font-bold">A</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.email}</p>
              <p className="text-xs text-white/40">Admin</p>
            </div>
          </div>
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {isSidebarOpen && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 h-16 bg-white border-b border-border flex items-center px-4 lg:px-6 gap-4">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-text-primary">
              {sidebarLinks.find((l) => l.href === pathname)?.label || "Admin"}
            </h2>
          </div>
          <Link href="/" className="text-sm text-text-muted hover:text-primary flex items-center gap-1 transition-colors">
            View Site <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
