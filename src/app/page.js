import Navbar from "../app/Components/layouts/Navbar";
import Footer from "../app/Components/layouts/Footer";

import HeroSection from "@/app/Components/landing/HeroSection";
import FeaturesSection from "@/app/Components/landing/FeaturesSection";
import ServicesSection from "@/app/Components/landing/ServicesSection";
import HowItWorksSection from "@/app/Components/landing/HowItWorksSection";
import TestimonialsSection from "@/app/Components/landing/TestimonialsSection";
import StatsSection from "@/app/Components/landing/StatsSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <StatsSection />
      <Footer />
    </>
  );
}
