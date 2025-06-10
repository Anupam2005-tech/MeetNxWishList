
import Link from 'next/link';
import { GradientBorderButton } from '@/components/ui/GradientBorderButton';

export function Header() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 py-4 sm:py-6 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="text-2xl sm:text-3xl font-bold transition-colors">
          <span className="relative inline-block">
            <span className="text-primary hover:text-primary/90">Meet</span><span className="text-foreground">NX</span>
          </span>
        </Link>
        <GradientBorderButton
          asChild
          href="#waitlist"
          containerClassName="rounded-md"
          borderClassName="bg-[conic-gradient(from_90deg_at_50%_50%,hsl(var(--foreground)/0.1)_0%,hsl(var(--foreground)/0.5)_50%,hsl(var(--foreground)/0.1)_100%)]"
          contentClassName="px-4 py-2 text-base"
        >
          Contact Us
        </GradientBorderButton>
      </div>
    </header>
  );
}
