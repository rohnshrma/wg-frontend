import HeroSection from "@/components/home/HeroSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import StatsCounter from "@/components/home/StatsCounter";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import InquiryPopup from "@/components/popups/InquiryPopup";
import ExitIntentPopup from "@/components/popups/ExitIntentPopup";
import { getCourses } from "@/lib/courses";
import { getTestimonials } from "@/lib/testimonials";

// Lives inside the (public) route group specifically so it shares the same
// persisted Navbar/Footer instance as every other public page — it used to
// render its own separate <Navbar> at app/page.tsx, which meant navigating
// Home -> any other page unmounted one Navbar and mounted a different one.
// That broke the animated underline's layoutId shared-element transition
// (framer-motion can't smoothly bridge two different component instances
// the way it does between pages that share one), which is what caused the
// "weird" underline behavior specifically on the Home <-> About transition.
export default async function HomePage() {
  const [featuredCourses, testimonials] = await Promise.all([
    getCourses({ featured: true }),
    getTestimonials(),
  ]);

  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <StatsCounter />
      <FeaturedCourses courses={featuredCourses} />
      <TestimonialsCarousel testimonials={testimonials} />
      <InquiryPopup />
      <ExitIntentPopup />
    </>
  );
}
