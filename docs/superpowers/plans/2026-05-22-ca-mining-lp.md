# CA Mining Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现 TSX-V Insider 加拿大矿业资讯订阅落地页，发布到 `src/pages/CA/20260522-1.0/index.astro`，按金矿黑金 FOMO 风格呈现，配套 3 张 GPT 生成图片。

**Architecture:** 单文件 Astro 页面 + 同级 `images/` 资源目录；复用项目 `BaseLayout`；样式全部内联 `<style is:global>`；零外部 JS 依赖（仅原生 ticker / countdown / reveal）；CTA 走 `.link-btn` 由 `main.js` 自动挂 `mixinJump`。

**Tech Stack:** Astro 5 / Tailwind 4 (按需) / 内联 CSS / 原生 JS / Bun / gpt-image skill。

**Spec:** `docs/superpowers/specs/2026-05-22-ca-mining-lp-design.md`

**测试策略:** 用户指定"无须测试"。每个区块完成后用 `bun dev` 浏览器肉眼验证，整体完成后跑 `bun build` + `bunx astro check`。

---

## Task 1: 生成视觉资源（GPT-Image）

**Files:**
- Create: `src/pages/CA/20260522-1.0/images/logo.svg`（或 logo.png 兜底）
- Create: `src/pages/CA/20260522-1.0/images/hero-bg.jpg`
- Create: `src/pages/CA/20260522-1.0/images/og-share.png`

- [ ] **Step 1.1: 创建图片目录**

```bash
mkdir -p src/pages/CA/20260522-1.0/images
```

- [ ] **Step 1.2: 用 gpt-image skill 生成 LOGO**

调用 `gpt-image` skill，prompt:

```
Wordmark logo for "TSX-V INSIDER", premium financial newsletter brand.
Bold uppercase sans-serif (similar to Bebas Neue or Impact), polished gold
metallic gradient (#FFD700 to #C8941F), subtle thin maple leaf icon on the
left side as accent (silhouette only, no detail), transparent background,
horizontal layout. Clean, editorial, professional. No emoji, no shadow,
no glow. Output as transparent PNG, 480x120 px, high contrast.
Save to: src/pages/CA/20260522-1.0/images/logo.png
```

如生成的是 PNG，记下路径用 PNG；如能拿到矢量 SVG 更佳。

- [ ] **Step 1.3: 用 gpt-image skill 生成 Hero 背景**

调用 `gpt-image` skill，prompt:

```
Aerial cinematic photograph of a Canadian Shield mining site at golden hour,
dusk lighting, dark moody atmosphere. Open pit gold/copper mine with terraced
benches, haul trucks visible as small dots, surrounding rocky landscape and
sparse boreal forest. Color palette: deep charcoal blacks, warm golden
highlights on rock faces, hints of bronze/copper tones. Cinematic 4K, soft
warm rim light, slight golden haze. No people, no logos, no text.
Save to: src/pages/CA/20260522-1.0/images/hero-bg.jpg
Size: 2400x1600 px.
```

- [ ] **Step 1.4: 用 gpt-image skill 生成 OG 分享图**

调用 `gpt-image` skill，prompt:

```
Open Graph share image for "TSX-V INSIDER" financial newsletter. Dark
background (#0E0E12) with subtle gold radial glow top-left. Large gold
gradient wordmark "TSX-V INSIDER" centered, with subtitle "Canada's Mining
Intelligence Briefing" in white below. Faint background texture of mining
imagery (rock strata) at 15% opacity. Editorial, premium, FOMO-friendly.
Save to: src/pages/CA/20260522-1.0/images/og-share.png
Size: 1536x1024 px.
```

- [ ] **Step 1.5: 验证三张图存在**

```bash
ls -la src/pages/CA/20260522-1.0/images/
```

Expected: 看到 logo.(svg|png) / hero-bg.jpg / og-share.png 三个文件。

- [ ] **Step 1.6: Commit**

```bash
git add src/pages/CA/20260522-1.0/images/
git commit -m "add visual assets for CA mining LP (logo, hero bg, og)"
```

---

## Task 2: 创建 index.astro 骨架（frontmatter + BaseLayout + 基础样式）

**Files:**
- Create: `src/pages/CA/20260522-1.0/index.astro`

