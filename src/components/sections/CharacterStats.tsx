import { motion } from 'motion/react';
import { techStack } from '@/data/skills';

/* ─────────────────────────────────────────────
   Tech Stack Section — Compact & Subordinate
   
   Purpose: show supporting technologies without
   overshadowing the Projects section.
   
   Visual pattern:
     - Section label (pixel font)
     - Short heading
     - One-line tagline
     - Five groups rendered as compact px-tag rows
     - No big cards, no fake percentages
   ───────────────────────────────────────────── */

export function CharacterStats() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden"
      style={{ paddingBlock: 'clamp(3rem, 8vh, 6rem)' }}
    >
      {/* Subtle background tint */}
      <div className="absolute inset-0 bg-[var(--bg-elevated)] opacity-40 pointer-events-none" />

      {/* Pixel dot grid accent — top edge */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px
                   bg-gradient-to-r from-transparent
                   via-[var(--accent-primary)]/30 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px
                   bg-gradient-to-r from-transparent
                   via-[var(--accent-secondary)]/20 to-transparent"
      />

      <div className="container-observatory relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end
                        justify-between gap-6 mb-10">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="section-label text-[var(--accent-secondary)] mb-4 block"
            >
              Tech Stack
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-[var(--text-primary)]
                         leading-tight tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 3vw + 0.5rem, 2.8rem)' }}
            >
              Tools I Work With
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-body text-[var(--text-faint)] text-sm max-w-[32ch] sm:text-right"
          >
            Supporting technologies — projects provide the real proof.
          </motion.p>
        </div>

        {/* ── Tech groups ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {techStack.map((group, gi) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: gi * 0.06,
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="space-y-3"
            >
              {/* Group label */}
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="w-[3px] h-3 pixel-decoration"
                  style={{ background: group.color }}
                />
                <span
                  className="font-pixel text-[10px] tracking-widest uppercase"
                  style={{ color: group.color }}
                >
                  {group.label}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {group.tools.map((tool, ti) => (
                  <motion.span
                    key={tool}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: gi * 0.06 + ti * 0.04 }}
                    whileHover={{ y: -2 }}
                    className="px-tag cursor-default"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 font-mono text-[11px] tracking-widest
                     text-[var(--text-faint)] text-center uppercase"
        >
          Always learning&ensp;·&ensp;Always building&ensp;·&ensp;Always improving
        </motion.p>

      </div>
    </section>
  );
}
