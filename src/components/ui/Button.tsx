import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { motion } from 'motion/react';

/* ─────────────────────────────────────────────
   Button — Pixel-Art CTA System

   Variants:
     primary  — hot-pink filled, 4px offset pixel shadow, arrow
     outline  — transparent, cyan border, arrow
     ghost    — bare text link, underline sweep, arrow

   Key rules:
   • NO clip-path — causes text to paint outside visible area
   • Shimmer starts opacity:0 so text is always visible at rest
   • Single flex container owns all layout — no nested flex spans
   ───────────────────────────────────────────── */

export type ButtonVariant = 'primary' | 'outline' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   ButtonVariant;
  children:   ReactNode;
  href?:      string;
  arrow?:     boolean;
  external?:  boolean;
  className?: string;
}

export function Button({
  variant   = 'primary',
  children,
  href,
  arrow,
  external  = false,
  className = '',
  ...props
}: ButtonProps) {
  const showArrow = arrow ?? variant !== 'ghost';

  const inner = (
    <>
      {/* ── Shimmer (primary only) — starts invisible ── */}
      {variant === 'primary' && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0
                     bg-gradient-to-r from-transparent via-white/20 to-transparent"
          variants={{
            idle:  { opacity: 0, x: '-60%' },
            hover: { opacity: 1, x: '160%',
                     transition: { duration: 0.5, ease: 'easeInOut' } },
            tap:   { opacity: 0, x: '-60%' },
          }}
        />
      )}

      {/* ── Outline corner brackets — appear on hover ── */}
      {variant === 'outline' && (
        <>
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute top-[-2px] left-[-2px]
                       w-3 h-3 border-t-2 border-l-2 border-[var(--accent-secondary)]"
            variants={{
              idle:  { opacity: 0 },
              hover: { opacity: 1, transition: { duration: 0.12 } },
              tap:   { opacity: 1 },
            }}
          />
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-2px] right-[-2px]
                       w-3 h-3 border-b-2 border-r-2 border-[var(--accent-secondary)]"
            variants={{
              idle:  { opacity: 0 },
              hover: { opacity: 1, transition: { duration: 0.12 } },
              tap:   { opacity: 1 },
            }}
          />
        </>
      )}

      {/* ── Ghost underline sweep ── */}
      {variant === 'ghost' && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0
                     h-px bg-[var(--accent-primary)] origin-left"
          variants={{
            idle:  { scaleX: 0 },
            hover: { scaleX: 1, transition: { duration: 0.2, ease: 'easeOut' } },
            tap:   { scaleX: 1 },
          }}
        />
      )}

      {/* ── Label — always visible ── */}
      <span className="relative z-10 leading-none">{children}</span>

      {/* ── Pixel arrow ── */}
      {showArrow && (
        <motion.span
          aria-hidden="true"
          className="relative z-10 flex-shrink-0 flex items-center"
          variants={{
            idle:  { x: 0 },
            hover: { x: 4, transition: { duration: 0.18, ease: 'easeOut' } },
            tap:   { x: 2 },
          }}
        >
          <PixelArrow
            color={
              variant === 'primary'  ? 'white'
              : variant === 'outline' ? 'var(--accent-secondary)'
              : 'var(--accent-primary)'
            }
          />
        </motion.span>
      )}
    </>
  );

  /* ── Variant class map ── */
  const variantCls: Record<ButtonVariant, string> = {
    primary: [
      'bg-[var(--accent-primary)] text-white',
      'shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]',
      'hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]',
      'hover:translate-x-[2px] hover:translate-y-[2px]',
      'active:shadow-none active:translate-x-[4px] active:translate-y-[4px]',
      'transition-all duration-100',
    ].join(' '),

    outline: [
      'bg-transparent text-[var(--accent-secondary)]',
      'border-2 border-[var(--accent-secondary)]',
      'hover:bg-[var(--accent-secondary)]/10',
      'transition-colors duration-150',
    ].join(' '),

    ghost: [
      'bg-transparent text-[var(--accent-primary)]',
    ].join(' '),
  };

  const cls = [
    /* base */
    'relative overflow-hidden',
    'inline-flex items-center gap-2',
    'font-display font-bold text-sm tracking-wide uppercase',
    'whitespace-nowrap cursor-pointer select-none',
    variant !== 'ghost' ? 'px-5 py-2.5' : 'px-0 py-0',
    'focus-visible:outline-2 focus-visible:outline-offset-4',
    'focus-visible:outline-[var(--accent-secondary)]',
    /* variant */
    variantCls[variant],
    /* caller override */
    className,
  ].join(' ').replace(/\s+/g, ' ').trim();

  if (href) {
    return (
      <motion.a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        whileHover="hover"
        whileTap="tap"
        initial="idle"
        className={cls}
      >
        {inner}
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
      {inner}
    </motion.button>
  );
}

/* ── Pixel Arrow SVG ── */
function PixelArrow({ color }: { color: string }) {
  return (
    <svg
      width="14" height="9"
      viewBox="0 0 14 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ imageRendering: 'pixelated', display: 'block' }}
    >
      {/* shaft */}
      <rect x="0" y="3" width="9"  height="2" fill={color} />
      {/* stepped arrowhead */}
      <rect x="9"  y="3" width="2" height="2" fill={color} />
      <rect x="11" y="1" width="2" height="6" fill={color} />
      <rect x="13" y="0" width="1" height="9" fill={color} />
    </svg>
  );
}
