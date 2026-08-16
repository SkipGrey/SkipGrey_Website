import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Linkedin, Github, Twitter, Mail, Quote, Cpu, Building2 } from 'lucide-react';
import { useRef } from 'react';
import { SectionHeading } from './primitives';

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com', icon: Github },
  { label: 'X / Twitter', href: 'https://x.com', icon: Twitter },
  { label: 'Email', href: 'mailto:hello@skipgrey.com', icon: Mail },
];

export function Founder() {
  return (
    <section id="founder" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Founder / Leadership"
          title={
            <>
              The architect behind <span className="text-gradient">the ecosystem.</span>
            </>
          }
          description="Skipgrey is built and led by a senior backend engineer turned venture builder — engineering discipline applied to brand creation."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_1.4fr]">
          <FounderAvatar />
          <FounderContent />
        </div>
      </div>
    </section>
  );
}

function FounderAvatar() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 150, damping: 18 });
  const sy = useSpring(my, { stiffness: 150, damping: 18 });
  const rotateX = useTransform(sy, [0, 1], [10, -10]);
  const rotateY = useTransform(sx, [0, 1], [-10, 10]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => { mx.set(0.5); my.set(0.5); }}
      className="relative overflow-hidden rounded-3xl glass p-8"
    >
      {/* Glowing border ring */}
      <motion.div
        className="absolute -inset-px rounded-3xl opacity-60"
        style={{
          background:
            'conic-gradient(from 0deg, #6366F1, #06B6D4, #8B5CF6, #6366F1)',
          filter: 'blur(8px)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
      />
      <div className="relative flex flex-col items-center rounded-[1.4rem] bg-[var(--bg-elev)] p-8">
        {/* Avatar placeholder with gradient + initials */}
        <div className="relative flex h-36 w-36 items-center justify-center rounded-full">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 180deg, #6366F1, #06B6D4, #8B5CF6, #6366F1)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-[3px] rounded-full bg-[var(--bg-elev)]" />
          <div className="absolute inset-[3px] flex items-center justify-center rounded-full">
            <span className="font-display text-4xl font-bold text-gradient">IK</span>
          </div>
          <motion.span
            className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand-cyan text-white"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            style={{ boxShadow: '0 0 18px 2px rgba(6,182,212,0.6)' }}
          >
            <Cpu className="h-3.5 w-3.5" />
          </motion.span>
        </div>

        <h3 className="mt-5 font-display text-xl font-semibold">Ismail Khan</h3>
        <p className="mt-1 text-sm text-muted">Founder</p>
        <span className="chip surface-soft mt-3 text-faint">
          <Building2 className="h-3 w-3" />
          Senior Software Engineer
        </span>

        <div className="mt-6 grid w-full grid-cols-2 gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full surface-soft px-3 py-2 text-xs font-medium text-muted transition-colors hover:text-[var(--text)]"
            >
              <s.icon className="h-3.5 w-3.5" />
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function FounderContent() {
  return (
    <div className="flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl surface p-7"
      >
        <h4 className="font-display text-lg font-semibold">Senior Software Engineer &amp; Venture Builder</h4>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          Senior Backend Engineer with a deep passion for scalable architecture, systems
          engineering, and brand building. Founded Skipgrey as an umbrella ecosystem to unite
          deep-tech software solutions, real-world tech education, and modern consumer products
          under one cohesive vision.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { k: 'Focus', v: 'Distributed Systems' },
            { k: 'Stack', v: 'JVM · Cloud · Microservices' },
            { k: 'Mandate', v: 'Build · Teach · Ship' },
          ].map((row) => (
            <div key={row.k} className="rounded-xl surface-soft p-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-faint">{row.k}</p>
              <p className="mt-1 text-sm font-medium">{row.v}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.blockquote
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative overflow-hidden rounded-2xl glass p-7"
      >
        <Quote className="absolute -right-3 -top-3 h-20 w-20 text-brand-indigo opacity-10" />
        <p className="relative font-display text-xl font-medium leading-relaxed tracking-tight sm:text-2xl">
          &ldquo;We don&rsquo;t separate engineering discipline from creative
          entrepreneurship&mdash;we build both.&rdquo;
        </p>
        <footer className="relative mt-4 text-sm text-faint">— Ismail Khan, Founder</footer>
      </motion.blockquote>
    </div>
  );
}
