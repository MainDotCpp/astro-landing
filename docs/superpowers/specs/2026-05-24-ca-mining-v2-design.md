# Canadian Mining Insider v2 — Landing Page Design Spec

- **Date**: 2026-05-24
- **Region**: CA (Canada / English)
- **Page path**: `src/pages/CA/20260524-1.0/index.astro`
- **Build URL**: `/CA/20260524-1.0/`
- **CTA target**: WhatsApp group join (via `mixinJump`)
- **Status**: Approved, awaiting copy (#1) + assets (#3)

---

## 0. v1 → v2 Differentiation Brief

v1 (`CA/20260522-1.0`) 是一张 **"金矿黑金 squeeze page"**——暗底、金渐变、单屏强压。视觉冲击强但只能承载一个 hook，且高对比黑金对 50 代受众有一定距离感（"像加密赌博站"）。

v2 走完全不同的方向，**"Editorial Financial Briefing / Bloomberg-style Daily Dossier"**：

| 维度 | v1（黑金 squeeze） | v2（白底快报） |
|------|---------------------|----------------|
| 基调 | 暗色酒吧 / 黄金广告 | 报纸专栏 / 终端机白皮书 |
| 主色 | 深黑 + 金渐变 + 警报红 | 米黄报纸底 + 深蓝钢墨 + 警示橙红 |
| 字体 | Bebas Neue（粗壮街头感） | **IBM Plex Serif**（编辑）+ **IBM Plex Mono**（终端） + **Archivo**（无衬线） |
| 长度 | 1.2 屏 squeeze | 长滚动 narrative（8 个版块，约 5-6 屏） |
| 信任建立 | 单一 trust strip | 分析师人脸 + 履历 + 模糊 pick + 用户头像 testimonial |
| 钩子 | 一句大字 "BOOM" | "今日精选已锁定" 模糊卡 + 倒计时解锁机制 |
| CTA | 通用 "Send me the list" | "Join the WhatsApp briefing" 绿色 WhatsApp 按钮 |
| 视觉装饰 | 金色渐变 + radial glow | 报纸折角 + 网格底纹 + 横线分栏 + 邮票印章 |
| 心理触发 | 利益承诺 + 暴涨故事 | 权威 + 社交认同 + 稀缺解锁（你被"邀请"才能看） |

**核心 differentiation 一句话**：v1 让你想"我能赚钱"，v2 让你想"这是行业内部刊物，我刚好被邀请进圈子"。

---

## 1. 视觉关键词

- **Editorial dossier**（编辑式简报）
- **Newsroom credibility**（新闻室可信度）
- **Quiet authority**（克制的权威感）
- **Insider invitation**（被邀请的圈内感）

参考意象：彭博终端、华尔街日报头版、FT Alphaville 专栏、Substack Pro 邮件订阅页、《经济学人》信封订阅广告。

---

## 2. 配色：Newsprint Steel

色板从黑金转向 **报纸米白 + 钢墨蓝 + 警示橙红 + 印章红**，整体气质从夜店变成报社。

| 用途 | 变量 | 值 | 备注 |
|------|------|----|------|
| 页面底色（报纸米） | `--paper` | `#F4EFE6` | 旧报纸米白，比纯白更"读物" |
| 卡片底（亚白） | `--paper-elevated` | `#FBF8F2` | 提高一档亮度 |
| 深色区块（footer/header strip） | `--ink-deep` | `#0F1A2B` | 深海军蓝墨，区别于纯黑 |
| 主文字（钢墨） | `--ink` | `#15212F` | 主字色，对比足够但不刺眼 |
| 次要文字 | `--ink-muted` | `#5C6675` | 灰蓝 |
| 分隔线 | `--rule` | `rgba(15, 26, 43, 0.12)` | 半透明深蓝细线 |
| 钢蓝强调（链接 / 数字） | `--steel` | `#1F4C7A` | 终端机蓝 |
| 钢蓝亮（hover） | `--steel-bright` | `#2D6BA8` | |
| 警示橙红（倒计时 / urgent） | `--alert` | `#D93B1E` | 报纸大字号红，非血红 |
| 印章红（badge / 印戳） | `--stamp` | `#A91D2A` | 加拿大红的深一档 |
| 印章红 alpha | `--stamp-soft` | `rgba(169, 29, 42, 0.08)` | 印章底色 |
| WhatsApp 绿（CTA） | `--wa-green` | `#25D366` | 官方 brand |
| WhatsApp 深绿（CTA shadow / hover） | `--wa-green-deep` | `#128C7E` | |
| 黄色 highlighter | `--highlight` | `#FFE066` | "做笔记"感的荧光笔 |
| 黄色 highlight alpha | `--highlight-soft` | `rgba(255, 224, 102, 0.55)` | 用于关键词背景刷 |

**配色原则**：80% 米白底 + 15% 深蓝墨字 + 5% 强调（橙红 / 印章红 / WhatsApp 绿）。深蓝是结构色，红/绿是动作色。

---

## 3. 字体栈

| 角色 | 字体 | 来源 | 用途 |
|------|------|------|------|
| Editorial Serif | **IBM Plex Serif** | Google Fonts | H1 / H2 / 文章引言 / 分析师姓名 |
| Display Sans | **Archivo Black** | Google Fonts | BREAKING badge / CTA / 大数字 |
| Body Sans | **Archivo** | Google Fonts | 段落、benefits、FAQ |
| Mono / Terminal | **IBM Plex Mono** | Google Fonts | Ticker、ticker symbol、时间戳、价格 |

**对比 v1**：v1 用 Bebas Neue（拥挤、街头感），v2 用 IBM Plex 全家（IBM 出品，自带"严肃 / 终端 / 文档"基因），并配 Archivo Black 做强烈数字字号。

### 字号规范

| 元素 | 字体 | 桌面 | 移动 | 字重 | 字距 |
|------|------|------|------|------|------|
| BREAKING 顶条徽章 | Archivo Black | 13px | 12px | 900 | 0.12em |
| Ticker | IBM Plex Mono | 14px | 13px | 500 | 0.04em |
| H1（hero 主标题） | IBM Plex Serif | 64px | 36px | 700 | -0.015em |
| H1 高亮关键词（黄色刷） | IBM Plex Serif italic | 64px | 36px | 700 italic | -0.015em |
| H2（区块标题） | IBM Plex Serif | 36px | 26px | 600 | -0.01em |
| Hero 副标题 / lede | IBM Plex Serif | 20px | 17px | 400 italic | 0 |
| 正文段落 | Archivo | 18px | 16px | 400 | 0 |
| 加粗关键词 | Archivo | 18px | 16px | 700 | 0 |
| 大数字（statistic） | Archivo Black | 56px | 42px | 900 | -0.03em |
| 数字后缀单位 | IBM Plex Mono | 16px | 14px | 500 | 0.02em |
| 分析师姓名 | IBM Plex Serif | 22px | 19px | 600 | -0.005em |
| 分析师 title | Archivo | 13px | 12px | 500 uppercase | 0.1em |
| Testimonial 引言 | IBM Plex Serif | 19px | 17px | 400 italic | -0.005em |
| FAQ question | Archivo | 17px | 16px | 600 | 0 |
| FAQ answer | Archivo | 16px | 15px | 400 | 0 |
| CTA 按钮 | Archivo Black | 19px | 17px | 900 | 0.06em uppercase |
| Urgency / Countdown | IBM Plex Mono | 15px | 14px | 600 | 0.05em |
| Footer / 免责 | Archivo | 12px | 11px | 400 | 0.01em |

### 加载策略

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,400;0,600;0,700;1,400&family=IBM+Plex+Mono:wght@400;500;600&family=Archivo:wght@400;500;600;700&family=Archivo+Black&display=swap" rel="stylesheet" />
```

字体 fallback：
- Serif: `'IBM Plex Serif', Georgia, 'Times New Roman', serif`
- Sans: `'Archivo', system-ui, -apple-system, sans-serif`
- Display: `'Archivo Black', 'Archivo', Impact, sans-serif`
- Mono: `'IBM Plex Mono', 'JetBrains Mono', Menlo, monospace`

---

## 4. 网格 / 容器 / 间距

| Token | 值 |
|-------|----|
| `--container-max` | 1140px |
| `--container-narrow` | 760px（用于 narrative 区块阅读宽度） |
| 桌面 padding | 32px |
| 移动 padding | 20px |
| 间距尺度 | 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 160 px |

**区块垂直节奏**：
- 区块上下 padding 桌面 96px / 移动 56px
- 区块标题与正文 32px
- 段落间 20px
- 卡片内 padding 32px（桌面）/ 24px（移动）

---

## 5. 版块布局图

```
┌──────────────────────────────────────────────────────────────┐
│ [0] BREAKING TICKER BAR  (深蓝 #0F1A2B, sticky, 40px)        │
│  ▌BREAKING │ TSX-V:URA +18.4% · CCJ +6.1% · NXE +12.3% ...  │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ [1] HERO  (米白底, ~88vh, 报纸头版)                          │
│                                                              │
│   ┌─[LOGO TSX-V INSIDER]──────────────────────── ISSUE №247 │
│   │                                              MAY 24 2026 │
│   │                                              ───────────│
│   │                                                          │
│   │   THE CANADIAN MINERS                                    │
│   │   WALL STREET DOESN'T                                    │
│   │   WANT YOU TO [SEE.]   ← 黄色 highlighter 刷             │
│   │                                                          │
│   │   ─── lede ───                                           │
│   │   "While retail chases tech, a quiet rotation into       │
│   │   uranium and gold juniors is delivering 10x moves       │
│   │   on the TSX-V. Our weekly briefing tells you who's      │
│   │   next — before the press release hits."                 │
│   │                                                          │
│   │   ┌────────────────────────────────────────┐             │
│   │   │ [WhatsApp icon] JOIN THE BRIEFING →    │  ← 绿按钮  │
│   │   └────────────────────────────────────────┘             │
│   │   ▌Free access closes 23:59 EST · 14,287 already in     │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ [2] LIVE TICKER STRIP  (亚白 #FBF8F2, 横排数字面板)          │
│                                                              │
│   ┌──────────┬──────────┬──────────┬──────────┐             │
│   │ URA      │ CCJ      │ NXE      │ XAU      │             │
│   │ $34.20   │ $58.91   │ $11.42   │ $2,418   │             │
│   │ ▲ +4.2%  │ ▲ +2.1%  │ ▲ +6.8%  │ ▲ +0.9%  │             │
│   └──────────┴──────────┴──────────┴──────────┘             │
│   AS OF MAY 24 2026 · 09:30 EST                              │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ [3] ANALYST CREDENTIALS  (米白, 三栏)                        │
│                                                              │
│   "MEET THE DESK"                                            │
│   ─────────────                                              │
│                                                              │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐                    │
│   │ [photo] │  │ [photo] │  │ [photo] │                    │
│   │ Daniel  │  │ Margaret│  │ Hiroshi │                    │
│   │ Whelan  │  │ Okafor  │  │ Tanaka  │                    │
│   │ LEAD    │  │ SENIOR  │  │ DATA    │                    │
│   │ ANALYST │  │ EDITOR  │  │ DESK    │                    │
│   │ "18 yrs │  │ "Former │  │ "Built  │                    │
│   │ TSX-V…" │  │ FT…"    │  │ models…"│                    │
│   └─────────┘  └─────────┘  └─────────┘                    │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ [4] TODAY'S PICK TEASER  (深蓝底 #0F1A2B, 模糊解锁)          │
│                                                              │
│   ─── ISSUE №247 · TODAY'S PICK ───                          │
│                                                              │
│   ┌────────────────────────────────────────────────┐         │
│   │ ┌─[stamp 印章: "MEMBERS ONLY"]                  │         │
│   │ │                                               │         │
│   │ │   TICKER:  ████-█                             │         │
│   │ │   SECTOR:  Uranium / Athabasca Basin          │         │
│   │ │   MKT CAP: C$███ M                            │         │
│   │ │   THESIS:  ████████████████████████████      │         │
│   │ │            █████ ██████ ███████████ ███████   │         │
│   │ │            ███████ → ████████ catalyst        │         │
│   │ │   ENTRY:   $█.██                              │         │
│   │ │   TARGET:  $██.██ (████%)                     │         │
│   │ │                                               │         │
│   │ │   [↓ 模糊覆盖层，正中央 unlock 按钮]          │         │
│   │ │   ┌──────────────────────────────┐            │         │
│   │ │   │ UNLOCK FOR FREE (WhatsApp) → │            │         │
│   │ │   └──────────────────────────────┘            │         │
│   │ │   Closes in: 14h 23m 51s                      │         │
│   └────────────────────────────────────────────────┘         │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ [5] TESTIMONIALS  (米白, 报纸式信件墙)                       │
│                                                              │
│   "WHAT MEMBERS ARE SAYING"                                  │
│   ─────────────────────────                                  │
│                                                              │
│   ┌──────────────────────┐  ┌──────────────────────┐        │
│   │ [👤] Robert M.       │  │ [👤] Linda P.        │        │
│   │      Calgary, AB     │  │      Vancouver, BC   │        │
│   │  ─                   │  │  ─                   │        │
│   │ "Caught the NXE      │  │ "Better than my      │        │
│   │  call 3 weeks early. │  │  Bloomberg sub —     │        │
│   │  Paid for my truck." │  │  and it's free."     │        │
│   │  ★★★★★              │  │  ★★★★★              │        │
│   └──────────────────────┘  └──────────────────────┘        │
│   ┌──────────────────────┐  ┌──────────────────────┐        │
│   │ [👤] Don K. — Toronto│  │ [👤] Susan H. — Edm. │        │
│   │ "First time I felt   │  │ "Their gold piece    │        │
│   │ ahead of the news."  │  │ literally saved..."  │        │
│   │  ★★★★★              │  │  ★★★★★              │        │
│   └──────────────────────┘  └──────────────────────┘        │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ [6] URGENCY + CTA  (印章红底 #A91D2A, 闭门倒计时)            │
│                                                              │
│   ─── FREE ENROLLMENT WINDOW CLOSING ───                     │
│                                                              │
│              14 : 23 : 51                                    │
│              HRS  MIN  SEC                                   │
│                                                              │
│      Today's issue locks at midnight EST.                    │
│      After that, $49/mo (no waitlist).                       │
│                                                              │
│   ┌────────────────────────────────────────────────┐         │
│   │ [WA icon] CLAIM MY FREE SEAT — WHATSAPP →      │         │
│   └────────────────────────────────────────────────┘         │
│                                                              │
│      ↓ 14,287 Canadians joined this month                    │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ [7] FAQ  (米白, accordion)                                   │
│                                                              │
│   "FREQUENTLY ASKED"                                         │
│   ──────────────                                             │
│                                                              │
│   ▾ Is this really free? ─────────────────────────         │
│     Yes. The weekly briefing is funded by our paid          │
│     research desk; the WhatsApp tier stays free as          │
│     long as the group has under 20,000 members.             │
│                                                              │
│   ▸ Why WhatsApp instead of email?                          │
│   ▸ Who are the analysts behind this?                       │
│   ▸ Do you give buy / sell signals?                         │
│   ▸ Can I unsubscribe anytime?                              │
│   ▸ Is this regulated investment advice?                    │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ [8] COMPLIANCE FOOTER  (深蓝 #0F1A2B, 白字)                  │
│                                                              │
│   TSX-V INSIDER · Editorial offices: Toronto, ON             │
│   ─────────────────────────────────────────────              │
│   For informational purposes only. Not investment advice.    │
│   TSX-V Insider is an independent editorial publication...   │
│   © 2026 TSX-V Insider Ltd. · Privacy · Terms · Contact      │
└──────────────────────────────────────────────────────────────┘

[STICKY CTA BAR — mobile only, 出现在 hero 离开视口后]
┌──────────────────────────────────────────────────────────────┐
│ [WA] Join free briefing · closes 14h 23m →                  │
└──────────────────────────────────────────────────────────────┘
```

---

## 6. 组件清单

所有组件以 Astro 标签形式内联在 `index.astro` 中（不引入 React 除非必要——本页全部 vanilla JS）。

### 6.1 `StickyCta`
- 移动端专用，hero 离开视口（IntersectionObserver）后从底部 slide-in
- 高度 56px，半透明深蓝玻璃底（`backdrop-filter: blur(12px)`）+ 上方 1px 钢蓝细线
- 左侧 WhatsApp 圆形绿 icon（24×24 SVG）+ 文字 + 右侧倒计时
- 桌面端不出现（避免遮挡内容）
- 实现：`.sticky-cta-mobile { display:none; } @media (max-width:768px) { .sticky-cta-mobile.active { transform: translateY(0); } }`

### 6.2 `CountdownBanner`
- 用在 [6] URGENCY CTA 区块作为大号倒计时（72px 数字）
- 用在 [4] TODAY'S PICK 模糊卡作为小号副文（15px mono）
- 用在 [1] HERO urgency 行作为内联文本（15px mono）
- 用在 [STICKY CTA] 作为短文本（"14h 23m"）
- 统一 JS 函数 `updateCountdowns()` 找所有 `[data-countdown]` 元素并刷新
- 实现：纯 vanilla JS，1Hz 刷新，目标为"当日 23:59:59 EST"，跨日降级 "Closes today"
- 数字字体：`Archivo Black` 配 `IBM Plex Mono` 单位

### 6.3 `AnalystCard`
- 三栏 grid，每张卡：
  - 顶部 100×100 圆形头像（米白边框 4px + 钢蓝细环 1px）
  - 姓名（IBM Plex Serif 22px 600）
  - Title（Archivo 13px 500 uppercase 字距 0.1em 钢蓝色）
  - 一行履历引言（Archivo 15px italic muted）
  - 底部 24×1 钢蓝短横线 + 一行 credentials（"18 yrs · TSX-V coverage"）
- 卡片底色 `--paper-elevated` + 1px `--rule` 边 + 圆角 4px（小圆角更"严肃"）
- 不带 box-shadow，靠边框做分隔
- 移动端：单列纵向堆叠

### 6.4 `BlurredPickCard` ⭐ 核心差异化组件
- 深蓝底（`--ink-deep`）满宽容器，内部白色"内部文件"卡
- 文件卡视觉：
  - 左上角斜贴一个 80×80 印章 SVG（`--stamp` 红色，文字 "MEMBERS ONLY · №247"，环绕排版）
  - 右上角 "ISSUE №247" + "EYES ONLY" 钢蓝细字
  - 内容区按"内部研究模板"排：TICKER / SECTOR / MKT CAP / THESIS / ENTRY / TARGET
  - 字段值全部用 `IBM Plex Mono`，被 CSS `filter: blur(8px)` 模糊
  - 顶层覆盖一层 `linear-gradient(180deg, transparent 0%, rgba(15,26,43,0.4) 60%, rgba(15,26,43,0.85) 100%)` 让底部更暗
- 居中浮一个 unlock 按钮（WhatsApp 绿，与主 CTA 同款）
- 按钮下方一行 mono 倒计时
- 实现细节：
  - 模糊文本要包含**真实的**结构（"TICKER: ████-█"），让用户感觉真有内容被遮
  - 印章用纯 SVG（不依赖图片资源），降低生成负担
  - 整张卡 hover 时模糊从 8px → 6px（"几乎看清"的诱惑感）
  - 不要把 unlock 按钮做成 modal——直接 `.link-btn` 触发 mixinJump 到 WhatsApp

### 6.5 `TestimonialAvatar`
- 2×2 grid（桌面）/ 单列（移动）
- 每张：
  - 左侧 56×56 圆形头像（真实人脸照，artist 生成）
  - 右侧上下：姓名 + 城市 (`Robert M. · Calgary, AB`，姓名加粗 16px，城市钢蓝 13px mono)
  - 下方引言（IBM Plex Serif italic 17px）
  - 底部 5 颗实心五角星（橙色 `#F39C12`，纯 CSS `::before` 字符 `★`）
  - "Verified WhatsApp member" 小灰字
- 卡片底 `--paper-elevated`，1px `--rule` 边
- 装饰：左上角一个钢蓝直角 L 形（10×10）做"引号代"，不用 emoji 不用 SVG 引号

### 6.6 `WhatsAppCta`
- 三种 size：`primary` / `secondary` / `compact`
- 结构：内联 WhatsApp logo SVG（22×22 白色）+ 文字 + 右箭头 `→`
- 主色：`--wa-green` 实色背景，hover 时切换 `--wa-green-deep`
- 阴影：`0 8px 24px rgba(37, 211, 102, 0.32), 0 2px 6px rgba(18, 140, 126, 0.4)`
- hover 时：`transform: translateY(-1px)`，阴影加强
- 默认带 `.link-btn` class，让 `main.js` 自动挂 `mixinJump`
- 重要：所有 WhatsApp CTA 共享同一 component class `.cta-wa`，确保视觉一致

### 6.7 其他辅助组件（非任务清单要求但实现需要）
- `BreakingTickerBar` —— 区别于 v1 红色，v2 用 `--ink-deep` 深蓝底 + 白字 + 黄色 `BREAKING` badge（Archivo Black）+ mono ticker
- `LivePricePanel` —— 4 列价格卡（symbol / price / pct change 三行），上涨绿色 ▲，下跌橙红 ▼，数字 `Archivo Black`
- `IssueHeader` —— "ISSUE №247 · MAY 24 2026" 报纸期号样式，钢蓝 mono 字
- `FaqItem` —— `<details><summary>` 原生 accordion + 自定义 `▸` `▾` 箭头（不用 SVG，纯 Unicode）

---

## 7. 移动端断点策略

| 断点 | 行为 |
|------|------|
| `>=1024px` | 完整三栏 analyst / 四栏 ticker / 2×2 testimonial |
| `768-1023px` | analyst 三栏保留 / ticker 4 栏改 2×2 / testimonial 2×2 不变 |
| `<768px` | analyst 单列 / ticker 2×2 / testimonial 单列 / hero H1 36px / 启用 StickyCta |
| `<480px` | hero H1 32px / 区块 padding 减半 / countdown 数字 56px / 印章缩到 60×60 |

容器：`max-width: 1140px` 桌面，移动端左右 padding 20px。

---

## 8. 动效策略

延续 v1 的 **IntersectionObserver reveal** 模式（不引入外部库），v2 新增 4 个动效：

### 8.1 沿用
- `.reveal` opacity 0→1 + translateY 20px→0，stagger 80ms（`requestAnimationFrame` 触发）
- 减弱动效：`@media (prefers-reduced-motion: reduce)` 取消所有 transform/opacity 过渡

### 8.2 新增
1. **Ticker 数字滚动闪烁**：[2] LIVE TICKER 区域，价格数字每 8 秒做一次 0.4s 短暂闪烁（颜色从钢蓝 → 警示橙红 → 钢蓝），制造"实时刷新"的错觉。纯 CSS `@keyframes pulse-price`，data 不真改。
2. **BlurredPick hover 解模糊**：模糊从 8px 平滑过渡到 6px（仅桌面 hover）；500ms ease-out；不在 mobile 触发。
3. **Countdown digit flip**：[6] URGENCY 大倒计时秒数每次更新时，做一个 200ms 的 `opacity: 0.4 → 1`，类似翻牌效果（不做真的 3D flip，避免开销）。
4. **StickyCta slide-in**：hero IntersectionObserver `isIntersecting=false` 时给 mobile sticky-cta 加 `.active` class，`transform: translateY(100%) → translateY(0)`，300ms cubic-bezier(.22,1,.36,1)。

### 8.3 关键：不引入
- 不用 AOS / GSAP / Swiper / jQuery
- 不用 React（v2 全部 vanilla JS）
- 不用 Framer Motion / Motion One

---

## 9. 视觉装饰细节（"editorial dossier" 质感来源）

这是 v2 区别于 v1 的核心质感投入点：

### 9.1 报纸网格底纹（全站 body 层）
```css
body::before {
  content: '';
  position: fixed; inset: 0;
  background-image:
    linear-gradient(rgba(15, 26, 43, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 26, 43, 0.04) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none; z-index: 0;
}
```

### 9.2 颗粒纸纹（hero 区局部）
- 用 SVG `<filter id="grain"><feTurbulence baseFrequency="0.85"/></filter>` 生成噪点
- `mix-blend-mode: multiply`, `opacity: 0.06`
- 仅放在 hero 和 footer 区，避免全局开销

### 9.3 黄色 highlighter（hero H1 关键词）
- 在 H1 内某个 inline `<span class="hl">` 元素上做 CSS：
```css
.hl {
  background: linear-gradient(
    180deg, transparent 60%, var(--highlight-soft) 60%, var(--highlight-soft) 92%, transparent 92%
  );
  padding: 0 4px;
}
```
- 制造"被荧光笔涂过"的感觉，比金渐变更"人工 / 编辑"

### 9.4 印章 SVG（today's pick）
- 圆形红章，外环字 "MEMBERS ONLY · TSX-V INSIDER · №247 ·"
- 内部斜体 "EYES ONLY"
- 颜色 `--stamp`，半透明 `opacity: 0.85`
- 用 SVG `<textPath>` + `<defs><path d="M..." id="circle">` 实现环绕
- 整个印章 `transform: rotate(-12deg)` 斜贴

### 9.5 报纸折角（卡片右上）
- analyst card 右上角一个 24×24 三角，CSS clip-path 做折角
- `background: linear-gradient(135deg, var(--paper-elevated) 50%, var(--rule) 50%)`
- 不是必须，只是细节加成

### 9.6 终端机价格变化箭头
- 上涨：`▲` (U+25B2)，颜色 `#2A8E5C`（钢绿，非荧光绿）
- 下跌：`▼` (U+25BC)，颜色 `--alert`
- 字距与 `Archivo Black` 数字配合 `gap: 8px`

### 9.7 段间分隔
- 不用 `<hr>`
- 用 `::after` 在 H2 下方加 32×2 钢蓝实线
```css
.section-title::after {
  content: ''; display: block;
  width: 32px; height: 2px;
  background: var(--ink); margin-top: 12px;
}
```

---

## 10. 关键 CSS 片段（实现参考）

### 10.1 CSS Variables
```css
:root {
  --paper:           #F4EFE6;
  --paper-elevated:  #FBF8F2;
  --ink-deep:        #0F1A2B;
  --ink:             #15212F;
  --ink-muted:       #5C6675;
  --rule:            rgba(15, 26, 43, 0.12);
  --rule-strong:     rgba(15, 26, 43, 0.24);
  --steel:           #1F4C7A;
  --steel-bright:    #2D6BA8;
  --alert:           #D93B1E;
  --stamp:           #A91D2A;
  --stamp-soft:      rgba(169, 29, 42, 0.08);
  --wa-green:        #25D366;
  --wa-green-deep:   #128C7E;
  --highlight:       #FFE066;
  --highlight-soft:  rgba(255, 224, 102, 0.55);
  --font-serif:      'IBM Plex Serif', Georgia, 'Times New Roman', serif;
  --font-sans:       'Archivo', system-ui, -apple-system, sans-serif;
  --font-display:    'Archivo Black', 'Archivo', Impact, sans-serif;
  --font-mono:       'IBM Plex Mono', 'JetBrains Mono', Menlo, monospace;
  --container-max:   1140px;
  --container-narrow: 760px;
}
```

### 10.2 Hero highlighter
```css
.hero-title {
  font-family: var(--font-serif);
  font-size: clamp(36px, 6vw, 64px);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.015em;
  color: var(--ink);
  margin: 0;
}
.hero-title .hl {
  background: linear-gradient(180deg,
    transparent 60%,
    var(--highlight-soft) 60%,
    var(--highlight-soft) 92%,
    transparent 92%);
  padding: 0 6px;
}
```

### 10.3 WhatsApp CTA
```css
.cta-wa {
  display: inline-flex; align-items: center; justify-content: center;
  gap: 12px;
  padding: 20px 36px;
  font-family: var(--font-display);
  font-size: 19px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #fff;
  background: var(--wa-green);
  border: none; border-radius: 8px;
  box-shadow:
    0 8px 24px rgba(37, 211, 102, 0.32),
    0 2px 6px rgba(18, 140, 126, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
  cursor: pointer;
  transition: all .25s cubic-bezier(.22, 1, .36, 1);
  text-decoration: none;
}
.cta-wa:hover {
  background: var(--wa-green-deep);
  transform: translateY(-1px);
  box-shadow:
    0 12px 36px rgba(37, 211, 102, 0.45),
    0 4px 10px rgba(18, 140, 126, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}
@media (max-width: 768px) {
  .cta-wa { padding: 16px 24px; font-size: 17px; width: 100%; }
}
```

### 10.4 Blurred Pick Card
```css
.pick-section { background: var(--ink-deep); padding: 96px 0; color: #F4EFE6; }
.pick-dossier {
  position: relative;
  max-width: 760px; margin: 0 auto;
  background: var(--paper-elevated);
  border: 1px solid var(--rule-strong);
  border-radius: 6px;
  padding: 56px 48px;
  color: var(--ink);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
}
.pick-content--blurred {
  filter: blur(8px);
  user-select: none;
  pointer-events: none;
  transition: filter .5s ease-out;
}
@media (hover: hover) {
  .pick-dossier:hover .pick-content--blurred { filter: blur(6px); }
}
.pick-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg,
    transparent 0%,
    rgba(15,26,43,0.0) 30%,
    rgba(15,26,43,0.45) 65%,
    rgba(15,26,43,0.85) 100%);
  display: flex; flex-direction: column;
  align-items: center; justify-content: flex-end;
  padding-bottom: 48px; gap: 16px;
  border-radius: 6px;
}
.pick-stamp {
  position: absolute; top: 24px; left: 24px;
  width: 96px; height: 96px;
  transform: rotate(-12deg);
  opacity: 0.85;
}
```

### 10.5 BREAKING ticker bar (v2)
```css
.breaking-bar {
  position: sticky; top: 0; z-index: 100;
  height: 40px;
  background: var(--ink-deep);
  color: var(--paper);
  display: flex; align-items: center;
}
.breaking-bar .badge {
  padding: 0 16px;
  height: 100%;
  display: flex; align-items: center;
  font-family: var(--font-display);
  font-size: 13px;
  letter-spacing: 0.12em;
  background: var(--highlight);
  color: var(--ink-deep);
}
.breaking-bar .ticker {
  font-family: var(--font-mono);
  font-size: 14px;
  letter-spacing: 0.04em;
  animation: ticker 28s linear infinite;
}
```

### 10.6 Live ticker price panel
```css
.live-panel {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid var(--rule);
  background: var(--paper-elevated);
}
.live-panel-cell {
  padding: 24px 20px;
  border-right: 1px solid var(--rule);
  text-align: center;
}
.live-panel-cell:last-child { border-right: none; }
.live-panel-cell .symbol {
  font-family: var(--font-mono);
  font-size: 13px; font-weight: 600;
  color: var(--steel);
  letter-spacing: 0.06em;
  margin-bottom: 8px;
}
.live-panel-cell .price {
  font-family: var(--font-display);
  font-size: 28px;
  color: var(--ink);
  letter-spacing: -0.02em;
}
.live-panel-cell .change {
  font-family: var(--font-mono);
  font-size: 13px; font-weight: 600;
  margin-top: 4px;
}
.live-panel-cell .change.up { color: #2A8E5C; }
.live-panel-cell .change.down { color: var(--alert); }
@keyframes pulse-price {
  0%, 90%, 100% { color: var(--ink); }
  92% { color: var(--alert); }
}
.live-panel-cell .price { animation: pulse-price 8s ease-in-out infinite; }
.live-panel-cell:nth-child(2) .price { animation-delay: 2s; }
.live-panel-cell:nth-child(3) .price { animation-delay: 4s; }
.live-panel-cell:nth-child(4) .price { animation-delay: 6s; }
@media (max-width: 768px) {
  .live-panel { grid-template-columns: repeat(2, 1fr); }
  .live-panel-cell:nth-child(2) { border-right: none; }
  .live-panel-cell:nth-child(-n+2) { border-bottom: 1px solid var(--rule); }
}
```

---

## 11. 视觉素材清单（交给 artist / task #3）

| 资产 | 尺寸 | 用途 | 备注 |
|------|------|------|------|
| `logo.svg` | 文字 logo | hero header | "TSX-V INSIDER" IBM Plex Serif 600，下方一行钢蓝 mono "EDITORIAL DESK · TORONTO" |
| `analyst-1.jpg` | 400×400 | Daniel Whelan | 中年白人男性，深灰西装，办公室柔光，半身像，深蓝/灰调，自然不假笑 |
| `analyst-2.jpg` | 400×400 | Margaret Okafor | 黑人女性 45 上下，米色西装，编辑室背景，专业感 |
| `analyst-3.jpg` | 400×400 | Hiroshi Tanaka | 日裔男性 40 上下，眼镜，数据屏幕背景虚化 |
| `testi-1.jpg` ~ `testi-4.jpg` | 200×200 | testimonial 头像 | 加拿大中年男女各 2，自然生活照风格（非 stock）：户外、家中、皮卡前等 |
| `og-share.png` | 1536×1024 | OG | 报纸头版 mockup，TSX-V INSIDER masthead + 倒计时元素 |
| `hero-bg.jpg`（可选） | 1920×1080 | hero 极淡背景肌理 | 可不要——用 CSS 网格+颗粒已足够。如要：旧报纸折页 close-up、米色、低对比 |
| `stamp-members-only.svg` | inline | today's pick 印章 | SVG 内联在 .astro，不出图 |

⚠️ artist 注意：**所有人像必须自然真实风格，避免明显 AI 塑料感**（瞳孔形状、耳朵、对称性）。如果生成不佳宁可放占位灰块也不要"塑料人"。

---

## 12. 文案接口（给 marketer / task #1 参考）

实现时需要以下文案 slot（marketer 产出后填入）：

| slot 名 | 上限 | v2 示例 |
|---------|------|---------|
| `hero.h1` | 80 字符 | "The Canadian Miners Wall Street Doesn't Want You to See." |
| `hero.lede` | 220 字符 | "While retail chases tech, a quiet rotation into uranium and gold juniors..." |
| `hero.cta` | 28 字符 | "Join the Briefing — WhatsApp" |
| `hero.urgency` | 60 字符 | "Free access closes 23:59 EST · 14,287 already in" |
| `ticker.items` | 6-8 条 | "TSX-V Uranium Index +18.4% MoM · Cameco +6.1% ·..." |
| `pick.title` | 30 字符 | "Today's Pick · Issue №247" |
| `pick.unlockCta` | 32 字符 | "Unlock for free (WhatsApp) →" |
| `analysts[3]` | 各 80 字符 | 见 §11 |
| `testimonials[4]` | 各 120 字符 | 见 §5 |
| `urgency.headline` | 60 字符 | "Free enrollment window closing" |
| `urgency.subline` | 100 字符 | "Today's issue locks at midnight EST. After that, $49/mo." |
| `urgency.cta` | 32 字符 | "Claim My Free Seat — WhatsApp" |
| `faq[6]` | Q ≤ 60, A ≤ 240 字符 each | 6 条标准合规问答 |
| `footer.disclaimer` | 400 字符 | 完整合规免责 |

---

## 13. 合规策略（沿用并加强）

继承 v1 合规框架，针对 v2 长页面加强：

- **主体定位**：editorial publication（编辑出版物），非投资顾问；FAQ 第 5 条明确说明
- **数字处理**：
  - "14,287 Canadians joined this month" —— 社群规模，非收益
  - "TSX-V:URA +18.4%" —— 指数公开数据，非产品收益
  - "10x moves this quarter" —— 描述市场现象（"the market did this"），非承诺
- **避险词替换**：
  - 不用 "buy / sell signal" → 改 "weekly intel" / "research notes" / "briefing"
  - 不用 "guaranteed" / "risk-free" → 改 "ahead of the press release" / "before consensus"
  - 不用 "make money" / "get rich" → 改 "stay ahead" / "informed" / "on the inside"
- **FAQ 中显式合规**：
  - Q "Is this regulated investment advice?" → A "No. TSX-V Insider is an editorial publication. Always consult a licensed advisor before any investment decision."
- **Footer 免责强化**：
  - "Past performance does not guarantee future results."
  - "We are not registered investment advisors."
  - "Information is for educational purposes only."
- **双层漏斗预留**：本页本身合规度高，WhatsApp 跳转链接由运营在 `mixinJump` 配置，强转化文案放在 WhatsApp 群里（平台审核盲区）

---

## 14. 实施顺序（实施时由 designer 认领 #4）

```
阶段 1：资产生成（artist task #3 并行）
  - 4 张 analyst 头像 + 4 张 testimonial 头像 + OG 图 + logo

阶段 2：骨架（无文案占位）
  - 创建 src/pages/CA/20260524-1.0/{,images/}
  - frontmatter + BaseLayout + CSS 变量 + 字体加载
  - 8 个 section 占位空标签 + skip-to-content link

阶段 3：区块实现（顺序）
  - [0] Breaking ticker bar（深蓝 + 黄 badge + mono ticker）
  - [1] Hero（标题 + highlighter + lede + WA CTA + urgency）
  - [2] Live ticker panel（4 列 + pulse 动画）
  - [3] Analyst credentials（3 卡 + 头像 + 履历）
  - [4] Blurred pick dossier ⭐（印章 + 模糊内容 + unlock CTA）
  - [5] Testimonials（2×2 + 头像 + 星 + 引言）
  - [6] Urgency CTA（印章红底 + 大倒计时 + WA CTA）
  - [7] FAQ（details/summary 原生 accordion）
  - [8] Compliance footer

阶段 4：动效 + sticky cta（mobile）
  - IntersectionObserver reveal
  - Countdown 1Hz 刷新
  - Hero leave → sticky cta slide-in
  - Pulse price 动画

阶段 5：响应式调试
  - 1024 / 768 / 480 三档断点
  - Chrome DevTools iPhone 12 / Pixel 5 实测
  - 桌面 1440 实测

阶段 6：验证
  - bun dev 浏览器实测桌面 + 移动
  - bun build 编译通过
  - bunx astro check 类型通过
  - 全文搜确认无 emoji
```

预估总工时：**4.5-5.5 小时**（资产生成与 marketer/artist 并行，编码 3-3.5h + 调试 1.5h）。

---

## 15. 设计原则备注

1. **克制金色**：v2 没有金色。如果实施时手痒想加金渐变 → 立刻停手，改用黄色 highlighter 即可。
2. **文字密度**：v2 是 narrative 页，文字比例要比 v1 高 5×。不要过度留白让它"轻"——读物质感来自密度。
3. **不要使用 emoji**：参考 `memory/feedback_no_emoji.md`，所有"图标位"用 inline SVG 或 Unicode 几何符号（▲ ▼ ▌ ▸ ▾ ★ ·）。
4. **不要 React**：本页全部 vanilla JS，与 v1 一致。FAQ 用 `<details>` 原生即可，无需 React Disclosure。
5. **WhatsApp 绿是唯一动作色**：所有"前进 / 入群"动作必须 WhatsApp 绿。橙红只用于"危险 / 倒计时 / 截止"。蓝色只用于"信息 / 链接"。

---

## 16. Frontend-design Skill 自检（任务 #2 要求第 8 项）

已调用 `frontend-design` skill 获取设计指导，核心反馈整合：

| skill 指导原则 | v2 落地方式 |
|---------------|-------------|
| 字体避免 Inter/Roboto 等 generic | 用 IBM Plex 全家 + Archivo Black（罕见组合）|
| 颜色避免紫渐变白底俗气 | 报纸米黄 + 钢蓝 + 印章红，零渐变（除 highlighter）|
| 字体配对：display + body | IBM Plex Serif（display）+ Archivo（body）+ Plex Mono（terminal accent）+ Archivo Black（数字）|
| 装饰：纸纹 / 网格 / 印章 | 32px CSS grid 底纹 + SVG 颗粒 + SVG 印章 + 黄 highlighter |
| 不规则布局 | 印章斜贴 -12° / 文档卡居中 760px 窄栏 / hero 报纸刊头 + 期号右上 |
| 动效"大动效少而精" | 4 个核心动效：reveal stagger / price pulse / countdown flip / sticky slide |
| 一个让人记住的细节 | **模糊 today's pick + 印章 + unlock 按钮** —— v2 的 signature moment |

---

## Appendix A · 与 v1 的代码复用边界

| 复用 | 不复用 |
|------|--------|
| BaseLayout / PluginLoader 机制 | CSS 变量（全部重命名 `--bg-deep` → `--paper`）|
| `.link-btn` + main.js jump 机制 | 字体（Bebas Neue → IBM Plex 全家）|
| IntersectionObserver reveal 套路 | Hero 暗背景 + 金渐变 |
| Astro frontmatter import 图片 `.src` | Breaking bar 红底（改深蓝底 + 黄 badge）|
| 倒计时 JS 模板 | 单屏 squeeze 结构（v2 是 8 区块长页）|

v2 应在 `src/pages/CA/20260524-1.0/index.astro` 全新写，**不**从 v1 文件 fork。
