import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";

type Crumb = { label: string; href: string };

// Visual breadcrumb nav + matching BreadcrumbList schema — the schema is
// what makes these eligible for Google's breadcrumb rich result, the visible
// nav is what actually helps a student find their way back to /courses.
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const withHome: Crumb[] = [{ label: "Home", href: "/" }, ...items];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: withHome.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.label,
            item: `${siteConfig.url}${crumb.href}`,
          })),
        }}
      />
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-white/70 mb-4">
        {withHome.map((crumb, index) => (
          <span key={crumb.href} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {index === withHome.length - 1 ? (
              <span aria-current="page" className="text-white">
                {crumb.label}
              </span>
            ) : (
              <Link href={crumb.href} className="hover:text-white transition-colors">
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
