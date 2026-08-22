import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

/**
 * Astronomy Hero Background - FINAL VERSION
 * - Seamless, no cut-offs
 * - Bold & dramatic
 * - Proper parallax
 * - Professional like SpaceX/NASA
 */
export function AstronomyHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Smooth parallax - different speeds for depth
  const layer1Y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const layer2Y = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const layer3Y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0" 
      style={{ zIndex: 0 }} 
      aria-hidden="true"
    >
      {/* Deep space black - infinite */}
      <div className="absolute inset-0 bg-black" />

      {/* Layer 1: Distant stars (slowest parallax) */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: layer1Y }}
      >
        <svg className="absolute inset-0 w-full h-[120%]">
          {Array.from({ length: 300 }).map((_, i) => {
            const x = Math.random() * 100;
            const y = Math.random() * 120;
            const size = Math.random() * 1.5 + 0.3;
            const opacity = Math.random() * 0.6 + 0.2;
            
            return (
              <circle
                key={`star-bg-${i}`}
                cx={`${x}%`}
                cy={`${y}%`}
                r={size}
                fill="white"
                opacity={opacity}
              >
                <animate
                  attributeName="opacity"
                  values={`${opacity};${opacity * 0.3};${opacity}`}
                  dur={`${3 + Math.random() * 4}s`}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}
        </svg>
      </motion.div>

      {/* Layer 2: Main Nebula - LARGE & DRAMATIC */}
      <motion.div
        className="absolute inset-0"
        style={{ y: layer2Y }}
      >
        {/* Purple nebula - massive */}
        <motion.div
          className="absolute top-[-10%] right-[10%] w-[900px] h-[900px]"
          style={{
            background: 'radial-gradient(circle, rgba(138, 43, 226, 0.7) 0%, rgba(75, 0, 130, 0.5) 20%, rgba(138, 43, 226, 0.3) 40%, transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Cyan nebula - overlapping */}
        <motion.div
          className="absolute top-[5%] right-[15%] w-[800px] h-[800px]"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 255, 0.6) 0%, rgba(0, 206, 209, 0.4) 25%, rgba(0, 128, 128, 0.2) 50%, transparent 75%)',
            filter: 'blur(90px)',
          }}
          animate={{
            scale: [1, 1.12, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        {/* Hot pink nebula */}
        <motion.div
          className="absolute top-[15%] right-[5%] w-[700px] h-[700px]"
          style={{
            background: 'radial-gradient(circle, rgba(255, 20, 147, 0.6) 0%, rgba(219, 112, 147, 0.4) 30%, rgba(199, 21, 133, 0.2) 55%, transparent 80%)',
            filter: 'blur(85px)',
          }}
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
        />

        {/* Golden core - bright center */}
        <motion.div
          className="absolute top-[8%] right-[12%] w-[400px] h-[400px]"
          style={{
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.9) 0%, rgba(255, 140, 0, 0.6) 20%, rgba(255, 69, 0, 0.3) 45%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Dark dust lanes - creates depth */}
        <div
          className="absolute top-[10%] right-[8%] w-[1000px] h-[400px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.7) 25%, rgba(0, 0, 0, 0.9) 50%, rgba(0, 0, 0, 0.7) 75%, transparent 100%)',
            filter: 'blur(50px)',
            transform: 'rotate(-25deg)',
          }}
        />
      </motion.div>

      {/* Layer 3: Foreground stars with glow (fastest parallax) */}
      <motion.div
        className="absolute inset-0"
        style={{ y: layer3Y }}
      >
        {Array.from({ length: 80 }).map((_, i) => {
          const x = Math.random() * 100;
          const y = Math.random() * 120;
          const size = Math.random() * 3 + 1;
          const isBright = Math.random() > 0.85;
          
          return (
            <motion.div
              key={`star-fg-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                background: 'white',
                boxShadow: isBright 
                  ? `0 0 ${size * 4}px rgba(255, 255, 255, 0.9), 0 0 ${size * 8}px rgba(255, 255, 255, 0.5)`
                  : `0 0 ${size * 2}px rgba(255, 255, 255, 0.6)`,
              }}
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: isBright ? [1, 1.3, 1] : [1, 1, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          );
        })}

        {/* Diffraction spike stars (like Hubble) */}
        {Array.from({ length: 12 }).map((_, i) => {
          const x = 20 + Math.random() * 60;
          const y = 20 + Math.random() * 80;
          
          return (
            <div
              key={`spike-${i}`}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
              }}
            >
              {/* Center star */}
              <div
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  boxShadow: '0 0 8px rgba(255, 255, 255, 1), 0 0 16px rgba(255, 255, 255, 0.7)',
                }}
              />
              {/* Vertical spike */}
              <div
                className="absolute left-1/2 -translate-x-1/2 w-[1px] h-12 bg-white"
                style={{
                  background: 'linear-gradient(180deg, transparent 0%, white 50%, transparent 100%)',
                  opacity: 0.7,
                }}
              />
              {/* Horizontal spike */}
              <div
                className="absolute top-1/2 -translate-y-1/2 h-[1px] w-12 bg-white"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, white 50%, transparent 100%)',
                  opacity: 0.7,
                }}
              />
            </div>
          );
        })}
      </motion.div>

      {/* Ambient glow overlay - extends nebula feel across screen */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 70% 30%, rgba(138, 43, 226, 0.15), transparent 60%)',
        }}
      />

      {/* Professional vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 60% 40%, transparent 30%, rgba(0, 0, 0, 0.5) 75%, rgba(0, 0, 0, 0.9) 100%)
          `,
        }}
      />

      {/* Left gradient for hero text readability */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 35%, transparent 65%)',
        }}
      />
    </div>
  );
}


