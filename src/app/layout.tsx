import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import GlobalNav from './components/global-nav';
import AppFooter from './components/footer';
import BackgroundEffects from './components/background-effects';

export const metadata: Metadata = {
  title: 'Mark Allan | kihumba.com',
  description: 'Design, engineering, and digital systems from pixels to production.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body bg-[#050505] min-h-screen text-neutral-200 selection:bg-neutral-800 selection:text-white overflow-x-hidden print:bg-white")}>
        <BackgroundEffects />
        <GlobalNav />
        {children}
        <AppFooter />
      </body>
    </html>
  );
}
