import type { Metadata } from "next";
import GalleryContent from "./GalleryContent";

export const metadata: Metadata = {
  title: "Gallery",
  description: "See our campus, classrooms, events, and student activities at WebiGeeks Training & Development.",
};

export default function GalleryPage() {
  return <GalleryContent />;
}
