'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#personal-projects', label: 'Personal Projects' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(
      (el): el is HTMLElement => el !== null,
    );

    function onScroll() {
      let current = '';
      for (const section of sections) {
        if (window.scrollY >= section.offsetTop - 120) {
          current = section.id;
        }
      }
      setActiveSection(current);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[100] h-[var(--nav-h)] transition-colors duration-[350ms] ${
        scrolled
          ? 'bg-[rgba(13,13,13,0.9)] backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between h-full max-w-[var(--container-max)] mx-auto px-[var(--container-pad)]">
        <a
          href="#hero"
          className="font-display text-xl font-semibold tracking-wide text-accent hover:opacity-75 transition-opacity duration-200"
          aria-label="Back to top"
        >
          KS
        </a>

        <ul className="hidden lg:flex items-center gap-7">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative text-sm tracking-wider transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-accent after:transition-[width] after:duration-[350ms] ${
                  activeSection === link.href.slice(1)
                    ? 'text-text after:w-full'
                    : 'text-muted after:w-0 hover:text-text hover:after:w-full'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="lg:hidden z-[101] p-2 text-text"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`lg:hidden fixed inset-0 bg-bg flex items-center justify-center transition-opacity duration-[350ms] ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col items-center gap-10">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-display text-4xl font-light text-muted hover:text-accent transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
