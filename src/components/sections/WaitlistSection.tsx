
import { EmailForm } from "@/components/EmailForm";

export function WaitlistSection() {
  return (
    <section id="waitlist" className="py-16 sm:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-primary">
          Be the First to Experience MeetNX
        </h2>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-10 max-w-xl mx-auto">
          Sign up for our waitlist and get exclusive early access, updates, and special offers.
        </p>
        <div className="flex justify-center">
          <EmailForm />
        </div>
      </div>
    </section>
  );
}

