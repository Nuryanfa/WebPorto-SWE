import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Satellite / Earth Background - Contact Page
 * 
 * Strategy: Real Asset (Earth from Space)
 * - Full-bleed background image, anchored to bottom or center
 * - Very subtle pan to simulate orbital motion
 * - Strong gradient overlay to keep forms and text highly readable
 * 
 * Asset: public/assets/backgrounds/earth-limb.jpg
 */
export function SatelliteBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 bg-black" style={{ zIndex: 0 }} aria-hidden="true">
      {/* Earth background image with slow orbital pan effect */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/assets/backgrounds/earth-limb.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          animation: prefersReducedMotion 
            ? 'none' 
            : 'orbitalPan 180s linear infinite alternate',
          // Slight scale to allow panning without showing edges
          transform: 'scale(1.05)'
        }}
      />

      {/* Heavy gradient overlay for text and form legibility */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, 
              rgba(8, 10, 18, 0.95) 0%, 
              rgba(8, 10, 18, 0.7) 40%, 
              rgba(8, 10, 18, 0.9) 100%
            )
          `,
        }}
      />

      {/* Grid overlay for a "tactical/satellite" UI feel */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />

      {/* Animation definition */}
      <style>{`
        @keyframes orbitalPan {
          0% {
            background-position: 40% bottom;
          }
          100% {
            background-position: 60% bottom;
          }
        }
      `}</style>
    </div>
  );
}
