
"use client";
import { InteractiveGlobe } from '@/components/ui/InteractiveGlobe';

export function OriginSection() {
  return (
    <section className="py-16 sm:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center gap-10 sm:gap-12">
          <InteractiveGlobe 
            title="From Where We Are" 
            description="Crafted with passion, bridging innovation from our roots in Tripura, India, to the global stage. This interactive globe highlights our origin." 
          />
        </div>
      </div>
    </section>
  );
}
