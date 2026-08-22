import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'ghost';
  children: ReactNode;
  href?: string;
  icon?: boolean;
}

/**
 * Button with two variants:
 * - solid: accent-nebula background, angular clip-path corners
 * - ghost: text link with arrow, no background
 * 
 * PRD §6.1: CTA hierarchy — never two equal-weight buttons side by side
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
    font-[family-name:var(--font-display)] font-semibold 
    tracking-wider uppercase text-sm
    transition-all duration-150 ease-[var(--ease-out-expo)]
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-nebula)]
    cursor-pointer
  `;

  const variants = {
    solid: `
      relative
      text-[var(--bg-void)]
      hover:shadow-[0_0_20px_var(--accent-nebula-glow)]
      active:scale-[0.97]
    `,
    ghost: `
      relative
      text-[var(--accent-nebula)] bg-transparent
      hover:text-[var(--text-star)]
      border-none
      after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full 
      after:bg-[var(--accent-nebula)]
      after:origin-bottom-right after:scale-x-0 
      hover:after:origin-bottom-left hover:after:scale-x-100 
      after:transition-transform after:duration-300 after:ease-[var(--ease-out-expo)]
    `,
  };

  const content = (
    <>
      {variant === 'solid' && (
        <div className="absolute inset-0 bg-[var(--accent-nebula)] group-hover:bg-[#8B7FF5] overflow-hidden [clip-path:var(--clip-angular)] transition-colors z-0">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
        </div>
      )}
      <span className={`relative z-10 flex items-center justify-center gap-2 ${variant === 'solid' ? 'text-[var(--bg-void)] pl-2' : 'text-current'}`}>
        {children}
        {icon && variant === 'ghost' && (
          <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-1" />
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseStyles} ${variants[variant]} group ${className}`}
        style={variant === 'solid' ? { padding: '14px 28px' } : { padding: '4px 0' }}
        whileHover={{ scale: variant === 'solid' ? 1.02 : 1 }}
        whileTap={{ scale: 0.97 }}
        data-magnetic
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} group ${className}`}
      style={variant === 'solid' ? { padding: '14px 28px' } : { padding: '4px 0' }}
      whileHover={{ scale: variant === 'solid' ? 1.02 : 1 }}
      whileTap={{ scale: 0.97 }}
      data-magnetic
      {...(props as object)}
    >
      {content}
    </motion.button>
  );
}
