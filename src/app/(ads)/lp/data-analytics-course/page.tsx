import type { Metadata } from "next";
import { getTestimonials } from "@/lib/testimonials";
import DataAnalyticsContent from "./DataAnalyticsContent";
import { faqs } from "./faqs";

// This exact page is served from four URLs — webigeeks.in and www.webigeeks.in
// at the root (host-based routing in proxy.ts), and both again under
// /lp/data-analytics-course. Byte-identical content, so one of them has to be
// declared the original. webigeeks.in is the domain the ads point at.
const CANONICAL_URL = "https://webigeeks.in";

// Ad-traffic landing page for webigeeks.in — indexed (index/follow) so it
// can also surface in organic search, not just paid clicks.
export const metadata: Metadata = {
  // Overrides the root layout's `metadataBase` of webigeeks.com so relative
  // metadata URLs — the generated OG image in particular — resolve against
  // the same domain this page declares canonical. Otherwise the card points
  // at webigeeks.com while the page claims to live on webigeeks.in.
  metadataBase: new URL(CANONICAL_URL),
  // `absolute` because the root layout's title template appends
  // "| WebiGeeks Gurugram", and this title already carries the brand — the two
  // together rendered 77 characters with "WebiGeeks" in it twice, well past
  // where Google truncates.
  title: { absolute: "Data Analytics Course in Gurgaon — Free Demo | WebiGeeks" },
  description:
    "Master Data Analytics in 6-7 months — Excel, SQL, Python, Power BI & Tableau. Mentor-led training in Gurgaon or live online. Book a free demo.",
  robots: { index: true, follow: true },
  // Without this the page inherited the root layout's hardcoded
  // `canonical: "https://webigeeks.com"` and told Google it was a duplicate of
  // the homepage — which quietly cancels the index/follow above.
  alternates: { canonical: CANONICAL_URL },
  // Same inheritance problem: Next does not derive og:* from `title`, so this
  // page was sharing as "WebiGeeks — Coding Institute in Gurugram" with the
  // generic site image. Most of this traffic gets shared on WhatsApp.
  openGraph: {
    type: "website",
    url: CANONICAL_URL,
    siteName: "WebiGeeks",
    title: "Data Analytics Course in Gurgaon — Free Demo",
    description:
      "6-7 months of mentor-led Data Analytics training — Excel, SQL, Python, Power BI & Tableau. Gurgaon campus or live online.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Analytics Course in Gurgaon — Free Demo",
    description:
      "6-7 months of mentor-led Data Analytics training — Excel, SQL, Python, Power BI & Tableau. Gurgaon campus or live online.",
  },
};

/**
 * FAQPage + Course structured data.
 *
 * Built from the same `faqs` array the accordion renders, so the two can't
 * drift. Deliberately NO aggregateRating on the Course: of the 32 reviews in
 * the database only one is specific to Data Analytics, so a rating here would
 * be borrowing the institute's general reviews to rate one course — exactly
 * the self-serving markup Google's guidance rules out.
 */
function structuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${CANONICAL_URL}#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "Course",
        "@id": `${CANONICAL_URL}#course`,
        name: "Data Analytics Course",
        description:
          "A 6-7 month, hands-on Data Analytics program covering Excel, SQL, Python, Pandas, Power BI, Tableau and MongoDB, taught live by a mentor in Gurgaon or online.",
        url: CANONICAL_URL,
        inLanguage: "en-IN",
        provider: {
          "@type": "EducationalOrganization",
          name: "WebiGeeks",
          url: "https://webigeeks.com",
        },
        offers: {
          "@type": "Offer",
          // The promotional price the page itself advertises. If the banner
          // price changes, change it here too — mismatched offer data is a
          // structured-data violation, not a cosmetic one.
          price: "19999",
          priceCurrency: "INR",
          category: "Paid",
          availability: "https://schema.org/InStock",
          url: CANONICAL_URL,
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: ["Onsite", "Online"],
          // 1 hour of live class per day plus practice, over 6-7 months.
          courseWorkload: "PT1H",
          location: {
            "@type": "Place",
            name: "WebiGeeks, Sector-14 Gurugram",
            address: {
              "@type": "PostalAddress",
              streetAddress: "M-18, Ground Floor, Old DLF Colony, Sector-14",
              addressLocality: "Gurugram",
              addressRegion: "Haryana",
              addressCountry: "IN",
            },
          },
        },
      },
    ],
  };
}

export default async function DataAnalyticsAdsPage() {
  // Real, DB-backed testimonials only — company-placed ones (manual entries
  // with companyPlaced/designation set) surface first since they're the
  // strongest social proof, then Google reviews fill the rest.
  const allTestimonials = await getTestimonials();
  const seenNames = new Set<string>();
  const stories = [...allTestimonials]
    .sort((a, b) => (a.companyPlaced ? 0 : 1) - (b.companyPlaced ? 0 : 1))
    .filter((t) => {
      // Same student can appear twice (a manual entry with company info
      // *and* their own Google review) — the sort above puts the
      // richer, company-attributed record first, so keep that one.
      const key = t.studentName.trim().toLowerCase();
      if (seenNames.has(key)) return false;
      seenNames.add(key);
      return true;
    })
    .slice(0, 6)
    .map((t) => ({
      name: t.studentName,
      outcome: t.companyPlaced ? `${t.designation ? `${t.designation} @ ` : ""}${t.companyPlaced}` : t.courseName,
      quote: t.testimonialText,
    }));

  return (
    <>
      <script
        type="application/ld+json"
        // Server-rendered so it is in the initial HTML, where crawlers and
        // LLM fetchers read it — they do not wait for hydration.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
      />
      <DataAnalyticsContent stories={stories} />
    </>
  );
}
