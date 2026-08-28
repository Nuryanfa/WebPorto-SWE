import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { primaryCapabilities, techStack } from '@/data/skills';

/* ─────────────────────────────────────────────
   About Section — Editorial + Numbered Capabilities
   
   Layout:
     LEFT  → personal statement, philosophy
     RIGHT → numbered capability list (01 / 02 / 03)
             with large display numbers and pixel accents
   
   No SaaS feature cards.
   No fake statistics.
   ───────────────────────────────────────────── */

export function AboutPreview() {
  const [techOpen, setTechOpen] = useState(false);

  return (
    <section id="about" className="section-spacing relative overflow-hidden">

      {/* Atmospheric glow */}
      <div aria-hidden="true"
           className="absolute top-0 right-1/4 w-[500px] h-[400px]
                      bg-[radial-gradient(ellipse,rgba(139,92,246,0.07)_0%,transparent_70%)]
                      pointer-events-none" />

      <div className="container-observatory relative z-10">

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="section-label text-[var(--accent-primary)]">
            About Me
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-start">

          {/* ════════════════════════
              LEFT — Personal statement
              ════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Headline */}
            <h2 className="font-display font-extrabold leading-[1.0] tracking-tight
                           text-[var(--text-primary)]"
                style={{ fontSize: 'clamp(2.6rem, 5vw + 1rem, 4.5rem)' }}>
              A Software
              <span className="block text-[var(--accent-primary)]">Engineer</span>
              who builds things.
            </h2>

            {/* Bio paragraphs */}
            <div className="space-y-4 text-[var(--text-secondary)] leading-[1.8]"
                 style={{ fontSize: 'clamp(0.95rem, 0.9rem + 0.2vw, 1.05rem)' }}>
              <p className="max-w-[48ch]">
                I'm <strong className="text-[var(--text-primary)] font-semibold">
                  Muhamad Nur Yanfa
                </strong> — a Software Engineer focused on building reliable,
                well-designed systems that solve real problems.
              </p>
              <p className="max-w-[48ch]">
                My work sits at the intersection of full-stack development and
                security engineering. I care about how software is architected,
                not just how it looks on the surface.
              </p>
              <p className="max-w-[48ch]">
                Currently finishing my degree in Informatics Engineering while
                building web applications, contributing to security research,
                and sharpening my understanding of system design.
              </p>
            </div>

            {/* Engineering philosophy pill */}
            <div className="inline-flex items-center gap-3 px-4 py-2
                            bg-[var(--bg-elevated)] border border-white/8 rounded-sm">
              <span className="w-2 h-2 pixel-decoration bg-[var(--accent-acid)]" />
              <span className="font-mono text-xs text-[var(--text-tertiary)] tracking-wide">
                Clean code · Thoughtful design · Continuous learning
              </span>
            </div>

            {/* CTA */}
            <div>
              <Button href="/about" variant="ghost" arrow>
                Full background
              </Button>
            </div>
          </motion.div>

          {/* ════════════════════════
              RIGHT — Numbered capabilities
              ════════════════════════ */}
          <div className="space-y-0">
            {primaryCapabilities.map((cap, i) => (
              <CapabilityRow key={cap.index} cap={cap} delay={i * 0.12} />
            ))}
          </div>

        </div>

        {/* ── Inline tech stack — collapsible, visually secondary ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 pt-8 border-t border-white/5"
        >
          {/* Toggle row */}
          <button
            onClick={() => setTechOpen(v => !v)}
            className="flex items-center gap-3 text-left group mb-4 cursor-pointer bg-transparent border-none p-0"
            aria-expanded={techOpen}
          >
            {/* Pixel arrow indicator */}
            <motion.span
              animate={{ rotate: techOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="font-pixel text-[9px] text-[var(--accent-secondary)] select-none"
            >
              ▶
            </motion.span>
            <span className="font-pixel text-[9px] tracking-widest uppercase
                             text-[var(--text-faint)] group-hover:text-[var(--accent-secondary)]
                             transition-colors">
              {techOpen ? 'Hide Tech Stack' : 'View Tech Stack'}
            </span>
          </button>

          <AnimatePresence>
            {techOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-4 pb-2">
                  {techStack.map((group, gi) => (
                    <motion.div
                      key={group.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: gi * 0.05 }}
                      className="space-y-2"
                    >
                      {/* Group label */}
                      <div className="flex items-center gap-1.5">
                        <span
                          aria-hidden="true"
                          className="w-[3px] h-2.5 pixel-decoration flex-shrink-0"
                          style={{ background: group.color }}
                        />
                        <span
                          className="font-pixel text-[8px] tracking-widest uppercase"
                          style={{ color: group.color }}
                        >
                          {group.label}
                        </span>
                      </div>

                      {/* Tags inline */}
                      <div className="flex flex-wrap gap-1.5">
                        {group.tools.map((tool) => (
                          <span key={tool} className="px-tag">{tool}</span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}

/* ── Single capability row ───────────────────
   Large index number + title + description
   Separated by pixel dividers.
   ─────────────────────────────────────────── */
function CapabilityRow({
  cap,
  delay,
}: {
  cap: (typeof primaryCapabilities)[number];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover="hover"
      className="group relative"
    >
      {/* Top pixel divider */}
      <div className="px-divider" />

      <div className="py-7 grid grid-cols-[3.5rem_1fr] gap-4 items-start">

        {/* Index — small mono label, purely decorative */}
        <div className="pt-1 flex-shrink-0">
          <span
            className="block font-mono font-bold leading-none select-none
                       opacity-30 group-hover:opacity-60
                       transition-opacity duration-200"
            style={{ fontSize: '0.85rem', color: cap.accent, letterSpacing: '0.05em' }}
          >
            {cap.index}
          </span>
          <motion.span
            aria-hidden="true"
            className="mt-2 block w-2 h-2 pixel-decoration"
            style={{ background: cap.accent }}
            variants={{
              hover: { scale: [1, 1.6, 1], transition: { duration: 0.35 } },
            }}
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3
            className="font-display font-bold leading-[1.1] tracking-tight
                       text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]
                       transition-colors duration-200"
            style={{ fontSize: 'clamp(1.1rem, 1.5vw + 0.5rem, 1.5rem)' }}
          >
            {cap.title.replace('\n', ' ')}
          </h3>

          <p className="font-body text-[var(--text-tertiary)] leading-relaxed max-w-[38ch]"
             style={{ fontSize: 'clamp(0.85rem, 0.8rem + 0.2vw, 0.95rem)' }}>
            {cap.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
