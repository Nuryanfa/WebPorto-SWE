import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FocusPullReveal } from '@/components/motion/FocusPullReveal';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { Panel } from '@/components/ui/Panel';
import { DesignationLabel } from '@/components/ui/DesignationLabel';
import { Button } from '@/components/ui/Button';
import { projects } from '@/data/projects';
import { staggerContainer, slideUp } from '@/lib/motionVariants';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTilt3D } from '@/hooks/useTilt3D';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCatalogProps {
  /** Show only featured projects (for landing page preview) */
  featuredOnly?: boolean;
  /** Show "View All" button at bottom */
  showViewAll?: boolean;
}

/**
 * Project Catalog — "Catalog Entries" (PRD §6.4)
 * 
 * Each project is a catalog entry with designation number,
 * sector, magnitude, and status — all in consistent format.
 * Featured projects highlighted with accent-solar.
 */
export function ProjectCatalog({
  featuredOnly = false,
  showViewAll = false,
}: ProjectCatalogProps) {
  const prefersReduced = useReducedMotion();

  const displayProjects = featuredOnly
    ? projects.filter((p) => p.featured)
    : projects;

  return (
    <section id="projects" className="section-spacing">
      <div className="container-observatory">
        <div className="relative max-w-xl mb-12">
          {/* Glass panel — gradient fade */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: '-3rem -2rem -3rem -2rem',
              background: 'radial-gradient(ellipse at 20% 50%, rgba(8,10,18,0.85) 40%, rgba(8,10,18,0.4) 75%, transparent 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              zIndex: -1,
            }}
          />
          <FocusPullReveal>
            <SectionEyebrow index="03" label="PROJECTS" />
          </FocusPullReveal>

          <FocusPullReveal delay={0.1}>
            <h2
              className="font-bold uppercase mb-3"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                background: 'linear-gradient(135deg, #EDEFF7 0%, #9AA4C0 60%, #7C6FF0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Catalog Entries
            </h2>
            <p className="text-sm font-mono tracking-wider" style={{ color: 'var(--text-faint)', letterSpacing: '0.15em' }}>
              OBSERVED OBJECTS · {projects.length} ENTRIES CATALOGUED
            </p>
          </FocusPullReveal>
        </div>

        {/* Project Grid */}
        <motion.div
          variants={prefersReduced ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayProjects.map((project) => (
            <motion.div
              key={project.slug}
              variants={prefersReduced ? {} : slideUp}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All button */}
        {showViewAll && (
          <FocusPullReveal delay={0.3}>
            <div className="mt-12 text-center">
              <Button variant="ghost" href="/projects" icon>
                View Full Catalog
              </Button>
            </div>
          </FocusPullReveal>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: any }) {
  const tilt = useTilt3D();

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="block no-underline group h-full"
    >
      <motion.div
        onMouseMove={tilt.handleMouseMove}
        onMouseEnter={tilt.handleMouseEnter}
        onMouseLeave={tilt.handleMouseLeave}
        style={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
        className="h-full"
      >
        <Panel angular glow as="article" className="h-full flex flex-col">
          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-0 right-0 z-10" style={{ transform: 'translateZ(20px)' }}>
              <div className="px-3 py-1 bg-[var(--accent-solar-dim)] text-[var(--accent-solar)] font-[family-name:var(--font-mono)] text-[10px] tracking-widest uppercase">
                ★ FEATURED
              </div>
            </div>
          )}

          <div style={{ transform: 'translateZ(10px)' }} className="flex-1">
            {/* Designation + Sector */}
            <DesignationLabel
              designation={project.designation}
              sector={project.sector}
              className="mb-4"
            />

            {/* Title */}
            <h3 className="text-[var(--text-star)] text-base font-semibold tracking-wide mb-3 group-hover:text-[var(--accent-nebula)] transition-colors normal-case">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-[var(--text-dim)] mb-4 line-clamp-3 normal-case">
              {project.description}
            </p>
          </div>

          {/* Metadata row */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--line-hairline)] px-2 mt-auto" style={{ transform: 'translateZ(15px)' }}>
            <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] text-[var(--text-faint)] uppercase pl-2">
              <span>MAGNITUDE: {project.magnitude}</span>
            </div>
            <div className="flex items-center gap-1">
              <span
                className={`
                  inline-block w-1.5 h-1.5 rounded-full
                  ${project.status === 'In Progress'
                    ? 'bg-[var(--accent-solar)]'
                    : project.status === 'Completed'
                      ? 'bg-[var(--accent-nebula)]'
                      : 'bg-[var(--text-faint)]'
                  }
                `}
              />
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-wider text-[var(--text-faint)] uppercase">
                {project.status}
              </span>
            </div>
          </div>

          {/* Hover indicator */}
          <div className="absolute bottom-4 right-4 text-[var(--text-faint)] group-hover:text-[var(--accent-nebula)] transition-colors" style={{ transform: 'translateZ(20px)' }}>
            <ArrowUpRight size={16} />
          </div>
        </Panel>
      </motion.div>
    </Link>
  );
}

