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
import { getCourses } from "@/lib/courses";
import { getTestimonials } from "@/lib/testimonials";

export default async function HomePage() {
  const [featuredCourses, testimonials] = await Promise.all([
    getCourses({ featured: true }),
    getTestimonials(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <WhyChooseUs />
        <StatsCounter />
        <FeaturedCourses courses={featuredCourses} />
        <TestimonialsCarousel testimonials={testimonials} />
        <PlacementSection />
      </main>
      <Footer />
      <FloatingButtons />
      <InquiryPopup />
      <ExitIntentPopup />
    </>
  );
}
