import { siteConfig } from "@/config/site";
import type { Course, CourseFAQ } from "@/types/course";
import type { Testimonial } from "@/types/testimonial";
import type { Blog } from "@/types/blog";

// Central place for the org-level schema.org facts so every page that needs
// to reference "who WebiGeeks is" (root layout, course pages, future location
// pages) draws from one definition instead of re-typing the address/NAP.
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  alternateName: "WebiGeeks Coding Institute",
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo.png`,
  image: `${siteConfig.url}/opengraph-image`,
  description: siteConfig.description,
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
