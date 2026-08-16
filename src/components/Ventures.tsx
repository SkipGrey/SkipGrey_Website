import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Code2,
  Shirt,
  PenTool,
  Printer,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { ventures } from '@/data/content';
import type { Venture } from '@/data/content';
import { SectionHeading } from './primitives';

const icons: Record<string, LucideIcon> = {
  GraduationCap,
  Code2,
  Shirt,
  PenTool,
  Printer,
};

const accentHex: Record<Venture['accent'], string> = {
  indigo: '#6366F1',
  cyan: '#06B6D4',
  violet: '#8B5CF6',
};

const statusStyles: Record<Venture['status'], string> = {
  Live: 'text-emerald-500',
  Expanding: 'text-brand-cyan',
  Beta: 'text-amber-500',
};

const filters = ['All', 'Live', 'Expanding', 'Beta'] as const;
type Filter = (typeof filters)[number];

export function Ventures() {
  const [filter, setFilter] = useState<Filter>('All');
  const list = filter === 'All' ? ventures : ventures.filter((v) => v.status === filter);

  return (
    <section id="ventures" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="The Ventures Matrix"
          title={
            <>
              One ecosystem.
              <br className="hidden sm:block" /> <span className="text-gradient">Five operating verticals.</span>
            </>
          }
          description="Each subsidiary is built to production-grade standards — independently useful, collectively compounding."
        />

        {/* Filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === f ? 'text-white' : 'text-muted hover:text-[var(--text)]'
              }`}
            >
              {filter === f && (
                <motion.span
                  layoutId="vent-filter"
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'linear-gradient(110deg, #6366F1, #8B5CF6)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((v) => (
              <VentureCard key={v.id} venture={v} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function VentureCard({ venture }: { venture: Venture }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 200, damping: 20 });
  const sy = useSpring(my, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(sy, [0, 1], [8, -8]);
  const rotateY = useTransform(sx, [0, 1], [-8, 8]);

  // Spotlight position
  const glowX = useTransform(sx, [0, 1], ['0%', '100%']);
  const glowY = useTransform(sy, [0, 1], ['0%', '100%']);
  const accent = accentHex[venture.accent];
  const Icon = icons[venture.icon] ?? Code2;

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.a
      ref={ref}
      href={venture.href}
      target="_blank"
      rel="noreferrer"
      layout
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl surface p-6 shadow-card transition-shadow hover:shadow-glow"
    >
      {/* Mouse-follow glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(360px circle at ${x} ${y}, ${accent}22, transparent 60%)`
          ),
        }}
      />

      <div className="relative flex items-center justify-between">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ background: `${accent}1f`, color: accent }}
        >
          <Icon className="h-5 w-5" />
        </span>
        <span className={`chip surface-soft ${statusStyles[venture.status]}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {venture.status}
        </span>
      </div>

      <div className="relative mt-5 flex-1">
        <h3 className="font-display text-lg font-semibold tracking-tight">{venture.name}</h3>
        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-faint">
          {venture.tag}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{venture.description}</p>
      </div>

      <div className="relative mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4">
        <span className="font-mono text-[11px] text-faint">
          {venture.href.replace('https://', '')}
        </span>
        <span
          className="flex items-center gap-1 text-sm font-semibold transition-colors"
          style={{ color: accent }}
        >
          {venture.cta}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </motion.a>
  );
}
