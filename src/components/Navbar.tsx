import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Code2,
  Shirt,
  PenTool,
  Printer,
  ChevronDown,
  Menu,
  X,
  ArrowUpRight,
  Compass,
  Users,
  Newspaper,
  Briefcase,
} from 'lucide-react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { ventures } from '@/data/content';
import type { Theme } from '@/data/content';

const ventureIcons = { GraduationCap, Code2, Shirt, PenTool, Printer };

const navLinks = [
  { id: 'ventures', label: 'Ventures', hasMega: true },
  { id: 'vision', label: 'Ecosystem Vision', icon: Compass },
  { id: 'founder', label: 'Founder / Leadership', icon: Users },
  { id: 'insights', label: 'Insights & Blog', icon: Newspaper },
  { id: 'careers', label: 'Careers', icon: Briefcase },
];

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
  onContact: () => void;
}

export function Navbar({ theme, onToggleTheme, onContact }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!megaOpen) return;
    const onDown = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [megaOpen]);

  const go = (id: string) => {
    setMobileOpen(false);
    setMegaOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass border-b' : 'border-b border-transparent'
        }`}
      >
        <nav className="container-page flex h-16 items-center justify-between gap-4">
          <Logo onClick={() => go('hero')} />

          {/* Center nav */}
          <div className="hidden items-center gap-1 lg:flex" ref={megaRef}>
            {navLinks.map((link) =>
              link.hasMega ? (
                <div key={link.id} className="relative">
                  <button
                    onClick={() => setMegaOpen((v) => !v)}
                    onMouseEnter={() => setMegaOpen(true)}
                    className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:text-[var(--text)]"
                  >
                    {link.label}
                    <motion.span animate={{ rotate: megaOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        onMouseLeave={() => setMegaOpen(false)}
                        className="absolute left-1/2 top-[calc(100%+10px)] w-[44rem] -translate-x-1/2 rounded-2xl glass p-3 shadow-card"
                        style={{ transform: 'translateX(-50%)' }}
                      >
                        <div className="grid grid-cols-2 gap-1.5">
                          {ventures.map((v) => {
                            const Icon = ventureIcons[v.icon as keyof typeof ventureIcons];
                            const accentColor =
                              v.accent === 'cyan' ? '#06B6D4' : v.accent === 'violet' ? '#8B5CF6' : '#6366F1';
                            return (
                              <a
                                key={v.id}
                                href={v.href}
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => setMegaOpen(false)}
                                className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-[var(--bg-soft)]"
                              >
                                <span
                                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                                  style={{ background: `${accentColor}1a`, color: accentColor }}
                                >
                                  <Icon className="h-4.5 w-4.5" />
                                </span>
                                <span className="min-w-0">
                                  <span className="flex items-center gap-1.5 text-sm font-semibold">
                                    {v.name}
                                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                                  </span>
                                  <span className="mt-0.5 block truncate text-xs text-faint">{v.tag}</span>
                                </span>
                              </a>
                            );
                          })}
                        </div>
                        <button
                          onClick={() => go('ventures')}
                          className="mt-2 flex w-full items-center justify-between rounded-xl border border-[var(--border)] px-3 py-2.5 text-xs font-medium text-muted transition-colors hover:text-[var(--text)]"
                        >
                          Explore the full ventures matrix
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  key={link.id}
                  onClick={() => go(link.id)}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:text-[var(--text)]"
                >
                  {link.label}
                </button>
              )
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button onClick={onContact} className="btn-primary hidden sm:inline-flex">
              Get in Touch
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg surface lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 360, damping: 36 }}
              className="fixed right-0 top-0 z-[61] flex h-full w-[82%] max-w-sm flex-col surface lg:hidden"
            >
              <div className="flex items-center justify-between border-b px-5 py-4">
                <Logo onClick={() => go('hero')} />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg surface-soft"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-1 overflow-y-auto p-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => go(link.id)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium text-muted transition-colors hover:bg-[var(--bg-soft)] hover:text-[var(--text)]"
                  >
                    {link.label}
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </button>
                ))}
              </div>
              <div className="mt-auto border-t p-4">
                <button onClick={() => { setMobileOpen(false); onContact(); }} className="btn-primary w-full">
                  Get in Touch
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
