/**
 * Skills Data — SWE-first hierarchy
 *
 * Information architecture:
 *   PRIMARY    → Software Engineering (the identity)
 *   SECONDARY  → Full-Stack Development + Cybersecurity (the two pillars)
 *   SUPPORTING → compact tech-stack grouped by domain
 *
 * The `level` field is intentionally removed — no fake percentages.
 * The `color` field uses real design tokens (no undefined --accent-nebula).
 */

export interface TechGroup {
  id:     string;
  label:  string;
  color:  string;   // CSS var from tokens.css
  tools:  string[]; // compact list, shown as px-tags
}

/** Primary capability statements — shown large in the About section */
export const primaryCapabilities = [
  {
    index: '01',
    title: 'Software\nEngineering',
    description:
      'Designing and building reliable software systems — from architecture decisions to clean, maintainable code.',
    accent: 'var(--accent-primary)',
  },
  {
    index: '02',
    title: 'Full-Stack\nDevelopment',
    description:
      'End-to-end product development covering frontend craft, backend logic, databases, and deployment.',
    accent: 'var(--accent-secondary)',
  },
  {
    index: '03',
    title: 'Security\nEngineering',
    description:
      'Applying security principles across the stack — threat modelling, penetration testing, and secure system design.',
    accent: 'var(--accent-violet)',
  },
] as const;

/** Supporting tech stack — compact, grouped, visually subordinate */
export const techStack: TechGroup[] = [
  {
    id:    'frontend',
    label: 'Frontend',
    color: 'var(--accent-primary)',
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
  },
  {
    id:    'backend',
    label: 'Backend',
    color: 'var(--accent-secondary)',
    tools: ['Laravel', 'Node.js', 'Go', 'Python'],
  },
  {
    id:    'database',
    label: 'Database',
    color: 'var(--accent-violet)',
    tools: ['MySQL', 'PostgreSQL'],
  },
  {
    id:    'devops',
    label: 'DevOps & Tools',
    color: 'var(--accent-acid)',
    tools: ['Git', 'Docker', 'Linux'],
  },
  {
    id:    'security',
    label: 'Security',
    color: 'var(--accent-crimson)',
    tools: ['Networking', 'Penetration Testing', 'Web Security'],
  },
];

/**
 * Legacy export kept so CharacterStats.tsx import doesn't break
 * until we rewrite it in this same pass.
 */
export const skillCategories = techStack.map((g) => ({
  id:         g.id,
  label:      g.label,
  orbitIndex: 1 as 1 | 2 | 3,
  angle:      0,
  color:      g.color,
  skills:     g.tools.map((name) => ({ name, level: 0 })),
}));
