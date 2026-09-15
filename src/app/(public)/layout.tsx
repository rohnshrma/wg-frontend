import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import StickyCallbackCTA from "@/components/layout/StickyCallbackCTA";
import { getCourses } from "@/lib/courses";
import { getCurrentTenant } from "@/lib/tenant";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  // Same fetch as the root layout's theme override — Next.js memoizes
  // identical fetch() calls within a single request, so this doesn't cost
  // a second network round trip.
  const [courses, tenant] = await Promise.all([getCourses(), getCurrentTenant()]);

  return (
    <>
      <Navbar tenant={tenant} />
      <main>{children}</main>
      <Footer courses={courses.map((c) => ({ title: c.title, slug: c.slug }))} tenant={tenant} />
      <FloatingButtons />
      <StickyCallbackCTA />
    </>
  );
}
