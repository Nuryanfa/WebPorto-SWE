import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { NoiseOverlay } from '@/components/reactbits/NoiseOverlay';
import { SmoothScroll } from '@/components/providers/SmoothScroll';

/* ── Lazy-loaded pages ── */
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Projects = lazy(() => import('@/pages/Projects'));
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));

/**
 * Loading fallback — minimal, themed.
 */
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="font-[family-name:var(--font-mono)] text-xs tracking-[0.3em] text-[var(--text-faint)] uppercase animate-pulse">
          ACQUIRING SIGNAL...
        </div>
      </div>
    </div>
  );
}

/**
 * Animated routes wrapper — uses AnimatePresence for page transitions.
 */
function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Delay slightly to ensure page has rendered
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="/about"
            element={
              <PageTransition>
                <About />
              </PageTransition>
            }
          />
          <Route
            path="/projects"
            element={
              <PageTransition>
                <Projects />
              </PageTransition>
            }
          />
          <Route
            path="/projects/:slug"
            element={
              <PageTransition>
                <ProjectDetail />
              </PageTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <PageTransition>
                <ContactPage />
              </PageTransition>
            }
          />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <div className="min-h-screen flex flex-col" style={{ position: 'relative', zIndex: 1 }}>
          <NoiseOverlay />
          <Navbar />
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </BrowserRouter>
  );
}
