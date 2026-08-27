import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'ghost';
  children: ReactNode;
  href?: string;
  icon?: boolean;
}

/**
 * Pixel-Art Button
 * - solid: pink pixel bevel button
 * - ghost: cyan text link with pixel arrow
 */
export function Button({
  variant = 'solid',
  children,
  href,
  icon = true,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center gap-2 
    font-[family-name:var(--font-display)] 
    uppercase text-xs sm:text-sm
    transition-transform duration-75
    focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-pink)]
    cursor-pointer
  `;

  const variants = {
    solid: `
      bg-[var(--accent-pink)]
      text-white
      px-6 py-4
      border-t-4 border-l-4 border-white
      border-b-4 border-r-4 border-[var(--pixel-border-dark)]
      hover:brightness-110
      active:border-t-4 active:border-l-4 active:border-[var(--pixel-border-dark)]
      active:border-b-4 active:border-r-4 active:border-white
      active:translate-y-1 active:translate-x-1
    `,
    ghost: `
      text-[var(--accent-cyan)] bg-transparent
      hover:text-[var(--accent-pink)]
      border-none
      px-0 py-2
      group
    `,
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center justify-center gap-2 mt-1">
        {children}
        {icon && variant === 'ghost' && (
          <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-2" style={{ imageRendering: 'pixelated' }} />
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...(props as object)}
    >
      {content}
    </button>
  );
}
