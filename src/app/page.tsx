import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import HeroSection from "@/components/home/HeroSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import StatsCounter from "@/components/home/StatsCounter";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import PlacementSection from "@/components/home/PlacementSection";
import InquiryPopup from "@/components/popups/InquiryPopup";
import ExitIntentPopup from "@/components/popups/ExitIntentPopup";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <WhyChooseUs />
        <StatsCounter />
        <FeaturedCourses />
        <TestimonialsCarousel />
        <PlacementSection />
      </main>
      <Footer />
      <FloatingButtons />
      <InquiryPopup />
      <ExitIntentPopup />
    </>
  );
}
