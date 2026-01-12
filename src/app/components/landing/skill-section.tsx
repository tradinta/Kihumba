"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Terminal, Cpu, Layers, Zap, Database, Cloud, Layout, Code } from 'lucide-react';

const SkillTag = ({ icon: Icon, label, color = "text-muted-foreground" }: { icon: React.ElementType, label: string, color?: string }) => (
    <motion.div className="group relative flex items-center gap-3 px-5 py-3 bg-card border rounded-sm hover:border-foreground/20 transition-colors cursor-default backdrop-blur-sm" whileHover={{ scale: 1.02, x: 5 }}>
      <Icon size={16} className={`${color} opacity-70 group-hover:opacity-100 transition-opacity`} />
      <span className="text-sm font-medium tracking-wide text-foreground/80 group-hover:text-foreground transition-colors">{label}</span>
    </motion.div>
);
  
export const SkillSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    return (
      <section ref={ref} className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 1 }} className="flex flex-wrap gap-4 max-w-4xl">
          <SkillTag icon={Code} label="Next.js (App Router)" />
          <SkillTag icon={Terminal} label="Go Services" />
          <SkillTag icon={Layers} label="TypeScript" />
          <SkillTag icon={Database} label="PostgreSQL & Redis" />
          <SkillTag icon={Zap} label="gRPC & REST" />
          <SkillTag icon={Cloud} label="Docker & Kubernetes" />
          <SkillTag icon={Layout} label="Figma to Code" />
        </motion.div>
      </section>
    );
};
