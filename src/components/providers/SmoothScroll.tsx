import { useEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * SmoothScroll Provider — wraps app content with Lenis smooth scroll.
 * §2.5: duration 1.2, cubic easing, disabled for prefers-reduced-motion.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced-motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Remove native smooth scroll (Lenis handles it)
    document.documentElement.style.scrollBehavior = 'auto';

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return <>{children}</>;
}
