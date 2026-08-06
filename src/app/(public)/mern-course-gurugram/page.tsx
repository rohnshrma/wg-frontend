import type { Metadata } from "next";
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
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { getCourseBySlug } from "@/lib/courses";
import { getTestimonialsByCourse } from "@/lib/testimonials";
import { courseSchema, faqPageSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

// Local-intent landing page for "MERN course Gurugram" — deliberately NOT a
// re-paste of the full curriculum on /courses/mern-stack-development (that
// would be duplicate content). This page's job is campus/local relevance;
// the course page's job is curriculum depth. They link to each other and
// this one self-canonicalizes because its content — campus context, metro
// access, local FAQs — is genuinely unique, not a template swap.
const localFaqs = [
  {
    question: "Where exactly is the WebiGeeks Gurugram campus?",
    answer:
      "M-18, Ground Floor, Old DLF Colony, Sector-14, Gurugram, Haryana. It's inside one of Gurugram's older, well-established colonies, close to the Sector-14 market.",
  },
  {
    question: "Is the campus accessible by Gurugram Metro?",
    answer:
      "Yes — Sector-14 sits within reach of both the Sikanderpur and HUDA City Centre metro stations on the Gurugram Metro network, which also connect onward to the Delhi Metro Yellow Line.",
  },
  {
    question: "Do you run offline MERN Stack batches in Gurugram, or only online?",
    answer:
      "Both. You can attend the full 7-month MERN Stack programme in person at the Sector-14 campus, or join the same curriculum and instructors fully online with recorded backups — many of our Gurugram students mix both depending on their week.",
  },
  {
    question: "How is the Gurugram batch different from an online-only course?",
    answer:
      "Same curriculum and mentors either way. Offline students at the Gurugram campus get direct in-person doubt-clearing and access to the physical lab; it comes down to whether you'd rather commute to Sector-14 or learn remotely.",
  },
];

export const metadata: Metadata = {
  // No trailing "— WebiGeeks" here — the root layout's title template
  // (`%s | WebiGeeks Gurugram`) already appends the brand suffix. Including
  // it here too produced a duplicated "WebiGeeks Gurugram" tail in the
  // rendered <title>, caught via live curl verification before this shipped.
  title: "MERN Course in Gurugram | Full Stack Developer Training",
  description:
    "MERN Stack course at our Sector-14, Gurugram campus — offline or online, 7 months, 10+ live projects, 100% placement assistance. Near Sikanderpur & HUDA City Centre metro.",
  alternates: { canonical: `${siteConfig.url}/mern-course-gurugram` },
};

export default async function MernCourseGurugramPage() {
  const course = await getCourseBySlug("mern-stack-development");
  const ratings = course ? await getTestimonialsByCourse(course.title) : [];

  return (
    <>
      {course && <JsonLd data={courseSchema(course, ratings)} />}
      <JsonLd data={faqPageSchema(localFaqs.map((f) => ({ question: f.question, answer: f.answer })))} />

      {/* Hero */}
      <section className="gradient-hero text-white py-14 md:py-20 relative overflow-hidden">
        <div className="absolute top-10 right-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="container-custom relative max-w-3xl">
          <Breadcrumbs items={[{ label: "MERN Course in Gurugram", href: "/mern-course-gurugram" }]} />
          <span className="inline-flex px-3 py-1 rounded-full glass text-xs font-medium mb-4">
            Sector-14, Gurugram Campus
          </span>
          <h1 className="heading-hero mb-4">MERN Stack Course in Gurugram</h1>
          <p className="text-white/70 text-lg mb-8 leading-relaxed">
            A 7-month, project-based MERN Stack programme run from our Sector-14 campus —
            offline for Gurugram-based students, fully online for everyone else, same
            instructors and curriculum either way.
          </p>
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
      <section className="py-8 border-b border-border bg-white">
        <div className="container-custom">
          <div className="flex flex-wrap gap-x-10 gap-y-3 text-sm text-text-secondary">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> 7 months, offline or online</span>
            <span className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" /> Max 15 students per batch</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Sector-14, Gurugram</span>
            <span className="flex items-center gap-2"><Train className="w-4 h-4 text-primary" /> Near Sikanderpur / HUDA City Centre metro</span>
          </div>
        </div>
      </section>

      {/* Why Gurugram students choose WebiGeeks */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <h2 className="heading-section text-text-primary mb-6">
            Why Gurugram Students Choose This Programme
          </h2>
          <ul className="space-y-4">
            {[
              `A physical campus in Sector-14 — not just a login link — for students who want in-person mentorship without giving up the option to join online on a busy week.`,
              `Batches capped at 15 students, so questions get answered directly instead of queued in a chat window.`,
              `The same 16-module, project-heavy curriculum covered on our full MERN Stack course page — HTML through deployment — taught by the same instructors online or in person.`,
              `100% placement assistance: resume building, mock interviews, LinkedIn optimisation, and direct referrals, run from the Gurugram campus for both online and offline students.`,
            ].map((point) => (
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

          <p className="text-text-secondary mt-8">
            Want the full syllabus — every module, project, and career outcome? See the
            complete{" "}
            <Link href="/courses/mern-stack-development" className="text-primary font-semibold hover:underline">
              MERN Stack Development course page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Testimonials, if any real ones exist for this course */}
      {ratings.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom max-w-3xl">
            <h2 className="heading-section text-text-primary text-center mb-10">
              What Our MERN Students Say
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
            {localFaqs.map((faq) => (
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
          <h2 className="text-2xl font-extrabold text-text-primary mb-3">
            Start Your MERN Stack Journey in Gurugram
          </h2>
          <p className="text-text-secondary mb-6">Limited seats per batch. Book a free demo class today.</p>
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
