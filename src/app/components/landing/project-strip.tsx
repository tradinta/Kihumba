"use client";
import { motion } from 'framer-motion';

type ProjectStripProps = {
  title: string;
  stack: string;
  outcome: string;
};

export const ProjectStrip = ({ title, stack, outcome }: ProjectStripProps) => (
  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8 }} className="border-b group hover:bg-accent/10 transition-colors">
    <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline py-8">
      <h3 className="col-span-4 text-xl font-light text-foreground/80 tracking-tight group-hover:text-foreground transition-colors">{title}</h3>
      <p className="col-span-4 text-sm font-mono text-muted-foreground uppercase tracking-wider">{stack}</p>
      <p className="col-span-4 text-foreground/70 text-sm leading-relaxed text-right md:text-left">{outcome}</p>
    </div>
  </motion.div>
);
