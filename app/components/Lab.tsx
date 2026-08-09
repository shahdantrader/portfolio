'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Scale, TrendingDown, Repeat } from 'lucide-react';

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

const ACCENT = '#c9a96e';
const MUTED = '#8a8580';
const WIN = '#7fa87f';
const LOSS = '#b56a5a';

/**
 * Deduction 01 — J/CA only punishes a cheaper-but-wronger system above a
 * baseline error rate of one third.
 */
function ThresholdFigure() {
  return (
    <svg
      viewBox="0 0 300 92"
      className="w-full h-auto"
      role="img"
      aria-label="Baseline error rate from 0 to 100 percent. Below one third a cheaper system with double the errors still wins on the metric; above one third it loses."
    >
      <text x="0" y="10" fontSize="8" fill={MUTED} letterSpacing="1.2" fontFamily="Inter, sans-serif">
        BASELINE ERROR RATE
      </text>
      <rect x="0" y="22" width="100" height="12" rx="2" fill={WIN} opacity="0.55" />
      <rect x="100" y="22" width="200" height="12" rx="2" fill={LOSS} opacity="0.5" />
      <motion.line
        x1="100"
        y1="17"
        x2="100"
        y2="39"
        stroke={ACCENT}
        strokeWidth="2"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        style={{ transformOrigin: '100px 28px' }}
      />
      <text x="100" y="52" fontSize="11" fill={ACCENT} textAnchor="middle" fontFamily="Inter, sans-serif">
        ⅓
      </text>
      <text x="0" y="70" fontSize="8" fill={WIN} fontFamily="Inter, sans-serif">
        CHEAP + WRONG STILL WINS
      </text>
      <text x="300" y="70" fontSize="8" fill={LOSS} textAnchor="end" fontFamily="Inter, sans-serif">
        CHEAP + WRONG LOSES
      </text>
      <text x="0" y="86" fontSize="8" fill={MUTED} fontFamily="Inter, sans-serif">0%</text>
      <text x="300" y="86" fontSize="8" fill={MUTED} textAnchor="end" fontFamily="Inter, sans-serif">100%</text>
    </svg>
  );
}

/** Deduction 02 — amortised cost crosses the parametric baseline at V*. */
function BreakEvenFigure() {
  return (
    <svg
      viewBox="0 0 300 92"
      className="w-full h-auto"
      role="img"
      aria-label="An amortisation curve falling as query volume grows, crossing a flat parametric baseline at the break-even volume V star."
    >
      <line x1="18" y1="76" x2="300" y2="76" stroke="rgba(240,237,232,0.12)" />
      <line x1="18" y1="8" x2="18" y2="76" stroke="rgba(240,237,232,0.12)" />
      <line x1="18" y1="46" x2="300" y2="46" stroke={MUTED} strokeWidth="1.5" opacity="0.7" />
      <text x="300" y="40" fontSize="8" fill={MUTED} textAnchor="end" fontFamily="Inter, sans-serif">
        PARAMETRIC BASELINE
      </text>
      <motion.path
        d="M26 10 C 54 12, 82 38, 118 46 C 162 56, 218 62, 300 64"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2.2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.15, ease: 'easeOut' }}
      />
      <line x1="118" y1="8" x2="118" y2="76" stroke="rgba(240,237,232,0.3)" strokeDasharray="3 4" />
      <circle cx="118" cy="46" r="4" fill="#0d0d0d" stroke="#f0ede8" strokeWidth="1.8" />
      <text x="125" y="18" fontSize="10" fill="#f0ede8" fontFamily="Inter, sans-serif">V*</text>
      <text x="18" y="90" fontSize="8" fill={MUTED} fontFamily="Inter, sans-serif">
        CUMULATIVE QUERIES →
      </text>
    </svg>
  );
}

/** Deduction 03 — rebound reverses the saving above unit elasticity. */
function ReboundFigure() {
  return (
    <svg
      viewBox="0 0 300 92"
      className="w-full h-auto"
      role="img"
      aria-label="Two bars comparing total consumption before and after an efficiency gain. Above an elasticity of one, the after bar exceeds the before bar."
    >
      <text x="0" y="10" fontSize="8" fill={MUTED} letterSpacing="1.2" fontFamily="Inter, sans-serif">
        TOTAL CONSUMPTION
      </text>
      <text x="0" y="32" fontSize="8" fill={MUTED} fontFamily="Inter, sans-serif">BEFORE</text>
      <motion.rect
        x="52" y="23" height="11" rx="2" fill={MUTED} opacity="0.5"
        initial={{ width: 0 }} whileInView={{ width: 140 }} viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
      />
      <text x="200" y="32" fontSize="8" fill={MUTED} fontFamily="Inter, sans-serif">1.00×</text>

      <text x="0" y="58" fontSize="8" fill={MUTED} fontFamily="Inter, sans-serif">AFTER</text>
      <motion.rect
        x="52" y="49" height="11" rx="2" fill={LOSS}
        initial={{ width: 0 }} whileInView={{ width: 194 }} viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.35 }}
      />
      <text x="252" y="58" fontSize="8" fill={LOSS} fontFamily="Inter, sans-serif">&gt;1.00×</text>

      <line x1="192" y1="18" x2="192" y2="66" stroke="rgba(240,237,232,0.28)" strokeDasharray="3 3" />
      <text x="0" y="86" fontSize="8" fill={ACCENT} fontFamily="Inter, sans-serif">
        ε &gt; 1 → BACKFIRE, AT ANY SIZE OF GAIN
      </text>
    </svg>
  );
}

