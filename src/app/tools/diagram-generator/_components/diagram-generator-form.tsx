"use client";

import { useState } from 'react';
import { generateInteractiveSystemDiagram } from '@/ai/flows/interactive-system-diagram-generator';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Terminal, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function DiagramGeneratorForm() {
  const [description, setDescription] = useState('');
  const [diagram, setDiagram] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('Please provide a system description.');
      return;
    }
    setError('');
    setLoading(true);
    setDiagram('');

    try {
      const result = await generateInteractiveSystemDiagram({ systemDescription: description });
      if (result.diagramData) {
        setDiagram(result.diagramData);
      } else {
        setError('The AI could not generate a diagram from the description.');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., A web application with a React frontend, a Node.js backend API, and a PostgreSQL database. Users authenticate with JWT..."
          rows={6}
          className="bg-[#0a0a0a] border-neutral-800 text-base font-mono text-neutral-300 focus:border-neutral-600 resize-none"
          style={{ backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)', backgroundSize: '20px 20px' }}
          disabled={loading}
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 text-base bg-neutral-900 border border-neutral-800 hover:bg-neutral-800"
        >
          {loading ? <Loader2 className="animate-spin" /> : <><Wand2 className="mr-2" /> Generate Diagram</>}
        </Button>
      </form>

      <AnimatePresence>
        {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <Alert variant="destructive">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </motion.div>
        )}

        {diagram && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                className="w-full p-4 md:p-8 border border-white/10 bg-black/20 rounded-md"
            >
                <h3 className="text-lg font-medium text-white mb-4">Generated Diagram</h3>
                <div 
                    className="w-full bg-grid-white/[0.05] relative flex items-center justify-center rounded-lg border border-white/10"
                    dangerouslySetInnerHTML={{ __html: diagram }}
                 />
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
