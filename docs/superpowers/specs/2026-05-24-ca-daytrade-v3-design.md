# Canadian Day-Trade Insider v3 — Substack Letter Landing Page Design Spec

- **Date**: 2026-05-24
- **Region**: CA (Canada / English EN-CA)
- **Page path**: `src/pages/CA/20260524-2.0/index.astro`
- **Build URL**: `/CA/20260524-2.0/`
- **CTA target**: WhatsApp 入群（via `mixinJump` / `whatsapp_link`，已在 v2 阶段在 jump.ts 加好）
- **Page type**: 黑页（强 FOMO + 用户授权擦边）
- **Status**: Approved, awaiting copy (#5) + assets (#7)

---

## 0. v2 → v3 Differentiation Brief

CA 项目这两周已经有两张落地页：

| 维度 | v1 (20260522-1.0) | v2 (20260524-1.0) | **v3 (20260524-2.0)** |
|------|---------------------|----------------------|------------------------|
| 体裁 | Squeeze 一屏 | 编辑式报纸长页 | **Substack 私人信件长文** |
| 主色 | 暗黑 + 金渐变 | 报纸米 + 钢墨蓝 + 印章红 | **纯白 + 深炭墨 + Substack 黄 #FFE3B7 + 警示橙 #FF4828** |
| 字体 | Bebas Neue + Inter | IBM Plex Serif + Archivo + Plex Mono | **Source Serif 4 全家 + JetBrains Mono（setup 块） + Caveat（手写笔迹下划线）** |
| 布局宽度 | 全宽 | 1140px 多栏 | **窄列 660px 单栏阅读** |
| 视角 | "我们公司告诉你" | "编辑团队告诉你" | **"我（作者本人）写信给你"** |
| 钩子 | 暴涨故事 | 50 席稀缺 + 模糊 Pick | **作者第一人称 + 学员真实 PnL + 账户截图** |
| 信任锚 | 4 名分析师团队 | 4 张分析师卡 + 印章 | **1 个作者本人 + 履历 + Substack 风格 follower count** |
| 紧迫感 | 午夜截止 | 50 席 + 倒计时 | **"12 小时后我关闭名额"+ 阅读进度 sticky 顶栏** |
| 装饰 | 金渐变 + radial glow | 印章 + 网格底纹 | **手写笔迹下划线 + 黄色 marker 划重点 + 信封邮戳** |
| Signature moment | "10X mining boom" big H1 | Blurred Today's Pick + Members Only 印章 | **Drop cap "I" + 模拟手 highlight 关键短语 + 账户截图（PnL +247%）** |

**核心一句话**：v2 让你觉得"我刚好被邀请进圈子"；v3 让你觉得"这个人在跟我个人说话，他打印的信我刚收到"。

---

## 1. 视觉关键词

- **Personal Substack Letter**（个人 Substack 信）
- **Read it, don't scan it**（让你阅读，不是扫读）
- **Hand-annotated**（手工划重点的痕迹）
- **Quiet conviction**（克制但笃定）

参考意象：Substack 邮件 web view、Stratechery 文章页、Pomp Letter、Bulletin（Meta 已关停但视觉风格仍是 newsletter LP 黄金参考）、ben thompson 的 daily update、Lex Fridman blog。**注意：所有这些参考都不出现 hero image banner，因为 newsletter 视觉的核心是文字本身**。

---

## 2. 色板：Substack White + Marker Yellow + Alert Orange

整体气质从"刊物 / 公司"切换到"个人 / 信件"，所以**色彩从克制变成几乎没有色彩**——只留 3 个签名色：黄 highlighter（划重点）+ 橙 alert（亏损 / 紧迫）+ WhatsApp 绿（动作）。

| 用途 | 变量 | 值 | 备注 |
|------|------|----|------|
| 页面底色 | `--page` | `#FFFFFF` | 纯白，无米色 |
| 正文（深炭墨，**非纯黑**） | `--ink` | `#1A1A1F` | 黑里带一点点蓝，长文阅读更柔 |
| 辅助灰 | `--ink-soft` | `#3D3D45` | 引言、次级 |
| 元数据灰 | `--meta` | `#6B6B73` | 时间戳、follower count |
| 极淡分隔线 | `--rule` | `rgba(26, 26, 31, 0.1)` | |
| 强分隔线 | `--rule-strong` | `rgba(26, 26, 31, 0.22)` | |
| 极浅灰背景（paywall / setup 块） | `--paper-soft` | `#F8F7F4` | 比白稍暖一点的灰 |
| **签名黄（marker highlight）** | `--marker` | `#FFE3B7` | Substack 标志色 |
| 签名黄深一档 | `--marker-deep` | `#FFD276` | hover / 强调 |
| **警示橙（alert / 数字红跌段 / 倒计时）** | `--alert` | `#FF4828` | 高饱和橙红 |
| 警示橙 soft | `--alert-soft` | `rgba(255, 72, 40, 0.1)` | tag 底 |
| 正收益绿（账户曲线） | `--gain` | `#1C9D55` | 比 WhatsApp 绿略深，避免冲突 |
| **WhatsApp 绿 CTA** | `--wa-green` | `#25D366` | 同 v2 复用 |
| WhatsApp 深绿 | `--wa-green-deep` | `#128C7E` | hover / 阴影 |
| 手写笔迹色 | `--ink-pen` | `#2E4FA8` | 蓝黑色钢笔，**仅用在 Caveat 字体的手写元素**，区分于黑色印刷字 |

**配色原则**：99% 黑白 + 0.5% 黄 highlighter + 0.3% 橙 alert + 0.2% WhatsApp 绿。任何蓝/红/紫不要乱进。**这个比例和 v2 的"80/15/5"刻意拉开**——v3 更激进的留白。

---

## 3. 字体栈

| 角色 | 字体 | 来源 | 用途 |
|------|------|------|------|
| **Body Serif** | **Source Serif 4** | Google Fonts | 所有正文、标题、引言、author name |
| **Mono** | **JetBrains Mono** | Google Fonts | Setup Teaser 代码块、账户截图数字、日期戳 |
| **Handwriting accent** | **Caveat** | Google Fonts | 手写下划线、PS 段笔迹批注、关键句下方手写圆圈、签名 |
| Fallback serif | Charter, Georgia, "Times New Roman" | 系统 | Source Serif 加载失败 |
| Fallback mono | Menlo, Consolas | 系统 | JetBrains Mono 加载失败 |

**对比 v1/v2**：
- v1 用 Bebas Neue（街头粗壮）
- v2 用 IBM Plex Serif（编辑严肃）
- **v3 用 Source Serif 4（个人 / 阅读 / 信件）**——Adobe 出品，被 Substack 默认采用，自带"Newsletter"基因
- v3 引入 **Caveat 手写体**作为第二字体，模拟"作者手工划重点"——这是 v3 的 signature font 选择，v1/v2 都没用过

### 字号 / 字距规范（窄列阅读优化）

| 元素 | 字体 | 桌面 | 移动 | 字重 | line-height | 字距 |
|------|------|------|------|------|-------------|------|
| LetterHeader 大日期 | JetBrains Mono | 13px | 12px | 500 | 1.4 | 0.06em |
| LetterHeader "Re:" | Source Serif 4 italic | 17px | 16px | 400 italic | 1.5 | 0 |
| Author name | Source Serif 4 | 19px | 17px | 600 | 1.3 | -0.005em |
| Author meta | Source Serif 4 | 14px | 13px | 400 | 1.5 | 0 |
| Follower count num | JetBrains Mono | 14px | 13px | 600 | 1.3 | 0.02em |
| H1（Letter subject） | Source Serif 4 | **44px** | **30px** | 600 | 1.15 | -0.015em |
| H2（区块小标题） | Source Serif 4 | 26px | 22px | 600 | 1.2 | -0.01em |
| Drop cap "I" 首字母 | Source Serif 4 | **88px** | **64px** | 700 | 0.85 | -0.04em |
| Body p | Source Serif 4 | **19px** | 17px | 400 | **1.72** | 0 |
| Body p strong | Source Serif 4 | 19px | 17px | 700 | 1.72 | 0 |
| Body p mark（黄 highlight） | Source Serif 4 | 19px | 17px | 500 | 1.72 | 0 |
| Story Card body | Source Serif 4 | 17px | 16px | 400 | 1.65 | 0 |
| Story Card name | Source Serif 4 | 17px | 16px | 700 | 1.3 | -0.005em |
| Story Card city | JetBrains Mono | 12px | 11px | 500 | 1.4 | 0.08em uppercase |
| Setup Teaser mono | JetBrains Mono | 14px | 13px | 500 | 1.65 | 0 |
| PnL number（账户截图） | JetBrains Mono | 30px | 26px | 700 | 1.1 | -0.02em |
| Paywall H | Source Serif 4 | 24px | 21px | 600 | 1.25 | -0.005em |
| Paywall sub | Source Serif 4 italic | 17px | 15px | 400 italic | 1.5 | 0 |
| Handwriting accent | Caveat | 22px | 20px | 500 | 1.2 | 0 |
| Handwriting big（PS） | Caveat | 28px | 24px | 500 | 1.2 | 0 |
| Footer disclaimer | Source Serif 4 | 12px | 11px | 400 | 1.55 | 0 |

### 加载策略

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;0,8..60,700;1,8..60,400;1,8..60,500&family=JetBrains+Mono:wght@400;500;600;700&family=Caveat:wght@400;500;600&display=swap" rel="stylesheet" />
```

**注**：Source Serif 4 用 `opsz`（optical size variable axis），在 8-60pt 自动调整字形细节，是 v3 与 v2 最显著的字体技术差异。

---

## 4. 版式 token（newsletter 阅读优化）

```css
--container-letter: 660px;     /* 标准 Substack 文章宽度，桌面/平板/移动统一 */
--container-wide:   720px;     /* 个别区块需要稍宽时（paywall card） */
--container-cta:    480px;     /* CTA 行更窄居中 */
--gutter-x-desktop: 32px;
--gutter-x-mobile:  20px;
--rhythm-paragraph: 24px;      /* 段落间距 */
--rhythm-section:   80px;      /* 大区块之间 */
--rhythm-section-m: 56px;      /* 移动 */
```

间距尺度：4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 120 px。

**核心：所有内容统一窄列 660px**。这是 Substack 阅读舒适度的 sweet spot（约 60-75 字符/行 @ 19px）。

---

## 5. 版块布局图

```
═══════════════════════════════════════════════════════════════
[STICKY] 顶栏 progress bar
        ┌──────────────────────────────────────────────────┐
        │ ░░░░░░░░░░░░░░░░░░░  3 min read · WA →           │
        └──────────────────────────────────────────────────┘
        默认隐藏；阅读进度 ≥30% 触发滑入；
        高度 44px；细 2px 黄色进度条（top）；
        小 WhatsApp 文字按钮（right）

═══════════════════════════════════════════════════════════════

  ┌──────────────── 660px 窄列阅读区 ────────────────┐

  [1] LetterHeader（信封头）
      MAY 24, 2026  ·  LETTER №14
      ────────────────────────────────────
      Re: The setup I'm watching tonight

  [2] AuthorBlock
      ┌──[photo 56×56 round]── Daniel R. Whelan
      │                        Former Bay Street · 18 yrs TSX-V
      │                        ─
      │                        12,438 readers  ·  Subscribed
      └

  [3] LeadParagraph（drop cap 大 "I"）
      ┌──┐
      │I │ wrote this letter at 6:47 AM,
      │  │ before the bell rang on Bay Street,
      └──┘ because what I'm seeing tonight is
      starting to look like the spring of 2023 all
      over again — except this time, ━━[黄色 marker
      highlight]━━ I'm not telling my analysts about
      it. I'm telling you. ━━━━━━━━━━━━━━━

      [Caveat 手写下划线：← that's the part that matters]

  [4] StoryCard ×3（Joshua / Marcus / Diane）

      ┌────┐  Joshua, 47 · Mississauga, ON
      │ 🖼 │  Last month, Joshua closed
      └────┘  +$18,400 on a single CCJ setup
              ─ his entire HVAC paycheck for
              the year, in 4 trading sessions.

      ┌────┐  Marcus, 52 · Burlington, ON
      │ 🖼 │  Bought my first signal on a
      └────┘  Wednesday morning. Sold the
              following Tuesday. +247% on the
              position.

      ┌────┐  Diane, 58 · Vancouver, BC
      │ 🖼 │  I was scared. I'd been burned
      └────┘  on canna stocks in 2021. This
              feels different. Slow, methodical.
              +$11,200 in 6 weeks.

  [5] SetupTeaser（mono 代码块感）
      ┌────────────────────────────────────────┐
      │  THE 3 SETUPS I'M WATCHING TONIGHT     │
      │  ────────────────────────────          │
      │                                        │
      │  #1   Uranium junior · Athabasca       │
      │       Entry: C$ █.██                   │
      │       Catalyst: drill in 7d            │
      │                                        │
      │  #2   Copper mid-cap · Sudbury basin   │
      │       Entry: C$ ██.██                  │
      │       Catalyst: smelter capacity Q3    │
      │                                        │
      │  #3   Lithium spinoff · TSX-V          │
      │       Entry: C$ █.██                   │
      │       Catalyst: PEA expected           │
      │                                        │
      │  ─ Full tickers in the room ─          │
      └────────────────────────────────────────┘

      [account-screenshot.png 满宽窄列展示]
      ┌────────────────────────────────────────┐
      │  My account · last 90 days             │
      │     $58,420  ▲ +247%                   │
      │     ╱╲                                 │
      │    ╱  ╲      ╱╲╱╲                      │
      │   ╱    ╲    ╱    ╲    ╱╲╱              │
      │  ╱      ╲╱╲╱      ╲╱╲╱                 │
      │  May 25         Aug 24                 │
      └────────────────────────────────────────┘

  [6] InlinePaywallCard
      ┌────────────────────────────────────────┐
      │                                        │
      │   Read the rest in the room.           │
      │   ─                                    │
      │   The tickers, the entries, the        │
      │   stop-loss levels — they're all       │
      │   posted to the WhatsApp room.         │
      │                                        │
      │   ┌──────────────────────────────┐     │
      │   │ [WA] JOIN DANIEL'S ROOM →    │     │
      │   └──────────────────────────────┘     │
      │                                        │
      │   ▌ 12 hours left to claim today's     │
      │     free seat.                         │
      │                                        │
      └────────────────────────────────────────┘

  [7] PsBlock（手写 PS 风）
      ┌───────────────────────────────────────┐
      │                                       │
      │   P.S.                                │
      │                                       │
      │   If you've been watching mining      │
      │   stocks from the sidelines for       │
      │   the last 6 months — this is the     │
      │   week. I'm closing the room at       │
      │   midnight EST. No exceptions.        │
      │                                       │
      │           ── Daniel  [Caveat 手写签名] │
      │                                       │
      └───────────────────────────────────────┘

  [8] FooterMinimal
      ─────────────────────────────────────────
      © 2026 · Editorial publication only ·
      Not investment advice ·
      mailto:daniel@tsxv-insider.com

  └─────────────────── 660px 窄列结束 ──────────────────┘
```

---

## 6. 组件清单（每个组件含尺寸 / props / 文案接入点）

所有组件**内联在 single index.astro**（与 v2 一致，不引入 React）。

### 6.1 `LetterHeader`
- 容器宽 660，居中
- 顶部 16px paddingTop
- 上面一行：`MAY 24, 2026  ·  LETTER №14` — JetBrains Mono 13/12，灰色 `--meta`，字距 0.06em
- 下面一行：细 1px 横线 `--rule-strong`，宽度 80px（**不通栏**，仅作 letter 起始 mark）
- 主标题 H1：Source Serif 4 44/30，weight 600，line-height 1.15，**左对齐**
- 副标题（Re:）：italic 17/16，`--ink-soft`，紧贴 H1 下方 6px
- 整体 padding-bottom 48px，下边界 1px `--rule` 横线

### 6.2 `AuthorBlock`
- 容器宽 660，居中
- 横向 flex：左 56×56 圆形头像 + 右文字
- 头像：`object-fit: cover`，圆形，2px 白边 + 1px outline `--rule`
- 右侧分两行：
  - 第一行：作者全名（Source Serif 4 600，19/17，`--ink`）
  - 第二行：履历一行（Source Serif 4 400，14/13，`--ink-soft`）
- 第三行：极小的"Substack-style follower bar"
  - 圆点（4×4 实心圆 `--gain`）+ `12,438 readers` (mono 14/13) + middot + italic "Subscribed" (灰色)
- gap 16px between avatar 和 text
- 整体 padding 32px 0 24px，下边界 1px `--rule` 横线

### 6.3 `LeadParagraph`
- 容器宽 660，padding-top 40px
- Drop cap "I"（CSS `::first-letter` 或单独 `<span class="dropcap">`）：
  - 字号 88/64
  - 字重 700
  - line-height 0.85
  - float left
  - margin: 8px 12px 0 0
  - color `--ink`
  - 用 Source Serif 4 700
  - **保留 0.92x scale 让它视觉刚好 align baseline**
- 段落本身：19/17，line-height 1.72，segment 中可包含 `<mark class="hl">…</mark>` 黄 marker highlight
- 段落下方紧接：一行 Caveat 22/20 手写体（蓝色 `--ink-pen`），略斜（CSS `transform: rotate(-1.5deg) translateY(-4px)`），左侧 60px margin-left（模拟手写在段落底部空白处加的批注）

### 6.4 `StoryCard`（×3）
- 容器宽 660，3 张垂直排列，间距 32px
- 单卡内部：左侧 64×64 圆形头像 + 右侧叙事
- 头像 outline 1px `--rule`，2px white edge
- 右侧上下：
  - 标题行：`姓名` (Source Serif 4 700, 17/16) + middot + `年龄岁` + middot + `城市` (JetBrains Mono 12/11 uppercase letter-spacing 0.08em, `--meta`)
  - 引言：Source Serif 4 17/16，line-height 1.65，**关键 PnL 数字用 `<strong class="pnl">+$18,400</strong>`** 加粗 + 警示橙 `--alert`
- 卡片**无边框、无背景** —— 只用 16px gap + 64px 头像作为视觉分隔
- 第一张卡上方有一个 32×1 黄色 `--marker` 短横线（类似"开始一段新内容"）

### 6.5 `SetupTeaser`
- 容器宽 660，居中
- 顶部一个 caveat 手写 22/20 蓝色（`--ink-pen`）："here's what I'm seeing tonight ↓"，rotate -1deg
- 主体一个 mono 卡：
  - 背景 `--paper-soft`（极浅米灰）
  - 1px `--rule-strong` 边框
  - 圆角 4px（不要太圆，要"机器感"）
  - padding 32px 36px
  - 内部字体 JetBrains Mono 14/13
  - 标题一行大写 + 一行 `─` 横线
  - 3 条 setup 每条 3-4 行（#1 / Entry / Catalyst），ticker / 价格 / 市值用 `█` 字符遮（与 v2 pick blur 不同——v2 是 CSS blur，v3 是真用 `█` 字符制造打字机感）
  - 最后一行居中："─ Full tickers in the room ─"
- 卡下方 24px 处放 **account-screenshot.png**（满 660 宽，原生比例）
  - 截图自带"+247% / $58,420"等大字
  - 截图上覆盖一个极薄的 1px `--rule-strong` 边框 + 4px 圆角

### 6.6 `InlinePaywallCard` ⭐ Signature moment 之一
- 容器宽 720（**比正文窄列稍宽**，制造"行内卡片浮出"感）
- 居中
- padding 48px 40px
- 背景 `--paper-soft`
- **左侧粗 4px 实线 `--marker`**（黄色 marker 边——这是 v3 的 signature 装饰元素）
- 圆角 4px
- 无 shadow（保持 Substack 的"印刷品"感，**不要任何阴影**）
- 内部：
  - H 标题：Source Serif 4 600 24/21
  - 一个 `─` 24×1 mark 横线（黑色 `--ink`）
  - 描述段：italic 17/15，`--ink-soft`，最多 3 行
  - 一个 WhatsApp 绿 CTA（`.cta-wa`，全宽，与 v2 复用样式）
  - 紧迫感小字：左侧 3px 实线 `--alert` 竖线 + 橙字 "12 hours left to claim today's free seat"

### 6.7 `PsBlock`
- 容器宽 660
- padding-top 80px
- 内部 padding 32px 0
- 上下各一条 1px `--rule` 横线
- 内部："P.S." 用 Caveat 28/24 蓝色（`--ink-pen`），左对齐
- PS 正文：Source Serif 4 italic 17/16，line-height 1.7，`--ink`
- 末尾签名："── Daniel" 用 Caveat 28/24 蓝色，**右对齐**，下方一条小 80×1 蓝色 `--ink-pen` 短横（仿手写签名下划线）

### 6.8 `FooterMinimal`
- 容器宽 660
- padding 56px 0 72px
- 文字 Source Serif 4 12/11，`--meta`，**居左对齐**（不要 center，保持邮件页脚的随意感）
- 3 行：
  - "© 2026 Daniel R. Whelan · TSX-V Insider Letter · Toronto, ON"
  - "Editorial publication only. Not investment advice. Past performance does not predict future results."
  - "Email: daniel@tsxv-insider.com  ·  Reply to unsubscribe"（第 3 行模拟"真实邮件签名"，加 mailto 链接）

### 6.9 `StickyProgressBar` ⭐ Signature moment 之二
- fixed top:0，width 100%，z-index 100
- 默认 `transform: translateY(-100%)`，IO 触发 ≥30% 阅读时 slide-down
- 高度 44px，背景 white，底部 1px `--rule`
- 顶部一条 2px 全宽进度条（`--marker` 黄色），width 随阅读进度 0→100%
- 内部三列：
  - 左：`LETTER №14 · MAY 24` (JetBrains Mono 12, `--meta`)
  - 中：`3 min read · 64% done` (mono 12, `--meta`)
  - 右：小号 WhatsApp 绿按钮 `Join the room →` (高度 32, padding 6px 14px, 字号 13)
- transition 300ms cubic-bezier
- mobile：左/中合并为单列 `LETTER №14 · 64% done`，右侧 CTA 保留

### 6.10 辅助元素

**Marker Highlight `<mark class="hl">…</mark>`**
- 背景 linear-gradient（180deg, transparent 55%, var(--marker) 55%, var(--marker) 95%, transparent 95%）
- padding 0 4px
- color: inherit
- **不规则地**应用于段落中（每段最多 1 处），制造"手动划黄"的不齐感
- 部分位置可以 rotate(-0.5deg) 让 marker 显得有一点"歪"

**Handwriting Underline（Caveat 字体 + 手写下划线 SVG）**
- 用一个 inline SVG `<path d="M 0,4 Q 50,0 100,3 T 200,5">` 蓝色 `--ink-pen` stroke-width 2
- 出现在某些关键句**下方**（一段 inline scribble，不是 underline）

**Letter Stamp（可选）**
- 右上角 inline SVG 圆形邮戳样式，"MEMBERS ONLY · DELIVERED" 环绕字，`--marker` 黄色描边，opacity 0.4
- 仅出现在 LetterHeader 区右上（绝对定位）

---

## 7. 移动端断点策略

| 断点 | 行为 |
|------|------|
| `>=720px` | 标准窄列 660 居中，sticky bar 三列布局 |
| `481-720px` | 窄列自动撑满，左右 padding 20px，sticky bar 两列 |
| `<=480px` | H1 字号降 30px，drop cap 64px，story card 头像 56px |

**核心**：v3 mobile 不需要重排——窄列 660 本就比手机宽，自动撑满即可。这是 v3 vs v2 的另一个差异化点（v2 有大量响应式重排，v3 几乎不需要）。

---

## 8. 动效策略（极简）

**严格只允许这 3 种动效**：

1. **Reveal-on-scroll**：沿用 v2 的 IntersectionObserver pattern，opacity 0→1 + translateY 16px→0，stagger 60ms。**幅度比 v2 更小**（v2 是 20px，v3 是 16px），减少"动起来"的痕迹。
2. **StickyProgressBar slide-in**：阅读进度 ≥30% 触发 slide-down，300ms ease。
3. **CTA hover**：WhatsApp 按钮微 `translateY(-1px)` + 阴影强化。无 scale，无 color shift。

**严格禁止**：
- parallax / 视差
- 闪烁 / blink / pulse（除 sticky progress bar 顶部 2px 进度条本身的 width 过渡，那不算闪烁）
- 弹跳 / bounce / spring
- 倒计时 flip / 翻牌
- 鼠标跟随 / cursor effects
- 自动滚动 / autoplay

这一条与 v2 的 4 种动效（reveal / price pulse / blur unblur / sticky slide）形成对比——**v3 是"信件"，信件不动**。

---

## 9. 视觉装饰细节

只用 5 个装饰元素，全部承担"手写 / 信件"语义：

### 9.1 黄色 marker highlight
不规则地划在段落中。CSS:
```css
.hl {
  background: linear-gradient(180deg,
    transparent 55%,
    var(--marker) 55%,
    var(--marker) 95%,
    transparent 95%);
  padding: 0 4px;
}
.hl--tilt {
  display: inline-block;
  transform: rotate(-0.5deg);
}
```
变体 `.hl--tilt` 让某些 highlight 微微歪斜，避免"机器化"。

### 9.2 手写 SVG 下划线（Caveat 旁的 scribble）
```html
<svg class="scribble" viewBox="0 0 220 12" aria-hidden="true">
  <path d="M 4,7 Q 40,2 80,6 T 160,5 T 216,8"
        stroke="var(--ink-pen)" stroke-width="2.2"
        fill="none" stroke-linecap="round" />
</svg>
```
- 出现在某些关键短语下方
- 颜色用 `--ink-pen`（钢笔蓝黑），与黑色印刷字区分
- 不要超过页面 4 处（多了就假）

### 9.3 邮戳（可选 letterhead-stamp.svg）
- 圆形邮戳，`MEMBERS ONLY · DELIVERED · MAY 24` 环绕字
- 颜色 `--marker` 黄
- opacity 0.4
- 绝对定位在 LetterHeader 右上，rotate(-8deg)

### 9.4 段落首字符 drop cap
**signature moment**——CSS：
```css
.lead p:first-child::first-letter {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 88px;
  line-height: 0.85;
  float: left;
  margin: 8px 12px 0 0;
  color: var(--ink);
}
@media (max-width: 480px) {
  .lead p:first-child::first-letter { font-size: 64px; }
}
```
首字母会自然落在 "I" 上（marketer 文案开篇 "I wrote this letter at 6:47 AM..."），形成 v3 最强视觉记忆点。

### 9.5 黄色 marker 左侧边（paywall card 装饰）
```css
.paywall-card {
  border-left: 4px solid var(--marker);
  background: var(--paper-soft);
  /* 无 shadow，保持印刷感 */
}
```
**这是 v3 paywall 的 signature**——v2 paywall 是黑底卡 + 红印章 + blur，v3 是浅灰底卡 + 黄边 + 无阴影，气质完全不同。

---

## 10. 关键 CSS 片段（实现参考）

### 10.1 CSS Variables
```css
:root {
  --page:           #FFFFFF;
  --ink:            #1A1A1F;
  --ink-soft:       #3D3D45;
  --meta:           #6B6B73;
  --rule:           rgba(26, 26, 31, 0.1);
  --rule-strong:    rgba(26, 26, 31, 0.22);
  --paper-soft:     #F8F7F4;
  --marker:         #FFE3B7;
  --marker-deep:    #FFD276;
  --alert:          #FF4828;
  --alert-soft:     rgba(255, 72, 40, 0.1);
  --gain:           #1C9D55;
  --wa-green:       #25D366;
  --wa-green-deep:  #128C7E;
  --ink-pen:        #2E4FA8;

  --font-serif:     'Source Serif 4', Charter, Georgia, 'Times New Roman', serif;
  --font-mono:      'JetBrains Mono', Menlo, Consolas, monospace;
  --font-hand:      'Caveat', cursive;

  --container-letter: 660px;
  --container-wide:   720px;
  --container-cta:    480px;
}
```

### 10.2 H1 + drop cap
```css
.letter-h1 {
  font-family: var(--font-serif);
  font-size: clamp(30px, 5vw, 44px);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.015em;
  color: var(--ink);
  margin: 0;
}
.letter-h1-sub {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(15px, 1.6vw, 17px);
  color: var(--ink-soft);
  margin: 8px 0 0;
}
.lead {
  font-family: var(--font-serif);
  font-size: clamp(17px, 1.9vw, 19px);
  line-height: 1.72;
  color: var(--ink);
  margin: 32px 0 0;
}
.lead p:first-child::first-letter {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: clamp(64px, 9vw, 88px);
  line-height: 0.85;
  float: left;
  margin: 6px 12px -2px 0;
  color: var(--ink);
}
```

### 10.3 Marker highlight + handwriting accent
```css
.hl {
  background: linear-gradient(180deg,
    transparent 55%, var(--marker) 55%,
    var(--marker) 95%, transparent 95%);
  padding: 0 4px;
}
.hl--tilt { display: inline-block; transform: rotate(-0.5deg); }
.hand {
  font-family: var(--font-hand);
  font-size: clamp(20px, 2.3vw, 22px);
  color: var(--ink-pen);
  font-weight: 500;
  display: inline-block;
  transform: rotate(-1.5deg);
  margin-top: 12px;
  margin-left: 32px;
  line-height: 1.2;
}
```

### 10.4 Sticky progress bar
```css
.sticky-bar {
  position: fixed; top: 0; left: 0; right: 0;
  height: 44px;
  background: var(--page);
  border-bottom: 1px solid var(--rule);
  z-index: 100;
  transform: translateY(-100%);
  transition: transform .3s cubic-bezier(.22, 1, .36, 1);
  display: flex; align-items: center;
}
.sticky-bar.is-visible { transform: translateY(0); }
.sticky-bar .progress {
  position: absolute; top: 0; left: 0;
  height: 2px; width: var(--scroll-progress, 0%);
  background: var(--marker);
  transition: width .12s linear;
}
.sticky-bar-inner {
  width: 100%; max-width: var(--container-letter);
  margin: 0 auto; padding: 0 24px;
  display: flex; align-items: center; justify-content: space-between;
  font-family: var(--font-mono); font-size: 12px;
  color: var(--meta); gap: 16px;
}
.sticky-bar .cta-wa-mini {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 14px;
  background: var(--wa-green);
  color: #fff;
  font-family: var(--font-serif); font-weight: 600;
  font-size: 13px;
  border-radius: 4px;
  text-decoration: none;
}
```

### 10.5 Paywall card
```css
.paywall-card {
  max-width: var(--container-wide);
  margin: 56px auto 0;
  background: var(--paper-soft);
  border-left: 4px solid var(--marker);
  padding: 48px 40px;
  border-radius: 4px;
}
.paywall-h {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: clamp(21px, 2.4vw, 24px);
  letter-spacing: -0.005em;
  margin: 0;
}
.paywall-rule {
  width: 24px; height: 2px;
  background: var(--ink);
  margin: 14px 0 18px;
}
.paywall-sub {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(15px, 1.7vw, 17px);
  line-height: 1.5;
  color: var(--ink-soft);
  margin: 0 0 28px;
  max-width: 520px;
}
.paywall-urgency {
  margin-top: 18px;
  padding-left: 12px;
  border-left: 3px solid var(--alert);
  color: var(--alert);
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: 14px;
  line-height: 1.4;
}
@media (max-width: 768px) {
  .paywall-card { padding: 32px 24px; }
}
```

### 10.6 Story card
```css
.story-grid {
  margin: 56px 0 0;
  display: flex; flex-direction: column;
  gap: 32px;
}
.story-grid::before {
  content: '';
  display: block; width: 32px; height: 1px;
  background: var(--marker-deep);
  margin-bottom: 8px;
}
.story-card {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 20px;
  align-items: flex-start;
}
.story-photo {
  width: 64px; height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--page);
  outline: 1px solid var(--rule);
}
.story-meta {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--meta);
  margin: 0 0 8px;
}
.story-meta .name {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 17px;
  letter-spacing: -0.005em;
  text-transform: none;
  color: var(--ink);
  margin-right: 8px;
}
.story-body {
  font-family: var(--font-serif);
  font-size: clamp(16px, 1.8vw, 17px);
  line-height: 1.65;
  color: var(--ink);
  margin: 0;
}
.story-body .pnl {
  color: var(--alert);
  font-weight: 700;
}
```

### 10.7 Setup teaser mono block
```css
.setup-card {
  background: var(--paper-soft);
  border: 1px solid var(--rule-strong);
  border-radius: 4px;
  padding: 32px 36px;
  margin: 24px 0 0;
  font-family: var(--font-mono);
  font-size: clamp(13px, 1.4vw, 14px);
  line-height: 1.65;
  color: var(--ink);
}
.setup-card h3 {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0 0 12px;
}
.setup-card .rule {
  width: 100%; height: 0;
  border-top: 1px dashed var(--rule-strong);
  margin: 0 0 24px;
}
.setup-item { margin-bottom: 20px; }
.setup-item:last-child { margin-bottom: 0; }
.setup-item .num {
  color: var(--marker-deep);
  font-weight: 700;
}
.setup-item .blur {
  letter-spacing: 0.06em;
}
.setup-card .room-rule {
  text-align: center;
  margin-top: 24px;
  color: var(--meta);
}
@media (max-width: 768px) {
  .setup-card { padding: 24px 20px; }
}
```

---

## 11. 视觉素材清单（交给 artist / task #7）

⚠️ **本节解决 v2 artist 反馈："v2 测试稿因为没有给我'头部占比 / 裁剪比例'，200×200 缩水后脸只占 80px"。本次源头给出具体指标，artist 必须遵守。**

| 资产 | 原图尺寸 | 用途位置 | CSS 展示尺寸 | **头部占比** | **裁剪比例** | 备注 |
|------|----------|----------|--------------|--------------|--------------|------|
| `author-portrait.jpg` | **1200×1200** | AuthorBlock 圆形 | 56×56 (CSS px, 2x = 112) | **头部高度 ≥ 70% of frame** | 1:1 正方，face center horizontally, eyes 在 vertical 35-40% | Daniel R. Whelan，FT/WSJ portrait 调，但比 v2 更"私人/近一档"。可读：办公室柔光 / 浅灰衬衫 / 中年白人男性 / 自然不假笑 / 直视镜头。**可以复用 v2 analyst-1.jpg 如果尺寸符合**。 |
| `story-1.jpg` (Joshua) | **800×800** | StoryCard 圆形 | 64×64 (2x = 128) | **头部高度 ≥ 75% of frame** | 1:1，face slightly right-offset 让圆形 crop 看起来更自然 | 47 岁 HVAC 男性，Mississauga，户外或半户外背景，**生活照不要 studio**，戴棒球帽或自然光，可以是皮卡前 / 工作服 / 自然 |
| `story-2.jpg` (Marcus) | **800×800** | StoryCard 圆形 | 64×64 (2x = 128) | **头部高度 ≥ 75%** | 1:1 | 52 岁，Burlington ON，retail 投资者气质，居家或办公室随手照、自然不正式 |
| `story-3.jpg` (Diane) | **800×800** | StoryCard 圆形 | 64×64 (2x = 128) | **头部高度 ≥ 75%** | 1:1 | 58 岁女性，Vancouver BC，温和气质，自然光，**可以是退休女性 / 一颗智识眼神** |
| `account-screenshot.png` | **1600×900** | SetupTeaser 下方满宽 | 660×约 372 (基本 16:9) | n/a | 16:9 横图 | ⭐ **v3 核心擦边视觉**。伪 brokerage UI：顶部 "ACCOUNT SUMMARY" 灰条 + 大数字 "$58,420 ▲ +247%"（橙色 `--alert`）+ 90 天 line chart（蓝色折线 + 几段红色回撤）+ 底部"trade history"前 3 行（隐去 ticker）。**所有可识别品牌 logo 必须去除**——用文字 "BROKERAGE" 通用化。Mono 字体数字（JetBrains Mono）。 |
| `letterhead-stamp.svg` | 内联 SVG | LetterHeader 右上角 | 80×80 (CSS px) | n/a | 圆形 | 可选。环绕字 "MEMBERS ONLY · DELIVERED · LETTER №14 · MEMBERS ONLY ·"，内圈中央 "POSTED" 或 "TRACKED"。`--marker` 黄色描边，opacity 0.4，rotate(-8deg)。**纯 SVG，无需 artist 出图**——designer 在 index.astro 内联 |

### 关键指标解释（给 artist 看的）

- **头部占比 = 头部最高点到下巴的高度 / 图片总高度**。70% 是 portrait 头像的舒适比例，确保 64×64 圆形 crop 后脸仍占 ≥ 45px，足够看清。
- **裁剪比例 1:1** 意味着原图必须是正方，方便 CSS `object-fit: cover` 居中圆形 mask 不丢脸。
- **face center horizontally + eyes 在 vertical 35-40%**：在小圆形头像里，眼睛是视觉焦点；必须在 crop 后落在圆中心略偏上的位置。
- 如果是 `master + edit-from` 流程，**master 必须是 1200×1200 portrait 头像**，edit-from 时只换 background/clothing 不换头部位置。

### artist 评估优先级

1. **优先复用 v2 已生成的池**（v2 analyst-1.jpg = Daniel？v2 testi 池 = Joshua/Marcus/Diane？）。复用前必须验证：尺寸 ≥ 800×800 + 头部占比 ≥ 70%。若 v2 testi-x.jpg 头部占比不足，要重生而不是 resize。
2. **account-screenshot.png** 是必出，不能复用。优先级最高，因为这张是 v3 与 v2 的关键视觉差异化。
3. letterhead-stamp.svg 纯 SVG，designer 内联即可，**artist 不用出**。

---

## 12. 文案接口（给 marketer / task #5 参考）

实现时需要以下文案 slot：

| slot | 类型 | 字符上限 | v3 示例 |
|------|------|---------|---------|
| `letter.date` | text | 16 | "May 24, 2026" |
| `letter.issue` | text | 16 | "Letter №14" |
| `letter.h1` | text | 80 | "The setup I'm watching tonight" |
| `letter.re` | text | 140 | "Re: Why I'm closing the room at midnight" |
| `author.name` | text | 32 | "Daniel R. Whelan" |
| `author.bio` | text | 80 | "Former Bay Street · 18 yrs TSX-V" |
| `author.followers` | number | 6 | 12438 |
| `lead.body` | rich (含 `<mark>` `<span class="hand">`) | 600 | 见上版块图 |
| `story[3].name` | text | 32 each | "Joshua, 47" |
| `story[3].city` | text | 32 | "Mississauga, ON" |
| `story[3].body` | rich (含 `<strong class="pnl">…</strong>`) | 280 | |
| `setup.title` | text | 40 | "THE 3 SETUPS I'M WATCHING TONIGHT" |
| `setup[3]` | structured (name / entry / catalyst) | n/a | 见版块图 |
| `paywall.h` | text | 60 | "Read the rest in the room." |
| `paywall.sub` | text | 200 | "The tickers, the entries, the stop-loss levels..." |
| `paywall.cta` | text | 32 | "Join Daniel's Room →" |
| `paywall.urgency` | text | 100 | "12 hours left to claim today's free seat" |
| `ps.body` | text | 400 | |
| `footer.disclaimer` | text | 300 | |

---

## 13. 合规策略（黑页 + 用户授权擦边）

按 task #5 描述，**用户已授权** v3 可以做的擦边：

- 明确收益数字（"+247% / +$18,400 / 3 口仓位"）
- 案例人物（带姓名 + 城市 + 职业 + 上月 PnL）
- 狂安语言压力（"再等只会更贵"、"12 小时后我关闭名额"）
- 损失厌恶钩子（"你正在错过"）

但**必须避免**：
- 真实公司名（用 TICKER 代号或 `#1 / Stock A` 或 `█` 字符遮，**与 v2 一致策略**）
- 政府/监管/银行 logo 套用
- 医疗 / 性 / 未成年人元素
- "保证 / guarantee / risk-free / 100%"等绝对词

