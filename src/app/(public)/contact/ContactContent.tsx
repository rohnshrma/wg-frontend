"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

const validProjectTypes = new Set([
  "web-development",
  "product-engineering",
  "ai-automation",
  "design",
  "other",
]);

const validSources = new Set([
  "website_hero",
  "services_page",
  "work_page",
  "contact_form",
  "social",
  "referral",
  "other",
]);

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  projectType: "",
  budget: "",
  timeline: "",
  message: "",
};

const inputClass =
  "w-full px-4 py-3 bg-canvas border border-transparent rounded-xl focus:outline-none focus:border-agency-accent transition-colors";

export default function ContactContent() {
  const searchParams = useSearchParams();
  const prefilledProjectType = searchParams.get("projectType");
  const source = searchParams.get("source");

  const [formData, setFormData] = useState({
    ...initialFormData,
    projectType:
      prefilledProjectType && validProjectTypes.has(prefilledProjectType)
        ? prefilledProjectType
        : "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Optional enum fields (budget, timeline) must be omitted rather than
      // sent as "" — Mongoose enum validation rejects an empty string since
      // it isn't one of the allowed values, unlike an omitted/undefined field.
      const payload = Object.fromEntries(
        Object.entries({
          ...formData,
          source: source && validSources.has(source) ? source : "contact_form",
        }).filter(([, value]) => value !== "")
      );

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(body?.message || "Something went wrong. Please try again.");
      }

      setIsSubmitted(true);
      setFormData(initialFormData);
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      {/* Hero */}
      <section className="bg-canvas">
        <div className="container-custom pt-16 pb-16 md:pt-20 md:pb-24">
          <p className="text-sm text-agency-muted uppercase tracking-widest mb-6">Get in touch</p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink max-w-3xl leading-[1.05]">
            Let&apos;s talk.
          </h1>
          <p className="text-lg text-agency-muted max-w-xl mt-8 leading-relaxed">
            Tell us about your project. We&apos;ll respond within 24 hours to discuss how we can help.
          </p>
        </div>
      </section>

      {/* Contact panel */}
      <section className="bg-canvas">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto pb-24">
          <div className="bg-white rounded-[32px] md:rounded-[48px] px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Contact Info */}
              <div className="lg:col-span-1">
                <h2 className="font-display text-2xl font-bold text-ink mb-8">Contact details</h2>

                <div className="space-y-8">
                  <div>
                    <div className="text-agency-muted text-xs uppercase tracking-widest mb-2">Email</div>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-ink hover:text-agency-accent transition-colors font-medium"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>

                  <div>
                    <div className="text-agency-muted text-xs uppercase tracking-widest mb-2">Phone</div>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="text-ink hover:text-agency-accent transition-colors font-medium"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>

                  <div>
                    <div className="text-agency-muted text-xs uppercase tracking-widest mb-2">WhatsApp</div>
                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink hover:text-agency-accent transition-colors font-medium"
                    >
                      {siteConfig.contact.whatsapp}
                    </a>
                  </div>

                  <div>
                    <div className="text-agency-muted text-xs uppercase tracking-widest mb-2">Location</div>
                    <p className="text-ink font-medium leading-relaxed">{siteConfig.contact.address}</p>
                  </div>

                  <div className="pt-6 border-t border-ink/10">
                    <p className="text-sm text-agency-muted">
                      <span className="text-ink font-semibold">Expected response:</span> within 24
                      hours during business hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                {isSubmitted ? (
                  <div className="bg-canvas rounded-3xl p-10 text-center">
                    <div className="text-4xl mb-4">✓</div>
                    <h3 className="font-display text-2xl font-bold text-ink mb-2">Thank you!</h3>
                    <p className="text-agency-muted">
                      We&apos;ve received your project inquiry. Our team will review it and
                      get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-ink mb-2">Your Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className={inputClass}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-ink mb-2">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={inputClass}
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-ink mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className={inputClass}
                          placeholder="+1 555 123 4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-ink mb-2">Company Name</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="Your Company"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">Website (optional)</label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="https://yourcompany.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">
                        What are you looking to build?
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      >
                        <option value="">Select a project type</option>
                        <option value="web-development">Web Development</option>
                        <option value="product-engineering">Product Engineering / SaaS</option>
                        <option value="ai-automation">AI & Automation</option>
                        <option value="design">Design & Branding</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-ink mb-2">
                          Approximate Budget
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className={inputClass}
                        >
                          <option value="">Select budget range</option>
                          <option value="$5k-10k">$5,000 - $10,000</option>
                          <option value="$10k-25k">$10,000 - $25,000</option>
                          <option value="$25k-50k">$25,000 - $50,000</option>
                          <option value="$50k+">$50,000+</option>
                          <option value="not-specified">Not sure yet</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-ink mb-2">Timeline</label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className={inputClass}
                        >
                          <option value="">Select timeline</option>
                          <option value="asap">ASAP (within 2 weeks)</option>
                          <option value="1-3m">1-3 months</option>
                          <option value="3-6m">3-6 months</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-ink mb-2">
                        Tell us more about your project
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className={`${inputClass} resize-none`}
                        placeholder="Describe your project, goals, and any specific requirements..."
                      />
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full px-8 py-4 bg-ink hover:bg-agency-accent disabled:opacity-50 text-white font-semibold rounded-full transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? "Sending..." : "Send Inquiry"}
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>

                    <p className="text-xs text-agency-muted text-center">
                      We respect your privacy. Your information will only be used to
                      discuss your project.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
