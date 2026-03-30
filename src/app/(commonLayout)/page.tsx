import { HeroSection } from "@/components/modules/Home/HeroSection";
import { UpcomingEvents } from "@/components/modules/Home/UpcomingEvents";
import { FeaturedOrchestrations } from "@/components/modules/Home/FeaturedOrchestrations";
import { RefinedAccess } from "@/components/modules/Home/RefinedAccess";
import { Testimonials } from "@/components/modules/Home/Testimonials";
import { CTASection } from "@/components/modules/Home/CTASection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <UpcomingEvents />
      <FeaturedOrchestrations />
      <RefinedAccess />
      <Testimonials />
      <CTASection />
    </main>
  );
}

