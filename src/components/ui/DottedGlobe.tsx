"use client";

import React from 'react';

const DottedGlobe: React.FC = () => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Dotted Country Border Globe</title>
  <style>
    body { margin: 0; overflow: hidden; background: #0b1c2c; display: flex; justify-content: center; align-items: center; }
    #globeViz { width: 100%; height: 100%; position: relative; } /* Adjusted to fill iframe */
    #tooltip {
      position: absolute;
      color: white;
      background: rgba(0, 0, 0, 0.7);
      padding: 6px 10px;
      border-radius: 5px;
      pointer-events: none;
      font-family: sans-serif;
      font-size: 14px;
      z-index: 10;
      transform: translate(-50%, -120%);
      display: none;
    }
  </style>
</head>
<body>
  <div id="globeViz">
    <div id="tooltip">India</div>
  </div>

  <script src="https://unpkg.com/three@0.155.0/build/three.min.js"><\/script>
  <script src="https://unpkg.com/globe.gl@2.32.3/dist/globe.gl.min.js"><\/script>
  <script src="https://unpkg.com/topojson-client@3"><\/script>

  <script>
    // Wrapped in a function to ensure DOM is ready and scripts are loaded.
    // It's good practice, though basic scripts at end of body often work.
    (function() {
      const indiaCoords = { lat: 22.5, lng: 79.0 };
      const tooltip = document.getElementById('tooltip');
      const globeContainer = document.getElementById('globeViz');

      // Check if essential elements and libraries are available
      if (!globeContainer || !tooltip || !window.THREE || !window.Globe || !window.topojson) {
        console.error("Globe dependencies or HTML elements not found.");
        // Fallback or error message for user could be added here
        // For example: globeContainer.innerHTML = "Error loading globe.";
        return;
      }
      
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error("Could not get 2D context for globe texture");
        return;
      }
      ctx.fillStyle = "#0b1c2c";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const globeTextureUrl = canvas.toDataURL();

      const world = window.Globe()(globeContainer)
        .globeImageUrl(globeTextureUrl)
        .backgroundColor("#0b1c2c")
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
        .showAtmosphere(true)
        .atmosphereColor("#87CEEB")
        .atmosphereAltitude(0.1)
        .pointOfView({ lat: 23.8354, lng: 91.2794, altitude: 3.5 }) // Tripura focus
        .pointsData([])
        .pointAltitude(0.01)
        .pointColor(() => '#ffffff')
        .pointRadius(0.017);

      world.controls().autoRotate = true;
      world.controls().autoRotateSpeed = 3.5;

      // Lights
      const ambientLight = new window.THREE.AmbientLight("#00FFFF");
      const dirLight1 = new window.THREE.DirectionalLight("#FFD700");
      dirLight1.position.set(-1, 0, 1);
      const dirLight2 = new window.THREE.DirectionalLight("#FF69B4");
      dirLight2.position.set(0, 1, 1);
      const pointLight = new window.THREE.PointLight("#00FF00");
      pointLight.position.set(2, 2, 2);
      world.scene().add(ambientLight, dirLight1, dirLight2, pointLight);

      // Tooltip updater
      let animationFrameId;
      function updateTooltipPosition() {
        const coords = world.getScreenCoords(indiaCoords.lat, indiaCoords.lng);
        if (!coords) return;
        tooltip.style.left = \`\${coords.x}px\`;
        tooltip.style.top = \`\${coords.y}px\`;
        tooltip.style.display = 'block';
      }

      function animateTooltip() {
        updateTooltipPosition();
        animationFrameId = requestAnimationFrame(animateTooltip);
      }
      
      // World data
      fetch('https://unpkg.com/world-atlas@2.0.2/countries-110m.json')
        .then(res => res.json())
        .then(worldData => {
          const countries = window.topojson.feature(worldData, worldData.objects.countries).features;

          world
            .polygonsData(countries)
            .polygonStrokeColor(() => 'rgba(255,255,255,0.7)')
            .polygonCapColor(p => p.id === '356' ? 'white' : 'rgba(0,0,0,0)') // '356' is India's ISO numeric code
            .polygonSideColor(() => 'rgba(0,0,0,0)');

          const landDots = countries.flatMap(country => {
            const count = 30;
            const pts = [];
            const bbox = country.bbox;
            if (!bbox || bbox.length !== 4) return [];
            const [minLng, minLat, maxLng, maxLat] = bbox;

            if (typeof minLng !== 'number' || typeof minLat !== 'number' || 
                typeof maxLng !== 'number' || typeof maxLat !== 'number' ||
                minLng > maxLng || minLat > maxLat) {
              return [];
            }

            for (let i = 0; i < count; i++) {
              const lat = Math.random() * (maxLat - minLat) + minLat;
              const lng = Math.random() * (maxLng - minLng) + minLng;
              if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
                pts.push({ lat, lng });
              }
            }
            return pts;
          });

          world.pointsData(landDots);

          setTimeout(() => {
            animateTooltip(); // Start the animation loop
          }, 1000); 
        })
        .catch(error => console.error('Error loading world data:', error));

      const resizeHandler = () => {
        // The globe.gl instance usually handles resizing of its canvas automatically
        // when its container resizes. The main concern for the tooltip
        // is its position relative to the new screen coordinates.
        updateTooltipPosition(); 
      };
      window.addEventListener('resize', resizeHandler);

      // Cleanup function for when the iframe content is removed or reloaded
      // This is a bit conceptual for srcDoc, as it reloads.
      // If this were a React component managing its own lifecycle more directly, this would be in useEffect cleanup.
      // window.addEventListener('beforeunload', () => {
      //   if (animationFrameId) cancelAnimationFrame(animationFrameId);
      //   window.removeEventListener('resize', resizeHandler);
      //   if (world && typeof world.dispose === 'function') {
      //      world.dispose(); // Hypothetical dispose method
      //   }
      // });
    })();
  <\/script>
</body>
</html>
`;

  return (
    <iframe
      srcDoc={htmlContent}
      title="Dotted Country Border Globe"
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
        display: 'block', // Ensures iframe takes up block space correctly
        borderRadius: 'inherit', // Inherit border radius from parent
      }}
      sandbox="allow-scripts allow-same-origin" // allow-scripts is necessary for the globe to function
                                               // allow-same-origin for fetch if it was to a relative path (not the case here)
    />
  );
};

export default DottedGlobe;
