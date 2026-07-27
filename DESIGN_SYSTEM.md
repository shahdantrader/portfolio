# Design System

This document provides a quick reference for the portfolio's design tokens, components, and styling conventions.

## Color Palette

### Core Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#0d0d0d` | Page background, dark sections |
| `--color-surface` | `#1a1a1a` | Content sections, alternating backgrounds |
| `--color-surface-2` | `#222222` | Hover states, elevated surfaces |
| `--color-text` | `#f0ede8` | Primary text, headings |
| `--color-muted` | `#8a8580` | Secondary text, metadata, descriptions |
| `--color-accent` | `#c9a96e` | Accent highlights, links, interactive elements |
| `--color-accent-dim` | `rgba(201,169,110,0.12)` | Subtle hover backgrounds |
| `--color-border` | `rgba(240,237,232,0.08)` | Subtle borders, dividers |

### Color Usage by Component
- **Buttons (Primary)**: `bg-accent` text, `text-bg` foreground
- **Buttons (Ghost/Outline)**: `border-accent` outline, `text-accent` text
- **Text**: `text-text` (primary), `text-muted` (secondary)
- **Borders**: `border-border` (subtle), `border-accent` (highlighted)
- **Backgrounds**: `bg-surface` (alternating), `bg-bg` (default)

## Typography

### Font Families

**Display Font**: Cormorant Garamond
- Weights: 300 (light), 400 (regular), 600 (semibold)
- Styles: normal, italic
- Used for: Hero heading, section titles, role headings

**Body Font**: Inter
- Weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold)
- Used for: Body text, labels, metadata

### Type Scale

| Class | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xs` | 12px | — | Labels, metadata, badges |
| `text-sm` | 14px | — | Secondary text, small copy |
| `text-base` | 16px | 1.8 | Body paragraphs, standard text |
| `text-lg` | 18px | — | Slightly larger text |
| `text-xl` | 20px | — | Taglines, intro text |
| `text-2xl` | 24px | 1.2 | Timeline headings (role) |
| `text-3xl` | 32px | — | Section subheadings |
| `text-4xl` | 44px | — | — |
| `text-5xl` | 60px | 1.0 | Large display headings |
| `text-6xl` | 88px | — | Extra-large display |

### Font Weight Reference
- **300 (Light)**: Hero heading, watermark
- **400 (Regular)**: Body text, role headings
- **500 (Medium)**: Section labels, category headings
- **600 (Semibold)**: Strong emphasis, button text

## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 0.25rem (4px) | Micro-spacing |
| `--space-2` | 0.5rem (8px) | Tight spacing |
| `--space-3` | 0.75rem (12px) | — |
| `--space-4` | 1rem (16px) | Standard spacing |
| `--space-5` | 1.25rem (20px) | Social link gaps |
| `--space-6` | 1.5rem (24px) | Margins, section gutters |
| `--space-8` | 2rem (32px) | Between categories |
| `--space-10` | 2.5rem (40px) | CTA margins |
| `--space-12` | 3rem (48px) | Hero CTA bottom margin |
| `--space-16` | 4rem (64px) | Grid gaps (mobile) |
| `--space-20` | 5rem (80px) | Section spacing |
| `--space-24` | 6rem (96px) | Large section gaps |
| `--space-32` | 8rem (128px) | Section block padding |

## Motion & Animation

### Easing Functions

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Reveal animations (scroll-triggered) |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | State transitions, interactive feedback |

### Durations

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | 200ms | Hover states, quick interactions |
| `--duration-base` | 350ms | Standard state changes |
| `--duration-slow` | 600ms | Reveal animations (on scroll) |

### Reveal Pattern (Scroll-Triggered)

All scroll-triggered animations follow this pattern:

```tsx
<motion.element
  initial={{ opacity: 0, y: 28 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.6,           // --duration-slow
    ease: [0.16, 1, 0.3, 1], // --ease-out-expo
  }}
  viewport={{ once: true, margin: '0px 0px -80px 0px' }}
>
  Content
