import { GitBranch, Link2, Mail, Heart } from 'lucide-react';

/**
 * Footer — Minimal and Clean
 * Removes game aesthetic, keeps it elegant
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[var(--bg-elevated)] mt-20">
      <div className="container-observatory py-12">
        
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 pixel-decoration bg-[var(--accent-primary)] flex items-center justify-center">
                <div className="w-2 h-2 bg-[var(--bg-base)]" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-lg tracking-tight text-[var(--text-primary)]">
                  NUR YANFA
                </span>
                <span className="font-mono text-[10px] tracking-wider text-[var(--accent-primary)] uppercase">
                  Software Engineer
                </span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/nuryanfa"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="GitHub"
            >
              <GitBranch size={20} />
            </a>
            <a
              href="https://linkedin.com/in/muhamad-nur-yanfa"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="LinkedIn"
            >
              <Link2 size={20} />
            </a>
            <a
              href="mailto:muhamadnuryanfa@example.com"
              className="p-2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-[var(--text-tertiary)] text-sm font-mono">
            © {currentYear} Muhamad Nur Yanfa. All rights reserved.
          </p>

          <p className="text-[var(--text-tertiary)] text-sm flex items-center gap-2">
            Built with <Heart size={14} className="text-[var(--accent-primary)] inline-block" /> 
            using React + TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
