import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT_INFO } from '../data/media';
import { BookingForm } from './BookingForm';

/**
 * Beige-canvas Booking & Contact section pairing studio contact details
 * and social links alongside the interactive BookingForm.
 */
export function BookingSection() {
  return (
    <section
      id="booking"
      aria-labelledby="booking-heading"
      className="bg-[#EFE6D5] py-20 text-[#0D0D0D] sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Contact Details & Social Links */}
          <div className="lg:col-span-5">
            <p className="text-sm font-bold tracking-wide text-[#0F766E]">Book &amp; Collaborate</p>
            <h2
              id="booking-heading"
              className="mt-2 font-display text-4xl font-extrabold tracking-tight text-[#0D0D0D] sm:text-5xl [text-wrap:balance]"
            >
              Let&apos;s make something impossible to ignore.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#0D0D0D]/80">
              Whether you&apos;re launching a product film, booking an editorial portrait session, or reimagining your brand identity, send us a brief and we&apos;ll map out the production.
            </p>

            {/* Studio Contact List */}
            <dl className="mt-10 space-y-5 border-t border-[#0D0D0D]/15 pt-8 text-sm">
              <div className="flex items-start gap-3.5">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#0F766E]" aria-hidden="true" />
                <div>
                  <dt className="font-bold text-[#0D0D0D]">Email</dt>
                  <dd className="mt-0.5">
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-[#0D0D0D]/80 underline decoration-[#0D0D0D]/25 underline-offset-4 transition-colors hover:text-[#0F766E]"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#0F766E]" aria-hidden="true" />
                <div>
                  <dt className="font-bold text-[#0D0D0D]">Studio Line</dt>
                  <dd className="mt-0.5 font-mono text-[#0D0D0D]/80 tabular-nums">
                    <a
                      href={`tel:${CONTACT_INFO.phone.replace(/[^+\d]/g, '')}`}
                      className="transition-colors hover:text-[#0F766E]"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#0F766E]" aria-hidden="true" />
                <div>
                  <dt className="font-bold text-[#0D0D0D]">Studio Address</dt>
                  <dd className="mt-0.5 text-[#0D0D0D]/80">{CONTACT_INFO.location}</dd>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#0F766E]" aria-hidden="true" />
                <div>
                  <dt className="font-bold text-[#0D0D0D]">Production Hours</dt>
                  <dd className="mt-0.5 text-[#0D0D0D]/80">{CONTACT_INFO.hours}</dd>
                </div>
              </div>
            </dl>

            {/* Social Media Links */}
            <div className="mt-9 border-t border-[#0D0D0D]/15 pt-7">
              <p className="text-xs font-bold tracking-wide text-[#0D0D0D]/65">Follow the Studio</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {CONTACT_INFO.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-[#0D0D0D]/20 bg-[#E3D5BE] px-4 py-2 text-sm font-bold text-[#0D0D0D] transition-colors hover:border-[#0D0D0D] hover:bg-[#2DD4BF]"
                  >
                    <span>{social.name}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-7">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
