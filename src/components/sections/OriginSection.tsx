
"use client";
import { motion } from "framer-motion";
import DottedGlobe from '@/components/ui/DottedGlobe'; 

export function OriginSection() {
  return (
    <section className="py-16 sm:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-col items-center text-center gap-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="lg:w-full"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 lg:mb-6">
              From Where We Are
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl font-normal text-muted-foreground max-w-3xl mx-auto">
              Crafted with passion, bridging innovation from our roots in Tripura, India, to the global stage. 
            </p>
          </motion.div>
          <div className="lg:w-full flex justify-center mt-8 lg:mt-0">
            <div 
              className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[650px] md:h-[650px] lg:w-[800px] lg:h-[800px] rounded-full overflow-hidden"
              aria-label="Interactive Dotted Globe showing India"
            >
              <DottedGlobe />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
