export type Theme = 'dark' | 'light';

export type VentureStatus = 'Live' | 'Expanding' | 'Beta';

export interface Venture {
  id: string;
  name: string;
  tag: string;
  status: VentureStatus;
  description: string;
  cta: string;
  href: string;
  icon: string;
  accent: 'indigo' | 'cyan' | 'violet';
}

export const ventures: Venture[] = [
  {
    id: 'academy',
    name: 'Skipgrey Academy',
    tag: 'Technical Education & Mentorship',
    status: 'Live',
    description:
      'Bridging academic theory and industry engineering. Intensive practical training in Java, Spring Boot, System Design, and Backend Architecture for BSc IT/CS students.',
    cta: 'Launch Academy',
    href: 'https://academy.skipgrey.com',
    icon: 'GraduationCap',
    accent: 'cyan',
  },
  {
    id: 'studio',
    name: 'Skipgrey Studio & Software Labs',
    tag: 'Engineering & Enterprise Solutions',
    status: 'Live',
    description:
      'High-throughput distributed systems, microservices, cloud infrastructure, and bespoke software development for ambitious startups and businesses.',
    cta: 'Explore Studio',
    href: 'https://studio.skipgrey.com',
    icon: 'Code2',
    accent: 'indigo',
  },
  {
    id: 'wear',
    name: 'Skipgrey Wear / Apparel',
    tag: 'Fashion & Modern Streetwear',
    status: 'Expanding',
    description:
      'Minimalist, tech-inspired contemporary apparel and lifestyle collections tailored for builders and creators.',
    cta: 'View Collection',
    href: 'https://wear.skipgrey.com',
    icon: 'Shirt',
    accent: 'violet',
  },
  {
    id: 'media',
    name: 'Skipgrey Media & Editorial',
    tag: 'Engineering Blog & Deep Dives',
    status: 'Live',
    description:
      'In-depth technical essays on JVM internals, scalable architecture, product engineering, and business insights.',
    cta: 'Read Publications',
    href: 'https://media.skipgrey.com',
    icon: 'PenTool',
    accent: 'indigo',
  },
  {
    id: 'print',
    name: 'Skipgrey Print & Document Solutions',
    tag: 'Production & Physical Assets',
    status: 'Beta',
    description:
      'On-demand high-volume print, documentation, and asset publishing infrastructure supporting local operations and education cohorts.',
    cta: 'Request Print Services',
    href: 'https://print.skipgrey.com',
    icon: 'Printer',
    accent: 'cyan',
  },
];

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
  description: string;
}

export const stats: Stat[] = [
  { label: 'Active Subsidiaries', value: '4', suffix: '+', description: 'Independent ventures across software, education, apparel, and media.' },
  { label: 'Bootstrapped & Driven', value: '100', suffix: '%', description: 'Independent by design. No external capital dictating the roadmap.' },
  { label: 'Uptime & Delivery SLA', value: '99', suffix: '.9%', description: 'Production-grade rigor applied to every venture we ship.' },
  { label: 'End-to-End Execution', value: '360', suffix: '°', description: 'From architecture to apparel — full-stack venture building.' },
];

export interface TimelineNode {
  phase: string;
  title: string;
  year: string;
  description: string;
}

export const timeline: TimelineNode[] = [
  {
    phase: 'Origin',
    title: 'Software Engineering Roots',
    year: '2019 — 2021',
    description:
      'Founded as a solo backend engineering practice — building distributed systems, JVM services, and cloud infrastructure for early-stage startups.',
  },
  {
    phase: 'Expansion',
    title: 'Studio & Software Labs',
    year: '2021 — 2022',
    description:
      'Formalized the software studio to take on production-grade engagements: microservices, system design, and enterprise consulting under one roof.',
  },
  {
    phase: 'Education',
    title: 'Skipgrey Academy Launch',
    year: '2022 — 2023',
    description:
      'Launched an industry-aligned academy bridging the gap between university curricula and real-world engineering for BSc IT/CS students.',
  },
  {
    phase: 'Lifestyle',
    title: 'Wear & Media Verticals',
    year: '2023 — 2025',
    description:
      'Expanded into modern apparel and an engineering editorial. Skipgrey became a lifestyle brand for builders, not just a software house.',
  },
  {
    phase: 'Ecosystem',
    title: 'Integrated Venture Hub',
    year: '2025 →',
    description:
      'Today Skipgrey operates as a unified holding collective — software, education, apparel, media, and print, orchestrated as one ecosystem.',
  },
];

export interface ContactTab {
  id: string;
  label: string;
  subject: string;
  hint: string;
}

export const contactTabs: ContactTab[] = [
  { id: 'general', label: 'General Inquiries', subject: 'General inquiry', hint: 'Anything about the Skipgrey ecosystem.' },
  { id: 'software', label: 'Software Consulting', subject: 'Software development consulting', hint: 'Distributed systems, microservices, cloud architecture.' },
  { id: 'academy', label: 'Academy Enrollment', subject: 'Academy enrollment', hint: 'Cohort details, curriculum, and admissions.' },
  { id: 'apparel', label: 'Apparel Collaboration', subject: 'Apparel collaboration', hint: 'Partnerships, custom drops, and brand collaborations.' },
];
