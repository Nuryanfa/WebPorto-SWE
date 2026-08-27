import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { projects } from '@/data/projects';
import { ArrowLeft, ExternalLink, GitBranch, FileText } from 'lucide-react';

/**
 * Project Detail — clean editorial case-study view.
 * Matches the new anime × pixel × editorial design language.
 */
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project   = projects.find((p) => p.slug === slug);

  /* ── 404 state ── */
  if (!project) {
    return (
      <div className="pt-[var(--nav-height)] section-spacing">
        <div className="container-observatory flex flex-col items-center text-center gap-6">
          <span className="section-label text-[var(--accent-primary)]">404</span>
          <h1 className="font-display font-extrabold text-[var(--text-primary)]"
              style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
            Project not found
          </h1>
          <p className="text-[var(--text-secondary)] max-w-sm">
            This project doesn't exist or may have been moved.
          </p>
          <Button href="/projects" variant="primary">
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  const statusColor =
    project.status === 'In Progress' ? 'var(--accent-acid)'
    : project.status === 'Completed' ? 'var(--accent-secondary)'
    : 'var(--accent-violet)';

  return (
    <div className="pt-[var(--nav-height)]">
      <article className="section-spacing">
        <div className="container-observatory max-w-4xl">

          {/* ── Back link ── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-[var(--text-tertiary)]
                         hover:text-[var(--accent-primary)] transition-colors
                         font-mono text-xs tracking-widest uppercase no-underline"
            >
              <ArrowLeft size={14} />
              All Projects
            </Link>
          </motion.div>

          {/* ── Header ── */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            {/* Designation + sector */}
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-sm font-bold"
                    style={{ color: statusColor }}>
                {project.designation}
              </span>
              <span className="text-[var(--text-faint)]">·</span>
              <span className="font-mono text-xs text-[var(--text-tertiary)]
                               uppercase tracking-widest">
                {project.sector}
              </span>
              {/* Status badge */}
              <span className="ml-auto flex items-center gap-1.5 px-3 py-1
                               bg-[var(--bg-elevated)] border border-white/8 rounded-full">
                <motion.span
                  className="w-2 h-2 rounded-full pixel-decoration"
                  style={{ background: statusColor }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-mono text-[11px]" style={{ color: statusColor }}>
                  {project.status}
                </span>
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display font-extrabold leading-[1.0] tracking-tight
                           text-[var(--text-primary)] mb-6"
                style={{ fontSize: 'clamp(2.4rem, 5vw + 1rem, 4rem)' }}>
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-[var(--text-secondary)] leading-[1.8] max-w-[60ch]"
               style={{ fontSize: 'clamp(0.95rem, 0.9rem + 0.2vw, 1.05rem)' }}>
              {project.longDescription || project.description}
            </p>
          </motion.header>

          {/* ── Pixel divider ── */}
          <div className="px-divider" />

          {/* ── Tech Stack ── */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="py-10"
            aria-label="Technology Stack"
          >
            <span className="section-label text-[var(--accent-secondary)] mb-5 block">
              Built With
            </span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-tag">{tech}</span>
              ))}
            </div>
          </motion.section>

          {/* ── Highlights ── */}
          {project.highlights && project.highlights.length > 0 && (
            <>
              <div className="px-divider" />
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="py-10"
                aria-label="Key Highlights"
              >
                <span className="section-label text-[var(--accent-primary)] mb-6 block">
                  Highlights
                </span>
                <ul className="space-y-3">
                  {project.highlights.map((hl, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.07 }}
                      className="flex items-start gap-3 text-[var(--text-secondary)]
                                 leading-relaxed"
                      style={{ fontSize: 'clamp(0.9rem, 0.85rem + 0.2vw, 1rem)' }}
                    >
                      <span className="mt-[0.35em] w-2 h-2 flex-shrink-0
                                       pixel-decoration bg-[var(--accent-primary)]" />
                      {hl}
                    </motion.li>
                  ))}
                </ul>
              </motion.section>
            </>
          )}

          {/* ── Links ── */}
          {project.links && (
            <>
              <div className="px-divider" />
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="py-10 flex flex-wrap gap-4"
                aria-label="Project Links"
              >
                {project.links.github && project.links.github !== '#' && (
                  <Button
                    href={project.links.github}
                    variant="outline"
                    external
                    arrow={false}
                  >
                    <GitBranch size={15} />
                    Source Code
                  </Button>
                )}
                {project.links.live && project.links.live !== '#' && (
                  <Button
                    href={project.links.live}
                    variant="primary"
                    external
                  >
                    <ExternalLink size={15} />
                    Live Demo
                  </Button>
                )}
                {project.links.docs && (
                  <Button
                    href={project.links.docs}
                    variant="outline"
                    external
                    arrow={false}
                  >
                    <FileText size={15} />
                    Documentation
                  </Button>
                )}
              </motion.section>
            </>
          )}

        </div>
      </article>
    </div>
  );
}
