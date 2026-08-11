// Utility to help convert and format blog HTML content for the rich editor

export interface ExtractedBlogMeta {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  relatedKeywords?: string[];
}

export function extractBlogMetadata(htmlContent: string): ExtractedBlogMeta | null {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    // Extract SEO metadata from HTML comments
    const htmlText = htmlContent;
    const metaMatch = htmlText.match(/SEO TITLE[\s\S]*?\n\s+(.*?)\n/);
    const descMatch = htmlText.match(/META DESCRIPTION[\s\S]*?\n\s+([\s\S]*?)\n\n/);
    const slugMatch = htmlText.match(/URL SLUG:\s*([^\n]+)/);
    const focusMatch = htmlText.match(/FOCUS KEYWORD:\s*([^\n]+)/);
    const secondaryMatch = htmlText.match(/SECONDARY KEYWORDS:\s*([\s\S]*?)(?=\n\s*NOTE:|$)/);

    const title = doc.querySelector("h1")?.textContent || metaMatch?.[1] || "Untitled";
    const excerpt = descMatch?.[1]?.trim() || title.substring(0, 300);
    const slug = slugMatch?.[1]?.trim().replace(/^\/|\/$/g, "") || "";
    const metaTitle = metaMatch?.[1] || title;
    const metaDescription = descMatch?.[1]?.trim() || excerpt;
    const focusKeyword = focusMatch?.[1]?.trim() || "";

    const secondaryKeywords = secondaryMatch?.[1]
      ?.split(",")
      .map((k) => k.trim())
      .filter(Boolean) || [];

    // Parse tags and category from the blog (usually first <strong> tag or keywords)
    const tags = [...new Set([focusKeyword, ...secondaryKeywords])].filter(Boolean).slice(0, 8);
    const category = "Career"; // Default for this blog, adjust as needed

    return {
      title,
      excerpt,
      slug,
      category,
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

export function cleanBlogHtml(htmlContent: string): string {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    // Find the main article content
    const article = doc.querySelector("article");
    if (!article) return htmlContent;

    // Remove metadata comments, scripts, styles
    const cleaned = article.innerHTML
      .replace(/<!--[\s\S]*?-->/g, "") // Remove HTML comments
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "") // Remove scripts
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "") // Remove styles
      .replace(/class="webigeeks-[^"]*"/g, "") // Remove custom classes (we'll apply our own)
      .trim();

    return cleaned;
  } catch (err) {
    console.error("Error cleaning HTML:", err);
    return htmlContent;
  }
}

export function formatBlogContentForEditor(htmlContent: string): string {
  // Clean and format HTML for the TipTap editor
  const cleaned = cleanBlogHtml(htmlContent);

  // Ensure proper structure with TipTap-compatible HTML
  return cleaned
    .replace(/<p class="post-meta">.*?<\/p>/gi, "") // Remove meta paragraphs
    .replace(/<div class="webigeeks-[^"]*">[\s\S]*?<\/div>/gi, "") // Remove custom divs
    .replace(/&middot;/g, "•") // Convert HTML entities
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .trim();
}

// Sample parsed blog data for your first blog:
// Use this as reference for what the import should produce
export const SAMPLE_BLOG_DATA = {
  title: "Job Finding Strategies That Actually Work in 2026: The Psychology and the Smart Play",
  excerpt:
    "Psychological and smart job search strategies for freshers in 2026. Practical tactics for MERN Stack and Data Analytics students to get hired faster.",
  slug: "job-finding-strategies-2026-freshers",
  category: "Career",
  tags: [
    "job finding strategies 2026",
    "jobs for freshers India",
    "MERN stack developer jobs",
    "data analytics jobs for freshers",
    "IT training institute Gurugram",
  ],
  metaTitle: "Job Finding Strategies That Actually Work in 2026 | WebiGeeks",
  metaDescription:
    "Psychological + smart job search strategies for freshers in 2026. Real tactics for MERN Stack and Data Analytics students to get hired faster.",
  contentType: "html",
  isPublished: true,
};
