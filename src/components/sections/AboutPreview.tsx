import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { primaryCapabilities } from '@/data/skills';

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

      <div className="py-8 grid grid-cols-[5rem_1fr] gap-5 items-start">

        {/* Index number — oversized, accent-coloured */}
        <div className="relative w-20 flex-shrink-0 overflow-hidden">
          <motion.span
            className="block font-display font-extrabold leading-none select-none
                       opacity-20 group-hover:opacity-40
                       transition-opacity duration-200"
            style={{
              fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
              color: cap.accent,
            }}
            variants={{
              hover: { scale: 1.05, transition: { duration: 0.2 } },
            }}
          >
            {cap.index}
          </motion.span>

          {/* Pixel dot below number */}
          <motion.span
            aria-hidden="true"
            className="absolute bottom-1 left-1 w-2 h-2 pixel-decoration"
            style={{ background: cap.accent }}
            variants={{
              hover: {
                scale: [1, 1.6, 1],
                transition: { duration: 0.35, ease: 'easeInOut' },
              },
            }}
          />
        </div>

        {/* Content */}
        <div className="space-y-2 pt-1">
          {/* Title — newline chars become separate lines via whitespace-pre-line */}
          <h3
            className="font-display font-bold leading-[1.05] tracking-tight
                       text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]
                       transition-colors duration-200 whitespace-pre-line"
            style={{ fontSize: 'clamp(1.4rem, 2vw + 0.5rem, 2rem)', color: undefined }}
          >
            {cap.title}
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
