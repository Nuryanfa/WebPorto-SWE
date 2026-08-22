import { motion } from 'motion/react';
import { useMemo } from 'react';

interface Orb {
  id: number;
  size: number;
  x: number;
  y: number;
  color: string;
  duration: number;
  delay: number;
}

/**
 * AnimatedOrbs Component
 * Creates floating, glowing orbs that move smoothly across the screen
 * Adds depth and visual interest to the background
 */
export function AnimatedOrbs() {
  const orbs = useMemo<Orb[]>(() => {
    const colors = [
      'rgba(139, 123, 255, 0.12)', // Purple - REDUCED
      'rgba(93, 253, 203, 0.10)',  // Cyan - REDUCED
      'rgba(255, 107, 181, 0.11)', // Pink - REDUCED
      'rgba(255, 179, 102, 0.09)', // Orange - REDUCED
    ];

    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 250 + 120, // Slightly smaller
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[i % colors.length],
      duration: Math.random() * 20 + 30,
      delay: Math.random() * -20,
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            filter: 'blur(70px)', // Reduced blur
          }}
          animate={{
            x: [
              0,
              Math.random() * 200 - 100,
              Math.random() * 200 - 100,
              0,
            ],
            y: [
              0,
              Math.random() * 200 - 100,
              Math.random() * 200 - 100,
              0,
            ],
            scale: [1, 1.2, 0.9, 1], // Less dramatic
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
