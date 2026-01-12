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
const articles = [
  { id: 'systems-vs-features', title: 'Features are cheap. Systems are expensive.', date: 'Oct 2024' },
  { id: 'latency-design', title: 'Latency is a design decision', date: 'Sep 2024' },
  { id: 'distribution-product', title: 'Distribution is part of the product', date: 'Aug 2024' },
  { id: 'illusion-simplicity', title: 'The illusion of simplicity', date: 'Jul 2024' },
];

export default function WritingAdminPage() {
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
                    Manage Writing
                </h1>
                <p className="text-muted-foreground">Create, edit, and manage your articles.</p>
            </div>
            <Button>
                <PlusCircle className="mr-2" /> New Article
            </Button>
        </header>

        <div className="bg-card border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {articles.map((article) => (
                        <TableRow key={article.id}>
                            <TableCell className="font-medium text-foreground">{article.title}</TableCell>
                            <TableCell className="text-muted-foreground">{article.date}</TableCell>
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
