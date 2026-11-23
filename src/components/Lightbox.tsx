import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { PortfolioItem } from '../data/media';

interface LightboxProps {
  item: PortfolioItem | null;
  items: PortfolioItem[];
  onClose: () => void;
  onSelectItem: (item: PortfolioItem) => void;
}

/**
 * Fullscreen accessible Lightbox modal supporting full video playback,
 * high-resolution graphic design inspection, and keyboard navigation (ESC, Left, Right).
 */
export function Lightbox({ item, items, onClose, onSelectItem }: LightboxProps) {
  const currentIndex = item ? items.findIndex((entry) => entry.id === item.id) : -1;

  const goPrev = () => {
    if (currentIndex < 0) return;
    const prevIdx = (currentIndex - 1 + items.length) % items.length;
    onSelectItem(items[prevIdx]);
  };

  const goNext = () => {
    if (currentIndex < 0) return;
    const nextIdx = (currentIndex + 1) % items.length;
    onSelectItem(items[nextIdx]);
  };

  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item?.id]);

  if (!item) return null;

  const isVideo = item.category === 'video';

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0D0D]/92 p-4 backdrop-blur-md sm:p-6 lg:p-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 14 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-[#EFE6D5]/15 bg-[#141414] text-[#EFE6D5] shadow-2xl"
        >
          {/* Top Bar inside Modal */}
          <div className="flex items-center justify-between gap-4 border-b border-[#EFE6D5]/10 px-5 py-4 sm:px-7">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-xs font-medium text-[#2DD4BF]">
                <span>{item.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#EFE6D5]/75">{item.client}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums text-[#EFE6D5]/75">{item.year}</span>
              </p>
              <h3
                id="lightbox-title"
                className="mt-0.5 truncate font-display text-xl font-bold tracking-tight text-[#EFE6D5] sm:text-2xl"
              >
                {item.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous project"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EFE6D5]/20 text-[#EFE6D5] transition-colors hover:border-[#2DD4BF] hover:text-[#2DD4BF]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next project"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EFE6D5]/20 text-[#EFE6D5] transition-colors hover:border-[#2DD4BF] hover:text-[#2DD4BF]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close lightbox"
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#2DD4BF] text-[#0D0D0D] transition-colors hover:bg-[#EFE6D5]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Media Viewport */}
          <div className="relative flex-1 overflow-y-auto">
            <div className="relative flex max-h-[65vh] min-h-[320px] w-full items-center justify-center bg-[#0D0D0D]">
              {isVideo && item.videoSrc ? (
                <video
                  key={item.videoSrc}
                  src={item.videoSrc}
                  poster={item.thumbnailSrc || undefined}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[65vh] w-full object-contain"
                />
              ) : (
                <img
                  src={item.thumbnailSrc}
                  alt={`${item.title} design showcase`}
                  referrerPolicy="no-referrer"
                  className="max-h-[65vh] w-full object-contain"
                />
              )}
            </div>

            {/* Project Narrative & Deliverables */}
            <div className="grid gap-6 bg-[#141414] px-5 py-6 sm:grid-cols-3 sm:px-7">
              <div className="sm:col-span-2">
                <p className="text-xs font-bold tracking-wide text-[#2DD4BF]">About This Project</p>
                <p className="mt-2 text-sm leading-relaxed text-[#EFE6D5]/85 sm:text-base">
                  {item.summary}
                </p>
              </div>
              <div className="border-t border-[#EFE6D5]/10 pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
                <p className="text-xs font-bold tracking-wide text-[#2DD4BF]">Deliverables</p>
                <p className="mt-2 text-sm leading-relaxed text-[#EFE6D5]/85">
                  {item.deliverables.join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
