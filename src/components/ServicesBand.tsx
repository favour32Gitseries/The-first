import { motion } from 'motion/react';
import { ArrowRight, Film, PenTool } from 'lucide-react';

interface ServicesBandProps {
  onBookShoot: () => void;
}

const PILLARS = [
  {
    number: '01.',
    title: 'Videography',
    description:
      'Event recaps, awareness documentaries, commercial spots, and kinetic social reels built for retention from the first frame.',
    icon: Film,
  },
  {
    number: '02.',
    title: 'Graphic Design',
    description:
      'Expressive campaign flyers, award spotlight cards, brand identities, and print collateral that hold attention everywhere.',
    icon: PenTool,
  },
];

/**
 * Bold Turquoise call-to-action & discipline band giving balanced
 * color interplay between Black hero, Beige portfolio, and Turquoise highlight block.
 */
export function ServicesBand({ onBookShoot }: ServicesBandProps) {
  return (
    <section
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-[#2DD4BF] py-20 text-[#0D0D0D] sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-wide text-[#0D0D0D]/80">
              Two Core Pillars, One Studio
            </p>
            <h2
              id="services-heading"
              className="mt-2 font-display text-4xl font-extrabold tracking-tight text-[#0D0D0D] sm:text-5xl [text-wrap:balance]"
            >
              From concept board to final campaign drop.
            </h2>
          </div>

          <button
            type="button"
            onClick={onBookShoot}
            className="group inline-flex min-h-[48px] w-fit items-center gap-2.5 rounded-full bg-[#0D0D0D] px-7 py-3.5 font-display text-base font-bold text-[#EFE6D5] whitespace-nowrap shrink-0 transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#EFE6D5] hover:text-[#0D0D0D]"
          >
            <span>Book a Shoot</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-150 group-hover:translate-x-1" />
          </button>
        </div>

        {/* 2-Column Service Pillars */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group flex flex-col justify-between rounded-3xl bg-[#0D0D0D] p-8 text-[#EFE6D5] transition-transform duration-200 hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-medium text-[#2DD4BF]">
                      {pillar.number}
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EFE6D5]/10 text-[#2DD4BF] transition-colors duration-150 group-hover:bg-[#2DD4BF] group-hover:text-[#0D0D0D]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>

                  <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-[#EFE6D5]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#EFE6D5]/80 sm:text-base">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
