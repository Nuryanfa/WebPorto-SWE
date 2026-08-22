import { FocusPullReveal } from '@/components/motion/FocusPullReveal';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { ProjectCatalog } from '@/components/sections/ProjectCatalog';

/**
 * Projects page — full catalog of all projects.
 */
export default function Projects() {
  return (
    <div className="pt-[var(--nav-height)]">
      <section className="section-spacing">
        <div className="container-observatory">
          <FocusPullReveal>
            <SectionEyebrow index="03" label="CATALOG" />
          </FocusPullReveal>

          <FocusPullReveal delay={0.1}>
            <h1
              className="text-[var(--text-star)] mb-3"
              style={{ fontSize: 'var(--text-2xl)' }}
            >
              Full Catalog
            </h1>
            <p className="text-[var(--text-dim)] mb-4 normal-case">
              Complete registry of observed objects — projects, research, and contributions.
            </p>
          </FocusPullReveal>
        </div>
      </section>

      <ProjectCatalog />
    </div>
  );
}
