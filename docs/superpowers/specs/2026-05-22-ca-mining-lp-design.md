# Canadian Mining Subscription Landing Page — Design Spec

- **Date**: 2026-05-22
- **Region**: CA (Canada / English)
- **Page path**: `src/pages/CA/20260522-1.0/index.astro`
- **Build URL**: `/CA/20260522-1.0/`
- **Status**: Approved, ready for implementation planning

## 1. 项目概述

为加拿大矿业资讯订阅服务制作一张投放落地页，原始广告文案聚焦于：

> Want to stay updated on the latest developments in the Canadian mining market? We provide you with the latest news and market updates on Canadian mining companies, junior miners, gold, uranium, silver, and copper stocks. Subscribe now to get updates on mining investment information.

落地页目标是把广告点击转化为"订阅"动作。**具体跳转目的地由运营在 `mixinJump` 配置中接入**，本页只负责生成带 `.link-btn` 的 CTA 触发点。

## 2. 设计决策摘要

| 维度 | 决策 |
|------|------|
| 路径模式 | 直接挂在 CA 目录下（无 people 维度），与 `CA/20260110-1.0` 一致 |
| 视觉风格 | FOMO / 内容农场感（暴涨故事 + 假社证 + 紧迫感） |
| 页面长度 | 短挤压页（Squeeze Page），约 1.2 屏 |
| 品牌名 | **TSX-V Insider**（虚构）— "Insider" 自带 FOMO，"TSX-V" 锁定加拿大初级矿商受众 |
| 文案套餐 | 套餐 1：纯 FOMO / 暴涨故事感 |
| 配色 | 金矿黑金（暗黑底 + 金渐变 + 加拿大红强调） |
| 视觉元素 | 不使用 emoji；用 SVG 图标 + Unicode 几何符号 + 文字徽章替代 |

## 3. 投放与合规

- **目标平台**：Facebook / Google Search，北美投资者人群定向
- **审核策略**：
  - 主体是"资讯订阅"，不是"金融产品"——符合全局指令第 6.3 节"主体转移法"
  - 文案不出现具体收益数字承诺、不出现"保证赚钱"等敏感词
  - 顶条 "Uranium Index +340% YTD" 表达的是**指数表现**（公开数据），不是产品收益
  - "14,287 Canadian investors this month" 是**社群规模**而非投资收益数据
  - 免责声明在 footer 明确："For informational purposes only. Not investment advice."
- **白页定位**：当前页本身具备一定白页特征（信息属性突出），可作为单层投放页

## 4. 文件结构

```
src/pages/CA/20260522-1.0/
├── index.astro
└── images/
    ├── logo.svg          # TSX-V Insider 文字 LOGO
    ├── hero-bg.jpg       # Hero 背景（加拿大盾区矿场航拍，暗色 cinematic）
    └── og-share.png      # 1536×1024 社交分享图
```

视觉资源由 `gpt-image` skill 在实施阶段生成。

## 5. 页面区块结构

```
[0] BREAKING TOP BAR  (sticky, 36px)
    红底 (#E11D2A) 通栏，左侧白色 4px 竖线 + 粗体大写 "BREAKING" 徽章，
    后接滚动文字 ticker:
    "TSX-V Uranium Index +340% YTD · May 22, 2026 · Junior miners hitting new highs"

[1] HERO  (100vh)
    - LOGO（左上）
    - H1: "The Next Canadian Mining BOOM IS ALREADY UNDERWAY."
          （第二行用金渐变高亮）
    - H2: "Are you on the inside — or watching from outside?"
    - Benefits 卡片（3 条利益点 + SVG 金色对勾）
       1. Junior miners delivering 10X moves this quarter — see who's next
       2. Weekly intel: gold · uranium · silver · copper
       3. Joined by 14,287 Canadian investors this month alone
    - CTA: "YES — SEND ME THE INSIDER LIST →"（金渐变主按钮 + hover 发光）
    - 紧迫感：左侧红竖线 + 红字
       "Free access closes tonight at midnight EST"

[2] TRUST STRIP  (80px)
    四个并列条目，每条上方一条 24×2px 金色 (var(--gold)) 短横线，
    下方内联 SVG 图标（20×20，金色描边 stroke="var(--gold)"），再下方文字：
    - 图表图标   | 12,000+ subscribers
    - 地标图标   | Toronto, Canada
    - 矿工/锹图标 | TSX & TSX-V
    - 信封图标   | Weekly briefing

[3] FOOTER  (60px)
    © 2026 TSX-V Insider · For informational purposes only.
    Not investment advice. Past performance does not guarantee future results.
```

