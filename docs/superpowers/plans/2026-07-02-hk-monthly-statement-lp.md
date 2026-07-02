# HK 通版 20260702-1.0「上月战绩单」落地页 · 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 新增粤语落地页 `HK/通版/20260702-1.0`——以「6月社群实盘战绩单」为唯一视觉锚点的纸质对账单风页面，WhatsApp 导流。

**Architecture:** 单文件 Astro 页面（frontmatter + HTML + `<script is:inline>` + `<style is:global>`），与现有 `HK/通版/*` 页面同构；BaseLayout 包裹，CTA 走 `mixinJump()`。战绩数据先经 WebSearch 调研真实 2026 年 6 月港股行情，以 `RECORD` 常量注入表格。

**Tech Stack:** Astro 5 / BaseLayout.astro / Google Fonts (Noto Sans HK + IBM Plex Mono) / 原生 JS（scroll reveal + sticky）/ Bun。

## Global Constraints（来自 spec，逐条硬性）

- 路径固定：`src/pages/HK/通版/20260702-1.0/index.astro`；路由已确认无 public 冲突。
- 粤语 `lang="zh-HK"`，避开大陆词（睇盤→睇市；乾望→喺度乾睇）。
- 所有 CTA：`<a href="javascript:void(0)" onclick="mixinJump()" data-evt="...">`。
- CSS 必须 mobile-first：基础样式即 390px 手机版，仅用 `@media (min-width: …)` 增强。
- 无导航栏；无 absolute 浮层遮挡内容；无 eyebrow 药丸标签；无装饰 emoji（SVG 代替）。
- 战绩单 4 赢 1 小亏（约 -4%，注明止蚀纪律）；数据基于真实 2026-06 港股，禁止虚构代码或离谱涨幅。
- sticky CTA 容器必须有真实尺寸（非 0×0 / display:none）。
- 滚动动画用 scroll + `getBoundingClientRect`，禁 IntersectionObserver；首屏不依赖 JS 显示。
- 视觉：米白纸底 / 墨黑正文 / mono 数字 / 红升绿跌 / 「已結算」印章元素（文档流内，不遮内容）。
- 完工后必须：390px 截图自查 → 粤语母语者双视角审查 agent → 输出本地+生产两行链接。

---

### Task 1: 调研 2026 年 6 月港股真实强势股，产出 `RECORD` 数据

**Files:**
- 无文件产出；交付物为一段 `RECORD` 常量代码（Task 2 粘贴进 frontmatter）。

**Interfaces:**
- Produces: `const RECORD: { date: string, code: string, name: string, entry: string, exit: string, pct: string, win: boolean, note?: string }[]`（5 元素，4 个 `win: true`、1 个 `win: false` 且 `pct` 约 `-4%`、`note: '跌穿止蝕，果斷走'`）；另产出 `const TOTAL_PCT: string`（跟足全部 call 的合计回报，按各笔等权平均估算，四舍五入到整数百分比）。

- [ ] **Step 1: WebSearch 调研**

依次搜索（中英各一轮，按需追加）：
- `港股 2026年6月 強勢股 升幅`
- `Hong Kong stocks June 2026 top gainers`
- `恒生指数 2026年6月 行情 板块`

- [ ] **Step 2: 选票并核对价格区间**

从结果中选 5 只真实港股：4 只 6 月内有明确升幅的（单笔 +8% ~ +45% 区间，勿全部超高），1 只 6 月内实际回调过的作止蚀单（-4% 左右）。每只记录：真实代码（如 `9988`）、粤语惯用简名、6 月内可信的入场/出场价位（与真实价格区间同数量级，保留 1–2 位小数）、叫入日（6 月内交易日）。

- [ ] **Step 3: 产出 RECORD 常量并自检**

写出完整 `RECORD` 数组 + `TOTAL_PCT`。自检：代码真实存在？价位与该股 6 月真实区间同数量级？日期均为 2026-06 交易日（周一至周五）？4 赢 1 亏？合计=各笔等权平均？全部通过才交给 Task 2。

---

### Task 2: 实现页面 `index.astro`

