import type { SkillCategory } from '@/types';

/**
 * Orbital Skills Data
 * 
 * orbitDistance: 1 = closest to center (most core skill), higher = outer orbit
 * size: relative planet size (1-5), proportional to skill depth
 * 
 * The metaphor: the owner is the "sun" at center.
 * Skills orbit around — closer = more central to identity.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'security',
    label: 'Security',
    orbitIndex: 1,
    angle: 45,
    color: 'var(--accent-nebula)',
    skills: [
      { name: 'Penetration Testing', level: 85 },
      { name: 'Network Security', level: 90 },
      { name: 'SIEM & Log Analysis', level: 75 },
      { name: 'Incident Response', level: 70 },
      { name: 'MITRE ATT&CK', level: 80 },
      { name: 'Vulnerability Assessment', level: 85 },
    ],
  },
  {
    id: 'networking',
    label: 'Networking',
    orbitIndex: 2,
    angle: 200,
    color: 'var(--accent-nebula)',
    skills: [
      { name: 'TCP/IP & OSI Model', level: 90 },
      { name: 'Routing & Switching', level: 80 },
      { name: 'Firewall Configuration', level: 75 },
      { name: 'Wireshark / Packet Analysis', level: 85 },
      { name: 'VPN & Tunneling', level: 70 },
    ],
  },
  {
    id: 'development',
    label: 'Development',
    orbitIndex: 3,
    angle: 290,
    color: 'var(--accent-nebula)',
    skills: [
      { name: 'React / TypeScript', level: 75 },
      { name: 'Python', level: 80 },
      { name: 'Node.js', level: 65 },
      { name: 'SQL / Database', level: 70 },
      { name: 'Docker', level: 60 },
      { name: 'Git & CI/CD', level: 75 },
    ],
  },
];
