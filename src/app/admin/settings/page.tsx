'use client';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SettingsAdminPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted-foreground border-t-transparent" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-32 px-6 md:px-12"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <header className="flex justify-between items-center mb-16">
            <div>
                <Link href="/admin/dashboard" className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest mb-4">
                    <ArrowLeft size={14} /> Dashboard
                </Link>
                <h1 className="text-4xl font-medium tracking-tighter text-foreground">
                    Site Settings
                </h1>
                <p className="text-muted-foreground">Manage global site information and metadata.</p>
            </div>
             <Button>
                <Save className="mr-2" /> Save Changes
            </Button>
        </header>

        <div className="space-y-8">
            <div className="p-8 bg-card border rounded-lg space-y-6">
                <h2 className="text-xl font-medium text-foreground">General Information</h2>
                <div className="space-y-2">
                    <Label htmlFor="site-title">Site Title</Label>
                    <Input id="site-title" defaultValue="Mark Allan | kihumba.com" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="site-description">Site Description</Label>
                    <Input id="site-description" defaultValue="Design, engineering, and digital systems from pixels to production." />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="footer-text">Footer Text</Label>
                    <Input id="footer-text" defaultValue={`© ${new Date().getFullYear()} Mark Allan • kihumba.com`} />
                </div>
            </div>

             <div className="p-8 bg-card border rounded-lg space-y-6">
                <h2 className="text-xl font-medium text-foreground">Social Links</h2>
                <div className="space-y-2">
                    <Label htmlFor="linkedin-url">LinkedIn URL</Label>
                    <Input id="linkedin-url" placeholder="https://linkedin.com/in/your-profile" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="github-url">GitHub URL</Label>
                    <Input id="github-url" placeholder="https://github.com/your-username" />
                </div>
            </div>
        </div>

      </div>
    </motion.div>
  );
}
