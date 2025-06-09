import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Sparkles, Share2, FileText } from "lucide-react";

const features = [
  {
    icon: <Mic className="h-10 w-10 text-primary" />,
    title: "Seamless Recording",
    description: "Easily record your conference calls directly within MeetNX. No extra setup needed.",
    dataAiHint: "microphone audio"
  },
  {
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    title: "Instant AI Summaries",
    description: "Our advanced AI generates concise and accurate summaries of your meetings in moments.",
    dataAiHint: "artificial intelligence"
  },
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: "Actionable Insights",
    description: "Extract key decisions, action items, and important topics automatically.",
    dataAiHint: "document report"
  },
  {
    icon: <Share2 className="h-10 w-10 text-primary" />,
    title: "Share with Ease",
    description: "Quickly share summaries and insights with your team to keep everyone aligned.",
    dataAiHint: "collaboration network"
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 sm:py-24 bg-section-light-background text-section-light-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight">How MeetNX Works</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Experience the future of meetings with our simple, powerful platform.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-background/5 border-border/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="font-headline text-2xl text-center text-section-light-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
