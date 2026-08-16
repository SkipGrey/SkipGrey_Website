import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { easeCinematic, letterReveal, wordReveal } from '@/lib/motion';
import { LinePattern } from './LinePattern';

const HEADLINE = 'Building Enduring Ventures.';

export function CinematicHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-screen w-full overflow-hidden bg-pearl-0 dark:bg-ink-900"
    >
      {/* Parallax backdrop */}
      <motion.div
        style={{ y: yBg, scale }}
        className="absolute inset-0"
      >
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(201,162,89,0.10),transparent_60%)] dark:bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(201,162,89,0.10),transparent_60%)]" />
        {/* Animated abstract line pattern */}
        <LinePattern className="text-gold-400/25 dark:text-gold-300/15 z-[1]" />
        {/* Grain */}
        <div className="grain absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 lg:px-10 pt-28 pb-24"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeCinematic, delay: 0.4 }}
          className="flex items-center gap-4 mb-10"
        >
          <span className="h-px w-12 bg-gold-400/70" />
          <span className="label-eyebrow text-gold-500 dark:text-gold-300">Skipgrey Holding · Est. 2024</span>
        </motion.div>

        {/* Headline — letter by letter */}
        <h1 className="font-display font-black text-[13vw] sm:text-[10.5vw] lg:text-[8vw] xl:text-[132px] leading-[0.92] tracking-[-0.03em] max-w-[14ch]">
          <span className="sr-only">{HEADLINE}</span>
          <motion.span
            aria-hidden
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.04, delayChildren: 0.6 }}
            className="inline-flex flex-wrap"
          >
            {HEADLINE.split('').map((char, i) => (
              <motion.span
                key={`${i}-${char}`}
                variants={letterReveal}
                className={char === ' ' ? 'w-[0.28em]' : 'inline-block'}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={wordReveal}
          transition={{ delay: 1.4, duration: 1, ease: easeCinematic }}
          className="mt-10 max-w-2xl font-sans text-base lg:text-lg leading-relaxed text-ink-700 dark:text-silver text-balance"
        >
          Skipgrey is a multi-disciplinary holding company orchestrating excellence across
          education, contemporary apparel, software engineering, and physical media.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="label-eyebrow text-[10px]">Scroll</span>
          <span className="relative h-16 w-px overflow-hidden bg-pearl-200 dark:bg-ink-700">
            <span className="absolute inset-0 origin-top animate-scrollLine bg-ink-900 dark:bg-pearl-0" />
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
