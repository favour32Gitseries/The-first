import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BRAND_LOGO_SRC } from '../data/media';

interface NavItem {
  label: string;
  to: string;
  sectionId: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/', sectionId: 'hero' },
  { label: 'Work', to: '/work', sectionId: 'portfolio' },
  { label: 'About', to: '/about', sectionId: 'about' },
  { label: 'Contact', to: '/book', sectionId: 'booking' },
];

/**
 * Sticky 3-zone top navigation bar with the Nhenye Visuals logo mark,
 * smooth section scrolling on Home, React Router page navigation, and mobile drawer.
 */
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleNavClick = (item: NavItem) => {
    setMobileOpen(false);
    if (location.pathname === '/' && item.sectionId) {
      const target = document.getElementById(item.sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    navigate(item.to);
  };

  const handleBookCta = () => {
    setMobileOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById('booking');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    navigate('/book');
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? 'border-b border-[#EFE6D5]/12 bg-[#0D0D0D]/95 backdrop-blur-md'
          : 'border-b border-[#EFE6D5]/10 bg-[#0D0D0D]'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Logo */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Nhenye Visuals home"
          className="flex h-12 items-center overflow-hidden shrink-0 transition-opacity hover:opacity-85"
        >
          <img
            src={BRAND_LOGO_SRC}
            alt="Nhenye Visuals"
            className="h-14 w-auto scale-110 object-contain invert mix-blend-screen"
          />
        </Link>

        {/* Zone 2: Concise single-line navigation links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <button
                key={item.to}
                type="button"
                onClick={() => handleNavClick(item)}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'text-[#2DD4BF]'
                    : 'text-[#EFE6D5]/85 hover:text-[#2DD4BF]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nv-nav-underline"
                    className="absolute right-0 -bottom-0.5 left-0 h-0.5 rounded-full bg-[#2DD4BF]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleBookCta}
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#2DD4BF] px-5 py-2 font-display text-sm font-bold text-[#0D0D0D] whitespace-nowrap shrink-0 transition-transform duration-150 hover:scale-[1.03] hover:bg-[#EFE6D5] active:scale-[0.98]"
          >
            Book a Shoot
          </button>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#EFE6D5]/20 text-[#EFE6D5] transition-colors hover:border-[#2DD4BF] hover:text-[#2DD4BF] md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="border-b border-[#EFE6D5]/15 bg-[#0D0D0D] px-4 pt-3 pb-6 md:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <button
                    key={item.to}
                    type="button"
                    onClick={() => handleNavClick(item)}
                    className={`flex min-h-[44px] items-center justify-between rounded-2xl px-4 text-left font-display text-lg font-bold transition-colors ${
                      isActive
                        ? 'bg-[#2DD4BF]/15 text-[#2DD4BF]'
                        : 'text-[#EFE6D5] hover:bg-[#181818]'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <button
                type="button"
                onClick={handleBookCta}
                className="mt-3 flex min-h-[46px] w-full items-center justify-center rounded-full bg-[#2DD4BF] px-5 py-3 font-display text-base font-bold text-[#0D0D0D]"
              >
                Book a Shoot
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
