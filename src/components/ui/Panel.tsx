import { type ReactNode, useState, useRef } from 'react';

interface PanelProps {
  children: ReactNode;
  className?: string;
  /** Use angular clip-path for panel corners */
  angular?: boolean;
  /** Show glow border effect on hover */
  glow?: boolean;
  /** HTML element to render as */
  as?: 'div' | 'article' | 'section';
}

/**
 * Panel container — card/panel with bg-panel, hairline border.
 * Features a dynamic mouse spotlight effect for a premium glass feel.
 */
export function Panel({
  children,
  className = '',
  angular = false,
  glow = false,
  as: Tag = 'div',
}: PanelProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const panelRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Tag
      ref={panelRef as any}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden group
        bg-[var(--bg-elevated)]/80 backdrop-blur-xl
        border border-[var(--line-hairline)]
        p-6
        transition-all duration-300 ease-[var(--ease-out-expo)]
        ${angular ? '[clip-path:var(--clip-angular)]' : 'rounded-sm'}
        ${glow ? 'hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      {/* Mouse Spotlight */}
      {glow && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124,111,240,0.1), transparent 40%)`,
          }}
        />
      )}
      
      {/* Internal Noise Texture for Panel */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
      
      {/* Content wrapper to stay above spotlight */}
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </Tag>
  );
}
