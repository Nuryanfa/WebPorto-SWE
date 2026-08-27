import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { motion } from 'motion/react';

/* ─────────────────────────────────────────────
   Button — Pixel-Corner CTA System
   
   Variants:
     primary  — hot-pink filled, stepped clip-path, offset shadow
     outline  — transparent, cyan border, pixel corners on hover
     ghost    — bare text link with animated pixel arrow
   
   All variants use Syne (--font-display) and are keyboard-accessible.
   ───────────────────────────────────────────── */

type ButtonVariant = 'primary' | 'outline' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  href?:    string;
  /* Pixel arrow appended after children — default true for primary/outline */
  arrow?:   boolean;
  /* External link — adds target=_blank + rel */
  external?: boolean;
}

export function Button({
  variant  = 'primary',
  children,
  href,
  arrow,
  external = false,
  className = '',
  ...props
}: ButtonProps) {
  const showArrow = arrow ?? (variant !== 'ghost');

  const inner = (
    <ButtonInner variant={variant} showArrow={showArrow}>
      {children}
    </ButtonInner>
  );

  const sharedAnchorProps = {
    ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
  };

  if (href) {
    return (
      <motion.a
        href={href}
        {...sharedAnchorProps}
        whileHover="hover"
        whileTap="tap"
        initial="idle"
        className={buildWrapClass(variant, className)}
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
      className={buildWrapClass(variant, className)}
      {...(props as object)}
    >
      {inner}
    </motion.button>
  );
}

/* ── Internal composition ─────────────────── */

function ButtonInner({
  variant,
  showArrow,
  children,
}: {
  variant:   ButtonVariant;
  showArrow: boolean;
  children:  ReactNode;
}) {
  if (variant === 'ghost') return <GhostInner>{children}</GhostInner>;
  if (variant === 'outline') return <OutlineInner showArrow={showArrow}>{children}</OutlineInner>;
  return <PrimaryInner showArrow={showArrow}>{children}</PrimaryInner>;
}

/* ── PRIMARY variant ──────────────────────────
   Filled hot-pink button.
   Shape: stepped top-right corner (clip-path polygon).
   Hover: cyan shimmer sweep + offset shadow lifts.
   Active: shifts down-right like a pixel press.
   ─────────────────────────────────────────── */
function PrimaryInner({ children, showArrow }: { children: ReactNode; showArrow: boolean }) {
  return (
    <span className="relative inline-flex items-center gap-2.5 overflow-hidden">
      {/* Hover shimmer sweep */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full"
        variants={{
          idle:  { translateX: '-100%' },
          hover: { translateX: '220%', transition: { duration: 0.55, ease: 'easeInOut' } },
          tap:   { translateX: '-100%' },
        }}
      />

      {/* Text */}
      <span className="relative z-10 font-display font-bold text-sm tracking-wide text-white uppercase">
        {children}
      </span>

      {/* Pixel arrow */}
      {showArrow && (
        <motion.span
          aria-hidden="true"
          className="relative z-10 flex items-center"
          variants={{
            idle:  { x: 0   },
            hover: { x: 5, transition: { duration: 0.2, ease: 'easeOut' } },
            tap:   { x: 2   },
          }}
        >
          <PixelArrow color="white" />
        </motion.span>
      )}
    </span>
  );
}

/* ── OUTLINE variant ────────────────────────
   Transparent, cyan border.
   Pixel corner brackets appear on hover.
   ─────────────────────────────────────────── */
function OutlineInner({ children, showArrow }: { children: ReactNode; showArrow: boolean }) {
  return (
    <span className="relative inline-flex items-center gap-2.5">
      {/* Pixel corner brackets — top-left + bottom-right */}
      <motion.span
        aria-hidden="true"
        className="absolute top-0 left-0 w-[10px] h-[10px]
                   border-t-[2px] border-l-[2px] border-[var(--accent-secondary)]"
        variants={{
          idle:  { opacity: 0, scale: 0.6 },
          hover: { opacity: 1, scale: 1,   transition: { duration: 0.15 } },
          tap:   { opacity: 1, scale: 0.9 },
        }}
      />
      <motion.span
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[10px] h-[10px]
                   border-b-[2px] border-r-[2px] border-[var(--accent-secondary)]"
        variants={{
          idle:  { opacity: 0, scale: 0.6 },
          hover: { opacity: 1, scale: 1,   transition: { duration: 0.15 } },
          tap:   { opacity: 1, scale: 0.9 },
        }}
      />

      <span className="font-display font-bold text-sm tracking-wide uppercase
                       text-[var(--accent-secondary)]">
        {children}
      </span>

      {showArrow && (
        <motion.span
          aria-hidden="true"
          className="flex items-center"
          variants={{
            idle:  { x: 0 },
            hover: { x: 4, transition: { duration: 0.2 } },
            tap:   { x: 2 },
          }}
        >
          <PixelArrow color="var(--accent-secondary)" />
        </motion.span>
      )}
    </span>
  );
}

/* ── GHOST variant ──────────────────────────
   Bare inline text link.
   Arrow slides right; underline sweeps in.
   ─────────────────────────────────────────── */
function GhostInner({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-flex items-center gap-2 group">
      <span className="relative font-display font-semibold text-sm
                       text-[var(--accent-primary)]">
        {children}
        {/* Underline sweep */}
        <motion.span
          aria-hidden="true"
          className="absolute -bottom-px left-0 h-px bg-[var(--accent-primary)] origin-left"
          variants={{
            idle:  { scaleX: 0 },
            hover: { scaleX: 1, transition: { duration: 0.2, ease: 'easeOut' } },
            tap:   { scaleX: 1 },
          }}
        />
      </span>

      <motion.span
        aria-hidden="true"
        className="flex items-center"
        variants={{
          idle:  { x: 0   },
          hover: { x: 5,   transition: { duration: 0.2 } },
          tap:   { x: 3   },
        }}
      >
        <PixelArrow color="var(--accent-primary)" />
      </motion.span>
    </span>
  );
}

/* ── Pixel Arrow ────────────────────────────
   SVG arrow drawn on a 4-px grid.
   Matches the pixel visual language.
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
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Horizontal shaft */}
      <rect x="0" y="4" width="10" height="2" fill={color} />
      {/* Arrowhead — stepped pixel shape */}
      <rect x="10" y="4" width="2" height="2" fill={color} />
      <rect x="12" y="2" width="2" height="6" fill={color} />
      <rect x="14" y="0" width="2" height="10" fill={color} />
    </svg>
  );
}

