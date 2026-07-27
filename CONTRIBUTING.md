# Contributing

Thank you for your interest in contributing to this portfolio! This document outlines the process for making changes, submitting pull requests, and maintaining code quality.

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shahdantrader/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Start the dev server**:
   ```bash
   npm run dev
   ```

## Development Guidelines

### Code Style

- **TypeScript**: Use strict mode, define interfaces for all data structures
- **Naming**: Use descriptive names (no abbreviations unless standard)
- **Files**: Use PascalCase for component files, camelCase for utility files
- **Imports**: Use absolute imports with `@/` alias

### Components

- Create reusable, focused components in `app/components/`
- Use functional components with hooks (React 19+)
- Add `'use client'` directive at top of client components
- Export as default for cleaner imports
- Use Framer Motion for all animations (no CSS animations)

### Animations

All animations must use Framer Motion with these standardized values:

```tsx
// Reveal pattern (scroll-triggered)
const revealVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,           // 600ms
      ease: [0.16, 1, 0.3, 1], // ease-out-expo
    },
  },
};
```

**Duration reference**:
- Fast: 200ms (transitions)
- Base: 350ms (interactions)
- Slow: 600ms (reveal animations)

### Styling

- Use Tailwind utilities for layout and spacing
- Reference CSS variables for colors, fonts, easing
- No hardcoded colors or magic numbers
- Responsive-first: mobile styles first, then add breakpoints with `sm:`, `md:`, `lg:`

**Color Variables**:
```css
--color-bg              /* #0d0d0d */
--color-surface         /* #1a1a1a */
--color-text            /* #f0ede8 */
--color-muted           /* #8a8580 */
--color-accent          /* #c9a96e */
--color-border          /* rgba(240,237,232,0.08) */
```

**Typography**:
- `font-display`: Cormorant Garamond (serif, for headings only)
- `font-body`: Inter (sans, for body text)

### Data

- Keep all data in `data/*.ts` files
- Define TypeScript interfaces for type safety
- Export as named constants
- No hardcoded strings in components

Example:
```ts
// data/projects.ts
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
    title: "Example Project",
    desc: "A brief description.",
    tags: ["React", "TypeScript"],
    github: "https://github.com/...",
    live: "https://example.com",
    featured: true,
  },
];
```

## Git Workflow

### Branch Naming

- Feature: `feature/add-nav-component`
- Fix: `fix/header-alignment-mobile`
- Refactor: `refactor/simplify-button-styles`
- Docs: `docs/update-readme`

### Commit Messages

Write clear, concise commit messages:

```
Add Hero component with Framer Motion reveal animations

- Full-screen intro with KS watermark
- Staggered reveal for eyebrow, name, tagline, CTA
- Social links (GitHub, LinkedIn, Email)
- Scroll indicator to About section
```

**Format**:
- **Summary** (50 chars max, no period): What was changed and why
- **Blank line**: Separator
- **Body** (optional, 72 chars per line): Details, context, trade-offs

### Pull Request Process

1. **Create a PR** against the `main` branch
2. **Use the PR template** (auto-fills from `.github/pull_request_template.md`)
3. **Title**: Follow [Conventional Commits](https://www.conventionalcommits.org/) format
   - `feat: add Projects section`
   - `fix: correct responsive breakpoint for About grid`
   - `refactor: simplify motion easing constants`
   - `docs: update DEVELOPMENT.md with examples`

4. **Description**: Explain:
   - What changed and why
   - Design decisions (if architectural)
   - Testing performed
   - Screenshots (for UI changes)

5. **Check CI**: Ensure linting and TypeScript pass

### Code Review Checklist

- [ ] Code follows style guidelines (TypeScript, naming, comments)
- [ ] No hardcoded values (use CSS variables, data files)
- [ ] Animations use Framer Motion with standard timing
- [ ] Responsive design tested on mobile (360px), tablet (768px), desktop (1024px+)
- [ ] Accessibility: labels, aria-label, focus states, semantic HTML
- [ ] Types are properly defined (no `any` unless justified)
- [ ] Tests pass: `npm run lint`, `npx tsc --noEmit`, `npm run build`

## Testing

### Local Testing

```bash
# Start dev server
npm run dev

# In another terminal, run checks
npm run lint          # ESLint
npx tsc --noEmit      # TypeScript
npm run build         # Full production build
```

### Browser Testing

- **Chrome**: Primary (DevTools for debugging)
- **Firefox**: Secondary (CSS compat check)
- **Safari**: iOS (font rendering, animations)
- **Mobile**: Test at 375px (iPhone SE), 768px (iPad), 1024px (desktop)

### Visual Regression

If modifying styling or layout:
1. Take a screenshot of the component **before** your changes
2. Make your changes
3. Take a screenshot **after**
4. Include both in your PR description for review

## Reporting Issues

If you find a bug or have a suggestion, please open an issue with:

- **Title**: Clear, concise description
- **Description**: Detailed explanation
- **Steps to reproduce** (for bugs): Exact steps to trigger the issue
- **Expected behavior**: What should happen
- **Screenshots/screencasts**: Visual reference (especially for styling issues)
- **Environment**: Browser, OS, device (if applicable)

## Code of Conduct

- Be respectful and inclusive
- Welcome diverse perspectives
- Focus on the work, not the person
- Assume good intent

## Questions?

Refer to:
- **[DEVELOPMENT.md](DEVELOPMENT.md)**: Architecture, patterns, setup
- **[README.md](README.md)**: Project overview, deployment
- **Legacy reference**: `legacy-static/` folder contains original HTML/CSS/JS

---

Thank you for contributing! 🎉
