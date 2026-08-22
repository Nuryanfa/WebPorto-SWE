import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';

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

import { NoiseOverlay } from '@/components/reactbits/NoiseOverlay';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { AstronomyImmersive } from '@/components/background/AstronomyImmersive';

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
      <div className="min-h-screen flex flex-col" style={{ position: 'relative', zIndex: 1 }}>
        <AstronomyImmersive />
        <NoiseOverlay />
        <CustomCursor />
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
