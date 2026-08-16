import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { easeCinematic } from '@/lib/motion';

const NAV_LINKS = [
  { label: 'Ventures', href: '#ventures' },
  { label: 'Our Vision', href: '#philosophy' },
  { label: 'Founder', href: '#founder' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: easeCinematic, delay: 0.2 }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <nav className="glass-nav">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Logo */}
            <a href="#top" className="group flex items-center" aria-label="Skipgrey home">
              <span className="font-display text-2xl lg:text-[26px] font-medium tracking-[0.28em] text-ink-900 dark:text-pearl-0">
                SKIPGREY
              </span>
              <span className="ml-2 hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-gold-400 transition-colors duration-700" />
            </a>

            {/* Center links */}
            <ul className="hidden lg:flex items-center gap-9">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="relative font-sans text-[13px] tracking-[0.08em] text-ink-700 dark:text-silver transition-colors duration-300 hover:text-ink-900 dark:hover:text-pearl-0 group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-ink-900 dark:bg-pearl-0 transition-all duration-500 ease-cinematic group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Right actions */}
            <div className="flex items-center gap-3 lg:gap-5">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="relative grid h-9 w-9 place-items-center rounded-full text-ink-700 dark:text-silver hover:text-ink-900 dark:hover:text-pearl-0 transition-colors duration-300"
              >
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -30, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: easeCinematic }}
                  className="absolute inset-0 grid place-items-center"
                >
                  {theme === 'dark' ? (
                    <Moon className="h-[18px] w-[18px]" strokeWidth={1.25} />
                  ) : (
                    <Sun className="h-[18px] w-[18px]" strokeWidth={1.25} />
                  )}
                </motion.span>
              </button>

              <a
                href="#contact"
                className="group relative inline-flex items-center rounded-full border border-ink-900/30 dark:border-pearl-0/30 px-5 py-2.5 font-sans text-[12px] tracking-[0.18em] uppercase text-ink-900 dark:text-pearl-0 overflow-hidden transition-colors duration-500"
              >
                <span className="relative z-10 transition-colors duration-500 group-hover:text-ink-900">
                  Partner with Us
                </span>
                <span className="absolute inset-0 z-0 bg-gold-300 translate-y-full transition-transform duration-500 ease-cinematic group-hover:translate-y-0" />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
