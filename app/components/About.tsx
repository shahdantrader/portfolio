'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';
import { SKILLS } from '@/data/skills';
import { EXPERIENCE } from '@/data/experience';

const DURATION = 0.6;

const revealVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0,
    },
  },
};

export default function About() {
  return (
    <section
      className="bg-surface py-[var(--space-32)] px-[var(--container-pad)]"
      id="about"
      aria-labelledby="aboutHeading"
    >
      <div className="max-w-[var(--container-max)] mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16 relative pb-6 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-px after:bg-accent after:opacity-60"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          variants={revealVariants}
        >
          <span className="block text-xs font-medium tracking-[0.18em] uppercase text-accent mb-3">
            Background
          </span>
          <h2
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-light text-text"
            id="aboutHeading"
          >
            About Me
          </h2>
        </motion.div>

        {/* Bio + Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20 md:gap-20">
          {/* Bio */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            variants={revealVariants}
            className="space-y-6"
          >
            <p className="text-muted text-base leading-relaxed">
              I'm a Technical Team Lead based in Kuala Lumpur with 8+ years of
              experience delivering enterprise web and mobile systems across
              government, fintech, and business sectors. I've led full SDLC
              lifecycles — from system architecture and development through to
              deployment, production support, and security governance.
            </p>
            <p className="text-muted text-base leading-relaxed">
              My core strength lies at the intersection of deep technical
              execution and cross-functional leadership. I've managed
              mission-critical government financial systems, handled 16,000+
              support tickets under SLA, and built Oracle database architectures
              processing multi-million record datasets with zero data loss. My
              stack spans Java, PL/SQL, Oracle, React, and beyond.
            </p>
            <p className="text-muted text-base leading-relaxed">
              I hold certifications in Power BI, Cybersecurity Fundamentals,
              Business Analysis with AI, Scrum, and Kanban. Whether I'm leading
              an incident triage call or designing a database refresh cycle, I
              care about systems that are stable, secure, and built to last.
            </p>
            <Link
              href="https://github.com/shahdantrader"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent font-medium hover:bg-accent hover:text-bg transition-colors duration-200"
            >
              <Code size={16} />
              View GitHub
            </Link>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            variants={revealVariants}
          >
            <h3 className="font-body text-xs font-medium tracking-[0.18em] uppercase text-accent mb-8">
              Technologies
            </h3>
            <div className="space-y-6">
              {SKILLS.map((group, idx) => (
                <motion.div
                  key={idx}
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '0px 0px -80px 0px' }}
                >
                  <p className="text-sm text-muted mb-3 font-normal">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.tags.map((tag, tidx) => (
                      <motion.span
                        key={tidx}
                        className="text-xs px-3 py-1.5 border border-border text-muted hover:border-accent hover:text-accent transition-colors duration-200 rounded-sm tracking-wider"
                        variants={revealVariants}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Experience Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          variants={revealVariants}
        >
          <h3 className="font-body text-xs font-medium tracking-[0.18em] uppercase text-accent mb-8 pb-4 border-t border-border pt-4">
            Experience
          </h3>
          <div className="flex flex-col">
            {EXPERIENCE.map((job, idx) => (
              <motion.div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-8 py-8 border-b border-border relative sm:pl-0 pl-6 hover:bg-opacity-5 hover:bg-accent transition-colors duration-200"
                style={{
                  position: 'relative',
                  paddingInlineStart: 'var(--space-6)',
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '0px 0px -80px 0px' }}
                variants={revealVariants}
              >
                {/* Timeline line (mobile only) */}
                <div
                  className="sm:hidden absolute left-0 top-0 bottom-0 w-0.5 bg-border"
                  style={{
                    transition: 'background var(--duration-base)',
                  }}
                  aria-hidden="true"
                />

                {/* Meta */}
                <div className="sm:pl-0">
                  <p className="text-xs text-accent tracking-wider mb-1">
                    {job.period}
                  </p>
                  <p className="text-sm text-muted">{job.company}</p>
                </div>

                {/* Body */}
                <div>
                  <h4 className="font-display text-2xl font-normal text-text mb-3 leading-tight">
                    {job.role}
                  </h4>
                  <p className="text-sm text-muted leading-relaxed">
                    {job.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
