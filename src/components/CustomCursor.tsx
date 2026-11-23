import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/**
 * Playful desktop-only custom cursor follower.
 * Automatically disabled on touch viewports or when `prefers-reduced-motion` is enabled.
 */
export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [isPointerHover, setIsPointerHover] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const handleMove = (e: MouseEvent) => {
      setVisible(true);
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      const cursorEl = target?.closest<HTMLElement>('[data-cursor-label]');
      const interactiveEl = target?.closest('a, button, input, select, textarea');

      if (cursorEl) {
        setActiveLabel(cursorEl.getAttribute('data-cursor-label'));
        setIsPointerHover(true);
      } else if (interactiveEl) {
        setActiveLabel(null);
        setIsPointerHover(true);
      } else {
        setActiveLabel(null);
        setIsPointerHover(false);
      }
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion || !visible) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-50 hidden lg:flex items-center justify-center"
      animate={{
        x: pos.x - (activeLabel ? 34 : isPointerHover ? 18 : 10),
        y: pos.y - (activeLabel ? 34 : isPointerHover ? 18 : 10),
        width: activeLabel ? 68 : isPointerHover ? 36 : 20,
        height: activeLabel ? 68 : isPointerHover ? 36 : 20,
      }}
      transition={{
        type: 'spring',
        stiffness: 420,
        damping: 32,
        mass: 0.45,
      }}
    >
      <div
        className={`flex h-full w-full items-center justify-center rounded-full border transition-colors duration-150 ${
          activeLabel
            ? 'border-[#0D0D0D] bg-[#2DD4BF] text-[#0D0D0D] shadow-lg'
            : isPointerHover
              ? 'border-[#2DD4BF] bg-[#2DD4BF]/20'
              : 'border-[#2DD4BF]/70 bg-transparent'
        }`}
      >
        {activeLabel && (
          <span className="font-display text-[11px] font-bold tracking-tight uppercase">
            {activeLabel}
          </span>
        )}
      </div>
    </motion.div>
  );
}