**底部合规**（必备）：
- "Editorial publication only. Not investment advice."
- "Past performance does not predict future results."
- "We are not registered investment advisors."
- "Reply to unsubscribe."

设计上的合规体现：
- Footer 永远存在 + 字号清晰可读（12/11，不是 8/9）
- account-screenshot.png 不出现可识别的券商 logo
- 所有"+247%"等数字在 mockup 截图内，而**不是 HTML 文本**（避免爬虫直接抓）——这是 v3 与 v2 的另一个合规策略差异

---

## 14. 实施顺序（designer 后续认领 #8）

```
阶段 1（与 #5 / #7 并行）
  - artist 生成 4 张照片 + 1 张 account-screenshot
  - marketer 落 copy spec

阶段 2：骨架（#8 实现）
  - 创建 src/pages/CA/20260524-2.0/{,images/}
  - frontmatter + BaseLayout + CSS vars + 字体加载
  - 8 个区块占位 + sticky bar 占位

阶段 3：区块（顺序）
  - LetterHeader（含可选 letterhead-stamp SVG）
  - AuthorBlock
  - LeadParagraph（drop cap + 1 处 marker highlight + 1 行 caveat 手写）
  - StoryCard ×3（含 .pnl 高亮数字）
  - SetupTeaser（mono 卡 + 3 setup + account-screenshot 满宽）
  - InlinePaywallCard（黄色 marker 左边 + WA 大 CTA + 橙字紧迫）
  - PsBlock（caveat 签名）
  - FooterMinimal

阶段 4：sticky progress bar（IntersectionObserver + scroll progress %）

阶段 5：reveal 动效 + WhatsApp 跳转挂载 + GA 4 个 CTA 埋点（lead / paywall / sticky / ps if any）

阶段 6：浏览器实测（桌面 1440 + iPhone 375 emulated）
  - 沿用 v2 实测的 chrome-devtools-mcp 流程
  - 桌面：drop cap "I" 视觉冲击 + marker highlight 分布合理 + paywall 黄边醒目 + 账户曲线截图 sharp
  - 移动：660px 自动撑满 + sticky bar 两列布局正确 + caveat 手写不溢出
  - console 0 错误
  - bun build 编译通过
```

