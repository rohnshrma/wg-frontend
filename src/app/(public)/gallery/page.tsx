import type { Metadata } from "next";
import GalleryContent from "./GalleryContent";
import { getGalleryImages } from "@/lib/gallery";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description: "See our campus, classrooms, events, and student activities at WebiGeeks, your AI skill partner.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const images = await getGalleryImages();
  return <GalleryContent images={images} />;
}
