
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 py-4 sm:py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="text-2xl sm:text-3xl font-bold text-primary hover:text-primary/90 transition-colors">
          MeetNX
        </Link>
        <Button 
          asChild 
          variant="ghost" 
          className="text-foreground border border-transparent hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all duration-300 px-4 py-2 rounded-md"
        >
          <Link href="#waitlist">Contact Us</Link>
        </Button>
      </div>
    </header>
  );
}
