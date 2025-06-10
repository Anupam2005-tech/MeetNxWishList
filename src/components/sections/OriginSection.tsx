
"use client";

import { motion } from "framer-motion";
import DottedGlobe from '@/components/ui/DottedGlobe'; 

export function OriginSection() {
  return (
    <section className="relative w-full h-screen bg-[#0b1c2c] text-foreground overflow-hidden">
      <div className="absolute inset-0 z-0">
        <DottedGlobe />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 lg:flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
          className="max-w-4xl lg:w-full lg:text-center mb-8 lg:mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 lg:mb-6">
            From Where I Am
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl font-normal text-muted-foreground">
            Crafted with passion, bridging innovation from my roots in Tripura, India, to the global stage.
          </p>
        </motion.div>
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl aspect-square rounded-full overflow-hidden mx-auto group lg:w-auto lg:h-auto lg:max-w-[600px] xl:max-w-[700px] 2xl:max-w-[800px]">
          {/* The DottedGlobe component will fill this container */}
          <DottedGlobe />
        </div>
      </div>
    </section>
  );
}
