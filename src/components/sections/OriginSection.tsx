
"use client";
import { CustomGlobe } from '@/components/ui/CustomGlobe';
import { motion } from "framer-motion";

export function OriginSection() {
  return (
    <section className="py-16 sm:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center gap-10 sm:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            <h2 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-primary">
              From Where We Are
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl lg:max-w-2xl mx-auto">
              Crafted with passion, bridging innovation from our roots in Tripura, India, to the global stage. This interactive globe highlights our origin.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px]"
          >
            <CustomGlobe />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