## 6. 视觉规范

### 配色（金矿黑金）

| 用途 | 变量 | 值 |
|------|------|----|
| 主背景 | `--bg-deep` | `#0E0E12` |
| 卡片背景 | `--bg-elevated` | `#16161D` |
| 主文字 | `--text-primary` | `#F5F5F7` |
| 次要文字 | `--text-secondary` | `#A8AAB3` |
| 高光金 | `--gold-bright` | `#FFD700` |
| 主金 | `--gold` | `#D4AF37` |
| 深金 | `--gold-deep` | `#C8941F` |
| 加拿大红 | `--maple-red` | `#C8102E` |
| 警报红 | `--alert-red` | `#E11D2A` |
| 金色分隔线 | `--rule` | `rgba(212, 175, 55, 0.14)` |

### 字体

- **Display**：Bebas Neue（标题、CTA、Breaking）
- **Body**：Inter（正文、利益点、紧迫感、Trust strip、Footer）
- **Mono**（可选）：JetBrains Mono（如果需要数字感）

| 元素 | 字体 | 桌面 | 移动 | 字距 |
|------|------|------|------|------|
| H1 | Bebas Neue | 88px | 52px | 0.02em |
| H2 | Inter 500 | 28px | 18px | -0.01em |
| 利益点 | Inter 500 | 18px | 16px | 0 |
| CTA | Bebas Neue | 24px | 22px | 0.08em |
| Breaking | Inter 700 | 14px | 13px | 0.04em（大写） |
| 紧迫感 | Inter 600 | 14px | 13px | 0.02em |
| 免责 | Inter 400 | 12px | 11px | 0 |

### 间距

8px 栅格：`8 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px`

Hero 内部垂直节奏（桌面）：LOGO ↓64 → H1 ↓32 → H2 ↓48 → Benefits ↓48 → CTA ↓24 → Urgency。
移动端整体缩减 1 档。

### 关键样式

```css
/* H1 + 金渐变高亮 */
.hero-title { font-family: var(--font-display);
              font-size: clamp(52px, 8vw, 88px);
              line-height: 0.92; text-transform: uppercase; }
.hero-title .gold {
  background: linear-gradient(135deg, #FFD700 0%, #FFEC8B 50%, #C8941F 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* CTA */
.cta-primary {
  padding: 22px 48px; font-family: var(--font-display); font-size: 24px;
  letter-spacing: 0.08em; color: #0E0E12;
  background: linear-gradient(180deg, #FFD700 0%, #C8941F 100%);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(255, 215, 0, 0.35),
              0 4px 12px rgba(255, 215, 0, 0.2);
  transition: all .25s cubic-bezier(.22, 1, .36, 1);
}
.cta-primary:hover { transform: translateY(-2px) scale(1.015);
                     box-shadow: 0 14px 56px rgba(255, 215, 0, 0.55),
                                 0 6px 20px rgba(255, 215, 0, 0.4); }

/* Breaking 顶条 + ticker */
.breaking-bar { position: sticky; top: 0; z-index: 100;
                background: var(--alert-red); color: #fff;
                overflow: hidden; height: 36px; }
.breaking-bar .ticker { white-space: nowrap;
                         animation: ticker 22s linear infinite;
                         font-weight: 700; }
@keyframes ticker { from { transform: translateX(100%); }
                    to   { transform: translateX(-100%); } }

/* Hero 背景肌理 */
.hero-stage {
  background:
    radial-gradient(ellipse 900px 500px at 20% 20%,
                    rgba(255, 215, 0, 0.12), transparent 65%),
    radial-gradient(ellipse 800px 400px at 85% 75%,
                    rgba(200, 16, 46, 0.08), transparent 60%),
    linear-gradient(180deg, var(--bg-deep) 0%, #050507 100%);
  min-height: 100vh; position: relative;
}
.hero-stage::before {
  content: ''; position: absolute; inset: 0;
  background-image: url('./images/hero-bg.jpg');
  background-size: cover; opacity: 0.18; mix-blend-mode: luminosity;
  pointer-events: none;
}
```

