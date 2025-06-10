
import Image from 'next/image';

export function AboutSection() {
  return (
    <section className="py-16 sm:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-col items-center gap-8 lg:gap-12">
          <div className="lg:w-full lg:text-center">
            <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 lg:mb-8 text-primary">About MeetNX</h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-4 lg:mb-6 max-w-3xl mx-auto">
              MeetNX is born from the idea that meetings should be productive, not a black hole for time and information. We're leveraging the power of artificial intelligence to transform how teams capture and utilize knowledge from their conference calls.
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-4 lg:mb-6 max-w-3xl mx-auto">
              Our mission is to empower individuals and organizations to make the most out of every conversation. By providing clear, concise, and actionable summaries, MeetNX helps you save time, improve collaboration, and drive better outcomes.
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              Join us on our journey to redefine meeting productivity.
            </p>
          </div>
          <div className="lg:w-full flex justify-center mt-8 lg:mt-0">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMX1Bwmb4pA5iSNO66MvcVLpp3MmCF5_WEVnbpuPOP8nxlFba4AbsOOGt_&s=10"
              alt="Team collaborating with laptops and devices on a wooden table"
              width={600}
              height={480}
              className="rounded-lg shadow-2xl object-cover w-full max-w-md lg:max-w-2xl"
              data-ai-hint="collaboration workspace"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
