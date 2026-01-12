"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useUser } from '@/firebase';

const baseNavLinks = [
  { href: '/', label: 'Index' },
  { href: '/work', label: 'Systems' },
  { href: '/video', label: 'Video' },
  { href: '/writing', label: 'Writing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const NavLink = ({ href, label, onClick }: { href: string, label: string, onClick?: () => void }) => {
  const pathname = usePathname();
  const isActive = (href === '/' && pathname === '/') || (href !== '/' && pathname.startsWith(href));
  
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`${isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'} transition-colors text-lg md:text-sm`}
    >
      {label}
    </Link>
  );
};

export default function GlobalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const pathname = usePathname();

  const navLinks = [
    ...baseNavLinks,
    ...(user ? [{ href: '/admin/dashboard', label: 'Dashboard' }] : [{ href: '/login', label: 'Admin' }])
  ];

  return (
    <>
      {/* Desktop Nav */}
      <nav className="fixed top-6 right-6 md:right-12 z-50 hidden md:flex gap-6 text-sm font-mono uppercase tracking-widest print:hidden">
        {navLinks.map(link => (
          <Link href={link.href} key={link.href} className={`${(pathname === link.href) || (link.href !== '/' && pathname.startsWith(link.href)) ? 'text-foreground dark:text-white' : 'text-muted-foreground hover:text-foreground dark:hover:text-white'} transition-colors mix-blend-difference`}>
             {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Nav */}
      <div className="md:hidden fixed top-4 right-4 z-[100] print:hidden">
         <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 bg-background/30 dark:bg-black/30 backdrop-blur-sm rounded-full text-foreground dark:text-white"
         >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{opacity: 0, rotate: -90}} animate={{opacity: 1, rotate: 0}} exit={{opacity: 0, rotate: 90}}>
                   <X size={20} />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{opacity: 0, rotate: 90}} animate={{opacity: 1, rotate: 0}} exit={{opacity: 0, rotate: -90}}>
                    <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
         </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden fixed inset-0 bg-background/80 dark:bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center print:hidden"
            >
                <nav className="flex flex-col items-center gap-8 font-mono uppercase tracking-widest">
                    {navLinks.map((link, i) => (
                        <motion.div
                            key={link.href}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.05 }}
                        >
                            <NavLink href={link.href} label={link.label} onClick={() => setIsOpen(false)} />
                        </motion.div>
                    ))}
                </nav>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
