import { FocusPullReveal } from '@/components/motion/FocusPullReveal';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

/**
 * About Preview — "Observation Log Entry" (PRD §6.2)
 * 
 * Displayed as an observation log entry with eyebrow label.
 * Key phrases highlighted in accent-nebula.
 */
export function AboutPreview() {
  return (
    <section id="about-preview" className="section-spacing">
      <div className="container-observatory">
        <div className="w-full max-w-[680px] px-4 md:px-0 relative">

          {/* Glass panel — gradient fade, no hard border */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: '-3rem -3rem -4rem -2rem',
              background: 'radial-gradient(ellipse at 20% 40%, rgba(8,10,18,0.82) 40%, rgba(8,10,18,0.4) 75%, transparent 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              zIndex: -1,
              borderRadius: '0 40% 40% 0 / 0 60% 60% 0',
            }}
          />

          <FocusPullReveal>
            <SectionEyebrow index="01" label="ABOUT" />
          </FocusPullReveal>

          <FocusPullReveal delay={0.1}>
            {/* Log entry eyebrow */}
            <div
              className="font-mono text-[10px] tracking-[0.3em] uppercase mb-8 flex items-center gap-3"
              style={{ color: 'var(--accent-nebula)' }}
            >
              <span>◈</span>
              <span>ENTRY_001</span>
              <span style={{ color: 'var(--line-hairline-strong)' }}>——</span>
              <span style={{ color: 'var(--text-faint)' }}>OBSERVATION LOG</span>
            </div>
          </FocusPullReveal>

          <FocusPullReveal delay={0.2}>
            <p
              className="leading-[1.85] mb-6"
              style={{
                fontSize: 'clamp(1.05rem, 0.95rem + 0.5vw, 1.25rem)',
                color: 'var(--text-star)',
                fontWeight: 300,
                maxWidth: '60ch',
              }}
            >
              Informatics Engineering undergraduate with a deep focus on{' '}
              <span
                style={{
                  color: 'var(--accent-nebula)',
                  fontWeight: 600,
                  borderBottom: '1px solid rgba(124,111,240,0.35)',
                  paddingBottom: '1px',
                }}
              >
                cybersecurity
              </span>{' '}
              and{' '}
              <span
                style={{
                  color: 'var(--accent-nebula)',
                  fontWeight: 600,
                  borderBottom: '1px solid rgba(124,111,240,0.35)',
                  paddingBottom: '1px',
                }}
              >
                network defense
              </span>
              . Currently developing a Purple Team Exercise Framework as thesis
              research — bridging the gap between offensive and defensive security
              operations through structured, repeatable assessments.
            </p>
          </FocusPullReveal>

          <FocusPullReveal delay={0.3}>
            <p
              className="leading-[1.75] mb-12"
              style={{
                fontSize: 'clamp(0.875rem, 0.825rem + 0.25vw, 1rem)',
                color: 'var(--text-dim)',
                maxWidth: '58ch',
              }}
            >
              Beyond security, experienced in building web applications,
              administering network infrastructure, and working with containerized
              environments. Driven by the belief that understanding how systems
              break is the foundation for building systems that hold.
            </p>
          </FocusPullReveal>

          {/* Avatar signature */}
          <FocusPullReveal delay={0.4}>
            <div className="flex items-center gap-5">
              <div
                className="w-14 h-14 flex items-center justify-center font-bold text-sm"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--accent-nebula)',
                  border: '1px solid var(--accent-nebula)',
                  background: 'var(--accent-nebula-dim)',
                  clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                }}
                aria-label="Nur Yanfa initials"
              >
                NY
              </div>
              <div>
                <div
                  className="mb-1"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text-star)',
                  }}
                >
                  Nur Yanfa
                </div>
                <div
                  className="font-mono text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: 'var(--text-faint)' }}
                >
                  SECTOR: APPLIED SECURITY
                </div>
              </div>
            </div>
          </FocusPullReveal>
        </div>
      </div>
    </section>
  );
}
