'use client';

import { motion } from 'framer-motion';
import { Folder, ExternalLink } from 'lucide-react';
import { PROJECTS } from '@/data/projects';
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

export default function Projects() {
  return (
    <section
      className="bg-bg py-[var(--space-32)] px-[var(--container-pad)]"
      id="projects"
      aria-labelledby="projectsHeading"
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
            Selected Work
          </span>
          <h2
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-light text-text"
            id="projectsHeading"
          >
            Projects
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 min-[600px]:grid-cols-2 min-[900px]:grid-cols-3 gap-4">
          {PROJECTS.map((project, idx) => (
            <motion.article
              key={project.title}
              className="group relative flex flex-col overflow-hidden rounded bg-surface border border-border p-8 transition-all duration-[350ms] hover:-translate-y-[3px] hover:border-[rgba(201,169,110,0.25)]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -80px 0px' }}
              variants={revealVariants}
              transition={{
                duration: 0.6,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ease: [0.16, 1, 0.3, 1] as any,
                delay: (idx % 3) * 0.06,
              }}
              aria-label={project.title}
            >
              <span
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-[350ms] group-hover:scale-x-100"
                aria-hidden="true"
              />

              <div className="flex items-start justify-between mb-4">
                <div className="text-accent">
                  <Folder size={22} />
                </div>
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-accent hover:-translate-y-px transition-all duration-200"
                      aria-label="View source on GitHub"
                      title="GitHub"
                    >
                      <GitHubIcon size={18} />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-accent hover:-translate-y-px transition-all duration-200"
                      aria-label="View live demo"
                      title="Live demo"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="font-display text-2xl font-normal text-text mb-3 leading-tight">
                {project.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed flex-1 mb-6">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-sm bg-accent-dim text-accent font-medium tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
