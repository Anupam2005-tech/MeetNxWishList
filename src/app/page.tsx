import { Header } from "@/components/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { EarlyAccessSection } from "@/components/sections/EarlyAccessSection";
import { WaitlistSection } from "@/components/sections/WaitlistSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const currentYear = new Date().getFullYear();
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <AboutSection />
      <EarlyAccessSection />
      <WaitlistSection />
      <Footer currentYear={currentYear} />
    </main>
  );
}
