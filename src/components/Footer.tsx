export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 bg-background text-muted-foreground border-t border-border">
      <div className="container mx-auto px-4 text-center">
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
