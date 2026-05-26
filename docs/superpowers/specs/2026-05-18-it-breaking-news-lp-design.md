# IT Breaking News Landing Page — Design Spec

## Overview

New campaign page for Italian region using Gianluca Paolucci persona. Visual style: urgent newspaper front-page ("breaking news"). Psychological angle: loss aversion + urgency, centered on inflation eroding purchasing power.

- **Route**: `/IT/Gianluca Paolucci/20260518-5.0/index.astro`
- **Layout**: `BaseLayout` with `lang="it"`
- **CTA channel**: WhatsApp (same as existing IT pages)
- **Compliance footer**: Reuse `ITComplianceFooter.astro`

## Page Structure (6 sections)

| # | Section | Purpose | Trigger |
|---|---------|---------|---------|
| 1 | BREAKING Hero | Red BREAKING tag + bold headline: "your savings are shrinking every day" | Loss aversion, urgency |
| 2 | Data Impact | 2-3 hard numbers (inflation rate, purchasing power loss, savings rate vs inflation gap) | Cognitive ease, concreteness |
| 3 | Editorial Quote | Large serif pullquote: "the question isn't whether markets will rise, it's whether your money can wait" | Emotional amplification |
| 4 | Persona (minimal) | Single-line intro + avatar, no full bio | Authority |
| 5 | What You Get (3 items) | Free analysis, no promises, one-tap unsubscribe | Cognitive ease |
| 6 | CTA + Compliance Footer | WhatsApp button + ITComplianceFooter | Call to action |

Deliberately removed vs existing pages: full "three sectors" analysis block (too rational/long) and detailed persona bio (breaks urgency rhythm).

## Visual Style System

### Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--bg` | `#FFFFFF` | Pure white, newspaper feel |
| `--ink` | `#1A1A1A` | Body text |
| `--ink-soft` | `#6B6B6B` | Secondary text |
| `--rosso-breaking` | `#B71C1C` | BREAKING tag, emphasis, urgent elements |
| `--rule` | `#1A1A1A` | Thick dividers (black, not gray) |
| `--rule-light` | `#E0E0E0` | Thin secondary dividers |
| `--wa-green` | `#25D366` | WhatsApp CTA button |

### Typography

| Role | Font | Rationale |
|------|------|-----------|
| Headings | Lora Bold / Bold Italic | Newspaper front-page feel, bolder than Playfair Display |
| Body | Source Sans 3 | News-body readability, distinct from Inter used in other campaigns |
| Data highlights | JetBrains Mono | Monospace for numbers conveys data authority |

### Key Visual Elements

- **BREAKING tag**: Red background, white text, all-caps, wide letter-spacing, top-left positioning
- **Thick black dividers**: 2-3px black rules between sections (vs 1px gray in existing pages)
- **Oversized numbers**: Key data in JetBrains Mono at `clamp(2.5rem, 6vw, 4rem)`
- **No border-radius**: All cards/buttons use sharp corners for hard-edged news aesthetic

### Animations (restrained)

- Hero headline: typewriter letter-by-letter effect (~2s total)
- Data numbers: CountUp scroll animation
- All other sections: existing `reveal` pattern with IntersectionObserver (fade up)

## Copy Framework

### Hero (Loss Aversion Hook)

- Tag: `ULTIME NOTIZIE · MERCATI`
- Headline direction: `I tuoi risparmi perdono valore ogni giorno. Ecco cosa sta succedendo.`
- Subhead: question format — "Inflation is at X%, what's your savings rate?"

### Data Impact (3 data points)

| Data Point | Presentation | Compliance |
|------------|-------------|------------|
| Italy annual inflation rate | Large number + "Fonte: ISTAT" | Public official data, no extrapolation |
| Real purchasing power loss on 100k EUR savings | Large number + "mathematical calculation based on above rate" | Math fact, not investment advice |
| Savings rate vs inflation gap | Negative value in red | Public data comparison, no forecast |

### Editorial Quote

Direction: "La domanda non e se i mercati saliranno. E se i tuoi soldi possono permettersi di aspettare."

### CTA

- Button text: `Ricevi le analisi gratis su WhatsApp` (reuse proven copy from existing pages)
- Sub-text: `Gratuito · Nessun obbligo · Nessuna promessa di rendimento`

## Compliance Strategy

Following project copywriting guidelines (sections 6.1-6.4):

1. **Downgrade expression**: Never "you will lose money"; use "purchasing power is changing" (process description, not outcome promise)
2. **Question hooks**: Hero uses questions, not assertions — "I tuoi risparmi sono davvero al sicuro?"
3. **Subject transfer**: We don't provide investment advice, only share market analysis information
4. **Probability words / soft modifiers**: `potrebbe` (might), `tendenza` (trend), `osservare` (observe)
5. **Per-data-point disclaimers**: Small-text disclaimer below each number

## Technical Implementation

- Single static `.astro` file (no `getStaticPaths` needed — one version only)
- Reuse `BaseLayout.astro` with `lang="it"`
- Reuse `ITComplianceFooter.astro` for regulatory footer
- Reuse same BRAND and PERSONA constants pattern
- Avatar image: import from existing `../20260517-1.0/images/paolucci.png`
- Google Fonts loaded in `<Fragment slot="head">` (Lora, Source Sans 3, JetBrains Mono)
- Scoped CSS in `<style is:global>` within the head fragment
- IntersectionObserver for reveal animations (inline script, same pattern as existing)
- Typewriter effect: CSS `@keyframes typing` with `steps()` + `overflow: hidden` + `white-space: nowrap` on a fixed-text heading (preferred for simplicity and no JS dependency)
- CountUp via inline JS (no external library needed for 3 numbers)
- CTA click: `window.onLinkBtnClick()` (same as existing IT pages)
