import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { contactTabs } from '@/data/content';
import { supabase } from '@/lib/supabase';
import { SectionHeading } from './primitives';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function Contact() {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const active = contactTabs[tab];

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'loading') return;

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error');
      setError('Please fill in all fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus('error');
      setError('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setError('');
    const { error: dbError } = await supabase.from('contact_submissions').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      category: active.id,
      subject: active.subject,
      message: form.message.trim(),
    });

    if (dbError) {
      setStatus('error');
      setError('Something went wrong sending your message. Please try again.');
      return;
    }
    setStatus('success');
    setForm({ name: '', email: '', message: '' });
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Contact & Venture Partnership"
          title={
            <>
              Let&rsquo;s build something <span className="text-gradient">enduring.</span>
            </>
          }
          description="Pick the track that fits — general inquiries, software consulting, academy enrollment, or apparel collaboration."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left: tabs + info */}
          <div className="flex flex-col gap-3">
            {contactTabs.map((t, i) => (
              <button
                key={t.id}
                onClick={() => { setTab(i); setStatus('idle'); }}
                className={`relative overflow-hidden rounded-2xl p-5 text-left transition-colors ${
                  tab === i ? 'text-[var(--text)]' : 'surface text-muted hover:text-[var(--text)]'
                }`}
              >
                {tab === i && (
                  <motion.span
                    layoutId="contact-tab"
                    className="absolute inset-0 rounded-2xl glass"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <div className="relative">
                  <p className="font-display text-base font-semibold">{t.label}</p>
                  <p className="mt-1 text-sm text-faint">{t.hint}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Right: form card */}
          <div className="relative overflow-hidden rounded-2xl surface p-7 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                  {active.subject}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold">{active.label}</h3>
              </motion.div>
            </AnimatePresence>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Your name"
                    className="form-input"
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="you@company.com"
                    className="form-input"
                  />
                </Field>
              </div>
              <Field label="Category">
                <select
                  value={active.id}
                  onChange={(e) => {
                    const idx = contactTabs.findIndex((t) => t.id === e.target.value);
                    if (idx >= 0) { setTab(idx); setStatus('idle'); }
                  }}
                  className="form-input"
                >
                  {contactTabs.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Message">
                <textarea
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder="Tell us about your project, question, or collaboration…"
                  rows={5}
                  className="form-input resize-none"
                />
              </Field>

              <AnimatePresence>
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 text-sm text-red-500"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full disabled:opacity-70"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-xl surface-soft p-3 text-sm text-emerald-500"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Thanks — your message is in. We&rsquo;ll get back to you shortly.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--border);
          background-color: var(--bg-soft);
          padding: 0.7rem 0.9rem;
          font-size: 0.875rem;
          color: var(--text);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input::placeholder { color: var(--text-faint); }
        .form-input:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.18);
        }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-faint">
        {label}
      </span>
      {children}
    </label>
  );
}
