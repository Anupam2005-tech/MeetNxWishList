
"use client";
import { motion } from "framer-motion";
import Image from 'next/image';

export function OriginSection() {
  return (
    <section className="py-16 sm:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center text-center lg:text-left gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              From Where We Are
            </h2>
            <p className="text-lg md:text-xl font-normal text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Crafted with passion, bridging innovation from our roots in Tripura, India, to the global stage. 
            </p>
          </motion.div>
          <div className="lg:w-1/2 flex justify-center">
            <Image
              src="https://placehold.co/500x500.png" 
              alt="Globe highlighting Tripura, India"
              width={500}
              height={500}
              className="rounded-full shadow-2xl"
              data-ai-hint="globe world"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
