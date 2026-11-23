import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDownRight, Play } from 'lucide-react';
import { HERO_SHOWREEL } from '../data/media';

interface HeroProps {
  onViewWork: () => void;
  onBookShoot: () => void;
}

const MARQUEE_ITEMS = [
  'Videography',
  'Graphic Design',
  'Commercial Reels',
  'Brand Campaigns',
  'Visual Publicity',
  'Motion Editing',
];

/**
 * Full-screen Black hero section with looping showreel background,
 * expressive typography, playful SVG squiggle accent, dual CTAs,
 * and a high-contrast turquoise scrolling marquee strip.
 */
export function Hero({ onViewWork, onBookShoot }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const [frameIdx, setFrameIdx] = useState(0);

  // Cycle showreel frames smoothly when no videoSrc is set
  useEffect(() => {
    if (HERO_SHOWREEL.videoSrc || prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setFrameIdx((prev) => (prev + 1) % HERO_SHOWREEL.reelFrames.length);
    }, 3400);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-between overflow-hidden bg-[#0D0D0D] text-[#EFE6D5]"
    >
      {/* Looping Showreel Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {HERO_SHOWREEL.videoSrc ? (
          <video
            src={HERO_SHOWREEL.videoSrc}
            poster={HERO_SHOWREEL.posterSrc}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-45"
          />
        ) : (
          HERO_SHOWREEL.reelFrames.map((frame, index) => (
            <motion.img
              key={frame}
              src={frame}
              alt=""
              referrerPolicy="no-referrer"
              initial={false}
              animate={{
                opacity: index === frameIdx ? 0.56 : 0,
                scale: index === frameIdx && !prefersReducedMotion ? 1.06 : 1.01,
              }}
              transition={{
                opacity: { duration: 0.9, ease: 'easeInOut' },
                scale: { duration: 4.5, ease: 'easeOut' },
              }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ))
        )}

        {/* Measured contrast scrim so foreground typography exceeds WCAG AA */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/60 to-[#0D0D0D]/75" />
      </div>

      {/* Playful Floating Geometric Shapes */}
      {!prefersReducedMotion && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <motion.div
            animate={{ y: [0, -16, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 right-[10%] hidden h-20 w-20 rounded-full border-2 border-[#2DD4BF]/50 lg:block"
          />
          <motion.div
            animate={{ y: [0, 14, 0], rotate: [0, -12, 0] }}
            transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-[18%] bottom-32 hidden h-10 w-10 rounded-xl bg-[#2DD4BF]/25 lg:block"
          />
        </div>
      )}

      {/* Main Hero Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          {/* Editorial kicker without pill box */}
          <p className="mb-5 flex items-center gap-2.5 text-sm font-medium tracking-wide text-[#2DD4BF]">
            <Play className="h-4 w-4 fill-[#2DD4BF]" aria-hidden="true" />
            <span>Media &amp; Publicity Studio · Showreel 2026</span>
          </p>

          <h1
            className="font-display font-extrabold tracking-tight text-[#EFE6D5] [text-wrap:balance]"
            style={{ fontSize: 'clamp(2.65rem, 5.8vw, 5.25rem)', lineHeight: 1.02 }}
          >
            Capturing{' '}
            <span className="relative inline-block text-[#2DD4BF]">
              stories.
              {/* Playful animated underline squiggle */}
              <svg
                viewBox="0 0 240 20"
                fill="none"
                aria-hidden="true"
                className="absolute -bottom-2 left-0 w-full"
              >
                <motion.path
                  d="M4 13C44 3 84 18 124 9C164 1 200 16 236 7"
                  stroke="#EFE6D5"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.85, delay: 0.25, ease: 'easeOut' }}
                />
              </svg>
            </span>
            <br />
            Amplifying brands.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#EFE6D5]/90 sm:text-xl">
            Nhenye Visuals blends energetic videography and bold graphic identity to put cultural brands and community movements in the spotlight.
          </p>

          {/* Prominent Dual Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onViewWork}
              className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[#2DD4BF] px-7 py-3.5 font-display text-base font-bold text-[#0D0D0D] whitespace-nowrap shrink-0 transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#EFE6D5] active:translate-y-0"
            >
              <span>View Our Work</span>
              <ArrowDownRight className="h-5 w-5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={onBookShoot}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border-2 border-[#EFE6D5]/75 bg-[#0D0D0D]/60 px-7 py-3.5 font-display text-base font-bold text-[#EFE6D5] whitespace-nowrap shrink-0 backdrop-blur-xs transition-all duration-150 hover:-translate-y-0.5 hover:border-[#2DD4BF] hover:text-[#2DD4BF] active:translate-y-0"
            >
              <span>Book a Shoot</span>
            </button>
          </div>
        </motion.div>

        {/* Subtle Reel Chapter Dots (functional switcher for previewing hero reel frames) */}
        {!HERO_SHOWREEL.videoSrc && (
          <div className="mt-12 flex items-center gap-3">
            <span className="font-mono text-xs text-[#EFE6D5]/65">Reel 0{frameIdx + 1}/0{HERO_SHOWREEL.reelFrames.length}</span>
            <div className="flex items-center gap-2" role="group" aria-label="Showreel scene selector">
              {HERO_SHOWREEL.reelFrames.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Showreel scene ${idx + 1}`}
                  onClick={() => setFrameIdx(idx)}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    idx === frameIdx
                      ? 'w-8 bg-[#2DD4BF]'
                      : 'w-2.5 bg-[#EFE6D5]/35 hover:bg-[#EFE6D5]/70'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Scrolling Marquee Strip */}
      <div className="relative z-10 overflow-hidden border-y border-[#0D0D0D] bg-[#2DD4BF] py-3.5 text-[#0D0D0D]">
        <div className="animate-nv-marquee items-center">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {MARQUEE_ITEMS.map((service) => (
                <span
                  key={`${dup}-${service}`}
                  className="mx-6 flex items-center gap-6 font-display text-base font-extrabold tracking-tight uppercase sm:text-lg"
                >
                  <span>{service}</span>
                  <span aria-hidden="true" className="text-[#0D0D0D]/60">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
