import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How WebiGeeks collects, uses, and protects the information you share with us through our website and enquiry forms.",
  path: "/privacy-policy",
});

const sections = [
  {
    title: "Information We Collect",
    body: "When you fill out a demo-booking or enquiry form on our website, we collect your name, phone number, email address, and current role (student, working professional, or career changer). We do not collect any payment or financial information through these forms.",
  },
  {
    title: "How We Use Your Information",
    body: "We use the information you submit solely to contact you about our courses — for example, to call or WhatsApp you about a free demo, share curriculum details, or follow up on an enquiry. We do not use this information for any unrelated purpose.",
  },
  {
    title: "Sharing of Information",
    body: "We do not sell, rent, or share your personal information with third parties. Your details are used internally by our admissions and counseling team only.",
  },
  {
    title: "Data Retention",
    body: "We retain enquiry information for as long as reasonably needed to respond to your enquiry and, if you enroll, to administer your course. You may request deletion of your data at any time using the contact details below.",
  },
  {
    title: "Cookies & Analytics",
    body: "Our website may use basic analytics tools to understand site traffic and improve our pages. These tools do not collect personally identifiable information beyond standard, anonymized usage data.",
  },
  {
    title: "Your Rights",
    body: "You can request access to, correction of, or deletion of the personal data we hold about you at any time. To make such a request, write to us at the email address below and we will respond within a reasonable time.",
  },
  {
    title: "Contact Us",
    body: `For any questions about this policy or to make a data request, contact us at ${siteConfig.contact.email}.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="section-padding">
      <div className="container-custom max-w-3xl">
        <h1 className="heading-section text-text-primary mb-2">Privacy Policy</h1>
        <p className="text-sm text-text-muted mb-10">Last updated: 22 August 2026</p>

        <p className="text-text-secondary leading-relaxed mb-10">
          WebiGeeks (&quot;we&quot;, &quot;us&quot;) operates {siteConfig.url} and webigeeks.in. This policy explains what
          information we collect when you use our website or submit an enquiry form, and how we use it.
        </p>

        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-lg font-bold text-text-primary mb-2">{s.title}</h2>
              <p className="text-text-secondary leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
