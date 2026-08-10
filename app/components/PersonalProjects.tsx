'use client';

import { motion } from 'framer-motion';
import { FlaskConical, ExternalLink } from 'lucide-react';
import { PERSONAL_PROJECTS } from '@/data/personal-projects';
import { GitHubIcon } from './icons/BrandIcons';

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

export default function PersonalProjects() {
  return (
    <section
      className="bg-surface py-[var(--space-32)] px-[var(--container-pad)]"
      id="personal-projects"
      aria-labelledby="personalProjectsHeading"
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
            Independent Research
          </span>
          <h2
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-light text-text"
            id="personalProjectsHeading"
          >
            Personal Projects
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {PERSONAL_PROJECTS.map((project, idx) => (
            <motion.article
              key={project.title}
              className="group relative overflow-hidden rounded bg-bg border border-border p-8 md:p-10 transition-all duration-[350ms] hover:border-[rgba(201,169,110,0.25)]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -80px 0px' }}
              variants={revealVariants}
              transition={{
                duration: 0.6,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ease: [0.16, 1, 0.3, 1] as any,
                delay: idx * 0.08,
              }}
              aria-label={project.title}
            >
              <span
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-[350ms] group-hover:scale-x-100"
                aria-hidden="true"
              />

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <FlaskConical size={18} className="text-accent flex-shrink-0" />
                    <span className="text-xs font-medium tracking-wider uppercase text-accent">
                      {project.status}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl font-normal text-text mb-2 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm text-accent mb-4 italic">{project.tagline}</p>
                  <p className="text-sm text-muted leading-relaxed max-w-2xl mb-6">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6 md:mb-0">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-sm bg-accent-dim text-accent font-medium tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-row md:flex-col gap-3 md:w-40 flex-shrink-0">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium tracking-wide rounded-sm bg-accent text-bg border border-accent transition-all duration-200 hover:-translate-y-px hover:bg-[#d4b47a] hover:border-[#d4b47a] hover:shadow-[0_4px_20px_rgba(201,169,110,0.25)]"
                    >
                      <ExternalLink size={14} />
                      Visit Site
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium tracking-wide rounded-sm bg-transparent text-text border border-border transition-all duration-200 hover:-translate-y-px hover:border-accent hover:text-accent"
                    >
                      <GitHubIcon size={14} />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
