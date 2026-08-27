// React import removed

/**
 * Noise Overlay / Film Grain effect
 * Common in premium UIs (Arknights / ZZZ) to break up flat backgrounds
 * and add a tactile, CRT-like feel to glassmorphism.
 */
export function NoiseOverlay() {
  return (
    <>
      <style>{`
        @keyframes noise-shift {
          0% { transform: translate(-2%, 1%); }
          20% { transform: translate(1%, -2%); }
          40% { transform: translate(-1%, 2%); }
          60% { transform: translate(2%, -1%); }
          80% { transform: translate(-2%, -2%); }
          100% { transform: translate(1%, 1%); }
        }
        .animate-noise-shift {
          animation: noise-shift 0.4s steps(2) infinite;
        }
      `}</style>
      <div
        className="pointer-events-none fixed -inset-[100%] z-50 opacity-[0.04] animate-noise-shift"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />
    </>
  );
}
