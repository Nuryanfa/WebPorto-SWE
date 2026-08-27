import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
}

export function Reveal({ children, direction = 'up', delay = 0, duration = 0.5, className = '' }: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const getVariants = () => {
    switch (direction) {
      case 'up':
        return { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
      case 'down':
        return { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } };
      case 'left':
        return { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } };
      case 'right':
        return { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } };
      case 'none':
      default:
        return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration, delay, ease: [0.25, 1, 0.5, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
