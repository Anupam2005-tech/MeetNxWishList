
import Image from 'next/image';

export function AboutSection() {
  return (
    <section className="py-16 sm:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-primary">About MeetNX</h2>
            <p className="text-lg text-muted-foreground mb-4">
              MeetNX is born from the idea that meetings should be productive, not a black hole for time and information. We're leveraging the power of artificial intelligence to transform how teams capture and utilize knowledge from their conference calls.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Our mission is to empower individuals and organizations to make the most out of every conversation. By providing clear, concise, and actionable summaries, MeetNX helps you save time, improve collaboration, and drive better outcomes.
            </p>
            <p className="text-lg text-muted-foreground">
              Join us on our journey to redefine meeting productivity.
            </p>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/firebase-console-preview.appspot.com/o/images%2Fvision_pro_test_230919_04_02_26_837_0.jpg?alt=media&token=487cc899-7815-4632-a92c-6238b9759dcb"
              alt="Team collaborating with laptops and devices on a wooden table"
              width={500}
              height={400}
              className="rounded-lg shadow-2xl object-cover"
              data-ai-hint="collaboration workspace"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