</motion.element>
```

**Reveal Transform**: `translateY(28px)` → `0` with opacity fade
**Viewport Trigger**: When 80px from viewport bottom (provides lead time)

### Stagger Delays (for lists/grids)

When revealing multiple items in sequence:
```
0ms, 80ms, 160ms, 240ms, 320ms, 400ms
```

## Layout & Container

### Container
- **Max width**: `--container-max` = 1100px
- **Padding (inline)**: `--container-pad` = `clamp(1.25rem, 5vw, 2.5rem)`
  - Mobile: 1.25rem (20px)
  - Scales with viewport
  - Desktop max: 2.5rem (40px)
- **Centering**: `mx-auto` (Tailwind)

### Section
- **Block padding**: `--space-32` (8rem / 128px)
- **Background**: Alternates between `--color-bg` and `--color-surface`
- **Max-width**: Centered with container

### Breakpoints (Tailwind)
| Class | Width | Usage |
|-------|-------|-------|
| (none) | 0px | Mobile-first |
| `sm:` | 640px | Small mobile → tablet |
| `md:` | 768px | Tablet → desktop |
| `lg:` | 1024px | Large desktop |
| `xl:` | 1280px | Extra-wide |

### Custom Mobile Override
At `max-width: 480px`:
- `--space-32`: reduced to 5rem (80px)
- Hero CTA: stacks vertically
- Buttons: full width

## Components

### Buttons

**Primary Button**
```tsx
<button className="px-6 py-3 bg-accent text-bg font-medium hover:bg-opacity-90 transition-colors duration-200">
```

**Ghost/Outline Button**
```tsx
<button className="px-6 py-3 border border-accent text-accent font-medium hover:bg-accent hover:text-bg transition-colors duration-200">
```

**State Transitions**: 200ms, ease-in-out

### Skill Tags

```tsx
<span className="text-xs px-3 py-1.5 border border-border text-muted hover:border-accent hover:text-accent transition-colors duration-200 rounded-sm tracking-wider">
  Skill Name
</span>
```

- **Padding**: 0.3rem vertical, 0.75rem horizontal
- **Letter spacing**: 0.04em
- **Border radius**: 2px (sharp corners)
- **Hover**: Border and text shift to accent color

### Section Header

```tsx
<div className="mb-16 relative pb-6 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-px after:bg-accent after:opacity-60">
  <span className="block text-xs font-medium tracking-[0.18em] uppercase text-accent mb-3">
    Label
  </span>
  <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] font-light text-text">
    Title
  </h2>
</div>
```

- **Label**: Uppercase, accent color, 0.18em letter spacing
- **Title**: Display font, light weight, clamped size
- **Underline**: 48px thin rule (accent color, 60% opacity)

### Timeline Item

**Mobile** (< 640px):
- Vertical line on left (`2px`, `--color-border`)
- Period/company in meta div
- Role/description in body div

**Desktop** (≥ 640px):
- Line hidden
- Meta in fixed 180px column
- Body in flexible column

## Accessibility

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Link Indicators
- External links: `target="_blank"` + `aria-label` describing destination
- Icon-only buttons: `aria-label` with descriptive text
- Form fields: `<label htmlFor="...">` associations

## Dark Mode Considerations

This portfolio is **dark-first** (no light mode override in CSS). If light mode is added:
1. Define new `@media (prefers-color-scheme: light)` variables in `:root`
2. Update each color token
3. Test contrast ratios (AA or AAA)
4. Test Framer Motion animations (some effects may need adjustment)

## Implementation Examples

### Using Colors in Components
```tsx
// ✅ Good: Use CSS variable reference
<div className="bg-surface text-text border border-border">

// ✅ Good: Tailwind utility + variable
<button className="bg-accent text-bg hover:bg-opacity-90">

// ❌ Avoid: Hardcoded colors
<div style={{ backgroundColor: '#0d0d0d' }}>
```

### Using Typography
```tsx
// ✅ Good: Semantic usage of font families
<h1 className="font-display text-5xl font-light">  {/* Display font */}
<p className="font-body text-base leading-relaxed">  {/* Body font */}

// ❌ Avoid: Serif everywhere
<p className="font-display">Body text...</p>
```

### Using Spacing
```tsx
// ✅ Good: Tailwind spacing from scale
<div className="gap-4 mb-8 px-[var(--container-pad)]">

// ✅ Good: CSS variable for custom spacing
<section className="py-[var(--space-32)]">

// ❌ Avoid: Arbitrary spacing
<div className="gap-[27px] mb-[52px]">
```

### Using Motion
```tsx
// ✅ Good: Standard reveal pattern
<motion.div whileInView="visible" variants={revealVariants}>

// ✅ Good: Framer Motion for all animations
<motion.button whileHover={{ scale: 1.05 }}>

// ❌ Avoid: CSS animations
<div style={{ animation: 'fadeIn 0.6s ease-out' }}>

// ❌ Avoid: Hand-written timing
<motion.div transition={{ duration: 0.456 }}>
```

---

For more details, see [DEVELOPMENT.md](DEVELOPMENT.md) and [CONTRIBUTING.md](CONTRIBUTING.md).
