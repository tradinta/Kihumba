"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { SkillSection } from './components/landing/skill-section';
import { ProjectStrip } from './components/landing/project-strip';
import { VideoPlaceholders } from './components/landing/video-placeholders';
import { useProjects } from '@/hooks/use-content';

const roles = [
  { title: "Systems Architecture", sub: "High-scale. Distributed. Fault-tolerant." },
  { title: "Data Storytelling", sub: "Turning raw systems data into C-Suite narratives." },
  { title: "Blockchain Engineering", sub: "EVM. Smart Contracts. RWA Tokenization." },
  { title: "Technical Leadership", sub: "Mentorship. Strategy. End-to-end ownership." }
];

export default function LandingPage() {
  const [loaded, setLoaded] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const { projects } = useProjects();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className={`fixed inset-0 bg-background z-[100] transition-opacity duration-[2000ms] pointer-events-none ${loaded ? 'opacity-0' : 'opacity-100'}`} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 pt-[30vh] pb-32 px-6 md:px-12 max-w-7xl mx-auto"
      >
        <div className="flex flex-col gap-2 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[0.9] text-foreground"
          >
            I architect, engineer, <br />
            <span className="text-foreground/70">and visualize complex systems</span> <br />
            <span className="text-foreground/40">from core to C-Suite.</span>
          </motion.h1>
          <div className="h-20 mt-12 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col gap-1"
              >
                <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium">
                  {roles[roleIndex].title}
                </span>
                <span className="text-lg text-foreground/80 font-light tracking-wide">
                  {roles[roleIndex].sub}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.main>

      <SkillSection />

      <section className="relative z-10 pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-muted-foreground font-mono text-sm uppercase tracking-widest mb-2">The Quiet Work</motion.p>
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-2xl font-light text-foreground/80 max-w-lg">Most of my work ships quietly, behind logins and NDAs.</motion.h2>
        </div>
        <div className="border-t border-border">
          {projects.slice(0, 3).map((project) => (
            <ProjectStrip
              key={project.id}
              title={project.title}
              stack={project.stack}
              outcome={project.outcome}
            />
          ))}
        </div>
      </section>

      <section className="relative z-10">
        <div className="w-full"><VideoPlaceholders /></div>
        <div className="bg-card py-24 px-6 md:px-12 border-b border-border">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-foreground mb-2">I don't just build products.</h2>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-muted-foreground">I make them visible.</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-48 px-6 md:px-12 flex flex-col items-center justify-center text-center">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="max-w-xl text-foreground/70 text-lg md:text-xl font-light leading-relaxed mb-12">
          If you need someone who can design it, build it, scale it, and ship it<br /><span className="text-foreground font-normal">without hand-holding.</span>
        </motion.p>

        <div className="flex flex-col md:flex-row gap-6">
          <Link href="/work" passHref>
            <motion.button
              whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 bg-transparent border border-border text-foreground rounded-sm overflow-hidden transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-3 font-medium tracking-wide">
                View Systems Index
              </span>
            </motion.button>
          </Link>
          <Link href="/contact" passHref>
            <motion.button
              whileHover={{ scale: 1.05, filter: 'brightness(1.2)' }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 bg-background border border-border text-foreground rounded-sm overflow-hidden transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-3 font-medium tracking-wide">
                Start a conversation <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </Link>
        </div>
      </section>
    </>
  );
};
