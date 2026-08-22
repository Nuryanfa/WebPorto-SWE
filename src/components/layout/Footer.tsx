import { Code2, Globe, Mail } from 'lucide-react';

/**
 * Minimal footer with social links in mono coordinate style.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--line-hairline)] bg-[var(--bg-void)]">
      <div className="container-observatory py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left — Designation */}
        <div className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--text-faint)] uppercase">
          <span className="text-[var(--accent-nebula)]">◆</span>
          <span>N.YANFA // {currentYear}</span>
        </div>

        {/* Center — Coordinates style */}
        <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-faint)] tracking-wider">
          ORIGIN: INDONESIA · STATUS: OBSERVING
        </p>

        {/* Right — Social links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-faint)] hover:text-[var(--accent-nebula)] transition-colors"
            aria-label="GitHub"
          >
            <Code2 size={18} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-faint)] hover:text-[var(--accent-nebula)] transition-colors"
            aria-label="LinkedIn"
          >
            <Globe size={18} />
          </a>
          <a
            href="mailto:contact@example.com"
            className="text-[var(--text-faint)] hover:text-[var(--accent-nebula)] transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
