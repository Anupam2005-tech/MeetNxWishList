
'use client';

import React from 'react';
import { Mic, Sparkles, Share2, FileText } from "lucide-react";
import { TracingBeam } from '@/components/ui/TracingBeam';

const features = [
  {
    icon: <Mic className="h-8 w-8 lg:h-10 lg:w-10 text-primary" />,
    title: "Seamless Recording",
    description: "Easily record your conference calls directly within MeetNX. No extra setup needed.",
    dataAiHint: "microphone audio"
  },
  {
    icon: <Sparkles className="h-8 w-8 lg:h-10 lg:w-10 text-primary" />,
    title: "Instant AI Summaries",
    description: "Our advanced AI generates concise and accurate summaries of your meetings in moments.",
    dataAiHint: "artificial intelligence"
  },
  {
    icon: <FileText className="h-8 w-8 lg:h-10 lg:w-10 text-primary" />,
    title: "Actionable Insights",
    description: "Extract key decisions, action items, and important topics automatically.",
    dataAiHint: "document report"
  },
  {
    icon: <Share2 className="h-8 w-8 lg:h-10 lg:w-10 text-primary" />,
    title: "Share with Ease",
    description: "Quickly share summaries and insights with your team to keep everyone aligned.",
    dataAiHint: "collaboration network"
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 sm:py-24 bg-section-light-background text-section-light-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">How MeetNX Works</h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-xl mx-auto">
            Experience the future of meetings with our simple, powerful platform.
          </p>
        </div>

        <TracingBeam className="px-6">
          <div className="space-y-12">
            {features.map((feature, index) => (
              <div key={`content-${index}`} className="ml-4 md:ml-0">
                <div className="bg-background/10 backdrop-blur-sm p-6 sm:p-8 lg:p-10 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-border/20">
                  <div className="flex items-center gap-4 mb-4 lg:mb-6">
                    <div className="p-3 lg:p-4 bg-primary/10 rounded-full">
                      {React.cloneElement(feature.icon, {className: "h-8 w-8 lg:h-10 lg:w-10 text-primary"})}
                    </div>
                    <h3 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-semibold text-section-light-foreground">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-base sm:text-lg lg:text-xl leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TracingBeam>
      </div>
    </section>
  );
}

