"use client";
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-32 px-6 md:px-12 max-w-4xl mx-auto min-h-screen"
    >
      <header className="mb-32">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-8">About</span>
        <h1 className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed">
          I describe myself as someone who thinks in systems. I move fluidly between design, engineering, and distribution, caring deeply about shipping things that survive real usage. I understand that aesthetics without structure fail, and structure without taste is invisible.
        </h1>
      </header>

      <section className="mb-32">
        <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-12">How I Work</h2>
        <div className="space-y-16">
          {[
            { title: "End to End Ownership", desc: "From interface to infrastructure to analytics. No gaps left for others to fill." },
            { title: "Systems Over Features", desc: "Features expire. Systems compound. I build for the long horizon." },
            { title: "Design Serves Clarity", desc: "Visuals exist to reduce cognitive load, not to impress peers on social media." },
            { title: "Performance Is A Feature", desc: "Latency, cost, and reliability are core components of User Experience." },
            { title: "Distribution Matters", desc: "A product unseen is unfinished. I build with growth and metrics in mind." }
          ].map((principle, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: i * 0.1 }}
             >
                <h3 className="text-lg text-foreground font-medium mb-2">{principle.title}</h3>
                <p className="text-foreground/70 font-light">{principle.desc}</p>
             </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-32">
        <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-12">Capabilities</h2>
        
        <div className="grid gap-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h3 className="text-foreground text-lg font-medium mb-4">Software Engineering</h3>
            <ul className="text-foreground/80 font-light space-y-2 mb-6">
              <li>Architect production systems with resilience in mind</li>
              <li>Design APIs and service boundaries</li>
              <li>Build fullstack applications with real users</li>
              <li>Handle data, caching, analytics, and scale</li>
              <li>Make informed tradeoffs under constraints</li>
            </ul>
            <p className="text-xs text-muted-foreground font-mono leading-relaxed max-w-lg">
              Next.js, Go, TypeScript, Python, Django, REST, gRPC, Redis, BigQuery, Docker, AWS, GCP, Monorepos, Microservices
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h3 className="text-foreground text-lg font-medium mb-4">Design & Visual Systems</h3>
            <ul className="text-foreground/80 font-light space-y-2 mb-6">
              <li>Create cohesive visual identities</li>
              <li>Engineer motion and interaction models</li>
              <li>Produce performance-aware marketing assets</li>
              <li>Maintain scalable UI systems</li>
            </ul>
            <p className="text-xs text-muted-foreground font-mono leading-relaxed max-w-lg">
              Figma, Token Systems, Framer Motion, GSAP, CSS Variables, Three.js
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h3 className="text-foreground text-lg font-medium mb-4">Marketing & Distribution</h3>
            <ul className="text-foreground/80 font-light space-y-2 mb-6">
              <li>Understand paid acquisition mechanics</li>
              <li>Design creatives specifically for performance</li>
              <li>Run campaigns across Google, Meta, and TikTok</li>
              <li>Publish content optimized for web distribution</li>
            </ul>
            <p className="text-xs text-muted-foreground font-mono leading-relaxed max-w-lg">
              Google Ads, Meta Ads Manager, TikTok Ads, SEO, Analytics, Copywriting
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mb-32">
        <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-8">Work Context</h2>
        <p className="text-foreground/70 font-light leading-relaxed max-w-2xl">
          Much of my work is private, built for clients, platforms, or internal systems behind authentication. My GitHub does not represent the full surface area of my capabilities. I am happy to walk through real systems, architectures, and decision-making processes in conversation.
        </p>
      </section>

      <section className="border-t border-border pt-16 flex flex-col items-start gap-8">
         <p className="text-foreground font-medium text-lg">
            I’m most useful where design, engineering, and scale intersect.
         </p>
         <Link href="/work" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 border-b border-transparent hover:border-foreground pb-0.5">
           View selected work <ArrowRight size={16} />
         </Link>
      </section>
    </motion.div>
  );
};
