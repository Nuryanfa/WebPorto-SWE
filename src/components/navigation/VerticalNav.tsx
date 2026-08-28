import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useSceneNav } from './SceneTransitionController';

/* ─────────────────────────────────────────────
   VerticalNav — V3 Visual Correction
   
   Desktop (≥900px):
     Fixed left panel, 200px wide (18% of 1080p).
     Horizontal readable labels — NOT rotated.
     NUR.YANFA brand at top.
     [01] index + label layout.
     ◆ diamond active indicator that slides between items.
     Pixel → arrow on hover.
     Nav accent color changes per active scene.
     Scroll progress bar at bottom.
   
   Mobile (<900px):
     Top bar: NUR.YANFA + hamburger.
     Full-screen overlay: large readable labels.
   ───────────────────────────────────────────── */

const NAV_ITEMS = [
  { index: '01', label: 'Identity',   href: '/',            accent: 'var(--scene-identity)'   },
  { index: '02', label: 'Profile',    href: '/about',       accent: 'var(--scene-profile)'    },
  { index: '03', label: 'Work',       href: '/projects',    accent: 'var(--scene-work)'       },
  { index: '04', label: 'Experience', href: '/#experience', accent: 'var(--scene-experience)' },
  { index: '05', label: 'Contact',    href: '/contact',     accent: 'var(--scene-contact)'    },
] as const;

