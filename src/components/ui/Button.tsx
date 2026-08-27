import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { motion } from 'motion/react';

/* ─────────────────────────────────────────────
   Button — Pixel-Corner CTA System

   Variants:
     primary  — hot-pink filled, stepped clip-path corner, pixel arrow
     outline  — cyan border, pixel corner brackets on hover, pixel arrow
     ghost    — bare text link with animated underline + pixel arrow

   Architecture note:
   Each variant is a self-contained motion element.
   No nested flex-span wrappers that could overflow their parent.
   ───────────────────────────────────────────── */

type ButtonVariant = 'primary' | 'outline' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  ButtonVariant;
  children:  ReactNode;
  href?:     string;
  arrow?:    boolean;
  external?: boolean;
  className?: string;
}

const BASE =
  'inline-flex items-center gap-2.5 cursor-pointer select-none ' +
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-secondary)] ' +
  'font-display font-bold text-sm tracking-wide uppercase whitespace-nowrap';

const STYLES: Record<ButtonVariant, string> = {
  primary:
    'relative overflow-hidden px-6 py-3 ' +
    'bg-[var(--accent-primary)] text-white ' +
    '[clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,0_100%)] ' +
    'shadow-[3px_3px_0_var(--pixel-border-dark)] ' +
    'hover:shadow-[5px_5px_0_var(--pixel-border-dark)] ' +
    'active:shadow-[1px_1px_0_var(--pixel-border-dark)] ' +
    'active:translate-x-[2px] active:translate-y-[2px] ' +
    'transition-shadow duration-[var(--duration-fast)]',

  outline:
    'relative px-6 py-3 ' +
    'bg-transparent border border-[var(--accent-secondary)] text-[var(--accent-secondary)] ' +
    '[clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,0_100%)] ' +
    'hover:bg-[rgba(0,245,255,0.06)] ' +
    'transition-colors duration-[var(--duration-fast)]',

  ghost: 'relative bg-transparent p-0 text-[var(--accent-primary)]',
};

export function Button({
  variant   = 'primary',
  children,
  href,
  arrow,
  external  = false,
  className = '',
  ...props
}: ButtonProps) {
  const showArrow = arrow ?? (variant !== 'ghost');
  const cls       = `${BASE} ${STYLES[variant]} ${className}`.replace(/\s+/g, ' ').trim();
  const anchorExt = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  /* Shared inner content — same for <a> and <button> */
  const content = (
    <>
      {/* Primary: shimmer overlay */}
      {variant === 'primary' && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
          variants={{
            idle:  { x: '-100%' },
            hover: { x: '220%', transition: { duration: 0.55, ease: 'easeInOut' } },
            tap:   { x: '-100%' },
          }}
        />
      )}

      {/* Outline: pixel corner brackets */}
      {variant === 'outline' && (
        <>
          <motion.span
            aria-hidden="true"
            className="absolute top-0 left-0 w-[10px] h-[10px] border-t-2 border-l-2 border-[var(--accent-secondary)] pointer-events-none"
            variants={{
              idle:  { opacity: 0, scale: 0.5 },
              hover: { opacity: 1, scale: 1, transition: { duration: 0.15 } },
              tap:   { opacity: 1 },
            }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute bottom-0 right-0 w-[10px] h-[10px] border-b-2 border-r-2 border-[var(--accent-secondary)] pointer-events-none"
            variants={{
              idle:  { opacity: 0, scale: 0.5 },
              hover: { opacity: 1, scale: 1, transition: { duration: 0.15 } },
              tap:   { opacity: 1 },
            }}
          />
        </>
      )}

      {/* Ghost: underline sweep */}
      {variant === 'ghost' && (
        <motion.span
          aria-hidden="true"
          className="absolute bottom-px left-0 right-0 h-px bg-[var(--accent-primary)] origin-left pointer-events-none"
          variants={{
            idle:  { scaleX: 0 },
            hover: { scaleX: 1, transition: { duration: 0.2, ease: 'easeOut' } },
            tap:   { scaleX: 1 },
          }}
        />
      )}

      {/* Label — always visible, always on top */}
      <span className="relative z-10">{children}</span>

      {/* Pixel arrow */}
      {showArrow && (
        <motion.span
          aria-hidden="true"
          className="relative z-10 flex items-center flex-shrink-0"
          variants={{
            idle:  { x: 0 },
            hover: { x: variant === 'ghost' ? 5 : 4, transition: { duration: 0.2, ease: 'easeOut' } },
            tap:   { x: 2 },
          }}
        >
          <PixelArrow
            color={
              variant === 'primary'
                ? 'white'
                : variant === 'outline'
                ? 'var(--accent-secondary)'
                : 'var(--accent-primary)'
            }
          />
        </motion.span>
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        {...anchorExt}
        whileHover="hover"
        whileTap="tap"
        initial="idle"
        className={cls}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      whileHover="hover"
      whileTap="tap"
      initial="idle"
      className={cls}
      {...(props as object)}
    >
      {content}
    </motion.button>
  );
}

/* ── Pixel Arrow ────────────────────────────
   SVG drawn on a 4-px grid — crisp at any size.
   ─────────────────────────────────────────── */
function PixelArrow({ color }: { color: string }) {
  return (
    <svg
      width="16"
      height="10"
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ imageRendering: 'pixelated', display: 'block' }}
    >
      <rect x="0"  y="4" width="10" height="2" fill={color} />
      <rect x="10" y="4" width="2"  height="2" fill={color} />
      <rect x="12" y="2" width="2"  height="6" fill={color} />
      <rect x="14" y="0" width="2"  height="10" fill={color} />
    </svg>
  );
}
