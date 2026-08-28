import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useSceneNav } from './SceneTransitionController';

/* ─────────────────────────────────────────────
   VerticalNav — compact 130px rail
   
   Visual concept: fictional Japanese interface panel.
   Not a SaaS sidebar. Not a dashboard.
   
   Desktop layout (top → bottom):
     ┌────────────────┐
     │  NUR           │  ← brand stacked
     │  YANFA         │
     │                │
     │  SOFTWARE      │  ← subtitle
     │  ENGINEER      │
     │ ─────────────  │
     │  01 IDENTITY   │  ← nav items
     │  02 PROFILE    │
     │  03 WORK ━━━━  │  ← active indicator
     │  04 EXPERIENCE │
     │  05 CONTACT    │
     │ ─────────────  │
     │  ● ONLINE      │  ← status
     └────────────────┘
   
   Mobile: compact top bar + full-screen overlay.
   ───────────────────────────────────────────── */

const NAV_ITEMS = [
  { index: '01', label: 'IDENTITY',   href: '/',            accent: 'var(--scene-identity)'   },
  { index: '02', label: 'PROFILE',    href: '/about',       accent: 'var(--scene-profile)'    },
  { index: '03', label: 'WORK',       href: '/projects',    accent: 'var(--scene-work)'       },
  { index: '04', label: 'EXPERIENCE', href: '/#experience', accent: 'var(--scene-experience)' },
  { index: '05', label: 'CONTACT',    href: '/contact',     accent: 'var(--scene-contact)'    },
] as const;

