import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { Menu, X } from 'lucide-react';
import type { NavLink } from '@/types';

const navLinks: NavLink[] = [
  { label: 'Home', href: '/', isRoute: true },
  { label: 'About', href: '/about', isRoute: true },
  { label: 'Projects', href: '/projects', isRoute: true },
  { label: 'Contact', href: '/contact', isRoute: true },
];

/**
 * Floating Pill Navbar (Phase 3 Upgrade).
 * - Floats centered at the top with frosted glass.
 * - Hides on scroll down, shows on scroll up.
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest > 50) {
      setIsScrolled(true);
      // Hide if scrolling down, show if scrolling up
      if (latest > previous && latest > 150) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    } else {
      setIsScrolled(false);
      setIsHidden(false);
    }
  });

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isHidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`
        fixed left-1/2 -translate-x-1/2 z-50
        transition-all duration-300
        ${isScrolled
          ? 'top-4 w-[95%] md:w-[max-content] md:px-8 py-3 bg-[var(--bg-elevated)]/70 backdrop-blur-xl border border-[var(--line-hairline)] rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
          : 'top-0 w-full md:w-[max-content] md:top-6 md:px-8 py-4 bg-transparent border border-transparent'
        }
      `}
    >
      <div className="flex items-center justify-between gap-12 w-full px-4 md:px-0">
        {/* Logo / Designation */}
        <Link
          to="/"
          className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-sm tracking-widest uppercase text-[var(--text-star)] hover:text-[var(--accent-nebula)] transition-colors no-underline"
        >
          <span className="text-[var(--accent-nebula)]">◆</span>
          <span>N.YANFA</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`
                relative font-[family-name:var(--font-display)] text-sm tracking-wider uppercase
                transition-colors duration-150 no-underline
                ${isActive(link.href)
                  ? 'text-[var(--accent-nebula)]'
                  : 'text-[var(--text-dim)] hover:text-[var(--text-star)]'
                }
              `}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--accent-nebula)]"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2 text-[var(--text-dim)] hover:text-[var(--text-star)] transition-colors cursor-pointer"
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[var(--bg-void)]/95 backdrop-blur-lg border-b border-[var(--line-hairline)] overflow-hidden"
          >
            <div className="container-observatory py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`
                    font-[family-name:var(--font-display)] text-lg tracking-wider uppercase no-underline
                    ${isActive(link.href)
                      ? 'text-[var(--accent-nebula)]'
                      : 'text-[var(--text-dim)]'
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
