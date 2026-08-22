import { motion } from 'motion/react';

import { SplitTextReveal } from '@/components/reactbits/SplitTextReveal';
import { GlitchText } from '@/components/reactbits/GlitchText';
import { Button } from '@/components/ui/Button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  },
};

/**
 * Hero — "Star Chart" (PRD v2 §3.1)
 * 
 * Asymmetric layout:
 * - Text block at left: 8%, top: 55%, max-width: 480px
 * - Main star at right: 22%, top: 30%
 * - Diagonal SVG leader-line connecting them
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] w-full flex flex-col justify-center"
    >
      {/* InteractiveStarfield removed to reveal 3D AmbientBackground behind Hero */}

      {/* Main Star (accent-solar) */}
      <motion.div
        className="absolute z-0"
        style={{ right: '22%', top: '30%' }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
      >
        <div className="relative flex items-center justify-center">
          {/* Breathing inner glow */}
          <motion.div 
            className="absolute w-[32px] h-[32px] bg-[var(--accent-solar)] rounded-full blur-[12px]" 
            animate={{ 
              opacity: [0.4, 0.8, 0.4],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Expanding sonar rings */}
          <motion.div 
            className="absolute w-[40px] h-[40px] rounded-full border border-[var(--accent-solar)]"
            animate={{
              scale: [1, 3],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.5
            }}
          />
          <motion.div 
            className="absolute w-[40px] h-[40px] rounded-full border border-[var(--accent-solar)]"
            animate={{
              scale: [1, 3],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: 2
            }}
          />
          {/* Solid core */}
          <div className="w-[6px] h-[6px] bg-[#FFECCC] rounded-full z-10 shadow-[0_0_10px_var(--accent-solar)]" />
        </div>
      </motion.div>

      {/* Leader Line SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M 78 30 L 8 55"
          stroke="var(--accent-nebula)"
          strokeWidth="0.2"
          strokeOpacity="0.5"
          fill="none"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
        />
      </svg>

      {/* Content Block */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="container-observatory relative w-full h-full">
          <motion.div
            className="absolute pointer-events-auto w-full max-w-2xl px-4 md:px-0 md:ml-[8%]"
            style={{ top: '55%' }}
            variants={{
              hidden: { opacity: 0, y: '-50%' },
              visible: {
                opacity: 1,
                y: '-50%',
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            {/* Glass panel — gradient fade, no hard border */}
            <div
              className="absolute pointer-events-none"
              style={{
                inset: '-10rem -10rem -10rem -5rem',
                background: 'rgba(8, 10, 18, 0.7)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                WebkitMaskImage: 'radial-gradient(ellipse at 25% 50%, black 20%, rgba(0,0,0,0.5) 50%, transparent 80%)',
                maskImage: 'radial-gradient(ellipse at 25% 50%, black 20%, rgba(0,0,0,0.5) 50%, transparent 80%)',
                zIndex: -1,
              }}
            />
            {/* Designation */}
            <motion.div variants={itemVariants} className="mb-4">
          <span className="font-mono text-[12px] tracking-[0.25em] uppercase text-[var(--accent-nebula)] font-bold">
            [ DESIGNATION ]
          </span>
        </motion.div>

        {/* Name */}
        <motion.div variants={itemVariants} className="mb-6">
          <SplitTextReveal
            text="NUR YANFA"
            className="font-bold uppercase leading-[1.0]"
            style={{ fontSize: 'clamp(52px, 8vw, 110px)', letterSpacing: '-0.02em' }}
            delay={800}
            gradient={true}
          />
        </motion.div>

        {/* Classification */}
        <motion.div variants={itemVariants} className="font-mono tracking-wider mb-5" style={{ fontSize: 'clamp(13px, 1.1vw, 16px)' }}>
          <span className="text-[var(--text-faint)] uppercase text-[11px] mr-2 tracking-[0.2em]">CLASSIFICATION:</span>
          <GlitchText text="Cybersecurity & Software Engineer" className="font-semibold" style={{ color: 'var(--accent-nebula)' }} />
        </motion.div>

        {/* Coordinate & Sector */}
        <motion.div variants={itemVariants} className="font-mono text-[13px] tracking-[0.05em] uppercase text-[var(--text-dim)] mb-3">
          <span className="text-[var(--accent-nebula)]">◇</span>
          {' '}COORD: 07h 45m · SECTOR — NETWORK DEFENSE
        </motion.div>

        {/* Magnitude & Status */}
        <motion.div variants={itemVariants} className="font-mono text-[13px] tracking-[0.05em] uppercase text-[var(--text-dim)] mb-12">
          MAGNITUDE: Undergraduate · STATUS: Observing
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="flex items-center gap-8">
          <Button variant="solid" href="/projects">
            View Projects
          </Button>
          <Button variant="ghost" href="#" icon>
            Download CV
          </Button>
        </motion.div>
      </motion.div>
    </div>
  </div>

    </section>
  );
}
