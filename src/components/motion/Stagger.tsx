import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import type { ReactNode } from 'react';

interface StaggerProps {
  children: ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
}

export function Stagger({ children, staggerDelay = 0.1, delayChildren = 0, className = '' }: StaggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayChildren,
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const StaggerItem = ({ children, className = '' }: { children: ReactNode, className?: string }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as any } }
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};