- [ ] **Step 2.1: 创建 index.astro 写入骨架**

注意：如 Task 1 生成的 logo 是 PNG，把 `logo.svg` 改成 `logo.png`。

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro'
import logo from './images/logo.png'
import heroBg from './images/hero-bg.jpg'
import ogImage from './images/og-share.png'

const title = 'TSX-V Insider · Canadian Mining Intel — Free Weekly Briefing'
const description = 'Get the insider list of TSX-V junior miners. Weekly briefing on gold, uranium, silver & copper stocks. Free access for Canadian investors.'
---

<BaseLayout title={title} description={description} lang="en">
  <Fragment slot="head">
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage.src} />
    <meta property="og:image:width" content="1536" />
    <meta property="og:image:height" content="1024" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={ogImage.src} />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />

    <style is:global>
      :root {
        --bg-deep:        #0E0E12;
        --bg-elevated:    #16161D;
        --text-primary:   #F5F5F7;
        --text-secondary: #A8AAB3;
        --text-muted:     #6E707A;
        --gold-bright:    #FFD700;
        --gold:           #D4AF37;
        --gold-deep:      #C8941F;
        --gold-dim:       #8C6F1F;
        --maple-red:      #C8102E;
        --alert-red:      #E11D2A;
        --rule:           rgba(212, 175, 55, 0.14);
        --rule-strong:    rgba(212, 175, 55, 0.3);
        --font-display:   'Bebas Neue', 'Impact', sans-serif;
        --font-body:      'Inter', system-ui, sans-serif;
        --container-max:  1200px;
      }
      *, *::before, *::after { box-sizing: border-box; }
      html, body {
        margin: 0; padding: 0;
        background: var(--bg-deep);
        color: var(--text-primary);
        font-family: var(--font-body);
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
      }
      a { color: inherit; text-decoration: none; }
      button { font-family: inherit; cursor: pointer; }
      .container {
        max-width: var(--container-max);
        margin: 0 auto;
        padding: 0 2rem;
      }
      @media (max-width: 768px) {
        .container { padding: 0 1.25rem; }
      }
    </style>
  </Fragment>

  <!-- 区块占位，后续 Task 填充 -->
  <main>
    <!-- [0] BREAKING TOP BAR (Task 3) -->
    <!-- [1] HERO (Task 4-7) -->
    <!-- [2] TRUST STRIP (Task 8) -->
    <!-- [3] FOOTER (Task 9) -->
  </main>
</BaseLayout>
```

- [ ] **Step 2.2: 启动 dev server 验证骨架可加载**

```bash
bun dev
```

浏览器访问 `http://localhost:4321/CA/20260522-1.0/`，确认：
- 页面 200 加载，无控制台报错
- 浏览器标签标题显示 "TSX-V Insider · Canadian Mining Intel..."
- 页面是纯黑色背景（因为还没有内容）

- [ ] **Step 2.3: Commit**

```bash
git add src/pages/CA/20260522-1.0/index.astro
git commit -m "scaffold CA mining LP page with base layout"
```

---

## Task 3: BREAKING 顶条 + Ticker 滚动动画

**Files:**
- Modify: `src/pages/CA/20260522-1.0/index.astro`

- [ ] **Step 3.1: 追加 Breaking 顶条样式**

在 `<style is:global>` 内追加（接在 `.container` 媒体查询后）：

```css
.breaking-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 36px;
  background: var(--alert-red);
  color: #fff;
  display: flex;
  align-items: center;
  overflow: hidden;
  font-family: var(--font-body);
}
.breaking-bar .badge {
  flex-shrink: 0;
  padding: 0 12px 0 16px;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-left: 4px solid #fff;
  margin-left: 0;
  height: 100%;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.18);
}
.breaking-bar .ticker-wrap {
  flex: 1;
  overflow: hidden;
  position: relative;
  height: 100%;
}
.breaking-bar .ticker {
  position: absolute;
  white-space: nowrap;
  animation: ticker 22s linear infinite;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.03em;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 16px;
}
@keyframes ticker {
  from { transform: translate(100%, -50%); }
  to   { transform: translate(-100%, -50%); }
}
@media (max-width: 480px) {
  .breaking-bar { height: 32px; }
  .breaking-bar .badge { font-size: 11px; padding: 0 8px 0 12px; }
  .breaking-bar .ticker { font-size: 12px; }
}
```

