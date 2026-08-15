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
 * `title.template` appends " | WebiGeeks Gurugram" for the <title> tag) —
 * this mirrors that same suffix for openGraph/twitter, which don't get the
 * template treatment automatically.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${BRAND_SUFFIX}`;
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: fullTitle, description, url },
    twitter: { title: fullTitle, description },
  };
}
