
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { AllInOneSection } from "@/components/sections/AllInOneSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { OriginSection } from "@/components/sections/OriginSection";
import { EarlyAccessSection } from "@/components/sections/EarlyAccessSection";
import { WaitlistSection } from "@/components/sections/WaitlistSection";
import { QuestionSection } from "@/components/sections/QuestionSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const currentYear = new Date().getFullYear();
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <AllInOneSection />
      <AboutSection />
      <OriginSection />
      <EarlyAccessSection />
      <WaitlistSection />
      <QuestionSection />
      <Footer currentYear={currentYear} />
    </main>
  );
}
