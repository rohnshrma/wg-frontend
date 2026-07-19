import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read articles on Data Science, AI, Web Development, career tips, and tech trends from the WebiGeeks team.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main><BlogContent /></main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
