import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import anime from 'animejs';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/* ─────────────────────────────────────────────
   SceneTransitionController — Blueprint §17

   Provides intentional scene transitions when
   a nav link is clicked — NOT smooth anchor scroll.

   Transition types (direction-aware):
     forward  → pixel blocks sweep left→right then reveal
     backward → pixel blocks sweep right→left then reveal
     same     → clean fade + scale (e.g. same route)

   State machine:
     idle → transitioning → entering → idle

   Scroll vs Click:
     Nav click    → full scene transition
     User scroll  → natural (Lenis handles it)
   ───────────────────────────────────────────── */

/* ── Scene order for direction detection ── */
const SCENE_ORDER = ['/', '/about', '/projects', '/#experience', '/contact'];

type TransitionState = 'idle' | 'transitioning' | 'entering';
type TransitionType  = 'pixel-wipe' | 'typography-shift' | 'color-wash' | 'fade';

interface SceneCtx {
  /** Call this instead of navigate() for transitions */
  navigateTo: (href: string) => void;
  state: TransitionState;
}

const SceneContext = createContext<SceneCtx>({
  navigateTo: () => {},
  state: 'idle',
});

export function useSceneNav() {
  return useContext(SceneContext);
}

/* ── Pixel block strip — used for wipe overlay ── */
const BLOCK_COUNT = 12; // number of vertical strips

/** Pick the transition type based on route pair */
function pickTransition(from: string, to: string): TransitionType {
  const fi = SCENE_ORDER.indexOf(from);
  const ti = SCENE_ORDER.indexOf(to);
  const diff = Math.abs(ti - fi);

  if (diff === 0)  return 'fade';
  // Large jumps get pixel wipe (most dramatic)
  if (diff >= 2)   return 'pixel-wipe';
  // Adjacent forward: typography shift
  if (ti > fi)     return 'typography-shift';
  // Adjacent backward: color wash
  return 'color-wash';
}

/** Accent for the wipe overlay — uses destination scene accent */
const SCENE_ACCENTS: Record<string, string> = {
  '/':           'var(--scene-identity)',
  '/about':      'var(--scene-profile)',
  '/projects':   'var(--scene-work)',
  '/#experience':'var(--scene-experience)',
  '/contact':    'var(--scene-contact)',
};

/* ════════════════════════════════════════════
   Provider
   ════════════════════════════════════════════ */
