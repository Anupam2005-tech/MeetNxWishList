import Link from 'next/link';

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 py-4 sm:py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-start items-center">
        <Link href="/" className="text-2xl sm:text-3xl font-bold text-primary hover:text-primary/90 transition-colors">
          MeetNX
        </Link>
        {/* Future navigation items can be added here */}
      </div>
    </header>
  );
}