预估工时：5-6 小时（骨架 1.5h + 区块实现 2h + sticky bar 0.5h + 实测调试 1.5h）。

---

## 15. 设计原则备注（给自己 / 给实现 designer）

1. **保持窄列**：永远 660px 居中，不要因为"页面看起来太空"就拉宽。Substack 调性的 50% 来自窄列。
2. **保持白**：99% 留白 + 1% 黄/橙/绿。任何想加灰色卡片背景的冲动都要克制。
3. **保持衬线**：所有文字 Source Serif 4，**唯一例外**是 mono（setup teaser + account screenshot + meta dates）和 Caveat（手写笔迹 + 签名）。**不要再加第 4 种字体**。
4. **保持极简动效**：reveal + sticky slide + CTA hover——3 种动效，**不要再加第 4 种**。
5. **手写元素要克制**：整页最多 3 处 Caveat（lead 段下方批注 + PS 标记 + 末尾签名）+ 4 处 marker highlight。多了就假。
6. **drop cap "I" 是 hero**：marketer 文案必须以 "I" 开头，让 drop cap 自然落在 I 上。如果文案改成"You..."就要协调。
7. **account-screenshot 是核心擦边**：所有"+247%"等具体数字 inside 这张图，不在 HTML 文本里。
8. **禁止使用 emoji**：参考 `~/.claude/projects/-Users-yy-2-Areas-astro-landing/memory/feedback_no_emoji.md`。所有图标位用 inline SVG（WhatsApp / scribble）或 Unicode 几何（▲ ▼ · ─ ▌ ↓）。
9. **禁止 v2 的"印章 SVG + 模糊卡"重复使用**：v3 的 signature moment 是 drop cap + marker + account screenshot，不要再放红色印章。

