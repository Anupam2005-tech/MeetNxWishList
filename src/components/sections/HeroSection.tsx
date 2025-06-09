
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
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center bg-background bg-grid-pattern overflow-hidden pt-24 sm:pt-28">
      {/* Radial gradient mask for the grid pattern (vignette effect) */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Main content area (text, accent sparkles, button, interactive spotlight) */}
      <div
        ref={heroContentRef}
        className="relative z-10 text-center p-4"
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
          
          <div className="relative inline-block mt-8"> 
            <h1 className="font-headline text-7xl sm:text-8xl md:text-9xl font-extrabold tracking-tight text-foreground">
              <span className="text-primary">Meet</span>NX
            </h1>
            {/* Accent Sparkles - positioned under the text */}
            <div className="absolute -bottom-8 sm:-bottom-10 left-1/2 -translate-x-1/2 w-full max-w-xs sm:max-w-md h-10 sm:h-16 pointer-events-none">
              <SparklesCore
                particleColor="#FFFFFF" 
                particleDensity={1.5}
                minSize={0.8}
                maxSize={2.2}
                speed={0.3}
              />
            </div>
          </div>

          {/* Decorative Gradient Lines */}
          <div className="flex flex-col items-center space-y-1">
            <div className="bg-gradient-to-r from-transparent via-[#6366F1] to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="bg-gradient-to-r from-transparent via-[#6366F1] to-transparent h-px w-3/4" />
            <div className="bg-gradient-to-r from-transparent via-[#0EA5E9] to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="bg-gradient-to-r from-transparent via-[#0EA5E9] to-transparent h-px w-1/4" />
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