export function VerticalNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollPct,  setScrollPct]  = useState(0);
  const location    = useLocation();
  const { navigateTo } = useSceneNav();

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setScrollPct(max > 0 ? Math.min(1, el.scrollTop / max) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = useCallback((href: string) => {
    if (href === '/')          return location.pathname === '/' && !location.hash;
    if (href.startsWith('/#')) return location.pathname === '/' && location.hash === '#' + href.split('#')[1];
    if (href === '/projects')  return location.pathname.startsWith('/projects');
    return location.pathname === href;
  }, [location]);

  /* Active item — for scene accent colour */
  const activeItem = NAV_ITEMS.find(i => isActive(i.href)) ?? NAV_ITEMS[0];

  const handleClick = useCallback((
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    navigateTo(href);
  }, [navigateTo]);

  return (
    <>
      {/* ══════════════════════════════════════
          DESKTOP — 200px fixed left panel
          ══════════════════════════════════════ */}
      <motion.aside
        initial={{ x: -220, opacity: 0 }}
        animate={{ x: 0,    opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="vnav-desktop fixed top-0 left-0 h-full z-50
                   bg-[var(--bg-elevated)]/70 backdrop-blur-xl
                   border-r border-white/5"
        style={{ width: 'var(--nav-width)' }}
        aria-label="Main navigation"
      >
        <div className="flex flex-col h-full py-8 px-5">

          {/* Brand */}
          <Link
            to="/"
            className="group mb-12 flex flex-col gap-1.5"
            aria-label="Home"
          >
            <div className="flex items-center gap-2.5">
              <motion.div
                whileHover={{ scale: 1.08 }}
                className="w-7 h-7 pixel-decoration flex-shrink-0 flex items-center justify-center"
                style={{ background: activeItem.accent }}
              >
                <div className="w-2 h-2 bg-[var(--bg-base)]" />
              </motion.div>
              <span
                className="font-display font-extrabold tracking-tight text-[var(--text-primary)]"
                style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)' }}
              >
                NUR.YANFA
              </span>
            </div>
            <span
              className="font-mono uppercase tracking-[0.18em] pl-[2.375rem]"
              style={{ fontSize: '0.6rem', color: 'var(--text-tertiary)' }}
            >
              Software Engineer
            </span>
          </Link>

          {/* Nav items */}
          <nav className="flex flex-col gap-1 flex-1" role="navigation">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <NavItem
                  key={item.href}
                  item={item}
                  active={active}
                  onClick={handleClick}
                />
              );
            })}
          </nav>

          {/* Scroll progress */}
          <div className="mt-auto pt-8 flex flex-col gap-2">
            <span
              className="font-pixel uppercase"
              style={{ fontSize: '7px', letterSpacing: '0.2em', color: 'var(--text-faint)' }}
            >
              Scroll
            </span>
            <div className="relative h-[2px] bg-white/8 w-full">
              <motion.div
                className="absolute top-0 left-0 h-full origin-left"
                style={{
                  width: `${scrollPct * 100}%`,
                  background: activeItem.accent,
                }}
              />
              {/* Diamond at tip */}
              <motion.div
                className="absolute top-1/2 w-[7px] h-[7px] -translate-y-1/2 -translate-x-1/2 rotate-45 pixel-decoration"
                style={{
                  left: `${scrollPct * 100}%`,
                  background: activeItem.accent,
                }}
              />
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 mt-4">
              <motion.div
                className="w-[5px] h-[5px] pixel-decoration"
                style={{ background: 'var(--accent-acid)' }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              <span
                className="font-pixel uppercase"
                style={{ fontSize: '7px', letterSpacing: '0.18em', color: 'var(--accent-acid)' }}
              >
                Available
              </span>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* ══════════════════════════════════════
          MOBILE — top bar
          ══════════════════════════════════════ */}
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="vnav-mobile-bar fixed top-0 left-0 right-0 z-50 h-[var(--nav-height)]
                   items-center justify-between px-6
                   bg-[var(--bg-base)]/88 backdrop-blur-xl border-b border-white/5"
      >
          <Link to="/" className="flex items-center gap-2.5" aria-label="Home">
            <div
              className="w-6 h-6 pixel-decoration flex items-center justify-center flex-shrink-0"
              style={{ background: activeItem.accent }}
            >
              <div className="w-1.5 h-1.5 bg-[var(--bg-base)]" />
            </div>
            <span className="font-display font-bold tracking-tight text-[var(--text-primary)] text-base">
              NUR.YANFA
            </span>
          </Link>

          <motion.button
            onClick={() => setMobileOpen(v => !v)}
            whileTap={{ scale: 0.92 }}
            className="w-9 h-9 flex items-center justify-center text-[var(--text-primary)]"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait">
              {mobileOpen
                ? <motion.div key="x"    initial={{ rotate:-90, opacity:0 }} animate={{ rotate:0, opacity:1 }} exit={{ rotate:90,  opacity:0 }} transition={{ duration:0.16 }}><X    size={22}/></motion.div>
                : <motion.div key="menu" initial={{ rotate: 90, opacity:0 }} animate={{ rotate:0, opacity:1 }} exit={{ rotate:-90, opacity:0 }} transition={{ duration:0.16 }}><Menu size={22}/></motion.div>
              }
            </AnimatePresence>
          </motion.button>
      </motion.header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity:0, y:-16 }}
            animate={{ opacity:1, y:0 }}
            exit={{    opacity:0, y:-16 }}
            transition={{ duration:0.28, ease:[0.16,1,0.3,1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center px-10
                       bg-[var(--bg-base)]/96 backdrop-blur-xl"
          >
            <nav className="space-y-7">
              {NAV_ITEMS.map((item, i) => {
                const active = isActive(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity:0, x:-28 }}
                    animate={{ opacity:1, x:0 }}
                    transition={{ delay: i*0.06, duration:0.32, ease:[0.16,1,0.3,1] }}
                  >
                    <Link
                      to={item.href}
                      onClick={(e) => handleClick(e, item.href)}
                      className="flex items-center gap-5 group"
                    >
                      <span
                        className="font-pixel"
                        style={{ fontSize:'10px', color: item.accent, letterSpacing:'0.18em' }}
                      >
                        {item.index}
                      </span>
                      <span
                        className="font-display font-bold transition-colors duration-150"
                        style={{
                          fontSize: 'clamp(1.9rem,6vw,2.8rem)',
                          color: active ? item.accent : 'var(--text-primary)',
                        }}
                      >
                        {item.label}
                      </span>
                      {active && (
                        <div
                          className="w-2 h-2 pixel-decoration rotate-45"
                          style={{ background: item.accent }}
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="absolute bottom-10 left-10 space-y-1">
              <div className="font-mono text-[10px] tracking-widest text-[var(--text-faint)] uppercase">
                Status / Available
              </div>
              <div className="font-mono text-[10px] tracking-widest text-[var(--text-faint)] uppercase">
                Based / Indonesia
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Single desktop nav item ──────────────────
   [01] IDENTITY  ◆    ← active state
   [02] PROFILE        ← inactive + hover arrow
   ─────────────────────────────────────────── */
function NavItem({
  item,
  active,
  onClick,
}: {
  item: typeof NAV_ITEMS[number];
  active: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={item.href}
      onClick={(e) => onClick(e, item.href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-current={active ? 'page' : undefined}
      data-cursor="link"
      className="relative flex items-center gap-3 px-3 py-2.5 group
                 focus-visible:outline-2 focus-visible:outline-offset-2
                 focus-visible:outline-[var(--accent-cyan)]"
      style={{ textDecoration: 'none' }}
    >
      {/* Active background highlight */}
      {active && (
        <motion.div
          layoutId="nav-active-bg"
          className="absolute inset-0 border-l-2"
          style={{ borderColor: item.accent, background: `${item.accent}10` }}
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        />
      )}

      {/* Index */}
      <span
        className="font-pixel relative z-10 shrink-0 transition-colors duration-150"
        style={{
          fontSize: '9px',
          letterSpacing: '0.15em',
          color: active ? item.accent : hovered ? 'var(--text-tertiary)' : 'var(--text-faint)',
        }}
      >
        {item.index}
      </span>

      {/* Label */}
      <motion.span
        className="relative z-10 font-display font-semibold tracking-wide flex-1"
        animate={{
          color: active
            ? item.accent
            : hovered
            ? 'var(--text-primary)'
            : 'var(--text-tertiary)',
          x: hovered && !active ? 3 : 0,
        }}
        transition={{ duration: 0.15 }}
        style={{ fontSize: 'clamp(0.7rem, 1vw, 0.82rem)', letterSpacing: '0.06em' }}
      >
        {item.label}
      </motion.span>

      {/* Active: rotating diamond indicator */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="diamond"
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 45 }}
            exit={{    opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-2 h-2 pixel-decoration shrink-0"
            style={{ background: item.accent }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Hover: pixel arrow (only when not active) */}
      <AnimatePresence>
        {hovered && !active && (
          <motion.svg
            key="arrow"
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{    opacity: 0, x: -4 }}
            transition={{ duration: 0.12 }}
            width="10" height="7" viewBox="0 0 10 7" fill="none"
            aria-hidden="true"
            className="relative z-10 shrink-0"
            style={{ imageRendering: 'pixelated' }}
          >
            <rect x="0" y="2" width="6"  height="2" fill="var(--text-faint)" />
            <rect x="6" y="2" width="2"  height="2" fill="var(--text-faint)" />
            <rect x="8" y="0" width="2"  height="7" fill="var(--text-faint)" />
          </motion.svg>
        )}
      </AnimatePresence>
    </Link>
  );
}
