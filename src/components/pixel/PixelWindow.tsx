import React from 'react';

interface PixelWindowProps {
  title?: string;
  titleColor?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * PixelWindow - Retro Window component to replace the old Panel
 */
export function PixelWindow({ title, children, className = '', titleColor = 'var(--accent-purple)' }: PixelWindowProps) {
  return (
    <div className={`border-4 border-[var(--pixel-border-light)] border-b-[var(--pixel-border-dark)] border-r-[var(--pixel-border-dark)] bg-[var(--bg-panel)] rounded-none ${className}`}>
      {title && (
        <div 
          className="px-2 py-1.5 flex justify-between items-center font-display text-[10px] text-[var(--bg-base)] uppercase tracking-wider"
          style={{ backgroundColor: titleColor }}
        >
          <span>{title}</span>
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-[var(--bg-base)]" />
            <span className="w-2 h-2 bg-[var(--bg-base)]" />
          </div>
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
