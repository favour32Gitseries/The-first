import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { BRAND_LOGO_SRC, CONTACT_INFO } from '../data/media';

/**
 * Grounded Black footer with Nhenye Visuals logo, tagline,
 * navigation links, social links, and clean copyright notice.
 */
export function Footer() {
  return (
    <footer className="border-t border-[#EFE6D5]/12 bg-[#0D0D0D] py-14 text-[#EFE6D5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Nhenye Visuals home"
              className="inline-block transition-opacity hover:opacity-85"
            >
              <img
                src={BRAND_LOGO_SRC}
                alt="Nhenye Visuals"
                className="h-20 w-auto object-contain object-left invert mix-blend-screen sm:h-24"
              />
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#EFE6D5]/75">
              Capturing stories. Amplifying brands. A media and publicity house crafting videography and graphic design.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-bold tracking-wide text-[#2DD4BF]">Navigation</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-[#EFE6D5]/80 transition-colors hover:text-[#2DD4BF]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/work" className="text-[#EFE6D5]/80 transition-colors hover:text-[#2DD4BF]">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#EFE6D5]/80 transition-colors hover:text-[#2DD4BF]">
                  About &amp; Team
                </Link>
              </li>
              <li>
                <Link to="/book" className="text-[#EFE6D5]/80 transition-colors hover:text-[#2DD4BF]">
                  Book a Shoot
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-bold tracking-wide text-[#2DD4BF]">Connect</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CONTACT_INFO.socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#EFE6D5]/80 transition-colors hover:text-[#2DD4BF]"
                  >
                    <span>{social.name}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[#EFE6D5]/12 pt-7 text-xs text-[#EFE6D5]/60 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Nhenye Visuals. All rights reserved.</p>
          <p>{CONTACT_INFO.email}</p>
        </div>
      </div>
    </footer>
  );
}
