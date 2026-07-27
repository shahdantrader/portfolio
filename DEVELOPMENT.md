# Development Guide

## Project Overview

This is a modern portfolio built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**. The design system uses CSS custom properties for a cohesive, maintainable theme across both Next.js utilities and vanilla CSS.

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 + CSS Custom Properties
- **Animations**: Framer Motion (scroll-triggered reveals)
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Cormorant Garamond + Inter via next/font)
- **Linting**: ESLint (Next.js config with TypeScript)

## Project Structure

```
portfolio/
├── app/
│   ├── components/
│   │   ├── Hero.tsx          # Hero section (full-screen intro)
│   │   └── About.tsx         # About, skills, experience
│   ├── favicon.ico
│   ├── globals.css           # Design tokens (@theme) + Tailwind CSS
│   ├── layout.tsx            # Root layout, fonts, metadata
│   └── page.tsx              # Home page entry
├── data/
│   ├── projects.ts           # Project entries (typed)
│   ├── skills.ts             # Skill categories
│   ├── experience.ts         # Career timeline
│   └── certificates.ts       # Certifications
├── legacy-static/            # Original HTML/CSS/JS (reference only)
├── public/
│   └── favicon.png
├── package.json
├── tsconfig.json
├── next.config.ts
└── DEVELOPMENT.md            # This file
```

## Design Tokens

All design tokens are defined in `app/globals.css` using CSS custom properties and exposed to Tailwind via `@theme inline`:

### Colors
- **`--color-bg`**: `#0d0d0d` (dark background)
- **`--color-surface`**: `#1a1a1a` (content surface)
- **`--color-text`**: `#f0ede8` (primary text)
- **`--color-muted`**: `#8a8580` (secondary text)
- **`--color-accent`**: `#c9a96e` (gold accent)
- **`--color-border`**: `rgba(240,237,232,0.08)` (subtle borders)

### Typography
- **Display**: Cormorant Garamond (300, 400, 600 weights; normal + italic)
- **Body**: Inter (300, 400, 500, 600 weights)
- **Type Scale**: `--text-xs` through `--text-6xl`

### Motion
- **Easing**: `--ease-out-expo` (cubic-bezier(0.16, 1, 0.3, 1))
- **Durations**: `--duration-fast` (200ms), `--duration-base` (350ms), `--duration-slow` (600ms)

### Responsive Breakpoints
- Mobile-first approach using Tailwind defaults (640px, 768px, 1024px, etc.)
- Custom mobile override: `--space-32` reduced to 5rem on `max-width: 480px`

## Component Architecture

### Animations & Reveal Pattern
All reveal animations use **Framer Motion's `whileInView`** instead of hand-rolled JavaScript:

```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '0px 0px -80px 0px' }}
  variants={revealVariants}
>
  Content
</motion.div>
```

**Reveal Timing**:
- Duration: 600ms
- Easing: ease-out-expo (cubic-bezier(0.16, 1, 0.3, 1))
- Transform: `translateY(28px)` → `0`
- Opacity: `0` → `1`

### Serif Accents
**Cormorant Garamond is ONLY applied to**:
- `Hero` section heading (h1 with name)
- `About` section title (h2)
- Experience timeline role headings (h4)
- Section titles in other sections

**Not applied globally** to preserve readability for body text (Inter is the body font).

### Section Structure
Each section follows this pattern:
1. Background color (alternates: `--color-surface` / `--color-bg`)
2. Padding: `--space-32` (8rem) block, `--container-pad` inline
3. Max-width: `--container-max` (1100px) centered
4. Section header with label, title, and thin underline

## Development Workflow

### Setup
```bash
npm install
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
```

### Adding New Sections
1. Create a new component in `app/components/` (e.g., `Projects.tsx`)
2. Use Framer Motion `whileInView` for animations (matching reveal pattern)
3. Import and wire into `app/page.tsx`
4. Apply section styling: background, padding, container max-width
5. Use Tailwind + CSS variables for theming (no hardcoded colors)

### Updating Data
Data is centralized in `data/*.ts` files. Each file exports a TypeScript interface and array:

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
  // ... entries
];
```

Import and use in components:
```tsx
import { PROJECTS } from '@/data/projects';

