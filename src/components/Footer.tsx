import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Logo } from './Logo';
import { ventures } from '@/data/content';
import { supabase } from '@/lib/supabase';

const linkColumns = [
  {
    title: 'Company',
    links: [
      { label: 'Ecosystem Vision', id: 'vision' },
      { label: 'Founder / Leadership', id: 'founder' },
      { label: 'Live Stats', id: 'stats' },
      { label: 'Contact', id: 'contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Engineering Blog', href: 'https://media.skipgrey.com' },
      { label: 'Academy Curriculum', href: 'https://academy.skipgrey.com' },
      { label: 'Studio Engagement', href: 'https://studio.skipgrey.com' },
      { label: 'Insights & Blog', id: 'insights' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', id: 'legal' },
      { label: 'Terms of Service', id: 'legal' },
      { label: 'Cookie Policy', id: 'legal' },
      { label: 'Venture Partnerships', id: 'contact' },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'loading') return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setError('Enter a valid email address.');
      return;
    }
    setStatus('loading');
    setError('');
    const { error: dbError } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: email.trim() });
    if (dbError) {
      // Unique constraint = already subscribed — treat as success
      if (dbError.code === '23505') {
        setStatus('success');
        setEmail('');
        return;
      }
      setStatus('error');
      setError('Could not subscribe. Please try again.');
      return;
    }
    setStatus('success');
    setEmail('');
  }

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="relative border-t pt-16">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          {/* Brand + newsletter */}
          <div className="lg:pr-6">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              A multidisciplinary holding collective building across software, education,
              apparel, and media.
            </p>

            <form onSubmit={subscribe} className="mt-6 max-w-sm">
              <p className="text-xs font-medium uppercase tracking-wider text-faint">
                Skipgrey Group releases
              </p>
              <div className="mt-2 flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-soft)] px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--text-faint)] focus:border-brand-indigo focus:outline-none focus:ring-2 focus:ring-brand-indigo/20"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary shrink-0 px-4 disabled:opacity-70"
                >
                  {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Subscribe'}
                </button>
              </div>
              <AnimatePresence>
                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 flex items-center gap-1.5 text-xs text-emerald-500"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    You&rsquo;re on the list.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 flex items-center gap-1.5 text-xs text-red-500"
                  >
                    <AlertCircle className="h-3.5 w-3.5" />
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Ventures column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-faint">Ventures</p>
            <ul className="mt-4 space-y-2.5">
              {ventures.map((v) => (
                <li key={v.id}>
                  <a
                    href={v.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-[var(--text)]"
                  >
                    {v.name.replace('Skipgrey ', '')}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Other columns */}
          {linkColumns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-wider text-faint">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-muted transition-colors hover:text-[var(--text)]"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <button
                        onClick={() => link.id && go(link.id)}
                        className="text-sm text-muted transition-colors hover:text-[var(--text)]"
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t py-6 sm:flex-row">
          <p className="text-xs text-faint">© 2026 Skipgrey Group. All rights reserved.</p>
          <span className="flex items-center gap-2 text-xs text-muted">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ boxShadow: '0 0 8px 1px rgba(16,185,129,0.6)' }}
            />
            All Systems Operational
          </span>
        </div>
      </div>
    </footer>
  );
}
