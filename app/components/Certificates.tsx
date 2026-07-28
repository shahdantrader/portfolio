'use client';

import { motion } from 'framer-motion';
import {
  BarChart2,
  ShieldCheck,
  BrainCircuit,
  Layers,
  Kanban,
  ExternalLink,
  Award,
  type LucideIcon,
} from 'lucide-react';
import { CERTIFICATES } from '@/data/certificates';

const ICON_MAP: Record<string, LucideIcon> = {
  'bar-chart-2': BarChart2,
  'shield-check': ShieldCheck,
  'brain-circuit': BrainCircuit,
  layers: Layers,
  kanban: Kanban,
};

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

export default function Certificates() {
  return (
    <section
      className="bg-bg py-[var(--space-32)] px-[var(--container-pad)]"
      id="certificates"
      aria-labelledby="certificatesHeading"
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
            Credentials
          </span>
          <h2
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-light text-text"
            id="certificatesHeading"
          >
            Certifications
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 min-[520px]:grid-cols-2 min-[900px]:grid-cols-3 gap-3">
          {CERTIFICATES.map((cert, idx) => {
            const Icon = ICON_MAP[cert.icon] ?? Award;

            const innerContent = (
              <>
                <div className="flex-shrink-0 w-10 h-10 rounded flex items-center justify-center bg-accent-dim text-accent transition-colors duration-200 group-hover:bg-[rgba(201,169,110,0.2)]">
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text font-medium leading-snug mb-1">
                    {cert.name}
                  </p>
                  <p className="text-xs text-muted tracking-wide">
                    {cert.issuer} &nbsp;·&nbsp; {cert.year}
                  </p>
                </div>
                {cert.url && (
                  <span className="flex-shrink-0 text-muted opacity-0 group-hover:opacity-100 group-hover:text-accent transition-opacity duration-200">
                    <ExternalLink size={14} />
                  </span>
                )}
              </>
            );

            return (
              <motion.div
                key={cert.name}
                className="group relative overflow-hidden rounded border border-border bg-surface transition-all duration-[350ms] hover:-translate-y-0.5 hover:border-[rgba(201,169,110,0.3)]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '0px 0px -80px 0px' }}
                variants={revealVariants}
                transition={{
                  duration: 0.6,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ease: [0.16, 1, 0.3, 1] as any,
                  delay: (idx % 3) * 0.07,
                }}
              >
                <span
                  className="absolute inset-y-0 left-0 w-0.5 origin-bottom scale-y-0 bg-accent transition-transform duration-[350ms] group-hover:scale-y-100"
                  aria-hidden="true"
                />
                {cert.url ? (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 px-6 py-5 relative"
                    aria-label={`Verify ${cert.name}`}
                  >
                    {innerContent}
                  </a>
                ) : (
                  <div className="flex items-center gap-4 px-6 py-5 relative">
                    {innerContent}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
