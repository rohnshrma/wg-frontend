import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import CoursesContent from "./CoursesContent";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Explore AI-integrated courses in Data Science, Data Analytics, MERN Stack, Python, Power BI, SQL, Java, and more. 100% practical training with placement assistance.",
};

export default function CoursesPage() {
  return (
    <>
      <Navbar />
      <main>
        <CoursesContent />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
