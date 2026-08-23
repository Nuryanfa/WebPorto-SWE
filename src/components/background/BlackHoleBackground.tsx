import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Black Hole Background - Home Page
 * 
 * Strategy: Real Asset (EHT M87 Black Hole image)
 * - Full-bleed background image centered
 * - Subtle rotation/pulse animation
 * - Heavy gradient overlay for text legibility
 * - Reduced motion: static image (no animation)
 * 
 * Asset: public/assets/backgrounds/black-hole.jpg
 * Source: EHT (Event Horizon Telescope) / ESO
 */
export function BlackHoleBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 bg-black" style={{ zIndex: 0 }} aria-hidden="true">
      {/* Black Hole background image with slow rotation/pulse effect */}
      <div
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          style={{
            backgroundImage: 'url(/assets/backgrounds/black-hole.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh',
            transformOrigin: 'center center',
            animation: prefersReducedMotion 
              ? 'none' 
              : 'accretionRotate 120s linear infinite',
            // Increase scale slightly so rotation doesn't reveal edges if the image isn't perfectly square
            transform: 'scale(1.2)'
          }}
        />
      </div>

      {/* Heavy gradient overlay for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at center, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.9) 70%),
            linear-gradient(180deg, rgba(8, 10, 18, 0.8) 0%, rgba(8, 10, 18, 0.2) 50%, rgba(8, 10, 18, 0.95) 100%)
          `,
        }}
      />

      {/* Starfield overlay (reduced opacity) */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.15,
          background: `
            radial-gradient(2px 2px at 20% 30%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(2px 2px at 80% 10%, white, transparent),
            radial-gradient(1px 1px at 90% 80%, white, transparent)
          `,
          backgroundSize: '200px 200px, 250px 250px, 300px 300px, 220px 220px',
        }}
      />

      {/* Bottom fade for footer integration */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background: 'linear-gradient(0deg, rgba(8, 10, 18, 1) 0%, transparent 100%)',
        }}
      />

      {/* Animation definition */}
      <style>{`
        @keyframes accretionRotate {
          0% {
            transform: scale(1.1) rotate(0deg);
          }
          50% {
            transform: scale(1.15) rotate(180deg);
          }
          100% {
            transform: scale(1.1) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
