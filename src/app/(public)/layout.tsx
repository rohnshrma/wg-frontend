import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import StickyProjectCta from "@/components/layout/StickyProjectCta";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="bg-canvas">{children}</main>
      <Footer />
      <FloatingButtons />
      <StickyProjectCta />
    </>
  );
}
