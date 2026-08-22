interface DesignationLabelProps {
  designation: string;     // e.g., "OBJ-01"
  sector?: string;         // e.g., "SECURITY"
  className?: string;
}

/**
 * Catalog designation eyebrow label.
 * Format: OBJ-01 · SECTOR: SECURITY
 * Uses mono font for the "data" feel of an astronomical catalog.
 */
export function DesignationLabel({
  designation,
  sector,
  className = '',
}: DesignationLabelProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-2
        font-[family-name:var(--font-mono)] 
        text-[var(--text-dim)] 
        text-xs tracking-widest uppercase
        ${className}
      `}
    >
      <span className="text-[var(--accent-nebula)]">{designation}</span>
      {sector && (
        <>
          <span className="text-[var(--text-faint)]">·</span>
          <span>SECTOR: {sector}</span>
        </>
      )}
    </span>
  );
}
