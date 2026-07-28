"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NextImage from "next/image";
import { ChevronRight, KanbanSquare, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const sidebarLinks = [
  { label: "Dashboard", href: "/counsellor", icon: LayoutDashboard },
  { label: "Enquiry Pipeline", href: "/counsellor/pipeline", icon: KanbanSquare },
];

export default function CounsellorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, isLoading, logout } = useAuth({ requireAuth: true, requireRole: "counsellor" });

  // Without this, a scroll gesture anywhere over the open mobile sidebar
  // falls through to the page behind it instead of staying inside the
  // drawer — the drawer has no scrollbar of its own to absorb it.
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  if (isLoading || !user) return null;

  const initial = (user.name || user.email).charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-background flex">
      <aside
        className={cn(
          // h-screen (100vh) is computed against the mobile browser's
          // expanded viewport, which is taller than what's actually visible
          // once the address bar is showing — that's what was pushing the
          // bottom section (user info, Logout) off the bottom of the screen.
          // h-svh is the stable "smallest viewport" baseline instead.
          "fixed lg:sticky top-0 left-0 z-40 h-svh w-64 bg-surface-dark text-white flex flex-col transition-transform lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
          <Link href="/counsellor" className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-white/95 flex items-center justify-center p-1 shrink-0">
              <NextImage
                src="/images/logo-mark.png"
                alt="WebiGeeks"
                width={58}
                height={36}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <span className="font-extrabold text-white text-sm">WebiGeeks</span>
              <p className="text-[9px] text-white/40 uppercase tracking-widest">Counsellor</p>
            </div>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/10"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:bg-white/5 hover:text-white/80"
                )}
              >
                <link.icon className="w-5 h-5 shrink-0" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2.5 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {initial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name || user.email}</p>
              <p className="text-xs text-white/40">Counsellor</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <header className="sticky top-0 z-20 h-16 bg-white border-b border-border flex items-center px-4 lg:px-6 gap-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-text-primary truncate">
              {sidebarLinks.find((l) => l.href === pathname)?.label || "Counsellor"}
            </h2>
          </div>
          <Link
            href="/"
            className="text-sm text-text-muted hover:text-primary flex items-center gap-1 transition-colors shrink-0"
          >
            <span className="hidden sm:inline">View Site</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </header>
        <main className="flex-1 p-4 lg:p-6 min-w-0">{children}</main>
      </div>
    </div>
  );
}
