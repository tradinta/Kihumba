"use client";
import { motion } from 'framer-motion';
import { Clapperboard, Film, VideoIcon } from 'lucide-react';
import Image from 'next/image';

const projects = [
  {
    title: 'Product Launch Trailer',
    client: 'SaaS Company',
    description: 'A high-energy trailer for a new software product launch, combining screen recordings, motion graphics, and stock footage.',
    imageUrl: 'https://picsum.photos/seed/101/600/400',
    tags: ['Motion Graphics', 'Product Marketing', 'Adobe After Effects'],
    dataAiHint: 'technology abstract',
  },
  {
    title: 'Brand Story Documentary',
    client: 'E-commerce Brand',
    description: 'A short documentary telling the story behind the brand, focusing on the founders and their mission.',
    imageUrl: 'https://picsum.photos/seed/102/600/400',
    tags: ['Storytelling', 'Cinematography', 'DaVinci Resolve'],
    dataAiHint: 'craft person',
  },
  {
    title: 'Social Media Ad Campaign',
    client: 'Fitness App',
    description: 'A series of short, engaging video ads optimized for TikTok and Instagram Reels, driving app downloads.',
    imageUrl: 'https://picsum.photos/seed/103/600/400',
    tags: ['Short Form', 'Performance Marketing', 'CapCut'],
    dataAiHint: 'fitness workout',
  },
  {
    title: 'Corporate Training Series',
    client: 'Fortune 500 Company',
    description: 'A comprehensive video training series for new employees, featuring on-screen talent and animated explainers.',
    imageUrl: 'https://picsum.photos/seed/104/600/400',
    tags: ['Educational Content', 'Corporate Video', 'Adobe Premiere Pro'],
    dataAiHint: 'office presentation',
  },
];

export default function VideoPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-32 px-6 md:px-12 max-w-7xl mx-auto min-h-screen"
    >
      <header className="mb-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-medium tracking-tighter text-foreground mb-4"
        >
          Visual Storytelling
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-muted-foreground font-light max-w-2xl mx-auto"
        >
          From high-energy product launches to compelling brand narratives, I craft videos that capture attention and drive results.
        </motion.p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {[
          { icon: Clapperboard, title: 'Editing & Post-Production', desc: 'Seamless cuts, color grading, sound design, and motion graphics that bring the story to life.' },
          { icon: Film, title: 'Cinematography & Direction', desc: 'Crafting the visual language of a film, from shot composition to lighting and camera movement.' },
          { icon: VideoIcon, title: 'Performance-Driven Content', desc: 'Creating content optimized for marketing campaigns, focusing on engagement and conversion metrics.' },
        ].map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="text-center"
          >
            <div className="flex justify-center mb-4">
              <service.icon className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg text-foreground font-medium mb-2">{service.title}</h3>
            <p className="text-muted-foreground font-light">{service.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="my-32 border-t border-border" />

      <h2 className="text-3xl font-medium text-foreground mb-12 text-center">Selected Work</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="group"
          >
            <div className="relative aspect-video w-full rounded-md overflow-hidden mb-4 border">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={project.dataAiHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                 <h3 className="text-xl font-medium text-white">{project.title}</h3>
                 <p className="text-sm text-neutral-300">{project.client}</p>
              </div>
            </div>
            <p className="text-muted-foreground font-light mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
