import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { stats } from '@/data/content';
import { SectionHeading } from './primitives';

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="stats" className="relative py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Live Ecosystem Stats"
          title={<>The collective, <span className="text-gradient">by the numbers.</span></>}
          align="center"
        />
        <div ref={ref} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl surface p-6 text-center"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-indigo to-transparent opacity-60" />
              <Counter value={s.value} suffix={s.suffix} inView={inView} />
              <p className="mt-1 text-sm font-semibold">{s.label}</p>
              <p className="mt-2 text-xs leading-relaxed text-faint">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ value, suffix, inView }: { value: string; suffix?: string; inView: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 70, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView) return;
    const target = parseFloat(value);
    if (Number.isNaN(target)) {
      // non-numeric value (e.g. "Production-Grade") — render directly
      return;
    }
    const controls = animate(motionVal, target, { duration: 1.4, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [inView, value, motionVal]);

  const isNumeric = !Number.isNaN(parseFloat(value));

  return (
    <div className="font-display text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
      {isNumeric ? (
        <>
          <motion.span ref={ref}>{display}</motion.span>
          {suffix}
        </>
      ) : (
        <span>{value}</span>
      )}
    </div>
  );
}
