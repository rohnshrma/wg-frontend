"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { navItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // "/" must match exactly, but every other section should stay highlighted on
  // its detail pages too (/courses/react-basics still means "Courses").
  const isActiveRoute = (href: string): boolean =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-surface-dark text-white/80 text-sm">
        <div className="container-custom flex items-center justify-between py-2">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {siteConfig.contact.phone}
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="hover:text-white transition-colors"
            >
              {siteConfig.contact.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Admissions Open — Limited Seats Available!</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-md border-b border-border/50"
            : "bg-white border-b border-transparent"
        )}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group min-w-0">
              <Image src="/images/logo-mark.png" alt="WebiGeeks" width={58} height={36} className="h-8 sm:h-9 w-auto shrink-0" loading="eager" />
              <div className="flex flex-col min-w-0">
                <span className="text-base sm:text-lg font-extrabold tracking-tight text-text-primary leading-tight">
                  Webi<span className="text-primary">Geeks</span>
                </span>
                {/* Tagline is the first thing to go on a narrow phone — the
                    wordmark alone still identifies the brand. */}
                <span className="hidden xs:block text-[10px] font-medium text-text-muted tracking-wider uppercase leading-tight truncate">
                  Your AI Skill Partner
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActiveRoute(item.href) ? "page" : undefined}
                  className={cn(
                    "relative px-3 py-2 text-[15px] font-medium rounded-lg transition-colors duration-200",
                    isActiveRoute(item.href)
                      ? "text-primary"
                      : "text-text-secondary hover:text-text-primary hover:bg-primary-50"
                  )}
                >
                  {item.label}
                  {isActiveRoute(item.href) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-semibold text-text-secondary hover:text-primary transition-colors rounded-lg hover:bg-primary-50"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-semibold text-primary border border-primary/30 rounded-lg hover:bg-primary-50 transition-all"
              >
                Register
              </Link>
              <Link
                href="/contact"
                className="group relative px-5 py-2.5 text-sm font-semibold text-white rounded-lg gradient-accent overflow-hidden shadow-md hover:shadow-glow-accent transition-shadow duration-300"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Book Free Demo
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              // Capped against the viewport so the drawer never fills the whole
              // screen on a 320px device (it left a 20px strip at a fixed 300px).
              className="fixed top-0 right-0 h-full w-[min(320px,85vw)] bg-white shadow-2xl z-50 lg:hidden flex flex-col"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Image src="/images/logo-mark.png" alt="WebiGeeks" width={52} height={32} className="h-8 w-auto" />
                  <span className="font-bold text-text-primary">
                    Webi<span className="text-primary">Geeks</span>
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex-1 overflow-y-auto py-4 px-3">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActiveRoute(item.href) ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-lg mb-1 text-[15px] font-medium transition-colors",
                        isActiveRoute(item.href)
                          ? "bg-primary-50 text-primary"
                          : "text-text-secondary hover:bg-gray-50 hover:text-text-primary"
                      )}
                    >
                      {item.label}
                      <ChevronRight className="w-4 h-4 opacity-40" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile CTA Section */}
              <div className="p-4 border-t border-border space-y-3">
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    className="flex-1 py-2.5 text-center text-sm font-semibold text-primary border border-primary/30 rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="flex-1 py-2.5 text-center text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Register
                  </Link>
                </div>
                <Link
                  href="/contact"
                  className="block w-full py-3 text-center text-sm font-bold text-white rounded-lg gradient-accent shadow-md"
                >
                  🚀 Book Free Demo
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
