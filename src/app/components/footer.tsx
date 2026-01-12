import { ThemeToggle } from "./theme-toggle";

export default function AppFooter() {
  return (
    <footer className="relative z-10 py-12 px-6 border-t text-center bg-card print:hidden">
      <div className="absolute bottom-6 right-6">
        <ThemeToggle />
      </div>
      <p className="text-xs text-muted-foreground font-mono">© {new Date().getFullYear()} Mark Allan • kihumba.com</p>
    </footer>
  );
}
