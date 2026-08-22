import { motion, useReducedMotion } from 'motion/react';

/**
 * ShimmerEffect Component
 * Adds subtle light rays that sweep across the screen
 * Creates a premium, dynamic feel
 */
export function ShimmerEffect() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Diagonal shimmer 1 - INCREASED VISIBILITY */}
      <motion.div
        className="absolute w-[200%] h-[3px] -left-[100%]"
        style={{
          top: '20%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(139, 123, 255, 0.5) 50%, transparent 100%)',
          filter: 'blur(3px)',
          transform: 'rotate(-45deg)',
          boxShadow: '0 0 20px rgba(139, 123, 255, 0.6)',
        }}
        animate={{
          x: ['0%', '200%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 12,
        }}
      />

      {/* Diagonal shimmer 2 - INCREASED VISIBILITY */}
      <motion.div
        className="absolute w-[200%] h-[3px] -left-[100%]"
        style={{
          top: '60%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(93, 253, 203, 0.45) 50%, transparent 100%)',
          filter: 'blur(3px)',
          transform: 'rotate(-45deg)',
          boxShadow: '0 0 20px rgba(93, 253, 203, 0.5)',
        }}
        animate={{
          x: ['0%', '200%'],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 10,
          delay: 5,
        }}
      />

      {/* Vertical light sweep - INCREASED VISIBILITY */}
      <motion.div
        className="absolute w-[100%] h-[4px] left-0"
        style={{
          top: '-10%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 179, 102, 0.3) 50%, transparent 100%)',
          filter: 'blur(4px)',
          boxShadow: '0 0 25px rgba(255, 179, 102, 0.4)',
        }}
        animate={{
          y: ['0vh', '120vh'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 20,
          delay: 8,
        }}
      />
    </div>
  );
}
