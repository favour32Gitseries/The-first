/**
 * Central media & content data for Nhenye Visuals.
 *
 * Uses uploaded brand assets in `/assets/aistudio/`.
 */

export type PortfolioCategory = 'video' | 'design';

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  categoryLabel: string;
  client: string;
  year: string;
  aspectClass: string;
  thumbnailSrc: string;
  /** Optional real MP4/WebM URL for hover preview & lightbox playback */
  videoSrc?: string;
  /** Timestamp (in seconds) used as the resting preview frame in the grid */
  previewStartTime?: number;
  durationLabel?: string;
  /** Description of the design or video content shown on the tile and lightbox */
  summary: string;
  deliverables: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  discipline: string;
  bio: string;
  photoSrc: string;
  photoPosition?: string;
  accentNote: string;
}

export interface StudioStat {
  value: string;
  label: string;
  context: string;
}

export const BRAND_LOGO_SRC = '/assets/aistudio/logo_8d2d52f6.PNG';

export const HERO_SHOWREEL = {
  videoSrc: '/assets/aistudio/World_infant_day_dc5a1a76.mp4',
  posterSrc: '/assets/aistudio/ORS_day_5d49ed42.jpeg',
  reelFrames: [
    '/assets/aistudio/Eden_a9d455ab.jpeg',
    '/assets/aistudio/faceporite_ef6a5607.jpeg',
    '/assets/aistudio/ORS_day_5d49ed42.jpeg',
  ],
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'sip-and-paint-picnic',
    title: 'ISPOR Sip & Paint Picnic Recap',
    category: 'video',
    categoryLabel: 'Videography',
    client: 'ISPOR-HEOR UNN Chapter',
    year: '2026',
    aspectClass: 'aspect-[3/4]',
    thumbnailSrc: '',
    videoSrc: '/assets/aistudio/sip_and_paint_ce9a962a.mp4',
    previewStartTime: 16,
    durationLabel: '01:12',
    summary:
      'High-energy vertical recap film from ISPOR Health Week 2026 at Cedr Court, UNN—capturing chilled fruit punch pours, Scrabble and dart games, table tennis rallies, balloon relays, live painting, and candid attendee interviews.',
    deliverables: ['Event Recap Reel', 'Color Grade', 'Rhythm Edit & Audio Mix'],
  },
  {
    id: 'eden-hair-place-flyer',
    title: 'Eden Hair Place Service Poster',
    category: 'design',
    categoryLabel: 'Graphic Design',
    client: 'Eden Hair Place',
    year: '2026',
    aspectClass: 'aspect-[4/5]',
    thumbnailSrc: '/assets/aistudio/Eden_a9d455ab.jpeg',
    summary:
      'Bold promotional service flyer for Craigieburn braiding studio Eden Hair Place, spotlighting cornrows, natural hair twists, afro kinky twists, braids, and pre-parting alongside studio contact and social handles.',
    deliverables: ['Promotional Flyer', 'Service Menu Layout', 'Social Launch Card'],
  },
  {
    id: 'world-infant-mental-health-day',
    title: 'World Infant, Child & Adolescent Mental Health Day',
    category: 'video',
    categoryLabel: 'Videography',
    client: 'ISPOR-UNN · IPHAC',
    year: '2026',
    aspectClass: 'aspect-[16/10]',
    thumbnailSrc: '',
    videoSrc: '/assets/aistudio/World_infant_day_dc5a1a76.mp4',
    previewStartTime: 3,
    durationLabel: '00:55',
    summary:
      'On-location and broadcast studio feature filmed at Lion FM 91.1 MHz with IPHAC Chairperson Isp. Isaac Agada and student advocates, spotlighting early mental health intervention for infants, children, and adolescents.',
    deliverables: ['Broadcast Documentary Cut', 'Motion Title Cards', 'Studio Audio Mastering'],
  },
  {
    id: 'faceporite-award-ispor',
    title: 'Faceporite Award — Face of ISPOR',
    category: 'design',
    categoryLabel: 'Graphic Design',
    client: 'ISPOR-HEOR UNN Chapter',
    year: '2026',
    aspectClass: 'aspect-[3/4]',
    thumbnailSrc: '/assets/aistudio/faceporite_ef6a5607.jpeg',
    summary:
      'Vibrant editorial spotlight graphic honoring 400-level Pharmacy student Ukanna, Ifeoma Naomi as Face of ISPOR, pairing bold dimensional display typography with a structured personality Q&A grid.',
    deliverables: ['Award Spotlight Poster', 'Editorial Profile Grid', 'Chapter Social Asset'],
  },
  {
    id: 'world-ors-day-campaign',
    title: 'World ORS Day Campaign Poster',
    category: 'design',
    categoryLabel: 'Graphic Design',
    client: 'ISPOR Public Health (IPHAC)',
    year: '2026',
    aspectClass: 'aspect-[4/5]',
    thumbnailSrc: '/assets/aistudio/ORS_day_5d49ed42.jpeg',
    summary:
      'Clean public health awareness design for World ORS Day (29th July, 2026), uniting custom hydration drop illustration, world map texture, and crisp typography under the theme "ORS: A Simple Solution for a Healthier Future."',
    deliverables: ['Campaign Key Visual', 'Awareness Poster', 'Digital Print Ready'],
  },
];