export function VerticalNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location  = useLocation();
  const { navigateTo } = useSceneNav();

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const isActive = useCallback((href: string) => {
    if (href === '/')          return location.pathname === '/' && !location.hash;
    if (href.startsWith('/#')) return location.pathname === '/' && location.hash === '#' + href.split('#')[1];
    if (href === '/projects')  return location.pathname.startsWith('/projects');
    return location.pathname === href;
  }, [location]);

  const handleClick = useCallback((
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    navigateTo(href);
  }, [navigateTo]);

  const activeItem = NAV_ITEMS.find(i => isActive(i.href)) ?? NAV_ITEMS[0];

  return (
    <>
      {/* ════════════════════════════════════════
          DESKTOP RAIL — 130px, ≥900px only
          ════════════════════════════════════════ */}
      <motion.nav
        initial={{ x: -150, opacity: 0 }}
        animate={{ x: 0,    opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="vnav-desktop fixed top-0 left-0 h-full z-50 flex-col
                   select-none overflow-hidden"
        style={{
          width: 'var(--nav-width)',
          background: 'rgba(14,15,20,0.92)',
          backdropFilter: 'blur(12px)',
          borderRight: '1px solid rgba(245,243,240,0.05)',
        }}
        aria-label="Main navigation"
      >
        <div className="flex flex-col h-full pt-7 pb-6 px-5">

          {/* ── Brand block ── */}
          <Link
            to="/"
            onClick={(e) => handleClick(e, '/')}
            className="block mb-7 group"
            aria-label="Home"
            style={{ textDecoration: 'none' }}
          >
            {/* NUR / YANFA stacked in large display */}
            <div
              className="font-display font-extrabold leading-[0.88] tracking-tight"
              style={{
                fontSize: 'clamp(1.4rem, 2vw, 1.7rem)',
                color: 'var(--text-primary)',
              }}
            >
              NUR<br />
              <span style={{ color: activeItem.accent }}>YANFA</span>
            </div>
            {/* SOFTWARE ENGINEER below */}
            <div
              className="font-pixel uppercase mt-2"
              style={{
                fontSize: '7px',
                letterSpacing: '0.16em',
                color: 'var(--text-faint)',
                lineHeight: 1.6,
              }}
            >
              SOFTWARE<br />ENGINEER
            </div>
          </Link>

          {/* ── Hairline separator ── */}
          <div
            className="mb-5"
            style={{ height: '1px', background: 'rgba(245,243,240,0.07)' }}
            aria-hidden="true"
          />

          {/* ── Nav items ── */}
          <div className="flex flex-col gap-0.5 flex-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <NavRailItem
                  key={item.href}
                  item={item}
                  active={active}
                  onClick={handleClick}
                />
              );
            })}
          </div>

          {/* ── Hairline separator ── */}
          <div
            className="mt-5 mb-4"
            style={{ height: '1px', background: 'rgba(245,243,240,0.07)' }}
            aria-hidden="true"
          />

          {/* ── Status dot ── */}
          <div className="flex items-center gap-2">
            <motion.div
              className="pixel-decoration"
              style={{ width: 6, height: 6, background: 'var(--accent-acid)' }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span
              className="font-pixel uppercase"
              style={{ fontSize: '7px', letterSpacing: '0.18em', color: 'var(--accent-acid)' }}
            >
              ONLINE
            </span>
          </div>
        </div>
      </motion.nav>

      {/* ════════════════════════════════════════
          MOBILE TOP BAR — <900px only
          ════════════════════════════════════════ */}
      <motion.header
        initial={{ y: -56, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="vnav-mobile-bar fixed top-0 left-0 right-0 z-50 h-[var(--nav-height)]
                   flex items-center justify-between px-5"
        style={{
          background: 'rgba(8,9,13,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(245,243,240,0.05)',
        }}
      >
        {/* Brand */}
        <Link
          to="/"
          onClick={(e) => handleClick(e, '/')}
          className="flex items-center gap-2.5"
          style={{ textDecoration: 'none' }}
        >
          <div
            className="font-display font-extrabold tracking-tight"
            style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}
          >
            NUR<span style={{ color: activeItem.accent }}>.</span>YANFA
          </div>
        </Link>

        {/* Hamburger */}
        <motion.button
          onClick={() => setMobileOpen(v => !v)}
          whileTap={{ scale: 0.9 }}
          className="w-9 h-9 flex items-center justify-center"
          style={{ color: 'var(--text-primary)' }}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <AnimatePresence mode="wait">
            {mobileOpen
              ? <motion.div key="x"    initial={{ rotate:-90, opacity:0 }} animate={{ rotate:0, opacity:1 }} exit={{ rotate:90,  opacity:0 }} transition={{ duration:0.15 }}><X    size={20}/></motion.div>
              : <motion.div key="menu" initial={{ rotate: 90, opacity:0 }} animate={{ rotate:0, opacity:1 }} exit={{ rotate:-90, opacity:0 }} transition={{ duration:0.15 }}><Menu size={20}/></motion.div>
            }
          </AnimatePresence>
        </motion.button>
      </motion.header>

      {/* ════════════════════════════════════════
          MOBILE OVERLAY
          ════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{    opacity:0 }}
            transition={{ duration:0.22 }}
            className="fixed inset-0 z-40 flex flex-col justify-center px-8"
            style={{ background: 'rgba(8,9,13,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <nav className="space-y-6">
              {NAV_ITEMS.map((item, i) => {
                const active = isActive(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity:0, x:-24 }}
                    animate={{ opacity:1, x:0 }}
                    transition={{ delay: i*0.06, duration:0.3, ease:[0.16,1,0.3,1] }}
                  >
                    <Link
                      to={item.href}
                      onClick={(e) => handleClick(e, item.href)}
                      className="flex items-center gap-4 group"
                      style={{ textDecoration: 'none' }}
                    >
                      <span
                        className="font-pixel"
                        style={{ fontSize:'9px', letterSpacing:'0.18em', color: item.accent }}
                      >
                        {item.index}
                      </span>
                      <span
                        className="font-display font-bold"
                        style={{
                          fontSize: 'clamp(1.8rem, 6vw, 2.6rem)',
                          color: active ? item.accent : 'var(--text-primary)',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {item.label}
                      </span>
                      {active && (
                        <div
                          className="pixel-decoration rotate-45"
                          style={{ width:8, height:8, background: item.accent, flexShrink:0 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom status */}
            <div className="absolute bottom-8 left-8 flex items-center gap-2">
              <div className="pixel-decoration" style={{ width:5, height:5, background:'var(--accent-acid)' }} />
              <span
                className="font-pixel uppercase"
                style={{ fontSize:'7px', letterSpacing:'0.2em', color:'var(--text-faint)' }}
              >
                ONLINE · AVAILABLE
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Single rail item ─────────────────────────
   
   Structure:
     [index]  LABEL  [━━ indicator]
   
   Active: left pink bar slides in with layoutId
   Hover:  label shifts right slightly
   ─────────────────────────────────────────── */
function NavRailItem({
  item,
  active,
  onClick,
}: {
  item: (typeof NAV_ITEMS)[number];
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
      className="relative flex items-center gap-2.5 py-2 px-2 group"
      style={{
        textDecoration: 'none',
        /* Left accent line for active */
        borderLeft: active
          ? `2px solid ${item.accent}`
          : '2px solid transparent',
        transition: 'border-color 0.15s ease',
      }}
    >
      {/* Active background tint */}
      {active && (
        <motion.div
          layoutId="nav-rail-bg"
          className="absolute inset-0 pointer-events-none"
          style={{ background: `${item.accent}0D` }}
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        />
      )}

      {/* Index */}
      <span
        className="font-pixel relative z-10 shrink-0"
        style={{
          fontSize: '8px',
          letterSpacing: '0.14em',
          color: active ? item.accent : hovered ? 'var(--text-tertiary)' : 'var(--text-faint)',
          transition: 'color 0.15s ease',
          minWidth: '1.6rem',
        }}
      >
        {item.index}
      </span>

      {/* Label */}
      <motion.span
        className="relative z-10 font-display font-semibold"
        animate={{
          color: active
            ? item.accent
            : hovered
            ? 'var(--text-primary)'
            : 'var(--text-secondary)',
          x: hovered && !active ? 2 : 0,
        }}
        transition={{ duration: 0.12 }}
        style={{
          fontSize: 'clamp(0.62rem, 0.9vw, 0.72rem)',
          letterSpacing: '0.08em',
          lineHeight: 1,
        }}
      >
        {item.label}
      </motion.span>

      {/* Active: animated bar indicator right side */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="bar"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{    scaleX: 0, opacity: 0 }}
            className="relative z-10 ml-auto shrink-0 origin-right"
            style={{
              width: 20,
              height: 2,
              background: item.accent,
              imageRendering: 'pixelated',
            }}
            transition={{ duration: 0.22, ease: [0.16,1,0.3,1] }}
          />
        )}
      </AnimatePresence>
    </Link>
  );
}
