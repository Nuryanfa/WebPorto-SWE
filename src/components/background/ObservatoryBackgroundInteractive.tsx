import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { useRef, useEffect } from 'react';

/**
 * Observatory Background - Premium Interactive Version
 * 
 * Same as ObservatoryBackground but with mouse parallax interaction
 * for added premium feel and engagement
 */
export function ObservatoryBackgroundInteractive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 100 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Transform mouse to subtle rotation/translation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [1, -1]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-1, 1]);
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Normalize to -0.5 to 0.5
      const x = (clientX / innerWidth) - 0.5;
      const y = (clientY / innerHeight) - 0.5;
      
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Scroll parallax (subtle)
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const coordY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const starsY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0" 
      style={{ zIndex: 0 }} 
      aria-hidden="true"
    >
      {/* Deep void base */}
      <div 
        className="absolute inset-0" 
        style={{ background: '#080A12' }} 
      />

      {/* Layer 1: Celestial coordinate grid - with mouse parallax */}
      <motion.div
        className="absolute inset-0 opacity-[0.08]"
        style={{ 
          y: gridY,
          x: translateX,
          rotateX,
          rotateY,
        }}
      >
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="gridFadeInteractive" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EDEFF7" stopOpacity="0" />
              <stop offset="20%" stopColor="#EDEFF7" stopOpacity="1" />
              <stop offset="80%" stopColor="#EDEFF7" stopOpacity="1" />
              <stop offset="100%" stopColor="#EDEFF7" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Horizontal lines */}
          {Array.from({ length: 8 }).map((_, i) => {
            const y = (i + 1) * (100 / 9);
            return (
              <line
                key={`dec-${i}`}
                x1="0%"
                y1={`${y}%`}
                x2="100%"
                y2={`${y}%`}
                stroke="url(#gridFadeInteractive)"
                strokeWidth="0.5"
              />
            );
          })}

          {/* Vertical lines */}
          {Array.from({ length: 12 }).map((_, i) => {
            const x = (i + 1) * (100 / 13);
            return (
              <line
                key={`ra-${i}`}
                x1={`${x}%`}
                y1="0%"
                x2={`${x}%`}
                y2="100%"
                stroke="#EDEFF7"
                strokeWidth="0.5"
                opacity="0.6"
              />
            );
          })}

          {/* Grid intersections */}
          {Array.from({ length: 3 }).map((_, i) => {
            const y = (i + 1) * 25;
            return Array.from({ length: 4 }).map((_, j) => {
              const x = (j + 1) * 20;
              return (
                <circle
                  key={`marker-${i}-${j}`}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="1.5"
                  fill="#7C6FF0"
                  opacity="0.4"
                />
              );
            });
          })}
        </svg>

        <div className="absolute top-4 right-8 text-xs font-mono text-[#767F94] tracking-wider opacity-50">
          RA: 07h 45m
        </div>
        <div className="absolute bottom-4 left-8 text-xs font-mono text-[#767F94] tracking-wider opacity-50">
          DEC: +20° 15'
        </div>
      </motion.div>

      {/* Layer 2: Starfield with mouse parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ 
          y: starsY,
          x: useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5]),
          rotateX: useTransform(mouseYSpring, [-0.5, 0.5], [0.5, -0.5]),
        }}
      >
        <svg className="absolute inset-0 w-full h-full">
          {Array.from({ length: 120 }).map((_, i) => {
            const seed = i * 2654435761;
            const x = ((seed % 10000) / 10000) * 100;
            const y = (((seed * 13) % 10000) / 10000) * 100;
            const magnitude = Math.pow((seed % 100) / 100, 2);
            const size = 0.5 + magnitude * 2;
            const opacity = 0.2 + magnitude * 0.6;
            const isPrimary = i % 25 === 0;

            return (
              <g key={`star-${i}`}>
                <circle
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r={size}
                  fill={isPrimary ? '#7C6FF0' : '#EDEFF7'}
                  opacity={opacity}
                >
                  {isPrimary && (
                    <animate
                      attributeName="opacity"
                      values={`${opacity};${opacity * 0.5};${opacity}`}
                      dur={`${4 + (seed % 6)}s`}
                      repeatCount="indefinite"
                    />
                  )}
                </circle>

                {isPrimary && (
                  <>
                    <line x1={`${x}%`} y1={`${y - 0.8}%`} x2={`${x}%`} y2={`${y - 1.5}%`} stroke="#7C6FF0" strokeWidth="0.5" opacity="0.3" />
                    <line x1={`${x}%`} y1={`${y + 0.8}%`} x2={`${x}%`} y2={`${y + 1.5}%`} stroke="#7C6FF0" strokeWidth="0.5" opacity="0.3" />
                    <line x1={`${x - 0.8}%`} y1={`${y}%`} x2={`${x - 1.5}%`} y2={`${y}%`} stroke="#7C6FF0" strokeWidth="0.5" opacity="0.3" />
                    <line x1={`${x + 0.8}%`} y1={`${y}%`} x2={`${x + 1.5}%`} y2={`${y}%`} stroke="#7C6FF0" strokeWidth="0.5" opacity="0.3" />
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* Layer 3: Technical annotations */}
      <motion.div
        className="absolute inset-0 opacity-[0.06]"
        style={{ y: coordY }}
      >
        <motion.div
          className="absolute left-0 right-0 h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #7C6FF0 50%, transparent 100%)',
            boxShadow: '0 0 8px rgba(124, 111, 240, 0.4)',
          }}
          animate={{ top: ['20%', '80%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear', repeatType: 'reverse' }}
        />

        <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" width="1200" height="1200" viewBox="0 0 1200 1200">
          {[300, 450, 600].map((r, i) => (
            <circle key={`arc-${i}`} cx="600" cy="600" r={r} fill="none" stroke="#EDEFF7" strokeWidth="0.5" opacity="0.15" strokeDasharray="4 8" />
          ))}

          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const r1 = 280;
            const r2 = 300;
            return (
              <line
                key={`angle-${i}`}
                x1={600 + r1 * Math.cos(angle)}
                y1={600 + r1 * Math.sin(angle)}
                x2={600 + r2 * Math.cos(angle)}
                y2={600 + r2 * Math.sin(angle)}
                stroke="#7C6FF0"
                strokeWidth="1"
                opacity="0.3"
              />
            );
          })}
        </svg>
      </motion.div>

      {/* Layer 4: Ambient nebula - follows mouse subtly */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 50% 60% at 75% 35%, rgba(124, 111, 240, 0.03), transparent 60%),
            radial-gradient(ellipse 40% 50% at 25% 70%, rgba(242, 166, 90, 0.02), transparent 50%)
          `,
          x: useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]),
          y: useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]),
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Layer 5: Data stream particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => {
          const startX = Math.random() * 100;
          const duration = 15 + Math.random() * 10;
          const delay = Math.random() * 8;

          return (
            <motion.div
              key={`data-${i}`}
              className="absolute w-[1px] h-12"
              style={{
                left: `${startX}%`,
                background: 'linear-gradient(180deg, transparent 0%, rgba(124, 111, 240, 0.4) 50%, transparent 100%)',
              }}
              initial={{ top: '-5%', opacity: 0 }}
              animate={{ top: '105%', opacity: [0, 0.6, 0.6, 0] }}
              transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
            />
          );
        })}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 70% at 50% 45%, transparent 40%, rgba(8, 10, 18, 0.6) 80%, rgba(8, 10, 18, 0.9) 100%)',
      }} />

      {/* Content readability gradients */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(90deg, rgba(8, 10, 18, 0.85) 0%, rgba(8, 10, 18, 0.3) 40%, transparent 70%)',
      }} />

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{
        background: 'linear-gradient(0deg, rgba(8, 10, 18, 0.95) 0%, transparent 100%)',
      }} />
    </div>
  );
}
