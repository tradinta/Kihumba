"use client";
import { motion } from 'framer-motion';
import { ContactForm } from '../components/contact-form';

export default function ContactPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-32 px-6 md:px-12 min-h-screen flex flex-col items-center"
    >
      <div className="w-full max-w-md relative z-10">
        <header className="mb-12">
           <h1 className="text-sm font-medium text-white mb-2">Start a conversation</h1>
           <p className="text-neutral-500 font-light leading-relaxed">
             Briefly describe what you’re trying to build or fix.
           </p>
        </header>

        <ContactForm />

        <div className="mt-16 pt-8 border-t border-white/5">
           <p className="text-xs text-neutral-600 mb-4">Prefer direct contact?</p>
           <div className="flex flex-col gap-2 text-sm text-neutral-400 font-light">
              <a href="mailto:hello@system.dev" className="hover:text-white transition-colors">hello@system.dev</a>
              <div className="flex gap-4 mt-2">
                 <a href="#" className="hover:text-white cursor-pointer transition-colors border-b border-transparent hover:border-white/50 pb-px">LinkedIn</a>
                 <a href="#" className="hover:text-white cursor-pointer transition-colors border-b border-transparent hover:border-white/50 pb-px">GitHub</a>
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};
