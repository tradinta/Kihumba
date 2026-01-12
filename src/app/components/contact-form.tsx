"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

export function ContactForm() {
  const [formState, setFormState] = useState('idle'); // 'idle' | 'sending' | 'success'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    
    // Simulate network request
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <AnimatePresence mode="wait">
      {formState !== 'success' ? (
        <motion.form 
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -10 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <div className="space-y-1">
            <label className="block text-xs font-mono text-muted-foreground uppercase tracking-widest">Name</label>
            <input 
              type="text" 
              required
              className="w-full bg-transparent border-b border-border py-2 text-foreground focus:outline-none focus:border-foreground transition-colors rounded-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-mono text-muted-foreground uppercase tracking-widest">Email</label>
            <input 
              type="email" 
              required
              className="w-full bg-transparent border-b border-border py-2 text-foreground focus:outline-none focus:border-foreground transition-colors rounded-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-mono text-muted-foreground uppercase tracking-widest">Context</label>
            <div className="relative">
              <select className="w-full bg-transparent border-b border-border py-2 text-foreground focus:outline-none focus:border-foreground transition-colors appearance-none rounded-none cursor-pointer">
                <option className="bg-background text-foreground">Product Build</option>
                <option className="bg-background text-foreground">System Architecture</option>
                <option className="bg-background text-foreground">Design & Branding</option>
                <option className="bg-background text-foreground">Marketing & Growth</option>
                <option className="bg-background text-foreground">Advisory</option>
              </select>
              <div className="absolute right-0 top-3 pointer-events-none text-muted-foreground">
                <ArrowRight size={12} className="rotate-90" />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-mono text-muted-foreground uppercase tracking-widest">Message</label>
            <textarea 
              rows={6}
              required
              className="w-full bg-card border p-4 text-sm font-mono text-muted-foreground focus:outline-none focus:border-ring transition-colors resize-none rounded-sm"
            />
          </div>

          <button 
            type="submit"
            disabled={formState === 'sending'}
            className="w-full bg-secondary text-secondary-foreground border border-border py-3 px-6 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4"
          >
            {formState === 'sending' ? (
               <span className="w-4 h-4 border border-muted-foreground border-t-transparent rounded-full animate-spin" />
            ) : 'Send'}
          </button>
        </motion.form>
      ) : (
        <motion.div 
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-12 border bg-card flex flex-col items-center justify-center text-center rounded-sm"
        >
           <span className="text-muted-foreground mb-2"><Check size={20} /></span>
           <p className="text-foreground/80 font-light">Message received.</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
