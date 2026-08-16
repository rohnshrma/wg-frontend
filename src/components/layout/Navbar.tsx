"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useObfuscatedEmail } from "@/lib/useObfuscatedEmail";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const email = useObfuscatedEmail();

  const isActiveRoute = (href: string): boolean =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full bg-ink transition-all duration-300 font-display",
          isScrolled && "bg-ink/80 backdrop-blur-lg"
        )}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group min-w-0">
              <Image src="/images/brand-mark.png" alt="WebiGeeks Digital" width={40} height={40} className="w-9 h-9 shrink-0" loading="eager" />
              <span className="text-lg font-bold tracking-tight text-white leading-tight hidden xs:block">
                WebiGeeks Digital
              </span>
            </Link>

            {/* Right controls */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-ink bg-white hover:bg-agency-accent hover:text-white rounded-full transition-colors duration-300"
              >
                Start a project
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setIsMenuOpen(true)}
                className="w-12 h-12 rounded-full border border-white/20 hover:border-white flex items-center justify-center transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] bg-ink font-display flex flex-col"
          >
            <div className="container-custom">
              <div className="flex items-center justify-between h-20 lg:h-24">
                <Link href="/" className="flex items-center gap-2.5" onClick={() => setIsMenuOpen(false)}>
                  <Image src="/images/brand-mark.png" alt="WebiGeeks Digital" width={40} height={40} className="w-9 h-9" />
                  <span className="text-lg font-bold text-white">WebiGeeks Digital</span>
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-12 h-12 rounded-full border border-white/20 hover:border-white flex items-center justify-center transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center container-custom">
              <nav className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActiveRoute(item.href) ? "page" : undefined}
                      className={cn(
                        "group flex items-baseline gap-4 py-3 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight transition-colors",
                        isActiveRoute(item.href) ? "text-agency-accent" : "text-white hover:text-agency-accent"
                      )}
                    >
                      <span className="font-mono-agency text-sm sm:text-base text-white/30 tracking-[0.1em] self-center">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                      <ArrowUpRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            <div className="container-custom pb-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-8 border-t border-white/10 text-white/60 text-sm">
                <a href={email.href} className="hover:text-white transition-colors">
                  {email.label}
                </a>
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.phone}
                </a>
                <span>{siteConfig.contact.address}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
