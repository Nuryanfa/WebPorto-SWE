import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useSceneNav } from './SceneTransitionController';

/* ─────────────────────────────────────────────
   VerticalNav — 160px Japanese creative rail
   
   Layout fixes:
   • 160px width — enough for EXPERIENCE label
   • No overflow:hidden — nothing clipped
   • px-4 padding (16px each side → 128px usable)
   • Brand at fixed sizes that fit (not fluid clamp)
   • SOFTWARE ENGINEER on one line, nowrap
   • Nav items: larger, readable labels
   • Active: left border + bg tint + right dot
   • Hover: label shifts x, accent appears
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
  const location       = useLocation();
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
          DESKTOP RAIL
          160px fixed, ≥900px viewport
          ════════════════════════════════════════ */}
      <motion.nav
        initial={{ x: -180, opacity: 0 }}
        animate={{ x: 0,    opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="vnav-desktop fixed top-0 left-0 h-full z-50"
        style={{
          width: 'var(--nav-width)',
          /* No overflow:hidden — never clip content */
          overflow: 'visible',
          background: 'rgba(10,11,15,0.94)',
          backdropFilter: 'blur(16px) saturate(1.2)',
          /* Subtle right border — separates rail from content */
          borderRight: '1px solid rgba(245,243,240,0.06)',
          display: 'flex',
          flexDirection: 'column',
        }}
        aria-label="Main navigation"
      >
        {/* Inner scroll container — clips only if content overflows vertically */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            padding: '28px 16px 24px',
            overflowY: 'auto',
            overflowX: 'hidden',
            /* Hide scrollbar but keep scrollability */
            scrollbarWidth: 'none',
          }}
        >

          {/* ── BRAND ── */}
          <Link
            to="/"
            onClick={(e) => handleClick(e, '/')}
            aria-label="Home"
            style={{ textDecoration: 'none', display: 'block', marginBottom: '20px' }}
          >
            {/* Small pixel accent mark */}
            <div
              className="pixel-decoration"
              style={{
                width: 8,
                height: 8,
                background: activeItem.accent,
                marginBottom: 10,
                transition: 'background 0.3s ease',
              }}
            />

            {/* NUR — large display */}
            <div
              className="font-display font-extrabold"
              style={{
                fontSize: '1.55rem',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
              }}
            >
              NUR
            </div>

            {/* YANFA — accent coloured */}
            <div
              className="font-display font-extrabold"
              style={{
                fontSize: '1.55rem',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: activeItem.accent,
                whiteSpace: 'nowrap',
                transition: 'color 0.3s ease',
                marginBottom: 8,
              }}
            >
              YANFA
            </div>

            {/* SOFTWARE ENGINEER — single line, small mono */}
            <div
              className="font-mono"
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.14em',
                color: 'var(--text-faint)',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              Software Engineer
            </div>
          </Link>

          {/* ── Hairline separator ── */}
          <div
            aria-hidden="true"
            style={{
              height: 1,
              background: 'rgba(245,243,240,0.07)',
              marginBottom: 20,
              flexShrink: 0,
            }}
          />

          {/* ── NAV ITEMS ── */}
          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              flex: 1,
            }}
          >
            {NAV_ITEMS.map((item) => (
              <NavRailItem
                key={item.href}
                item={item}
                active={isActive(item.href)}
                onClick={handleClick}
              />
            ))}
          </nav>

          {/* ── Hairline separator ── */}
          <div
            aria-hidden="true"
            style={{
              height: 1,
              background: 'rgba(245,243,240,0.07)',
              marginTop: 20,
              marginBottom: 16,
              flexShrink: 0,
            }}
          />

          {/* ── STATUS ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <motion.div
              className="pixel-decoration"
              style={{ width: 6, height: 6, background: 'var(--accent-acid)', flexShrink: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
            <span
              className="font-mono"
              style={{
                fontSize: '0.58rem',
                letterSpacing: '0.18em',
                color: 'var(--accent-acid)',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              Available
            </span>
          </div>

        </div>
      </motion.nav>

      {/* ════════════════════════════════════════
          MOBILE TOP BAR — <900px
          ════════════════════════════════════════ */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="vnav-mobile-bar fixed top-0 left-0 right-0 z-50 h-[var(--nav-height)]
                   items-center justify-between px-5"
        style={{
          background: 'rgba(8,9,13,0.94)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(245,243,240,0.06)',
        }}
      >
        <Link
          to="/"
          onClick={(e) => handleClick(e, '/')}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <div
            className="pixel-decoration"
            style={{ width: 7, height: 7, background: activeItem.accent, flexShrink: 0 }}
          />
          <span
            className="font-display font-extrabold"
            style={{ fontSize: '1.05rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}
          >
            NUR<span style={{ color: activeItem.accent }}>.</span>YANFA
          </span>
        </Link>

        <motion.button
          onClick={() => setMobileOpen(v => !v)}
          whileTap={{ scale: 0.9 }}
          style={{
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <AnimatePresence mode="wait">
            {mobileOpen
              ? <motion.div key="x"    initial={{ rotate:-90, opacity:0 }} animate={{ rotate:0, opacity:1 }} exit={{ rotate:90,  opacity:0 }} transition={{ duration:0.14 }}><X    size={20}/></motion.div>
              : <motion.div key="menu" initial={{ rotate: 90, opacity:0 }} animate={{ rotate:0, opacity:1 }} exit={{ rotate:-90, opacity:0 }} transition={{ duration:0.14 }}><Menu size={20}/></motion.div>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{    opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 40,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 2rem',
              background: 'rgba(8,9,13,0.97)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {NAV_ITEMS.map((item, i) => {
                const active = isActive(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity:0, x:-28 }}
                    animate={{ opacity:1, x:0 }}
                    transition={{ delay: i * 0.06, duration: 0.3, ease: [0.16,1,0.3,1] }}
                  >
                    <Link
                      to={item.href}
                      onClick={(e) => handleClick(e, item.href)}
                      style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 20 }}
                    >
                      <span
                        className="font-mono"
                        style={{ fontSize: '0.7rem', letterSpacing: '0.18em', color: item.accent }}
                      >
                        {item.index}
                      </span>
                      <span
                        className="font-display font-bold"
                        style={{
                          fontSize: 'clamp(1.8rem, 6vw, 2.6rem)',
                          letterSpacing: '-0.02em',
                          color: active ? item.accent : 'var(--text-primary)',
                        }}
                      >
                        {item.label}
                      </span>
                      {active && (
                        <div
                          className="pixel-decoration"
                          style={{ width: 8, height: 8, background: item.accent, transform: 'rotate(45deg)', flexShrink: 0 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div style={{ position: 'absolute', bottom: 32, left: 32, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div className="pixel-decoration" style={{ width: 5, height: 5, background: 'var(--accent-acid)' }} />
              <span
                className="font-mono"
                style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--text-faint)', textTransform: 'uppercase' }}
              >
                Online · Available
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── NavRailItem ──────────────────────────────
   
   Fixed layout — no clamp on label size.
   
   Structure (128px usable):
   ┌─────────────────────────────────────┐
   │ ▏ 01   IDENTITY            ◆       │
   └─────────────────────────────────────┘
   
   Left 2px border = active indicator
   Right ◆ = active pixel marker
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
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '7px 8px',
        textDecoration: 'none',
        /* Active left border */
        borderLeft: active
          ? `2px solid ${item.accent}`
          : '2px solid transparent',
        transition: 'border-color 0.18s ease',
        /* No overflow hidden — let content breathe */
        overflow: 'visible',
      }}
    >
      {/* Active background tint — animated via layoutId */}
      {active && (
        <motion.div
          layoutId="nav-rail-bg"
          style={{
            position: 'absolute',
            inset: 0,
            background: `${item.accent}12`,
            pointerEvents: 'none',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 38 }}
        />
      )}

      {/* Index number */}
      <span
        className="font-mono"
        style={{
          fontSize: '0.62rem',
          letterSpacing: '0.12em',
          color: active
            ? item.accent
            : hovered
            ? 'var(--text-tertiary)'
            : 'var(--text-faint)',
          transition: 'color 0.15s ease',
          flexShrink: 0,
          width: '1.8rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {item.index}
      </span>

      {/* Label */}
      <motion.span
        animate={{
          color: active
            ? item.accent
            : hovered
            ? 'var(--text-primary)'
            : 'var(--text-secondary)',
          x: hovered && !active ? 3 : 0,
        }}
        transition={{ duration: 0.14 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: '0.7rem',
          letterSpacing: '0.07em',
          lineHeight: 1,
          flex: 1,
          position: 'relative',
          zIndex: 1,
          whiteSpace: 'nowrap',
        }}
      >
        {item.label}
      </motion.span>

      {/* Active: pixel diamond marker */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="diamond"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{    opacity: 0, scale: 0 }}
            transition={{ duration: 0.18, ease: [0.16,1,0.3,1] }}
            className="pixel-decoration"
            style={{
              width: 5,
              height: 5,
              background: item.accent,
              transform: 'rotate(45deg)',
              flexShrink: 0,
              position: 'relative',
              zIndex: 1,
            }}
          />
        )}
      </AnimatePresence>
    </Link>
  );
}
