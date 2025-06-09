
import React from "react";
import { Mic, Sparkles, Share2, FileText, CheckCircle } from "lucide-react";

const features = [
  {
    icon: <Mic className="h-8 w-8 text-primary" />,
    title: "Seamless Recording",
    description: "Easily record your conference calls directly within MeetNX. No extra setup needed.",
    dataAiHint: "microphone audio"
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: "Instant AI Summaries",
    description: "Our advanced AI generates concise and accurate summaries of your meetings in moments.",
    dataAiHint: "artificial intelligence"
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "Actionable Insights",
    description: "Extract key decisions, action items, and important topics automatically.",
    dataAiHint: "document report"
  },
  {
    icon: <Share2 className="h-8 w-8 text-primary" />,
    title: "Share with Ease",
    description: "Quickly share summaries and insights with your team to keep everyone aligned.",
    dataAiHint: "collaboration network"
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 sm:py-24 bg-section-light-background text-section-light-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight">How MeetNX Works</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Experience the future of meetings with our simple, powerful platform.
          </p>
        </div>

        <div className="relative">
          {/* Central Timeline Line */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-1 bg-border/50 rounded-full -translate-x-1/2"></div>

          <div className="space-y-12 md:space-y-0">
            {features.map((feature, index) => (
              <div key={index} className="md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-8 items-start relative">
                {/* Timeline Dot - visible on all screens, adjusted for mobile */}
                <div className="md:hidden absolute left-0 top-1 w-px h-full bg-border/30 ml-[calc(1.5rem/2)]"></div> {/* Vertical line for mobile */}
                <div className="absolute left-0 top-1 md:left-1/2 md:-translate-x-1/2 z-10 flex items-center justify-center">
                  <div className="bg-primary rounded-full p-1.5 shadow-md border-2 border-section-light-background">
                    <CheckCircle className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
                
                {/* Content Card - alternating sides on md+ screens */}
                <div className={`
                  ${index % 2 === 0 ? 'md:col-start-1 md:text-right' : 'md:col-start-3 md:text-left'}
                  md:row-start-1 
                  pl-10 md:pl-0 md:pr-0  // Padding for mobile line, reset for md
                  relative  // For potential future line connectors if needed for mobile styling
                `}>
                  <div className="bg-background/10 backdrop-blur-sm p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-border/20 md:inline-block md:max-w-md w-full">
                    <div className={`flex items-center gap-4 mb-3 ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row`}>
                      <div className="p-3 bg-primary/10 rounded-full">
                        {React.cloneElement(feature.icon, {className: "h-8 w-8 text-primary"})}
                      </div>
                      <h3 className="font-headline text-2xl font-semibold text-section-light-foreground">{feature.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>

                {/* Spacer for md screens */}
                <div className="hidden md:block md:col-start-2"></div>
                
                {/* Mobile version: always on one side, below the dot */}
                 <div className="md:hidden mt-4 ml-3"> {/* Margin for dot and line */}
                    {/* Content is already structured above to appear here on mobile */}
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
