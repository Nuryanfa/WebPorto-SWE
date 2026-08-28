import { motion } from 'motion/react';
import { GitBranch, Link2, Mail } from 'lucide-react';

/* ─────────────────────────────────────────────
   Footer — Blueprint §42
   
   Minimal. No decorative excess.
   
   NUR.YANFA.EXE
   SOFTWARE ENGINEER
   © 2026 MUHAMAD NUR YANFA
   STATUS: ONLINE
   ───────────────────────────────────────────── */

const SOCIALS = [
  { icon: GitBranch, label: 'GitHub',   href: 'https://github.com/nuryanfa',                  },
  { icon: Link2,     label: 'LinkedIn', href: 'https://linkedin.com/in/muhamad-nur-yanfa',     },
  { icon: Mail,      label: 'Email',    href: 'mailto:muhamadnuryanfa@example.com',            },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      {/* Subtle top accent line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, var(--accent-magenta) 30%, var(--accent-cyan) 70%, transparent 100%)',
          opacity: 0.3,
        }}
      />

      <div
        className="w-full max-w-6xl mx-auto px-8 py-10"
        style={{ paddingLeft: 'max(2rem, env(safe-area-inset-left))' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">

          {/* ── Brand ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            {/* Logo row */}
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 pixel-decoration bg-[var(--accent-magenta)]
                           flex items-center justify-center flex-shrink-0"
              >
                <div className="w-1.5 h-1.5 bg-[var(--bg-base)]" />
              </div>
              <span
                className="font-display font-extrabold tracking-tight text-[var(--text-primary)]"
                style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)' }}
              >
                NUR.YANFA
              </span>
            </div>

            {/* Sub-title */}
            <p
              className="font-mono uppercase tracking-[0.2em] text-[var(--text-tertiary)]"
              style={{ fontSize: '0.68rem' }}
            >
              Software Engineer
            </p>

            {/* Status badge */}
            <div className="flex items-center gap-2 pt-1">
              <motion.div
                className="w-[5px] h-[5px] pixel-decoration bg-[var(--accent-acid)]"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              <span
                className="font-pixel uppercase text-[var(--accent-acid)]"
                style={{ fontSize: '7px', letterSpacing: '0.2em' }}
              >
                Online
              </span>
            </div>
          </motion.div>

          {/* ── Social links ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-5 md:justify-center"
          >
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                data-cursor="link"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.15 }}
                className="text-[var(--text-faint)] hover:text-[var(--text-primary)] transition-colors duration-150"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>

          {/* ── Copyright + build note ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-1 md:text-right"
          >
            <p
              className="font-mono text-[var(--text-faint)] tracking-wide"
              style={{ fontSize: '0.68rem' }}
            >
              © {year} Muhamad Nur Yanfa
            </p>
            <p
              className="font-mono text-[var(--text-faint)] tracking-wide"
              style={{ fontSize: '0.68rem' }}
            >
              React · TypeScript · Vite
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
