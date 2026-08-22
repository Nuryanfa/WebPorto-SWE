import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FocusPullReveal } from '@/components/motion/FocusPullReveal';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { Panel } from '@/components/ui/Panel';
import { CountUp } from '@/components/ui/CountUp';
import { skillCategories } from '@/data/skills';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { SkillCategory } from '@/types';

/**
 * Orbital Skills Diagram (PRD §6.3)
 * 
 * Desktop: SVG diagram with concentric orbits, planet nodes
 * Mobile: Vertical ordered list (closest orbit → outermost)
 * 
 * Owner = "sun" at center
 * Categories = planets at different orbit distances
 * Hover/click reveals individual skills (progressive disclosure)
 */
export function OrbitalSkills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();

  // Sort by orbit index (closest first)
  const sorted = useMemo(
    () => [...skillCategories].sort((a, b) => a.orbitIndex - b.orbitIndex),
    []
  );

  return (
    <section id="skills" className="section-spacing overflow-hidden">
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
            <SectionEyebrow index="02" label="SKILLS" />
          </FocusPullReveal>

          <FocusPullReveal delay={0.1}>
            <h2
              className="font-bold uppercase mb-3"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                background: 'linear-gradient(135deg, #EDEFF7 0%, #9AA4C0 60%, #7C6FF0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Orbital Diagram
            </h2>
            <p className="text-sm font-mono tracking-wider" style={{ color: 'var(--text-faint)', letterSpacing: '0.15em' }}>
              DISTANCE FROM CENTER = LEVEL OF EXPERTISE · SIZE = DEPTH OF KNOWLEDGE
            </p>
          </FocusPullReveal>
        </div>

        {/* Desktop: SVG Orbital Diagram */}
        <FocusPullReveal delay={0.2}>
          <div className="hidden md:block">
            <OrbitalDiagramSVG
              categories={sorted}
              activeCategory={activeCategory}
              onCategorySelect={setActiveCategory}
              prefersReduced={prefersReduced}
            />
          </div>
        </FocusPullReveal>

        {/* Mobile: Vertical list */}
        <div className="md:hidden">
          <OrbitalListMobile
            categories={sorted}
            activeCategory={activeCategory}
            onCategorySelect={setActiveCategory}
          />
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────
   Desktop SVG Orbital Diagram
   ──────────────────────────────────────────────────── */

interface DiagramProps {
  categories: SkillCategory[];
  activeCategory: string | null;
  onCategorySelect: (name: string | null) => void;
  prefersReduced: boolean;
}

function OrbitalDiagramSVG({
  categories,
  activeCategory,
  onCategorySelect,
  prefersReduced,
}: DiagramProps) {
  const cx = 400;
  const cy = 400;
  
  // Exact orbit radii
  const getOrbitRadius = (index: number) => {
    if (index === 1) return 180;
    if (index === 2) return 280;
    if (index === 3) return 360;
    // Fallback if more orbits added
    return 360 + (index - 3) * 80;
  };

  return (
    <div className="relative w-full max-w-[800px] mx-auto bg-[var(--bg-panel)]/40 backdrop-blur-md rounded-[50%] border border-[var(--line-hairline)] p-4 md:p-8 shadow-2xl" role="img" aria-label="Orbital skills diagram showing skill categories as planets orbiting a central point. Security is closest (most core), Networking is mid-distance, Development is outermost.">
      <svg viewBox="0 0 800 800" className="w-full h-auto">
        {/* Draw orbits for all unique orbit distances */}
        {Array.from(new Set(categories.map(c => c.orbitIndex))).map((orbitIndex, i) => {
          const r = getOrbitRadius(orbitIndex);
          return (
            <motion.circle
              key={`orbit-${orbitIndex}`}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="var(--line-hairline)"
              strokeWidth={1}
              strokeDasharray="4 6"
              initial={prefersReduced ? {} : { pathLength: 0, opacity: 0 }}
              whileInView={prefersReduced ? {} : { pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
          );
        })}

        {/* Center "Sun" — the owner */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={12}
          fill="var(--accent-solar)"
          initial={prefersReduced ? {} : { scale: 0, opacity: 0 }}
          whileInView={prefersReduced ? {} : { scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        />
        {/* Sun glow */}
        <circle
          cx={cx}
          cy={cy}
          r={20}
          fill="none"
          stroke="var(--accent-solar)"
          strokeWidth={1}
          opacity={0.3}
        />
        {/* Sun label */}
        <text
          x={cx}
          y={cy + 35}
          textAnchor="middle"
          fill="var(--text-star)"
          fontSize="10"
          fontFamily="var(--font-mono)"
          letterSpacing="0.15em"
        >
          YOU ARE HERE
        </text>

        {/* Planet nodes */}
        {categories.map((cat, i) => {
          const r = getOrbitRadius(cat.orbitIndex);
          const angleRad = ((cat.angle || 0) * Math.PI) / 180;
          const px = cx + r * Math.cos(angleRad);
          const py = cy + r * Math.sin(angleRad);
          
          const avgLevel = cat.skills.reduce((sum, s) => sum + s.level, 0) / (cat.skills.length || 1);
          const planetR = 16 + (avgLevel / 100) * 20;
          
          const isActive = activeCategory === cat.id;

          return (
            <g key={cat.id}>
              {/* Planet clickable area */}
              <motion.circle
                cx={px}
                cy={py}
                r={planetR}
                fill={isActive ? cat.color : 'var(--bg-panel)'}
                stroke={cat.color}
                strokeWidth={isActive ? 2 : 1}
                className="cursor-pointer"
                onClick={() =>
                  onCategorySelect(isActive ? null : cat.id)
                }
                initial={prefersReduced ? {} : { scale: 0, opacity: 0 }}
                whileInView={prefersReduced ? {} : { scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + i * 0.15,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                whileHover={{ scale: 1.15 }}
                role="button"
                aria-label={`${cat.label} skills category. ${cat.skills.length} skills. Click to expand.`}
                tabIndex={0}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onCategorySelect(isActive ? null : cat.id);
                  }
                }}
              />

              {/* Planet label */}
              <text
                x={px}
                y={py - planetR - 10}
                textAnchor="middle"
                fill={isActive ? 'var(--text-star)' : 'var(--text-star)'}
                fontSize="11"
                fontFamily="var(--font-display)"
                fontWeight="600"
                letterSpacing="0.1em"
                className="pointer-events-none uppercase"
              >
                {cat.label}
              </text>

              {/* Orbit distance label */}
              <text
                x={px}
                y={py + planetR + 18}
                textAnchor="middle"
                fill="var(--text-faint)"
                fontSize="9"
                fontFamily="var(--font-mono)"
                letterSpacing="0.1em"
                className="pointer-events-none"
              >
                ORBIT {cat.orbitIndex}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Skill details panel — appears on category click */}
      <AnimatePresence>
        {activeCategory && (
          <SkillDetailPanel
            category={categories.find((c) => c.id === activeCategory)!}
            onClose={() => onCategorySelect(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ────────────────────────────────────────────────────
   Skill Detail Panel (appears on planet click)
   ──────────────────────────────────────────────────── */

function SkillDetailPanel({
  category,
  onClose,
}: {
  category: SkillCategory;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-10"
    >
      <Panel angular className="p-6">
        <div className="flex items-center justify-between mb-4 border-b border-[var(--line-hairline)] pb-4">
          <h3
            className="text-sm font-semibold tracking-wider uppercase flex items-center gap-2"
            style={{ color: category.color }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }} />
            {category.label}
          </h3>
          <button
            onClick={onClose}
            className="text-[var(--text-faint)] hover:text-[var(--text-star)] transition-colors text-xs font-[family-name:var(--font-mono)] cursor-pointer"
            aria-label="Close skill details"
          >
            [CLOSE]
          </button>
        </div>

        <div className="space-y-3">
          {category.skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-[var(--text-dim)]">{skill.name}</span>
                <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-faint)]">
                  <CountUp value={skill.level} className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-faint)]" />
                </span>
              </div>
              <div className="h-1 bg-[var(--bg-void)] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: category.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────
   Mobile: Vertical Ordered List
   ──────────────────────────────────────────────────── */

interface MobileListProps {
  categories: SkillCategory[];
  activeCategory: string | null;
  onCategorySelect: (name: string | null) => void;
}

function OrbitalListMobile({
  categories,
  activeCategory,
  onCategorySelect,
}: MobileListProps) {
  return (
    <div className="space-y-4" role="list" aria-label="Skills organized by expertise level, from core to peripheral">
      {categories.map((cat, i) => {
        const isActive = activeCategory === cat.id;

        return (
          <FocusPullReveal key={cat.id} delay={i * 0.1}>
            <button
              onClick={() => onCategorySelect(isActive ? null : cat.id)}
              className={`
                w-full text-left p-5
                bg-[var(--bg-panel)] border transition-all duration-300 cursor-pointer
                ${isActive
                  ? 'border-[var(--accent-nebula)] shadow-[0_0_20px_var(--accent-nebula-glow)]'
                  : 'border-[var(--line-hairline)] hover:border-[var(--line-hairline-strong)]'
                }
              `}
              role="listitem"
              aria-expanded={isActive}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-wider uppercase text-[var(--text-star)]">
                    {cat.label}
                  </span>
                </div>
                <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-faint)]">
                  ORBIT {cat.orbitIndex} · {cat.skills.length} SKILLS
                </span>
              </div>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 space-y-3 border-t border-[var(--line-hairline)] mt-3">
                      {cat.skills.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-[var(--text-dim)]">
                              {skill.name}
                            </span>
                            <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-faint)]">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="h-1 bg-[var(--bg-void)] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: cat.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </FocusPullReveal>
        );
      })}
    </div>
  );
}
