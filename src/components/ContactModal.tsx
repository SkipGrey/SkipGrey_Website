import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle, X, Send } from 'lucide-react';
import { contactTabs } from '@/data/content';
import { supabase } from '@/lib/supabase';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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
      setError('Something went wrong. Please try again.');
      return;
    }
    setStatus('success');
    setForm({ name: '', email: '', message: '' });
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[71] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="pointer-events-auto relative w-full max-w-lg overflow-hidden rounded-2xl glass p-6 shadow-card sm:p-7"
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg surface-soft text-muted hover:text-[var(--text)]"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                Get in Touch
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold">
                Start a conversation
              </h3>

              {/* Compact tabs */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {contactTabs.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => { setTab(i); setStatus('idle'); }}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      tab === i ? 'bg-gradient-to-r from-brand-indigo to-brand-violet text-white' : 'surface-soft text-muted hover:text-[var(--text)]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <form onSubmit={onSubmit} className="mt-5 space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Name"
                    className="modal-input"
                  />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="Email"
                    className="modal-input"
                  />
                </div>
                <textarea
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder={`Tell us about it — ${active.hint}`}
                  rows={4}
                  className="modal-input resize-none"
                />

                <AnimatePresence>
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-sm text-red-500"
                    >
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button type="submit" disabled={status === 'loading'} className="btn-primary w-full disabled:opacity-70">
                  {status === 'loading' ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                  ) : (
                    <><Send className="h-4 w-4" /> Send Message</>
                  )}
                </button>

                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 rounded-xl surface-soft p-3 text-sm text-emerald-500"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Thanks — your message is in. We&rsquo;ll be in touch shortly.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              <style>{`
                .modal-input {
                  width: 100%;
                  border-radius: 0.7rem;
                  border: 1px solid var(--border);
                  background-color: var(--bg-soft);
                  padding: 0.6rem 0.85rem;
                  font-size: 0.875rem;
                  color: var(--text);
                }
                .modal-input::placeholder { color: var(--text-faint); }
                .modal-input:focus {
                  outline: none;
                  border-color: var(--accent);
                  box-shadow: 0 0 0 3px rgba(99,102,241,0.18);
                }
              `}</style>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
