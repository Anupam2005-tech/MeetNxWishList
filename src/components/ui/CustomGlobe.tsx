
"use client";
import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import type { GlobeMethods } from "react-globe.gl";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export interface CustomGlobeProps {
  lat?: number;
  lng?: number;
  altitude?: number;
  width?: string;
  height?: string;
}

export function CustomGlobe({
  lat = 23.8318, // Tripura, Agartala latitude
  lng = 91.2768, // Tripura, Agartala longitude
  altitude = 1.8, // Adjusted for better initial view, slightly further out
  width = "100%",
  height = "100%",
}: CustomGlobeProps) {
  const globeEl = useRef<GlobeMethods | undefined>();

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.3; // Slower rotation
      globeEl.current.controls().enableZoom = true; // Allow zoom
      globeEl.current.controls().minDistance = 150; // Zoom in limit
      globeEl.current.controls().maxDistance = 600; // Zoom out limit
      
      const povTimeout = setTimeout(() => {
        if (globeEl.current) {
            globeEl.current.pointOfView({ lat, lng, altitude }, 2500); // Smoother transition
        }
      }, 100); // Delay POV to allow globe to initialize
      return () => clearTimeout(povTimeout);
    }
  }, [lat, lng, altitude]);

  const arcsData = [
    {
      startLat: 37.7749, // Example: San Francisco
      startLng: -122.4194,
      endLat: lat,
      endLng: lng,
      color: ["hsla(var(--primary) / 0.6)", "hsla(var(--accent) / 0.6)"],
      stroke: 0.3,
      name: "Connection to Tripura"
    },
    {
      startLat: 28.6139, // Delhi
      startLng: 77.2090,
      endLat: lat,
      endLng: lng,
      color: ["hsla(var(--primary) / 0.5)", "hsla(var(--accent) / 0.5)"],
      stroke: 0.25,
      name: "Connection from Delhi"
    }
  ];

  const gData = [{
    lat: lat,
    lng: lng,
    size: 0.06, 
    color: "hsl(var(--accent))",
    name: "Tripura, India"
  }];

  return (
    <div style={{ width, height }} className="flex items-center justify-center cursor-grab active:cursor-grabbing">
      {typeof window !== "undefined" && Globe && (
        <Globe
          ref={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundColor="rgba(0,0,0,0)"
          
          arcsData={arcsData}
          arcLabel="name"
          arcColor="color"
          arcDashLength={0.3}
          arcDashGap={0.6}
          arcDashInitialGap={() => Math.random()}
          arcDashAnimateTime={2500}
          arcStroke="stroke"

          pointsData={gData}
          pointLabel="name"
          pointLat="lat"
          pointLng="lng"
          pointAltitude={0.01} // Slightly above surface
          pointRadius="size"
          pointColor="color"
          
          showAtmosphere={true}
          atmosphereColor="hsl(var(--primary))"
          atmosphereAltitude={0.2} // Thicker atmosphere
        />
      )}
    </div>
  );
}
