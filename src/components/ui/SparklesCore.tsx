
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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  // We use a state just to trigger re-render on initial load / resize if necessary,
  // but the animation loop will use sparklesRef for performance.
  const [, setLastUpdate] = useState(0);


  const createSparkle = (canvasWidth: number, canvasHeight: number): Sparkle => {
    const maxLife = Math.random() * 60 + 120; // Approx 2-3 seconds at 60fps
    return {
      id: Math.random().toString(36).substring(2),
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      size: Math.random() * (maxSize - minSize) + minSize,
      opacity: Math.random() * 0.4 + 0.6, // Start with good opacity
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      life: maxLife,
      maxLife: maxLife,
    };
  };

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
        newSparkles.push(createSparkle(width, height));
      }
      sparklesRef.current = newSparkles;
      setLastUpdate(Date.now()); // Trigger a re-render
    };

    initSparkles();

    const animate = () => {
      if (!ctx || !canvas) { // Check canvas and ctx validity each frame
        if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparklesRef.current = sparklesRef.current.map(s => {
        let newX = s.x + s.vx;
        let newY = s.y + s.vy;
        let newLife = s.life - 1;
        // Fade out based on life, but ensure it's somewhat random for twinkling
        let newOpacity = (newLife / s.maxLife) * (Math.random() * 0.3 + 0.7); 

        if (newLife <= 0 || newX < 0 || newX > canvas.width || newY < 0 || newY > canvas.height) {
          return createSparkle(canvas.width, canvas.height); // Re-initialize
        }
        return { ...s, x: newX, y: newY, life: newLife, opacity: Math.max(0, newOpacity) };
      });

      sparklesRef.current.forEach(s => {
        if (!ctx) return; // Double check context
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2, false);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = s.opacity;
        ctx.fill();
      });
      ctx.globalAlpha = 1; // Reset global alpha

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Ensure animation starts only if canvas and context are valid
    if (ctx && canvas) {
        animationFrameId.current = requestAnimationFrame(animate);
    }
    

    const handleResize = () => {
      if (container && canvas && ctx) {
        width = container.offsetWidth;
        height = container.offsetHeight;
        canvas.width = width;
        canvas.height = height;
        initSparkles(); // Re-initialize sparkles for new dimensions
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [particleColor, particleDensity, speed, minSize, maxSize]); // Dependencies for re-initializing effect

  return (
    <div className={cn("relative w-full h-full", containerClassName)} ref={containerRef}>
      <canvas ref={canvasRef} className={cn("absolute inset-0 pointer-events-none", className)} />
    </div>
  );
};
