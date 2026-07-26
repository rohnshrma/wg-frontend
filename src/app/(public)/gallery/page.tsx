import type { Metadata } from "next";
import GalleryContent from "./GalleryContent";
import { getGalleryImages } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "See our campus, classrooms, events, and student activities at WebiGeeks, your AI skill partner.",
};

export default async function GalleryPage() {
  const images = await getGalleryImages();
  return <GalleryContent images={images} />;
}