const DEDUCTIONS = [
  {
    icon: Scale,
    figure: ThresholdFigure,
    title: 'The metric has a boundary',
    body: 'Joules per Correct Answer punishes cheap-but-wrong systems — but only above a baseline error rate of one third. Below it, the cheaper and wronger system still wins.',
    formula: 'J/CA = E ÷ (correct + abstentions)',
  },
  {
    icon: TrendingDown,
    figure: BreakEvenFigure,
    title: 'The advantage has a price of entry',
    body: 'Ingestion is paid once, in full, before a single query. Amortised, RAG only becomes cheaper above a break-even volume — a property of the deployment, not the architecture.',
    formula: 'V* = I ÷ (E_parametric − E_rag)',
  },
  {
    icon: Repeat,
    figure: ReboundFigure,
    title: 'Above unit elasticity it reverses',
    body: 'Cheaper queries get asked more often. Net consumption scales as f^(1−ε), so it rises whenever elasticity exceeds one — however large the per-query saving was.',
    formula: 'net = f^(1−ε) · backfire ⟺ ε > 1',
  },
];

export default function Lab() {
  return (
    <section
      className="bg-surface py-[var(--space-32)] px-[var(--container-pad)]"
      id="lab"
      aria-labelledby="labHeading"
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
            Research · QL-Lab 002
          </span>
          <h2
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-light text-text"
            id="labHeading"
          >
            The Retrieval Ledger
          </h2>
        </motion.div>

        <motion.div
          className="mb-12 max-w-[62ch]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          variants={revealVariants}
        >
          <p className="text-base text-muted leading-relaxed mb-6">
            An energy-accounting study of retrieval-augmented generation, built on the premise that
            RAG is an economic technique rather than a knowledge one — a bet that looking something
            up is cheaper than knowing it. Three results, each derivable on paper and independent of
            any particular benchmark run.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://shahdantrader.github.io/QL-lab-002/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.1em] uppercase bg-accent text-bg px-5 py-3 rounded-sm hover:-translate-y-px transition-transform duration-200"
            >
              View the study <ExternalLink size={14} />
            </a>
            {['Next.js', 'Energy instrumentation', 'Evaluation design'].map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-sm bg-accent-dim text-accent font-medium tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 min-[900px]:grid-cols-3 gap-4 mb-4">
          {DEDUCTIONS.map((d, idx) => {
            const Icon = d.icon;
            const Figure = d.figure;
            return (
              <motion.article
                key={d.title}
                className="group relative flex flex-col overflow-hidden rounded bg-bg border border-border p-8 transition-all duration-[350ms] hover:-translate-y-[3px] hover:border-[rgba(201,169,110,0.25)]"
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
              >
                <span
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-[350ms] group-hover:scale-x-100"
                  aria-hidden="true"
                />

                <div className="flex items-center justify-between mb-5">
                  <span className="text-accent">
                    <Icon size={20} />
                  </span>
                  <span className="text-xs font-medium tracking-[0.16em] uppercase text-muted">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-normal text-text mb-4 leading-tight">
                  {d.title}
                </h3>

                <div className="mb-5">
                  <Figure />
                </div>

                <p className="text-sm text-muted leading-relaxed flex-1 mb-6">{d.body}</p>

                <code className="block mt-auto text-xs text-text bg-accent-dim border-l-2 border-accent px-3 py-2 rounded-r-sm overflow-x-auto whitespace-nowrap">
                  {d.formula}
                </code>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          className="rounded bg-bg border border-border border-l-2 border-l-accent p-8 min-[900px]:p-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          variants={revealVariants}
        >
          <span className="block text-xs font-medium tracking-[0.18em] uppercase text-accent mb-4">
            Conclusion
          </span>
          <p className="font-display text-[clamp(1.25rem,2.6vw,1.75rem)] font-light text-text leading-snug mb-5 max-w-[46ch]">
            RAG is neither efficient nor inefficient as an architecture. It is a bet with a
            computable break-even, scored by a metric with a stated boundary.
          </p>
          <p className="text-sm text-muted leading-relaxed max-w-[70ch]">
            Which makes the useful output of an efficiency project a set of thresholds rather than a
            headline percentage — the volume above which the index pays for itself, the error rate at
            which cheapness stops being cheap, and the elasticity beyond which saving energy per
            query spends more of it in total.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
