import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/* ─────────────────────────────────────────────
   PixelCursor — Blueprint §23
   
   Context types:
     default  → small pixel square   4×4
     link     → pixel arrow →        12×9
     project  → "VIEW" label
     cta      → ✦ glyph
   
   Desktop only — hidden on touch devices.
   Respects prefers-reduced-motion.
   ───────────────────────────────────────────── */

type CursorCtx = 'default' | 'link' | 'project' | 'cta';

/* Data attributes that trigger context change:
   data-cursor="link"    → any <a> or <button>
   data-cursor="project" → project card
   data-cursor="cta"     → primary CTA button      */

export function PixelCursor() {
  const prefersReduced = useReducedMotion();
  const [isTouch,  setIsTouch]  = useState(false);
  const [ctx,      setCtx]      = useState<CursorCtx>('default');
  const [visible,  setVisible]  = useState(false);
  const lastCtxRef = useRef<CursorCtx>('default');

  /* Raw mouse position */
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  /* Smooth follow — looser for body cursor, tighter for the dot */
  const springCfg = { stiffness: 550, damping: 38, mass: 0.6 };
  const x = useSpring(rawX, springCfg);
  const y = useSpring(rawY, springCfg);

  /* Detect touch-only device on mount */
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouch || prefersReduced) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);

      /* Context detection — walk up from target */
      let el: HTMLElement | null = e.target as HTMLElement;
      let found: CursorCtx = 'default';

      while (el) {
        const dc = el.dataset?.cursor as CursorCtx | undefined;
        if (dc) { found = dc; break; }

        const tag = el.tagName?.toLowerCase();
        if ((tag === 'a' || tag === 'button') && found === 'default') found = 'link';

        el = el.parentElement;
      }

      if (found !== lastCtxRef.current) {
        lastCtxRef.current = found;
        setCtx(found);
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener('mousemove',  onMove,  { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    /* Hide default cursor */
    document.documentElement.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.documentElement.style.cursor = '';
    };
  }, [isTouch, prefersReduced, rawX, rawY, visible]);

  /* Also hide cursor on interactive elements */
  useEffect(() => {
    if (isTouch || prefersReduced) return;
    const style = document.createElement('style');
    style.id = 'pixel-cursor-hide';
    style.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(style);
    return () => { document.getElementById('pixel-cursor-hide')?.remove(); };
  }, [isTouch, prefersReduced]);

  if (isTouch || prefersReduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ x, y }}
    >
      <motion.div
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.12 }}
        /* Offset so the hot-spot is at top-left of each shape */
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <AnimatedCursorShape ctx={ctx} />
      </motion.div>
    </motion.div>
  );
}

/* ── Shape switcher ── */
function AnimatedCursorShape({ ctx }: { ctx: CursorCtx }) {
  return (
    <motion.div
      key={ctx}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{    opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.12, ease: 'easeOut' }}
    >
      {ctx === 'default' && <DefaultCursor />}
      {ctx === 'link'    && <LinkCursor />}
      {ctx === 'project' && <ProjectCursor />}
      {ctx === 'cta'     && <CtaCursor />}
    </motion.div>
  );
}

/* ── Default: 4×4 magenta square ── */
function DefaultCursor() {
  return (
    <div
      style={{
        width: 6,
        height: 6,
        background: 'var(--accent-magenta)',
        imageRendering: 'pixelated',
      }}
    />
  );
}

/* ── Link: pixel arrow SVG ── */
function LinkCursor() {
  return (
    <svg
      width="14" height="10" viewBox="0 0 14 10" fill="none"
      aria-hidden="true"
      style={{ imageRendering: 'pixelated', display: 'block' }}
    >
      <rect x="0"  y="4" width="9" height="2" fill="var(--accent-magenta)" />
      <rect x="9"  y="4" width="2" height="2" fill="var(--accent-magenta)" />
      <rect x="11" y="2" width="2" height="6" fill="var(--accent-magenta)" />
      <rect x="13" y="0" width="1" height="10" fill="var(--accent-magenta)" />
    </svg>
  );
}

/* ── Project: "VIEW" mono label ── */
function ProjectCursor() {
  return (
    <div
      style={{
        fontFamily: 'var(--font-pixel)',
        fontSize: 9,
        letterSpacing: '0.15em',
        color: 'var(--bg-base)',
        background: 'var(--accent-cyan)',
        padding: '4px 8px',
        imageRendering: 'pixelated',
        whiteSpace: 'nowrap',
      }}
    >
      VIEW
    </div>
  );
}

/* ── CTA: ✦ glyph ── */
function CtaCursor() {
  return (
    <div
      style={{
        fontFamily: 'var(--font-pixel)',
        fontSize: 12,
        color: 'var(--accent-magenta)',
        lineHeight: 1,
        imageRendering: 'pixelated',
        textShadow: '0 0 8px var(--accent-magenta-glow)',
      }}
    >
      ✦
    </div>
  );
}
