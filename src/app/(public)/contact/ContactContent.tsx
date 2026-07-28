"use client";

import { useState } from "react";
import { API_BASE_URL } from "@/lib/apiBaseUrl";
import { motion } from "framer-motion";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  User,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import Hero3DBackground from "@/components/three/Hero3DBackground";

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    value: siteConfig.contact.phone,
    action: `tel:${siteConfig.contact.phone}`,
    color: "from-primary to-primary-dark",
  },
  {
    icon: Phone,
    title: "Alternate No.",
    value: siteConfig.contact.phone2,
    action: `tel:${siteConfig.contact.phone2}`,
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: siteConfig.contact.email,
    action: `mailto:${siteConfig.contact.email}`,
    color: "from-secondary to-secondary-dark",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: siteConfig.contact.address,
    action: siteConfig.contact.mapUrl || "#map",
    color: "from-accent to-accent-warm",
    external: true,
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Mon – Sat: 9:00 AM – 7:00 PM",
    action: "#",
    color: "from-success to-emerald-600",
  },
];

export default function ContactContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    courseInterested: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch(
        `${API_BASE_URL}/leads`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, source: "contact_page" }),
        }
      );
      setIsSubmitted(true);
      setFormData({ name: "", phone: "", email: "", courseInterested: "", message: "" });
    } catch {
      /* ignore */
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-10 right-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <Hero3DBackground variant="compact" />
        <div className="container-custom relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4" />
              Get In Touch
            </span>
            <h1 className="heading-hero mb-4">
              We&apos;d Love to{" "}
              <span className="bg-gradient-to-r from-accent to-accent-warm bg-clip-text text-transparent">
                Hear From You
              </span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Book a free demo, ask about courses, or just say hi!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="-mt-8 relative z-10 mb-12">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {contactInfo.map((info, i) => (
              <motion.a
                key={info.title}
                href={info.action}
                target={info.external ? "_blank" : undefined}
                rel={info.external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-5 shadow-lg border border-border card-hover block"
              >
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center mb-3 shadow-sm`}
                >
                  <info.icon className="w-5 h-5 text-white" />
                </div>
                <p className="font-bold text-text-primary text-sm mb-1">{info.title}</p>
                <p className="text-text-secondary text-sm leading-relaxed">{info.value}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg border border-border p-8"
            >
              <h2 className="text-2xl font-extrabold text-text-primary mb-2">
                Send Us a Message
              </h2>
              <p className="text-text-secondary text-sm mb-6">
                Fill out the form and we&apos;ll get back to you within 30 minutes.
              </p>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-text-primary mb-2">Message Sent! 🎉</h3>
                  <p className="text-text-secondary">Our team will contact you shortly.</p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 text-primary font-semibold text-sm hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <select
                    required
                    value={formData.courseInterested}
                    onChange={(e) => setFormData({ ...formData, courseInterested: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none"
                  >
                    <option value="">Select Course of Interest</option>
                    {siteConfig.courses.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl gradient-primary text-white font-bold shadow-md hover:shadow-glow transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-lg border border-border h-[500px] lg:h-auto relative"
              id="map"
            >
              <iframe
                src="https://maps.google.com/maps?q=WebiGeeks,+M-18,+Ground+Floor,+Old+DLF+Colony,+Sector-14,+Gurugram,+Haryana&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "500px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="WebiGeeks Location — Sector 14, Gurugram"
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <a
                  href={siteConfig.contact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-white text-text-primary font-bold shadow-xl border border-border hover:bg-gray-50 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <MapPin className="w-5 h-5 text-primary" />
                  Open in Google Maps
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick CTA */}
      <section className="py-12 bg-primary-50">
        <div className="container-custom text-center">
          <h3 className="text-2xl font-bold text-text-primary mb-3">
            Prefer a Quick Call?
          </h3>
          <p className="text-text-secondary mb-6">
            Call us directly or WhatsApp us for instant support.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="px-6 py-3 rounded-xl gradient-primary text-white font-semibold shadow-md hover:shadow-glow transition-shadow flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#25D366] text-white font-semibold shadow-md hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
