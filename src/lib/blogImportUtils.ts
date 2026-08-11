// Utility to help convert and format blog HTML content for the rich editor

export interface ExtractedBlogMeta {
  title: string;
  excerpt: string;
  slug: string;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  relatedKeywords?: string[];
}

// Pulls title/description/slug/keywords out of the HTML-comment metadata
// block some blog exports use (SEO TITLE / META DESCRIPTION / URL SLUG /
// FOCUS KEYWORD / SECONDARY KEYWORDS), since that data never makes it into
// real <meta> tags for those files.
export function extractBlogMetadata(htmlContent: string): ExtractedBlogMeta | null {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    const metaMatch = htmlContent.match(/SEO TITLE[\s\S]*?\n\s+(.*?)\n/);
    const descMatch = htmlContent.match(/META DESCRIPTION[\s\S]*?\n\s+([\s\S]*?)\n\n/);
    const slugMatch = htmlContent.match(/URL SLUG:\s*([^\n]+)/);
    const focusMatch = htmlContent.match(/FOCUS KEYWORD:\s*([^\n]+)/);
    const secondaryMatch = htmlContent.match(/SECONDARY KEYWORDS:\s*([\s\S]*?)(?=\n\s*NOTE:|$)/);

    // Comment text spans multiple lines with leading indentation (e.g. the
    // META DESCRIPTION block), so collapse that back into normal prose.
    const normalize = (value: string) => value.replace(/\s+/g, " ").trim();

    const title = doc.querySelector("h1")?.textContent?.trim() || (metaMatch?.[1] && normalize(metaMatch[1])) || "Untitled";
    const excerpt = (descMatch?.[1] && normalize(descMatch[1])) || title.substring(0, 300);
    const slug = slugMatch?.[1]?.trim().split("/").filter(Boolean).pop() || "";
    const metaTitle = (metaMatch?.[1] && normalize(metaMatch[1])) || title;
    const metaDescription = (descMatch?.[1] && normalize(descMatch[1])) || excerpt;
    const focusKeyword = focusMatch?.[1]?.trim() || "";

    const secondaryKeywords =
      secondaryMatch?.[1]
        ?.split(",")
        .map((k) => k.trim())
        .filter(Boolean) || [];

    const tags = [...new Set([focusKeyword, ...secondaryKeywords])].filter(Boolean).slice(0, 8);

    return {
      title,
      excerpt,
      slug,
      tags,
      metaTitle,
      metaDescription,
      focusKeyword,
      relatedKeywords: secondaryKeywords,
    };
  } catch (err) {
    console.error("Error extracting metadata:", err);
    return null;
  }
}

// Cleans an exported blog's <article> HTML into something safe to drop
// straight into the rich text editor: strips comments/scripts/styles,
// removes elements that duplicate what the blog page already renders on its
// own (byline, CTA block, related-reading footer), and unwraps the custom
// "webigeeks-*" classes since the editor applies its own styling.
export function formatBlogContentForEditor(htmlContent: string): string {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const root = doc.querySelector("article") || doc.body;

    root.querySelectorAll("script, style").forEach((el) => el.remove());
    root.querySelectorAll("p.post-meta, p.post-tags, .webigeeks-cta").forEach((el) => el.remove());
    root.querySelectorAll("[class*='webigeeks-']").forEach((el) => el.removeAttribute("class"));

    return root.innerHTML
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/&middot;/g, "•")
      .replace(/&mdash;/g, "—")
      .replace(/&ndash;/g, "–")
      .trim();
  } catch (err) {
    console.error("Error formatting content:", err);
    return htmlContent;
  }
}