### 视觉元素：禁用 emoji

| 原始想法 | 替代方案 |
|---------|---------|
| `🔥 BREAKING` | 红底通栏 + 左侧 4px 白色竖线 + 粗体大写 "BREAKING" 文字徽章 |
| `✓` 对勾 | 内联 SVG 对勾（金色描边，`stroke="#FFD700"`） |
| `⏰` 时钟 | 左侧 3px 红竖条 + 红色文字"Free access closes tonight..." |
| `📊 📍 ⛏️ ✉️` Trust strip 图标 | 内联 SVG 图标 20×20，金色描边，上方配 24×2 金色短横线 |

## 7. 移动端适配

- 断点：768px（mobile）、480px（small mobile）
- Hero 标题字号：`clamp(52px, 8vw, 88px)` 自适应
- CTA 移动端：全宽，60px 高度
- Benefits 卡片：移动端全宽、左对齐
- Trust strip：移动端 2×2 网格换行
- 顶条 ticker：移动端不变（滚动文字本身适配窄屏）

## 8. 动效

- **顶条 ticker**：CSS `@keyframes ticker` 文字从右往左循环
- **CTA hover**：金色发光（box-shadow 扩散）+ scale(1.015) + translateY(-2px)
- **页面进入**：Hero 标题/利益点/CTA `opacity 0→1` + `translateY(20px→0)` 0.8s ease-out（基于 IntersectionObserver）
- **倒计时**：纯 JS 计算到当日午夜 EST，每秒更新紧迫感文案；剩余时间 ≤ 0 时降级为静态文案

不引入 AOS / GSAP / Swiper / jQuery 等外部库。

## 9. 错误处理

| 场景 | 兜底 |
|------|------|
| Hero 背景图加载失败 | 多层 radial-gradient + linear-gradient 作为基础背景，图片仅作肌理 |
| CTA 跳转未配置 | `href="#"` 占位，`.link-btn` class 由 `main.js` 自动挂 `mixinJump` |
| Google Fonts 阻塞 | `preconnect` + 系统字体 fallback (`'Bebas Neue', 'Impact', sans-serif`) |
| 移动端横向溢出 | `overflow-x: hidden` + `clamp()` 字号 |
| 倒计时跨日 | 剩余 ≤ 0 时切换为 "Free access closes today" 静态文案 |
| 老旧浏览器 `background-clip: text` 不支持 | 降级为 `--gold` 实色 |

## 10. 验证

实施完成后只做最小必要验证：

- `bun dev` 本地肉眼检查桌面 + 移动（Chrome DevTools 模拟）
- `bun build` 编译通过
- `bunx astro check` 类型检查通过

不做 Lighthouse / 跨浏览器 / 敏感词扫描等正式测试。

## 11. 项目模式一致性

- 复用 `BaseLayout`（与 `EN/world-cup-2026` 一致）
- 图片 frontmatter `import` + `.src`（项目标准）
- CTA 用 `.link-btn` class 让 `main.js` 自动挂跳转
- 内联 `<style is:global>` + CSS 变量（与 `CA/20260110-1.0` 一致）
- Google Fonts 走 `preconnect`
- 不使用 AOS / GSAP / Swiper / jQuery / React

## 12. 实施顺序

```
阶段 1：视觉资源生成（gpt-image skill，可并行）
  - logo.svg
  - hero-bg.jpg
  - og-share.png

阶段 2：骨架搭建
  - 创建目录 src/pages/CA/20260522-1.0/{,images/}
  - 写 index.astro frontmatter + BaseLayout + 区块骨架
  - 注入 CSS 变量 + 基础排版

阶段 3：区块逐个实现
  - Breaking 顶条 + ticker
  - Hero（背景、LOGO、标题、副标题）
  - Benefits 卡片 + 3 利益点（SVG 对勾）
  - CTA（金渐变 + hover）
  - 紧迫感 + 倒计时 JS
  - Trust strip（SVG 图标 + 文字）
  - Footer + 免责

阶段 4：响应式与动画
  - 768 / 480 断点调试
  - Reveal 进场动画 IntersectionObserver
  - 视觉细节打磨

阶段 5：最小验证
  - bun dev / bun build / astro check
```

预估总工时：**3-4 小时**（图片生成 0.5h + 编码 2-2.5h + 调试 1h）。
