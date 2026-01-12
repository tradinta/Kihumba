'use client';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data for now, will be replaced with Firestore data
const projects = [
  { id: 'b2b-platform', title: 'B2B Supply Chain Platform', outcome: 'Scaled to 5k suppliers' },
  { id: 'fintech-migration', title: 'Fintech Core Migration', outcome: 'Zero-downtime cutover' },
  { id: 'content-engine', title: 'Media Intelligence Engine', outcome: 'Automated 90% of tagging' },
];

export default function ProjectsAdminPage() {
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
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="flex justify-between items-center mb-16">
            <div>
                <Link href="/admin/dashboard" className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest mb-4">
                    <ArrowLeft size={14} /> Dashboard
                </Link>
                <h1 className="text-4xl font-medium tracking-tighter text-foreground">
                    Manage Projects
                </h1>
                <p className="text-muted-foreground">Update your case studies and project details.</p>
            </div>
            <Button>
                <PlusCircle className="mr-2" /> New Project
            </Button>
        </header>

         <div className="bg-card border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Outcome</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projects.map((project) => (
                        <TableRow key={project.id}>
                            <TableCell className="font-medium text-foreground">{project.title}</TableCell>
                            <TableCell className="text-muted-foreground">{project.outcome}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm">Edit</Button>
                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400">Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
      </div>
    </motion.div>
  );
}
