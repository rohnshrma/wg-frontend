"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useObfuscatedEmail } from "@/lib/useObfuscatedEmail";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  const email = useObfuscatedEmail();

  return (
    <footer className="bg-ink text-white font-display">
      <div className="container-custom pt-20 pb-10 md:pt-28 md:pb-14">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-24">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-2xl">
            Let&apos;s build something
            <br />
            worth remembering.
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-8 py-5 bg-white text-ink font-semibold rounded-full hover:bg-agency-accent hover:text-white transition-colors duration-300 shrink-0 w-fit"
          >
            Start your project
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-16 border-b border-white/10">
          <div className="col-span-2 md:col-span-1">
            <div className="w-10 h-10 border-2 border-white/30 rounded-xl flex items-center justify-center bg-white/5 mb-4">
              <span className="text-sm font-bold">WG</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Premium digital solutions for international businesses.
            </p>
          </div>

          <div>
            <h4 className="text-white/40 text-xs uppercase tracking-widest mb-4">Navigate</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/40 text-xs uppercase tracking-widest mb-4">Services</h4>
            <ul className="space-y-3">
              {siteConfig.services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/40 text-xs uppercase tracking-widest mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={email.href}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {email.label}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.contact.phone}`} className="text-white/70 hover:text-white transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="text-white/50">{siteConfig.contact.address}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} WebiGeeks Digital. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {Object.entries(siteConfig.social).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white text-xs capitalize transition-colors"
              >
                {platform}
              </a>
            ))}
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-white/40 hover:text-white text-xs transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
