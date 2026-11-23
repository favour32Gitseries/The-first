import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Play } from 'lucide-react';
import { PORTFOLIO_ITEMS, type PortfolioCategory, type PortfolioItem } from '../data/media';
import { MediaFrame } from './MediaFrame';

type FilterTab = 'all' | PortfolioCategory;

interface PortfolioGridProps {
  onSelectProject: (item: PortfolioItem) => void;
}

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'video', label: 'Video' },
  { id: 'design', label: 'Design' },
];

/**
 * Beige-canvas responsive masonry portfolio grid reserved for Nhenye Visuals'
 * videography and graphic design projects, with hover video previews and per-tile descriptions.
 */
export function PortfolioGrid({ onSelectProject }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredItems =
    activeFilter === 'all'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="bg-[#EFE6D5] py-20 text-[#0D0D0D] sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header + Filter Tabs */}
        <div className="flex flex-col justify-between gap-8 pb-12 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-wide text-[#0F766E]">Selected Works</p>
            <h2
              id="portfolio-heading"
              className="mt-2 font-display text-4xl font-extrabold tracking-tight text-[#0D0D0D] sm:text-5xl [text-wrap:balance]"
            >
              Stories built to stop the scroll.
            </h2>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter portfolio by medium"
            className="inline-flex w-fit flex-wrap items-center gap-1.5 rounded-full bg-[#E3D5BE] p-1.5"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative min-h-[40px] rounded-full px-5 py-2 font-display text-sm font-bold whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    isActive
                      ? 'text-[#EFE6D5]'
                      : 'text-[#0D0D0D]/80 hover:text-[#0D0D0D]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nv-portfolio-tab"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-[#0D0D0D]"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Masonry Grid */}
        <div className="columns-1 gap-7 space-y-7 sm:columns-2 lg:columns-3">
          {filteredItems.map((item, idx) => {
            const isVideo = item.category === 'video';
            const isHovered = hoveredId === item.id;

            return (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.25) }}
                className="break-inside-avoid"
              >
                <button
                  type="button"
                  onClick={() => onSelectProject(item)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(item.id)}
                  onBlur={() => setHoveredId(null)}
                  data-cursor-label={isVideo ? 'Play' : 'View'}
                  aria-label={`Open ${item.title} (${item.categoryLabel} for ${item.client})`}
                  className="group block w-full text-left focus-visible:rounded-3xl"
                >
                  {/* Visual Media Container */}
                  <div
                    className={`relative overflow-hidden rounded-3xl bg-[#0D0D0D] ${item.aspectClass}`}
                  >
                    <MediaFrame
                      src={item.thumbnailSrc}
                      alt={`${item.title} — ${item.categoryLabel} project for ${item.client}`}
                      videoSrc={item.videoSrc}
                      previewStartTime={item.previewStartTime}
                      isPlaying={isVideo && isHovered}
                      isVideoItem={isVideo}
                      fallbackTitle={item.title}
                    />

                    {/* Subtle Gradient Scrim on Hover */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-[#0D0D0D]/15 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      aria-hidden="true"
                    />

                    {/* Play / Inspect Floating Circle Affordance */}
                    <div
                      className={`absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200 ${
                        isHovered
                          ? 'scale-100 bg-[#2DD4BF] text-[#0D0D0D]'
                          : 'scale-90 bg-[#0D0D0D]/75 text-[#EFE6D5]'
                      }`}
                      aria-hidden="true"
                    >
                      {isVideo ? (
                        <Play className="h-4 w-4 fill-current translate-x-[1px]" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5" />
                      )}
                    </div>

                    {/* Hover Preview Prompt for Videos */}
                    {isVideo && (
                      <div
                        className={`pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 font-mono text-xs text-[#EFE6D5] transition-opacity duration-200 ${
                          isHovered ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <span className="h-2 w-2 rounded-full bg-[#2DD4BF]" />
                        <span>Playing Preview · {item.durationLabel || 'HD'}</span>
                      </div>
                    )}
                  </div>

                  {/* Clean Unboxed Metadata, Title & Content About */}
                  <div className="mt-4 px-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-xl font-bold tracking-tight text-[#0D0D0D] transition-colors duration-150 group-hover:text-[#0F766E]">
                          {item.title}
                        </h3>
                        <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-[#0D0D0D]/70">
                          <span className="font-medium text-[#0D0D0D]">{item.categoryLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span>{item.client}</span>
                        </p>
                      </div>
                      <span className="font-mono text-xs font-medium text-[#0D0D0D]/60 tabular-nums pt-1">
                        {item.year}
                      </span>
                    </div>

                    <p className="mt-2.5 text-sm leading-relaxed text-[#0D0D0D]/80">
                      {item.summary}
                    </p>
                  </div>
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
