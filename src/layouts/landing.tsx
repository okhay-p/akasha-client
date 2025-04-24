import Header from "@/components/header";

import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
// import { TestimonialsSection } from "@/components/testimonials-section";
// import { PricingSection } from "@/components/pricing-section";
// import { FaqSection } from "@/components/faq-section";
// import { Footer } from "@/components/footer";

function Landing() {
  return (
    <div className="min-h-screen font-custom">
      <Header />
      <main className="">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        {/* <TestimonialsSection /> */}
        {/* <PricingSection /> */}
        {/* <FaqSection /> */}
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default Landing;
