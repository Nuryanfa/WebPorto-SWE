import { motion, useReducedMotion } from 'motion/react';

/**
 * GradientMesh Component
 * Creates a modern animated mesh gradient background
 * Inspired by Apple's gradient meshes with smooth color transitions
 */
export function GradientMesh() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 z-[-3] overflow-hidden pointer-events-none">
      {/* Base gradient layer */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(125deg, 
              #0A0E1A 0%, 
              #0E1422 25%, 
              #121825 50%, 
              #0D1220 75%, 
              #0A0E1A 100%
            )
          `,
        }}
      />

      {/* Animated gradient blobs - REDUCED untuk support Milky Way */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 1200px 800px at 50% 0%, rgba(139, 123, 255, 0.06), transparent),
            radial-gradient(ellipse 800px 600px at 100% 100%, rgba(93, 253, 203, 0.05), transparent),
            radial-gradient(ellipse 800px 800px at 0% 50%, rgba(255, 107, 181, 0.05), transparent)
          `,
        }}
        animate={shouldReduceMotion ? {} : {
          backgroundPosition: [
            '50% 0%, 100% 100%, 0% 50%',
            '50% 20%, 90% 90%, 10% 60%',
            '50% 0%, 100% 100%, 0% 50%',
          ],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary animated layer - REDUCED */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 900px 700px at 0% 0%, rgba(255, 179, 102, 0.04), transparent),
            radial-gradient(ellipse 700px 700px at 100% 50%, rgba(139, 123, 255, 0.05), transparent)
          `,
        }}
        animate={shouldReduceMotion ? {} : {
          backgroundPosition: [
            '0% 0%, 100% 50%',
            '10% 10%, 90% 60%',
            '0% 0%, 100% 50%',
          ],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      {/* Noise texture overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
