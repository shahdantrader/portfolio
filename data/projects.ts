export interface Project {
  title: string;
  desc: string;
  tags: string[];
  github: string | null;
  live: string | null;
  featured: boolean;
}

export const PROJECTS: Project[] = [
  {
    title: "Government Financial System — Core Platform",
    desc: "Technical lead for a nationwide mission-critical government financial system. Oversaw Change Requests, release approvals, and structured deployments across Dev, Staging, DR, and Production environments.",
    tags: ["Java", "PL/SQL", "Oracle 12c", "Spring MVC", "WebLogic 12c"],
    github: null,
    live: null,
    featured: true,
  },
  {
    title: "Oracle DB Architecture & Automation",
    desc: "Designed and optimised PL/SQL stored procedures and complex SQL queries handling multi-million record datasets with zero data loss. Automated RMAN log maintenance and DB refresh cycles via standardised scripting.",
    tags: ["Oracle 12c", "PL/SQL", "RMAN", "Shell Scripting"],
    github: null,
    live: null,
    featured: true,
  },
  {
    title: "Cross-Platform Mobile Applications",
    desc: "Led front-end development team building cross-platform iOS and Android applications using ReactJS. Managed full project lifecycle with Scrum methodology, CI/CD pipeline via Jira, and API integration with Slim backend.",
    tags: ["ReactJS", "JavaScript", "Expo", "Jira", "Figma"],
    github: "https://github.com/shahdantrader",
    live: null,
    featured: true,
  },
  {
    title: "Security Posture & Compliance Programme",
    desc: "Implemented secure access architecture for Production and DRC environments. Led comprehensive security assessments including IPT, EPT, WASA, HVA-VA, HVA-CA, and DSA with full remediation execution.",
    tags: ["Security", "SSL/TLS", "WebLogic", "Compliance"],
    github: null,
    live: null,
    featured: false,
  },
  {
    title: "SVN Release Governance Framework",
    desc: "Established SVN branching standards, commit controls, and release labelling to minimise deployment risk and improve release integrity across a large enterprise development team.",
    tags: ["SVN", "DevOps", "Release Mgmt", "Governance"],
    github: null,
    live: null,
    featured: false,
  },
  {
    title: "Cartoola Web & Mobile Platform",
    desc: "Developed the cartoola.my / cartoola.com.sg web platform from ground up. Implemented redesigns, built hybrid web-apps with Joomla integration, and delivered Android and iOS applications.",
    tags: ["PHP", "Joomla", "JavaScript", "Android", "iOS"],
    github: "https://github.com/shahdantrader",
    live: null,
    featured: false,
  },
];
