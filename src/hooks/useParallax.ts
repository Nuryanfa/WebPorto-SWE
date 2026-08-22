import { useState, useEffect, useCallback, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';
import { useIsTouchDevice } from './useIsTouchDevice';

interface ParallaxOffset {
  x: number;
  y: number;
}

/**
 * Mouse-move parallax hook for the starfield.
 * Returns normalized x/y offsets (-1 to 1) based on mouse position.
 * Automatically disabled for touch devices and reduced-motion preference.
 * 
 * @param intensity - Multiplier for the effect (default: 1)
 */
export function useParallax(intensity: number = 1): ParallaxOffset {
  const [offset, setOffset] = useState<ParallaxOffset>({ x: 0, y: 0 });
  const prefersReduced = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const rafId = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prefersReduced || isTouch) return;

      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const x = ((e.clientX / window.innerWidth) * 2 - 1) * intensity;
        const y = ((e.clientY / window.innerHeight) * 2 - 1) * intensity;
        setOffset({ x, y });
      });
    },
    [intensity, prefersReduced, isTouch]
  );

  useEffect(() => {
    if (prefersReduced || isTouch) {
      setOffset({ x: 0, y: 0 });
      return;
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [handleMouseMove, prefersReduced, isTouch]);

  return offset;
}
