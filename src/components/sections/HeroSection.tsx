
"use client";

import Link from "next/link";
import { GradientBorderButton } from "@/components/ui/GradientBorderButton";
import { SparklesCore } from "@/components/ui/SparklesCore";
import { useState, useRef } from 'react';

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const heroContentRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (heroContentRef.current) {
      const rect = heroContentRef.current.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
    }
  };

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center bg-black overflow-hidden pt-16 sm:pt-20">
      {/* Background elements: Full-screen white sparkles and gradient lines */}
      <div className="absolute inset-0 pointer-events-none"> {/* Container for background elements */}
        <SparklesCore // White background sparkles
          particleColor="#FFFFFF"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1.2}
          className="w-full h-full"
          speed={0.3}
        />
        {/* Decorative gradient lines */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#6366F1] to-transparent h-[2px] w-3/4 blur-sm" /> {/* Indigo */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#6366F1] to-transparent h-px w-3/4" />    {/* Indigo */}
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#0EA5E9] to-transparent h-[5px] w-1/4 blur-sm" /> {/* Sky */}
      </div>

      {/* Main content area (text, accent sparkles, button, interactive spotlight) */}
      <div
        ref={heroContentRef}
        className="relative z-10 text-center p-4" // z-10 to be above background elements
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Interactive spotlight div */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: isHovering
              ? `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.20), transparent 80%)`
              : 'none',
            opacity: isHovering ? 1 : 0,
          }}
        />

        <div className="relative z-[1]"> {/* Content above interactive spotlight */}
          <div className="relative inline-block">
            <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground">
              <span className="text-primary">Meet</span>NX
            </h1>
            {/* Accent Sparkles - moved lower */}
            <div className="absolute -bottom-8 sm:-bottom-10 left-1/2 -translate-x-1/2 w-full max-w-xs sm:max-w-md h-10 sm:h-16 pointer-events-none">
              <SparklesCore
                particleColor="hsl(var(--accent))" // Accent color for these
                particleDensity={1.5}
                minSize={0.8}
                maxSize={2.2}
                speed={0.3}
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
              className="px-10 py-5 text-xl"
              contentClassName="px-10 py-5 text-xl"
            >
              Join the Waitlist
            </GradientBorderButton>
          </div>
        </div>
      </div>
    </section>
  );
}
