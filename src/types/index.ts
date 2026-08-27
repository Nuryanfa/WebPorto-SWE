/* ── Project Types ── */
export interface Project {
  slug: string;
  designation: string;        // e.g., "01", "02" (simplified from OBJ-01)
  title: string;
  sector: string;             // e.g., "Full-Stack Development", "Frontend Development"
  magnitude: string;          // e.g., "Major", "Core", "Minor"
  status: 'Completed' | 'In Progress' | 'Planned';
  description: string;
  longDescription?: string;
  techStack: string[];
  links?: {
    github?: string;
    live?: string;
    docs?: string;
  };
  featured?: boolean;
  highlights?: string[];      // Key achievements/features
}

/* ── Skill Types (Orbital Diagram) ── */
export interface Skill {
  name: string;
  level: number;              // 0-100, affects representation
}

export interface SkillCategory {
  id: string;
  label: string;
  orbitIndex: 1 | 2 | 3;      // 1 = 180px, 2 = 280px, 3 = 360px
  angle: number;              // degrees (0-360)
  color: string;              // CSS color for planet
  skills: Skill[];
}

/* ── Timeline Types ── */
export interface TimelineEntry {
  id: string;
  date: string;               // e.g., "2022 — 2026"
  title: string;
  subtitle: string;
  type: 'education' | 'organization' | 'experience' | 'achievement';
  description?: string;
}

/* ── Navigation Types ── */
export interface NavLink {
  label: string;
  href: string;
  isRoute?: boolean;          // true = react-router link, false = anchor
}
