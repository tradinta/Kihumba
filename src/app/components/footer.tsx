export default function AppFooter() {
  return (
    <footer className="relative z-10 py-12 px-6 border-t border-white/5 text-center bg-[#050505] print:hidden">
      <p className="text-xs text-neutral-700 font-mono">© {new Date().getFullYear()} Mark Allan • kihumba.com</p>
    </footer>
  );
}
