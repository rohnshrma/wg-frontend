import type { GalleryImage } from "@/types/gallery";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
const REVALIDATE_SECONDS = 60;

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const res = await fetch(`${API_BASE_URL}/gallery`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data ?? [];
}
