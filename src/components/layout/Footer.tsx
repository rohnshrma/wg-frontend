"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Heart,
} from "lucide-react";
import { siteConfig } from "@/config/site";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "All Courses", href: "/courses" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const courses = [
  { label: "Data Science", href: "/courses/data-science" },
  { label: "Data Analytics", href: "/courses/data-analytics" },
  { label: "Artificial Intelligence", href: "/courses/artificial-intelligence" },
  { label: "MERN Stack", href: "/courses/mern-stack-development" },
  { label: "Python Programming", href: "/courses/python-programming" },
  { label: "Power BI", href: "/courses/power-bi" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-white/80 relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] translate-y-1/2" />

      {/* CTA Banner */}
      <div className="relative border-b border-white/10">
        <div className="container-custom py-10 md:py-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Ready to Start Your Journey?
              </h3>
              <p className="text-white/60 text-lg">
                Book a free career counseling session with our experts.
              </p>
            </div>
            <Link
              href="/contact"
              className="group px-8 py-4 rounded-xl gradient-accent text-white font-bold text-base shadow-lg hover:shadow-glow-accent transition-all duration-300 flex items-center gap-2"
            >
              Book Free Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-12 md:py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-10 h-10 rounded-xl bg-white/95 flex items-center justify-center shadow-lg group-hover:shadow-glow transition-shadow p-1.5">
                <Image src="/images/logo-mark.png" alt="WebiGeeks" width={58} height={36} className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white">
                  Webi<span className="text-primary-200">Geeks</span>
                </span>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">
                  Your AI Skill Partner
                </p>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Empowering careers with AI-integrated, 100% practical training.
              Join 500+ placed students and become industry-ready.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {Object.entries(siteConfig.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-colors border border-white/10 hover:border-primary/30"
                  aria-label={platform}
                >
                  <span className="text-xs font-bold uppercase text-white/60 hover:text-white">
                    {platform[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-primary" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Courses */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-secondary" />
              Popular Courses
            </h4>
            <ul className="space-y-3">
              {courses.map((course) => (
                <li key={course.href}>
                  <Link
                    href={course.href}
                    className="text-sm text-white/50 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3" />
                    {course.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-accent" />
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-primary-200 shrink-0" />
                <span className="text-sm text-white/50 leading-relaxed">
                  {siteConfig.contact.address}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary-200 shrink-0" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone2}`}
                  className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary-200 shrink-0" />
                  {siteConfig.contact.phone2}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-primary-200 shrink-0" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/50">
                <Clock className="w-4 h-4 text-primary-200 shrink-0" />
                Mon – Sat: 9:00 AM – 7:00 PM
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} WebiGeeks. All rights reserved.
          </p>
          <p className="text-sm text-white/40 flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-destructive fill-destructive" /> by WebiGeeks
          </p>
        </div>
      </div>
    </footer>
  );
}
