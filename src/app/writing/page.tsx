"use client";
import { motion } from 'framer-motion';
import { WRITING_DATA } from '@/lib/data';
import Link from 'next/link';

export default function WritingIndex() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-32 px-6 md:px-12 max-w-3xl mx-auto min-h-screen"
    >
      <header className="mb-24">
        <span className="text-sm font-mono text-neutral-500 uppercase tracking-widest block mb-4">Writing</span>
        <p className="text-xl text-neutral-300 font-light leading-relaxed">
          Notes on systems, products, engineering, and visibility.
        </p>
      </header>

      <div className="flex flex-col">
        {WRITING_DATA.map((article, i) => (
          <Link href={`/writing/${article.id}`} key={article.id} passHref>
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative py-8 border-t border-white/5 cursor-pointer"
            >
              <motion.div 
                className="absolute left-0 top-8 bottom-8 w-[2px] bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
              />
              
              <div className="pl-6 transition-all duration-500 group-hover:pl-8">
                 <h3 className="text-xl font-light text-neutral-200 group-hover:text-white transition-colors mb-2">
                   {article.title}
                 </h3>
                 <p className="text-neutral-500 text-sm mb-3">
                   {article.premise}
                 </p>
                 <div className="flex gap-4 text-xs font-mono text-neutral-600 uppercase tracking-wider">
                   <span>{article.date}</span>
                   <span>{article.readTime}</span>
                 </div>
              </div>
            </motion.div>
          </Link>
        ))}
        <div className="border-t border-white/5" />
      </div>
    </motion.div>
  );
};
