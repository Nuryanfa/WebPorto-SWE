import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';

/**
 * Custom Cursor — Reticle dot + lagging ring.
 * §2.1: dot 6px accent-nebula + ring 32px that follows with spring delay.
 * Magnetic effect on [data-magnetic] elements.
 * Disabled on touch devices.
 */
export function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Ring follows with spring delay
  const ringX = useSpring(cursorX, { damping: 30, stiffness: 200, mass: 0.5 });
  const ringY = useSpring(cursorY, { damping: 30, stiffness: 200, mass: 0.5 });

  const magneticElements = useRef<Set<HTMLElement>>(new Set());

  useEffect(() => {
    if (isTouch) return;

    // Add custom-cursor class to html for cursor:none
    document.documentElement.classList.add('custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Magnetic effect on hovered elements
      magneticElements.current.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        const threshold = Math.max(rect.width, rect.height) * 0.8;

        if (distance < threshold) {
          const pull = Math.min(8, (1 - distance / threshold) * 8);
          const moveX = (distX / distance) * pull;
          const moveY = (distY / distance) * pull;
          el.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          el.style.transform = '';
        }
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-magnetic]');
      if (target) {
        setIsHovering(true);
        magneticElements.current.add(target as HTMLElement);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-magnetic]');
      if (target) {
        setIsHovering(false);
        (target as HTMLElement).style.transform = '';
        magneticElements.current.delete(target as HTMLElement);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.documentElement.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isTouch, cursorX, cursorY]);

  if (isTouch) return null;

  const ringSize = isHovering ? 48 : 32;

  return (
    <>
      {/* Dot — instant follow */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div
          className="w-[6px] h-[6px] rounded-full"
          style={{ backgroundColor: 'var(--accent-nebula)' }}
        />
      </motion.div>

      {/* Ring — spring-delayed follow */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border"
          style={{ borderColor: 'var(--accent-nebula)' }}
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: isHovering ? 0.8 : 0.4,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        />
      </motion.div>
    </>
  );
}
