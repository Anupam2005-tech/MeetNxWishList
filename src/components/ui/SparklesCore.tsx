
"use client";

import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Sparkle {
  id: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number; // velocity x
  vy: number; // velocity y
  life: number; // remaining life
  maxLife: number;
}

interface SparklesCoreProps {
  particleColor?: string;
  particleDensity?: number;
  speed?: number;
  minSize?: number;
  maxSize?: number;
  className?: string;
  containerClassName?: string;
}

export const SparklesCore: React.FC<SparklesCoreProps> = ({
  particleColor = 'hsl(var(--accent))', 
  particleDensity = 0.5, 
  speed = 0.5, 
  minSize = 0.5,
  maxSize = 1.5,
  className,
  containerClassName,
}) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = container.offsetWidth;
    let height = container.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const initSparkles = () => {
      const numParticles = Math.floor(width * height * particleDensity / 1000); 
      const newSparkles: Sparkle[] = [];
      for (let i = 0; i < numParticles; i++) {
        const maxLife = Math.random() * 60 + 120; 
        newSparkles.push({
          id: Math.random().toString(36).substring(2),
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * (maxSize - minSize) + minSize,
          opacity: Math.random() * 0.4 + 0.6, // Increased base opacity: 0.6 to 1.0
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          life: maxLife,
          maxLife: maxLife,
        });
      }
      setSparkles(newSparkles);
    };

    initSparkles();

    const animate = () => {
      if (!ctx || !canvas) return; // Ensure ctx and canvas are still valid
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Use canvas.width/height for clarity
      setSparkles(prevSparkles =>
        prevSparkles.map(s => {
          let newX = s.x + s.vx;
          let newY = s.y + s.vy;
          let newLife = s.life - 1;
          let newOpacity = (newLife / s.maxLife) * (Math.random() * 0.3 + 0.7); 

          if (newLife <= 0 || newX < 0 || newX > canvas.width || newY < 0 || newY > canvas.height) {
            const maxLife = Math.random() * 60 + 120;
            return {
              ...s,
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              vx: (Math.random() - 0.5) * speed,
              vy: (Math.random() - 0.5) * speed,
              opacity: Math.random() * 0.4 + 0.6, // Consistent opacity re-initialization
              life: maxLife,
              maxLife: maxLife,
              size: Math.random() * (maxSize - minSize) + minSize,
            };
          }
          return { ...s, x: newX, y: newY, life: newLife, opacity: newOpacity };
        })
      );

      sparkles.forEach(s => {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2, false);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = s.opacity;
        ctx.fill();
      });
      ctx.globalAlpha = 1; 

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    const handleResize = () => {
      if (container && canvas && ctx) {
        width = container.offsetWidth;
        height = container.offsetHeight;
        canvas.width = width;
        canvas.height = height;
        initSparkles(); 
      }
    };
    window.addEventListener('resize', handleResize);


    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [particleColor, particleDensity, speed, minSize, maxSize]); 

  return (
    <div className={cn("relative w-full h-full", containerClassName)} ref={containerRef}>
      <canvas ref={canvasRef} className={cn("absolute inset-0 pointer-events-none", className)} />
    </div>
  );
};
