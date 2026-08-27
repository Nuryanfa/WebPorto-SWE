import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { motion } from 'motion/react';

/* ─────────────────────────────────────────────
   Button — Pixel-Art CTA System

   Uses global .px-btn CSS classes from index.css.
   clip-path is applied directly to the element;
   text is a normal inline child (not absolute) so
   it always renders inside the clipped region.

   Variants:
     primary  — hot-pink fill, dark offset shadow, pixel arrow
     outline  — inset cyan border, pixel arrow
     ghost    — plain text link, underline sweep, pixel arrow
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

  const variantClass = {
    primary: 'px-btn--primary',
    outline: 'px-btn--outline',
    ghost:   'px-btn--ghost',
  }[variant];

  const cls = `px-btn ${variantClass} ${className}`.trim();

  const arrowColor =
    variant === 'primary'  ? '#ffffff'
    : variant === 'outline' ? 'var(--accent-secondary)'
    :                         'var(--accent-primary)';

  const inner = (
    <>
      <span style={{ position: 'relative' }}>{children}</span>
      {showArrow && (
        <motion.span
          style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
          variants={{ idle: { x: 0 }, hover: { x: 4 }, tap: { x: 2 } }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          <PixelArrow color={arrowColor} />
        </motion.span>
      )}
    </>
  );

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
      width="14"
      height="9"
      viewBox="0 0 14 9"
      fill="none"
      aria-hidden="true"
      style={{ imageRendering: 'pixelated', display: 'block' }}
    >
      <rect x="0"  y="3" width="9" height="2" fill={color} />
      <rect x="9"  y="3" width="2" height="2" fill={color} />
      <rect x="11" y="1" width="2" height="6" fill={color} />
      <rect x="13" y="0" width="1" height="9" fill={color} />
    </svg>
  );
}
