import { type Variants } from 'framer-motion';

export const easeCinematic = [0.22, 1, 0.36, 1] as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeCinematic },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.1, ease: easeCinematic } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

export const letterReveal: Variants = {
  hidden: { opacity: 0, y: '0.7em', filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: '0em',
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: easeCinematic },
  },
};

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: '0.5em' },
  visible: {
    opacity: 1,
    y: '0em',
    transition: { duration: 0.8, ease: easeCinematic },
  },
};
