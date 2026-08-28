import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home',       href: '/',            index: '01' },
  { label: 'About',      href: '/about',        index: '02' },
  { label: 'Work',       href: '/projects',     index: '03' },
  { label: 'Experience', href: '/#experience',  index: '04' },
  { label: 'Contact',    href: '/contact',      index: '05' },
];

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();

  /* Close mobile menu on route change */
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  /* Scroll-based background */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * isActive — decides whether to highlight a nav link.
   *
   * Rules:
   *  - '/'           → only exact match
   *  - '/#...'       → active only when we are on '/' (home)
   *  - '/projects'   → startsWith match so /projects/:slug stays highlighted
   *  - any other     → exact pathname match to avoid false positives
   */
  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/' && !location.hash;

    // Hash links active only when pathname === '/' AND hash matches
    if (href.startsWith('/#')) return location.pathname === '/' && location.hash === '#' + href.split('#')[1];

    if (href === '/projects') return location.pathname.startsWith('/projects');

    return location.pathname === href;
  };

  /**
   * handleNavClick — unified click handler.
   *
   * Hash links need special treatment:
   *  - If already on the target page → prevent default, scroll to element
   *  - If on a different page        → navigate there first, then scroll after render
   */
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setIsMobileOpen(false);

    if (!href.includes('#')) return; // let React Router handle normal links

    e.preventDefault();

    const [pagePath, hash] = href.split('#');
    const targetPath = pagePath === '' ? '/' : pagePath;

    const scrollToElement = () => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (location.pathname === targetPath) {
      // Already on the right page:
      // 1. Tell the router about the hash so location.hash updates
      navigate({ pathname: targetPath, hash: `#${hash}` }, { replace: true });
      // 2. Scroll to element
      scrollToElement();
    } else {
      // Navigate to the page with the hash, then scroll
      navigate({ pathname: targetPath, hash: `#${hash}` });
      setTimeout(scrollToElement, 120);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--bg-base)]/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="container-observatory">
        <div className="flex items-center justify-between h-[var(--nav-height)]">

          {/* ── Brand / Logo ── */}
          <Link
            to="/"
            className="relative group flex items-center gap-3"
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-20 blur-md"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative w-8 h-8 pixel-decoration bg-[var(--accent-primary)] flex items-center justify-center">
                <div className="w-2 h-2 bg-[var(--bg-base)]" />
              </div>
            </div>

            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-lg tracking-tight text-[var(--text-primary)]">
                NUR YANFA
              </span>
              <span className="font-mono text-[10px] tracking-wider text-[var(--accent-primary)] uppercase">
                Software Engineer
              </span>
            </div>
          </Link>

          {/* ── Desktop Navigation ── */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative group flex items-center gap-1.5"
              >
                {/* Pixel index — tiny, decorative, pixel font */}
                <span
                  className="font-pixel text-[8px] leading-none tracking-wider
                             text-[var(--text-faint)] group-hover:text-[var(--accent-primary)]
                             transition-colors duration-150 select-none"
                  aria-hidden="true"
                >
                  {link.index}
                </span>

                <motion.span
                  className={`font-display text-sm transition-colors ${
                    isActive(link.href)
                      ? 'text-[var(--text-primary)]'
                      : 'text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)]'
                  }`}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                </motion.span>

                {/* Active underline */}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px]
                               bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Hover underline (only when not active) */}
                {!isActive(link.href) && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-[2px]
                               bg-[var(--text-faint)] origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* ── Mobile Hamburger ── */}
          <motion.button
            onClick={() => setIsMobileOpen((v) => !v)}
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center text-[var(--text-primary)]"
            whileTap={{ scale: 0.95 }}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
          >
            <AnimatePresence mode="wait">
              {isMobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{    rotate:  90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate:  90, opacity: 0 }}
                  animate={{ rotate:   0, opacity: 1 }}
                  exit={{    rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{    opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[var(--bg-base)]/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="container-observatory py-8 flex flex-col gap-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x:   0 }}
                  transition={{ delay: index * 0.07, duration: 0.3 }}
                >
                  <Link
                    to={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="flex items-center gap-3 group"
                  >
                    <span
                      className="font-pixel text-[9px] text-[var(--accent-primary)] select-none"
                      aria-hidden="true"
                    >
                      {link.index}
                    </span>
                    <span
                      className={`font-display text-2xl tracking-tight transition-colors ${
                        isActive(link.href)
                          ? 'text-[var(--accent-primary)]'
                          : 'text-[var(--text-primary)] group-hover:text-[var(--accent-secondary)]'
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
