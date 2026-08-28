import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';

/* ─────────────────────────────────────────────
   ProfileScene — Blueprint §11
   
   NOT "About Me + paragraph + photo".
   
   Composition:
     Left  → large editorial headline + bio
     Right → minimal metadata grid
             ROLE / INTEREST / APPROACH
   
   Scene accent: lavender (§29 profile)
   ───────────────────────────────────────────── */

const METADATA = [
  {
    label: 'ROLE',
    items: ['Software Engineer', 'Full-Stack Developer'],
    accent: 'var(--accent-lavender)',
  },
  {
    label: 'INTEREST',
    items: ['Software Systems', 'Security', 'Creative Frontend'],
    accent: 'var(--accent-lavender)',
  },
  {
    label: 'APPROACH',
    items: ['Build', 'Learn', 'Iterate'],
    accent: 'var(--accent-cyan)',
  },
] as const;

export function ProfileScene() {
  return (
    <section
      id="profile"
      data-scene="profile"
      className="scene-section relative overflow-hidden"
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
    >
      {/* Lavender atmosphere */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 45% at 100% 30%, rgba(157,143,255,0.07) 0%, transparent 70%)`,
        }}
      />

      <div className="w-full max-w-6xl mx-auto relative z-10">

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="section-label text-[var(--accent-lavender)]">
            Profile
          </span>
        </motion.div>

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24 items-start">

          {/* LEFT — editorial statement */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Pixel index label */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 pixel-decoration bg-[var(--accent-lavender)]" aria-hidden="true" />
              <span className="font-pixel text-[9px] tracking-[0.2em] text-[var(--accent-lavender)] uppercase">
                01 / Profile
              </span>
            </div>

            {/* Name headline */}
            <h2
              className="font-display font-extrabold tracking-tight leading-[1.0] text-[var(--text-primary)]"
              style={{ fontSize: 'clamp(2.4rem, 5vw + 0.5rem, 4.5rem)' }}
            >
              MUHAMAD<br />
              NUR <span className="text-[var(--accent-lavender)]">YANFA</span>
            </h2>

            {/* Role tag */}
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[var(--accent-lavender)]" aria-hidden="true" />
              <span
                className="font-mono uppercase tracking-[0.2em]"
                style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}
              >
                Software Engineer
              </span>
            </div>

            {/* Bio */}
            <div className="space-y-4" style={{ maxWidth: '48ch' }}>
              <p
                className="font-body leading-[1.85]"
                style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)', color: 'var(--text-secondary)' }}
              >
                I build software systems and digital experiences with a focus on
                engineering fundamentals, full-stack development, and security.
              </p>
              <p
                className="font-body leading-[1.85]"
                style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)', color: 'var(--text-secondary)' }}
              >
                My work sits at the intersection of clean architecture and
                thoughtful design. I care about how software is built, not just
                how it looks.
              </p>
              <p
                className="font-body leading-[1.85]"
                style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)', color: 'var(--text-secondary)' }}
              >
                Currently finishing my degree in Informatics Engineering while
                building real products and sharpening my understanding of
                system design.
              </p>
            </div>

            {/* Engineering philosophy strip */}
            <div className="flex items-center gap-3 py-3 border-l-2 border-[var(--accent-lavender)]/50 pl-4">
              <span
                className="font-mono"
                style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', letterSpacing: '0.08em' }}
              >
                Clean code · Thoughtful design · Continuous learning
              </span>
            </div>

            {/* CTA */}
            <div>
              <Button href="/about" variant="ghost">
                Full background
              </Button>
            </div>
          </motion.div>

          {/* RIGHT — metadata grid */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-0 lg:pt-24"
          >
            {METADATA.map((group, gi) => (
              <MetadataGroup key={group.label} group={group} delay={gi * 0.12} />
            ))}

            {/* Status indicator */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="pt-8 mt-8 border-t border-white/5 flex items-center gap-3"
            >
              <motion.div
                className="w-2 h-2 pixel-decoration bg-[var(--accent-acid)]"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              <span className="font-pixel text-[9px] tracking-widest text-[var(--accent-acid)] uppercase">
                Available for opportunities
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Single metadata group ── */
function MetadataGroup({
  group,
  delay,
}: {
  group: typeof METADATA[number];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="py-6 border-t border-white/5">
        <span
          className="font-pixel uppercase block mb-3"
          style={{ fontSize: '9px', letterSpacing: '0.2em', color: group.accent }}
        >
          {group.label}
        </span>

        <div className="space-y-1.5">
          {group.items.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: delay + i * 0.06, duration: 0.35 }}
              className="flex items-center gap-2"
            >
              <span
                className="w-[3px] h-3 pixel-decoration shrink-0"
                style={{ background: group.accent }}
                aria-hidden="true"
              />
              <span
                className="font-display font-semibold"
                style={{
                  fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
