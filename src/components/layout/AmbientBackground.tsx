import { motion, useReducedMotion } from 'motion/react';
import { SceneCanvas } from '../three/SceneCanvas';
import { GradientMesh } from '../motion/GradientMesh';
import { AnimatedOrbs } from '../motion/AnimatedOrbs';
import { ShimmerEffect } from '../motion/ShimmerEffect';
import { useMemo } from 'react';

// Static Constellation Coordinates (Percentages of viewport)
const CONSTELLATION_POINTS = [
  { x: 82, y: 12 },
  { x: 86, y: 19 },
  { x: 91, y: 15 },
  { x: 88, y: 24 },
];

// Floating particles for ambient effect
const PARTICLE_COUNT = 30;

/**
 * Enhanced Ambient Background Component
 * - Layer 0: Gradient Mesh Base (animated gradients)
 * - Layer 1: Animated Orbs (floating gradient orbs)
 * - Layer 2: WebGL 3D Starfield + Effects (SceneCanvas)
 * - Layer 3: Multiple Nebula Glows with enhanced colors
 * - Layer 4: Floating Particles
 * - Layer 5: Static Constellation (SVG, curated accent)
 * - Layer 6: Tech Grid Texture
 * - Layer 7: Vignette Overlay
 */
export function AmbientBackground() {
  const shouldReduceMotion = useReducedMotion();

  // Generate random particles
  const particles = useMemo(() => 
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 30 + 40,
      delay: Math.random() * -50,
      opacity: Math.random() * 0.3 + 0.1,
    }))
  , []);

  return (
    <>
      {/* Layer 0: Gradient Mesh Base */}
      <GradientMesh />

      {/* Layer 2: Root 3D WebGL Canvas - MAIN HERO */}
      <SceneCanvas reduced={Boolean(shouldReduceMotion)} />

      {/* CSS Layers - RE-ENABLED dengan opacity lebih rendah untuk ambient support */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        
        {/* Layer 3: Enhanced Nebula Glows - REDUCED BLUR untuk Three.js visibility */}
        {/* Purple Nebula - Top Right */}
        <motion.div 
          className="absolute w-[80vw] h-[80vw] rounded-full pointer-events-none z-0"
          style={{
            top: '-20%',
            right: '-15%',
            background: 'radial-gradient(circle, rgba(139, 123, 255, 0.18) 0%, rgba(139, 123, 255, 0.10) 30%, rgba(139, 123, 255, 0.05) 50%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={shouldReduceMotion ? {} : {
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Cyan Nebula - Left Side */}
        <motion.div 
          className="absolute w-[70vw] h-[70vw] rounded-full pointer-events-none z-0"
          style={{
            top: '25%',
            left: '-20%',
            background: 'radial-gradient(circle, rgba(93, 253, 203, 0.15) 0%, rgba(93, 253, 203, 0.08) 30%, rgba(93, 253, 203, 0.04) 50%, transparent 70%)',
            filter: 'blur(85px)',
          }}
          animate={shouldReduceMotion ? {} : {
            x: [0, 50, 0],
            y: [0, -20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 55,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />

        {/* Pink Nebula - Bottom Right */}
        <motion.div 
          className="absolute w-[65vw] h-[65vw] rounded-full pointer-events-none z-0"
          style={{
            bottom: '-10%',
            right: '5%',
            background: 'radial-gradient(circle, rgba(255, 107, 181, 0.16) 0%, rgba(255, 107, 181, 0.09) 30%, rgba(255, 107, 181, 0.05) 50%, transparent 70%)',
            filter: 'blur(90px)',
          }}
          animate={shouldReduceMotion ? {} : {
            x: [0, -35, 0],
            y: [0, -25, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 7
          }}
        />
        
        {/* Orange Nebula - Bottom Left */}
        <motion.div 
          className="absolute w-[60vw] h-[60vw] rounded-full pointer-events-none z-0"
          style={{
            bottom: '10%',
            left: '-10%',
            background: 'radial-gradient(circle, rgba(255, 179, 102, 0.14) 0%, rgba(255, 179, 102, 0.07) 30%, rgba(255, 179, 102, 0.04) 50%, transparent 70%)',
            filter: 'blur(75px)',
          }}
          animate={shouldReduceMotion ? {} : {
            x: [0, 45, 0],
            y: [0, -18, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 65,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
        />

        {/* Center Glow - Purple/Cyan Mix */}
        <motion.div 
          className="absolute w-[50vw] h-[50vw] rounded-full pointer-events-none z-0"
          style={{
            top: '45%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(139, 123, 255, 0.12) 0%, rgba(93, 253, 203, 0.10) 20%, rgba(139, 123, 255, 0.06) 40%, transparent 60%)',
            filter: 'blur(70px)',
          }}
          animate={shouldReduceMotion ? {} : {
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />

        {/* TOP LEFT ACCENT - Subtle */}
        <motion.div 
          className="absolute w-[35vw] h-[35vw] rounded-full pointer-events-none"
          style={{
            top: '0%',
            left: '0%',
            background: 'radial-gradient(circle, rgba(139, 123, 255, 0.15) 0%, rgba(139, 123, 255, 0.08) 30%, transparent 60%)',
            filter: 'blur(70px)',
          }}
          animate={shouldReduceMotion ? {} : {
            scale: [1, 1.15, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* BOTTOM RIGHT ACCENT - Subtle */}
        <motion.div 
          className="absolute w-[35vw] h-[35vw] rounded-full pointer-events-none"
          style={{
            bottom: '0%',
            right: '0%',
            background: 'radial-gradient(circle, rgba(93, 253, 203, 0.12) 0%, rgba(93, 253, 203, 0.06) 30%, transparent 60%)',
            filter: 'blur(70px)',
          }}
          animate={shouldReduceMotion ? {} : {
            scale: [1, 1.15, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Layer 4: Floating Particles */}
        {!shouldReduceMotion && particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${particle.left}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: 'radial-gradient(circle, rgba(139, 123, 255, 0.8), transparent)',
              filter: 'blur(1px)',
            }}
            animate={{
              y: ['100vh', '-20vh'],
              opacity: [0, particle.opacity, particle.opacity, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear",
            }}
          />
        ))}

        {/* Layer 5: Static Constellation (Enhanced) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          {CONSTELLATION_POINTS.map((pt, i) => {
            if (i === CONSTELLATION_POINTS.length - 1) return null;
            const nextPt = CONSTELLATION_POINTS[i + 1];
            return (
              <line
                key={`line-${i}`}
                x1={`${pt.x}%`} y1={`${pt.y}%`}
                x2={`${nextPt.x}%`} y2={`${nextPt.y}%`}
                stroke="var(--accent-cyan)"
                strokeWidth="1.5"
                strokeOpacity="0.35"
              />
            );
          })}
          {CONSTELLATION_POINTS.map((pt, i) => (
            <circle
              key={`point-${i}`}
              cx={`${pt.x}%`} cy={`${pt.y}%`}
              r="3"
              fill="var(--accent-solar)"
              opacity={shouldReduceMotion ? 0.7 : 0.9}
            >
              {!shouldReduceMotion && (
                <animate
                  attributeName="opacity"
                  values="0.4;1;0.4"
                  dur={`${2 + i * 0.5}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>
          ))}
        </svg>

        {/* Layer 6: Tech Grid Background (Enhanced & More Visible) */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(139, 123, 255, 1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(139, 123, 255, 1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />

        {/* Layer 7: Vignette Overlay */}
        <div className="vignette-overlay" />
      </div>
    </>
  );
}