- [ ] **Step 3.2: 在 `<main>` 内插入 Breaking 顶条 HTML**

替换 `<!-- [0] BREAKING TOP BAR (Task 3) -->` 注释为：

```astro
<div class="breaking-bar" role="region" aria-label="Breaking news">
  <div class="badge">Breaking</div>
  <div class="ticker-wrap">
    <div class="ticker">
      TSX-V Uranium Index +340% YTD &nbsp;·&nbsp; May 22, 2026 &nbsp;·&nbsp;
      Junior miners hitting new highs this week &nbsp;·&nbsp;
      Gold spot above $2,400/oz &nbsp;·&nbsp; Copper supply tightening
    </div>
  </div>
</div>
```

- [ ] **Step 3.3: 浏览器验证**

刷新 `http://localhost:4321/CA/20260522-1.0/`，确认：
- 顶部出现红色横条
- 左侧白色竖线 + "BREAKING" 大写徽章
- 右侧文字从右往左循环滚动
- 移动端宽度 (DevTools 模拟 375px) 顶条高度变 32px，字号变小但仍可读

- [ ] **Step 3.4: Commit**

```bash
git add src/pages/CA/20260522-1.0/index.astro
git commit -m "add breaking top bar with ticker animation"
```

---

## Task 4: Hero 区域 — 舞台背景 + LOGO + 主副标题

**Files:**
- Modify: `src/pages/CA/20260522-1.0/index.astro`

- [ ] **Step 4.1: 追加 Hero 舞台 + 标题样式**

```css
.hero-stage {
  position: relative;
  min-height: calc(100vh - 36px);
  padding: 48px 0 64px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background:
    radial-gradient(ellipse 900px 500px at 20% 20%, rgba(255, 215, 0, 0.12), transparent 65%),
    radial-gradient(ellipse 800px 400px at 85% 75%, rgba(200, 16, 46, 0.08), transparent 60%),
    linear-gradient(180deg, var(--bg-deep) 0%, #050507 100%);
}
.hero-stage::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: var(--hero-bg-url);
  background-size: cover;
  background-position: center;
  opacity: 0.18;
  mix-blend-mode: luminosity;
  pointer-events: none;
}
.hero-stage > .container {
  position: relative;
  z-index: 1;
}
.hero-header {
  margin-bottom: 64px;
}
.hero-header .logo {
  height: 48px;
  width: auto;
  display: block;
}
.hero-title {
  font-family: var(--font-display);
  font-size: clamp(48px, 8vw, 88px);
  line-height: 0.92;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  margin: 0;
  color: var(--text-primary);
}
.hero-title .gold {
  background: linear-gradient(135deg, #FFD700 0%, #FFEC8B 50%, #C8941F 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  /* fallback */
  color: var(--gold);
}
.hero-subtitle {
  margin: 32px 0 0;
  font-size: clamp(18px, 2.2vw, 28px);
  font-weight: 500;
  line-height: 1.35;
  color: var(--text-secondary);
  letter-spacing: -0.01em;
  max-width: 720px;
}
@media (max-width: 768px) {
  .hero-stage { padding: 32px 0 48px; min-height: auto; }
  .hero-header { margin-bottom: 40px; }
  .hero-header .logo { height: 36px; }
  .hero-subtitle { margin-top: 20px; }
}
```

- [ ] **Step 4.2: 把 hero-bg 路径通过 CSS 变量注入**

在 `<style>` 标签之外（紧跟 `</Fragment>` 之前的 head slot 内），添加一个内联 style 注入 CSS 变量：

```astro
    <style define:vars={{ heroBgUrl: `url('${heroBg.src}')` }}>
      .hero-stage { --hero-bg-url: var(--heroBgUrl); }
    </style>
```

（Astro 的 `define:vars` 把 frontmatter import 的图片路径传给 CSS）

- [ ] **Step 4.3: 在 `<main>` 内插入 Hero 区域骨架**

替换 `<!-- [1] HERO (Task 4-7) -->` 为：

