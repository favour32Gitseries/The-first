import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { PORTFOLIO_ITEMS, type PortfolioItem } from './data/media';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioGrid } from './components/PortfolioGrid';
import { ServicesBand } from './components/ServicesBand';
import { AboutSection } from './components/AboutSection';
import { BookingSection } from './components/BookingSection';
import { Lightbox } from './components/Lightbox';
import { Footer } from './components/Footer';

function ScrollToTopOnRoute() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

interface PageTransitionProps {
  children: React.ReactNode;
}

function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const scrollToSection = (sectionId: string, fallbackRoute: string) => {
    if (location.pathname === '/') {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    navigate(fallbackRoute);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0D0D0D] text-[#EFE6D5]">
      <ScrollToTopOnRoute />
      <CustomCursor />
      <Navbar />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Hero
                    onViewWork={() => scrollToSection('portfolio', '/work')}
                    onBookShoot={() => scrollToSection('booking', '/book')}
                  />
                  <PortfolioGrid onSelectProject={setSelectedProject} />
                  <ServicesBand onBookShoot={() => scrollToSection('booking', '/book')} />
                  <AboutSection />
                  <BookingSection />
                </PageTransition>
              }
            />
            <Route
              path="/work"
              element={
                <PageTransition>
                  <PortfolioGrid onSelectProject={setSelectedProject} />
                  <ServicesBand onBookShoot={() => navigate('/book')} />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <AboutSection />
                  <ServicesBand onBookShoot={() => navigate('/book')} />
                </PageTransition>
              }
            />
            <Route
              path="/book"
              element={
                <PageTransition>
                  <BookingSection />
                </PageTransition>
              }
            />
            <Route
              path="*"
              element={
                <PageTransition>
                  <Hero
                    onViewWork={() => scrollToSection('portfolio', '/work')}
                    onBookShoot={() => scrollToSection('booking', '/book')}
                  />
                  <PortfolioGrid onSelectProject={setSelectedProject} />
                  <ServicesBand onBookShoot={() => scrollToSection('booking', '/book')} />
                  <AboutSection />
                  <BookingSection />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />

      <Lightbox
        item={selectedProject}
        items={PORTFOLIO_ITEMS}
        onClose={() => setSelectedProject(null)}
        onSelectItem={setSelectedProject}
      />
    </div>
  );
}

/**
 * Root Nhenye Visuals application wrapped in BrowserRouter and reduced-motion-aware MotionConfig.
 */
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </MotionConfig>
  );
}
