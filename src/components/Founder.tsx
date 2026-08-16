import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { easeCinematic } from '@/lib/motion';

export function Founder() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const yImage = useTransform(scrollYProgress, [0, 1], ['-8%', '12%']);
  const yFrame = useTransform(scrollYProgress, [0, 1], ['4%', '-6%']);

  return (
    <section
      id="founder"
      ref={ref}
      className="relative py-32 lg:py-44 bg-pearl-100 dark:bg-ink-900 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Portrait frame */}
          <motion.div
            style={{ y: yFrame }}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.2, ease: easeCinematic }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-pearl-200 dark:border-ink-700 bg-pearl-50 dark:bg-ink-800">
              {/* Parallax inner image plane (placeholder) */}
              <motion.div
                style={{ y: yImage }}
                className="absolute inset-[-10%]"
              >
                <div className="h-full w-full bg-[radial-gradient(120%_90%_at_30%_20%,rgba(200,201,203,0.25),transparent_60%)] dark:bg-[radial-gradient(120%_90%_at_30%_20%,rgba(40,40,40,0.7),transparent_60%)]" />
                <div className="grain absolute inset-0 opacity-[0.05] dark:opacity-[0.08] mix-blend-overlay" />
                {/* Monogram placeholder */}
                <div className="absolute inset-0 grid place-items-center">
                  <span className="font-display text-[120px] font-light tracking-[0.1em] text-ink-900/15 dark:text-pearl-0/15">
                    IK
                  </span>
                </div>
              </motion.div>
              {/* Caption */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <span className="label-eyebrow text-[10px] text-ink-600 dark:text-silver">
                  Portrait · 2024
                </span>
                <span className="h-px w-10 bg-ink-900/30 dark:bg-pearl-0/30" />
              </div>
            </div>
          </motion.div>

          {/* Editorial copy */}
          <div className="lg:col-span-7 lg:pl-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease: easeCinematic }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="label-eyebrow text-gold-500 dark:text-gold-300">03 — Leadership</span>
              <span className="h-px w-12 bg-gold-400/60" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease: easeCinematic, delay: 0.1 }}
              className="font-display text-5xl lg:text-7xl font-light leading-[1.02] tracking-tight text-ink-900 dark:text-pearl-0"
            >
              Ismail Khan
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease: easeCinematic, delay: 0.2 }}
              className="mt-4 font-sans text-sm uppercase tracking-[0.22em] text-silver-dark dark:text-silver"
            >
              Founder &amp; Senior Software Engineer
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease: easeCinematic, delay: 0.3 }}
              className="mt-10 space-y-6 font-sans text-base lg:text-lg leading-relaxed text-ink-700 dark:text-silver max-w-xl"
            >
              <p>
                Driving the vision behind the Skipgrey ecosystem. Merging engineering discipline
                with creative entrepreneurship to build brands that matter.
              </p>
              <p className="text-ink-500 dark:text-silver-dark">
                {/* Reserved for expanded biographical detail. */}
                With a background spanning systems engineering and brand craft, his approach treats
                every venture as an architectural problem — one solved through clarity, restraint,
                and a refusal to compromise on the essentials.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, ease: easeCinematic, delay: 0.45 }}
              className="mt-12 flex items-center gap-4"
            >
              <span className="h-px w-8 bg-gold-400/60" />
              <a
                href="#contact"
                className="font-sans text-[12px] tracking-[0.18em] uppercase text-gold-600 dark:text-gold-300 border-b border-gold-400/40 pb-1 transition-colors duration-300 hover:border-gold-400"
              >
                Correspond with the founder
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
