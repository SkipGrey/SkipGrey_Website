import { motion } from 'framer-motion';

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-2.5"
      aria-label="Skipgrey home"
    >
      <span className="relative flex h-8 w-8 items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-lg"
          style={{
            background:
              'conic-gradient(from 0deg, #6366F1, #06B6D4, #8B5CF6, #6366F1)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
        <span className="absolute inset-[1.5px] rounded-[7px] bg-[var(--bg)]" />
        <span className="relative h-2 w-2 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.6)] dark:bg-white" />
      </span>
      <span className="font-display text-[1.05rem] font-bold tracking-tight">
        SKIP<span className="text-gradient">GREY</span>
      </span>
      <span className="hidden items-center gap-1 rounded-full border border-[var(--border)] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-faint sm:inline-flex">
        <motion.span
          className="h-1 w-1 rounded-full bg-brand-cyan"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        Ecosystem
      </span>
    </button>
  );
}
