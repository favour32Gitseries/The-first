import { motion } from 'motion/react';
import { STUDIO_STATS, TEAM_MEMBERS } from '../data/media';
import { TeamCard } from './TeamCard';

/**
 * Black-canvas About & Team section featuring the Nhenye Visuals origin story,
 * mission statement, tabular studio metrics, and a 3-column TeamCard grid.
 */
export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-[#0D0D0D] py-20 text-[#EFE6D5] sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Story + Mission Split */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-sm font-bold tracking-wide text-[#2DD4BF]">About Nhenye Visuals</p>
            <h2
              id="about-heading"
              className="mt-2 font-display text-4xl font-extrabold tracking-tight text-[#EFE6D5] sm:text-5xl [text-wrap:balance]"
            >
              A creative studio built on rhythm, warmth, and fearless craft.
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-base leading-relaxed text-[#EFE6D5]/85 sm:text-lg">
              Founded as a tight-knit media and publicity house, Nhenye Visuals helps cultural brands, artists, and ambitious founders look unmistakable. Our mission is simple: turn every shoot and design sprint into visual storytelling people genuinely want to share.
            </p>
          </div>
        </div>

        {/* Key Studio Stats Row */}
        <div className="mt-14 grid grid-cols-2 gap-6 border-y border-[#EFE6D5]/15 py-10 lg:grid-cols-4">
          {STUDIO_STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className="flex flex-col"
            >
              <span className="font-display text-4xl font-extrabold tracking-tight text-[#2DD4BF] tabular-nums sm:text-5xl">
                {stat.value}
              </span>
              <span className="mt-2 font-display text-base font-bold text-[#EFE6D5]">
                {stat.label}
              </span>
              <span className="mt-1 text-xs leading-relaxed text-[#EFE6D5]/65">
                {stat.context}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Team Showcase */}
        <div className="mt-16">
          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <h3 className="font-display text-2xl font-extrabold tracking-tight text-[#EFE6D5] sm:text-3xl">
              Meet the crew behind the lens
            </h3>
            <p className="text-sm text-[#EFE6D5]/70">
              Directors, photographers &amp; designers working under one roof.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {TEAM_MEMBERS.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
