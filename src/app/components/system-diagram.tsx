"use client";
import { motion } from 'framer-motion';

export const SystemDiagram = () => (
  <div className="w-full h-64 border border-white/10 bg-black/20 rounded-sm relative overflow-hidden flex items-center justify-center mb-8">
    <svg width="100%" height="100%" viewBox="0 0 600 200" className="opacity-70">
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#555" />
        </marker>
      </defs>
      <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <rect x="50" y="80" width="80" height="40" rx="4" stroke="#444" fill="none" strokeWidth="1" />
        <text x="90" y="105" textAnchor="middle" fill="#888" fontSize="10" className="font-mono">Client</text>
      </motion.g>
      <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <rect x="200" y="60" width="60" height="80" rx="4" stroke="#444" fill="none" strokeWidth="1" strokeDasharray="4 4" />
        <text x="230" y="105" textAnchor="middle" fill="#888" fontSize="10" className="font-mono">API GW</text>
      </motion.g>
      <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <rect x="350" y="40" width="80" height="30" rx="4" stroke="#444" fill="none" strokeWidth="1" />
        <text x="390" y="60" textAnchor="middle" fill="#888" fontSize="10" className="font-mono">Auth</text>
        <rect x="350" y="85" width="80" height="30" rx="4" stroke="#444" fill="none" strokeWidth="1" />
        <text x="390" y="105" textAnchor="middle" fill="#888" fontSize="10" className="font-mono">Core</text>
        <rect x="350" y="130" width="80" height="30" rx="4" stroke="#444" fill="none" strokeWidth="1" />
        <text x="390" y="150" textAnchor="middle" fill="#888" fontSize="10" className="font-mono">Analytics</text>
      </motion.g>
      <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <path d="M500 50 C500 40 540 40 540 50 L540 150 C540 160 500 160 500 150 Z" stroke="#444" fill="none" strokeWidth="1" />
         <path d="M500 50 C500 60 540 60 540 50" stroke="#444" fill="none" strokeWidth="1" />
         <text x="520" y="105" textAnchor="middle" fill="#888" fontSize="10" className="font-mono">Storage</text>
      </motion.g>
      <motion.path d="M130 100 L200 100" stroke="#333" strokeWidth="1" markerEnd="url(#arrow)" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} />
      <motion.path d="M260 100 L350 55" stroke="#333" strokeWidth="1" markerEnd="url(#arrow)" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.7 }} />
      <motion.path d="M260 100 L350 100" stroke="#333" strokeWidth="1" markerEnd="url(#arrow)" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.8 }} />
      <motion.path d="M260 100 L350 145" stroke="#333" strokeWidth="1" markerEnd="url(#arrow)" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.9 }} />
      <motion.path d="M430 100 L500 100" stroke="#333" strokeWidth="1" markerEnd="url(#arrow)" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 1 }} />
    </svg>
  </div>
);
