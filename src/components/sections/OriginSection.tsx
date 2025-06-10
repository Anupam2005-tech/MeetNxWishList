"use client";

import { motion } from "framer-motion";
import DottedGlobe from '@/components/ui/DottedGlobe'; 

export function OriginSection() {
  return (
    <section className="relative w-full h-screen bg-[#0b1c2c] text-foreground overflow-hidden">
      <div className="absolute inset-0 z-0">
        <DottedGlobe />
      </div>
      <div className="relative z-10 flex flex-col items-center text-center h-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
          className="max-w-4xl"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 lg:mb-6">
            From Where We Are
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl font-normal text-muted-foreground">
            Crafted with passion, bridging innovation from our roots in Tripura, India, to the global stage.
          </p>
        </motion.div>
       
      </div>
    </section>
  );
}
