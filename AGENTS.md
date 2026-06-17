# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

Astro-based landing page generator for multi-regional campaign pages. Creates landing pages across regions (JP, KR, US, etc.) with dynamic routing for different people/campaigns, versions, and social channel types (Kakao, Band).

## Development Commands

| Command | Description |
|---------|-------------|
| `bun install` | Install dependencies |
| `bun dev` | Start development server at localhost:4321 |
| `bun build` | Build production site to ./dist/ |
| `bun preview` | Preview build locally |
| `bunx eslint .` | Run ESLint linting |
| `bunx astro check` | Type-check Astro files |
| `./deploy_static.sh` | Build and copy assets to cf-cloak project for deployment |

## Technology Stack

- **Astro 5** with static site generation (SSG) and file-based routing
- **React 19** for interactive components (modals, forms)
- **Tailwind CSS 4** via `@tailwindcss/vite` plugin (not UnoCSS)
- **TypeScript** with strict config extending `astro/tsconfigs/strict`
- **Bun** as package manager and runtime
- **ESLint** with `@antfu/eslint-config` + Astro + Prettier formatting

## Architecture

### Dynamic Routing Pattern

Campaign pages use Astro's `getStaticPaths()` to generate all routes at build time:

```
src/pages/{REGION}/[people]/{YYYYMMDD-N}.[version].[t]/index.astro
```

- `[people]` — person/influencer identifier (Chinese character key from config)
- `[version]` — variant number for A/B testing (0, 1, 2...)
- `[t]` — social channel type: `卡扣` (Kakao) or `棒群` (Band)

**KR campaigns** use `generateKrConfig()` from `src/utils/kr_config.ts` which maps person configs to static paths. Each person has versions with `img_prefix` for loading campaign-specific images.

**JP campaigns** use copy variant configs with `ext` parameter for A/B testing different ad copy.

### Config-Driven Generation (kr_config.ts)

Central KR configuration defines people/influencers with:
- Korean display name, image prefix, version variants
- Social type constraints: `ALL_SOCIAL`, `BAND_ONLY`, `KAKAO_ONLY`
- Filter utilities: `exact()`, `byPerson()`, `byVersion()`, `exclude()`, `and()`, `or()`

Pages call `generateKrConfig(filter?, excludeList?)` in `getStaticPaths()` to get route arrays with `{ params: { people, version, t }, props: { name, img_prefix } }`.

### Social Channel Polymorphism

A single campaign page serves both Kakao and Band via the `t` parameter:
- `CtaButton.astro` dispatches to the correct button component based on `social` prop
- Button types: `卡扣` → KakaoCtaButton, `棒群` → BandCtaButton, `混合` → MixedCtaButton, `引导弹窗` → KakaoCopyButton (React), `提高质量_` → KakaoFormButton (React)
- `src/utils/jump.ts` handles redirects with GA tracking (`jumpToKakao()`, `jumpToBand()`, `mixinJump()`)

### Layout System

- `BaseLayout.astro` — generic wrapper (BaseHead + PluginLoader + RedirectCode)
- `KRBaseLayout.astro` — KR-specific (uses KRRedirectCode, includes ButtonAction)
- `RedirectCode.astro` / `KRRedirectCode.astro` — inject tracking variables and load tracking script

### Plugin System (PluginLoader.astro)

Centralized third-party library management with loading strategies:
- `blocking` — synchronous (e.g., Google Fonts)
- `defer` — after page load (e.g., AOS, GSAP, Swiper, jQuery)
- `async` — non-blocking

Pages specify plugins via props: `plugins={['aos', 'jquery', 'googleFontsKR']}`

### Asset Organization

- Campaign images: `src/pages/{REGION}/[people]/images/{img_prefix}*.jpg`
- Campaign static assets: `src/pages/{CAMPAIGN}/static/css/`, `static/picture/`
- Built assets output to `mjSFqQ/` directory (configured in astro.config.mjs)
- Path alias `@/` points to `./src/`

### Build & Deploy Pipeline

`deploy_static.sh` runs `bun run build`, then copies `dist/mjSFqQ/` and `dist/favicon.ico` to the `cf-cloak` project and runs its deploy.

### Vite Configuration Notes

- Custom plugin `excludeThirdPartyCss()` prevents Tailwind from processing third-party CSS (bootstrap, style-static, et-core-unified)
- HTML compression disabled (`compressHTML: false`)
- Build format set to `preserve`

## Development Patterns

- Images are imported in frontmatter and used via `.src` property: `<img src={img.src} />`
- Dynamic image imports: `const headImg = import(\`../images/${img_prefix}head.jpg\`)`
- `.link-btn` class elements automatically get `mixinJump` click handler via `src/utils/main.js`
- Responsive breakpoints: 768px (mobile), 480px (small mobile), 1024px (tablet)
- Root `index.astro` auto-discovers all pages using `import.meta.glob()`

## Skill Usage

- When a task involves CSS styling, UI visual design, page layout, or component appearance, use the `frontend-design` skill before implementing code.

## Copywriting Quality — All Languages

These rules apply to marketing and landing-page copy in any language. The goal is to avoid translationese and generic AI-sounding copy.

1. **Prefer transcreation over translation**: establish the intended emotion and conversion goal first, then write from the target language's native speaker perspective. Do not translate sentence-by-sentence, and do not preserve source-language slogans, CTA phrasing, or sentence structure.
2. **Clean up dependent claims**: when weakening or removing a claim, market, feature, or benefit, also remove copy that only made sense because of that original claim.
3. **Avoid AI copy patterns**: avoid "not X but Y" structures, mechanical three-part parallelism, list items that are just bold labels plus colons, overused dashes, hollow prestige words, and overly formal connectors. Vary sentence length and use concrete, believable details.
4. **Read-aloud test**: before finalizing copy, read it as the target-language audience. Rewrite anything that sounds awkward, stiff, or unlike something a real person would say.
5. **Native-market review pass**: after building a landing page, run a separate review pass from the perspective of a target-market native copywriter and ordinary user. Check naturalness, credibility, read-aloud flow, and rewrite any awkward copy before finalizing.

## Landing Page Defaults

1. **Mobile-first**: landing-page traffic mainly comes from phones, so design and validate the mobile viewport first, around 390px wide. Base CSS must be the mobile layout, then use `@media (min-width: ...)` to enhance tablet and desktop layouts. Avoid desktop-first `max-width` fallback patterns.
2. **No SVG logo by default**: do not use inline SVG for landing-page logos or brand marks. Use a generated PNG, real image asset, or text wordmark. Functional small icons such as CTA arrows and checkmarks may still be SVG.
3. **No top navigation by default**: landing pages should usually have one conversion goal and no header navigation. Add navigation only when explicitly requested.
4. **No floating overlay cards or badges**: do not place absolute-positioned cards, badges, chips, or metric overlays on top of images or content. Put information in normal document flow. A bottom sticky CTA is allowed when it does not hide main content.
5. **No obviously fake sample content**: avoid sample/demo/placeholder cards, fake market widgets, mystery-stock placeholders, Lorem text, or obviously staged demo screenshots. Realistic marketing proof, member counts, testimonials, and activity cues are allowed when they read as plausible.
6. **Post-build copy review is required**: every completed landing page needs the copy quality review pass described above.

Before starting and before handoff, run through the six landing-page defaults as a checklist.
