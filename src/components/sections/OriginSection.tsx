"use client";

import { motion } from "framer-motion";
import DottedGlobe from "@/components/ui/DottedGlobe";

export function OriginSection() {
  return (
    <section className="relative w-full h-screen bg-[#0b1c2c] text-foreground overflow-hidden flex flex-col items-center justify-center px-4 pt-12 md:pt-20 lg:pt-24">
      {/* Background Globe - hidden on small screens */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <DottedGlobe />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center space-y-8">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">
            From Where I Am
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground">
            Crafted with passion, bridging innovation from my roots in Tripura, India, to the global stage.
          </p>
        </motion.div>

        {/* Foreground Globe (on all screens, replaces the background one on small) */}
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl aspect-square rounded-full overflow-hidden mx-auto z-10">
          <DottedGlobe />
        </div>
      </div>
    </section>
  );
}
