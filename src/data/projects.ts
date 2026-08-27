import type { Project } from '@/types';

/**
 * Project catalog data — Real Software Engineering projects
 * 
 * Based on actual work:
 * - UMKM Desa Marketplace
 * - SIMANTAP (Academic Management)
 * - Community Service projects
 * - Personal projects
 */
export const projects: Project[] = [
  {
    slug: 'umkm-desa-marketplace',
    designation: '01',
    title: 'UMKM Desa Marketplace',
    sector: 'Full-Stack Development',
    magnitude: 'Major',
    status: 'Completed',
    description: 'A comprehensive e-commerce platform built for local village businesses (UMKM). Features product catalog management, order processing, payment integration, and admin dashboard. Deployed during community service program.',
    techStack: ['Laravel', 'MySQL', 'Tailwind CSS', 'JavaScript', 'Blade'],
    links: { 
      github: 'https://github.com/nuryanfa/umkm-desa',
      live: '#'
    },
    featured: true,
    highlights: [
      'Reduced manual order processing time by 40%',
      'Implemented secure payment gateway integration',
      'Built responsive admin dashboard for inventory management',
      'Deployed on shared hosting with optimized performance'
    ]
  },
  {
    slug: 'simantap',
    designation: '02',
    title: 'SIMANTAP',
    sector: 'Academic Management System',
    magnitude: 'Core',
    status: 'In Progress',
    description: 'Academic supervision and thesis management platform for university. Handles guidance scheduling, proposal submissions, seminar registration, and thesis defense workflows.',
    techStack: ['Laravel', 'PostgreSQL', 'Vue.js', 'Tailwind CSS', 'Inertia.js'],
    links: {
      github: '#',
    },
    featured: true,
    highlights: [
      'Role-based access control for students, advisors, and administrators',
      'Automated email notifications for schedule updates',
      'Document upload and version management',
      'Real-time status tracking for thesis progress'
    ]
  },
  {
    slug: 'portfolio-website',
    designation: '03',
    title: 'Personal Portfolio',
    sector: 'Frontend Development',
    magnitude: 'Minor',
    status: 'Completed',
    description: 'Modern, anime-inspired portfolio website built with React and TypeScript. Features smooth animations, editorial design, and pixel art accents.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Anime.js', 'Vite'],
    links: {
      github: 'https://github.com/nuryanfa/webporto-swe',
      live: 'https://nuryanfa.dev'
    },
    featured: false,
    highlights: [
      'Cinematic entrance animations using Anime.js',
      'Smooth scroll with Lenis',
      'Fully responsive and accessible',
      'Optimized performance with code splitting'
    ]
  },
  {
    slug: 'security-toolkit',
    designation: '04',
    title: 'Security Analysis Toolkit',
    sector: 'Security Engineering',
    magnitude: 'Minor',
    status: 'In Progress',
    description: 'Collection of Python scripts for network analysis, vulnerability scanning, and log parsing. Built for learning and security research purposes.',
    techStack: ['Python', 'Scapy', 'Nmap', 'Elasticsearch'],
    links: {
      github: '#'
    },
    featured: false,
    highlights: [
      'Automated port scanning and service detection',
      'Log aggregation and parsing',
      'Network packet analysis tools',
      'RESTful API for integration'
    ]
  },
];