export function SceneTransitionProvider({ children }: { children: ReactNode }) {
  const navigate       = useNavigate();
  const location       = useLocation();
  const prefersReduced = useReducedMotion();

  const [state,    setState]    = useState<TransitionState>('idle');
  const [overlay,  setOverlay]  = useState<{
    type: TransitionType;
    accent: string;
    direction: 'forward' | 'backward' | 'same';
  } | null>(null);

  const pendingRef = useRef<string | null>(null);

  const navigateTo = useCallback((href: string) => {
    /* Extract pathname for comparison */
    const fromPath = location.pathname + (location.hash || '');
    const toPath   = href;

    if (fromPath === toPath) return;

    /* Reduced motion: navigate immediately without overlay */
    if (prefersReduced) {
      if (href.includes('#')) {
        const [p, h] = href.split('#');
        navigate({ pathname: p || '/', hash: `#${h}` });
        setTimeout(() => document.getElementById(h)?.scrollIntoView({ behavior: 'auto' }), 80);
      } else {
        navigate(href);
      }
      return;
    }

    const fi = SCENE_ORDER.indexOf(fromPath);
    const ti = SCENE_ORDER.indexOf(toPath);
    const dir: 'forward' | 'backward' | 'same' =
      fi === -1 || ti === -1 ? 'forward'
      : ti > fi ? 'forward'
      : ti < fi ? 'backward'
      : 'same';

    const type   = pickTransition(fromPath, toPath);
    const accent = SCENE_ACCENTS[toPath] ?? 'var(--accent-magenta)';

    pendingRef.current = href;
    setState('transitioning');
    setOverlay({ type, accent, direction: dir });
  }, [location, navigate, prefersReduced]);

  /* Called by overlay component when exit animation completes */
  const onOverlayPeak = useCallback(() => {
    const href = pendingRef.current;
    if (!href) return;

    if (href.includes('#')) {
      const [p, h] = href.split('#');
      navigate({ pathname: p || '/', hash: `#${h}` });
      setTimeout(() => {
        document.getElementById(h)?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      navigate(href);
    }

    pendingRef.current = null;
    setState('entering');
  }, [navigate]);

  const onOverlayDone = useCallback(() => {
    setState('idle');
    setOverlay(null);
  }, []);

  return (
    <SceneContext.Provider value={{ navigateTo, state }}>
      {children}

      {/* Transition overlay — rendered on top of everything */}
      <AnimatePresence>
        {overlay && (
          <TransitionOverlay
            key={`${overlay.type}-${overlay.accent}`}
            type={overlay.type}
            accent={overlay.accent}
            direction={overlay.direction}
            onPeak={onOverlayPeak}
            onDone={onOverlayDone}
          />
        )}
      </AnimatePresence>
    </SceneContext.Provider>
  );
}

/* ════════════════════════════════════════════
   Overlay component
   Handles the visual transition, calls back at
   the "peak" moment (fully covering screen) and
   "done" moment (fully revealed again).
   ════════════════════════════════════════════ */
function TransitionOverlay({
  type,
  accent,
  direction,
  onPeak,
  onDone,
}: {
  type:      TransitionType;
  accent:    string;
  direction: 'forward' | 'backward' | 'same';
  onPeak:    () => void;
  onDone:    () => void;
}) {
  /* Use an anime.js timeline for the full sequence */
  const containerRef = useRef<HTMLDivElement>(null);
  const hasFired     = useRef(false);

  /* ── Run on mount ── */
  const runTimeline = useCallback((el: HTMLDivElement) => {
    if (hasFired.current) return;
    hasFired.current = true;

    const strips = el.querySelectorAll('.st-strip');

    if (type === 'pixel-wipe') {
      /* Strips sweep in from left/right, peak, then sweep out */
      const enterDir = direction === 'backward' ? 1 : -1;

      anime.timeline({ easing: 'easeInExpo' })
        .add({
          targets:    strips,
          scaleY:     [0, 1],
          translateX: [`${enterDir * 100}%`, '0%'],
          delay:      anime.stagger(30, { from: direction === 'backward' ? 'last' : 'first' }),
          duration:   320,
        })
        .finished.then(() => {
          onPeak();
          anime.timeline({ easing: 'easeOutExpo' })
            .add({
              targets:    strips,
              scaleY:     [1, 0],
              delay:      anime.stagger(25, { from: direction === 'backward' ? 'first' : 'last' }),
              duration:   280,
            })
            .finished.then(onDone);
        });
    }

    else if (type === 'typography-shift') {
      /* Single panel slides across + fades */
      const panel = el.querySelector('.st-panel') as HTMLElement | null;
      if (!panel) { onPeak(); onDone(); return; }

      anime.timeline({ easing: 'easeInOutExpo' })
        .add({
          targets:      panel,
          translateX:   [direction === 'backward' ? '100%' : '-100%', '0%'],
          opacity:      [0, 1],
          duration:     280,
        })
        .finished.then(() => {
          onPeak();
          anime({
            targets:    panel,
            translateX: direction === 'backward' ? '-60%' : '60%',
            opacity:    0,
            duration:   260,
            easing:     'easeInExpo',
          }).finished.then(onDone);
        });
    }

    else if (type === 'color-wash') {
      /* Background colour floods from top */
      const panel = el.querySelector('.st-panel') as HTMLElement | null;
      if (!panel) { onPeak(); onDone(); return; }

      anime.timeline({ easing: 'easeInExpo' })
        .add({ targets: panel, scaleY: [0, 1], duration: 300 })
        .finished.then(() => {
          onPeak();
          anime({ targets: panel, scaleY: 0, duration: 280, easing: 'easeOutExpo' })
            .finished.then(onDone);
        });
    }

    else {
      /* fade */
      anime({
        targets:  el,
        opacity:  [0, 1, 0],
        duration: 500,
        easing:   'easeInOutSine',
      }).finished.then(() => { onPeak(); onDone(); });
    }
  }, [type, direction, onPeak, onDone]);

  return (
    <motion.div
      ref={(el) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        if (el) runTimeline(el);
      }}
      className="fixed inset-0 z-[150] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {(type === 'pixel-wipe') && (
        /* Vertical pixel strips */
        <div className="absolute inset-0 flex">
          {Array.from({ length: BLOCK_COUNT }).map((_, i) => (
            <div
              key={i}
              className="st-strip flex-1 h-full origin-top"
              style={{
                background:       accent,
                transform:        'scaleY(0)',
                opacity:          0.96,
                imageRendering:   'pixelated',
              }}
            />
          ))}
        </div>
      )}

      {(type === 'typography-shift' || type === 'color-wash') && (
        <div
          className="st-panel absolute inset-0 origin-top"
          style={{
            background:     accent,
            opacity:        type === 'typography-shift' ? 0 : 1,
            transform:      type === 'typography-shift'
              ? `translateX(${direction === 'backward' ? '100%' : '-100%'})`
              : 'scaleY(0)',
          }}
        />
      )}

      {type === 'fade' && (
        <div
          className="st-panel absolute inset-0"
          style={{ background: accent, opacity: 0 }}
        />
      )}
    </motion.div>
  );
}
