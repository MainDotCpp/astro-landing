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
| `./deploy_rsync.sh` | Build and rsync `dist/` to the production servers |
| `bun run gallery` | Build + rebuild gallery index + incrementally screenshot all landing pages |

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

`deploy_rsync.sh` runs `bun run build`, then rsyncs `dist/` to the production hosts (`t.dd-ll.xyz` and the backup domain). Excludes `*_/`, `YY/`, `_gallery/` and — for the primary host — `private/`.

### Vite Configuration Notes

- Custom plugin `excludeThirdPartyCss()` prevents Tailwind from processing third-party CSS (bootstrap, style-static, et-core-unified)
- HTML compression disabled (`compressHTML: false`)
- Build format set to `preserve`

## Development Patterns

- Images are imported in frontmatter and used via `.src` property: `<img src={img.src} />`
- Dynamic image imports: `const headImg = import(\`../images/${img_prefix}head.jpg\`)`
- `.link-btn` class elements automatically get `mixinJump` click handler via `src/utils/main.js`
- Responsive breakpoints: 768px (mobile), 480px (small mobile), 1024px (tablet)
- There is no root `index.astro`. To browse all pages, use the gallery at `/_gallery/index.html` (see Landing Page Gallery below)

## SSI 注入当前是停用状态

页面里的 `<!--#include file="link.txt" -->` / `head.html` / `band.txt` 全部改成了 **`<!-- #include ...`（`<!--` 和 `#` 之间多一个空格）**，nginx 不再识别，共 229 处 / 117 个文件。

**为什么要停**：nginx 的 `include` 是子请求，目标文件不存在时它会把自己那张 404 错误页（多行 HTML）整段塞进 SSI 位置。塞进 `const link = '…'` 里就撑破了 JS 字符串字面量 → 整个 `<script>` 块 SyntaxError → `link` 未定义 → CTA 点了完全没反应，而页面看上去一切正常。`ssi_silent_errors` 管不了这个（它只抑制指令处理失败的提示文字，不影响子请求响应体）。

**投放需要注入时再打开**。整站切换：

```bash
# 恢复注入（<!-- # → <!--#）
find src public \( -name '*.astro' -o -name '*.html' \) -exec sed -i '' 's/<!-- #include/<!--#include/g' {} +

# 再次停用
find src public \( -name '*.astro' -o -name '*.html' \) -exec sed -i '' 's/<!--#include/<!-- #include/g' {} +
```

只开某一个页面就对单个文件跑同样的 `sed`。改完要 `bun run build` 并重新部署才在线上生效。

停用期间 `link` 的值是字面串 `<!-- #include file="link.txt" -->`，点 CTA 会跳到一个相对路径 404 —— 和本地 dev 的表现一致，不会再有 JS 语法错误连累页面其他脚本。

> `public/mjSFqQ/QvBmKz.js:353` 里还有一处 `<!--#include`，那是行文档注释，且 `ssi_types text/html` 不处理 `.js`，无需改动。

## Landing Page Gallery（落地页预览）

一个页面平铺所有落地页的缩略图，用来挑版式。本地 **`http://localhost:4321/_gallery/index.html`**（`bun dev` 下；public 目录的静态页在 dev 必须带 `index.html`）。

- **线上入口目前是撤下状态**。生产服务器的 nginx **没有配 PHP**，`.php` 会被当普通文件原样返回 —— 之前那版 `index.php` 密码门因此把 853KB 源码（含明文密码与全部落地页路径）公开可下载，已用无害占位覆盖。`scripts/gallery/bundle.mjs` 现在默认不生成该文件，需要 `GALLERY_PHP=1` 显式开启，**开启前务必先确认服务器真的会执行 PHP**（`curl -I` 看 `content-type` 是不是 `text/html`）。
  重新上线的候选：Cloudflare Access 保护纯静态页 / 服务器开 PHP / 不可猜路径。
- **按版式去重**：5000+ 条 URL 折叠成约 450 张卡片（一个源模板 = 一张卡），卡片里可下拉切换到具体人物/渠道的真实 URL，并直接复制生产链接。
- **截图是缓存层**：没截到或已过期的卡片自动回落成实时 iframe，所以新页面永远不会从画廊里消失。
- **新增页面无需任何登记**：`bun run build` 已经串了索引重建，构建完卡片就在。想要静态缩略图再跑 `bun run gallery:shots`（增量，按产物 HTML 的内容指纹判断，通常几十秒）。

| 命令 | 作用 |
|------|------|
| `bun run gallery` | 构建 + 重建索引 + 增量截图（首次全量约 6 分钟） |
| `bun run gallery:scan` | 只重建索引（秒级） |
| `bun run gallery:shots` | 只增量截图 |

实现：`scripts/gallery/scan.mjs`（以 `dist/` 产物为权威 URL 清单，用 `src/pages` 的源文件把 URL 折叠回模板）、`scripts/gallery/shoot.mjs`（Playwright 390×844 手机视口，**截图前必须滚一遍整页**否则 `.reveal` 元素会截成空白）、`public/_gallery/index.html`（画廊页本体，客户端 fetch 索引渲染）。

**KR 有两套并存的路由体系**（V1 中文渠道名 `卡扣/棒群`，V2 英文 routeId `kakao/band`），产出的 URL 形态一模一样。`scan.mjs` 里的 `REFINE` 表用取值域约束区分二者，并把 V2 那个「一个入口分派到 sinmun/gyeonggi/zen 三套模板」的页面按 campaignId 拆成各自的卡片。新增同类分派入口时在那张表里加一条。

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
