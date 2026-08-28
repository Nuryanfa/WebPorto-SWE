import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* ─────────────────────────────────────────────
   ArsenalScene — Blueprint §13
   
   Interactive filter: SOFTWARE / SYSTEMS / SECURITY
   Content morphs between categories.
   NOT a static skill grid.
   
   Scene accent: cyan (§29 arsenal)
   ───────────────────────────────────────────── */

const CATEGORIES = [
  {
    id:    'software',
    label: 'SOFTWARE',
    tools: [
      { name: 'React',        note: 'UI'            },
      { name: 'TypeScript',   note: 'Language'      },
      { name: 'Tailwind CSS', note: 'Styling'       },
      { name: 'Vite',         note: 'Build'         },
      { name: 'Next.js',      note: 'Framework'     },
    ],
  },
  {
    id:    'systems',
    label: 'SYSTEMS',
    tools: [
      { name: 'Laravel',      note: 'Backend'       },
      { name: 'Go',           note: 'Systems'       },
      { name: 'Node.js',      note: 'Runtime'       },
      { name: 'MySQL',        note: 'Database'      },
      { name: 'PostgreSQL',   note: 'Database'      },
      { name: 'Docker',       note: 'Container'     },
      { name: 'Linux',        note: 'OS'            },
      { name: 'Git',          note: 'VCS'           },
    ],
  },
  {
    id:    'security',
    label: 'SECURITY',
    tools: [
      { name: 'Networking',       note: 'Foundation'    },
      { name: 'Web Security',     note: 'OWASP'         },
      { name: 'Pen Testing',      note: 'Offensive'     },
      { name: 'Linux Hardening',  note: 'Defensive'     },
      { name: 'CTF',              note: 'Practice'      },
    ],
  },
] as const;

type CatId = typeof CATEGORIES[number]['id'];

export function ArsenalScene() {
  const [active, setActive] = useState<CatId>('software');
  const current = CATEGORIES.find(c => c.id === active)!;

  const accentColor =
    active === 'software' ? 'var(--accent-cyan)'
    : active === 'systems' ? 'var(--accent-cyan)'
    : 'var(--accent-lavender)';

  return (
    <section
      id="arsenal"
      data-scene="arsenal"
      className="scene-section relative overflow-hidden"
      style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}
    >
      {/* Scene atmosphere */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 40% at 100% 50%, rgba(0,238,255,0.06) 0%, transparent 70%)`,
        }}
      />

      <div className="w-full max-w-6xl mx-auto relative z-10">

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="section-label text-[var(--accent-cyan)]">
            Arsenal
          </span>
        </motion.div>

        {/* ── Heading ── */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold tracking-tight text-[var(--text-primary)] mb-12"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1 }}
        >
          Technical
          <span className="block text-[var(--accent-cyan)]">Ecosystem</span>
        </motion.h2>

        {/* ── Filter tabs ── */}
        <div
          role="tablist"
          aria-label="Technology category"
          className="flex items-center gap-0 mb-12 border border-white/8 w-fit"
        >
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === active;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(cat.id)}
                data-cursor="link"
                className="relative px-6 py-3 font-pixel text-[10px] tracking-[0.2em]
                           uppercase transition-colors duration-150
                           focus-visible:outline-2 focus-visible:outline-offset-0
                           focus-visible:outline-[var(--accent-cyan)]"
                style={{
                  color:      isActive ? 'var(--bg-base)' : 'var(--text-faint)',
                  background: 'transparent',
                  border:     'none',
                  cursor:     'inherit',
                }}
              >
                {/* Active background */}
                {isActive && (
                  <motion.div
                    layoutId="arsenal-tab-bg"
                    className="absolute inset-0"
                    style={{ background: accentColor }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Tool grid — morphs on category change ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{    opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            role="tabpanel"
            aria-label={`${current.label} tools`}
          >
            <div className="flex flex-wrap gap-3">
              {current.tools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.22 }}
                  className="group relative px-frame"
                  style={{ '--px-corner': '8px' } as React.CSSProperties}
                >
                  <div
                    className="flex items-center gap-3 px-5 py-3
                               bg-[var(--bg-elevated)] border border-white/6
                               hover:border-white/12 transition-all duration-150"
                  >
                    {/* Pixel accent dot */}
                    <span
                      className="w-[3px] h-4 pixel-decoration shrink-0"
                      style={{ background: accentColor }}
                      aria-hidden="true"
                    />

                    <div>
                      <div
                        className="font-display font-semibold"
                        style={{
                          fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        {tool.name}
                      </div>
                      <div
                        className="font-pixel uppercase"
                        style={{ fontSize: '7px', color: accentColor, letterSpacing: '0.15em' }}
                      >
                        {tool.note}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 font-mono text-[10px] tracking-[0.2em]
                     text-[var(--text-faint)] uppercase"
        >
          Always learning · Always building
        </motion.p>
      </div>
    </section>
  );
}
