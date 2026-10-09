import { siteConfig } from "@/config/site";
import type { Course, CourseFAQ } from "@/types/course";
import type { Testimonial } from "@/types/testimonial";
import type { Blog } from "@/types/blog";

// Central place for the org-level schema.org facts so every page that needs
// to reference "who WebiGeeks is" (root layout, course pages, future location
// pages) draws from one definition instead of re-typing the address/NAP.
export const organizationSchema = {
  "@context": "https://schema.org",
  // Multi-typed rather than a second, duplicate JSON-LD node: WebiGeeks is
  // genuinely both (a physical campus with an address/phone = LocalBusiness,
  // and a training provider = EducationalOrganization). schema.org supports
  // an array of types on one entity for exactly this case.
  "@type": ["EducationalOrganization", "LocalBusiness"],
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  alternateName: "WebiGeeks Coding Institute",
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo.png`,
  image: `${siteConfig.url}/opengraph-image`,
  description: siteConfig.description,
  // Matches the founding date already published twice on /about
  // ("Founded in 2023 in Sector-14, Gurugram") — mirrored here, not a new
  // claim being introduced via schema.
  foundingDate: "2023",
  telephone: siteConfig.contact.phone.replace(/\s+/g, ""),
  email: siteConfig.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "M-18, Ground Floor, Old DLF Colony, Sector-14",
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    postalCode: "122001",
    addressCountry: "IN",
  },
  // TODO(M1 on MASTER_TASK_BOARD.md): replace with the real lat/long from the
  // Google Business Profile listing — placeholder coordinates are worse than
  // none, so this block is left out entirely until the real values are known
  // rather than shipping a wrong location. See lib/schema.ts usage below.
  areaServed: { "@type": "City", name: "Gurugram" },
  sameAs: [
    siteConfig.social.instagram,
    siteConfig.social.facebook,
    siteConfig.social.linkedin,
    siteConfig.social.youtube,
  ],
} as const;

// A distinct entity from Organization: WebSite describes the site itself
// (its own @id, url, name), referencing Organization as its publisher
// rather than duplicating the org's fields. No SearchAction — the site has
// no working search feature, and adding one just to claim the property
// would be exactly the "schema that doesn't match visible content" pattern
// to avoid.
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  publisher: { "@id": `${siteConfig.url}/#organization` },
} as const;

// Course schema for a course detail page. Reused as-is by future location
// pages (MASTER_TASK_BOARD.md C5) once those exist.
export function courseSchema(course: Course, ratings: Testimonial[]) {
  const avgRating =
    ratings.length > 0
      ? ratings.reduce((sum, t) => sum + t.rating, 0) / ratings.length
      : null;

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.fullDescription || course.shortDescription,
    provider: {
      "@type": "EducationalOrganization",
      name: siteConfig.name,
      sameAs: siteConfig.url,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: course.mode,
      courseWorkload: course.duration,
      location: {
        "@type": "Place",
        name: `WebiGeeks, Sector-14, Gurugram`,
        address: siteConfig.contact.address,
      },
    },
    // Only emitted when there's at least one real, attributable rating behind
    // it — an aggregate with reviewCount but no linkable reviews is exactly
    // the pattern Google's structured-data guidelines flag as untrustworthy.
    ...(avgRating !== null && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avgRating.toFixed(1),
        reviewCount: ratings.length,
      },
    }),
  };
}

// Extends the existing Organization node (same @id, a separate JSON-LD
// script block) with a real aggregate rating + the individual reviews
// behind it — schema.org and Google both support merging multiple blocks
// that share an @id rather than requiring one giant node. Deliberately
// institute-wide (itemReviewed is Organization, not any one Course): these
// are general student testimonials, not reviews tied to a specific course,
// and courseSchema()'s own aggregateRating already handles the case where a
// rating genuinely is course-specific. Returns null when there's nothing
// real to report, exactly like courseSchema()'s own guard.
export function testimonialsReviewSchema(testimonials: Testimonial[]) {
  if (testimonials.length === 0) return null;

  const avgRating =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating.toFixed(1),
      reviewCount: testimonials.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.studentName },
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: t.testimonialText,
      datePublished: t.createdAt,
    })),
  };
}

export function blogPostingSchema(blog: Blog) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.coverImageUrl,
    datePublished: blog.publishedAt ?? blog.createdAt,
    dateModified: blog.updatedAt ?? blog.publishedAt ?? blog.createdAt,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/images/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/blog/${blog.slug}` },
  };
}

export function faqPageSchema(faqs: CourseFAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
