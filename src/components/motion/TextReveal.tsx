import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface TextRevealProps {
  text: string;
  delay?: number;
  className?: string;
}

export function TextReveal({ text, delay = 0, className = '' }: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Split text into words
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as any,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring' as any,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="mr-2 mb-1 inline-block">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