```astro
<section class="hero-stage">
  <div class="container">
    <header class="hero-header">
      <img src={logo.src} alt="TSX-V Insider" class="logo" />
    </header>

    <h1 class="hero-title">
      The Next Canadian Mining<br/>
      <span class="gold">Boom Is Already Underway.</span>
    </h1>

    <p class="hero-subtitle">
      Are you on the inside — or watching from outside?
    </p>

    <!-- Benefits 卡片 (Task 5) -->
    <!-- CTA 按钮 (Task 6) -->
    <!-- 紧迫感 + 倒计时 (Task 7) -->
  </div>
</section>
```

- [ ] **Step 4.4: 浏览器验证**

刷新页面，确认：
- 顶条下方出现 Hero 区域，撑满首屏
- 暗色背景 + 金色辐射光晕 + Hero 背景图肌理
- LOGO 显示在左上
- 巨大白色标题 "THE NEXT CANADIAN MINING" + 第二行金色渐变 "BOOM IS ALREADY UNDERWAY."
- 副标题灰色 "Are you on the inside — or watching from outside?"
- 桌面 1440 / 移动 375 都正常排版

- [ ] **Step 4.5: Commit**

```bash
git add src/pages/CA/20260522-1.0/index.astro
git commit -m "add hero stage with logo, headline, subtitle"
```

---

## Task 5: Benefits 卡片（3 利益点 + SVG 对勾）

**Files:**
- Modify: `src/pages/CA/20260522-1.0/index.astro`

- [ ] **Step 5.1: 追加 Benefits 样式**

```css
.benefits {
  margin: 48px 0 0;
  max-width: 640px;
  background: var(--bg-elevated);
  border: 1px solid var(--rule);
  border-radius: 20px;
  padding: 28px 32px;
  backdrop-filter: blur(8px);
}
.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 10px 0;
  font-size: 18px;
  line-height: 1.5;
  color: var(--text-primary);
}
.benefit-item + .benefit-item {
  border-top: 1px solid var(--rule);
  margin-top: 4px;
  padding-top: 14px;
}
.benefit-item strong {
  color: var(--gold-bright);
  font-weight: 700;
}
.benefit-check {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  margin-top: 2px;
}
@media (max-width: 768px) {
  .benefits { padding: 22px 20px; margin-top: 32px; }
  .benefit-item { font-size: 16px; gap: 12px; }
  .benefit-check { width: 20px; height: 20px; }
}
```

- [ ] **Step 5.2: 插入 Benefits HTML**

替换 `<!-- Benefits 卡片 (Task 5) -->` 为：

```astro
<div class="benefits">
  <div class="benefit-item">
    <svg class="benefit-check" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7" stroke="#FFD700" stroke-width="2.5"
            fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span>Junior miners delivering <strong>10X moves</strong> this quarter — see who's next</span>
  </div>
  <div class="benefit-item">
    <svg class="benefit-check" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7" stroke="#FFD700" stroke-width="2.5"
            fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span>Weekly intel: <strong>gold &middot; uranium &middot; silver &middot; copper</strong></span>
  </div>
  <div class="benefit-item">
    <svg class="benefit-check" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7" stroke="#FFD700" stroke-width="2.5"
            fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span>Joined by <strong>14,287 Canadian investors</strong> this month alone</span>
  </div>
</div>
```

- [ ] **Step 5.3: 浏览器验证**

刷新，确认：
- 副标题下方出现暗灰色圆角卡片
- 三条利益点，每条左侧金色 SVG 对勾
- "10X moves"、"gold · uranium · silver · copper"、"14,287 Canadian investors" 加粗显示为亮金色
- 卡片之间有金色细分隔线
- 移动端卡片自适应宽度，文字仍可读

- [ ] **Step 5.4: Commit**

```bash
git add src/pages/CA/20260522-1.0/index.astro
git commit -m "add benefits card with svg checkmarks"
```

---

## Task 6: CTA 主按钮（金渐变 + hover 发光）

**Files:**
- Modify: `src/pages/CA/20260522-1.0/index.astro`

- [ ] **Step 6.1: 追加 CTA 样式**

