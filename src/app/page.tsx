import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { WaitlistSection } from "@/components/sections/WaitlistSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <AboutSection />
      <WaitlistSection />
      <Footer />
    </main>
  );
}
