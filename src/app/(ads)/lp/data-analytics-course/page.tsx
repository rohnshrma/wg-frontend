import type { Metadata } from "next";
import { getTestimonials } from "@/lib/testimonials";
import DataAnalyticsContent from "./DataAnalyticsContent";

// Ad-traffic landing page for webigeeks.in — indexed (index/follow) so it
// can also surface in organic search, not just paid clicks.
export const metadata: Metadata = {
  title: "Data Analytics Course in Gurgaon | Free Demo — WebiGeeks",
  description:
    "Master Data Analytics in 6-7 months — Excel, SQL, Python, Power BI, Tableau & MongoDB. AI-powered, mentor-led training in Gurgaon or live online. Book a free demo.",
  robots: { index: true, follow: true },
};

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

  return <DataAnalyticsContent stories={stories} />;
}
