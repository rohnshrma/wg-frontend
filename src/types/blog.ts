export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  contentType: "html" | "plain"; // html for rich content, plain for plain text
  coverImageUrl: string;
  author?: { _id: string; email: string };
  category: string;
  tags: string[];
  relatedPosts?: string[]; // array of blog post IDs for backlinks
  isPublished: boolean;
  publishedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  viewCount: number;
  createdAt: string;
  updatedAt?: string;
}
