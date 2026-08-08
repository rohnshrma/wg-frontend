import { ChevronDown, HelpCircle } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/schema";

// Plain server component using native <details>/<summary> for the accordion
// — same visual language as the client-side FAQ on course detail pages
// (CourseDetailContent.tsx), but with zero added client JS since a simple
// expand/collapse here doesn't need React state.
const homeFaqs = [
  {
    question: "Does WebiGeeks offer offline classes, or only online?",
    answer:
      "Both. Every course runs offline from our Sector-14, Gurugram campus for local students, and fully online with recorded backups for everyone else — same instructors, same curriculum, either way.",
  },
  {
    question: "Where is WebiGeeks located?",
    answer:
      "Our campus is in Sector-14, Gurugram, close to the Sikanderpur and HUDA City Centre metro stations — easy to reach whether you're commuting from within Gurugram or elsewhere in the NCR.",
  },
  {
    question: "Do you provide placement assistance after the course?",
    answer:
      "Yes, on every course: resume building, mock interviews, LinkedIn optimisation, and direct referrals through our hiring network, not just a certificate at the end.",
  },
  {
    question: "How big are the batches?",
    answer:
      "We cap batches at 15 students so questions get answered directly in class instead of queued in a chat window — it's a deliberate trade-off over running larger, cheaper batches.",
  },
  {
    question: "What courses does WebiGeeks teach?",
    answer:
      "MERN Stack / Full Stack Development, Python, Data Analytics, Data Science, Artificial Intelligence, Power BI, SQL, Java, C/C++, MS Excel, React, and TypeScript — all with an AI-integrated curriculum rather than AI bolted on as an extra module.",
  },
  {
    question: "How do I book a free demo or counseling session?",
    answer:
      "Use the \"Book Free Demo\" button on this page or visit our Contact page — our team calls back within 30 minutes to walk through course options and answer questions before you commit.",
  },
];

export default function HomeFAQ() {
  return (
    <section className="section-padding bg-white">
      <JsonLd data={faqPageSchema(homeFaqs)} />
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary text-sm font-semibold mb-4">
            <HelpCircle className="w-4 h-4" />
            FAQs
          </span>
          <h2 className="heading-section text-text-primary mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Common questions from prospective students about our Sector-14, Gurugram campus and courses.
          </p>
        </div>
        <div className="space-y-3">
          {homeFaqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-white rounded-xl border border-border overflow-hidden [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer list-none hover:bg-gray-50 transition-colors">
                <span className="font-semibold text-text-primary text-sm">{faq.question}</span>
                <ChevronDown className="w-5 h-5 text-text-muted shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-4">
                <p className="text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
