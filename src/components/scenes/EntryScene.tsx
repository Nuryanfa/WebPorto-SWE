import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import anime from 'animejs';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/* ─────────────────────────────────────────────
   EntryScene — Blueprint §07
   
   Minimal intro: dark screen, NUR.YANFA.EXE
   appears via pixel reveal, then pixel-wipe
   transition into main content.
   
   Session-scoped: shown once per tab session
   (sessionStorage flag). Always skippable.
   ───────────────────────────────────────────── */

interface EntrySceneProps {
  onComplete: () => void;
}

const SESSION_KEY = 'nyanfa_entry_seen';

export function EntryScene({ onComplete }: EntrySceneProps) {
  const prefersReduced = useReducedMotion();

  /* Skip immediately if already seen this session or reduced motion */
  useEffect(() => {
    if (prefersReduced || sessionStorage.getItem(SESSION_KEY)) {
      onComplete();
    }
  }, [prefersReduced, onComplete]);

  if (prefersReduced || sessionStorage.getItem(SESSION_KEY)) return null;

  return <EntrySceneInner onComplete={onComplete} />;
}

function EntrySceneInner({ onComplete }: EntrySceneProps) {
  const [, setPhase] = useState<'reveal' | 'hold' | 'exit'>('reveal');
  const lineRef             = useRef<HTMLDivElement>(null);
  const labelRef            = useRef<HTMLDivElement>(null);
  const nameRef             = useRef<HTMLDivElement>(null);
  const subtitleRef         = useRef<HTMLDivElement>(null);
  const ctaRef              = useRef<HTMLDivElement>(null);
  const wipeRef             = useRef<HTMLDivElement>(null);

  const complete = () => {
    sessionStorage.setItem(SESSION_KEY, '1');
    onComplete();
  };

  /* Entrance timeline */
  useEffect(() => {
    const tl = anime.timeline({ easing: 'easeOutExpo' });

    tl
      .add({ targets: lineRef.current,     scaleX: [0, 1], opacity: [0, 1], duration: 500 }, 300)
      .add({ targets: labelRef.current,    opacity: [0, 1], translateY: [10, 0], duration: 500 }, 600)
      .add({ targets: nameRef.current,     opacity: [0, 1], translateY: [30, 0], duration: 700 }, 800)
      .add({ targets: subtitleRef.current, opacity: [0, 1], translateY: [12, 0], duration: 500 }, 1200)
      .add({ targets: ctaRef.current,      opacity: [0, 1], scale: [0.9, 1],     duration: 400 }, 1600)
      .finished.then(() => setPhase('hold'));
  }, []);

  /* Pixel-wipe exit */
  const triggerExit = () => {
    setPhase('exit');

    anime({
      targets: wipeRef.current,
      scaleX: [0, 1],
      duration: 500,
      easing: 'easeInExpo',
    }).finished.then(complete);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center
                 bg-[var(--bg-base)] select-none overflow-hidden"
      initial={{ opacity: 1 }}
    >
      {/* Pixel wipe overlay (exit) */}
      <div
        ref={wipeRef}
        className="absolute inset-0 bg-[var(--accent-magenta)] origin-left"
        style={{ transform: 'scaleX(0)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-6">

        {/* Horizontal line — sweeps in */}
        <div
          ref={lineRef}
          className="h-[2px] w-20 bg-[var(--accent-magenta)] pixel-decoration origin-left"
          style={{ opacity: 0 }}
          aria-hidden="true"
        />

        {/* Small pixel label */}
        <div
          ref={labelRef}
          className="font-pixel text-[9px] tracking-[0.3em] text-[var(--accent-magenta)] uppercase"
          style={{ opacity: 0 }}
        >
          [ 01 / IDENTITY ]
        </div>

        {/* Name */}
        <div
          ref={nameRef}
          className="font-display font-extrabold tracking-tight text-[var(--text-primary)]"
          style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)', lineHeight: 1, opacity: 0 }}
        >
          NUR<span className="text-[var(--accent-magenta)]">.</span>YANFA
        </div>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          className="font-mono text-[var(--text-tertiary)] tracking-[0.25em] uppercase"
          style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)', opacity: 0 }}
        >
          SOFTWARE ENGINEER · DIGITAL ID
        </div>

        {/* CTA */}
        <motion.div
          ref={ctaRef}
          style={{ opacity: 0 }}
        >
          <button
            onClick={triggerExit}
            data-cursor="cta"
            className="px-btn px-btn--primary mt-4"
            aria-label="Enter experience"
          >
            <span>Enter Experience</span>
            <span className="font-pixel text-[10px] ml-1" aria-hidden="true">→</span>
          </button>
        </motion.div>
      </div>

      {/* Skip button — always accessible */}
      <button
        onClick={complete}
        className="absolute bottom-8 right-8 font-mono text-[10px] tracking-widest
                   uppercase text-[var(--text-faint)] hover:text-[var(--text-tertiary)]
                   transition-colors duration-150 focus-visible:outline focus-visible:outline-2
                   focus-visible:outline-[var(--accent-cyan)]"
        aria-label="Skip intro"
      >
        SKIP →
      </button>

      {/* Pixel corner decorations */}
      <PixelCorner pos="tl" />
      <PixelCorner pos="tr" />
      <PixelCorner pos="bl" />
      <PixelCorner pos="br" />
    </motion.div>
  );
}

/* ── Corner bracket decoration ── */
function PixelCorner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const classes: Record<typeof pos, string> = {
    tl: 'top-6 left-6 border-t-2 border-l-2',
    tr: 'top-6 right-6 border-t-2 border-r-2',
    bl: 'bottom-6 left-6 border-b-2 border-l-2',
    br: 'bottom-6 right-6 border-b-2 border-r-2',
  };
  return (
    <div
      aria-hidden="true"
      className={`absolute w-6 h-6 border-[var(--accent-magenta)]/40 ${classes[pos]}`}
    />
  );
}
