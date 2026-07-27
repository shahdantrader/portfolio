export interface Certificate {
  name: string;
  issuer: string;
  year: string;
  icon: string;
  url: string | null;
}

export const CERTIFICATES: Certificate[] = [
  {
    name: "Power BI Certificate: Mastering Data Skills",
    issuer: "Microsoft / Power BI",
    year: "2024",
    icon: "bar-chart-2",
    url: null,
  },
  {
    name: "ISC2 Cybersecurity Fundamentals",
    issuer: "ISC2",
    year: "2024",
    icon: "shield-check",
    url: null,
  },
  {
    name: "Business Analysis Fundamentals with AI",
    issuer: "Business Analysis Institute",
    year: "2024",
    icon: "brain-circuit",
    url: null,
  },
  {
    name: "Scrum Fundamentals Certified (SFC)",
    issuer: "SCRUMstudy",
    year: "2023",
    icon: "layers",
    url: null,
  },
  {
    name: "Kanban Essentials with AI",
    issuer: "Kanban University",
    year: "2024",
    icon: "kanban",
    url: null,
  },
];
