import { useParams, Link } from 'react-router-dom';
import { FocusPullReveal } from '@/components/motion/FocusPullReveal';
import { DesignationLabel } from '@/components/ui/DesignationLabel';
import { Panel } from '@/components/ui/Panel';
import { Button } from '@/components/ui/Button';
import { projects } from '@/data/projects';
import { ArrowLeft, ExternalLink, Code2, FileText } from 'lucide-react';

/**
 * Project Detail — individual catalog entry case study.
 */
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="pt-[var(--nav-height)] section-spacing">
        <div className="container-observatory text-center">
          <div className="font-[family-name:var(--font-mono)] text-xs tracking-[0.25em] text-[var(--text-faint)] mb-6 uppercase">
            ERROR · OBJECT NOT FOUND
          </div>
          <h1
            className="text-[var(--text-star)] mb-6"
            style={{ fontSize: 'var(--text-2xl)' }}
          >
            Signal Lost
          </h1>
          <p className="text-[var(--text-dim)] mb-8">
            The requested catalog entry could not be located in the registry.
          </p>
          <Button variant="solid" href="/projects">
            Return to Catalog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[var(--nav-height)]">
      <section className="section-spacing">
        <div className="container-observatory max-w-3xl">
          {/* Back link */}
          <FocusPullReveal>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-[var(--text-faint)] hover:text-[var(--accent-nebula)] transition-colors text-sm mb-8 no-underline"
            >
              <ArrowLeft size={14} />
              <span className="font-[family-name:var(--font-mono)] text-xs tracking-wider uppercase">
                Back to Catalog
              </span>
            </Link>
          </FocusPullReveal>

          {/* Designation header */}
          <FocusPullReveal delay={0.1}>
            <DesignationLabel
              designation={project.designation}
              sector={project.sector}
              className="mb-4"
            />
          </FocusPullReveal>

          <FocusPullReveal delay={0.15}>
            <h1
              className="text-[var(--text-star)] mb-4 normal-case"
              style={{ fontSize: 'var(--text-2xl)' }}
            >
              {project.title}
            </h1>
          </FocusPullReveal>

          {/* Metadata panel */}
          <FocusPullReveal delay={0.2}>
            <Panel className="mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--text-faint)] uppercase mb-1">
                    MAGNITUDE
                  </div>
                  <div className="text-sm text-[var(--text-star)]">
                    {project.magnitude}
                  </div>
                </div>
                <div>
                  <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--text-faint)] uppercase mb-1">
                    STATUS
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`
                        w-2 h-2 rounded-full
                        ${project.status === 'In Progress'
                          ? 'bg-[var(--accent-solar)]'
                          : project.status === 'Completed'
                            ? 'bg-[var(--accent-nebula)]'
                            : 'bg-[var(--text-faint)]'
                        }
                      `}
                    />
                    <span className="text-sm text-[var(--text-star)]">
                      {project.status}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--text-faint)] uppercase mb-1">
                    SECTOR
                  </div>
                  <div className="text-sm text-[var(--accent-nebula)]">
                    {project.sector}
                  </div>
                </div>
              </div>
            </Panel>
          </FocusPullReveal>

          {/* Description */}
          <FocusPullReveal delay={0.25}>
            <div className="mb-10">
              <div className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[var(--text-faint)] uppercase mb-4">
                OBSERVATION NOTES
              </div>
              <p className="text-[var(--text-dim)] leading-relaxed normal-case">
                {project.longDescription || project.description}
              </p>
            </div>
          </FocusPullReveal>

          {/* Tech Stack */}
          <FocusPullReveal delay={0.3}>
            <div className="mb-10">
              <div className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[var(--text-faint)] uppercase mb-4">
                INSTRUMENTATION
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs font-[family-name:var(--font-mono)] tracking-wider text-[var(--text-dim)] bg-[var(--bg-elevated)] border border-[var(--line-hairline)] [clip-path:var(--clip-angular-sm)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </FocusPullReveal>

          {/* Links */}
          {project.links && (
            <FocusPullReveal delay={0.35}>
              <div className="flex flex-wrap gap-4">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm text-[var(--text-dim)] hover:text-[var(--accent-nebula)] border border-[var(--line-hairline)] hover:border-[var(--accent-nebula)] transition-all no-underline"
                  >
                    <Code2 size={14} />
                    Source Code
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm text-[var(--text-dim)] hover:text-[var(--accent-nebula)] border border-[var(--line-hairline)] hover:border-[var(--accent-nebula)] transition-all no-underline"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                )}
                {project.links.docs && (
                  <a
                    href={project.links.docs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm text-[var(--text-dim)] hover:text-[var(--accent-nebula)] border border-[var(--line-hairline)] hover:border-[var(--accent-nebula)] transition-all no-underline"
                  >
                    <FileText size={14} />
                    Documentation
                  </a>
                )}
              </div>
            </FocusPullReveal>
          )}
        </div>
      </section>
    </div>
  );
}
