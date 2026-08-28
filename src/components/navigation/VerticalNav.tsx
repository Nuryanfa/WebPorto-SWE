import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

/* ─────────────────────────────────────────────
   VerticalNav — Blueprint §21
   
   Desktop: fixed left side, 72px wide
     - Brand mark at top
     - Numbered nav items (01–05) rotated text
     - Pixel active indicator line
     - Scroll progress bar at bottom
   
   Mobile: compact top bar + full-screen overlay
   ───────────────────────────────────────────── */

const NAV_ITEMS = [
  { index: '01', label: 'Identity',     href: '/',            scene: 'identity'   },
  { index: '02', label: 'Profile',      href: '/about',       scene: 'profile'    },
  { index: '03', label: 'Work',         href: '/projects',    scene: 'work'       },
  { index: '04', label: 'Experience',   href: '/#experience', scene: 'experience' },
  { index: '05', label: 'Contact',      href: '/contact',     scene: 'contact'    },
];

export function VerticalNav() {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [scrollPct,  setScrollPct]    = useState(0);
  const location   = useLocation();
  const navigate   = useNavigate();

  /* Close mobile on route change */
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  /* Scroll progress */
  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement;
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight) || 0;
      setScrollPct(Math.min(1, Math.max(0, pct)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/')            return location.pathname === '/' && !location.hash;
    if (href.startsWith('/#'))   return location.pathname === '/' && location.hash === '#' + href.split('#')[1];
    if (href === '/projects')    return location.pathname.startsWith('/projects');
    return location.pathname === href;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileOpen(false);
    if (!href.includes('#')) return;
    e.preventDefault();
    const [pagePath, hash] = href.split('#');
    const target = pagePath || '/';
    const scroll = () => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (location.pathname === target) {
      navigate({ pathname: target, hash: `#${hash}` }, { replace: true });
      scroll();
    } else {
      navigate({ pathname: target, hash: `#${hash}` });
      setTimeout(scroll, 120);
    }
  };

  return (
    <>
      {/* ══════════════════════════════════
          DESKTOP — fixed left column
          ══════════════════════════════════ */}
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 h-full z-50 hidden md:flex flex-col items-center
                   justify-between py-8
                   bg-[var(--bg-base)]/80 backdrop-blur-xl
                   border-r border-white/5"
        style={{ width: 'var(--nav-width)' }}
        aria-label="Main navigation"
      >
        {/* ── Brand mark ── */}
        <Link
          to="/"
          className="flex flex-col items-center gap-1 group"
          aria-label="Home"
        >
          {/* Pixel square logo */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative w-8 h-8 pixel-decoration bg-[var(--accent-magenta)]
                       flex items-center justify-center"
          >
            <motion.div
              className="absolute inset-0 bg-[var(--accent-magenta)] blur-md opacity-0
                         group-hover:opacity-40"
              transition={{ duration: 0.2 }}
            />
            <div className="relative w-2 h-2 bg-[var(--bg-base)]" />
          </motion.div>
        </Link>

        {/* ── Nav items ── */}
        <nav className="flex flex-col items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <div key={item.href} className="relative flex items-center">
                {/* Active indicator — pixel line left of item */}
                <AnimatePresence>
                  {active && (
                    <motion.div
                      layoutId="nav-active-bar"
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={{ scaleY: 1, opacity: 1 }}
                      exit={{ scaleY: 0, opacity: 0 }}
                      className="absolute -left-3 w-[3px] h-8 origin-center
                                 bg-[var(--accent-magenta)] pixel-decoration"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </AnimatePresence>

                <Link
                  to={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className="group flex flex-col items-center gap-1"
                  aria-current={active ? 'page' : undefined}
                >
                  {/* Index label */}
                  <span
                    className="font-pixel text-[8px] transition-colors duration-150"
                    style={{ color: active ? 'var(--accent-magenta)' : 'var(--text-faint)' }}
                  >
                    {item.index}
                  </span>

                  {/* Label — rotated 90° */}
                  <motion.span
                    style={{
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed',
                      transform: 'rotate(180deg)',
                      fontSize: '10px',
                      letterSpacing: '0.15em',
                      fontFamily: 'var(--font-mono)',
                      textTransform: 'uppercase',
                      color: active ? 'var(--text-primary)' : 'var(--text-faint)',
                    }}
                    whileHover={{ color: 'var(--text-primary)', y: -2 }}
                    transition={{ duration: 0.15 }}
                  >
                    {item.label}
                  </motion.span>
                </Link>
              </div>
            );
          })}
        </nav>

        {/* ── Scroll progress + SCROLL label ── */}
        <div className="flex flex-col items-center gap-2">
          <span
            className="font-pixel text-[7px] uppercase tracking-widest"
            style={{ color: 'var(--text-faint)', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            SCROLL
          </span>
          {/* Progress track */}
          <div className="relative w-[2px] h-16 bg-[var(--text-faint)]/20">
            <motion.div
              className="absolute top-0 left-0 w-full bg-[var(--accent-magenta)] pixel-decoration origin-top"
              style={{ height: `${scrollPct * 100}%` }}
            />
            {/* Pixel diamond at current position */}
            <motion.div
              className="absolute left-1/2 w-[5px] h-[5px] -translate-x-1/2
                         bg-[var(--accent-magenta)] pixel-decoration rotate-45"
              style={{ top: `calc(${scrollPct * 100}% - 2.5px)` }}
            />
          </div>
        </div>
      </motion.aside>

      {/* ══════════════════════════════════
          MOBILE — top bar + overlay
          ══════════════════════════════════ */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden fixed top-0 left-0 right-0 z-50 h-[var(--nav-height)]
                   flex items-center justify-between px-6
                   bg-[var(--bg-base)]/85 backdrop-blur-xl border-b border-white/5"
      >
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3" aria-label="Home">
          <div className="w-7 h-7 pixel-decoration bg-[var(--accent-magenta)] flex items-center justify-center">
            <div className="w-2 h-2 bg-[var(--bg-base)]" />
          </div>
          <span className="font-mono text-xs tracking-widest text-[var(--text-primary)] uppercase">
            NUR.YANFA
          </span>
        </Link>

        {/* Hamburger */}
        <motion.button
          onClick={() => setMobileOpen(v => !v)}
          whileTap={{ scale: 0.92 }}
          className="w-9 h-9 flex items-center justify-center text-[var(--text-primary)]"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <AnimatePresence mode="wait">
            {mobileOpen
              ? <motion.div key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X size={22} /></motion.div>
              : <motion.div key="menu" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate:-90, opacity: 0 }} transition={{ duration: 0.18 }}><Menu size={22} /></motion.div>
            }
          </AnimatePresence>
        </motion.button>
      </motion.header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{    opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-0 z-40 bg-[var(--bg-base)]/97 backdrop-blur-xl
                       flex flex-col justify-center px-10"
          >
            <nav className="space-y-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className="flex items-center gap-5 group"
                  >
                    <span className="font-pixel text-[10px] text-[var(--accent-magenta)]">
                      {item.index}
                    </span>
                    <span
                      className="font-display font-bold transition-colors duration-150"
                      style={{
                        fontSize: 'clamp(1.8rem, 6vw, 2.6rem)',
                        color: isActive(item.href) ? 'var(--accent-magenta)' : 'var(--text-primary)',
                      }}
                    >
                      {item.label}
                    </span>
                    {isActive(item.href) && (
                      <div className="w-2 h-2 pixel-decoration bg-[var(--accent-magenta)]" />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom metadata */}
            <div className="absolute bottom-10 left-10 font-mono text-[10px]
                            text-[var(--text-faint)] tracking-widest uppercase space-y-1">
              <div>STATUS / AVAILABLE</div>
              <div>BASED / INDONESIA</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
