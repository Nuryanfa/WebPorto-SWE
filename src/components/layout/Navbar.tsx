import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Work',       href: '/projects'     },
  { label: 'About',      href: '/about'         },
  { label: 'Experience', href: '/#experience'   },
  { label: 'Contact',    href: '/contact'       },
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
    if (href === '/') return location.pathname === '/';

    // Hash links (e.g. '/#experience') are active only on the home page
    if (href.startsWith('/#')) return location.pathname === '/';

    // /projects should also highlight when on /projects/:slug
    if (href === '/projects') return location.pathname.startsWith('/projects');

    // Everything else: exact match
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
    const targetPath = pagePath === '' ? '/' : pagePath; // '/#experience' → '/'

    const scrollToHash = () => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', href);
      }
    };

    if (location.pathname === targetPath) {
      // Already on the right page — just scroll
      scrollToHash();
    } else {
      // Navigate to the page first, then scroll once the DOM settles
      navigate(targetPath);
      // Small delay to let React render the destination page
      setTimeout(scrollToHash, 120);
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
                className="relative group"
              >
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

                {/* Active underline (shared layoutId so it slides between items) */}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Hover underline (only when not active) */}
                {!isActive(link.href) && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--text-faint)] origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}

                {/* Pixel dot on hover */}
                <motion.div
                  className="absolute -top-2 -right-2 w-1 h-1 bg-[var(--accent-secondary)] pixel-decoration opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.2 }}
                />
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
                    <div className="w-2 h-2 pixel-decoration bg-[var(--accent-primary)] group-hover:bg-[var(--accent-secondary)] transition-colors" />
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
