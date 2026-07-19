import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import GalleryContent from "./GalleryContent";

export const metadata: Metadata = {
  title: "Gallery",
  description: "See our campus, classrooms, events, and student activities at WebiGeeks Training & Development.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main><GalleryContent /></main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
