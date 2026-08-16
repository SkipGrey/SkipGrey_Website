import { motion } from 'framer-motion';
import { easeCinematic } from '@/lib/motion';

/**
 * Animated abstract line pattern — flowing, layered diagonal strokes
 * that drift slowly. Pure SVG for crispness at any scale.
 */
export function LinePattern({ className = '' }: { className?: string }) {
  const lines = Array.from({ length: 14 });
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="lineFade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke="url(#lineFade)" strokeWidth="1">
          {lines.map((_, i) => {
            const y = 60 + i * 60;
            return (
              <motion.path
                key={i}
                d={`M -200 ${y} C 300 ${y - 120}, 700 ${y + 140}, 1640 ${y - 60}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.6, 0.3] }}
                transition={{
                  duration: 6 + (i % 4),
                  ease: easeCinematic,
                  delay: i * 0.18,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
