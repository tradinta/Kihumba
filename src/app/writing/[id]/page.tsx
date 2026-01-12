"use client";
import { useState, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Link as LinkIcon, Printer } from 'lucide-react';
import { WRITING_DATA } from '@/lib/data';

type Article = typeof WRITING_DATA[0];

function ArticleReader({ article }: { article: Article }) {
    const router = useRouter();
    const [copiedId, setCopiedId] = useState<number | null>(null);
  
    const handleCopyLink = (idx: number) => {
      if (typeof window === "undefined") return;
      const url = new URL(window.location.href);
      url.hash = `p-${idx}`;
      navigator.clipboard.writeText(url.toString());
      setCopiedId(idx);
      setTimeout(() => setCopiedId(null), 2000);
    };
  
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="min-h-screen bg-[#080808] relative z-20 print:bg-white print:text-black"
      >
        <div className="fixed top-6 left-6 md:left-12 z-50 print:hidden">
          <button 
            onClick={() => router.push('/writing')}
            className="flex items-center gap-2 text-sm font-mono text-neutral-500 hover:text-white transition-colors uppercase tracking-widest"
          >
            <ArrowLeft size={14} /> Writing
          </button>
        </div>
  
        <div className="fixed top-6 right-6 md:right-12 z-50 print:hidden">
           <button 
             onClick={() => window.print()} 
             className="text-neutral-600 hover:text-white transition-colors"
             title="Print Article"
           >
             <Printer size={16} />
           </button>
        </div>
  
        <article className="max-w-2xl mx-auto px-6 py-32 md:py-48">
          <header className="mb-16">
            <div className="flex gap-4 text-xs font-mono text-neutral-500 uppercase tracking-widest mb-6 print:text-black">
               <span>{article.date}</span>
               <span className="print:hidden">{article.readTime} Read</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif text-neutral-200 leading-tight mb-6 print:text-black">
              {article.title}
            </h1>
            <p className="text-lg text-neutral-400 font-light italic border-l-2 border-neutral-800 pl-4 print:text-gray-600 print:border-gray-300">
              {article.premise}
            </p>
          </header>
  
          <div className="space-y-8 font-serif text-lg leading-relaxed text-neutral-300 print:text-black">
             {article.content.map((block, i) => {
               if (block.type === 'h3') {
                 return <h3 key={i} className="text-xl font-body font-medium text-white mt-12 mb-4 print:text-black">{block.text}</h3>;
               }
               if (block.type === 'callout') {
                 return (
                   <div key={i} className="my-12 p-8 bg-neutral-900/50 border-l-2 border-white/20 print:bg-gray-100 print:border-gray-800">
                      <p className="text-xl font-light italic text-white print:text-black">"{block.text}"</p>
                   </div>
                 );
               }
               return (
                 <div key={i} className="group relative">
                   <p id={`p-${i}`} className="relative z-10">{block.text}</p>
                   <div className="absolute -left-8 top-1 opacity-0 group-hover:opacity-100 transition-opacity print:hidden">
                      <button 
                        onClick={() => handleCopyLink(i)}
                        className="text-neutral-600 hover:text-white transition-colors"
                        title="Copy link to paragraph"
                      >
                        {copiedId === i ? <Check size={14} /> : <LinkIcon size={14} />}
                      </button>
                   </div>
                 </div>
               );
             })}
          </div>
  
          <footer className="mt-32 pt-12 border-t border-neutral-800 print:hidden">
             <p className="text-neutral-500 font-sans font-light">
               If this resonates, <button onClick={() => router.push('/contact')} className="text-white border-b border-neutral-700 hover:border-white transition-colors">you know where to find me</button>.
             </p>
          </footer>
        </article>
      </motion.div>
    );
};
  
export default function Page({ params }: { params: { id: string } }) {
  const article = WRITING_DATA.find((a) => a.id === params.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!article) {
    notFound();
  }

  return <ArticleReader article={article} />;
}
