import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const BRAND_SUFFIX = "WebiGeeks Digital";

/**
 * Builds page metadata with Open Graph, Twitter Card and a self-referencing
 * canonical all derived from the same title/description. Needed because
 * Next's metadata merging replaces `openGraph`/`twitter` wholesale rather than
 * per-field — any page that omitted them inherited the root layout's values
 * verbatim, which (confirmed live) meant every page on the site shared the
 * homepage's exact og:title/og:description/og:url regardless of what page
 * was actually being shared.
 *
 * `title` should be the short, pre-template form (root layout's
 * `title.template` appends " | WebiGeeks Digital" for the <title> tag) —
 * this mirrors that same suffix for openGraph/twitter, which don't get the
 * template treatment automatically.
 *
 * `noindex` is for pages that are live and linkable but shouldn't be
 * indexed yet (e.g. a section still carrying placeholder/mismatched
 * content) — `follow: true` is kept so link equity still flows through any
 * internal links on the page even while the page itself stays out of the
 * index.
 */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const fullTitle = `${title} | ${BRAND_SUFFIX}`;
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    // Next replaces `openGraph`/`twitter` wholesale rather than merging
    // per-field against the root layout's values (confirmed: og:image,
    // og:site_name, og:locale and og:type all silently disappeared from
    // every page that set its own openGraph, even though the root's
    // opengraph-image.png convention file was still there) — so every
    // field that matters has to be repeated here, not just title/description/url.
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: BRAND_SUFFIX,
      locale: "en_US",
      type: "website",
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/opengraph-image.png"],
    },
    ...(noindex && {
      robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
    }),
  };
}
