import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import CourseDetailContent from "./CourseDetailContent";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title: `${title} Course`,
    description: `Learn ${title} with 100% practical, AI-integrated training at WebiGeeks. Industry projects, placement assistance, and flexible timings.`,
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      <Navbar />
      <main>
        <CourseDetailContent slug={slug} />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
