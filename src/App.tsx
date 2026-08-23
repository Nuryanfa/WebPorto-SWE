import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { NoiseOverlay } from '@/components/reactbits/NoiseOverlay';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { AstronomyImmersive } from '@/components/background/AstronomyImmersive';
import { NebulaBackground } from '@/components/background/NebulaBackground';

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

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <BackgroundRouter />
        <div className="min-h-screen flex flex-col" style={{ position: 'relative', zIndex: 1 }}>
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

import { GalaxyBackground } from '@/components/background/GalaxyBackground';
import { BlackHoleBackground } from '@/components/background/BlackHoleBackground';
import { SatelliteBackground } from '@/components/background/SatelliteBackground';

/**
 * Background Router - Different backgrounds per page
 * 
 * Stage 1: About = NebulaBackground (Carina Nebula real asset)
 * Stage 2: Projects = GalaxyBackground (TBD)
 * Stage 3: Home = BlackHoleBackground (TBD)
 * Stage 4: Contact = SatelliteBackground (TBD)
 * Default: AstronomyImmersive (current starfield for other pages)
 */
function BackgroundRouter() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Stage 1: About page uses Nebula background
  if (currentPath === '/about') {
    return <NebulaBackground />;
  }

  // Stage 2: Projects page
  if (currentPath.startsWith('/projects')) {
    return <GalaxyBackground />;
  }

  // Stage 3: Home page
  if (currentPath === '/') {
    return <BlackHoleBackground />;
  }

  // Stage 4: Contact page
  if (currentPath === '/contact') {
    return <SatelliteBackground />;
  }

  // Default: Current immersive background for pages not yet implemented
  return <AstronomyImmersive />;
}
