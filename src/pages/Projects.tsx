import { ProjectCatalog } from '@/components/sections/ProjectCatalog';

/**
 * Projects page — full catalog of all projects.
 */
export default function Projects() {
  return (
    <div className="pt-[var(--nav-height)]">
      <section className="section-spacing">
        <div className="container-observatory">
          <div className="font-mono text-sm tracking-widest text-[var(--text-faint)] mb-4">
            [ MENU: QUEST LOG ]
          </div>

          <div>
            <h1
              className="text-[var(--accent-cyan)] mb-3 font-display glitch uppercase"
              style={{ fontSize: 'var(--text-2xl)' }}
              data-text="Quest Log"
            >
              Quest Log
            </h1>
            <p className="text-[var(--text-secondary)] mb-4 normal-case font-mono tracking-wider">
              Records of completed missions, current objectives, and side quests.
            </p>
          </div>
        </div>
      </section>

      <ProjectCatalog />
    </div>
  );
}