{PROJECTS.map(project => (...))}
```

### Fonts & Next.js Config
Fonts are configured in `app/layout.tsx` using `next/font/google`:

```tsx
const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});
```

These CSS variables are referenced in `globals.css`:
```css
--font-display: var(--font-cormorant), Georgia, serif;
--font-body: var(--font-inter), system-ui, -apple-system, sans-serif;
```

## Styling Guidelines

### Tailwind + CSS Variables
Use Tailwind utility classes where possible, combined with CSS variables for consistency:

```tsx
// ✅ Good: Use Tailwind with custom color tokens
<div className="bg-bg text-text text-base leading-relaxed">

// ✅ Good: Use Tailwind for layout + Framer Motion for animation
<motion.div className="flex gap-4" variants={...}>

// ❌ Avoid: Hardcoded colors
<div className="bg-[#0d0d0d]">

// ❌ Avoid: Inline styles for animations
<div style={{ animation: '...' }}>
```

### Responsive Design
- Mobile-first: write styles for mobile, then add breakpoints
- Use Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Test at: 360px (extra-small), 480px (small mobile), 768px (tablet), 1024px (desktop)

```tsx
// ✅ Good: Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 gap-16">

// ✅ Good: Hidden/shown based on breakpoint
<div className="hidden sm:flex">
```

## Common Patterns

### Button Styling
```tsx
// Primary
<button className="px-6 py-3 bg-accent text-bg font-medium hover:bg-opacity-90 transition-colors duration-200">

// Ghost/Outline
<button className="px-6 py-3 border border-accent text-accent font-medium hover:bg-accent hover:text-bg transition-colors duration-200">
```

### Skill Tags
```tsx
<span className="text-xs px-3 py-1.5 border border-border text-muted hover:border-accent hover:text-accent transition-colors duration-200 rounded-sm">
  Tag
</span>
```

### Timeline Items (Mobile + Desktop)
- Mobile: Vertical line on the left
- Desktop (640px+): Line hidden, 180px fixed meta column

## Testing

### Visual Testing
```bash
npm run dev
# Visit http://localhost:3000 in browser
# Test: hero reveal, about section scroll-in, responsive layout
```

### Type Checking
```bash
npx tsc --noEmit
```

### Linting
```bash
npm run lint
```

## Deployment

### Build
```bash
npm run build  # Creates .next/ production build
```

### Vercel (Recommended)
The project is optimized for Vercel:
1. Connect repo to Vercel
2. Vercel auto-detects Next.js
3. Deploys on push to main branch

**Environment**: No special env vars needed.

## Performance Notes

- Fonts use `display: swap` for fast initial render
- Framer Motion animations are GPU-accelerated (use `transform`, `opacity`)
- Images lazy-loaded (built-in Next.js optimization)
- CSS variables avoid redundant color definitions
- Tailwind v4 treeshakes unused utilities at build time

## Accessibility

- All sections have semantic `id` attributes for skip links
- Form fields have associated labels with `htmlFor`
- Icon-only buttons have `aria-label`
- Links have `rel="noopener noreferrer"` for external targets
- Focus states styled with `outline-offset` on accent color
- Prefers-reduced-motion respected (animations disabled in CSS)

## Future Sections (Planned)

- `Projects.tsx`: Grid of project cards with filtering
- `Certificates.tsx`: Certificate badges with verification links
- `Contact.tsx`: Contact form (Formspree), CTA, location
- `Navigation.tsx`: Sticky header with scroll-based highlight + mobile menu
- `Footer.tsx`: Copyright, social links

## Debugging

### Build Errors
```bash
rm -rf .next       # Clear build cache
npm run lint       # Check linting errors
npx tsc --noEmit   # Check TypeScript errors
```

### Dev Server Issues
```bash
pkill -f "next dev"  # Kill dev server
npm run dev          # Restart
```

### Component Not Rendering
- Check `app/page.tsx` imports
- Verify component is exported as `default`
- Check console for React errors
- Ensure data files are imported correctly

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
