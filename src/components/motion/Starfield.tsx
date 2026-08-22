import { useEffect, useRef, useMemo, useCallback } from 'react';
import { useParallax } from '@/hooks/useParallax';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Star {
  x: number;
  y: number;
  radius: number;
  brightness: number;
  isPrimary: boolean;
}

interface StarfieldProps {
  className?: string;
  /** Number of stars to render */
  starCount?: number;
  /** Enable parallax on mouse move */
  parallax?: boolean;
  /** Intensity of parallax effect */
  parallaxIntensity?: number;
}

/**
 * Seeded pseudo-random number generator (mulberry32).
 * Ensures consistent star positions across renders.
 */
function seededRandom(seed: number): () => number {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Canvas-based starfield.
 * - Seeded random positions (generated once, not per-frame)
 * - Variation in brightness/size
 * - One "primary system" star highlighted with accent-solar
 * - Mouse-move parallax (subtle)
 * - Reduced motion: fully static, no parallax
 * - Mobile: fewer stars
 */
export function Starfield({
  className = '',
  starCount: baseStarCount = 200,
  parallax = true,
  parallaxIntensity = 0.02,
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();
  const offset = useParallax(parallax ? parallaxIntensity : 0);
  const animFrameRef = useRef<number>(0);

  // Adjust star count based on viewport
  const starCount = useMemo(() => {
    if (typeof window === 'undefined') return baseStarCount;
    return window.innerWidth < 768 ? Math.floor(baseStarCount * 0.5) : baseStarCount;
  }, [baseStarCount]);

  // Generate stars once with seeded random
  const stars = useMemo<Star[]>(() => {
    const rng = seededRandom(42);
    const result: Star[] = [];
    const primaryIndex = Math.floor(rng() * starCount * 0.3) + Math.floor(starCount * 0.35);

    for (let i = 0; i < starCount; i++) {
      result.push({
        x: rng(),
        y: rng(),
        radius: rng() * 1.5 + 0.3,
        brightness: rng() * 0.6 + 0.2,
        isPrimary: i === primaryIndex,
      });
    }
    return result;
  }, [starCount]);

  const drawStars = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, ox: number, oy: number) => {
      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        const sx = star.x * width + ox * width * (star.radius * 0.5);
        const sy = star.y * height + oy * height * (star.radius * 0.5);

        if (star.isPrimary) {
          // Primary system star — accent-solar glow
          const gradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, 8);
          gradient.addColorStop(0, 'rgba(242, 166, 90, 0.9)');
          gradient.addColorStop(0.5, 'rgba(242, 166, 90, 0.2)');
          gradient.addColorStop(1, 'rgba(242, 166, 90, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(sx, sy, 8, 0, Math.PI * 2);
          ctx.fill();

          // Core dot
          ctx.fillStyle = '#F2A65A';
          ctx.beginPath();
          ctx.arc(sx, sy, 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Normal stars — starlight color with varying brightness
          ctx.fillStyle = `rgba(237, 239, 247, ${star.brightness})`;
          ctx.beginPath();
          ctx.arc(sx, sy, star.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    },
    [stars]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      drawStars(ctx, rect.width, rect.height, offset.x, offset.y);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update on parallax offset change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReduced) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(() => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawStars(ctx, rect.width, rect.height, offset.x, offset.y);
    });

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [offset, drawStars, prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
      style={{ opacity: 0.8 }}
    />
  );
}
