import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { easeCinematic } from '@/lib/motion';

const VENTURE_LINKS = [
  { label: 'Skipgrey Academy', href: 'https://academy.skipgrey.com' },
  { label: 'Skipgrey Fashion House', href: 'https://fashion.skipgrey.com' },
  { label: 'Skipgrey Software Studio', href: 'https://studio.skipgrey.com' },
  { label: 'Skipgrey Print & Media', href: 'https://print.skipgrey.com' },
];

const COMPANY_LINKS = [
  { label: 'Ventures', href: '#ventures' },
  { label: 'Our Vision', href: '#philosophy' },
  { label: 'Founder', href: '#founder' },
  { label: 'Contact', href: '#contact' },
];

const LEGAL_LINKS = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Cookies', href: '#' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
    window.setTimeout(() => setSubmitted(false), 3200);
  };

  return (
    <footer id="contact" className="relative bg-ink-900 dark:bg-ink-0 text-pearl-0">
      {/* Top hairline */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-silver/30 to-transparent" />

      {/* Newsletter band */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32 border-b border-ink-700">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: easeCinematic }}
            className="lg:col-span-7"
          >
            <span className="label-eyebrow text-gold-300/90">Skipgrey Insights</span>
            <h2 className="mt-5 font-display text-4xl lg:text-5xl font-light leading-[1.05] tracking-tight text-balance">
              Occasional dispatches on building, craft, and the long view.
            </h2>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: easeCinematic, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <label htmlFor="newsletter" className="block font-sans text-[11px] uppercase tracking-[0.22em] text-silver/70 mb-4">
              Subscribe to Skipgrey Insights
            </label>
            <div className="relative flex items-center border-b border-ink-600 focus-within:border-pearl-0 transition-colors duration-500">
              <input
                id="newsletter"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-transparent py-3 pr-12 font-sans text-base text-pearl-0 placeholder:text-silver/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-0 grid h-9 w-9 place-items-center text-gold-300 hover:text-gold-200 transition-colors duration-300"
              >
                <motion.span
                  key={submitted ? 'ok' : 'arrow'}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: easeCinematic }}
                >
                  {submitted ? <Check className="h-5 w-5" strokeWidth={1.25} /> : <ArrowRight className="h-5 w-5" strokeWidth={1.25} />}
                </motion.span>
              </button>
            </div>
            <p className="mt-3 font-sans text-[11px] text-silver/50">
              {submitted ? 'Thank you — you are on the list.' : 'No noise. Unsubscribe anytime.'}
            </p>
          </motion.form>
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-4">
            <a href="#top" className="font-display text-2xl font-medium tracking-[0.28em] text-pearl-0">
              SKIPGREY
            </a>
            <p className="mt-5 max-w-xs font-sans text-sm leading-relaxed text-silver/70">
              A multi-disciplinary holding company building enduring ventures across education,
              apparel, software, and physical media.
            </p>
          </div>

          {/* Ventures */}
          <div className="lg:col-span-3 lg:col-start-6">
            <h3 className="label-eyebrow text-silver/60 mb-5">Ventures</h3>
            <ul className="space-y-3">
              {VENTURE_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="font-sans text-sm text-silver hover:text-pearl-0 transition-colors duration-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="label-eyebrow text-silver/60 mb-5">Company</h3>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="font-sans text-sm text-silver hover:text-pearl-0 transition-colors duration-300">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h3 className="label-eyebrow text-silver/60 mb-5">Legal</h3>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="font-sans text-sm text-silver hover:text-pearl-0 transition-colors duration-300">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-ink-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-sans text-[11px] tracking-[0.08em] text-silver/50">
            © {new Date().getFullYear()} Skipgrey Holding. All rights reserved.
          </p>
          <p className="font-sans text-[11px] tracking-[0.08em] text-silver/40">
            skipgrey.com
          </p>
        </div>
      </div>
    </footer>
  );
}
