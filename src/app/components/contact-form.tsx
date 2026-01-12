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
            <label className="block text-xs font-mono text-neutral-600 uppercase tracking-widest">Name</label>
            <input 
              type="text" 
              required
              className="w-full bg-transparent border-b border-neutral-800 py-2 text-neutral-200 focus:outline-none focus:border-white transition-colors rounded-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-mono text-neutral-600 uppercase tracking-widest">Email</label>
            <input 
              type="email" 
              required
              className="w-full bg-transparent border-b border-neutral-800 py-2 text-neutral-200 focus:outline-none focus:border-white transition-colors rounded-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-mono text-neutral-600 uppercase tracking-widest">Context</label>
            <div className="relative">
              <select className="w-full bg-transparent border-b border-neutral-800 py-2 text-neutral-200 focus:outline-none focus:border-white transition-colors appearance-none rounded-none cursor-pointer">
                <option className="bg-[#050505]">Product Build</option>
                <option className="bg-[#050505]">System Architecture</option>
                <option className="bg-[#050505]">Design & Branding</option>
                <option className="bg-[#050505]">Marketing & Growth</option>
                <option className="bg-[#050505]">Advisory</option>
              </select>
              <div className="absolute right-0 top-3 pointer-events-none text-neutral-600">
                <ArrowRight size={12} className="rotate-90" />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-mono text-neutral-600 uppercase tracking-widest">Message</label>
            <textarea 
              rows={6}
              required
              className="w-full bg-[#0a0a0a] border border-neutral-800 p-4 text-sm font-mono text-neutral-400 focus:outline-none focus:border-neutral-600 transition-colors resize-none rounded-sm"
              style={{ backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)', backgroundSize: '20px 20px' }}
            />
          </div>

          <button 
            type="submit"
            disabled={formState === 'sending'}
            className="w-full bg-neutral-900 border border-neutral-800 text-white py-3 px-6 text-sm font-medium hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4"
          >
            {formState === 'sending' ? (
               <span className="w-4 h-4 border border-neutral-500 border-t-transparent rounded-full animate-spin" />
            ) : 'Send'}
          </button>
        </motion.form>
      ) : (
        <motion.div 
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-12 border border-white/5 bg-white/[0.02] flex flex-col items-center justify-center text-center rounded-sm"
        >
           <span className="text-neutral-500 mb-2"><Check size={20} /></span>
           <p className="text-neutral-300 font-light">Message received.</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
