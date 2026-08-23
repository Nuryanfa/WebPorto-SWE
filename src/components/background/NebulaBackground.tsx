import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Nebula Background - About Page
 * 
 * Strategy: Real Asset (NASA JWST Carina Nebula image)
 * - Full-bleed background image
 * - Ken Burns effect (slow zoom + pan)
 * - Gradient overlay for text legibility
 * - Reduced motion: static image (no animation)
 * 
 * Asset: public/assets/backgrounds/nebula-carina.webp
 * Source: NASA JWST - Cosmic Cliffs in Carina Nebula
 * License: Public Domain
 */
export function NebulaBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="fixed inset-0" style={{ zIndex: 0 }} aria-hidden="true">
      {/* Nebula background image with Ken Burns effect */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/assets/backgrounds/nebula-carina.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          animation: prefersReducedMotion ? 'none' : 'kenburns 60s ease-in-out infinite alternate',
        }}
      />

      {/* Gradient overlay for text legibility (WCAG AA compliance) */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(90deg, 
              rgba(8, 10, 18, 0.85) 0%, 
              rgba(8, 10, 18, 0.4) 40%, 
              rgba(8, 10, 18, 0.6) 100%
            )
          `,
        }}
      />

      {/* Starfield overlay (reduced opacity to not conflict with nebula) */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.3,
          background: `
            radial-gradient(2px 2px at 20% 30%, white, transparent),
            radial-gradient(2px 2px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(2px 2px at 90% 60%, white, transparent),
            radial-gradient(1px 1px at 33% 80%, white, transparent),
            radial-gradient(1px 1px at 15% 90%, white, transparent)
          `,
          backgroundSize: '200px 200px, 300px 300px, 250px 250px, 280px 280px, 220px 220px, 290px 290px, 260px 260px',
          backgroundPosition: '0 0, 40px 60px, 130px 270px, 70px 100px, 150px 50px, 200px 180px, 90px 220px',
        }}
      />

      {/* Vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.6) 100%)',
        }}
      />

      {/* Bottom fade for footer */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(0deg, rgba(8, 10, 18, 0.95) 0%, transparent 100%)',
        }}
      />

      {/* Ken Burns animation definition */}
      <style>{`
        @keyframes kenburns {
          0% {
            transform: scale(1) translate(0, 0);
          }
          100% {
            transform: scale(1.08) translate(-1%, 1%);
          }
        }
      `}</style>
    </div>
  );
}
