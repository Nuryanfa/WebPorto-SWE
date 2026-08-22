import type { Project } from '@/types';

/**
 * Project catalog data — placeholder entries.
 * Replace with real project data when ready.
 * 
 * Designation numbers are meaningful:
 * - Sequential order = priority/chronology
 * - SECTOR = skill category
 * - MAGNITUDE = scale/complexity of project
 * - STATUS = current state
 */
export const projects: Project[] = [
  {
    slug: 'purple-team-framework',
    designation: 'OBJ-01',
    title: 'Purple Team Exercise Framework',
    sector: 'Network Defense',
    magnitude: 'Core',
    status: 'In Progress',
    description: 'A structured framework for conducting and measuring purple team operations, integrating offensive techniques with defensive telemetry.',
    techStack: ['TypeScript', 'Node.js', 'PostgreSQL'],
    links: { github: '#' },
    featured: true,
  },
  {
    slug: 'zero-trust-proxy',
    designation: 'OBJ-02',
    title: 'Zero-Trust Access Proxy',
    sector: 'Infrastructure',
    magnitude: 'Major',
    status: 'Completed',
    description: 'Identity-aware proxy system implementing zero-trust principles for internal tooling.',
    techStack: ['Go', 'Docker', 'OAuth2'],
    links: { github: '#' },
    featured: false,
  },
  {
    slug: 'threat-intel-aggregator',
    designation: 'OBJ-03',
    title: 'Threat Intel Aggregator',
    sector: 'Security Operations',
    magnitude: 'Minor',
    status: 'Completed',
    description: 'Automated pipeline for aggregating, normalizing, and scoring IOCs from multiple threat intelligence feeds.',
    techStack: ['Python', 'Elasticsearch', 'Kibana'],
    links: { github: '#' },
    featured: false,
  },
];