```css
.cta-row {
  margin: 40px 0 0;
}
.cta-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 22px 48px;
  font-family: var(--font-display);
  font-size: 24px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #0E0E12;
  background: linear-gradient(180deg, #FFD700 0%, #C8941F 100%);
  border: none;
  border-radius: 12px;
  box-shadow:
    0 10px 40px rgba(255, 215, 0, 0.35),
    0 4px 12px rgba(255, 215, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all .25s cubic-bezier(.22, 1, .36, 1);
  text-decoration: none;
}
.cta-primary:hover {
  transform: translateY(-2px) scale(1.015);
  box-shadow:
    0 14px 56px rgba(255, 215, 0, 0.55),
    0 6px 20px rgba(255, 215, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}
.cta-primary .arrow {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 22px;
  margin-left: 4px;
}
@media (max-width: 768px) {
  .cta-row { margin-top: 32px; }
  .cta-primary {
    width: 100%;
    padding: 18px 24px;
    font-size: 20px;
  }
}
```

- [ ] **Step 6.2: 插入 CTA HTML**

替换 `<!-- CTA 按钮 (Task 6) -->` 为：

```astro
<div class="cta-row">
  <a class="cta-primary link-btn" href="#">
    Yes — Send Me The Insider List
    <span class="arrow">&rarr;</span>
  </a>
</div>
```

注意：`link-btn` class 让项目 `src/utils/main.js` 自动挂 `mixinJump`。`href="#"` 是占位，运营在 `mixinJump` 配置中接入真实跳转。

- [ ] **Step 6.3: 浏览器验证**

刷新，确认：
- Benefits 卡片下方出现金色渐变大按钮
- 文字 "YES — SEND ME THE INSIDER LIST →" 黑字大写
- 鼠标悬停时按钮上移 + 金色发光扩散
- 移动端按钮全宽

- [ ] **Step 6.4: Commit**

```bash
git add src/pages/CA/20260522-1.0/index.astro
git commit -m "add cta primary button with gold gradient and hover glow"
```

---

## Task 7: 紧迫感小字 + 倒计时 JS

**Files:**
- Modify: `src/pages/CA/20260522-1.0/index.astro`

- [ ] **Step 7.1: 追加紧迫感样式**

```css
.urgency {
  margin: 20px 0 0;
  display: inline-block;
  padding: 6px 0 6px 12px;
  border-left: 3px solid var(--alert-red);
  color: var(--alert-red);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.02em;
}
@media (max-width: 768px) {
  .urgency { font-size: 13px; }
}
```

- [ ] **Step 7.2: 插入紧迫感 HTML**

替换 `<!-- 紧迫感 + 倒计时 (Task 7) -->` 为：

```astro
<p class="urgency" id="urgency">
  Free access closes tonight at midnight EST
</p>
```

- [ ] **Step 7.3: 在文件底部（`</BaseLayout>` 之前）追加倒计时脚本**

```astro
<script>
  // 倒计时到当日午夜（用户本地时区），每秒更新 #urgency 文案
  function updateUrgency() {
    const el = document.getElementById('urgency');
    if (!el) return;

    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    const diffMs = endOfDay.getTime() - now.getTime();

    if (diffMs <= 0) {
      el.textContent = 'Free access closes today';
      return;
    }

    const h = Math.floor(diffMs / 3.6e6);
    const m = Math.floor((diffMs % 3.6e6) / 6e4);
    const s = Math.floor((diffMs % 6e4) / 1000);
    const pad = (n) => String(n).padStart(2, '0');

    el.textContent = `Free access closes in ${pad(h)}h ${pad(m)}m ${pad(s)}s`;
  }
  updateUrgency();
  setInterval(updateUrgency, 1000);
</script>
```

注意：使用浏览器本地时间到当日午夜的剩余时间，不严格按 EST；这对 FOMO 紧迫感效果一致且无时区相关 bug。Astro 默认会处理 TS，但本片段是纯 JS（无类型注解），避免构建期类型问题。

- [ ] **Step 7.4: 浏览器验证**

刷新，确认：
- CTA 下方红色文字 "Free access closes in HHh MMm SSs"
- 左侧 3px 红竖线
- 数字每秒递减
- 移动端字号更小但保留红色竖线

- [ ] **Step 7.5: Commit**

