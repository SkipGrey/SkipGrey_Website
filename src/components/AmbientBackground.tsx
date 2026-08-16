import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Ambient background: floating mesh-gradient orbs over a subtle grid.
 * Orbs gently follow the pointer for an interactive, living backdrop.
 */
export function AmbientBackground() {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const sx = useSpring(mx, { stiffness: 40, damping: 20, mass: 1.2 });
  const sy = useSpring(my, { stiffness: 40, damping: 20, mass: 1.2 });

  const orb1X = useTransform(sx, [0, 1], ['-8%', '12%']);
  const orb1Y = useTransform(sy, [0, 1], ['-6%', '10%']);
  const orb2X = useTransform(sx, [0, 1], ['8%', '-12%']);
  const orb2Y = useTransform(sy, [0, 1], ['6%', '-8%']);
  const orb3X = useTransform(sx, [0, 1], ['0%', '-6%']);
  const orb3Y = useTransform(sy, [0, 1], ['0%', '8%']);

  function onMove(e: React.PointerEvent) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    mx.set(e.clientX / w);
    my.set(e.clientY / h);
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      onPointerMove={onMove}
      aria-hidden
    >
      <div className="absolute inset-0 bg-grid mask-fade-b opacity-70" />

      <motion.div
        style={{ x: orb1X, y: orb1Y }}
        className="absolute -left-[10%] top-[2%] h-[42rem] w-[42rem] rounded-full blur-[120px]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{ background: 'radial-gradient(circle, var(--orb-1), transparent 70%)' }}
        />
      </motion.div>

      <motion.div
        style={{ x: orb2X, y: orb2Y }}
        className="absolute right-[-10%] top-[18%] h-[38rem] w-[38rem] rounded-full blur-[120px]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{ background: 'radial-gradient(circle, var(--orb-2), transparent 70%)' }}
        />
      </motion.div>

      <motion.div
        style={{ x: orb3X, y: orb3Y }}
        className="absolute bottom-[-15%] left-[30%] h-[44rem] w-[44rem] rounded-full blur-[130px]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{ background: 'radial-gradient(circle, var(--orb-3), transparent 70%)' }}
        />
      </motion.div>

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, transparent 40%, var(--bg) 92%)',
        }}
      />
    </div>
  );
}
