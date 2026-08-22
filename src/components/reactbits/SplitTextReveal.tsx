import { motion } from 'motion/react';
import React from 'react';

interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
  gradient?: boolean; // If true, applies gradient to text safely
}

const containerVariants = {
  hidden: { },
  visible: (customDelay: number = 0) => ({
    transition: {
      staggerChildren: 0.03,
      delayChildren: customDelay / 1000,
    },
  }),
};

const charVariants = {
  hidden: { 
    y: '120%', 
  },
  visible: { 
    y: 0, 
    transition: {
      duration: 0.8,
      ease: [0.19, 1.0, 0.22, 1.0], // Expo Out (Premium clean slide)
    }
  },
};

/**
 * Premium Split Text Reveal
 * Uses masked reveal (overflow-hidden wrapper) with Expo Out easing
 * for a highly professional, clean "popup" aesthetic.
 */
export function SplitTextReveal({ text, className = '', delay = 0, style, gradient = false }: SplitTextRevealProps) {
  // Split text by characters but preserve words for wrapping
  const words = text.split(' ').map((word, wordIdx, arr) => (
    <span key={wordIdx} className="inline-block whitespace-nowrap">
      {word.split('').map((char, charIdx) => (
        <span key={`${wordIdx}-${charIdx}`} className="inline-block overflow-hidden align-bottom pb-2 -mb-2">
          <motion.span 
            className={`inline-block ${gradient ? 'hero-name' : ''}`}
            variants={charVariants}
          >
            {char}
          </motion.span>
        </span>
      ))}
      {wordIdx !== arr.length - 1 && <span className="inline-block">&nbsp;</span>}
    </span>
  ));

  return (
    <motion.div 
      className={className} 
      style={style}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px" }}
      custom={delay}
    >
      {words}
    </motion.div>
  );
}
