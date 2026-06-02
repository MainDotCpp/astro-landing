# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

- 当任务涉及 CSS 样式、UI 视觉设计、页面布局或组件外观时，必须优先调用 `frontend-design` skill 获取设计指导后再实现代码。

## Copywriting Quality — 所有语言通用 (Anti-Translationese & Anti-AI-Slop)

适用于**任何语言**的营销 / 落地页文案。目标：杜绝翻译腔 (translationese) 与 AI 味 (AI slop)。

1. **创译优先 (Transcreation, not translation)**：先定情绪 / 意图，再用目标语言的**母语者思维从零表达**；绝不逐句直译，绝不保留源语言的卖点措辞或句式结构。Slogan / 标题 / CTA 尤其禁止直译。
2. **残留检查**：当淡化或删除某个卖点（如某个市场、某个功能）后，必须连带清理所有依赖它才成立的措辞——否则会留下"悬空"的废话（典型反例：淡化"美股/英文资讯"后仍写"用简单希伯来语"，对母语者是废话）。
3. **去 AI 套路**：禁止——"不是 X 而是 Y" / "not only… but also" 类对照结构、机械的三连排比、列表项 = 粗体小标题 + 冒号、滥用破折号、空洞拔高词（testament / pivotal / 等）、过度书面的连接词。句长要**锯齿化**（长短交替），并加入**具体真实细节**而非抽象描述。
4. **朗读测试**：成稿前以目标语言"**大声读**"，读着卡壳或"没人会这么说话"的地方必改。
5. **母语者审查**：重要文案成稿后，用 agent 扮演**目标市场的母语文案 + 普通用户**双视角，做朗读测试 + 地道度打分 + 改写，再定稿。
