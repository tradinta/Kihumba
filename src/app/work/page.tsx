"use client";
import { motion } from 'framer-motion';
import { PROJECT_DATA } from '@/lib/data';
import Link from 'next/link';

export default function WorkIndex() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-32 px-6 md:px-12 max-w-7xl mx-auto min-h-screen"
    >
      <header className="mb-24">
        <h1 className="text-sm font-mono text-muted-foreground uppercase tracking-widest max-w-md leading-relaxed">
          Selected systems I’ve designed, engineered, and shipped.
        </h1>
      </header>

      <div className="flex flex-col">
        {PROJECT_DATA.map((project, i) => (
          <Link href={`/work/${project.id}`} key={project.id} passHref>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative py-12 border-t border-border cursor-pointer"
            >
              <motion.div 
                className="absolute bottom-0 left-0 h-[1px] bg-primary w-0 group-hover:w-full transition-all duration-700 ease-in-out" 
              />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline">
                <div className="lg:col-span-3">
                  <h2 className="text-2xl font-light text-foreground/80 group-hover:text-foreground transition-colors tracking-tight">
                    {project.title}
                  </h2>
                </div>
                <div className="lg:col-span-4">
                  <p className="text-muted-foreground font-medium text-sm leading-relaxed">
                    {project.problem}
                  </p>
                </div>
                <div className="lg:col-span-2">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">
                    {project.role}
                  </span>
                </div>
                <div className="lg:col-span-3 text-right">
                  <p className="text-xs font-mono text-foreground/70 mb-1 font-code">
                    {project.stack}
                  </p>
                  <p className="text-sm text-foreground/90">
                    {project.outcome}
                  </p>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
        <div className="border-t border-border" />
      </div>
    </motion.div>
  );
};
