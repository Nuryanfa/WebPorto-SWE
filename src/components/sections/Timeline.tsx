import { motion } from 'motion/react';
import { FocusPullReveal } from '@/components/motion/FocusPullReveal';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { timelineEntries } from '@/data/timeline';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Timeline — "Orbital Path" (PRD §6.5)
 * 
 * Curved path with dots at each event, mimicking an orbital trajectory.
 * Scroll-triggered path-draw animation.
 */
export function Timeline() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="timeline" className="section-spacing overflow-hidden">
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
            <SectionEyebrow index="04" label="TRAJECTORY" />
          </FocusPullReveal>

          <FocusPullReveal delay={0.1}>
            <h2
              className="font-bold uppercase mb-3"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                background: 'linear-gradient(135deg, #EDEFF7 0%, #9AA4C0 60%, #F2A65A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Orbital Path
            </h2>
            <p className="text-sm font-mono tracking-wider" style={{ color: 'var(--text-faint)', letterSpacing: '0.15em' }}>
              TRAJECTORY LOG · {timelineEntries.length} WAYPOINTS RECORDED
            </p>
          </FocusPullReveal>
        </div>

        {/* Timeline */}
        <div className="relative max-w-2xl mx-auto">
          {/* Curved orbital path */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-20 pointer-events-none">
            <svg
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <motion.path
                d="M 50 0 C 80 20, 20 40, 50 50 C 80 60, 20 80, 50 100"
                stroke="var(--line-hairline-strong)"
                strokeWidth="1.5"
                fill="none"
                vectorEffect="non-scaling-stroke"
                initial={prefersReduced ? { pathLength: 1 } : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Timeline entries */}
          <div className="space-y-12">
            {timelineEntries.map((entry, i) => (
              <FocusPullReveal key={entry.id} delay={i * 0.1}>
                <div className="relative flex">
                  {/* Left column (dot wrapper) */}
                  <div className="w-16 md:w-20 shrink-0 flex justify-center relative">
                    {/* Dot */}
                    <div
                      className={`
                        absolute top-1 z-10
                        w-3 h-3 rounded-full border-2
                        ${entry.type === 'achievement'
                          ? 'bg-[var(--accent-solar)] border-[var(--accent-solar)]'
                          : entry.type === 'education'
                            ? 'bg-[var(--accent-nebula)] border-[var(--accent-nebula)]'
                            : 'bg-[var(--bg-elevated)] border-[var(--text-faint)]'
                        }
                      `}
                    />
                  </div>

                  {/* Right column (content) */}
                  <div className="flex-1 pb-6 pl-4 md:pl-6">
                    <div className="bg-[var(--bg-panel)]/60 backdrop-blur-md border border-[var(--line-hairline)] rounded-xl p-6 shadow-xl transition-all hover:bg-[var(--bg-panel)]/80">
                      {/* Date */}
                      <div className="font-mono text-xs tracking-wider text-[var(--text-faint)] mb-1 uppercase">
                        {entry.date}
                      </div>

                      {/* Title */}
                      <h4 className="text-[var(--text-star)] text-base font-semibold tracking-wide mb-1 normal-case">
                        {entry.title}
                      </h4>

                      {/* Subtitle */}
                      <div className="font-mono text-xs text-[var(--accent-nebula)] tracking-wider mb-3">
                        {entry.subtitle}
                      </div>

                      {/* Description */}
                      {entry.description && (
                        <p className="text-sm text-[var(--text-dim)] normal-case">
                      {entry.description}
                    </p>
                  )}

                  {/* Type badge */}
                  <div className="mt-2">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase text-[var(--text-faint)] border border-[var(--line-hairline)]">
                      {entry.type}
                    </span>
                  </div>
                    </div>
                  </div>
                </div>
              </FocusPullReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
