import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles, Compass, Users } from 'lucide-react';

export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // Pointer parallax for the headline block
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const tiltX = useTransform(sy, [0, 1], [6, -6]);
  const tiltY = useTransform(sx, [0, 1], [-6, 6]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
    >
      {/* Floating accent orbs local to hero */}
      <motion.div
        className="pointer-events-none absolute left-[8%] top-[24%] h-2 w-2 rounded-full bg-brand-cyan"
        animate={{ y: [0, -40, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ boxShadow: '0 0 20px 4px rgba(6,182,212,0.6)' }}
      />
      <motion.div
        className="pointer-events-none absolute right-[14%] top-[32%] h-1.5 w-1.5 rounded-full bg-brand-violet"
        animate={{ y: [0, 30, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{ boxShadow: '0 0 18px 4px rgba(139,92,246,0.6)' }}
      />
      <motion.div
        className="pointer-events-none absolute right-[28%] bottom-[20%] h-1.5 w-1.5 rounded-full bg-brand-indigo"
        animate={{ y: [0, -26, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        style={{ boxShadow: '0 0 18px 4px rgba(99,102,241,0.6)' }}
      />

      <div className="container-page w-full">
        <motion.div
          style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1000 }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="chip glass mx-auto inline-flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-semibold normal-case tracking-normal"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-cyan" />
            <span className="text-muted">
              The Skipgrey Ecosystem
              <span className="mx-1.5 text-faint">•</span>
              Building the Future of Tech &amp; Lifestyle
            </span>
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-brand-indigo"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-[4.5rem]"
          >
            A Modern House of Brands System
            <br />
            <span className="text-gradient">Crafting Enduring Brands.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Skipgrey is a multidisciplinary holding collective building at the intersection of
            enterprise software, technical education, modern apparel, and high-impact media.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <button onClick={() => scrollTo('ventures')} className="btn-primary">
              <Compass className="h-4 w-4" />
              Explore Our Ventures
            </button>
            <button onClick={() => scrollTo('founder')} className="btn-ghost">
              <Users className="h-4 w-4" />
              Meet the Founder
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.button
          onClick={() => scrollTo('ventures')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-faint sm:flex"
          aria-label="Scroll to ventures"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <ArrowDown className="h-4 w-4" />
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}
