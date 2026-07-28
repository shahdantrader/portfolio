import { Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './icons/BrandIcons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8 px-[var(--container-pad)]">
      <div className="flex flex-wrap items-center justify-between gap-4 max-w-[var(--container-max)] mx-auto">
        <p className="text-sm text-muted">
          &copy; {year} Khairul Shahdan. Built with care.
        </p>
        <div className="flex gap-5">
          <a
            href="https://github.com/shahdantrader"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors duration-200"
            aria-label="GitHub"
          >
            <GitHubIcon size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/shahdansalleh/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <LinkedInIcon size={18} />
          </a>
          <a
            href="mailto:shahdantrade@gmail.com"
            className="text-muted hover:text-accent transition-colors duration-200"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
