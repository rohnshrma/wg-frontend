import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import TestimonialsContent from "./TestimonialsContent";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read success stories from 500+ placed students. See how WebiGeeks transformed their careers with practical training.",
};

export default function TestimonialsPage() {
  return (
    <>
      <Navbar />
      <main><TestimonialsContent /></main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
