import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center bg-background bg-grid-pattern overflow-hidden">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative z-10 text-center p-4">
        <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
          <span className="text-primary">Meet</span>NX
        </h1>
        <p className="mt-6 text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Revolutionize your conference calls with AI-powered summaries. Never miss a key insight again.
        </p>
        <div className="mt-10">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse-once">
            <Link href="#waitlist">Join the Waitlist</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
