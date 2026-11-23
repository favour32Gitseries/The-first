import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CalendarCheck2, Check, Send } from 'lucide-react';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  serviceType: 'Videography' | 'Graphic Design' | 'Videography & Graphic Design';
  preferredDate: string;
  budgetRange: string;
  projectDetails: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_VALUES: FormValues = {
  name: '',
  email: '',
  phone: '',
  serviceType: 'Videography',
  preferredDate: '',
  budgetRange: '$3,000 – $7,500',
  projectDetails: '',
};

const BUDGET_OPTIONS = [
  '$1,500 – $3,000',
  '$3,000 – $7,500',
  '$7,500 – $15,000',
  '$15,000+',
];

function getTodayLocalDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Validated booking & project inquiry form with accessible inline error states,
 * strict future-only date enforcement, and a playful animated confirmation screen.
 */
export function BookingForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);
  const todayStr = getTodayLocalDateString();

  const validate = (data: FormValues): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!data.name.trim() || data.name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    const digitsOnly = data.phone.replace(/\D/g, '');
    if (digitsOnly.length < 7) {
      nextErrors.phone = 'Please provide a valid phone number.';
    }

    if (!data.preferredDate) {
      nextErrors.preferredDate = 'Select today or an upcoming date for your appointment.';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(data.preferredDate) || data.preferredDate < todayStr) {
      nextErrors.preferredDate = 'Past dates are not allowed. Please choose today or a future date.';
    }

    if (!data.projectDetails.trim() || data.projectDetails.trim().length < 15) {
      nextErrors.projectDetails = 'Tell us a little more about your vision (at least 15 characters).';
    }

    return nextErrors;
  };

  const handleChange = <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleDateChange = (rawValue: string) => {
    // Allow clearing the field
    if (!rawValue) {
      handleChange('preferredDate', '');
      return;
    }

    // Reject any keyed-in or selected past date immediately
    if (/^\d{4}-\d{2}-\d{2}$/.test(rawValue) && rawValue < todayStr) {
      setValues((prev) => ({ ...prev, preferredDate: '' }));
      setErrors((prev) => ({
        ...prev,
        preferredDate: 'Past dates are not allowed. Please choose today or a future date.',
      }));
      return;
    }

    handleChange('preferredDate', rawValue);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmittedData(values);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setValues(INITIAL_VALUES);
    setErrors({});
  };

  const inputBaseClass =
    'w-full rounded-2xl border bg-[#161616] px-4 py-3 text-sm text-[#EFE6D5] placeholder-[#EFE6D5]/40 transition-colors focus:border-[#2DD4BF] focus:outline-none';

  return (
    <div className="rounded-3xl bg-[#0D0D0D] p-6 text-[#EFE6D5] sm:p-8 lg:p-10">
      <AnimatePresence mode="wait">
        {submittedData ? (
          <motion.div
            key="booking-success"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center py-8 text-center"
          >
            {/* Animated Turquoise Celebration Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.08 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-[#2DD4BF] text-[#0D0D0D]"
            >
              <Check className="h-10 w-10 stroke-[3]" aria-hidden="true" />
            </motion.div>

            <h3 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-[#EFE6D5]">
              Shoot brief locked in!
            </h3>
            <p className="mt-3 max-w-md text-base leading-relaxed text-[#EFE6D5]/80">
              Thanks, <span className="font-bold text-[#2DD4BF]">{submittedData.name}</span>. Our producer is reviewing your{' '}
              <span className="font-semibold text-[#EFE6D5]">{submittedData.serviceType}</span> inquiry and will reply to{' '}
              <span className="underline decoration-[#2DD4BF]/60 underline-offset-4">{submittedData.email}</span> within one business day.
            </p>

            <div className="mt-7 w-full max-w-md rounded-2xl border border-[#EFE6D5]/15 bg-[#161616] p-4 text-left text-xs text-[#EFE6D5]/80">
              <div className="flex items-center gap-2 font-bold text-[#2DD4BF]">
                <CalendarCheck2 className="h-4 w-4" aria-hidden="true" />
                <span>Brief Summary</span>
              </div>
              <p className="mt-2">
                {submittedData.serviceType} · Target {submittedData.preferredDate} · {submittedData.budgetRange}
              </p>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="mt-8 inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#2DD4BF] px-7 py-3 font-display text-sm font-bold text-[#0D0D0D] transition-colors hover:bg-[#EFE6D5]"
            >
              Send Another Brief
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="booking-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            noValidate
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Name */}
              <div>
                <label htmlFor="nv-name" className="mb-1.5 block text-xs font-bold tracking-wide text-[#EFE6D5]/85">
                  Your Name *
                </label>
                <input
                  id="nv-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jordan Vance"
                  value={values.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'nv-name-error' : undefined}
                  className={`${inputBaseClass} ${
                    errors.name ? 'border-[#FB7185]' : 'border-[#EFE6D5]/15'
                  }`}
                />
                {errors.name && (
                  <p id="nv-name-error" role="alert" className="mt-1.5 text-xs font-medium text-[#FDA4AF]">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="nv-email" className="mb-1.5 block text-xs font-bold tracking-wide text-[#EFE6D5]/85">
                  Email Address *
                </label>
                <input
                  id="nv-email"
                  type="email"
                  autoComplete="email"
                  placeholder="jordan@brand.com"
                  value={values.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'nv-email-error' : undefined}
                  className={`${inputBaseClass} ${
                    errors.email ? 'border-[#FB7185]' : 'border-[#EFE6D5]/15'
                  }`}
                />
                {errors.email && (
                  <p id="nv-email-error" role="alert" className="mt-1.5 text-xs font-medium text-[#FDA4AF]">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Phone */}
              <div>
                <label htmlFor="nv-phone" className="mb-1.5 block text-xs font-bold tracking-wide text-[#EFE6D5]/85">
                  Phone Number *
                </label>
                <input
                  id="nv-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+1 (404) 555-0192"
                  value={values.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'nv-phone-error' : undefined}
                  className={`${inputBaseClass} ${
                    errors.phone ? 'border-[#FB7185]' : 'border-[#EFE6D5]/15'
                  }`}
                />
                {errors.phone && (
                  <p id="nv-phone-error" role="alert" className="mt-1.5 text-xs font-medium text-[#FDA4AF]">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Service Type */}
              <div>
                <label htmlFor="nv-service" className="mb-1.5 block text-xs font-bold tracking-wide text-[#EFE6D5]/85">
                  Service Type *
                </label>
                <select
                  id="nv-service"
                  value={values.serviceType}
                  onChange={(e) =>
                    handleChange('serviceType', e.target.value as FormValues['serviceType'])
                  }
                  className={`${inputBaseClass} border-[#EFE6D5]/15`}
                >
                  <option value="Videography">Videography</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Videography & Graphic Design">Videography &amp; Graphic Design</option>
                </select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Preferred Date */}
              <div>
                <label htmlFor="nv-date" className="mb-1.5 block text-xs font-bold tracking-wide text-[#EFE6D5]/85">
                  Preferred Date *
                </label>
                <input
                  id="nv-date"
                  type="date"
                  min={todayStr}
                  value={values.preferredDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  onBlur={(e) => {
                    if (e.target.value && e.target.value < todayStr) {
                      handleDateChange(e.target.value);
                    }
                  }}
                  aria-invalid={Boolean(errors.preferredDate)}
                  aria-describedby={errors.preferredDate ? 'nv-date-error' : undefined}
                  className={`${inputBaseClass} [color-scheme:dark] ${
                    errors.preferredDate ? 'border-[#FB7185]' : 'border-[#EFE6D5]/15'
                  }`}
                />
                {errors.preferredDate && (
                  <p id="nv-date-error" role="alert" className="mt-1.5 text-xs font-medium text-[#FDA4AF]">
                    {errors.preferredDate}
                  </p>
                )}
              </div>

              {/* Budget Range */}
              <div>
                <label htmlFor="nv-budget" className="mb-1.5 block text-xs font-bold tracking-wide text-[#EFE6D5]/85">
                  Budget Range
                </label>
                <select
                  id="nv-budget"
                  value={values.budgetRange}
                  onChange={(e) => handleChange('budgetRange', e.target.value)}
                  className={`${inputBaseClass} border-[#EFE6D5]/15`}
                >
                  {BUDGET_OPTIONS.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Project Details */}
            <div>
              <label htmlFor="nv-details" className="mb-1.5 block text-xs font-bold tracking-wide text-[#EFE6D5]/85">
                Project Details *
              </label>
              <textarea
                id="nv-details"
                rows={4}
                placeholder="Share your campaign goals, creative references, deliverables, or shoot location..."
                value={values.projectDetails}
                onChange={(e) => handleChange('projectDetails', e.target.value)}
                aria-invalid={Boolean(errors.projectDetails)}
                aria-describedby={errors.projectDetails ? 'nv-details-error' : undefined}
                className={`${inputBaseClass} resize-y ${
                  errors.projectDetails ? 'border-[#FB7185]' : 'border-[#EFE6D5]/15'
                }`}
              />
              {errors.projectDetails && (
                <p id="nv-details-error" role="alert" className="mt-1.5 text-xs font-medium text-[#FDA4AF]">
                  {errors.projectDetails}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="group inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-full bg-[#2DD4BF] px-7 py-3.5 font-display text-base font-bold text-[#0D0D0D] transition-all duration-150 hover:bg-[#EFE6D5] active:scale-[0.99]"
            >
              <span>Submit Booking Request</span>
              <Send className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
