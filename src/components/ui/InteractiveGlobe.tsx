
"use client";
import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import type { GlobeMethods } from "globe.gl";

// Dynamically import globe.gl
const World = dynamic(() => import("globe.gl").then(mod => mod.default), { ssr: false });

interface InteractiveGlobeProps {
  title: string;
  description: string;
}

export function InteractiveGlobe({ title, description }: InteractiveGlobeProps) {
  const globeRef = React.useRef<GlobeMethods | undefined>();

  React.useEffect(() => {
    if (globeRef.current) {
      // Tripura, India coordinates
      globeRef.current.pointOfView({ lat: 23.8354, lng: 91.2794, altitude: 2 }, 3000);
    }
  }, []);

  const arcsData = [
    {
      startLat: 37.7749, // San Francisco
      startLng: -122.4194,
      endLat: 23.8354,   // Tripura
      endLng: 91.2794,
      color: ["hsla(var(--accent) / 0.7)", "hsla(var(--primary) / 0.7)"], // Use theme colors with opacity
    },
     {
      startLat: 51.5074, // London
      startLng: 0.1278,
      endLat: 23.8354,   // Tripura
      endLng: 91.2794,
      color: ["hsla(var(--accent) / 0.6)", "hsla(var(--primary) / 0.6)"],
    },
  ];

  const pointsData = [
    { lat: 23.8354, lng: 91.2794, size: 0.15, color: 'hsl(var(--primary))' } // Tripura
  ];

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-[40rem] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-8"
        >
          <h2 className="text-xl md:text-4xl font-bold text-primary">
            {title}
          </h2>
          <p className="text-base md:text-lg font-normal text-muted-foreground max-w-xl lg:max-w-2xl mt-2 mx-auto">
            {description}
          </p>
        </motion.div>
        
        <div className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background pointer-events-none select-none z-40" />
          <div className="absolute inset-0 z-10">
            {typeof window !== "undefined" && World && ( // Ensure World is loaded and we are client-side
              <World
                ref={globeRef}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                backgroundColor="rgba(0,0,0,0)"
                
                arcsData={arcsData}
                arcColor={(d: any) => d.color}
                arcDashLength={0.4}
                arcDashGap={0.8}
                arcDashInitialGap={() => Math.random()}
                arcDashAnimateTime={2000}
                arcStroke={0.3}
                
                pointsData={pointsData}
                pointColor={(d: any) => d.color}
                pointRadius={(d: any) => d.size}
                pointAltitude={0.01}


                atmosphereColor="hsl(var(--primary))"
                atmosphereAltitude={0.15}
                
                enablePointerInteraction={true}
                enableZoom={true}
                enablePan={false} // Disable pan for a cleaner look, rotation is enough
                enableRotation={true}
                // width and height will be taken from parent by globe.gl
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
