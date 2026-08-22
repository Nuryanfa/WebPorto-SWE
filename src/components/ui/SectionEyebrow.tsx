interface SectionEyebrowProps {
  index: string;
  label: string;
  className?: string;
}

/**
 * Section header eyebrow — Clean & minimal
 * Short accent dash only, no full-width cutting line
 */
export function SectionEyebrow({
  index,
  label,
  className = '',
}: SectionEyebrowProps) {
  return (
    <div className={`relative mb-8 ${className}`}>
      {/* Ghost number watermark */}
      <span
        className="absolute -top-10 -left-2 font-bold leading-none select-none pointer-events-none"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(100px, 14vw, 180px)',
          color: 'var(--text-star)',
          opacity: 0.03,
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        {index}
      </span>

      {/* Eyebrow row — short accent dash, no full-width line */}
      <div className="flex items-center gap-3 mb-3">
        {/* Short accent bar — only 24px, fades right */}
        <div
          className="h-px"
          style={{
            width: '24px',
            background: 'linear-gradient(to right, var(--accent-nebula), transparent)',
            flexShrink: 0,
          }}
        />
        <span
          className="font-mono text-[10px] tracking-[0.35em] uppercase"
          style={{ color: 'var(--accent-nebula)', fontWeight: 700 }}
        >
          [{index}]
        </span>
      </div>

      {/* Label */}
      <div
        className="font-mono text-xs tracking-[0.5em] uppercase"
        style={{ color: 'var(--text-faint)', fontWeight: 600 }}
      >
        {label}
      </div>
    </div>
  );
}
