'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { LinkedInIcon } from './icons/BrandIcons';

const revealVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ease: [0.16, 1, 0.3, 1] as any,
    },
  },
};

const FORM_ENDPOINT = 'https://formspree.io/f/mojzpnpe';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});

  function validate(formData: FormData): Errors {
    const next: Errors = {};
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    if (!name) next.name = 'Please enter your name.';
    else if (name.length < 2) next.name = 'Name must be at least 2 characters.';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) next.email = 'Please enter your email address.';
    else if (!emailRegex.test(email)) next.email = 'Please enter a valid email address.';

    if (!message) next.message = 'Please write a message.';
    else if (message.length < 10) next.message = 'Message must be at least 10 characters.';

    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('submitting');

    try {
      if (FORM_ENDPOINT.includes('mojzpnpe')) {
        // Placeholder endpoint — replace with your own Formspree ID before going live.
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setStatus('success');
        form.reset();
      } else {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        });
        if (response.ok) {
          setStatus('success');
          form.reset();
        } else {
          setStatus('error');
        }
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      className="bg-surface py-[var(--space-32)] px-[var(--container-pad)]"
      id="contact"
      aria-labelledby="contactHeading"
    >
      <div className="max-w-[var(--container-max)] mx-auto">
        <motion.div
          className="mb-16 relative pb-6 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-px after:bg-accent after:opacity-60"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          variants={revealVariants}
        >
          <span className="block text-xs font-medium tracking-[0.18em] uppercase text-accent mb-3">
            Say Hello
          </span>
          <h2
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-light text-text"
            id="contactHeading"
          >
            Get in Touch
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-16 md:gap-20 md:items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            variants={revealVariants}
          >
            <p className="text-base text-muted leading-relaxed mb-8">
              Have a project in mind, want to collaborate, or just want to say hi?
              My inbox is always open. I&apos;ll do my best to get back to you promptly.
            </p>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 text-sm text-muted">
                <Mail size={16} className="text-accent flex-shrink-0" />
                <a
                  href="mailto:shahdantrade@gmail.com"
                  className="hover:text-accent transition-colors duration-200"
                >
                  shahdantrade@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted">
                <MapPin size={16} className="text-accent flex-shrink-0" />
                <span>Kuala Lumpur, Malaysia</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted">
                <LinkedInIcon size={16} className="text-accent flex-shrink-0" />
                <a
                  href="https://www.linkedin.com/in/shahdansalleh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors duration-200"
                >
                  linkedin.com/in/shahdansalleh
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.form
            className="flex flex-col gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            variants={revealVariants}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs font-medium tracking-wider uppercase text-muted">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                autoComplete="name"
                className={`w-full px-4 py-3 text-sm rounded-sm bg-surface-2 border text-text placeholder:text-[#4a4745] transition-colors duration-200 focus:outline-none focus:border-accent focus:bg-surface focus:shadow-[0_0_0_3px_var(--color-accent-dim)] ${
                  errors.name ? 'border-[#d96b6b]' : 'border-border'
                }`}
              />
              <span className="text-xs text-[#d96b6b] min-h-[1.2em]" role="alert">
                {errors.name}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-medium tracking-wider uppercase text-muted">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                className={`w-full px-4 py-3 text-sm rounded-sm bg-surface-2 border text-text placeholder:text-[#4a4745] transition-colors duration-200 focus:outline-none focus:border-accent focus:bg-surface focus:shadow-[0_0_0_3px_var(--color-accent-dim)] ${
                  errors.email ? 'border-[#d96b6b]' : 'border-border'
                }`}
              />
              <span className="text-xs text-[#d96b6b] min-h-[1.2em]" role="alert">
                {errors.email}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs font-medium tracking-wider uppercase text-muted">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me about your project..."
                className={`w-full px-4 py-3 text-sm rounded-sm bg-surface-2 border text-text placeholder:text-[#4a4745] transition-colors duration-200 resize-y min-h-[140px] focus:outline-none focus:border-accent focus:bg-surface focus:shadow-[0_0_0_3px_var(--color-accent-dim)] ${
                  errors.message ? 'border-[#d96b6b]' : 'border-border'
                }`}
              />
              <span className="text-xs text-[#d96b6b] min-h-[1.2em]" role="alert">
                {errors.message}
              </span>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex items-center justify-center gap-2 w-full px-7 py-3 text-sm font-medium tracking-wide rounded-sm bg-accent text-bg border border-accent transition-all duration-200 hover:-translate-y-px hover:bg-[#d4b47a] hover:border-[#d4b47a] hover:shadow-[0_4px_20px_rgba(201,169,110,0.25)] disabled:opacity-70 disabled:pointer-events-none"
            >
              {status === 'submitting' ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                'Send Message'
              )}
            </button>

            {status === 'success' && (
              <div className="flex items-start gap-3 px-5 py-4 rounded-sm text-sm bg-[rgba(100,180,130,0.1)] border border-[rgba(100,180,130,0.3)] text-[#7eca9c]">
                <CheckCircle2 size={18} className="flex-shrink-0 mt-0.5" />
                <p>Message sent! I&apos;ll be in touch soon.</p>
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-start gap-3 px-5 py-4 rounded-sm text-sm bg-[rgba(217,107,107,0.1)] border border-[rgba(217,107,107,0.3)] text-[#d96b6b]">
                <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                <p>
                  Something went wrong. Please email me directly at{' '}
                  <a href="mailto:shahdantrade@gmail.com" className="underline">
                    shahdantrade@gmail.com
                  </a>
                  .
                </p>
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
