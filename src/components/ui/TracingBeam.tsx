
"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setSvgHeight(entry.contentRect.height);
      }
    });
    if (contentRef.current) {
        resizeObserver.observe(contentRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [0, svgHeight]),
    {
      stiffness: 800, // Increased stiffness for faster reaction
      damping: 90,
    }
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, svgHeight]),
    {
      stiffness: 800, // Increased stiffness for faster reaction
      damping: 90,
    }
  );

  return (
    <motion.div
      ref={ref}
      className={cn("relative w-full max-w-4xl mx-auto h-full", className)}
    >
      <div className="absolute -left-4 md:-left-12 top-3">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? "none"
                : "hsl(var(--primary) / 0.24) 0px 0px 0px 8px",
          }}
          className="ml-[27px] h-4 w-4 rounded-full border border-primary shadow-sm flex items-center justify-center"
        >
          <motion.div
            transition={{
              duration: 0.2,
              delay: 0.5,
            }}
            animate={{
              backgroundColor:
                scrollYProgress.get() > 0 ? "hsl(var(--primary))" : "hsl(var(--primary-foreground))",
              borderColor: "hsl(var(--primary))",
            }}
            className="h-2 w-2 rounded-full border border-primary bg-primary-foreground"
          />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight} 
          className="ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0V -36 l 18 -21 V ${svgHeight * 0.8} l -18 21V ${svgHeight}`}
            fill="none"
            stroke="hsl(var(--primary))" 
            strokeOpacity="0.2"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <motion.path
            d={`M 1 0V -36 l 18 -21 V ${svgHeight * 0.8} l -18 21V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2.5"
            className="motion-reduce:hidden"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1} 
              y2={y2} 
            >
              <stop stopColor="hsl(var(--primary))" stopOpacity="0"></stop>
              <stop stopColor="hsl(var(--primary))"></stop>
              <stop offset="0.325" stopColor="hsl(var(--accent))"></stop>
              <stop offset="1" stopColor="hsl(var(--accent))" stopOpacity="0"></stop>
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
