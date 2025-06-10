
"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Globe from 'globe.gl';
import { feature as topojsonFeature } from 'topojson-client';
import type { Objects, Topology } from 'topojson-specification';


export function InteractiveGlobe() {
  const globeEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!globeEl.current) return;

    const indiaCoords = { lat: 22.5, lng: 79.0 }; // General coordinates for India for tooltip
    const tripuraCoords = { lat: 23.8354, lng: 91.2794 }; // Tripura for point of view

    const tooltip = document.createElement('div');
    tooltip.innerText = 'India';
    tooltip.style.position = 'absolute';
    tooltip.style.color = 'white';
    tooltip.style.background = 'rgba(0,0,0,0.7)';
    tooltip.style.padding = '6px 10px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.fontFamily = 'sans-serif';
    tooltip.style.fontSize = '14px';
    tooltip.style.transform = 'translate(-50%, -120%)'; // Position tooltip above the point
    tooltip.style.display = 'none'; // Initially hidden
    tooltip.style.zIndex = "10";
    
    // Append tooltip to globeEl *after* Globe.js has initialized its canvas,
    // or to a more stable parent like document.body if issues arise.
    // For now, let's try appending it directly to globeEl.current.
    // It's better to append it *after* Globe() has been called if Globe() clears children.
    // Or, ensure Globe() adds to the div rather than replacing its content.
    // Let's append it to the globe container, assuming Globe() adds a canvas as a child.
    globeEl.current.appendChild(tooltip);


    // Create a simple dark texture for the globe
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#0A192F'; // Match app's dark background
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    const globeTextureUrl = canvas.toDataURL();

    const world = Globe()(globeEl.current)
      .globeImageUrl(globeTextureUrl) // Use the generated simple texture
      .backgroundColor('rgba(0,0,0,0)') // Transparent background for the globe itself
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .showAtmosphere(true)
      .atmosphereColor('#3B82F6') // Primary color for atmosphere
      .atmosphereAltitude(0.15)
      .pointOfView({ lat: tripuraCoords.lat, lng: tripuraCoords.lng, altitude: 2.5 }) // Focus on Tripura
      .pointsData([])
      .pointAltitude(0.01)
      .pointColor(() => '#FFFFFF') // White for land dots
      .pointRadius(0.017);

    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 1.5; // Slower rotation
    world.controls().enableZoom = false; // Disable zoom for better fit in section
    world.controls().enablePan = false; // Disable pan

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xbbbbbb, 0.5); // Soft white light
    world.scene().add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5); // Illuminate from a distance
    world.scene().add(directionalLight);


    const updateTooltipPosition = () => {
      const screenCoords = world.getScreenCoords(indiaCoords.lat, indiaCoords.lng);
      if (screenCoords) {
        tooltip.style.left = `${screenCoords.x}px`;
        tooltip.style.top = `${screenCoords.y}px`;
        tooltip.style.display = 'block';
      } else {
        tooltip.style.display = 'none';
      }
    };
    
    // Fetch country polygons
    fetch('//unpkg.com/world-atlas@2.0.2/countries-110m.json')
      .then(res => res.json())
      .then((worldData: Topology<Objects<any>>) => {
        const countries = topojsonFeature(worldData, worldData.objects.countries).features;
        
        world
          .polygonsData(countries)
          .polygonCapColor(feat => (feat.id === 'IND' || (feat.properties && feat.properties.ISO_A3 === 'IND')) ? 'hsl(var(--primary))' : 'rgba(200, 200, 200, 0.1)') // Highlight India with primary color
          .polygonSideColor(() => 'rgba(0, 100, 0, 0.05)')
          .polygonStrokeColor(() => 'rgba(100,100,100,0.3)');

        // Add subtle dots for landmass illusion
        const landDots = countries.flatMap(country => {
          if (!country.geometry) return [];
          const GEOJSON_SUPPORTED_TYPES = [
            'Polygon',
            'MultiPolygon',
          ];
          if (!GEOJSON_SUPPORTED_TYPES.includes(country.geometry.type)) return [];

          const count = 10; // Reduced for performance
          const pts = [];
          // A simple way to get some points within the bbox, not geographically accurate for complex shapes
          const [minLng, minLat, maxLng, maxLat] = country.bbox || [0,0,0,0];
          if (!country.bbox) return []; 

          for (let i = 0; i < count; i++) {
            const lat = minLat + Math.random() * (maxLat - minLat);
            const lng = minLng + Math.random() * (maxLng - minLng);
             if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
                pts.push({ lat, lng });
            }
          }
          return pts;
        });
        world.pointsData(landDots);

        // Start tooltip updates after data is loaded
        // Use a timeout to ensure globe is rendered
        setTimeout(() => {
            updateTooltipPosition(); // Initial position
            // Animation loop for continuous tooltip update
            const animate = () => {
                updateTooltipPosition();
                requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        }, 500); // Delay to allow globe rendering
      });

    const handleResize = () => {
      if (globeEl.current) {
        world.width(globeEl.current.offsetWidth);
        world.height(globeEl.current.offsetHeight);
        updateTooltipPosition(); // Update tooltip on resize
      }
    };
    window.addEventListener('resize', handleResize);
    
    // Initial resize
    if (globeEl.current) {
        world.width(globeEl.current.offsetWidth);
        world.height(globeEl.current.offsetHeight);
    }


    return () => {
      window.removeEventListener('resize', handleResize);
      if (world && typeof world.dispose === 'function') {
        world.dispose();
      }
      if (globeEl.current && tooltip.parentNode === globeEl.current) {
        globeEl.current.removeChild(tooltip);
      }
    };
  }, []);

  return <div ref={globeEl} style={{ width: '100%', height: '100%', position: 'relative', cursor: 'grab' }} />;
}