/* ── Wrapper classes per variant ──────────── */
function buildWrapClass(variant: ButtonVariant, extra: string): string {
  const base = `
    inline-flex items-center
    cursor-pointer select-none
    focus-visible:outline-2 focus-visible:outline-offset-4
    focus-visible:outline-[var(--accent-secondary)]
  `;

  const map: Record<ButtonVariant, string> = {
    primary: `
      relative px-6 py-3
      bg-[var(--accent-primary)]
      clip-path-[polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,0_100%)]
      [clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,0_100%)]
      shadow-[3px_3px_0_var(--pixel-border-dark)]
      hover:shadow-[5px_5px_0_var(--pixel-border-dark)]
      active:shadow-[1px_1px_0_var(--pixel-border-dark)]
      active:translate-x-[2px] active:translate-y-[2px]
      transition-shadow duration-[var(--duration-fast)]
    `,
    outline: `
      relative px-6 py-3
      bg-transparent
      border border-[var(--accent-secondary)]
      [clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,0_100%)]
      hover:bg-[rgba(0,245,255,0.06)]
      transition-colors duration-[var(--duration-fast)]
    `,
    ghost: `
      bg-transparent p-0
    `,
  };

  return `${base} ${map[variant]} ${extra}`.replace(/\s+/g, ' ').trim();
}
