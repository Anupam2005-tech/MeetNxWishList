
import Image from 'next/image';

export function OriginSection() {
  return (
    <section className="py-16 sm:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center gap-8">
          <div>
            <h2 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-primary">
              From Where We Are
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Crafted with passion, bridging innovation from our roots to the global stage.
            </p>
          </div>
          <div className="w-full max-w-xl lg:max-w-2xl">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Map highlighting Tripura, India on a globe"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl object-cover w-full h-auto"
              data-ai-hint="India map Tripura globe"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
