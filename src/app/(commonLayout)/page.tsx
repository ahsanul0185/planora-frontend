import { HeroSection } from "@/components/modules/Home/HeroSection";
import { UpcomingEvents } from "@/components/modules/Home/UpcomingEvents";
import { FeaturedOrchestrations } from "@/components/modules/Home/FeaturedOrchestrations";
import { ForYou } from "@/components/modules/Home/ForYou";
import { FAQSection } from "@/components/modules/Home/FAQSection";
import { RefinedAccess } from "@/components/modules/Home/RefinedAccess";
import { Testimonials } from "@/components/modules/Home/Testimonials";
import { CTASection } from "@/components/modules/Home/CTASection";

import { getUserInfo } from "@/services/auth.services";

export default async function Home() {
  const userInfo = await getUserInfo();
  const isParticipant = userInfo?.role === "PARTICIPANT";

  return (
    <main className="min-h-screen">
      <HeroSection />
      <UpcomingEvents />
      <FeaturedOrchestrations />
      <ForYou isParticipant={isParticipant} />
      <RefinedAccess />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </main>
  );
}