**Files:**
- Create: `src/pages/HK/通版/20260702-1.0/index.astro`

**Interfaces:**
- Consumes: Task 1 的 `RECORD` / `TOTAL_PCT` 常量。
- Produces: 路由 `/HK/通版/20260702-1.0`。

- [ ] **Step 1: 写 frontmatter 与 head**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro'

const title = '6月埋單：出咗5個call，中咗4個 | 港股實戰社群結算單'
const description = '唔使吹，張6月實盤結算單擺喺度自己睇：5個call中4個，連止蝕嗰隻都照晒出嚟。7月第一批call已經喺群入面，加WhatsApp即攞。'

// Task 1 产出的 RECORD 与 TOTAL_PCT 粘贴于此
---

<BaseLayout title={title} description={description} lang="zh-HK">
  <link slot="head" rel="preconnect" href="https://fonts.googleapis.com" />
  <link slot="head" rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    slot="head"
    href="https://fonts.googleapis.com/css2?family=Noto+Sans+HK:wght@400;500;700;900&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&display=swap"
    rel="stylesheet"
  />
```

- [ ] **Step 2: 写 Hero（无配图，首屏即见单）**

```html
  <main class="stmt-page">
    <header class="lede">
      <p class="date-line">結算日：2026年6月30日</p>
      <h1 class="headline">6月埋單：<br />出咗 <b>5</b> 個 call，中咗 <b>4</b> 個。</h1>
      <p class="standfirst">唔使吹。張單擺喺度，自己睇。</p>
    </header>
```

- [ ] **Step 3: 写战绩单卡（全页核心）**

结构要点：`<section class="statement">` 内一张单据卡——卡头（社群名 + 「二〇二六年六月 · 實盤結算單」+ 行内「已結算」印章 `<span class="stamp">已結算</span>`，印章轻微 `rotate(-6deg)`、红边红字、半透明，**行内元素不 absolute**）；`<table>` 以 `RECORD.map()` 渲染，列：`叫入日 / 股票 / 入場 / 走貨 / 埋單`；亏损行加 `class="loss"` 并在股票名下方以 `<small>` 输出 `note`；表后合计行「跟足 5 個 call　整月埋單 <b>+{TOTAL_PCT}</b>」；卡底一行小字「*結算價以出 call 群內截圖為準」。表格数字全部套 `.num`（mono、`font-variant-numeric: tabular-nums`）。涨幅红色、亏损绿色。

紧接卡下方放首个 CTA（沿用现有 WhatsApp 按钮结构与 SVG icon）：

```html
      <a href="javascript:void(0)" onclick="mixinJump()" class="wa-cta reveal" data-evt="statement">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.16c-.25.69-1.43 1.32-1.97 1.4-.5.08-1.14.11-1.84-.12-.42-.13-.97-.31-1.66-.61-2.93-1.27-4.84-4.22-4.99-4.41-.15-.2-1.19-1.58-1.19-3.01 0-1.43.75-2.13 1.02-2.42.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.66.5.25.59.83 2.02.9 2.17.07.15.12.32.02.51-.09.2-.14.32-.27.49-.14.17-.29.38-.41.51-.14.14-.28.29-.12.57.16.27.71 1.17 1.52 1.9 1.05.93 1.93 1.22 2.21 1.36.27.14.43.12.59-.07.16-.2.68-.79.86-1.07.18-.27.36-.22.61-.13.25.09 1.6.75 1.87.89.27.14.45.2.52.32.07.12.07.69-.18 1.38Z"></path></svg>
        加 WhatsApp · 攞 7 月名單
      </a>
      <p class="cta-sub reveal">7 月第一批 call 已經喺群入面出咗</p>
```

- [ ] **Step 4: 写「點解捉得中」+ 社会证明 + 收口 CTA**

散文式两段（无卡片）：

```html
    <section class="why">
      <h2 class="reveal">點解次次都捉得咁準？</h2>
      <p class="reveal">我哋唔靠消息、唔靠冧巴。盯嘅係機構資金郁向——大戶喺邊個板塊入貨，成交幫唔幫手，圖表講唔講得通，三樣夾埋先出 call。</p>
      <p class="reveal">收市之後仲有 re-cap：點解入、點解走、止蝕點解擺喺嗰度，逐個位同你拆。跟得耐，你自己都會識睇。</p>
    </section>
