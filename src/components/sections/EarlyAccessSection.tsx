import { GradientBorderButton } from "@/components/ui/GradientBorderButton";

export function EarlyAccessSection() {
  return (
    <section className="py-16 sm:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-primary">
          Join Our Waitlist Now!
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Be the first to experience the future of productivity!
        </p>
        <div className="flex justify-center">
          <GradientBorderButton href="#waitlist" asChild>
            Get Early Access
          </GradientBorderButton>
        </div>
      </div>
    </section>
  );
}
