import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { pageTransition } from '@/lib/motionVariants';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Page transition wrapper — focus-pull blur effect between routes.
 * Used inside AnimatePresence in App.tsx.
 */
export function PageTransition({ children, className = '' }: PageTransitionProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
}
