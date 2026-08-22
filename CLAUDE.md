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
5. **母语者审查（每次开发完落地页必做）**：**每做完一个落地页**，都要单独开启一个 agent，扮演**目标市场的母语文案 + 普通用户**双视角，按上述创译规则做朗读测试 + 地道度打分 + 改写，确保没有任何"当地人看了会觉得别扭"的文案，再定稿。

## 落地页制作默认规范 (Landing Page Defaults)

1. **移动端优先 (Mobile-first)**：落地页流量主要来自手机（FB / 社群投放），**一律以手机视口为第一优先**做设计与验证——先把手机版（~390px 宽）排好、用手机宽度截图确认无误，桌面端只做响应式适配。验收时**先看手机端**。CSS **必须真正 mobile-first**：基础样式（无媒体查询）就是手机布局，用 `@media (min-width: …)` **渐进增强**到平板 / 桌面；**禁止** desktop-first 的 `max-width` 降级写法。
2. **默认不放导航栏**：制作落地页**默认不要顶部导航栏 / header nav**（也不要伪装成报头 / masthead 的顶部 bar）——落地页是单一转化目标，导航会分散注意力、提供逃逸出口。除非用户明确要求才加。
3. **不用遮挡内容的浮动卡片 / badge (No floating overlay cards)**：**禁止**在图片或内容上叠加 `position:absolute` 的浮动卡片 / badge / chip（如 hero 图上的"已发布 / brief posted"浮窗、人物照上的数据 badge、手机图旁的悬浮数据 chip、float-chip 等）——它们遮挡主体、显廉价、且 FB Pixel 难归因点击。信息一律走**正常文档流**呈现，不要浮层遮挡。（底部 sticky CTA 栏不算，它不遮挡主体内容 — 见 [[feedback_floating_cta_must_have_real_size]]。）
4. **不使用"一眼假"的示例 / 占位 / 演示数据 (No obviously-fake sample data)**：禁止任何**一看就假、明显是占位 / 演示性质**的内容——如带 `sample / demo / 示例 / XXX` 标记的卡片、占位行情演示（`STI ▲ open`）、配大问号的"神秘股"、Lorem 占位文本、明显摆拍的演示截图。**但做得真实、可信、合理的营销内容是允许的**（如社会证明的成员数、用户评价、活跃感等）——只要读起来像真的、合理可信，不是"一眼假"的演示样本（结合 [[feedback_skip_compliance_max_ctr]]：用户要最大化 CTR、有内部合规团队兜底）。需要视觉锚点时优先用 gpt-image 真实配图或真实描述性内容。
5. **每次开发完必跑文案审查**：见上方 Copywriting Quality 第 5 条——每做完一个落地页都要单独开 agent 做母语者创译审查，杜绝当地人看着别扭的文案。
6. **每次改动落地页必输出页面链接 (Always output page links)**：**每次修改或新增落地页后**，都必须向用户输出该页面的访问链接，且**本地链接与生产链接分两行、分开输出**：
   - **本地**：`http://localhost:4321/<页面路径>`
   - **生产**：`https://t.dd-ll.xyz/<页面路径>`
   - 两者**路径部分完全相同**，仅域名不同；生产域名固定为 `t.dd-ll.xyz`。一个页面有多个渠道 / 变体时，每个都各给一对（本地 + 生产）链接。
   - 示例（柳秀真卡群版）：本地 `http://localhost:4321/KR/柳秀真/20260621-1.0.卡群`、生产 `https://t.dd-ll.xyz/KR/柳秀真/20260621-1.0.卡群`。

7. **静态资源一律走构建管线、输出带 `mjSFqQ/` 前缀 (All static assets under mjSFqQ/)**：落地页的图片 / 字体等自托管静态资源，**构建输出后必须落在 `mjSFqQ/` 前缀下**（由 `astro.config.mjs` 的 `build.assets: "mjSFqQ"` 决定）。做法：资源放 **`src/`** 下（推荐页面同级 `images/` 子目录），在 frontmatter 用 `import` 引入，再用 `<Image>` 或 `图片.src` 渲染 `<img>`；CSS 背景图用 `import bg from './images/x.jpg'` + `<style define:vars={{ bgUrl: \`url(${bg.src})\` }}>` → `background-image: var(--bgUrl)`。**禁止**把落地页资源放 `public/` 根再用 `/HK/images/x.png` 这类绝对路径引用——`public/` 文件会原样复制到站点根、**不带 `mjSFqQ` 前缀**（如 `/HK/images/x.png`），不符合要求。

8. **滚动入场动画只用这一份实现 (Scroll reveal — use this exact snippet)**：用原生 `scroll` + `getBoundingClientRect`，**不要 IntersectionObserver、不要 GSAP ScrollTrigger**（两者在本项目都出过「内容不显示」的事故）。**照抄下面这段，不要自己改判断条件**：

   ```js
   ;(function () {
     var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'))
     if (!items.length) return

     function tick() {
       var vh = window.innerHeight || document.documentElement.clientHeight
       for (var i = items.length - 1; i >= 0; i--) {
         // 只判断 top，绝不能加 r.bottom > 0
         if (items[i].getBoundingClientRect().top < vh - 60) {
           items[i].classList.add('in')
           items.splice(i, 1)
         }
       }
       if (!items.length) {
         window.removeEventListener('scroll', tick)
         window.removeEventListener('resize', tick)
       }
     }

     window.addEventListener('scroll', tick, { passive: true })
     window.addEventListener('resize', tick)
     tick()
     setTimeout(tick, 300) // 字体/图片加载后布局位移的兜底
   })()
   ```

   - **绝对不能写 `if (r.top < vh - 60 && r.bottom > 0)`**。加上 `r.bottom > 0` 后，只要元素被**整段快速跳过**（手机甩动惯性滚动、刷新后浏览器恢复滚动位置、锚点跳转），它就永远不会被标记 `in`，**永久停在 `opacity: 0`**——用户看到大片空白，卖点直接消失。2026-08-09 全仓 7 个 SG 通版页都中过这个招。
   - 元素清空后必须 `removeEventListener`；必须有 `setTimeout(tick, 300)` 兜底。
   - **首屏内容不得纯靠 JS 才显示**：`.reveal { opacity: 0 }` 只在 `<html class="js">` 下生效（head 里 `document.documentElement.classList.add('js')`），JS 挂了页面仍要完整可读。
   - `@media (prefers-reduced-motion: reduce)` 下把 `.reveal` 直接置为 `opacity: 1; transform: none`。

> **开工前 + 验收时务必把以上 1–8 逐条当 checklist 过一遍**，不要凭设计惯性跳过。
