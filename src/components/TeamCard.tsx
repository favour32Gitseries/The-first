import { motion } from 'motion/react';
import type { TeamMember } from '../data/media';
import { MediaFrame } from './MediaFrame';

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

/**
 * Playful team member card on warm Beige surface with hover tilt,
 * turquoise accent frame reveal, and clean unboxed typography.
 */
export function TeamCard({ member, index }: TeamCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-[#EFE6D5] p-5 text-[#0D0D0D]"
    >
      {/* Square Portrait Photo */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#0D0D0D]">
        <MediaFrame
          src={member.photoSrc}
          alt={`${member.name}, ${member.role} at Nhenye Visuals`}
          fallbackTitle={member.name}
          className={`${member.photoPosition || 'object-center'} transition-transform duration-500 ease-out group-hover:scale-105`}
        />

        {/* Playful Corner Studio Stamp on Hover */}
        <div
          aria-hidden="true"
          className="absolute bottom-3 left-3 translate-y-2 rounded-full bg-[#2DD4BF] px-3.5 py-1 font-display text-xs font-bold text-[#0D0D0D] opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
        >
          {member.accentNote}
        </div>
      </div>

      {/* Member Info */}
      <div className="mt-5 flex flex-1 flex-col justify-between">
        <div>
          <h3 className="font-display text-2xl font-bold tracking-tight text-[#0D0D0D]">
            {member.name}
          </h3>
          <p className="mt-1 text-sm font-bold text-[#0F766E]">{member.role}</p>
          <p className="mt-3 text-sm leading-relaxed text-[#0D0D0D]/80">{member.bio}</p>
        </div>

        <p className="mt-4 border-t border-[#0D0D0D]/12 pt-3 text-xs font-medium text-[#0D0D0D]/65">
          {member.discipline}
        </p>
      </div>
    </motion.article>
  );
}
