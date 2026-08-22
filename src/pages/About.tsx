import { FocusPullReveal } from '@/components/motion/FocusPullReveal';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { OrbitalSkills } from '@/components/sections/OrbitalSkills';
import { Timeline } from '@/components/sections/Timeline';

/**
 * About page — full profile, orbital skills, timeline.
 */
export default function About() {
  return (
    <div className="pt-[var(--nav-height)]">
      {/* About Header */}
      <section className="section-spacing">
        <div className="container-observatory max-w-3xl">
          <FocusPullReveal>
            <SectionEyebrow index="01" label="ABOUT" />
          </FocusPullReveal>

          <FocusPullReveal delay={0.1}>
            <h1
              className="text-[var(--text-star)] mb-6"
              style={{ fontSize: 'var(--text-2xl)' }}
            >
              Observer Profile
            </h1>
          </FocusPullReveal>

          {/* Avatar + Identity */}
          <FocusPullReveal delay={0.2}>
            <div className="flex items-start gap-6 mb-10">
              {/* Geometric avatar placeholder */}
              <div
                className="w-20 h-20 flex items-center justify-center font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--accent-nebula)] border border-[var(--accent-nebula)] [clip-path:var(--clip-angular)] flex-shrink-0"
                style={{ backgroundColor: 'var(--accent-nebula-dim)' }}
                aria-label="Nur Yanfa initials"
              >
                NY
              </div>
              <div>
                <h2 className="text-[var(--text-star)] text-lg mb-1 normal-case">
                  Nur Yanfa
                </h2>
                <div className="font-[family-name:var(--font-mono)] text-xs text-[var(--accent-nebula)] tracking-wider mb-2">
                  CLASSIFICATION: CYBERSECURITY &amp; SOFTWARE ENGINEER
                </div>
                <div className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-faint)] tracking-wider">
                  COORD: INDONESIA · MAGNITUDE: UNDERGRADUATE
                </div>
              </div>
            </div>
          </FocusPullReveal>

          {/* Bio paragraphs */}
          <FocusPullReveal delay={0.3}>
            <div className="space-y-6">
              <div className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] uppercase text-[var(--text-faint)]">
                LOG_ENTRY // 001 · EXTENDED OBSERVATION
              </div>

              <p className="text-[var(--text-dim)] leading-relaxed normal-case">
                Informatics Engineering undergraduate with a focused trajectory in{' '}
                <span className="text-[var(--accent-nebula)] font-medium">
                  cybersecurity
                </span>{' '}
                and{' '}
                <span className="text-[var(--accent-nebula)] font-medium">
                  network defense
                </span>
                . Currently developing a Purple Team Exercise Framework as thesis
                research — a structured approach to bridging offensive and defensive
                security operations through repeatable, measurable assessments.
              </p>

              <p className="text-[var(--text-dim)] leading-relaxed normal-case">
                The core belief driving this work: understanding how systems break is the
                prerequisite for building systems that hold. This applies equally to network
                infrastructure, application security, and software architecture.
              </p>

              <p className="text-[var(--text-dim)] leading-relaxed normal-case">
                Beyond the security domain, experienced in web application development,
                network administration, containerized environments, and database systems.
                Approaching each discipline with the same methodical precision — mapping
                the problem space before engineering solutions.
              </p>
            </div>
          </FocusPullReveal>
        </div>
      </section>

      {/* Full Orbital Skills Diagram */}
      <OrbitalSkills />

      {/* Full Timeline */}
      <Timeline />
    </div>
  );
}
