import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect } from 'react';

/**
 * Premium Minimal Background
 * Inspired by Linear.app, Stripe, Vercel
 * - Subtle animated mesh gradient
 * - Interactive cursor glow
 * - Clean, professional, not distracting
 */
export function PremiumBackground() {
  // Smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 100 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  // Transform mouse position to glow position
  const glowX = useTransform(x, [0, window.innerWidth], ['0%', '100%']);
  const glowY = useTransform(y, [0, window.innerHeight], ['0%', '100%']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0" style={{ zIndex: 0 }} aria-hidden="true">
      {/* Base gradient - very subtle */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139, 123, 255, 0.08), transparent),
            radial-gradient(ellipse 50% 80% at 0% 100%, rgba(93, 253, 203, 0.05), transparent),
            radial-gradient(ellipse 50% 80% at 100% 100%, rgba(255, 107, 181, 0.06), transparent),
            linear-gradient(180deg, #0A0E1A 0%, #0D1220 50%, #0A0E1A 100%)
          `,
        }}
      />

      {/* Animated mesh gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle 800px at 50% 200px, rgba(139, 123, 255, 0.06), transparent),
            radial-gradient(circle 600px at 80% 50%, rgba(93, 253, 203, 0.04), transparent)
          `,
        }}
        animate={{
          backgroundPosition: [
            '50% 0%, 80% 50%',
            '60% 10%, 70% 60%',
            '50% 0%, 80% 50%',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Interactive cursor glow - follows mouse */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          left: glowX,
          top: glowY,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(139, 123, 255, 0.08), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Subtle grid overlay - very faint */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 123, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 123, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />

      {/* Minimal geometric accent - single line */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.1 }}
      >
        <motion.line
          x1="20%"
          y1="30%"
          x2="80%"
          y2="30%"
          stroke="rgba(139, 123, 255, 0.3)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </svg>

      {/* Vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(10, 14, 26, 0.8) 100%)',
        }}
      />
    </div>
  );
}
