
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 py-4 sm:py-6 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="text-2xl sm:text-3xl font-bold text-primary hover:text-primary/90 transition-colors">
          <span className="relative inline-block">
            MeetNX
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent to-primary rounded-full"></span>
          </span>
        </Link>
        <Button
          asChild
          variant="ghost"
          className="text-foreground text-base border border-transparent hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all duration-300 px-4 py-2 rounded-md"
        >
          <Link href="#waitlist">Contact Us</Link>
        </Button>
      </div>
    </header>
  );
}
