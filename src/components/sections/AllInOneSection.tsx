
import { LayoutGrid, Users, Zap, UploadCloud } from "lucide-react";
import React from "react";

const benefits = [
  {
    icon: <UploadCloud className="h-10 w-10 lg:h-12 lg:w-12 text-primary" />,
    title: "Seamless File Sharing",
    description:
      "Easily upload and share images, documents, and other files directly within your conversations, keeping everyone on the same page without switching apps.",
  },
  {
    icon: <Users className="h-10 w-10 lg:h-12 lg:w-12 text-primary" />,
    title: "Effortless Collaboration",
    description:
      "Enhance teamwork with MeetNX's comprehensive platform. Share, collaborate, and manage your projects efficiently without the hassle of switching between different apps.",
  },
  {
    icon: <Zap className="h-10 w-10 lg:h-12 lg:w-12 text-primary" />,
    title: "Streamlined Efficiency",
    description:
      "Boost productivity by eliminating the chaos of scattered data. MeetNX's all-in-one solution ensures your information is always organized and accessible, saving you time and effort.",
  },
];

export function AllInOneSection() {
  return (
    <section className="py-16 sm:py-24 bg-section-light-background text-section-light-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            All the tools that you need
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Say goodbye to app-hopping and scattered data. No more context
            switching or endless copy-pasting.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-background/10 backdrop-blur-sm p-6 sm:p-8 lg:p-10 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-border/20 flex flex-col items-center text-center"
            >
              <div className="p-4 lg:p-5 bg-primary/10 rounded-full mb-6 lg:mb-8">
                {benefit.icon}
              </div>
              <h3 className="font-headline text-xl sm:text-2xl lg:text-3xl font-semibold text-section-light-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

