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
  IndianRupee,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { getCourseBySlug } from "@/lib/courses";
import { getTestimonialsByCourse } from "@/lib/testimonials";
import { courseSchema, faqPageSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

// Second location landing page, same pattern as /mern-course-gurugram — see
// GROWTH_BACKLOG.md decision log D1 for why this is a genuinely
// differentiated page (campus/local content, distinct FAQs tailored to this
// course's actual audience) rather than the MERN page with words swapped.
// Fee/duration/curriculum stay on the canonical course page; this page's
// unique value is local relevance for absolute-beginner and career-switch
// searchers specifically, which is a different audience than MERN's.
const localFaqs = [
  {
    question: "I've never coded before — can I really start with Python in Gurugram?",
    answer:
      "Yes — this is the course we built for exactly that. It starts from installing Python and using the command line, not from an assumption you already know how to code. Most of our Gurugram Python batch has been complete beginners.",
  },
  {
    question: "How long is the Python course, and is it offline in Gurugram?",
    answer:
      "2-3 months, the shortest full course we run. You can attend offline at our Sector-14 campus, join fully online, or mix both — the curriculum and instructors are the same either way.",
  },
  {
    question: "Where exactly is the WebiGeeks Gurugram campus?",
    answer:
      "M-18, Ground Floor, Old DLF Colony, Sector-14, Gurugram, Haryana — within reach of the Sikanderpur and HUDA City Centre metro stations on the Gurugram Metro network.",
  },
  {
    question: "Should I learn Python or jump straight into MERN Stack?",
    answer:
      "If you're an absolute beginner or want the fastest, cheapest path to your first working code, start with Python. If you already know you want to build web applications specifically and don't mind a longer, deeper programme, MERN Stack is the more direct route. Several Gurugram students do Python first, then move into MERN or Data Analytics once they're comfortable.",
  },
];

export const metadata: Metadata = {
  title: "Python Course in Gurugram | Beginner to Advanced Training",
  description:
    "Python course at our Sector-14, Gurugram campus — offline or online, 2-3 months, OOP to Flask/Django, 3 milestone projects. Near Sikanderpur & HUDA City Centre metro.",
  alternates: { canonical: `${siteConfig.url}/python-course-gurugram` },
};

export default async function PythonCourseGurugramPage() {
  const course = await getCourseBySlug("python-programming");
  const ratings = course ? await getTestimonialsByCourse(course.title) : [];

  return (
    <>
      {course && <JsonLd data={courseSchema(course, ratings)} />}
      <JsonLd data={faqPageSchema(localFaqs.map((f) => ({ question: f.question, answer: f.answer })))} />

      {/* Hero */}
      <section className="gradient-hero text-white py-14 md:py-20 relative overflow-hidden">
        <div className="absolute top-10 right-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="container-custom relative max-w-3xl">
          <Breadcrumbs items={[{ label: "Python Course in Gurugram", href: "/python-course-gurugram" }]} />
          <span className="inline-flex px-3 py-1 rounded-full glass text-xs font-medium mb-4">
            Sector-14, Gurugram Campus
          </span>
          <h1 className="heading-hero mb-4">Python Course in Gurugram</h1>
          <p className="text-white/70 text-lg mb-8 leading-relaxed">
            A 2-3 month Python programme built for absolute beginners and career switchers — from
            your first line of code to OOP, decorators, and web apps with Flask/Django. Offline at
            our Sector-14 campus or fully online.
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
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> 2-3 months, offline or online</span>
            <span className="flex items-center gap-2"><IndianRupee className="w-4 h-4 text-primary" /> Our lowest-fee full course</span>
            <span className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" /> Max 15 students per batch</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Sector-14, Gurugram</span>
            <span className="flex items-center gap-2"><Train className="w-4 h-4 text-primary" /> Near Sikanderpur / HUDA City Centre metro</span>
          </div>
        </div>
      </section>

      {/* Why Gurugram students choose this programme */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <h2 className="heading-section text-text-primary mb-6">
            Why Gurugram Beginners Start Here
          </h2>
          <ul className="space-y-4">
            {[
              `The shortest, lowest-cost course in our catalogue — built as the entry point for people who've never written code, not a shortened version of a harder course.`,
              `Three milestone projects along the way (a logic app, an OOP application, and a final capstone), so you have real, working code to show before the course even ends — not just at graduation.`,
              `Batches capped at 15 students, offline at our Sector-14 campus for Gurugram-based students, or fully online with recorded backups.`,
              `A natural next step into MERN Stack, Data Analytics, or Data Science once you're comfortable — many of our Python graduates continue with us rather than starting over elsewhere.`,
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
            Want the full syllabus — every chapter, milestone project, and career outcome? See the
            complete{" "}
            <Link href="/courses/python-programming" className="text-primary font-semibold hover:underline">
              Python Programming course page
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
              What Our Python Students Say
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
            Start Learning Python in Gurugram
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
