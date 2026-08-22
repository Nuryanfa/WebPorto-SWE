import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { focusPull, instant } from '@/lib/motionVariants';

interface FocusPullRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Use 'div' or 'section' as wrapper element */
  as?: 'div' | 'section' | 'article' | 'span';
}

/**
 * Signature animation wrapper — Telescope Focus-Pull.
 * Elements enter viewport from blur(8px) + scale(1.02) → clear + scale(1).
 * Respects prefers-reduced-motion (instant reveal when reduced).
 */
export function FocusPullReveal({
  children,
  className = '',
  delay = 0,
  as = 'div',
}: FocusPullRevealProps) {
  const prefersReduced = useReducedMotion();
  const variants = prefersReduced ? instant : focusPull;

  const Component = motion.create(as);

  return (
    <Component
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px' }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </Component>
  );
}
