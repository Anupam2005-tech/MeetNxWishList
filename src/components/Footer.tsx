
interface FooterProps {
  currentYear: number;
}

export function Footer({ currentYear }: FooterProps) {
  const wavyBackgroundSVG = `url("data:image/svg+xml,%3csvg viewBox='0 0 1000 100' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M0,70 C150,120 350,20 500,70 S850,120 1000,70 L1000,0 L0,0 Z' fill='hsla(197,96%25,75%25,0.1)'%3e%3c/path%3e%3cpath d='M0,60 C200,100 400,20 600,60 S900,100 1000,60 L1000,0 L0,0 Z' fill='hsla(197,96%25,75%25,0.05)'%3e%3c/path%3e%3c/svg%3e")`;

  return (
    <footer className="relative pt-20 pb-8 bg-background text-muted-foreground border-t border-border overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-20 opacity-75 blur-sm"
        style={{
          backgroundImage: wavyBackgroundSVG,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top center',
          backgroundSize: '100% 80px', // Stretch width, fixed height for waves to match div height
        }}
      />
      <div className="container mx-auto px-4 text-center relative z-10">
        <p className="text-sm">
          &copy; {currentYear} MeetNX. All rights reserved.
        </p>
        <p className="text-sm mt-1">
          Transforming meetings with AI.
        </p>
      </div>
    </footer>
  );
}
