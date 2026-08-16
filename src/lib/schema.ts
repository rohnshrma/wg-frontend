import { siteConfig } from "@/config/site";
import type { Blog } from "@/types/blog";

// Central place for the org-level schema.org facts so every page that needs
// to reference "who WebiGeeks Digital is" (root layout, future service pages)
// draws from one definition instead of re-typing the same facts.
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo.png`,
  // Was missing the .png extension — Next's static opengraph-image.png file
  // convention serves it at that exact path, not the extension-less one
  // next/og's dynamic ImageResponse convention would use, so the old value
  // 404'd and this field silently dropped out of every rich-result test.
  image: `${siteConfig.url}/opengraph-image.png`,
  description: siteConfig.description,
  telephone: siteConfig.contact.phone.replace(/\s+/g, ""),
  email: siteConfig.contact.email,
  // Remote-first agency serving international clients — no single storefront
  // address, so areaServed is left broad rather than pinned to one city.
  areaServed: { "@type": "Place", name: "Worldwide" },
  sameAs: Object.values(siteConfig.social),
} as const;

// One WebSite entity per the whole site (distinct from the Organization
// that runs it) — this is what lets Google associate every page's
// `isPartOf` back to a single site-level record instead of treating each
// URL as an unrelated one-off.
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  publisher: { "@id": `${siteConfig.url}/#organization` },
} as const;

// Simple Home > Page breadcrumb trail. Only ever 2 levels deep on this site
// (no nested categories), so this takes a single label/path rather than a
// generic array — callers that need more levels can extend the shape later.
export function breadcrumbSchema(label: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: label, item: `${siteConfig.url}${path}` },
    ],
  };
}

// One Service entity per offering, plus the OfferCatalog wrapper Google
// expects a ProfessionalService's service list to be described as.
export function servicesSchema(
  services: { slug: string; name: string; description: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        "@id": `${siteConfig.url}/services#${service.slug}`,
        name: service.name,
        description: service.description,
        url: `${siteConfig.url}/services`,
        provider: { "@id": `${siteConfig.url}/#organization` },
      },
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
