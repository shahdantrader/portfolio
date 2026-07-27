export interface SkillGroup {
  category: string;
  tags: string[];
}

export const SKILLS: SkillGroup[] = [
  {
    category: "Languages & Backend",
    tags: ["Java", "PL/SQL", "JavaScript", "PHP", "SQL", "Bash / Shell"],
  },
  {
    category: "Frontend & Mobile",
    tags: [
      "ReactJS",
      "Spring MVC",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "AngularJS",
      "Swift 5",
    ],
  },
  {
    category: "Databases",
    tags: ["Oracle 12c", "MySQL", "MSSQL", "RMAN"],
  },
  {
    category: "Infrastructure & DevOps",
    tags: ["WebLogic 12c", "SVN", "Ansible", "SSL/TLS", "CI/CD", "Jira", "Expo"],
  },
  {
    category: "Tools & Design",
    tags: ["Figma", "Adobe XD", "Postman", "Power BI", "Xcode", "VSCode"],
  },
  {
    category: "Methodologies & Certs",
    tags: [
      "Scrum",
      "Kanban",
      "Business Analysis",
      "Cybersecurity",
      "SDLC",
      "System Analysis",
    ],
  },
];