```bash
git add src/pages/CA/20260522-1.0/index.astro
git commit -m "add urgency line with live countdown"
```

---

## Task 8: Trust Strip（4 个 SVG 图标 + 文字 + 金色短横线）

**Files:**
- Modify: `src/pages/CA/20260522-1.0/index.astro`

- [ ] **Step 8.1: 追加 Trust Strip 样式**

```css
.trust-strip {
  background: var(--bg-deep);
  padding: 48px 0;
  border-top: 1px solid var(--rule);
}
.trust-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}
.trust-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
}
.trust-item::before {
  content: '';
  display: block;
  width: 24px;
  height: 2px;
  background: var(--gold);
  margin-bottom: 4px;
}
.trust-item svg {
  width: 20px;
  height: 20px;
  color: var(--gold);
}
.trust-item .label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  letter-spacing: 0.02em;
}
.trust-item .value {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}
@media (max-width: 768px) {
  .trust-strip { padding: 32px 0; }
  .trust-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
}
```

- [ ] **Step 8.2: 插入 Trust Strip HTML**

替换 `<!-- [2] TRUST STRIP (Task 8) -->` 为：

```astro
<section class="trust-strip">
  <div class="container">
    <div class="trust-grid">
      <div class="trust-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             aria-hidden="true">
          <path d="M3 3v18h18"/>
          <path d="M7 14l4-4 4 4 6-6"/>
        </svg>
        <div class="value">12,000+</div>
        <div class="label">subscribers</div>
      </div>
      <div class="trust-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             aria-hidden="true">
          <path d="M12 22s-7-6-7-12a7 7 0 0114 0c0 6-7 12-7 12z"/>
          <circle cx="12" cy="10" r="2.5"/>
        </svg>
        <div class="value">Toronto</div>
        <div class="label">Canada</div>
      </div>
      <div class="trust-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             aria-hidden="true">
          <path d="M3 21l6-6"/>
          <path d="M14 7l3-3 4 4-3 3"/>
          <path d="M14 7l-9 9 4 4 9-9"/>
        </svg>
        <div class="value">TSX &amp; TSX-V</div>
        <div class="label">coverage</div>
      </div>
      <div class="trust-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2"/>
          <path d="M3 7l9 6 9-6"/>
        </svg>
        <div class="value">Weekly</div>
        <div class="label">briefing</div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 8.3: 浏览器验证**

刷新并往下滚，确认：
- Hero 下方出现 4 列等宽条目
- 每条目顶部一条 24×2 金色短横线
- 短横线下方金色 SVG 图标（柱状图/地标/锹/信封）
- 图标下方白色粗数值 + 灰色小标签
- 移动端切换为 2×2 网格

- [ ] **Step 8.4: Commit**

```bash
git add src/pages/CA/20260522-1.0/index.astro
git commit -m "add trust strip with svg icons and gold accents"
```

---

## Task 9: Footer + 免责声明

**Files:**
- Modify: `src/pages/CA/20260522-1.0/index.astro`

- [ ] **Step 9.1: 追加 Footer 样式**

```css
.site-footer {
  padding: 32px 0 40px;
  background: #050507;
  border-top: 1px solid var(--rule);
}
.site-footer p {
  margin: 4px 0;
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.6;
  text-align: center;
}
@media (max-width: 768px) {
  .site-footer p { font-size: 11px; }
}
```

- [ ] **Step 9.2: 插入 Footer HTML**

替换 `<!-- [3] FOOTER (Task 9) -->` 为：

```astro
<footer class="site-footer">
  <div class="container">
    <p>&copy; 2026 TSX-V Insider &middot; For informational purposes only.</p>
    <p>Not investment advice. Past performance does not guarantee future results.</p>
  </div>
