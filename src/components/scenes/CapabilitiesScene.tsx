import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* ─────────────────────────────────────────────
   CapabilitiesScene — Blueprint §12
   
   Typographic hover-reveal list.
   NOT three feature cards.
   
   Layout:
     Left  → large numbered items (01 / 02 / 03)
     Right → detail panel reveals on hover/focus
   
   Scene accent: magenta (§29 capabilities)
   ───────────────────────────────────────────── */

const CAPABILITIES = [
  {
    index:    '01',
    title:    'Software\nEngineering',
    short:    'Systems that last.',
    detail:   'Designing reliable software from architecture to deployment. I care about data structures, clean abstractions, and code that other engineers can actually maintain.',
    tags:     ['Architecture', 'System Design', 'Clean Code', 'Algorithms'],
    accent:   'var(--accent-magenta)',
  },
  {
    index:    '02',
    title:    'Full-Stack\nDevelopment',
    short:    'End-to-end ownership.',
    detail:   'Frontend craft to backend logic, database design to deployment pipelines. I build complete products — not just components.',
    tags:     ['React', 'Laravel', 'Go', 'Node.js', 'PostgreSQL'],
    accent:   'var(--accent-cyan)',
  },
  {
    index:    '03',
    title:    'Cybersecurity',
    short:    'Security from the ground up.',
    detail:   'Applying security principles across the entire stack. Threat modelling, penetration testing, secure architecture — not an afterthought.',
    tags:     ['Web Security', 'Networking', 'Pen Testing', 'Secure Design'],
    accent:   'var(--accent-lavender)',
  },
] as const;

export function CapabilitiesScene() {
  const [active, setActive] = useState<number>(0);

  return (
    <section
      id="capabilities"
      data-scene="caps"
      className="scene-section relative overflow-hidden"
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
    >
      {/* Scene atmosphere */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 0% 50%, rgba(232,0,106,0.06) 0%, transparent 70%)`,
        }}
      />

      <div className="w-full max-w-6xl mx-auto relative z-10">

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="section-label text-[var(--accent-magenta)]">
            Capabilities
          </span>
        </motion.div>

        {/* ── Two-zone layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-start">

          {/* LEFT — typographic list */}
          <div className="space-y-0">
            {CAPABILITIES.map((cap, i) => (
              <CapabilityItem
                key={cap.index}
                cap={cap}
                index={i}
                isActive={active === i}
                onActivate={() => setActive(i)}
              />
            ))}
          </div>

          {/* RIGHT — detail panel */}
          <div className="hidden lg:block sticky top-[40vh] self-start">
            <AnimatePresence mode="wait">
              <DetailPanel key={active} cap={CAPABILITIES[active]} />
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile detail — below active item */}
        <div className="lg:hidden mt-8">
          <AnimatePresence mode="wait">
            <DetailPanel key={active} cap={CAPABILITIES[active]} mobile />
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

/* ── Single capability row ── */
function CapabilityItem({
  cap, index, isActive, onActivate,
}: {
  cap: typeof CAPABILITIES[number];
  index: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Top divider */}
      <div className="w-full h-px bg-white/6" />

      <button
        onClick={onActivate}
        onMouseEnter={onActivate}
        className="w-full text-left py-8 group flex items-start gap-6
                   focus-visible:outline-2 focus-visible:outline-offset-4
                   focus-visible:outline-[var(--accent-cyan)]"
        aria-pressed={isActive}
        data-cursor="link"
      >
        {/* Index */}
        <span
          className="font-pixel text-[11px] mt-1 shrink-0 transition-colors duration-200"
          style={{ color: isActive ? cap.accent : 'var(--text-faint)' }}
        >
          {cap.index}
        </span>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <motion.h2
            className="font-display font-extrabold leading-[0.95] tracking-tight whitespace-pre-line"
            style={{
              fontSize: 'clamp(2rem, 5vw + 0.5rem, 4.5rem)',
              color: isActive ? cap.accent : 'var(--text-primary)',
            }}
            animate={{ color: isActive ? cap.accent : 'var(--text-primary)' }}
            transition={{ duration: 0.2 }}
          >
            {cap.title}
          </motion.h2>

          {/* Short tagline — always visible */}
          <p
            className="font-mono mt-2 transition-colors duration-200"
            style={{
              fontSize: 'clamp(0.78rem, 1vw, 0.9rem)',
              color: isActive ? 'var(--text-secondary)' : 'var(--text-faint)',
              letterSpacing: '0.08em',
            }}
          >
            {cap.short}
          </p>
        </div>

        {/* Arrow — appears when active */}
        <motion.div
          className="shrink-0 mt-2"
          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
          transition={{ duration: 0.18 }}
          aria-hidden="true"
        >
          <ArrowPixel color={cap.accent} />
        </motion.div>
      </button>
    </motion.div>
  );
}

/* ── Detail panel (right column / mobile below) ── */
function DetailPanel({
  cap,
  mobile = false,
}: {
  cap: typeof CAPABILITIES[number];
  mobile?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: mobile ? 12 : 0, x: mobile ? 0 : 16 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{    opacity: 0, y: mobile ? -8 : 0, x: mobile ? 0 : 8 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="px-frame p-8 bg-[var(--bg-elevated)] border border-white/5"
      style={{ '--px-corner': '12px' } as React.CSSProperties}
    >
      {/* Accent dot */}
      <div
        className="w-2 h-2 pixel-decoration mb-6"
        style={{ background: cap.accent }}
        aria-hidden="true"
      />

      <h3
        className="font-display font-bold mb-4 leading-tight"
        style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
          color: cap.accent,
        }}
      >
        {cap.title.replace('\n', ' ')}
      </h3>

      <p
        className="font-body leading-relaxed mb-6"
        style={{ fontSize: 'clamp(0.88rem, 1vw, 0.98rem)', color: 'var(--text-secondary)' }}
      >
        {cap.detail}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {cap.tags.map(tag => (
          <span key={tag} className="px-tag" style={{ borderColor: `${cap.accent}30`, color: cap.accent }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Pixel arrow ── */
function ArrowPixel({ color }: { color: string }) {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="none"
         aria-hidden="true" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <rect x="0"  y="4" width="10" height="2" fill={color} />
      <rect x="10" y="4" width="2"  height="2" fill={color} />
      <rect x="12" y="2" width="2"  height="6" fill={color} />
      <rect x="14" y="0" width="2"  height="10" fill={color} />
    </svg>
  );
}
