'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowDown } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './icons/BrandIcons';

const DURATION = 0.6;

const revealVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ease: [0.16, 1, 0.3, 1] as any,
      delay,
    },
  }),
};

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-start px-[var(--container-pad)] pt-[var(--nav-h)] overflow-hidden"
      id="hero"
      aria-labelledby="heroHeading"
    >
      {/* Watermark: large decorative initials */}
      <div
        className="absolute top-1/2 -right-[2%] -translate-y-[55%] font-display text-[clamp(12rem,30vw,22rem)] font-light tracking-tight text-transparent pointer-events-none user-select-none"
        style={{
          WebkitTextStroke: '1px rgba(201, 169, 110, 0.06)',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
        aria-hidden="true"
      >
        KS
      </div>

      {/* Content */}
      <div className="max-w-[var(--container-max)] w-full mx-auto relative z-10">
        {/* Eyebrow */}
        <motion.p
          className="text-sm tracking-[0.18em] uppercase text-accent mb-4"
          custom={0}
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          className="font-display text-[clamp(3.75rem,10vw,9rem)] font-light leading-tight text-text mb-6"
          id="heroHeading"
          custom={0.1}
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        >
          Khairul
          <br />
          <em className="italic text-accent">Shahdan</em>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-[clamp(1rem,2vw,1.25rem)] text-muted font-light leading-relaxed max-w-[520px] mb-10"
          custom={0.18}
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        >
          Technical Team Lead · 8+ years building enterprise{' '}
          <br className="hidden md:inline" /> systems for government, fintech
          &amp; beyond.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap gap-4 mb-12"
          custom={0.26}
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        >
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 px-7 py-3 text-sm font-medium tracking-wide rounded-sm bg-accent text-bg border border-accent transition-all duration-200 hover:-translate-y-px hover:bg-[#d4b47a] hover:border-[#d4b47a] hover:shadow-[0_4px_20px_rgba(201,169,110,0.25)]"
          >
            View My Work
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3 text-sm font-medium tracking-wide rounded-sm bg-transparent text-text border border-border transition-all duration-200 hover:-translate-y-px hover:border-accent hover:text-accent"
          >
            Get in Touch
          </Link>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex gap-5"
          custom={0.34}
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        >
          <a
            href="https://github.com/shahdantrader"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-all duration-200 hover:-translate-y-0.5"
            aria-label="GitHub"
          >
            <GitHubIcon size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/shahdansalleh/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-all duration-200 hover:-translate-y-0.5"
            aria-label="LinkedIn"
          >
            <LinkedInIcon size={20} />
          </a>
          <a
            href="mailto:shahdantrade@gmail.com"
            className="text-muted hover:text-accent transition-all duration-200 hover:-translate-y-0.5"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted hover:text-accent transition-colors duration-200 animate-bounce"
        aria-label="Scroll to About section"
      >
        <ArrowDown size={20} />
      </a>
    </section>
  );
}
