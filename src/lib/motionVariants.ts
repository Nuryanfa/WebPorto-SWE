import type { Variants } from 'motion/react';

/**
 * Centralized Framer Motion variants.
 * All animations respect prefers-reduced-motion via the
 * useReducedMotion hook at the component level.
 */

/* ── Signature: Telescope Focus-Pull ── */
export const focusPull: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      opacity: { duration: 0.15, ease: 'linear' }
    },
  },
};

/* ── Instant (for reduced motion) ── */
export const instant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.01 },
  },
};

/* ── Fade In ── */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* ── Slide Up ── */
export const slideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* ── Stagger Container ── */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/* ── Stagger Container (slower, for hero) ── */
export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

/* ── Scale In (for orbital elements) ── */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1], // spring-like
    },
  },
};

/* ── Line Draw (for timeline path) ── */
export const lineDraw: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.3 },
    },
  },
};

/* ── Page Transition ── */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.4, ease: 'easeIn' },
  },
};