---

## 16. Frontend-design Skill 自检（任务 #6 要求第 10 项之"差异化说明"已在 §0 / §15 处理；下表是 skill 反馈整合）

| skill 指导原则 | v3 落地方式 |
|---------------|-------------|
| 字体避免 Inter/Roboto 等 generic | 用 Source Serif 4 + JetBrains Mono + Caveat（罕见三件套）|
| 颜色避免紫渐变白底俗气 | 纯白 + 深炭墨 + 黄 marker + 橙 alert，零渐变（除 marker highlight 用 linear-gradient 制造"刷过"感）|
| 字体配对：display + body | Source Serif 4 600 标题 + 400 正文 + Caveat 手写 + JetBrains Mono 终端，4 种角色清晰分工 |
| 装饰：纸纹 / 网格 / 印章 | **删 v2 的网格底纹**——v3 是纯白 newsletter，**不**加底纹。仅保留可选邮戳。|
| 不规则布局 | drop cap 浮动 + marker highlight 微旋 + Caveat 手写元素旋 -1.5deg + paywall card 黄色左边 |
| 动效"大动效少而精" | 3 个动效全部 IntersectionObserver / scroll-based，**无 transform animation chain**。Substack 不动。 |
| 一个让人记住的细节 | **drop cap "I" + marker highlight + paywall 黄色左边 + account-screenshot +247%** ——4 个组成的视觉签名记忆点 |

---

## Appendix A · 与 v1/v2 的代码复用边界

| 复用 | 不复用 |
|------|--------|
| BaseLayout / PluginLoader / RedirectCode 机制 | CSS 变量（全部重命名 `--paper` → `--page`，`--ink-deep` → `--ink`，`--gold` 等→删除）|
| `.link-btn` + main.js + mixinJump 机制 | 字体（IBM Plex 全删，换 Source Serif 4 + JetBrains Mono + Caveat）|
| jump.ts 的 `jumpToWhatsApp`（v2 已加好）| Hero squeeze / 多栏布局 / 印章 SVG / 模糊卡 / 报纸刊头风 |
| IntersectionObserver reveal 套路 | breaking ticker bar（v3 不需要 ticker，sticky progress bar 取代）|
| GA `data-cta="<slot>"` 埋点 pattern | 倒计时大数字 + 席位进度条（v3 无席位机制）|
| Astro frontmatter import 图片 .src | 任何金色 / 印章红 / 模糊卡视觉 |

v3 应在 `src/pages/CA/20260524-2.0/index.astro` 全新写，**不**从 v2 fork。