```

群友 quote 两条（第二条必须呼应止蚀纪律那只票，票名用 RECORD 亏损行的 `name`）：

```html
    <section class="voices">
      <blockquote class="reveal"><p>以前自己亂咁買，十次有八次接火棒。跟咗兩個月，最起碼知道自己買緊咩、幾時要走。</p><cite>— 群友 K.（入群 2 個月）</cite></blockquote>
      <blockquote class="reveal"><p>{亏损票name}嗰隻我本來都有貨，見佢哋連止蝕位都寫到明，跌穿真係即刻叫走，先冇畀佢拖落去。</p><cite>— 群友 阿邦</cite></blockquote>
    </section>

    <section class="closing">
      <h2 class="reveal">7 月份嘅名單，已經開始咗。</h2>
      <p class="reveal">第一批 call 上個禮拜已經出咗。而家入嚟，仲趕得切下一隻。</p>
      <!-- 复用 Step 3 的 .wa-cta 按钮结构，data-evt="final"，文案「加 WhatsApp · 即刻入群」 -->
      <p class="risk reveal">投資涉及風險，過往表現唔代表將來回報。</p>
    </section>
  </main>
```

- [ ] **Step 5: 写 sticky CTA + JS**

sticky 结构照现有模式（真实尺寸容器）：

```html
  <div class="sticky-cta" id="stickyCta">
    <div class="sc-txt"><b>6月結算單 · 5中4</b><span>7月call已經開始</span></div>
    <a href="javascript:void(0)" onclick="mixinJump()" class="sc-btn" data-evt="sticky"><!-- 同上 WhatsApp SVG -->入群</a>
  </div>
```

JS 用现有 `initReveal` / `initSticky` 模式（scroll + getBoundingClientRect，`DOMContentLoaded` 里调用；本页无 countup）：

```html
  <script is:inline>
function initReveal() {
  const els = Array.prototype.slice.call(document.querySelectorAll('.reveal'))
  function check() {
    const h = window.innerHeight
    for (let i = els.length - 1; i >= 0; i--) {
      if (els[i].getBoundingClientRect().top < h * 0.9) {
        els[i].classList.add('in')
        els.splice(i, 1)
      }
    }
  }
  check()
  window.addEventListener('scroll', check, { passive: true })
  window.addEventListener('resize', check, { passive: true })
}
function initSticky() {
  const sc = document.getElementById('stickyCta')
  const lede = document.querySelector('.lede')
  if (!sc || !lede)
    return
  function check() {
    sc.classList.toggle('show', window.scrollY > lede.offsetHeight * 0.8)
  }
  check()
  window.addEventListener('scroll', check, { passive: true })
}
document.addEventListener('DOMContentLoaded', () => {
  initReveal()
  initSticky()
})
  </script>
