import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { easeCinematic } from '@/lib/motion';

export interface Venture {
  index: string;
  name: string;
  domain?: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
  /** grid placement: column span / row span for asymmetric layout */
  className: string;
}

interface VentureCardProps {
  venture: Venture;
  onHover: (name: string | null) => void;
  hovered: string | null;
}

export function VentureCard({ venture, onHover, hovered }: VentureCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  // Magnetic tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 150,
    damping: 20,
  });

  const isDimmed = hovered !== null && hovered !== venture.name;

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
    onHover(null);
  };

  return (
    <motion.a
      ref={ref}
      href={venture.domain ? `https://${venture.domain}` : '#ventures'}
      target={venture.domain ? '_blank' : undefined}
      rel={venture.domain ? 'noreferrer' : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(venture.name)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: easeCinematic }}
      className={`group glass-sweep relative flex ${venture.className} flex-col justify-between overflow-hidden rounded-2xl border border-pearl-200/70 dark:border-ink-700/70 bg-pearl-50/60 dark:bg-ink-800/50 p-8 lg:p-10 transition-all duration-700 ease-cinematic ${
        isDimmed ? 'opacity-40 scale-[0.985]' : 'opacity-100'
      } hover:border-ink-900/30 dark:hover:border-pearl-0/30 hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]`}
    >
      {/* Top */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-pearl-300 dark:border-ink-600 text-gold-500 dark:text-gold-300 transition-colors duration-500 group-hover:border-gold-400 group-hover:bg-gold-400 group-hover:text-ink-900 dark:group-hover:text-ink-900">
            {venture.icon}
          </span>
          <span className="label-eyebrow text-[10px]">{venture.index}</span>
        </div>
      </div>

      {/* Middle */}
      <div className="relative z-10 mt-10">
        <h3 className="font-display text-3xl lg:text-4xl font-light tracking-tight text-ink-900 dark:text-pearl-0">
          {venture.name}
        </h3>
        <p className="mt-3 font-sans text-[13px] uppercase tracking-[0.18em] text-silver-dark dark:text-silver">
          {venture.subtitle}
        </p>
        <p className="mt-5 max-w-md font-sans text-sm leading-relaxed text-ink-600 dark:text-silver-dark">
          {venture.description}
        </p>
      </div>

      {/* Bottom */}
      <div className="relative z-10 mt-10 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 font-sans text-[12px] tracking-[0.16em] uppercase text-gold-600 dark:text-gold-300">
          <span className="relative">
            Explore Venture
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-400 transition-all duration-500 ease-cinematic group-hover:w-full" />
          </span>
          <ArrowUpRight
            className="h-4 w-4 text-gold-500 dark:text-gold-300 transition-transform duration-500 ease-cinematic group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.25}
          />
        </span>
        {venture.domain && (
          // <span className="font-sans text-[11px] tracking-[0.08em] text-silver-dark dark:text-ink-500">
          //   {venture.domain}
          // </span>
          <span className="font-sans text-[11px] tracking-[0.08em] text-[#858079] dark:text-[#9f9991]">
            {venture.domain}
          </span>
        )}
      </div>

      {/* Soft corner glow on hover */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-gold-300/20 dark:bg-gold-400/10 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
    </motion.a>
  );
}
