import type { GalleryImage } from "@/types/gallery";
import { API_BASE_URL } from "./apiBaseUrl";

const REVALIDATE_SECONDS = 60;

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const res = await fetch(`${API_BASE_URL}/gallery`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data ?? [];
}
