import { useParams, Link } from 'react-router-dom';
import { PixelWindow } from '@/components/pixel/PixelWindow';
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
          <div className="font-mono text-xs tracking-[0.25em] text-[var(--text-faint)] mb-6 uppercase">
            [ ERROR_404 ]
          </div>
          <h1 className="text-[var(--accent-pink)] mb-6 font-display glitch" data-text="GAME OVER">
            GAME OVER
          </h1>
          <p className="text-[var(--text-secondary)] font-mono mb-8">
            The requested mission data could not be located in the save file.
          </p>
          <Button variant="solid" href="/projects" className="border-[4px] border-b-[8px] border-r-[8px] border-[var(--pixel-border-dark)] bg-[var(--accent-cyan)] text-[var(--bg-base)]">
            CONTINUE ?
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[var(--nav-height)]">
      <section className="section-spacing">
        <div className="container-observatory max-w-4xl">
          {/* Back link */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-yellow)] transition-colors text-sm mb-8 no-underline font-mono uppercase bg-[var(--bg-panel)] px-3 py-1 border-2 border-[var(--pixel-border-dark)]"
          >
            <ArrowLeft size={14} />
            <span>RETURN TO MENU</span>
          </Link>

          {/* Designation header */}
          <div className="font-mono text-[var(--accent-pink)] tracking-widest uppercase mb-2">
            [ {project.designation} ] - {project.sector}
          </div>

          <h1
            className="text-[var(--text-primary)] mb-8 uppercase font-display glitch"
            style={{ fontSize: 'var(--text-2xl)', textShadow: '4px 4px 0 var(--pixel-border-dark)' }}
            data-text={project.title}
          >
            {project.title}
          </h1>

          {/* Metadata panel */}
          <PixelWindow className="mb-10" title="MISSION_DATA.DAT">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[var(--bg-base)] p-3 border-2 border-[var(--pixel-border-dark)]">
                <div className="font-mono text-[10px] tracking-widest text-[var(--accent-cyan)] uppercase mb-2">
                  MAGNITUDE
                </div>
                <div className="text-sm text-[var(--text-primary)] uppercase font-mono">
                  {project.magnitude}
                </div>
              </div>
              <div className="bg-[var(--bg-base)] p-3 border-2 border-[var(--pixel-border-dark)]">
                <div className="font-mono text-[10px] tracking-widest text-[var(--accent-yellow)] uppercase mb-2">
                  STATUS
                </div>
                <div className="flex items-center gap-2 uppercase font-mono text-sm text-[var(--text-primary)]">
                  <span
                    className={`
                      w-2 h-2 block animate-pulse
                      ${project.status === 'In Progress'
                        ? 'bg-[var(--accent-yellow)]'
                        : project.status === 'Completed'
                          ? 'bg-[var(--accent-cyan)]'
                          : 'bg-[var(--text-faint)]'
                      }
                    `}
                  />
                  {project.status}
                </div>
              </div>
              <div className="bg-[var(--bg-base)] p-3 border-2 border-[var(--pixel-border-dark)]">
                <div className="font-mono text-[10px] tracking-widest text-[var(--accent-pink)] uppercase mb-2">
                  SECTOR
                </div>
                <div className="text-sm text-[var(--text-primary)] uppercase font-mono">
                  {project.sector}
                </div>
              </div>
            </div>
          </PixelWindow>

          {/* Description */}
          <div className="mb-12 bg-[var(--bg-panel)] border-4 border-[var(--pixel-border-light)] border-b-[var(--pixel-border-dark)] border-r-[var(--pixel-border-dark)] p-6 shadow-[4px_4px_0_var(--pixel-border-dark)]">
            <div className="font-mono text-xs tracking-widest text-[var(--accent-cyan)] uppercase mb-4 border-b-2 border-dashed border-[var(--pixel-border-light)] pb-2">
              &gt; MISSION_BRIEFING
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed font-mono whitespace-pre-wrap">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="mb-12">
            <div className="font-display text-sm tracking-widest text-[var(--accent-yellow)] uppercase mb-6">
              EQUIPPED_GEAR
            </div>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-mono tracking-wider text-[var(--text-primary)] bg-[var(--bg-elevated)] border-2 border-[var(--pixel-border-dark)] hover:bg-[var(--accent-pink)] transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {project.links && (
            <div className="flex flex-wrap gap-4 pt-6 border-t-4 border-[var(--pixel-border-dark)]">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 font-mono text-[var(--text-primary)] bg-[var(--bg-panel)] border-[4px] border-b-[8px] border-r-[8px] border-[var(--pixel-border-dark)] hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-base)] transition-none active:translate-y-1 active:border-b-[4px] active:border-r-[4px] no-underline"
                >
                  <Code2 size={16} />
                  SOURCE_CODE
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 font-mono text-[var(--text-primary)] bg-[var(--bg-panel)] border-[4px] border-b-[8px] border-r-[8px] border-[var(--pixel-border-dark)] hover:bg-[var(--accent-yellow)] hover:text-[var(--bg-base)] transition-none active:translate-y-1 active:border-b-[4px] active:border-r-[4px] no-underline"
                >
                  <ExternalLink size={16} />
                  DEPLOYMENT
                </a>
              )}
              {project.links.docs && (
                <a
                  href={project.links.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 font-mono text-[var(--text-primary)] bg-[var(--bg-panel)] border-[4px] border-b-[8px] border-r-[8px] border-[var(--pixel-border-dark)] hover:bg-[var(--accent-pink)] hover:text-[var(--bg-base)] transition-none active:translate-y-1 active:border-b-[4px] active:border-r-[4px] no-underline"
                >
                  <FileText size={16} />
                  READ_DOCS
                </a>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
