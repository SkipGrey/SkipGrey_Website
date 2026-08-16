import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Shirt, Code2, Printer } from 'lucide-react';
import { VentureCard, type Venture } from './VentureCard';
import { easeCinematic } from '@/lib/motion';

const VENTURES: Venture[] = [
  {
    index: '01',
    name: 'Skipgrey Academy',
    domain: 'academy.skipgrey.com',
    subtitle: 'Technical Education & Mentorship',
    description:
      'A modern institute forging the next generation of engineers through rigorous, mentor-led technical programs and applied craft.',
    icon: <BookOpen className="h-5 w-5" strokeWidth={1.25} />,
    className: 'lg:col-span-7 min-h-[340px]',
  },
  {
    index: '02',
    name: 'Skipgrey Fashion House ',
    domain: 'fashion.skipgrey.com',
    subtitle: 'Contemporary Minimalist Apparel',
    description:
      'Considered wardrobe essentials cut from premium materials — a study in restraint, drape, and timeless silhouette.',
    icon: <Shirt className="h-5 w-5" strokeWidth={1.25} />,
    className: 'lg:col-span-5 min-h-[340px]',
  },
  {
    index: '03',
    name: 'Skipgrey Software Studio',
    domain: 'studio.skipgrey.com',
    subtitle: 'Scalable Enterprise Engineering',
    description:
      'Architecting resilient, performant systems for ambitious organizations — from distributed platforms to bespoke product engineering.',
    icon: <Code2 className="h-5 w-5" strokeWidth={1.25} />,
    className: 'lg:col-span-5 min-h-[340px]',
  },
  {
    index: '04',
    name: 'Skipgrey Print & Media',
    subtitle: 'Physical Asset Production & Publishing',
    description:
      'Tangible, collectible media — books, prints, and physical artifacts produced with archival craftsmanship and editorial intent.',
    icon: <Printer className="h-5 w-5" strokeWidth={1.25} />,
    className: 'lg:col-span-7 min-h-[340px]',
  },
];

export function Ventures() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="ventures" className="relative py-32 lg:py-44 bg-pearl-0 dark:bg-ink-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section header */}
        <div className="grid lg:grid-cols-12 gap-10 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: easeCinematic }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="label-eyebrow text-gold-500 dark:text-gold-300">02 — Portfolio</span>
              <span className="h-px w-12 bg-gold-400/60" />
            </div>
            <h2 className="font-display text-5xl lg:text-6xl font-light leading-[1.02] tracking-tight text-ink-900 dark:text-pearl-0 text-balance">
              A constellation of ventures.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: easeCinematic, delay: 0.15 }}
            className="lg:col-span-6 lg:col-start-7 flex items-end"
          >
            <p className="font-sans text-base lg:text-lg leading-relaxed text-ink-600 dark:text-silver text-balance">
              Four distinct houses, one operating philosophy. Each venture is built to endure —
              independently led, mutually reinforcing, and unified by an obsession with craft.
            </p>
          </motion.div>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 perspective-1000">
          {VENTURES.map((venture) => (
            <VentureCard
              key={venture.name}
              venture={venture}
              hovered={hovered}
              onHover={setHovered}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
