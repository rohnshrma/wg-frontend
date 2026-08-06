export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  author?: { _id: string; email: string };
  category: string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  viewCount: number;
  createdAt: string;
  updatedAt?: string;
}