</footer>
```

- [ ] **Step 9.3: 浏览器验证**

刷新，滚到最底部，确认：
- Trust strip 下方出现极简 Footer
- 两行小灰字版权 + 免责声明
- 居中对齐

- [ ] **Step 9.4: Commit**

```bash
git add src/pages/CA/20260522-1.0/index.astro
git commit -m "add footer with copyright and disclaimer"
```

---

## Task 10: Reveal 进场动画（IntersectionObserver）

**Files:**
- Modify: `src/pages/CA/20260522-1.0/index.astro`

- [ ] **Step 10.1: 追加 reveal 样式**

```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity .8s cubic-bezier(.22, 1, .36, 1),
              transform .8s cubic-bezier(.22, 1, .36, 1);
}
.reveal.active {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

- [ ] **Step 10.2: 给 Hero 内的关键元素加 `reveal` class**

修改已有 HTML：
- `<h1 class="hero-title">` → `<h1 class="hero-title reveal">`
- `<p class="hero-subtitle">` → `<p class="hero-subtitle reveal">`
- `<div class="benefits">` → `<div class="benefits reveal">`
- `<div class="cta-row">` → `<div class="cta-row reveal">`

- [ ] **Step 10.3: 在底部 script 中追加 IntersectionObserver**

在 Task 7 那个 `<script>` 标签里，倒计时函数之后追加：

```javascript
  // Reveal 进场动画
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // 错开 80ms 节奏出现
          setTimeout(() => entry.target.classList.add('active'), idx * 80);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('active'));
  }
```

- [ ] **Step 10.4: 浏览器验证**

强刷页面（Cmd+Shift+R），确认：
- 进入页面时 Hero 的 H1 → 副标题 → Benefits → CTA 依次淡入上浮（80ms 错峰）
- 滚动到 trust strip 时（如果有加 reveal）也淡入（本任务未给 trust 加）
- 系统设置 reduce motion 时元素立即可见

- [ ] **Step 10.5: Commit**

```bash
git add src/pages/CA/20260522-1.0/index.astro
git commit -m "add reveal entrance animations with intersectionobserver"
```

---

## Task 11: 最终验证 + 移动端整体回看

**Files:** 无修改，只验证。

- [ ] **Step 11.1: 桌面端完整通览**

`bun dev`，浏览器访问 `http://localhost:4321/CA/20260522-1.0/`，按以下尺寸截图肉眼对比 spec：
- 1920 × 1080
- 1440 × 900
- 1280 × 800

检查清单：
- [ ] 顶条 ticker 流畅滚动，BREAKING 徽章清晰
- [ ] Hero 首屏 100vh 撑满，背景肌理柔和
- [ ] LOGO 显示无失真
- [ ] H1 金渐变高亮在第二行
- [ ] Benefits 卡片 3 条对勾金色
- [ ] CTA hover 时金色发光扩散
- [ ] 倒计时秒数实时跳动
- [ ] Trust strip 4 列等宽，图标金色
- [ ] Footer 居中小字

- [ ] **Step 11.2: 移动端 (Chrome DevTools) 完整通览**

切换 DevTools 设备：
- iPhone SE 375 × 667
- iPhone 13 Pro 390 × 844
- iPhone 13 Pro Max 428 × 926

检查清单：
- [ ] 无横向滚动
- [ ] 顶条 32px 高，文字可读
- [ ] H1 自适应到 ~52px，未溢出
- [ ] Benefits 卡片全宽，对勾尺寸合适
- [ ] CTA 全宽，可点
- [ ] Trust strip 切换为 2×2 网格
- [ ] Footer 文字 11px 仍清晰

- [ ] **Step 11.3: 类型检查 + 构建**

```bash
bunx astro check
```

Expected：0 errors。如有 type warning，按需处理。

```bash
bun build
```

Expected：构建成功，输出到 `dist/`。检查：

```bash
ls -la dist/CA/20260522-1.0/
```

Expected：看到 `index.html`，且 `dist/mjSFqQ/` 下有处理后的图片资源。

- [ ] **Step 11.4: 最终 Commit（如有调试修改）**

```bash
git add -A
git status
git commit -m "polish CA mining LP final pass" || echo "nothing to commit"
```

---

## 自审清单（实施完成后）

- [ ] 落地页可在 `bun dev` 下访问无 console error
- [ ] 桌面 / 移动端首屏视觉都符合 spec
- [ ] 所有 emoji 已用 SVG / Unicode / 文字徽章替代
- [ ] CTA 使用 `.link-btn` class，可由运营接入 `mixinJump`
- [ ] `bun build` + `bunx astro check` 通过
- [ ] 4 张图片资源（logo / hero-bg / og）齐全且生效
