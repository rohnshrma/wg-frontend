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
  image: `${siteConfig.url}/opengraph-image`,
  description: siteConfig.description,
  telephone: siteConfig.contact.phone.replace(/\s+/g, ""),
  email: siteConfig.contact.email,
  // Remote-first agency serving international clients — no single storefront
  // address, so areaServed is left broad rather than pinned to one city.
  areaServed: { "@type": "Place", name: "Worldwide" },
  sameAs: Object.values(siteConfig.social),
} as const;

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
