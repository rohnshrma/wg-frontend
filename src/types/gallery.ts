export type GalleryCategory = "classroom" | "events" | "activities" | "campus" | "placements";

export interface GalleryImage {
  _id: string;
  imageUrl: string;
  thumbnailUrl: string;
  caption?: string;
  category: GalleryCategory;
  displayOrder: number;
  isActive: boolean;
}
