import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { motion } from 'motion/react';

/* ─────────────────────────────────────────────
   PixelButton — art-directed CTA system
   
   Design principles:
   • Stepped corner via SVG outline (not clip-path on content)
   • Text is ALWAYS in a normal block-level span — no clipping
   • Pixel arrow SVG aligned beside text
   • Shimmer starts hidden, sweeps on hover
   • Three variants: primary | outline | ghost
   ───────────────────────────────────────────── */

export type ButtonVariant = 'primary' | 'outline' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   ButtonVariant;
  children:   ReactNode;
  href?:      string;
  arrow?:     boolean;
  external?:  boolean;
  className?: string;
}

/* SVG stepped-corner border as an inline SVG background.
   corner = size of the notch in px */
function SteppedBorderSVG({
  fill,
  stroke,
  strokeWidth = 0,
  corner = 10,
  width = '100%',
  height = '100%',
}: {
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  corner?: number;
  width?: string | number;
  height?: string | number;
}) {
  /* The polygon is expressed as percentages so it scales with the button.
     Because SVG preserveAspectRatio="none" is used, the corner size won't
     scale proportionally — we compensate by passing the corner as a fraction
     of a fixed coordinate system (0..100 units). */
  const c = corner; // units in the 0..200 coordinate space below

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 200 52"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        display: 'block',
      }}
    >
      {/* Stepped corner: top-right only */}
      <polygon
        points={`0,0 ${200 - c},0 200,${c} 200,52 0,52`}
        fill={fill}
        stroke={stroke || 'none'}
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
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

  /* ── Ghost variant: inline text link ── */
  if (variant === 'ghost') {
    const GhostTag = href ? motion.a : motion.button;
    const extraProps = href
      ? { href, ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
      : { type: 'button' as const };

    return (
      <GhostTag
        {...(extraProps as object)}
        whileHover="hover"
        whileTap="tap"
        initial="idle"
        className={[
          'relative inline-flex items-center gap-2',
          'font-display font-semibold text-sm tracking-wide uppercase',
          'text-[var(--accent-primary)] cursor-pointer select-none',
          'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-secondary)]',
          className,
        ].join(' ')}
        {...(href ? {} : props as object)}
      >
        {/* underline sweep */}
        <motion.span
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px bg-[var(--accent-primary)] origin-left pointer-events-none"
          variants={{
            idle:  { scaleX: 0 },
            hover: { scaleX: 1, transition: { duration: 0.18, ease: 'easeOut' } },
            tap:   { scaleX: 1 },
          }}
        />
        <span>{children}</span>
        {showArrow && (
          <motion.span
            className="flex items-center flex-shrink-0"
            variants={{ idle: { x: 0 }, hover: { x: 4 }, tap: { x: 2 } }}
          >
            <PixelArrow color="var(--accent-primary)" />
          </motion.span>
        )}
      </GhostTag>
    );
  }

  /* ── Primary / Outline: stepped-corner button ── */
  const isPrimary = variant === 'primary';

  const fillColor    = isPrimary ? 'var(--accent-primary)'   : 'transparent';
  const strokeColor  = isPrimary ? 'transparent'             : 'var(--accent-secondary)';
  const textColor    = isPrimary ? 'text-white'              : 'text-[var(--accent-secondary)]';

  const Tag = href ? motion.a : motion.button;
  const tagProps = href
    ? { href, ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
    : { type: 'button' as const };

  return (
    <Tag
      {...(tagProps as object)}
      whileHover="hover"
      whileTap="tap"
      initial="idle"
      className={[
        /* layout */
        'relative inline-flex items-center gap-2.5',
        'px-6 py-3',
        /* typography */
        'font-display font-bold text-sm tracking-wide uppercase',
        'whitespace-nowrap cursor-pointer select-none',
        textColor,
        /* press shift on primary */
        isPrimary
          ? 'hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[3px] active:translate-y-[3px] transition-transform duration-75'
          : '',
        /* accessibility */
        'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-secondary)]',
        className,
      ].join(' ').replace(/\s+/g, ' ').trim()}
      {...(href ? {} : props as object)}
    >
      {/* ── Stepped-corner background SVG ── */}
      <SteppedBorderSVG
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={isPrimary ? 0 : 2}
        corner={10}
      />

      {/* ── Pixel offset shadow (primary only) — static SVG behind ── */}
      {isPrimary && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: 'calc(100% + 4px)',
            height: 'calc(100% + 4px)',
            top: 4,
            left: 4,
            zIndex: -1,
            pointerEvents: 'none',
            display: 'block',
          }}
          viewBox="0 0 200 52"
          preserveAspectRatio="none"
        >
          <polygon
            points="0,0 190,0 200,10 200,52 0,52"
            fill="rgba(0,0,0,0.7)"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}

      {/* ── Shimmer (primary) ── */}
      {isPrimary && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          variants={{
            idle:  { opacity: 0, x: '-80%' },
            hover: { opacity: 1, x: '160%', transition: { duration: 0.45, ease: 'easeInOut' } },
            tap:   { opacity: 0 },
          }}
          style={{ zIndex: 1 }}
        />
      )}

      {/* ── Outline corner brackets (outline only) ── */}
      {!isPrimary && (
        <>
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-[var(--accent-secondary)]"
            style={{ zIndex: 2 }}
            variants={{ idle: { opacity: 0 }, hover: { opacity: 1 }, tap: { opacity: 1 } }}
          />
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-[var(--accent-secondary)]"
            style={{ zIndex: 2 }}
            variants={{ idle: { opacity: 0 }, hover: { opacity: 1 }, tap: { opacity: 1 } }}
          />
        </>
      )}

      {/* ── Label — always on top ── */}
      <span className="relative" style={{ zIndex: 3 }}>
        {children}
      </span>

      {/* ── Pixel arrow ── */}
      {showArrow && (
        <motion.span
          className="relative flex-shrink-0 flex items-center"
          style={{ zIndex: 3 }}
          variants={{ idle: { x: 0 }, hover: { x: 4 }, tap: { x: 2 } }}
          transition={{ duration: 0.15 }}
        >
          <PixelArrow color={isPrimary ? 'white' : 'var(--accent-secondary)'} />
        </motion.span>
      )}
    </Tag>
  );
}

/* ── Pixel Arrow ── */
function PixelArrow({ color }: { color: string }) {
  return (
    <svg
      width="14" height="9"
      viewBox="0 0 14 9"
      fill="none"
      aria-hidden="true"
      style={{ imageRendering: 'pixelated', display: 'block', flexShrink: 0 }}
    >
      {/* shaft */}
      <rect x="0" y="3" width="9"  height="2" fill={color} />
      {/* stepped head */}
      <rect x="9"  y="3" width="2" height="2" fill={color} />
      <rect x="11" y="1" width="2" height="6" fill={color} />
      <rect x="13" y="0" width="1" height="9" fill={color} />
    </svg>
  );
}
