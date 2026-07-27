import { PROJECTS } from "@/data/projects";
import { SKILLS } from "@/data/skills";
import { EXPERIENCE } from "@/data/experience";
import { CERTIFICATES } from "@/data/certificates";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-16 text-center">
      <p className="font-display text-5xl italic text-accent">Foundation ready</p>
      <p className="text-muted">
        {PROJECTS.length} projects · {SKILLS.length} skill groups ·{" "}
        {EXPERIENCE.length} roles · {CERTIFICATES.length} certificates loaded.
      </p>
    </main>
  );
}
