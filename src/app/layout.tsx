import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import GlobalNav from './components/global-nav';
import AppFooter from './components/footer';
import BackgroundEffects from './components/background-effects';
import { FirebaseProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Mark Allan | kihumba.com',
  description: 'Design, engineering, and digital systems from pixels to production.',
  openGraph: {
    title: 'Mark Allan | kihumba.com',
    description: 'Design, engineering, and digital systems from pixels to production.',
    url: 'https://kihumba.com',
    siteName: 'Mark Allan',
    images: [
      {
        url: 'https://picsum.photos/seed/og-image/1200/630',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mark Allan | kihumba.com',
    description: 'Design, engineering, and digital systems from pixels to production.',
    creator: '@markallan',
    images: ['https://picsum.photos/seed/og-image/1200/630'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary-foreground overflow-x-hidden print:bg-white")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseProvider>
            <BackgroundEffects />
            <GlobalNav />
            <main>{children}</main>
            <AppFooter />
            <Toaster />
          </FirebaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
