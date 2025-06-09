
"use client";

import { GradientBorderButton } from "@/components/ui/GradientBorderButton";
import React, { useRef, useState } from 'react';

export function EarlyAccessSection() {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <section 
      className="py-16 sm:py-24 bg-background text-foreground"
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={divRef}
    >
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, hsl(var(--primary) / 0.1), transparent 40%)`,
        }}
      />
      <div className="container mx-auto px-4 text-center relative z-10"> {/* Ensure content is above the gradient */}
        <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-primary">
          Join Our Waitlist Now!
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Be the first to experience the future of productivity!
        </p>
        <div className="flex justify-center">
          <GradientBorderButton href="#waitlist" asChild>
            Get Early Access
          </GradientBorderButton>
        </div>
      </div>
    </section>
  );
}