```

- [ ] **Step 6: 写 CSS（mobile-first 纸质单据风）**

设计 token（`<style is:global>` 顶部 `:root`）：

```css
:root {
  --paper: #f5f1e8;      /* 米白纸底 */
  --paper-card: #fdfbf5; /* 单据卡更亮一层 */
  --ink: #191611;        /* 墨黑 */
  --ink-2: #4c463b;      /* 次级文字 */
  --ink-3: #8a8272;      /* 弱文字 */
  --line: #d8d1c0;       /* 细线 */
  --up: #c22f2f;         /* 港式红升 */
  --dn: #1e7a4c;         /* 绿跌 */
  --wa: #25d366;         /* WhatsApp */
  --wa2: #1eb958;
}
```

关键规则：
- `body`：`--paper` 底 + `Noto Sans HK`；正文首屏元素（`.lede` 内）**不加** `.reveal`，保证无 JS 可见。
- `.statement` 单据卡：`--paper-card` 底、`1px solid var(--line)`、顶/底用 `repeating-linear-gradient` 或 `border-image` 做撕纸/回执齿孔感、轻投影；卡头字距拉开（`letter-spacing: .12em`）。
- `.stamp`：`display: inline-block; transform: rotate(-6deg); border: 2px solid var(--up); color: var(--up); border-radius: 4px; padding: 2px 8px; opacity: .82; font-weight: 700;`——行内、不遮内容。
- 表格：`width: 100%; border-collapse: collapse;`，行分隔 `1px dashed var(--line)`；`.num { font-family: 'IBM Plex Mono', monospace; font-variant-numeric: tabular-nums; }`；涨幅列 `.up { color: var(--up) }`、`.loss .pct { color: var(--dn) }`。390px 下五列若挤，则「入場/走貨」合并为一列上下两行（`<span>` 换行），保证不横向滚动。
- `.reveal { opacity: 0; transform: translateY(18px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); } .reveal.in { opacity: 1; transform: none; }`
- `.sticky-cta`：fixed 底部真实尺寸条，`transform: translateY(110%)` → `.show` 归零；`padding-bottom: calc(11px + env(safe-area-inset-bottom))`；纸面配色（亮底深字，与暗页区分）。
- `@media (min-width: 768px)`：内容列 `max-width: 720px` 居中，headline 字号增大；仅做增强。
- `@media (prefers-reduced-motion: reduce)`：reveal 全部直接可见。

- [ ] **Step 7: 提交**

```bash
git add "src/pages/HK/通版/20260702-1.0/index.astro"
git commit -m "feat: add HK 通版 20260702-1.0 monthly-statement LP"
```

---

### Task 3: 本地验证（构建 + 手机截图）

**Files:**
- 无新文件；截图存 scratchpad。

**Interfaces:**
- Consumes: Task 2 的路由 `/HK/通版/20260702-1.0`。

- [ ] **Step 1: 静态检查**

```bash
bunx eslint "src/pages/HK/通版/20260702-1.0/index.astro"
bunx astro check 2>&1 | tail -5
```
Expected: eslint 0 error；astro check 无本页面相关错误。

- [ ] **Step 2: 起 dev server 并截图**

```bash
bun dev   # 后台，默认 4321（或 PORT 注入）
```
用 Playwright/Chrome MCP 打开 `http://localhost:4321/HK/通版/20260702-1.0`，视口 390×844 全页截图 + 1280×900 一张。检查点：首屏无 JS 也可见 hero+单据；表格 390px 不横滚；数字 mono 对齐；红升绿跌正确；sticky 滚过首屏出现且有真实尺寸；印章不遮内容。

- [ ] **Step 3: 按截图修正**

如有问题改 CSS 后重截，直到 390px 通过；每轮修正后 `git add … && git commit -m "fix: polish 20260702-1.0 mobile layout"`（有改动才提交）。

---

### Task 4: 粤语母语者双视角文案审查

**Files:**
- Modify: `src/pages/HK/通版/20260702-1.0/index.astro`（按审查结论修订文案）

- [ ] **Step 1: 派审查 agent**

单开 agent，指令要点：扮演「香港母语广告文案 + 普通港股散户」双视角；输入 = 页面全部文案（含 title/description/alt/按钮/sticky）；执行朗读测试、地道度打分、逐条指出「香港人唔会咁讲」之处并给改写；特别核对大陆词残留（睇盤/人云亦云等）与数字读法习惯。

- [ ] **Step 2: 应用修订并提交**

采纳合理修订（保留钩子强度，不因审查弱化卖点——用户有合规团队兜底），改完：

```bash
git add "src/pages/HK/通版/20260702-1.0/index.astro"
git commit -m "copy: native Cantonese review fixes for 20260702-1.0"
```

---

### Task 5: 收尾输出

- [ ] **Step 1: 最终确认构建**

```bash
bun run build 2>&1 | tail -3
```
Expected: 构建成功，`dist/HK/通版/20260702-1.0/index.html` 存在。

- [ ] **Step 2: 向用户输出链接（两行，本地/生产分开）**

```
本地：http://localhost:4321/HK/通版/20260702-1.0
生产：https://coincool.top/HK/通版/20260702-1.0
```
