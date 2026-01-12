import { ThemeToggle } from "./theme-toggle";

export default function AppFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 px-6 py-3 flex items-center justify-between bg-background/50 backdrop-blur-md border-t print:hidden">
      <p className="text-xs text-muted-foreground font-mono">© {new Date().getFullYear()} Mark Allan • kihumba.com</p>
      <ThemeToggle />
    </footer>
  );
}
