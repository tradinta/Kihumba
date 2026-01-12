"use client";
import { useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, GitCommit, Monitor, Server, Shield } from 'lucide-react';
import Link from 'next/link';
import { PROJECT_DATA } from '@/lib/data';
import { SystemDiagram } from '@/app/components/system-diagram';

type Project = typeof PROJECT_DATA[0];

function CaseStudy({ project }: { project: Project }) {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#050505] relative z-20"
    >
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-neutral-800 z-50 origin-left" style={{ scaleX }} />

      <div className="sticky top-0 z-40 p-6 md:px-12 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 flex justify-between items-center">
        <button 
          onClick={() => router.push('/work')}
          className="flex items-center gap-2 text-sm font-mono text-neutral-400 hover:text-white transition-colors uppercase tracking-widest"
        >
          <ArrowLeft size={14} /> Systems Index
        </button>
        <span className="text-xs font-mono text-neutral-600 hidden md:block">
           {project.id} // READ_ONLY
        </span>
      </div>

      <article className="max-w-4xl mx-auto px-6 md:px-12 py-24">
        <header className="mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-light tracking-tighter text-white mb-12"
          >
            {project.title}
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-l border-white/10 pl-8">
            <div>
              <span className="text-xs font-mono text-neutral-500 uppercase block mb-2">What</span>
              <p className="text-neutral-300 font-light leading-relaxed">{project.details.what}</p>
            </div>
            <div>
              <span className="text-xs font-mono text-neutral-500 uppercase block mb-2">Who</span>
              <p className="text-neutral-300 font-light leading-relaxed">{project.details.who}</p>
            </div>
            <div>
              <span className="text-xs font-mono text-neutral-500 uppercase block mb-2">Why</span>
              <p className="text-neutral-300 font-light leading-relaxed">{project.details.why}</p>
            </div>
          </div>
        </header>

        <section className="mb-24">
          <h2 className="text-xl font-medium text-white mb-8 flex items-center gap-3">
             <Shield size={20} className="text-neutral-600" /> Constraints
          </h2>
          <ul className="space-y-4">
            {project.details.constraints.map((c, i) => (
              <li key={i} className="flex items-start gap-4 text-neutral-400 font-light">
                <span className="w-1.5 h-1.5 bg-neutral-700 rounded-full mt-2.5 shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-24">
          <h2 className="text-xl font-medium text-white mb-8 flex items-center gap-3">
             <Server size={20} className="text-neutral-600" /> Architecture
          </h2>
          <SystemDiagram />
          <p className="text-sm font-mono text-neutral-500 max-w-xl">
            System designed for isolation. Auth, Core, and Analytics scale independently based on load profiles.
          </p>
        </section>

        <section className="mb-24">
          <h2 className="text-xl font-medium text-white mb-8 flex items-center gap-3">
             <GitCommit size={20} className="text-neutral-600" /> Engineering Decisions
          </h2>
          <div className="space-y-12">
            {project.details.engineering.map((item, i) => (
              <div key={i} className="group">
                <h3 className="text-lg text-neutral-200 mb-2 font-medium">{item.title}</h3>
                <p className="text-neutral-400 font-light leading-relaxed max-w-2xl border-l border-neutral-800 pl-4 group-hover:border-neutral-600 transition-colors">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-xl font-medium text-white mb-8 flex items-center gap-3">
             <Monitor size={20} className="text-neutral-600" /> Frontend & UX Intent
          </h2>
          <div className="bg-neutral-900/50 border border-white/5 p-8 rounded-sm mb-8">
             <div className="h-64 flex items-center justify-center bg-black/40 mb-6 rounded-sm">
                <p className="font-mono text-xs text-neutral-600">[ UI_SNAPSHOT_PLACEHOLDER ]</p>
             </div>
             <p className="text-neutral-300 font-light mb-4">{project.details.frontend.intent}</p>
             <div className="flex gap-4 flex-wrap">
               {project.details.frontend.points.map((pt, i) => (
                 <span key={i} className="text-xs font-mono text-neutral-500 bg-white/5 px-2 py-1 rounded">
                   {pt}
                 </span>
               ))}
             </div>
          </div>
        </section>

        <section className="mb-32 border-t border-white/10 pt-16">
          <h2 className="text-xl font-medium text-white mb-12">Outcome & Reflection</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             <div>
                <span className="text-xs font-mono text-green-900 bg-green-900/20 px-2 py-1 uppercase mb-4 inline-block">Shipped</span>
                <p className="text-neutral-300 font-light">{project.details.reflection.shipped}</p>
             </div>
             <div>
                <span className="text-xs font-mono text-blue-900 bg-blue-900/20 px-2 py-1 uppercase mb-4 inline-block">Improved</span>
                <p className="text-neutral-300 font-light">{project.details.reflection.improved}</p>
             </div>
             <div>
                <span className="text-xs font-mono text-orange-900 bg-orange-900/20 px-2 py-1 uppercase mb-4 inline-block">Different</span>
                <p className="text-neutral-300 font-light">{project.details.reflection.different}</p>
             </div>
          </div>
        </section>
      </article>
    </motion.div>
  );
};


export default function Page({ params }: { params: { id: string } }) {
    const project = PROJECT_DATA.find((p) => p.id === params.id);
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    if (!project) {
      notFound();
    }
  
    return <CaseStudy project={project} />;
  }
