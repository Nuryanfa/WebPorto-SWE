import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

/**
 * Astronomy Immersive Background
 * 
 * Philosophy: Rich, animated, OBVIOUS astronomy theme
 * - Multiple celestial objects with real animations
 * - Deep space atmosphere with flowing nebulae
 * - Dynamic starfield with depth
 * - Shooting stars, comets, cosmic dust
 * - NOT minimal, NOT subtle - IMMERSIVE & IMPRESSIVE
 */
export function AstronomyImmersive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [shootingStars, setShootingStars] = useState<Array<{id: number, delay: number}>>([]);

  // Multi-layer parallax for depth
  const layer1Y = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const layer2Y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const layer3Y = useTransform(scrollYProgress, [0, 1], ['0%', '45%']);

  // Generate shooting stars periodically
  useEffect(() => {
    const initialStars = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 10,
    }));
    setShootingStars(initialStars);

    const interval = setInterval(() => {
      setShootingStars(prev => [
        ...prev.slice(-4),
        { id: Date.now(), delay: 0 },
      ]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0" 
      style={{ zIndex: 0 }} 
      aria-hidden="true"
    >
      {/* Deep space base - gradient for depth */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'radial-gradient(ellipse at top, #0f1729 0%, #050a14 50%, #000000 100%)',
        }}
      />

      {/* Layer 1: Distant starfield (deep space) */}
      <motion.div
        className="absolute inset-0"
        style={{ y: layer1Y }}
      >
        <svg className="absolute inset-0 w-full h-full">
          {/* Generate 300 distant stars */}
          {Array.from({ length: 300 }).map((_, i) => {
            const seed = i * 7919; // Prime number for better distribution
            const x = ((seed * 2654435761) % 10000) / 100;
            const y = ((seed * 2654435789) % 10000) / 100;
            const size = 0.5 + (Math.random() * 0.8);
            const opacity = 0.3 + (Math.random() * 0.4);
            const twinkleSpeed = 3 + Math.random() * 4;

            return (
              <circle
                key={`star-distant-${i}`}
                cx={`${x}%`}
                cy={`${y}%`}
                r={size}
                fill="#FFFFFF"
                opacity={opacity}
              >
                <animate
                  attributeName="opacity"
                  values={`${opacity};${opacity * 0.3};${opacity}`}
                  dur={`${twinkleSpeed}s`}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}
        </svg>
      </motion.div>

      {/* Layer 2: Nebula clouds - flowing and breathing */}
      <motion.div
        className="absolute inset-0"
        style={{ y: layer2Y }}
      >
        {/* Purple nebula - main feature, top right */}
        <motion.div
          className="absolute top-[-5%] right-[5%] w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle at 40% 40%, rgba(147, 51, 234, 0.25) 0%, rgba(126, 34, 206, 0.15) 25%, rgba(88, 28, 135, 0.08) 50%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Cyan nebula - secondary, left side */}
        <motion.div
          className="absolute top-[20%] left-[10%] w-[550px] h-[550px] rounded-full"
          style={{
            background: 'radial-gradient(circle at 60% 50%, rgba(6, 182, 212, 0.20) 0%, rgba(14, 165, 233, 0.12) 30%, rgba(3, 105, 161, 0.06) 55%, transparent 75%)',
            filter: 'blur(70px)',
          }}
          animate={{
            scale: [1, 1.12, 1],
            x: [0, -25, 0],
            y: [0, 30, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
        />

        {/* Pink/Magenta nebula - accent, bottom right */}
        <motion.div
          className="absolute bottom-[10%] right-[15%] w-[480px] h-[480px] rounded-full"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.18) 0%, rgba(219, 39, 119, 0.10) 35%, rgba(190, 24, 93, 0.05) 60%, transparent 80%)',
            filter: 'blur(75px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 6,
          }}
        />

        {/* Orange/amber core - bright center like star formation */}
        <motion.div
          className="absolute top-[15%] right-[20%] w-[280px] h-[280px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.30) 0%, rgba(245, 158, 11, 0.18) 25%, rgba(217, 119, 6, 0.08) 50%, transparent 70%)',
            filter: 'blur(50px)',
          }}
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Cosmic dust clouds - darker regions for contrast */}
        <motion.div
          className="absolute top-[25%] right-[25%] w-[600px] h-[200px]"
          style={{
            background: 'linear-gradient(120deg, rgba(0, 0, 0, 0.4) 0%, rgba(15, 23, 42, 0.3) 50%, rgba(0, 0, 0, 0.4) 100%)',
            filter: 'blur(40px)',
            transform: 'rotate(-20deg)',
          }}
          animate={{
            x: [0, 40, 0],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Layer 3: Mid-range starfield with color variation */}
      <motion.div
        className="absolute inset-0"
        style={{ y: layer2Y }}
      >
        {Array.from({ length: 150 }).map((_, i) => {
          const seed = i * 5381;
          const x = ((seed * 2654435761) % 10000) / 100;
          const y = ((seed * 2654435789) % 10000) / 100;
          const size = 1 + (Math.random() * 1.5);
          const opacity = 0.5 + (Math.random() * 0.5);
          
          // Color temperature variation (blue = hot, orange = cool stars)
          const colorChoice = Math.random();
          const color = colorChoice > 0.85 ? '#93C5FD' : // Blue hot stars
                       colorChoice > 0.70 ? '#FCD34D' : // Yellow stars
                       '#FFFFFF'; // White stars (most common)

          return (
            <motion.div
              key={`star-mid-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                background: color,
                boxShadow: `0 0 ${size * 2}px ${color}`,
              }}
              animate={{
                opacity: [opacity, opacity * 0.4, opacity],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          );
        })}
      </motion.div>

      {/* Shooting stars / Meteors */}
      <div className="absolute inset-0 overflow-hidden">
        {shootingStars.map(({ id, delay }) => {
          const startX = 20 + Math.random() * 60;
          const startY = Math.random() * 40;
          const angle = 45 + Math.random() * 30;
          
          return (
            <motion.div
              key={id}
              className="absolute"
              style={{
                left: `${startX}%`,
                top: `${startY}%`,
                width: '3px',
                height: '3px',
              }}
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 0 
              }}
              animate={{
                x: `${Math.cos(angle * Math.PI / 180) * 800}px`,
                y: `${Math.sin(angle * Math.PI / 180) * 800}px`,
                opacity: [0, 1, 0.8, 0],
              }}
              transition={{
                duration: 1.5,
                delay,
                ease: 'easeOut',
              }}
            >
              {/* Shooting star head */}
              <div 
                className="w-2 h-2 rounded-full bg-white"
                style={{
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                }}
              />
              {/* Trail */}
              <motion.div
                className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-white to-transparent"
                style={{
                  width: '80px',
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: '0 0',
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3, delay }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Layer 4: Foreground bright stars with diffraction spikes */}
      <motion.div
        className="absolute inset-0"
        style={{ y: layer3Y }}
      >
        {Array.from({ length: 30 }).map((_, i) => {
          const seed = i * 9973;
          const x = 15 + ((seed * 2654435761) % 7000) / 100;
          const y = 10 + ((seed * 2654435789) % 8000) / 100;
          const size = 2 + (Math.random() * 2);
          
          return (
            <div
              key={`star-bright-${i}`}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
              }}
            >
              {/* Star core */}
              <motion.div
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  boxShadow: '0 0 12px rgba(255, 255, 255, 0.9), 0 0 24px rgba(255, 255, 255, 0.5)',
                  marginLeft: '-4px',
                  marginTop: '-4px',
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* Diffraction spikes (like Hubble telescope) */}
              <div
                className="absolute w-[1px] h-16 bg-gradient-to-t from-transparent via-white to-transparent opacity-70"
                style={{
                  marginLeft: '-0.5px',
                  marginTop: '-32px',
                }}
              />
              <div
                className="absolute h-[1px] w-16 bg-gradient-to-r from-transparent via-white to-transparent opacity-70"
                style={{
                  marginTop: '-0.5px',
                  marginLeft: '-32px',
                }}
              />
            </div>
          );
        })}
      </motion.div>

      {/* Cosmic dust particles - floating */}
      <motion.div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => {
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          const size = 1 + Math.random() * 2;
          const duration = 15 + Math.random() * 20;
          const xMovement = -20 + Math.random() * 40;
          const yMovement = -30 + Math.random() * 60;
          
          return (
            <motion.div
              key={`dust-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${startX}%`,
                top: `${startY}%`,
                width: `${size}px`,
                height: `${size}px`,
                background: 'rgba(255, 255, 255, 0.2)',
                filter: 'blur(1px)',
              }}
              animate={{
                x: [`0px`, `${xMovement}px`, `0px`],
                y: [`0px`, `${yMovement}px`, `0px`],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: 'linear',
                delay: Math.random() * 5,
              }}
            />
          );
        })}
      </motion.div>

      {/* Aurora/Solar wind effect - flowing gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse 120% 100% at 50% -20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
        }}
        animate={{
          backgroundPosition: ['50% 0%', '60% 10%', '50% 0%'],
          opacity: [0.25, 0.35, 0.25],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Vignette for depth and focus */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 65% at 50% 40%, transparent 30%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.8) 100%)',
        }}
      />

      {/* Content readability overlay - left side for hero text */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(5, 10, 20, 0.75) 0%, rgba(5, 10, 20, 0.4) 35%, transparent 60%)',
        }}
      />

      {/* Bottom fade for footer */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, transparent 100%)',
        }}
      />
    </div>
  );
}