export const STUDIO_STATS: StudioStat[] = [
  {
    value: '180+',
    label: 'Projects Completed',
    context: 'Campaigns, films & brand systems since 2020',
  },
  {
    value: '74',
    label: 'Happy Clients',
    context: 'Independent labels, founders & global teams',
  },
  {
    value: '6 yrs',
    label: 'Years of Experience',
    context: 'Full-service media & publicity craft',
  },
  {
    value: '12M+',
    label: 'Audience Reach',
    context: 'Organic & paid campaign impressions',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'nenye-azolike',
    name: 'Nenye Azolike',
    role: 'Founder',
    discipline: 'Directing · Brand Strategy',
    bio: 'Leads visual storytelling and commercial directing, turning raw brand ideas into unforgettable motion campaigns.',
    photoSrc: '/assets/aistudio/Founder_24638f31.jpeg',
    photoPosition: 'object-[50%_38%]',
    accentNote: 'Anamorphic obsessed',
  },
  {
    id: 'esther-naya',
    name: 'Esther Naya',
    role: 'Lead Photographer',
    discipline: 'Editorial · Studio Portraiture',
    bio: 'Shapes natural window light and medium-format film grain into warm, human-first imagery for fashion and culture brands.',
    photoSrc: '/assets/aistudio/head_of_photography_a140dde8.jpeg',
    photoPosition: 'object-[50%_36%]',
    accentNote: 'Medium-format purist',
  },
  {
    id: 'favour-nicole',
    name: 'Favour Nicole',
    role: 'Editor-in-Chief',
    discipline: 'Editorial Direction · Publicity Copy',
    bio: 'Guides campaign narratives, editorial voice, and story structure—ensuring every film, feature, and brand release lands with clarity and impact.',
    photoSrc: '/assets/aistudio/Editor-in-chief_302264d1.jpeg',
    photoPosition: 'object-[49%_34%]',
    accentNote: 'Story architect',
  },
];

export const CONTACT_INFO = {
  email: 'azolikesaviour@gmail.com',
  phone: '07026703324',
  location: 'Nsukka, Enugu State, Nigeria',
  hours: 'Mon – Fri · 9:00 AM – 6:30 PM',
  socials: [
    { name: 'Instagram', href: 'https://instagram.com' },
    { name: 'YouTube', href: 'https://youtube.com' },
    { name: 'Behance', href: 'https://behance.net' },
    { name: 'TikTok', href: 'https://tiktok.com' },
  ],
};
