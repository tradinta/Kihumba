'use client';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Book, Briefcase, Mail, Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { user, loading, logout } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-800 border-t-transparent" />
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
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="flex justify-between items-center mb-16">
            <div>
                <h1 className="text-4xl font-medium tracking-tighter text-white">
                    Dashboard
                </h1>
                <p className="text-neutral-400">Welcome back, {user.email}</p>
            </div>
            <Button variant="ghost" onClick={logout} className="text-neutral-400 hover:text-white">
                <LogOut className="mr-2" /> Logout
            </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ManagementCard 
                icon={Book}
                title="Writing"
                description="Create and manage articles for your writing section."
                href="/admin/writing"
            />
            <ManagementCard 
                icon={Briefcase}
                title="Projects"
                description="Update your case studies and project details."
                href="/admin/projects"
            />
            <ManagementCard 
                icon={Mail}
                title="Contacts"
                description="View messages sent through your contact form."
                href="/admin/contacts"
            />
             <ManagementCard 
                icon={Home}
                title="Site Settings"
                description="Manage global site information and metadata."
                href="/admin/settings"
            />
        </div>
      </div>
    </motion.div>
  );
}

const ManagementCard = ({ icon: Icon, title, description, href }: { icon: React.ElementType, title: string, description: string, href: string }) => {
    const router = useRouter();
    return (
        <motion.div 
            whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
            className="bg-neutral-900/50 border border-white/5 p-6 rounded-lg cursor-pointer"
            onClick={() => router.push(href)}
        >
            <Icon className="w-8 h-8 text-neutral-500 mb-4" />
            <h2 className="text-xl font-medium text-white mb-2">{title}</h2>
            <p className="text-neutral-400 font-light">{description}</p>
        </motion.div>
    )
}
