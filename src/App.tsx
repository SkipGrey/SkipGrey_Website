import { motion, useScroll, useSpring } from 'framer-motion';
import { ThemeProvider } from '@/context/ThemeContext';
import { Navbar } from '@/components/Navbar';
import { CinematicHero } from '@/components/CinematicHero';
import { Ventures } from '@/components/Ventures';
import { Founder } from '@/components/Founder';
import { Philosophy } from '@/components/Philosophy';
import { Footer } from '@/components/Footer';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-px origin-left bg-ink-900 dark:bg-pearl-0"
    />
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-pearl-0 dark:bg-ink-900 transition-colors duration-700 ease-cinematic">
        <ScrollProgress />
        <Navbar />
        <main>
          <CinematicHero />
          <Ventures />
          <Philosophy />
          <Founder />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
