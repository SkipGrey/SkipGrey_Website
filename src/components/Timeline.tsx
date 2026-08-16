import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { timeline } from '@/data/content';
import { SectionHeading } from './primitives';

const phaseColor: Record<string, string> = {
  Origin: '#6366F1',
  Expansion: '#06B6D4',
  Education: '#8B5CF6',
  Lifestyle: '#6366F1',
  Ecosystem: '#06B6D4',
};

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 60%'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <section id="vision" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Ecosystem Vision / Roadmap"
          title={
            <>
              From software roots to an <span className="text-gradient">integrated venture hub.</span>
            </>
          }
          description="The evolution of Skipgrey — each phase compounding on the last, expanding from engineering into education, lifestyle, and a unified holding collective."
        />

        <div ref={ref} className="relative mt-14 pl-2">
          {/* Track */}
          <div className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-[var(--border)] sm:left-1/2 sm:-translate-x-1/2" />
          <motion.div
            style={{ scaleY: progress }}
            className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px origin-top sm:left-1/2 sm:-translate-x-1/2"
          >
            <div
              className="h-full w-full"
              style={{
                background: 'linear-gradient(to bottom, #6366F1, #06B6D4, #8B5CF6)',
              }}
            />
          </motion.div>

          <ol className="space-y-10">
            {timeline.map((node, i) => {
              const color = phaseColor[node.phase] ?? '#6366F1';
              const left = i % 2 === 0;
              return (
                <li key={node.title} className="relative sm:grid sm:grid-cols-2 sm:gap-8">
                  {/* Node dot */}
                  <motion.span
                    className="absolute left-0 top-1.5 z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full sm:left-1/2 sm:-translate-x-1/2"
                    style={{ boxShadow: `0 0 0 4px var(--bg), 0 0 16px 2px ${color}` }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="h-full w-full rounded-full" style={{ background: color }} />
                  </motion.span>

                  <motion.div
                    initial={{ opacity: 0, x: left ? -24 : 24, y: 8 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className={`ml-7 sm:ml-0 ${left ? 'sm:col-start-1 sm:text-right' : 'sm:col-start-2'}`}
                  >
                    <div className="rounded-2xl surface p-5 transition-shadow hover:shadow-card">
                      <div className={`flex items-center gap-2 ${left ? 'sm:justify-end' : ''}`}>
                        <span className="chip surface-soft" style={{ color }}>
                          {node.phase}
                        </span>
                        <span className="font-mono text-[11px] text-faint">{node.year}</span>
                      </div>
                      <h3 className="mt-3 font-display text-lg font-semibold">{node.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{node.description}</p>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
