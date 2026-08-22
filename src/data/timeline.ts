import type { TimelineEntry } from '@/types';

/**
 * Timeline data — education, organizations, experiences.
 * Ordered chronologically (earliest first) for orbital path rendering.
 */
export const timelineEntries: TimelineEntry[] = [
  {
    id: 'TL-01',
    date: '2019 — 2022',
    title: 'Senior High School',
    subtitle: 'Science Major',
    type: 'education',
    description: 'Focus on mathematics, physics, and basic algorithms. Participated in regional informatics olympiad.',
  },
  {
    id: 'TL-02',
    date: '2022 — PRESENT',
    title: 'Informatics Engineering',
    subtitle: 'Undergraduate Degree',
    type: 'education',
    description: 'Specializing in cybersecurity and software engineering. Current GPA 3.8/4.0. Active in multiple technical student organizations.',
  },
  {
    id: 'TL-03',
    date: '2023 — 2024',
    title: 'Security Research Group',
    subtitle: 'Member',
    type: 'organization',
    description: 'Conducted weekly vulnerable machine walk-throughs (HackTheBox, TryHackMe) and participated in national CTF competitions.',
  },
  {
    id: 'TL-04',
    date: '2024',
    title: 'Community Service (KKN)',
    subtitle: 'Lead Developer',
    type: 'experience',
    description: 'Designed and deployed a full-stack digital asset management system for local village administration. Reduced manual processing time by 40%.',
  },
  {
    id: 'TL-05',
    date: '2024 — PRESENT',
    title: 'Thesis Research',
    subtitle: 'Purple Team Framework',
    type: 'achievement',
    description: 'Developing a reproducible framework for purple team exercises in medium-sized organizations. Combining offensive tactics with defensive telemetry.',
  },
];
