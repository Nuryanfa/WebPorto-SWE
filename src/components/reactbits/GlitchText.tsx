import { motion } from 'motion/react';
import type { Variants } from 'motion/react';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchOnHover?: boolean;
}

const glitchLeft: Variants = {
  idle: { opacity: 0, x: 0, y: 0 },
  glitch: {
    opacity: [0, 0.8, 0.8, 0],
    x: [0, -4, 2, -1, 0],
    y: [0, 1, -2, 1, 0],
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatDelay: 3.5,
      times: [0, 0.2, 0.8, 1],
    },
  },
  hover: {
    opacity: 0.8,
    x: -2,
    y: 1,
    transition: { duration: 0.1 }
  }
};

const glitchRight: Variants = {
  idle: { opacity: 0, x: 0, y: 0 },
  glitch: {
    opacity: [0, 0.8, 0.8, 0],
    x: [0, 3, -4, 2, 0],
    y: [0, -1, 2, -1, 0],
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatDelay: 3.5,
      times: [0, 0.2, 0.8, 1],
    },
  },
  hover: {
    opacity: 0.8,
    x: 2,
    y: -1,
    transition: { duration: 0.1 }
  }
};

/**
 * Premium Glitch Text Component (UI/UX Max Pro / Arknights style)
 * Creates 3 duplicated layers of text for RGB split effect.
 * Fully declarative using Framer Motion.
 */
export function GlitchText({ text, className = '', glitchOnHover = false }: GlitchTextProps) {
  return (
    <motion.div 
      className={`relative inline-block ${glitchOnHover ? 'cursor-pointer' : ''} ${className}`}
      initial="idle"
      animate={glitchOnHover ? "idle" : "glitch"}
      whileHover={glitchOnHover ? "hover" : undefined}
    >
      <span className="relative z-10">{text}</span>
      
      {/* Glitch Layer L (Cyan/Nebula) */}
      <motion.span 
        variants={glitchLeft}
        className="absolute top-0 left-0 -z-10 text-[var(--accent-nebula)] mix-blend-screen"
        aria-hidden="true"
      >
        {text}
      </motion.span>

      {/* Glitch Layer R (Amber/Solar) */}
      <motion.span 
        variants={glitchRight}
        className="absolute top-0 left-0 -z-10 text-[var(--accent-solar)] mix-blend-screen"
        aria-hidden="true"
      >
        {text}
      </motion.span>
    </motion.div>
  );
}
