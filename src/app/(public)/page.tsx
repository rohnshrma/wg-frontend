import HeroSection from "@/components/home/HeroSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import ProcessSection from "@/components/home/ProcessSection";
import WorkPreview from "@/components/home/WorkPreview";
import TrustSection from "@/components/home/TrustSection";

export const metadata = {
  title: "WebiGeeks Digital | Premium Digital Solutions",
  description:
    "Premium digital solutions for international businesses. Web development, product engineering, AI automation, and design.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <ProcessSection />
      <WorkPreview />
      <TrustSection />
    </>
  );
}
