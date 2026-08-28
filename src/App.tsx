import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { VerticalNav } from '@/components/navigation/VerticalNav';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { NoiseOverlay } from '@/components/reactbits/NoiseOverlay';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { PixelCursor } from '@/components/interaction/PixelCursor';
import { EntryScene } from '@/components/scenes/EntryScene';

const Home          = lazy(() => import('@/pages/Home'));
const About         = lazy(() => import('@/pages/About'));
const Projects      = lazy(() => import('@/pages/Projects'));
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'));
const ContactPage   = lazy(() => import('@/pages/ContactPage'));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="font-pixel text-[9px] tracking-[0.3em] text-[var(--text-faint)] uppercase animate-pulse">
        Loading...
      </div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.replace('#', ''));
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/"            element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about"       element={<PageTransition><About /></PageTransition>} />
          <Route path="/projects"    element={<PageTransition><Projects /></PageTransition>} />
          <Route path="/projects/:slug" element={<PageTransition><ProjectDetail /></PageTransition>} />
          <Route path="/contact"     element={<PageTransition><ContactPage /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  const [entryDone, setEntryDone] = useState(false);

  return (
    <BrowserRouter>
      <SmoothScroll>
        {/* ── Global overlays (always rendered) ── */}
        <NoiseOverlay />
        <PixelCursor />

        {/* ── Entry scene (session-gated) ── */}
        <AnimatePresence>
          {!entryDone && (
            <EntryScene onComplete={() => setEntryDone(true)} />
          )}
        </AnimatePresence>

        {/* ── App shell (only interactive after entry) ── */}
        <div
          className="min-h-screen flex flex-col"
          style={{
            /* Prevent interaction behind entry scene */
            pointerEvents: entryDone ? 'auto' : 'none',
            /* Keep layout visible so LCP isn't blocked */
            opacity: entryDone ? 1 : 0,
          }}
        >
          <VerticalNav />

          {/* Content shifts right to clear the 72px vertical nav on desktop */}
          <div className="scene-content flex flex-col flex-1">
            <main className="flex-1">
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
        </div>
      </SmoothScroll>
    </BrowserRouter>
  );
}
