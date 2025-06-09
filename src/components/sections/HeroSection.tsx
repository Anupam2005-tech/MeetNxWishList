
import Link from "next/link";
import { GradientBorderButton } from "@/components/ui/GradientBorderButton";
import { SparklesCore } from "@/components/ui/SparklesCore";

export function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center bg-background bg-grid-pattern overflow-hidden pt-16 sm:pt-20"> {/* Increased min-height slightly */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative z-10 text-center p-4">
        <div className="relative inline-block">
          <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
            <span className="text-primary">Meet</span>NX
          </h1>
          <div className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xs sm:max-w-md h-10 sm:h-16 pointer-events-none">
            <SparklesCore
              particleColor="hsl(var(--accent))"
              particleDensity={0.8}
              minSize={0.6}
              maxSize={1.2}
              speed={0.3}
              containerClassName="opacity-75"
            />
          </div>
        </div>
        <p className="mt-10 sm:mt-12 text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Revolutionize your conference calls with AI-powered summaries. Never miss a key insight again.
        </p>
        <div className="mt-12 sm:mt-16">
          <GradientBorderButton 
            href="#waitlist" 
            asChild
            className="px-10 py-5 text-xl" // Increased padding and text size
            contentClassName="px-10 py-5 text-xl" // Ensure content also gets larger padding
          >
            Join the Waitlist
          </GradientBorderButton>
        </div>
      </div>
    </section>
  );
}
