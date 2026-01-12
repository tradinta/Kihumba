"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Index' },
  { href: '/work', label: 'Systems' },
  { href: '/writing', label: 'Writing' },
  { href: '/tools/diagram-generator', label: 'Generator' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const NavLink = ({ href, label }: { href: string, label: string }) => {
  const pathname = usePathname();
  const isActive = (href === '/' && pathname === '/') || (href !== '/' && pathname.startsWith(href));
  
  return (
    <Link href={href} className={`${isActive ? 'text-white' : 'text-neutral-500 hover:text-white'} transition-colors`}>
      {label}
    </Link>
  );
};

export default function GlobalNav() {
  return (
    <nav className="fixed top-6 right-6 md:right-12 z-50 flex gap-4 md:gap-6 text-sm font-mono uppercase tracking-widest mix-blend-difference print:hidden">
      {navLinks.map(link => <NavLink key={link.href} {...link} />)}
    </nav>
  );
}
