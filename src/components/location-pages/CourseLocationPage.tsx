import Link from "next/link";
import {
  Clock,
  MapPin,
  Train,
  Users,
  CheckCircle2,
  ArrowRight,
  Phone,
  Star,
  Monitor,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { getCourseBySlug } from "@/lib/courses";
import { getTestimonialsByCourse } from "@/lib/testimonials";
import { courseSchema, faqPageSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import type { LocationPageContent } from "@/data/locationPages";

// Shared renderer for every /[course]-course-gurugram page — see
// src/data/locationPages.ts for why this is a template over real,
// course-specific content rather than 12 hand-duplicated page files.

const modeDescription: Record<string, string> = {
  hybrid: "offline at our Sector-14 campus or fully online",
  offline: "offline only, at our Sector-14 campus",
  online: "fully online",
};

// These two are genuinely identical across every course — it's the same
// physical fact each time (one campus, one metro-access answer) — so they
// live here once rather than being re-authored 12 times as if they were
// unique content.
function sharedLocalFaqs(): { question: string; answer: string }[] {
  return [
    {
      question: "Where exactly is the WebiGeeks Gurugram campus?",
      answer:
        "M-18, Ground Floor, Old DLF Colony, Sector-14, Gurugram, Haryana — inside one of Gurugram's older, well-established colonies, close to the Sector-14 market.",
    },
    {
      question: "Is the campus accessible by Gurugram Metro?",
      answer:
        "Yes — Sector-14 sits within reach of both the Sikanderpur and HUDA City Centre metro stations on the Gurugram Metro network, which also connect onward to the Delhi Metro Yellow Line.",
    },
  ];
}

export default async function CourseLocationPage({ content }: { content: LocationPageContent }) {
  const course = await getCourseBySlug(content.courseSlug);
  const ratings = course ? await getTestimonialsByCourse(course.title) : [];
  const allFaqs = [...content.localFaqs, ...sharedLocalFaqs()];
  const modeText = course ? modeDescription[course.mode] ?? course.mode : "offline or online";

  return (
    <>
      {course && <JsonLd data={courseSchema(course, ratings)} />}
      <JsonLd data={faqPageSchema(allFaqs)} />

      {/* Hero */}
      <section className="gradient-hero text-white py-14 md:py-20 relative overflow-hidden">
        <div className="absolute top-10 right-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="container-custom relative max-w-3xl">
          <Breadcrumbs items={[{ label: content.breadcrumbLabel, href: content.path }]} />
          <span className="inline-flex px-3 py-1 rounded-full glass text-xs font-medium mb-4">
            Sector-14, Gurugram Campus
          </span>
          <h1 className="heading-hero mb-4">{content.h1}</h1>
          <p className="text-white/70 text-lg mb-8 leading-relaxed">{content.heroPitch}</p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl gradient-accent text-white font-bold shadow-lg hover:shadow-glow-accent transition-shadow"
            >
              Book a Free Demo <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass text-white font-semibold hover:bg-white/15 transition-colors"
            >
              <Phone className="w-4 h-4" /> {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      {course && (
        <section className="py-8 border-b border-border bg-white">
          <div className="container-custom">
            <div className="flex flex-wrap gap-x-10 gap-y-3 text-sm text-text-secondary">
              <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> {course.duration}, {modeText}</span>
              <span className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" /> Max 15 students per batch</span>
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Sector-14, Gurugram</span>
              {course.mode !== "online" && (
                <span className="flex items-center gap-2"><Train className="w-4 h-4 text-primary" /> Near Sikanderpur / HUDA City Centre metro</span>
              )}
              {course.mode === "online" && (
                <span className="flex items-center gap-2"><Monitor className="w-4 h-4 text-primary" /> Fully online, for Gurugram professionals</span>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Why Gurugram students choose this programme */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <h2 className="heading-section text-text-primary mb-6">
            Why Gurugram Students Choose This Programme
          </h2>
          <ul className="space-y-4">
            {content.whyChooseUs.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-text-secondary leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 p-5 rounded-xl bg-primary-50 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div className="text-sm text-text-secondary">
              <b className="text-text-primary block mb-1">Campus address</b>
              {siteConfig.contact.address}
              <br />
              <a href={siteConfig.contact.mapUrl} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold inline-flex items-center gap-1 mt-2">
                Get directions <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {course && (
            <p className="text-text-secondary mt-8">
              Want the full syllabus — every module, project, and career outcome? See the complete{" "}
              <Link href={`/courses/${course.slug}`} className="text-primary font-semibold hover:underline">
                {course.title} course page
              </Link>
              .
            </p>
          )}
        </div>
      </section>

      {/* Testimonials, if any real ones exist for this course */}
      {ratings.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom max-w-3xl">
            <h2 className="heading-section text-text-primary text-center mb-10">
              What Our Students Say
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {ratings.slice(0, 4).map((t) => (
                <div key={t._id} className="p-5 rounded-xl bg-white border border-border">
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm text-text-secondary mb-3">&ldquo;{t.testimonialText}&rdquo;</p>
                  <p className="text-sm font-bold text-text-primary">
                    {t.studentName}
                    {t.companyPlaced && <span className="font-normal text-text-muted"> — placed at {t.companyPlaced}</span>}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Local FAQs */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <h2 className="heading-section text-text-primary text-center mb-10">
            Gurugram Campus — Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {allFaqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-xl border border-border p-5">
                <p className="font-semibold text-text-primary text-sm mb-2">{faq.question}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 bg-primary-50 text-center">
        <div className="container-custom">
          <h2 className="text-2xl font-extrabold text-text-primary mb-3">{content.h1} — Book a Free Demo</h2>
          <p className="text-text-secondary mb-6">Limited seats per batch.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl gradient-accent text-white font-bold shadow-lg hover:shadow-glow-accent transition-shadow"
          >
            Book Free Demo <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
