export interface PersonalProject {
  title: string;
  tagline: string;
  desc: string;
  status: string;
  tags: string[];
  github: string | null;
  live: string | null;
}

export const PERSONAL_PROJECTS: PersonalProject[] = [
  {
    title: "The Retrieval Ledger",
    tagline: "Is RAG an efficiency argument?",
    desc: "A falsifiable investigation into whether Retrieval-Augmented Generation is an economic bet — trading parameters for I/O, memorisation for lookup — and under what conditions that bet stops paying. Currently live as a pre-registration site: the thesis, hypotheses, measurement protocol, and full cost ledger, published before the instrumentation run so results can't be quietly reshaped to fit.",
    status: "Pre-registered · Research in progress",
    tags: ["Next.js", "TypeScript", "Hand-written SVG", "Static Export"],
    github: null,
    live: "https://shahdantrader.github.io/QL-lab-002/",
  },
];
