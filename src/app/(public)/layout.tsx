import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import { getCourses } from "@/lib/courses";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const courses = await getCourses();

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer courses={courses.map((c) => ({ title: c.title, slug: c.slug }))} />
      <FloatingButtons />
    </>
  );
}
