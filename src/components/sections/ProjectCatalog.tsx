import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { projects } from '@/data/projects';
import { ExternalLink, GitBranch, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectCatalogProps {
  showViewAll?: boolean;
}

/**
 * Projects — Editorial Asymmetric Layout
 * Removes mission board/terminal aesthetic
 * Uses varied project card compositions with sophisticated interactions
 */
export function ProjectCatalog({ showViewAll = false }: ProjectCatalogProps) {
  const displayProjects = showViewAll ? projects.slice(0, 3) : projects;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'var(--accent-acid)';
      case 'Completed': return 'var(--accent-secondary)';
      default: return 'var(--accent-violet)';
    }
  };

  return (
    <section id="projects" className="section-spacing relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-[var(--accent-primary)] opacity-5 blur-3xl rounded-full" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[var(--accent-violet)] opacity-5 blur-3xl rounded-full" />

      <div className="container-observatory relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 pixel-decoration bg-[var(--accent-primary)]" />
            <span className="font-mono text-xs md:text-sm text-[var(--accent-primary)] uppercase tracking-widest">
              Selected Work
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-4">
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-[var(--text-primary)] leading-tight max-w-2xl">
              Things I've
              <span className="block bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
                Built
              </span>
            </h2>

            <p className="text-[var(--text-secondary)] text-lg max-w-md">
              A collection of projects showcasing full-stack development, system design, and creative problem-solving.
            </p>
          </div>
        </motion.div>

        {/* Projects Grid - Asymmetric Editorial Layout */}
        <div className="space-y-12 lg:space-y-20">
          {displayProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            const statusColor = getStatusColor(project.status);

            return (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                  isEven ? '' : 'lg:direction-rtl'
                }`}
              >
                {/* Project Visual/Number - Takes up 5 columns */}
                <div className={`lg:col-span-5 ${isEven ? '' : 'lg:col-start-8'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative aspect-[4/3] bg-[var(--bg-elevated)] border border-white/5 rounded-xl overflow-hidden group-hover:border-white/10 transition-colors"
                  >
                    {/* Large designation number as visual element */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.span
                        className="font-display font-bold text-[12rem] md:text-[16rem] opacity-10 group-hover:opacity-20 transition-opacity"
                        style={{ color: statusColor }}
                      >
                        {project.designation}
                      </motion.span>
                    </div>

                    {/* Overlay with tech stack */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-[var(--bg-base)]/80 backdrop-blur-sm border border-white/10 rounded-md text-xs font-mono text-[var(--text-secondary)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Status indicator */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-[var(--bg-base)]/80 backdrop-blur-sm border border-white/10 rounded-full">
                      <motion.div
                        className="w-2 h-2 rounded-full pixel-decoration"
                        style={{ backgroundColor: statusColor }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-xs font-mono" style={{ color: statusColor }}>
                        {project.status}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Project Info - Takes up 7 columns */}
                <div className={`lg:col-span-7 ${isEven ? '' : 'lg:col-start-1 lg:row-start-1 lg:text-right'} space-y-4`}>
                  {/* Designation & Sector */}
                  <div className={`flex items-center gap-3 ${isEven ? '' : 'lg:justify-end'}`}>
                    <span 
                      className="font-mono text-sm font-bold"
                      style={{ color: statusColor }}
                    >
                      {project.designation}
                    </span>
                    <span className="text-[var(--text-faint)]">•</span>
                    <span className="font-mono text-xs text-[var(--text-tertiary)] uppercase tracking-widest">
                      {project.sector}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-3xl md:text-4xl text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors leading-tight">
                    <Link to={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>

                  {/* Description */}
                  <p className={`text-[var(--text-secondary)] text-base md:text-lg leading-relaxed max-w-xl ${isEven ? '' : 'lg:ml-auto'}`}>
                    {project.description}
                  </p>

                  {/* Tech Stack (full list) */}
                  <div className={`flex flex-wrap gap-2 pt-2 ${isEven ? '' : 'lg:justify-end'}`}>
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-[var(--bg-elevated)] border border-white/5 rounded-md text-xs font-mono text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:border-white/10 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className={`flex items-center gap-4 pt-4 ${isEven ? '' : 'lg:justify-end'}`}>
                    <Link
                      to={`/projects/${project.slug}`}
                      className="group/link flex items-center gap-2 text-[var(--accent-primary)] font-display font-semibold hover:gap-3 transition-all"
                    >
                      View Details
                      <ArrowRight size={18} />
                    </Link>

                    {project.links?.github && project.links.github !== '#' && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <GitBranch size={20} />
                      </a>
                    )}

                    {project.links?.live && project.links.live !== '#' && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* View All CTA */}
        {showViewAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-20 text-center"
          >
            <Button href="/projects" variant="primary">
              View All Projects
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
