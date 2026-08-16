import { motion } from 'framer-motion';
import { Gem, Compass, PenTool } from 'lucide-react';
import { easeCinematic, staggerContainer, fadeInUp } from '@/lib/motion';

const PILLARS = [
  {
    index: 'I',
    title: 'Uncompromising Quality',
    icon: Gem,
    body: 'Every venture is measured against a single standard — would we be proud to put our name on it a decade from now. Nothing ships that does not clear that bar.',
  },
  {
    index: 'II',
    title: 'Engineering Precision',
    icon: Compass,
    body: 'We approach craft as an engineering discipline. Systems, supply chains, and editorial calendars are built with the same rigor as the software we ship.',
  },
  {
    index: 'III',
    title: 'Design First',
    icon: PenTool,
    body: 'Form is not decoration — it is the first promise a brand makes. We design intent into every surface, from the interface to the printed page.',
  },
];

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative py-32 lg:py-44 bg-pearl-0 dark:bg-ink-950 overflow-hidden"
    >
      {/* Faint backdrop mark */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_0%,rgba(200,201,203,0.12),transparent_70%)] dark:bg-[radial-gradient(80%_50%_at_50%_0%,rgba(30,30,30,0.5),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-10 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: easeCinematic }}
            className="lg:col-span-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="label-eyebrow text-gold-500 dark:text-gold-300">01 — Our Vision</span>
              <span className="h-px w-12 bg-gold-400/60" />
            </div>
            <h2 className="font-display text-5xl lg:text-6xl font-light leading-[1.02] tracking-tight text-ink-900 dark:text-pearl-0 text-balance">
              Three convictions, held without exception.
            </h2>
          </motion.div>
        </div>

        {/* Columns */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-pearl-200 dark:bg-ink-700 rounded-sm overflow-hidden border border-pearl-200 dark:border-ink-700"
        >
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                variants={fadeInUp}
                className="group relative bg-pearl-0 dark:bg-ink-950 p-10 lg:p-12 transition-colors duration-700"
              >
                <div className="flex items-center justify-between mb-10">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-pearl-300 dark:border-ink-600 text-gold-500 dark:text-gold-300 transition-all duration-500 group-hover:border-gold-400 group-hover:bg-gold-400 group-hover:text-ink-900">
                    <Icon className="h-5 w-5" strokeWidth={1.25} />
                  </span>
                  <span className="font-display text-2xl font-light text-silver-dark/60 dark:text-silver/40">
                    {pillar.index}
                  </span>
                </div>
                <h3 className="font-display text-2xl lg:text-3xl font-light tracking-tight text-ink-900 dark:text-pearl-0">
                  {pillar.title}
                </h3>
                <p className="mt-5 font-sans text-sm leading-relaxed text-ink-600 dark:text-silver">
                  {pillar.body}
                </p>
                {/* hover underline sweep */}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-gold-400 transition-all duration-700 ease-cinematic group-hover:w-full" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
