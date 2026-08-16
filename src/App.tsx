import { useState } from 'react';
import { AmbientBackground } from '@/components/AmbientBackground';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Ventures } from '@/components/Ventures';
import { Stats } from '@/components/Stats';
import { Founder } from '@/components/Founder';
import { Timeline } from '@/components/Timeline';
import { Contact } from '@/components/Contact';
import { ContactModal } from '@/components/ContactModal';
import { Footer } from '@/components/Footer';
import { useTheme } from '@/hooks/useTheme';

export default function App() {
  const { theme, toggle } = useTheme();
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <Navbar theme={theme} onToggleTheme={toggle} onContact={() => setContactOpen(true)} />

      <main>
        <Hero />
        <Ventures />
        <Stats />
        <Founder />
        <Timeline />
        <Contact />
      </main>

      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
