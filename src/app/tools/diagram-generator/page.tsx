"use client";
import { motion } from 'framer-motion';
import { DiagramGeneratorForm } from './_components/diagram-generator-form';

export default function DiagramGeneratorPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-32 px-6 md:px-12 min-h-screen flex flex-col items-center"
    >
      <div className="w-full max-w-4xl relative z-10">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tighter text-white mb-4">
            System Diagram Generator
          </h1>
          <p className="text-lg text-neutral-400 font-light max-w-2xl mx-auto">
            Describe a software system in natural language, and let AI generate a visual diagram.
          </p>
        </header>

        <DiagramGeneratorForm />
        
        <div className="mt-16 pt-8 border-t border-white/5 text-center text-sm text-neutral-500">
            <p>This is an experimental tool. The generated diagram is a starting point, not a definitive architectural document.</p>
        </div>
      </div>
    </motion.div>
  );
}
