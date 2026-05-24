# CA KOL v4 — SaaS Product-Page Design Spec (Stripe Light Aesthetic)

> ⚠️ **v2 Retrofit · 2026-05-24**: 整体路线从 "Linear Dark" 改为 "Stripe Light"。底色 / 主字体 / CTA / 渐变 / 玻璃拟态 / hero mockup / 动效全部重置。详见各节"v2 Retrofit"标注及 §0 / §2 / §3 / §8 / §12。

- **Date**: 2026-05-24
- **Region**: CA (Canada / English EN-CA)
- **Page path**: `src/pages/CA/20260524-3.0/index.astro`
- **Build URL**: `/CA/20260524-3.0/`
- **CTA target**: WhatsApp Channel join (via `mixinJump` / `whatsapp_link`，复用 v2/v3 jump.ts，无修改)
- **Page type**: 黑页（沿用 v3 用户授权擦边）+ 高端 SaaS 视觉伪装
- **Status**: Approved, awaiting copy (#9) + assets (#11)

---

## 0. v1 → v2 → v3 → v4 完整光谱（差异化总览）

CA 项目至此已有 3 张落地页 + 本 v4。完整光谱：

| 维度 | v1 (squeeze) | v2 (Editorial) | v3 (Substack Letter) | **v4 (SaaS Product Page)** |
|------|--------------|-----------------|----------------------|------------------------------|
| 体裁 | 一屏挤压 | 报纸编辑长页 | 个人信件长文 | **产品发布页（高端 SaaS）** |
| 视觉主角 | 大字 | 文字 + 印章 | 文字（窄列）+ 极少图 | **配图主角 / 文字补充** |
| 配色 | 黑金 | 报纸米 + 钢墨蓝 + 印章红 | 纯白 + Substack 黄 + 警示橙 | **纯白 #FFFFFF + 浅雾灰区段 #F7F8FA + 黑底 CTA #0A0A0A**（v2 Retrofit：原 Linear Dark 深紫蓝改为 Stripe Light） |
| 字体 | Bebas Neue + Inter | IBM Plex Serif + Plex Mono | Source Serif 4 + Caveat + JetBrains Mono | **Inter Tight + JetBrains Mono**（零衬线 + 紧字距，区别 v3 衬线为主） |
| 布局 | 全宽 1 屏 | 1140px 多栏 | 660px 窄列单栏 | **1200px 网格（12 列桌面 / 4 列移动），布局严谨 SaaS 调** |
| 装饰 | 金渐变 + radial glow | 印章 SVG + 网格底纹 | Caveat 手写 + 黄 marker + 印戳 | **极淡白渐变（仅 hero）+ 黑底 CTA + 1px 边框 + sparkline 折线**（v2 Retrofit：删除 mineral mesh orb / 玻璃拟态 / cursor spotlight） |
| 信任锚 | "10X mining boom" 大字 | 4 张分析师卡 + 50 席稀缺 | 作者 + 学员 + 账户截图 | **MacBook + WhatsApp Channel mockup + metric stack + Past Calls 真 ticker 复盘** |
| 受众心智 | "暴涨" | "我被邀请进圈" | "这个人在跟我说话" | **"这家公司很专业，我跟着不会错"** |
| 适用流量 | 冷投放 | Facebook/Meta 投放 | 邮件 / Reddit / 二次触达 | **LinkedIn / Twitter / Stripe-tier 流量 / 已认证的二次触达 / 想伪装高质感时** |
| 动效 | Hover glow | 4 种动效（reveal/pulse/blur/sticky） | 3 种极简（reveal/sticky/CTA） | **3-4 种 Stripe Light 调：reveal / mockup parallax tilt / CTA hover / sparkline draw-in（可选）**（v2 Retrofit：删除 orb rotation / cursor spotlight，那些是暗色风专属） |
| Signature moment | "BOOM" 大字 | Blurred Today's Pick + 印章 | Drop cap I + paywall 黄边 + account screenshot | **Hero MacBook Pro 半俯视 + WhatsApp Channel 后台 UI mockup + Past Calls 真 ticker sparkline 复盘卡** |

**一句话**：v4 让你以为 Daniel Hartman 不是个体户而是一家由 Bloomberg/FT 报道过的研究机构，受众心智从"分析师"升级到"创始人/编辑"。

---

## 1. 视觉关键词

- **Stripe Light · Bloomberg Terminal · FT Product Page**（Stripe 的克制层次 + Bloomberg/FT 的可信资讯感）
- **White + Mono Numerals**（白底 + JetBrains Mono 等宽数字 = SaaS 工程师/数据感）
- **Visual-first, copy-second**（硬规则：配图占视觉 ≥60%）
- **Editorial calm**（编辑级冷静——不是营销大字，不是 cyberpunk 科技感）

参考意象：stripe.com、vercel.com/docs、ft.com/product-page、bloomberg.com terminal screenshots、notion.so/product。**避开**：generic dark SaaS landing（紫底 + 白字 + 紫渐变那种 2020 风格俗气方案），也避开 Linear/Raycast 的暗色风（那是 v4-Dark 路线，已弃用）。

---

## 2. 色板：Stripe Light + Subtle Mist

> ⚠️ **v2 Retrofit（2026-05-24）**: v4 整体路线从 Linear Dark 改为 Stripe Light。底色 / CTA / 渐变 / 玻璃拟态全部重置。理由：copy spec v1.1 反映最终决策（白底 + 真 TSX-V ticker + Bloomberg/FT 质感），与 v2 暗+金 / v3 米白 形成"光线越走越亮"的专业感递进光谱。

签名色 = **纯白主体 + 浅雾灰区段 + 极淡白渐变（仅 hero 微存在）+ 黑底 CTA**。摒弃所有暗色 / mineral mesh / 玻璃拟态。

| 用途 | 变量 | 值 | 备注 |
|------|------|----|------|
| **页面底（纯白）** | `--bg` | `#FFFFFF` | Stripe / Vercel docs 标准 |
| **区段交替浅灰** | `--bg-alt` | `#F7F8FA` | 用于 Metrics / Built Different / Final CTA 区段交替 |
| **极浅 hero 渐变起点** | `--mist-start` | `#FAFAFA` | hero 背景 linear-gradient 顶 |
| **极浅 hero 渐变终点** | `--mist-end` | `#F0F4F8` | hero 背景 linear-gradient 底 |
| **主文字** | `--text` | `#0A0A0A` | 接近纯黑，最大可读性 |
| **次要文字** | `--text-soft` | `#525866` | body / sub |
| **三级灰** | `--text-muted` | `#9BA0AA` | meta / footer / disclaimers |
| 边框（极淡） | `--border` | `#ECECEC` | 卡边 / 分隔线 |
| 边框中（hover） | `--border-mid` | `#D5D7DC` | hover 加深 |
| **强调金（极少用）** | `--accent-gold` | `#C8941F` | icon stroke / 数字下划线，**绝不大面积** |
| 成功绿（极少用） | `--accent-green` | `#10B981` | "accepting members" 状态点 / testimonial 验证标记 |
| Gain（涨幅 / Past Call 卡 sparkline 绿段） | `--gain` | `#10B981` | 复用 accent-green |
| Loss（跌幅 / sparkline 红段） | `--loss` | `#E5484D` | 克制红，非荧光 |
| **主 CTA 黑底** | `--cta-bg` | `#0A0A0A` | Stripe sign-up 风格 |
| **主 CTA hover** | `--cta-bg-hover` | `#222222` | |
| **WhatsApp 绿（仅作语义色）** | `--wa-green` | `#25D366` | **不再作为 CTA 底色**；仅在 CTA 内部小图标里出现（18×18 SVG），整个按钮黑底 |

**配色原则**：92% 白 / 浅雾灰底 + 5% 深黑文字 + 2% 边框灰 + 1% 金/绿强调（仅 icon / 状态点）。**对比 v3 99/0.5/0.3/0.2 + v2 80/15/5**：v4 留白比 v2/v3 更极致，唯一深色块是 CTA 黑按钮。

**配色升级理由**（与 copy spec v1.1 §10 一致）：
1. 白底 + 真 TSX-V ticker + 大字 disclaimer = Bloomberg/FT 报告质感
2. 黑底 CTA（不是 WhatsApp 绿底）= Stripe 头部 sign-up 风格，"克制专业"而不是"营销大按钮"
3. 删除 mineral mesh 三色渐变 → 仅在 hero 顶用 `linear-gradient(135deg, #FAFAFA → #F0F4F8)` 极淡几乎不可见的雾感，让 MacBook mockup 自然漂浮在背景

---

## 3. 字体栈

| 角色 | 字体 | 来源 | 用途 |
|------|------|------|------|
| **Display + Body Sans** | **Inter Tight** | Google Fonts | 所有标题、正文、按钮、nav |
| **Mono（SaaS 灵魂）** | **JetBrains Mono** | Google Fonts | metric 数字 / past call P/L / sparkline 标注 / meta / 时间戳 / ticker 代号 |
| Fallback Sans | Inter, system-ui, -apple-system | 系统 | Inter Tight 加载失败 |
| Fallback Mono | Menlo, Consolas | 系统 | JetBrains Mono 加载失败 |

**对比 v1/v2/v3**：
- v1: Bebas Neue（街头粗壮）
- v2: IBM Plex Serif + Archivo Black（编辑严肃）
- v3: Source Serif 4 + Caveat（信件 + 手写）
- **v4: Inter Tight 全家 + JetBrains Mono**（**零衬线 + 紧字距**——Inter Tight 是 Inter 的紧凑变体，比标准 Inter 更适合大字号 H1 / metric 数字；与 copy spec v1.1 §10 一致）

> ⚠️ **v2 Retrofit（2026-05-24）**: 主字体从 Geist 改为 Inter Tight。Geist 是 Linear Dark 调对应的字体，Inter Tight 是 Stripe Light 调对应字体（字距 -0.02em 更紧凑，配深炭黑 #0A0A0A 对比强但克制）。JetBrains Mono 保留不变（SaaS 等宽数字灵魂）。

### 字号 / 字距规范（visual-first，字号大但行数极少）

| 元素 | 字体 | 桌面 | 移动 | 字重 | line-height | 字距 |
|------|------|------|------|------|-------------|------|
| Nav brand | Inter Tight | 16px | 15px | 700 | 1.2 | -0.02em |
| Nav link | Inter Tight | 14px | 13px | 500 | 1.4 | 0 |
| **H1（Hero）** | Inter Tight | **64-80px** | **40px** | 700 | 1.05 | -0.035em |
| H1 gradient span | Inter Tight + clip-text | inherit | inherit | inherit | inherit | inherit |
| Hero sub | Inter Tight | 19px | 16px | 400 | 1.5 | -0.005em |
| H2（区块标题） | Inter Tight | 44px | 28px | 700 | 1.1 | -0.025em |
| H2 sub（kicker） | Inter Tight | 13px | 12px | 600 | 1.4 | 0.12em uppercase |
| H3（卡标题） | Inter Tight | 22px | 19px | 600 | 1.2 | -0.01em |
| Body p | Inter Tight | 17px | 15px | 400 | 1.6 | -0.005em |
| Metric num | Inter Tight | **80-96px** | **52px** | 700 | 0.9 | -0.04em |
| Metric label | JetBrains Mono | 12px | 11px | 500 | 1.4 | 0.08em uppercase |
| Dashboard text | JetBrains Mono | 12-13px | 11px | 400-600 | 1.5 | 0.02em |
| CTA text | Inter Tight | 16px | 15px | 600 | 1.2 | -0.01em |
| Testimonial body | Inter Tight | 18px | 16px | 400 | 1.55 | -0.005em |
| Footer | Inter Tight | 13px | 12px | 400 | 1.55 | 0 |

### 加载策略

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

Fallback: `'Inter Tight', 'Inter', system-ui, -apple-system, sans-serif`。

---

## 4. 网格 / 容器 / 间距

```css
--container-max: 1200px;       /* 桌面 SaaS 标准 */
--container-narrow: 880px;     /* CTA / testimonial 居中区域 */
--gutter-desktop: 32px;
--gutter-tablet:  24px;
--gutter-mobile:  20px;

--grid-cols-desktop: 12;
--grid-cols-tablet:  8;
--grid-cols-mobile:  4;
--grid-gap-desktop:  24px;
--grid-gap-mobile:   16px;
```

间距尺度：4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 160 / 200 px。

**核心：1200px 12 列 grid**——SaaS 标准。这是与 v3 660px 窄列形成的最大布局差异化。

**区块垂直节奏**：桌面 120-160px / 移动 80-96px。比 v2 的 96 / v3 的 80 都更大，制造"开阔的产品页"感。

---

## 5. 版块布局图（Stripe Light 路线）

> ⚠️ **v2 Retrofit**: 重写版块图，删除暗色玻璃拟态 / dashboard mockup / mesh orb / cursor spotlight；改 MacBook + WhatsApp Channel UI mockup（hero）+ Past Calls sparkline 复盘卡（取代旧 dashboard）+ 白底极淡阴影卡。

```
═══════════════════════════════════════════════════════════════
[NAV]  顶部 nav bar (高度 64px)  · 白底 + 极淡 1px border
       ┌─● D HARTMAN ─────────── ROOM · WHY · WEEK · JOIN ┐
       │  brand + 绿点状态                       小黑 CTA  │
       └────────────────────────────────────────────────────┘
       sticky；rgba(255,255,255,0.92) + 轻 saturate blur；
       底部细 1px var(--border)

═══════════════════════════════════════════════════════════════

[1] HERO  (≥ 88vh) ⭐ Signature moment · MacBook + WhatsApp Channel
   背景: linear-gradient(135deg, #FAFAFA 0% → #F0F4F8 100%)
        极淡几乎不可见的雾感
   ┌────────────────────────┬───────────────────────────────┐
   │ 左 5/12 (文字, 25%)    │ 右 7/12 (MacBook mockup, 75%) │
   │                        │                                 │
   │ ▌ Eyebrow 14px mono    │   ┌─────────────────────────┐  │
   │   PRIVATE · DESK · TOR │   │  [MacBook Pro M-series] │  │
   │                        │   │   半俯视 12° tilt         │  │
   │ H1 Inter Tight 64-80px │   │   屏内：Daniel's Mining  │  │
   │ One trader. One        │   │   Desk WhatsApp Channel │  │
   │ channel. Three years   │   │   后台 UI 截图：         │  │
   │ of signal.             │   │   - 左侧栏 Channels/Stats│  │
   │                        │   │   - 主区域最新 post 卡   │  │
   │ Sub: 19px text-soft    │   │     time + 4 行打码正文 │  │
   │                        │   │   - 右上订阅 12,438     │  │
   │ [JOIN CHANNEL → 黑底]  │   └─────────────────────────┘  │
   │  Stripe sign-up 风格   │   shadow: 0 24px 80px           │
   │                        │     rgba(0,0,0,0.08)            │
   │ Trust micro 12px mono: │                                 │
   │ 12,438 in channel ·    │                                 │
   │ Three years tracking   │                                 │
   └────────────────────────┴───────────────────────────────┘
   ⚠️ 无 mesh orb / 无 cursor spotlight（暗色专属，已删）

═══════════════════════════════════════════════════════════════

[2] HOW I WORK  (3 个产品特性卡 · 白底纯卡)
   ┌─[Kicker]──────────────────────────────────────────────┐
   │ HOW IT WORKS                                          │
   │ H2: Built for traders who can read a price action.    │
   └─────────────────────────────────────────────────────────┘

   ┌──────────┬──────────┬──────────┐
   │ [icon]   │ [icon]   │ [icon]   │  3 张白底纯卡（非玻璃拟态）
   │ Title    │ Title    │ Title    │  各占 4/12 桌面 / full 移动
   │ 2-line   │ 2-line   │ 2-line   │  顶部 24×24 inline SVG icon
   │ body     │ body     │ body     │  stroke = var(--accent-gold)
   │ ─        │ ─        │ ─        │  卡背 var(--bg) + 1px border
   │ Meta     │ Meta     │ Meta     │  hover: border-mid + lift -2px
   └──────────┴──────────┴──────────┘

═══════════════════════════════════════════════════════════════

[3] METRICS STRIP  (大号 mono 数字 stack · 区段交替 #F7F8FA 背景)
   ┌──────────┬──────────┬──────────┬──────────┐
   │ 12,438   │ +247%    │ 3        │ 5/wk     │
   │ READERS  │ BEST     │ YEARS    │ SETUPS   │
   │ in WA    │ pick '25 │ tracked  │ posted   │
   └──────────┴──────────┴──────────┴──────────┘
   每数字 JetBrains Mono 700 80-96px 纯黑 #0A0A0A
   12px mono uppercase label var(--text-muted)
   单元间 1px var(--border) 分隔（最后一列无）
   桌面 4 列 / 移动 2×2
   ⚠️ 无 mineral gradient text-clip（已删）；强调色仅在 underline
   关键数字下加 2px var(--accent-gold) underline 装饰

═══════════════════════════════════════════════════════════════

[4] BUILT DIFFERENT  (差异化对比表 · 白底表格)
   ┌─[H2]──────────────────────────────────────────────────┐
   │ Built different.                                       │
   │ Not another signal Telegram.                           │
   └────────────────────────────────────────────────────────┘

   ┌────────────────┬───────────────────────────────────┐
   │ 左 5/12: 标题  │ 右 7/12: comparison table         │
   │ + 1 段 sub     │ 5 行 ('Most rooms' vs 'Mine')     │
   │                │ ✕ var(--loss) 克制红              │
   │                │ ✓ var(--gain) 克制绿              │
   │                │ 整张表白底 + 1px border + 行间 1px │
   └────────────────┴───────────────────────────────────┘

═══════════════════════════════════════════════════════════════

[5] A WEEK INSIDE  (workflow timeline · 白底 5 列)
   ┌─[H2 + sub]─────────────────────────────────────────────┐
   │ A week inside the channel.                             │
   └────────────────────────────────────────────────────────┘

   ┌─Mon─┬─Tue─┬─Wed─┬─Thu─┬─Fri─┐
   │ 7AM │ 7AM │ 7AM │ 7AM │ 4PM │   timeline horizontal
   │ ▌   │ ▌   │ ▌   │ ▌   │ ▌   │   竖线 var(--accent-gold) 2px
   │ ... │ ... │ ... │ ... │ ... │   ⚠️ 无 mineral mesh 渐变线
   └─────┴─────┴─────┴─────┴─────┘
   5 列间一条横向 1px var(--border) 实线串联（取代旧 mesh）

═══════════════════════════════════════════════════════════════

[5.5] PAST CALLS  ⭐ v2 Retrofit 新增 · 真 TSX-V ticker 复盘
   ┌─[Kicker + H2]─────────────────────────────────────────┐
   │ PAST CALLS · LAST 12 MONTHS                            │
   │ Real picks. Real results. Real screenshots.            │
   └────────────────────────────────────────────────────────┘

   ┌──────────┬──────────┬──────────┐
   │ FIL.V    │ NXE.V    │ GBR.V    │  3 张白底 sparkline 卡
   │ Posted   │ Posted   │ Posted   │  ticker JetBrains Mono 700
   │ Mar 2026 │ Feb 2026 │ Jan 2026 │  meta 11px mono uppercase
   │          │          │          │
   │ [spark   │ [spark   │ [spark   │  56px 高度 inline SVG
   │  line]   │  line]   │  line]   │  path stroke gain/loss
   │          │          │          │
   │ +247%    │ +88%     │ +156%    │  PnL mono 32px gain 绿
   │          │          │          │
   │ ─        │ ─        │ ─        │
   │ disclaimer 10px var(--text-muted)
   │ "Historical · Past performance does not predict future"
   └──────────┴──────────┴──────────┘
   底部强化盾词块 (#FAFAFA 背景卡)：
   "SIMULATED REFERENCE · NOT INVESTMENT ADVICE · NOT TYPICAL"

═══════════════════════════════════════════════════════════════

[6] TESTIMONIALS  (白底纯卡 ×3)
   ┌─[H2]──────────────────────────────────────────────────┐
   │ Three rooms. Three different stories.                  │
   └────────────────────────────────────────────────────────┘

   ┌──[white card]──┬──[card]──┬──[card]──┐
   │ "Quote..."     │ "Quote.."│ "Quote..."│
   │                │          │           │
   │ ─              │ ─        │ ─         │
   │ [photo] Name   │          │           │
   │  48×48  City   │          │           │
   │         ● verified                    │
   └────────────────┴──────────┴───────────┘
   卡背 var(--bg) 白底 + 1px var(--border) + radius 8 + padding 32
   hover: border-mid + lift -2px
   ⚠️ 无 backdrop-blur 玻璃拟态（已删）
   verified-dot: 6px var(--accent-green) 实心小绿点

═══════════════════════════════════════════════════════════════

[7] FINAL CTA  (居中 880 max-width · 区段交替 #F7F8FA 背景)
   ┌────────────────────────────────────────────────────────┐
   │                                                        │
   │             [H2 Inter Tight 700 48px 居中]            │
   │             Join the channel.                          │
   │                                                        │
   │             ┌─● [WA icon 绿] JOIN → 黑底─┐            │
   │             └────────────────────────────┘            │
   │                                                        │
   │             Trust: 12,438 readers · Free this week    │
   │             [合规盾词 10px text-muted]                │
   │                                                        │
   └────────────────────────────────────────────────────────┘
   ⚠️ 无 mesh orb 背景旋转（已删）；改区段交替 bg-alt 浅灰

═══════════════════════════════════════════════════════════════

[8] FOOTER MINIMAL
   ┌─● D HARTMAN ─────────── Toronto · ON · 2026 ────┐
   │ Compliance 完整 6 行: Past performance.../        │
   │ Not investment advice / Not a registered.../      │
   │ © 2026 · daniel@... · Reply to unsubscribe        │
   └────────────────────────────────────────────────────┘
   白底 + 上 1px var(--border)
```

---

## 6. 组件清单（Stripe Light 路线）

> ⚠️ **v2 Retrofit**: 整段重写。删除玻璃拟态 testimonial / mineral mesh orb hero / cursor spotlight / WhatsApp 绿底 CTA / mesh gradient text-clip。新增 `PastCallCard`（取代旧 dashboard mockup 大图的功能）。

### 6.1 `TopNav`
- 固定顶部 z-index 100，高度 64px
- 背景 `rgba(255, 255, 255, 0.92)` + `backdrop-filter: saturate(180%) blur(8px)`（**白底半透轻 blur**，非暗色玻璃）
- 底部 1px `var(--border)`
- 内部 max-width 1200，左 brand + 右 nav links + small CTA
- Brand: 6×6 绿点（`var(--accent-green)` 状态点）+ "D HARTMAN" wordmark (Inter Tight 700 16px)
- Links: ROOM / WHY / WEEK / JOIN (Inter Tight 14px 500, color `var(--text-soft)`)
- 右侧小 CTA: **黑底白字** (`.cta-primary--sm`)，padding 8px 16px，radius 4
- mobile：隐藏 links，仅 brand + CTA

### 6.2 `Hero` ⭐⭐ Signature moment · MacBook + WhatsApp Channel
- 高度 ≥ 88vh
- 背景 `linear-gradient(135deg, var(--mist-start) 0%, var(--mist-end) 100%)`（**极淡几乎不可见的雾感**，非 mesh orb）
- grid 12 列，左 5/12（文字）+ 右 7/12（MacBook mockup）
- **左侧 stack**（垂直）：
  - Eyebrow: mono 12-14px uppercase `var(--text-soft)`，可选前置 ● 状态绿点
  - H1 64-80/40 Inter Tight 700：3 行；关键词可加 `var(--accent-gold)` 2px underline（**不用 gradient text-clip**）
  - Sub 19/16 Inter Tight 400 `var(--text-soft)`
  - **CTA: `.cta-primary`（黑底 #0A0A0A + 白字 + 18×18 WhatsApp icon 绿色 stroke）**
  - 小 CTA "Watch a week →" 文字链接（极淡，无边框）
  - Trust micro: 12px mono 灰，三段 middot 间隔
- **右侧 MacBook mockup**：
  - `<img>` 1920×1200 (16:10 横版)，包裹 `<div class="mockup-wrap">`
  - CSS `transform: perspective(1600px) rotateY(-6deg) rotateX(3deg)`（tilt 比旧 dark 版 -8deg 更克制）
  - shadow: `0 24px 80px rgba(0, 0, 0, 0.08)` （**柔阴影**，非 violet glow）
  - border-radius 12, overflow hidden
- 移动端：grid 重排为 stack 垂直，mockup 在文字下方，tilt 减弱到 -2deg；<480px 完全去 tilt
- ⚠️ **无 mesh orb / 无 cursor spotlight / 无几何 grid SVG**（暗色版专属，已删）

### 6.3 `FeatureGrid` (How it works · 纯白卡)
- grid 12 列，3 张白底纯卡各占 4 列
- 每卡：
  - 顶部 24×24 inline SVG icon（1.5px stroke + `stroke="var(--accent-gold)"`，**非 mesh gradient**）
  - H3 22px / 600 / -0.01em
  - body 17px `var(--text-soft)`（≤ 2 行）
  - 底部 1px `var(--border)` + 一行 mono meta
- 卡背景 `var(--bg)` 纯白 + 1px `var(--border)` + radius 8 + padding 32
- hover: border 变 `--border-mid` + `translateY(-2px)` + 极淡阴影 `0 8px 24px rgba(0,0,0,0.04)`

### 6.4 `MetricsStrip`
- 区段背景可用 `var(--bg-alt)` (#F7F8FA) 制造视觉节奏
- grid 4 列桌面 / 2×2 移动
- 各 cell 竖向 stack：
  - 大数字 80-96/52px **JetBrains Mono 700** 纯黑 `var(--text)`（**不再 gradient clip**）
  - 关键数字下加 2px `var(--accent-gold)` underline 装饰（如 +247% 的百分号下方）
  - 12px mono uppercase label `var(--text-muted)`，0.08em 字距
- 单元间 1px vertical `var(--border)` 分隔（最后一列无）
- mobile：grid 2×2，分隔改为底/右 border

### 6.5 `BuiltDifferent`
- grid 12 列：左 5/12 标题 + 右 7/12 对比表
- 左侧：H2 + 一段 `var(--text-soft)` sub
- 右侧 comparison table：
  - 5 行：每行左边 feature + 右边两列 ('Most rooms' / 'Mine')
  - 'Most rooms' 列：✕ `var(--loss)` 克制红 + 灰文字
  - 'Mine' 列：✓ `var(--gain)` 克制绿 + 深黑文字
  - 行间 1px `var(--border)` 分隔
  - 整张表 `var(--bg)` 白底 + 1px border + radius 8（**不用 surface 暗背**）

### 6.6 `WeekTimeline`
- grid 5 列 horizontal 桌面 / 单列 vertical 移动
- 每 day cell：
  - 顶部 mono 11px uppercase day label "MON / TUE / WED / THU / FRI"
  - 时间 mono 13px "7 AM EST"
  - ▌ 2px 实线 `var(--accent-gold)` 竖线（**不再 mesh gradient**）
  - 标题 H3 19/17 Inter Tight 600
  - body 15/14 `var(--text-soft)`（≤ 2 行）
- 桌面：5 列间一条横向 1px `var(--border)` 实线串联（**不再 mesh**，纯灰）
- mobile: vertical stack，串联线变成 left 1px 竖

### 6.7 ⭐ `PastCallCard` (v2 Retrofit 新增 · 取代旧 dashboard mockup 的视觉功能)
- grid 12 列，3 张卡各占 4 列；移动单列
- 每卡纯白底 + 1px `var(--border)` + radius 8 + padding 24
- 顶部：
  - Ticker 14px JetBrains Mono 700 `var(--text)`（**真 TSX-V ticker**：FIL.V / NXE.V / GBR.V 等，详 §8.2.1 ticker 规则）
  - Meta "POSTED · MAR 2026" 11px mono uppercase `var(--text-muted)`
- 中段：
  - Inline SVG sparkline 56px 高，width 100%
  - path 1.5px stroke，涨段 `var(--gain)`、跌段 `var(--loss)`
  - data 数组由 artist 在 `_mockup/sparklines.json` 提供
- 大号 PnL：32px JetBrains Mono 700，颜色 `var(--gain)`（涨）或 `var(--loss)`（跌）
- 底部：10px `var(--text-muted)` disclaimer "Historical · Past performance does not predict future"，上 1px border 分隔
- 整组 PastCalls 区段底部强化盾词块：`var(--bg-alt)` 背景卡 + 居中文字 "SIMULATED REFERENCE · NOT INVESTMENT ADVICE · NOT TYPICAL"
- hover: border-mid + lift -2px
- 可选动效：sparkline draw-in（stroke-dashoffset 从 length → 0），仅在 IO 触发首次，800ms ease-out

### 6.8 `TestimonialCards` (白底纯卡)
- grid 12 列，3 张卡各 4 列
- 卡：
  - 背景 `var(--bg)` 纯白 + 1px `var(--border)` + radius 8 + padding 32
  - **无 backdrop-blur 玻璃拟态**（已删）
  - quote 17px Inter Tight 400 `var(--text)`（**非 italic**——v4 是 sans-serif 阵营）
  - 底部 author block：48×48 圆形头像 + 姓名 (Inter Tight 600 15px) + city/role (JetBrains Mono 11px uppercase `var(--text-muted)`) + 6px 圆 `var(--accent-green)` verified 状态点
- hover: border 变 `--border-mid` + `translateY(-2px)`
- **复用 v3 testi 头像**：story-1/2/3.jpg

### 6.9 `FinalCTA`
- 居中容器 880 max-width
- 区段背景 `var(--bg-alt)` 浅灰（区段交替）
- H2 48px Inter Tight 700 居中
- `.cta-primary--lg` 黑底大按钮居中
- trust meta 一行 + 合规小盾词
- ⚠️ **无 mesh orb 背景旋转**（已删）

### 6.10 `FooterMinimal`
- 12 列 grid
- 左 6 列：● brand "D HARTMAN" + city
- 右 6 列：compliance 完整 6 行 + mailto
- 文字 12-13px `var(--text-muted)`
- 上 1px `var(--border)` 分隔，**非 mesh line**

### 6.11 辅助组件（Stripe Light 路线）

**`.cta-primary` 黑底主按钮**
- 背景 `var(--cta-bg)` 实色 #0A0A0A
- 文字 白色 Inter Tight 600 16px，字距 -0.01em
- padding 14px 28px，border-radius 6
- 内部 18×18 WhatsApp icon SVG（`stroke="var(--wa-green)"`——WhatsApp 绿仅在小图标里出现，整个按钮黑底）
- hover: bg `--cta-bg-hover` + `translateY(-1px)`
- 尺寸变体：`.cta-primary--lg`（18×36, 17px）/ `.cta-primary--sm`（8×16, 14px, radius 4）

**accent underline 辅助**
```css
.accent-underline {
  border-bottom: 2px solid var(--accent-gold);
  padding-bottom: 2px;
}
```
用于 metric num / H1 关键词强调（取代旧 mineral gradient text-clip）。

⚠️ **已删除组件**（旧 dark 版残留）：`.text-gradient` mineral mesh / `.glass` 玻璃拟态 mixin / `.cursor-spot` cursor follow spotlight / `.cta-wa` WhatsApp 绿底按钮 → 全部不再使用。

---

## 7. 配图主角化硬规则（用户明示）

**每个区块的视觉元素占比 ≥ 60%**。具体落地：

| 区块 | 视觉占比 | 视觉来源 |
|------|---------|----------|
| Hero | 75% | **MacBook + WhatsApp Channel mockup** (1920×1200, perspective tilt -6deg) + 极淡 hero 渐变 mist 背景 |
| HowItWorks | 65% | 3 张大尺寸 inline SVG feature icons (stroke=accent-gold) + 白底卡 hover lift |
| Metrics | 70% | 4 个 80-96px JetBrains Mono 数字（视觉单元，不是文字）+ accent-gold underline |
| BuiltDifferent | 60% | 对比表本身就是视觉表格（✕/✓ icon + 行间分隔） |
| WeekTimeline | 70% | 5 个 2px accent-gold 竖线 + 横向 1px border 串联 + 时间戳数字 |
| **PastCalls (新增)** | 75% | **3 张 sparkline 卡 + 大号 mono PnL 数字 + 真 ticker** — v4 核心视觉差异化 |
| Testimonial | 65% | 白底纯卡 + 48×48 圆形头像 + 6px verified 绿点 |
| Final CTA | 60% | 大字 H2 + 黑底大按钮 + 区段交替浅灰背景 |
| Footer | 30% | 1px border + brand 状态点（可接受） |

**实现层落地**：
1. 文字字号大但行数少（H1 80px 但只 3 行；body 17px 但每段 ≤ 2 行）
2. 大量 padding / 区块间 120-160px 空白
3. 每个区块至少 1 个 visual 元素（mockup / icon / sparkline / accent line）
4. 不在区块内塞超过 3 个 H 级标题

**对比 v3**：v3 是 660px 窄列文字读物，视觉仅 account-screenshot 一处占主角；v4 全程视觉主角，文字仅次。

---

## 8. 视觉素材清单（交给 artist / task #11）

⚠️ **每张图必须 art-direction 三件套**（构图语言 / 调色调 / 后处理风格）。沿用 v3 的"头部占比 / 裁剪比例"指标方法。

> ⚠️ **v2 Retrofit**: §8 整体重组。旧 dashboard-mockup（Linear 暗色工作台 1920×1200）已废弃；新方案 hero 用 MacBook + WhatsApp Channel 后台 UI，past calls 用 sparkline 数据卡。

### 8.1 `hero-mockup.png` ⭐⭐ 本任务最重要素材（取代旧 hero-visual + dashboard-mockup）
- **尺寸**: 1920×1200（16:10，给 perspective tilt 后 framing 用；artist 实际可输出 1600×1000 等比也接受）
- **方法**: HTML + Playwright 合成（沿用 v3 account-screenshot 路线）。**不要用 gpt-image** —— 精确 UI 文字 + 数据需要可读性。
- **构图语言**: MacBook Pro M-series 银色机身**半俯视 12°**（右上→左下倾斜），屏幕内嵌一张白底 WhatsApp Channel 后台 UI（仿"Daniel's Mining Desk Channel"管理后台）
- **调色调**: 完全采用 v4 Light 色板（bg `#FFFFFF` / 浅灰 panel `#F7F8FA` / 文字 `#0A0A0A` / accent `#C8941F` 极少用 / WhatsApp 绿仅在订阅状态点）
- **后处理风格**: 1px `#ECECEC` border 在 panels 之间；**无玻璃拟态**；数字用 JetBrains Mono；柔 shadow `0 24px 80px rgba(0,0,0,0.08)` 由 designer 在 CSS 端加（**artist 出图本身无阴影**）；机身环境光 4400K 暖白
- **必须出现的 UI 元素**（屏幕内）:
  - 顶部 WhatsApp Web 风 header（"Daniel's Mining Desk · Channel" + 订阅人数 `12,438`）
  - 左侧栏：Channels / Stats / Drafts / Subscribers / Settings 5 项
  - 主区域上半：1 张最新 post 卡片（time `9:30 AM · Today` + 4 行打码正文 `████ ███ ██████`，**未来导向占位**）
  - 主区域中段：极简 stats 小卡（Posts this week · Open rate · Subs growth）
  - 主区域下半：发布按钮 + Schedule UI
  - 右上一个小 status widget："● Live · 12,438 subs"（mono · `accent-green` 状态点）
- **背景**（mockup 之外 hero 背景层）：由 CSS `linear-gradient(135deg, #FAFAFA → #F0F4F8)` 渲染，artist 不出
- **art-direction 命名记忆**: "MacBook Pro × WhatsApp Web × Stripe Atlas"
- ⚠️ **artist 不再出独立 dashboard-mockup**；旧 Linear 暗色工作台彻底废弃

### 8.2 `sparkline-data.json` ⭐ v2 Retrofit 新增 · Past Calls sparkline 数据源
- **方法**: artist 提供一个 JSON 文件 + 3 张可选 PNG 备份（如果 inline SVG 嫌麻烦）
- **格式**: 数组 of `{ticker, postedDate, exitDate, pnlPct, sparklinePathD, gainSegments[], lossSegments[]}`
  - `sparklinePathD`: 完整 SVG `path d="..."` 字符串，viewBox `0 0 100 56`
  - `gainSegments` / `lossSegments`: path d 分段，让 designer 用 `<path>` 多段拼接出涨段绿/跌段红
- **真 ticker 列表**（artist 可选其中 3 个产出）：FIL.V / NXE.V / GBR.V / URA / CCJ / NioCorp NB.V / DML / DNN
- **曲线构图**: 各曲线 60-80 个数据点，起伏自然（不要全程一路上涨——加 1-2 个回撤段更可信），最终 PnL 在 +60% ~ +260% 区间
- **art-direction**: TradingView 极简风（无网格 / 无 axis label / 仅曲线本身），1.5px stroke

#### 8.2.1 ⚠️ Ticker 显示规则总表（v4 关键合规更新，区别于 v2/v3）

| 展示位语义 | 是否允许真 ticker | 替代方案 | 出现位置（v2 Retrofit 更新） |
|----------|------------------|---------|---------|
| **历史持仓快照**（Past picks / Portfolio / Account snapshot） | ✅ **允许真 ticker**（FIL.V / NXE.V / GBR.V / URA / CCJ / DML 等公开矿股） | n/a | **Past Calls 区块 (§5.5) sparkline 卡** |
| **历史 P/L 数字** | ✅ 允许具体数字（历史已发生） | n/a | Past Calls 卡内大号 mono PnL（如 +247%） + Metrics strip "BEST PICK '25" |
| **历史 chart curve** | ✅ 允许真曲线形态（公开数据 sparkline） | n/a | Past Calls 卡 inline SVG sparkline path |
| **今日推荐 / 未来 setup**（Today's post preview / Next setup / hero MacBook 屏内 post） | ❌ **禁止真 ticker** | `[Setup #1]` / `[Stock A]` / `[Ticker X]` 占位，或 `████ ███ ██████` 打码 | **hero mockup 屏内 post 卡 + week timeline 描述** |
| **testimonial 引用** | ✅ **允许真 ticker** 1 处/卡（学员复盘历史是已发生） | n/a | testi-card quote 内（如"Caught NXE.V at 0.31"） |
| **页面正文文案** | 视语义而定 | 未来导向用占位，历史复盘可用真名 | 详见 §9.1 marketer slot 政策 |
| **合规水印** | n/a | 必备："SIMULATED REFERENCE · NOT INVESTMENT ADVICE · NOT TYPICAL" | Past Calls 区块底部强化盾词块 + hero mockup 内（如有 PnL 数字也加） |

**为什么这条规则成立**：历史 ticker 是公开数据 + 已发生 → 不构成"投资建议"或"未来收益承诺"；未来 setup 是预测 → 即使授权擦边，也必须打码避免被认定为"无照投资顾问"。这条规则也适用于 #12 实现 index.astro 时所有 ticker 引用决策。

### 8.3 `feature-icons/*` (3 inline SVG)
- **方法**: 完全 inline SVG，无需 artist 出图。designer 在 index.astro 内联即可。
- **风格**: 1.5px stroke + 24×24 viewBox + `stroke="var(--accent-gold)"` 实色（**非 mineral gradient**）+ no fill
- **3 个图标主题**（与 "How I work" 三个特性对应）:
  1. **Signal**: 抽象波形图（spike + flat + spike），表"我每天 7 AM 看 charts"
  2. **Conviction**: 抽象 target / crosshair，表"我只 post 高 conviction"
  3. **Channel**: 抽象 chat bubble + arrow，表"WhatsApp 直通"
- **art-direction**: Lucide-icons / phosphor 风极简线条，**避开** generic Material Design icon style

### 8.4 ~~`gradient-blob.svg`~~（v2 Retrofit · 已删除）
- **状态**: 废弃。Light 路线不需要 background blob 装饰。
- 替代：hero 区段用 CSS `linear-gradient(135deg, var(--mist-start), var(--mist-end))` 极淡雾感即可，**不需要独立 SVG 文件**。

### 8.5 `author-portrait-v4.jpg` — v2 Retrofit · artist 重生（不再直接复用 v3）
- **状态变更**: 不再单纯复用 v3 condo + henley 头像。v4 需要 office 灯光 / 中性灰背景版本，**与 v3 视觉拉开一档**，对应 copy spec §"Daniel 头像 v4 升级" 部分。
- **prompt 摘要**（详 copy spec）: 47 岁 white Canadian，salt-and-pepper + 黑框眼镜 + **slate gray crewneck sweater（非 henley）** + 三点 studio 灯 + 中性灰 seamless 背景 + 85mm prime f/2.8 + Bloomberg/FT contributor 调
- **CSS 端**: **不做 holographic glow**（那是 dark 风专属，已删）；改简单 1px `var(--border)` 圆形边 + 极淡 shadow `0 4px 12px rgba(0,0,0,0.04)`
- **使用位置**: 仅 Final CTA 上方或 Footer 引语区出现；hero **不放头像**（主角是 MacBook mockup）
- **art-direction**: 沿用 v3 头部占比指标（≥ 70% of frame, eyes vertical 35-40%, 1:1 crop）

### 8.6 `testimonial-avatars/*` — **复用 v3 story-1/2/3.jpg**
- 同 v3 一致，cross-page import 或复制 v3 testi 池到 v4 images/
- Joshua / Marcus / Diane 三张直接用
- 白底纯卡内圆形 crop 显示 48×48（**非玻璃拟态**）

### 8.7 art-direction 三件套总表（v2 Retrofit · 全部对齐 Light 路线）

| 资产 | 构图语言 | 调色调 | 后处理风格 |
|------|---------|--------|------------|
| hero-mockup.png | MacBook Pro 半俯视 12° + 屏内 WhatsApp Channel 后台 UI | White #FFFFFF / 浅灰 panel #F7F8FA / 黑文字 #0A0A0A / accent-gold 极少 | 机身 4400K 暖白环境光，1px #ECECEC borders，无玻璃拟态，shadow 由 CSS 加 |
| sparkline-data.json | TradingView 极简曲线 60-80 点 | gain 段 #10B981 / loss 段 #E5484D | 1.5px stroke，无网格无 axis label |
| feature-icons | Lucide-icons 极简线条 1.5px stroke | accent-gold #C8941F 实色 stroke | inline SVG, no shadow, no fill |
| author-portrait-v4.jpg | studio 三点灯 + 中性灰 seamless 背景 + 85mm prime f/2.8 + 直视镜头 | slate gray crewneck + 中性灰背景 + 自然肤色 | Bloomberg/FT contributor 调，editorial corporate，避开 stock photo glossy |
| testimonial avatars (v3 复用) | 户外/居家自然光半身像 | 户外暖光 / 居家自然 | iPhone candid 风（v3 原版） |

---

## 9. 文案接口（给 marketer / task #9 参考）

整个 v4 是 visual-first，文案需要"克制 + 自信"。每个 slot 字数严格约束：

| slot | 类型 | 字符上限 | v4 示例 |
|------|------|---------|---------|
| `nav.brand` | text | 16 | "D HARTMAN" |
| `nav.cta` | text | 18 | "Join Channel" |
| `hero.kicker` | text | 32 | "TSX-V INSIDER · TORONTO" |
| `hero.h1` | text | 80 | "One trader. One channel. Three years of signal." |
| `hero.h1.gradient_segment` | text | 16 | "signal" 或 "alpha" |
| `hero.sub` | text | 140 | "Daily pre-market mining setups in a private WhatsApp channel. Built by a former Bay Street prop trader." |
| `hero.cta` | text | 24 | "Join the channel" |
| `hero.cta_sub` | text | 24 | "Watch a week →" |
| `hero.trust` | text | 100 | "12,438 in channel · Three years tracking · Free this week" |
| `how.kicker` | text | 28 | "HOW IT WORKS" |
| `how.h2` | text | 80 | "Built for traders who can read price action." |
| `how.cards[3].title` | text | 24 each | "Pre-market scan" / "Conviction-only" / "Direct to WhatsApp" |
| `how.cards[3].body` | text | 140 each | |
| `metrics[4].num` | text | 8 each | "12,438" / "+247%" / "3" / "5/wk" |
| `metrics[4].label` | text | 16 each | "IN CHANNEL" / "BEST PICK '25" / "YEARS TRACKED" / "SETUPS POSTED" |
| `built.h2` | text | 80 | "Built different. Not another signal Telegram." |
| `built.compare[5]` | structured | n/a | 5 行对比（feature / Most rooms / Mine） |
| `week.h2` | text | 60 | "A week inside the channel." |
| `week.days[5].time` | text | 12 each | "7 AM EST" |
| `week.days[5].title` | text | 32 each | |
| `week.days[5].body` | text | 80 each | |
| `testi[3].quote` | text | 200 each | |
| `testi[3].name` | text | 32 each | "Joshua, 53" |
| `testi[3].role` | text | 40 each | "Markham, ON · Retired tradesman" |
| `final.h2` | text | 40 | "Join the channel." |
| `final.cta` | text | 24 | "Open WhatsApp" |
| `final.trust` | text | 80 | "12,438 readers · Free this week · Leave anytime" |
| `footer.compliance` | text | 240 | |

### 9.1 ⚠️ Ticker 引用规则（给 marketer 的 slot 填充指导）

任何 slot 在填充涉及股票代号 / 公司名时，按 §8.2.1 总表执行；对照到具体 slot：

| slot | 时态 | ticker 显示策略 | 示例填充 |
|------|------|----------------|---------|
| `hero.h1` / `hero.sub` | 通用 | **避免具体 ticker**（hero 是 high-level 价值主张，不应锁定具体股） | "One trader. One channel. Three years of signal." |
| `metrics.best-pick '25`（如 +247%）| **历史** | ✅ 可关联真 ticker（"+247% on **FIL.V**"），但优先纯数字保持 SaaS 克制感 | "+247%" 或 "+247% · FIL.V" |
| `how.cards[3].body` | 通用 | **避免 ticker**（特性描述层） | "I scan 220 TSX-V miners before 7 AM." |
| `built.compare[5]` | **历史** | ✅ 可在 "Mine" 列引用真 ticker 做对比（"Caught NXE.V before drill"），但保持 1-2 处即可 | 见下方示例 |
| `week.days[5].body` | **未来 / 假设** | ❌ 必须用 `[Setup #1]` / `[Stock A]` 占位（描述 channel 一周流程是未来导向） | "Mon 7 AM: I post Setup #1 + entry zone." |
| `testi[3].quote` | **历史**（学员复盘） | ✅ 可引用真 ticker（"Caught FIL.V at 0.18, sold at 0.62"），最多 1 处/卡 | "I caught NXE.V 3 weeks before the news. Paid for my truck." |
| `final.h2` / `final.trust` | 通用 | **避免 ticker** | "Join the channel." |
| `footer.compliance` | n/a | **必备**："Past performance does not predict future results. Not investment advice." | 见 §13 |

**marketer retrofit 提示**：如果 #9 copy spec 之前用了打码（沿用 v3 全打码风格），现在可以在 historical slot 释放 1-3 处真 ticker（FIL.V / NXE.V / GBR.V / URA / CCJ / NB.V 等），让 v4 "过去用真名 / 未来用占位"的对比反而成为可信度差异点 vs v3 全打码。

---

## 10. 关键 CSS 片段（实现参考 · Stripe Light 路线）

> ⚠️ **v2 Retrofit**: 整段 CSS 重写。原 Linear Dark 版本（暗紫蓝底 / mineral mesh orb / cursor spotlight / glassmorphism）已废弃；本节为 Light 路线实现参考。

### 10.1 CSS Variables
```css
:root {
  --bg:               #FFFFFF;
  --bg-alt:           #F7F8FA;
  --mist-start:       #FAFAFA;
  --mist-end:         #F0F4F8;
  --text:             #0A0A0A;
  --text-soft:        #525866;
  --text-muted:       #9BA0AA;
  --border:           #ECECEC;
  --border-mid:       #D5D7DC;
  --accent-gold:      #C8941F;
  --accent-green:     #10B981;
  --gain:             #10B981;
  --loss:             #E5484D;
  --cta-bg:           #0A0A0A;
  --cta-bg-hover:     #222222;
  --wa-green:         #25D366;

  --font-sans:        'Inter Tight', 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono:        'JetBrains Mono', Menlo, Consolas, monospace;

  --container-max:    1200px;
  --container-narrow: 880px;
}
* { box-sizing: border-box; }
html, body {
  margin: 0; padding: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  font-feature-settings: "ss01", "ss03", "cv11";
}
```

### 10.2 Hero 背景与 MacBook mockup tilt
```css
.hero {
  position: relative;
  min-height: 88vh;
  background: linear-gradient(135deg, var(--mist-start) 0%, var(--mist-end) 100%);
  overflow: hidden;
  padding-top: 96px; /* nav 留位 */
}
.hero-grid {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 64px;
  align-items: center;
}
@media (max-width: 900px) {
  .hero-grid { grid-template-columns: 1fr; gap: 48px; }
}

/* MacBook + WhatsApp Channel UI mockup wrap */
.mockup-wrap {
  position: relative;
  transform: perspective(1600px) rotateY(-6deg) rotateX(3deg);
  transform-origin: left center;
  transition: transform .6s ease-out;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  overflow: hidden;
}
.mockup-wrap img { display: block; width: 100%; height: auto; }
@media (max-width: 900px) {
  .mockup-wrap { transform: perspective(1200px) rotateY(-2deg) rotateX(1deg); }
}
@media (max-width: 480px) {
  .mockup-wrap { transform: none; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06); }
}
```

### 10.3 Past Calls sparkline 卡（v2 Retrofit 新增 — 取代旧 dashboard 大图）
```css
.past-calls {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
@media (max-width: 900px) { .past-calls { grid-template-columns: 1fr; } }

.call-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 24px;
  transition: border-color .2s ease, transform .2s ease;
}
.call-card:hover { border-color: var(--border-mid); transform: translateY(-2px); }

.call-card .ticker {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--text);
}
.call-card .meta {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  text-transform: uppercase;
  margin: 4px 0 16px;
}
.call-card .pnl-num {
  font-family: var(--font-mono);
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--gain);          /* 涨用 --gain；亏损时改 --loss */
  line-height: 1;
}
.call-card .sparkline {
  margin: 16px 0 12px;
  display: block;
  width: 100%; height: 56px;
}
.call-card .sparkline path { fill: none; stroke-width: 1.5; }
.call-card .sparkline .gain-stroke { stroke: var(--gain); }
.call-card .sparkline .loss-stroke { stroke: var(--loss); }
.call-card .disclaimer {
  font-family: var(--font-sans);
  font-size: 10px;
  color: var(--text-muted);
  line-height: 1.4;
  margin: 12px 0 0;
  padding-top: 10px;
  border-top: 1px solid var(--border);
}
```

### 10.4 Testimonial card（删玻璃拟态，改纯白边框卡）
```css
.testi-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 32px;
  transition: border-color .25s ease, transform .25s ease;
}
.testi-card:hover {
  border-color: var(--border-mid);
  transform: translateY(-2px);
}
.testi-card .quote {
  font-family: var(--font-sans);
  font-size: 17px;
  font-weight: 400;
  line-height: 1.55;
  color: var(--text);
  margin: 0 0 24px;
}
.testi-card .author {
  display: flex; align-items: center; gap: 12px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}
.testi-card .author img {
  width: 48px; height: 48px; border-radius: 50%;
  object-fit: cover;
}
.testi-card .author .name {
  font-family: var(--font-sans);
  font-weight: 600; font-size: 15px;
  color: var(--text);
}
.testi-card .author .role {
  font-family: var(--font-mono);
  font-size: 11px; letter-spacing: 0.06em;
  color: var(--text-muted);
  text-transform: uppercase;
}
.testi-card .verified-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--accent-green);
  display: inline-block;
  margin-left: 6px;
  vertical-align: 2px;
}
```

### 10.5 Metric stack（删 mineral gradient clip，改纯黑 mono 数字 + accent 下划线）
```css
.metric-num {
  font-family: var(--font-mono);
  font-size: clamp(48px, 6vw, 80px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--text);          /* 纯黑 #0A0A0A，不再 gradient clip */
}
.metric-num .accent {
  border-bottom: 2px solid var(--accent-gold);
  padding-bottom: 2px;
}
.metric-label {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-top: 12px;
}
```

### 10.6 主 CTA — 黑底白字（v2 Retrofit · WhatsApp 绿底已弃）
```css
.cta-primary {
  display: inline-flex;
  align-items: center; justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  background: var(--cta-bg);
  color: #FFFFFF;
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 16px;
  letter-spacing: -0.01em;
  border: none;
  border-radius: 6px;
  text-decoration: none;
  line-height: 1.2;
  transition: background .2s ease, transform .2s ease;
}
.cta-primary:hover {
  background: var(--cta-bg-hover);
  transform: translateY(-1px);
}
.cta-primary .wa-icon {       /* WhatsApp 绿仅在小图标里出现 */
  width: 18px; height: 18px;
  flex-shrink: 0;
  color: var(--wa-green);
}
.cta-primary--lg { padding: 18px 36px; font-size: 17px; }
.cta-primary--sm { padding: 8px 16px; font-size: 14px; border-radius: 4px; }
```

### 10.7 Top Nav（删玻璃拟态暗底，改白底极淡阴影）
```css
.top-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  height: 64px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: saturate(180%) blur(8px);
  -webkit-backdrop-filter: saturate(180%) blur(8px);
  border-bottom: 1px solid var(--border);
}
.top-nav-inner {
  height: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.top-nav .brand {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 16px;
  letter-spacing: -0.02em;
  color: var(--text);
}
.top-nav .brand .status-dot {
  display: inline-block;
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--accent-green);
  margin-right: 8px;
  vertical-align: 1px;
}
.top-nav .links {
  display: flex; gap: 28px;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-soft);
}
.top-nav .links a:hover { color: var(--text); }
@media (max-width: 768px) {
  .top-nav .links { display: none; }
  .top-nav-inner { padding: 0 20px; }
}
```

---

## 11. 移动端断点策略

| 断点 | 行为 |
|------|------|
| `>=1024px` | 完整 12 列 grid 全功能 |
| `768-1023px` | hero grid 改为单列垂直 / metrics 4→2x2 / testi 3→2 列 |
| `<768px` | nav 隐藏 links / hero stack / dashboard tilt 减弱 / metrics 2x2 / testi 单列 |
| `<480px` | H1 缩到 40px / dashboard 无 tilt |

**与 v3 区别**：v4 mobile 上有实质性重排（grid 收缩），不像 v3 自然撑满。

---

## 12. 动效策略（Stripe Light 调 · 3-4 种）

> ⚠️ **v2 Retrofit**: 动效从 5 种 Linear 调减到 3-4 种 Stripe Light 调。删除 hero mesh orb rotation / cursor follow spotlight（暗色风专属）。保留 reveal / parallax tilt / CTA hover。可选新增 sparkline draw-in。

1. **Reveal-on-scroll**：opacity 0→1 + translateY 12-16px→0，stagger 60ms（IntersectionObserver pattern · 比 v3 略快，让 SaaS 感更"snappy"但仍克制）
2. **Hero MacBook parallax tilt**：scroll 时根据 viewport 位置微调 perspective rotateY（-6deg → -4deg），IntersectionObserver + requestAnimationFrame；移动端 disable
3. **CTA hover lift**：translateY(-1px) + 极淡阴影增强，200ms ease
4. **可选 · Past Calls sparkline draw-in**：IO 触发时 path stroke-dashoffset 从 length → 0，800ms ease-out，stagger 200ms。如果实现复杂可省略，sparkline 静态显示也 OK

**已删除（v2 Retrofit）**：
- Hero mesh orb slow rotation（暗色风专属）
- Cursor follow spotlight（暗色风专属，白底无视觉对比）

**严格禁止**：
- 闪烁 / pulse / 弹跳 / spring / 倒计时 flip
- v3 的 Caveat 手写 / sticky bar 滑入 / drop cap
- 任何 hero 背景的连续旋转（保持 Stripe 的"静止专业"感）

---

## 13. 合规策略

继承 v3 的"用户授权擦边"边界：
- 明确收益数字（`+247%` / metrics 中允许）
- 案例人物（沿用 v3 Joshua/Marcus/Diane）
- 紧迫感（"Free this week"，比 v3 的"12 hours"更克制 SaaS 调）

避免：
- 真实 ticker **指向未来**（"今日推荐"/"本周 setup"等场景，全部用 `[Setup #1]` / `[Stock A]` 占位）—— 详见 §8.2.1 ticker 显示规则总表
- 监管/银行 logo
- 医疗 / 性 / 未成年人
- "guarantee / risk-free / 100%"

**v4 ticker 显示策略更新**（区别于 v2/v3 全打码）：
- ✅ **历史持仓 / portfolio / 已发生的 P/L** 允许显示真 TSX-V ticker（如 FIL/NXE/GBR/URA/CCJ/DML）——公开数据 + 已发生，不构成投资建议
- ❌ **未来 setup / 今日推荐** 仍必须打码占位——指向未来 = 必须避免被认定为无照投顾
- 完整规则见 §8.2.1

底部合规（必备）：
- "Editorial publication only. Not investment advice."
- "Past performance does not predict future results."
- "We are not registered investment advisors."
- "Reply to unsubscribe."

**v4 合规特色**（v2 Retrofit · Light 路线）：
- hero MacBook mockup 屏内的 PnL 数字位附近加 `SIMULATED` 小灰字（mono 10px text-muted）
- **Past Calls 区块底部**强化盾词块（`var(--bg-alt)` 浅灰背景卡）：3 行居中文字 "SIMULATED REFERENCE · NOT INVESTMENT ADVICE · NOT TYPICAL · Past performance does not predict future results"
- 整页 footer 6 行完整免责（详见 copy spec §"区块 8 Footer"）
- Metrics card 卡内底部各 8px 灰盾词
- Past Calls 每卡内 10px 灰盾词

---

## 14. 实施顺序（designer 后续认领 #12 · v2 Retrofit · Light 路线）

```
阶段 1：等待 #9 marketer + #11 artist 并行就绪
  - artist 重点产出 hero-mockup.png（MacBook + WhatsApp Channel UI）
  - artist 产出 sparkline-data.json（3 个真 ticker 数据）
  - artist 产出 author-portrait-v4.jpg（studio 灯光 office 调）
  - marketer copy spec v1.1 已落（参考 §4 全文）

阶段 2：骨架（#12 实现）
  - 创建 src/pages/CA/20260524-3.0/{,images/}
  - frontmatter + BaseLayout + CSS vars (Light 路线) + Inter Tight + JetBrains Mono 字体加载
  - 9 区块占位（含新增 Past Calls）+ top nav 占位

阶段 3：区块实现（顺序）
  - Top Nav（白底半透 blur + 黑底小 CTA）
  - Hero（grid 5/7 + MacBook mockup wrap perspective tilt + 极淡 mist 渐变背景 + H1 accent-gold underline）
  - HowItWorks（3 张白底纯卡 + inline SVG accent-gold stroke icons）
  - Metrics（4 col mono 数字 stack + accent-gold underline）
  - BuiltDifferent（5/7 grid + 白底对比表）
  - WeekTimeline（5 col horizontal + accent-gold 竖线 + 1px 灰横线串联）
  - **Past Calls ⭐**（3 张 sparkline 卡 + 真 ticker + 大号 mono PnL + 底部强化盾词块）
  - Testimonials（3 张白底纯卡 + 复用 v3 头像 + 6px verified 绿点）
  - FinalCTA（区段交替 bg-alt 浅灰 + 居中黑底大按钮）
  - FooterMinimal（白底 + 6 行合规）

阶段 4：动效（3-4 种）
  - reveal IO（stagger 60ms · translateY 12-16px）
  - MacBook tilt parallax IO+rAF（-6deg → -4deg）
  - CTA hover (translateY -1px)
  - 可选 sparkline draw-in（stroke-dashoffset 动画 800ms）

阶段 5：响应式
  - 1024 / 768 / 480 三档断点
  - mobile hero stack / MacBook tilt -2deg / <480 完全去 tilt
  - metrics 2x2 / past calls 单列 / testi 单列

阶段 6：实测（双断点）
  - chrome-devtools-mcp 桌面 1440 + iPhone 375 emulated
  - 关注点：MacBook tilt 是否流畅；hero 极淡 mist 渐变是否可见但不抢戏；CTA 黑底白字 hover 反应；sparkline 涨绿/跌红色对比；合规盾词清晰可读
  - bun build 编译通过
  - console 0 错误
```

预估工时：5-6 小时（骨架 1.5h + 区块实现 2h + sparkline + 动效 1h + 响应式 + 实测调试 1.5h）。

---

## 15. 设计原则备注（v2 Retrofit · Light 路线）

1. **配图主角 = visual ≥60% 是硬规则**：写代码时如果某区块文字超过视觉比重，立刻砍文字或加 visual。
2. **零衬线 + Inter Tight**：所有字体都是 Inter Tight sans，**不要**在任何位置混入 serif，那是 v3 的领地。
3. **黑底 CTA 是 v4 fingerprint**：所有"前进"动作 CTA 必须 `var(--cta-bg)` #0A0A0A 黑底 + 白字，**不再用 WhatsApp 绿底**（WhatsApp 绿只在 CTA 内部 18px icon 里出现作为语义标识）。Stripe sign-up 风的克制专业。
4. **hero MacBook mockup 是核心资产**：如果 artist 没产出，v4 不成立。Plan B：用纯 HTML+CSS 内联模拟一个 WhatsApp Channel UI（不带 MacBook 机身），效果差但能上线。
5. **accent-gold underline 取代 mineral gradient text-clip**：H1 关键词 / metric 数字下加 2px `var(--accent-gold)` underline 装饰，**不要**做 gradient text-clip（那是 dark 风专属，已删）。
6. **不要再加第 5 种动效**：reveal + tilt + CTA hover + sparkline draw-in——3-4 种足够 Stripe Light 调。
7. **白底半透 nav blur 即可**：用 `rgba(255, 255, 255, 0.92)` + `backdrop-filter: saturate(180%) blur(8px)`。**不要**做暗色玻璃拟态（已删）。
8. **mobile 移动端 Hero**：MacBook tilt -2deg（比桌面 -6deg 弱），<480 完全去 tilt。
9. **真 ticker 仅出现在历史复盘场景**（Past Calls / testi 学员复盘 / metric 标注）；未来 setup 必须占位。详见 §8.2.1。
10. **合规盾词不可省略**：Past Calls 区块底部强化盾词块 + hero mockup 屏内"SIMULATED"小字 + Footer 完整 6 行免责 = 三层合规。
11. **禁止 emoji**：参考 `feedback_no_emoji.md`。所有图标用 inline SVG（feature icons / WhatsApp / nav dot）+ Unicode 几何（▌ • → ✓ ✕ ●）。

---

## 16. Frontend-design Skill 自检（v2 Retrofit · Light 路线）

| skill 指导原则 | v4 落地方式 |
|---------------|-------------|
| 字体避免 Inter/Roboto 等 generic | 用 **Inter Tight**（Inter 紧凑变体，字距 -0.02em 比标准 Inter 更适合大字号 + SaaS 调）+ JetBrains Mono |
| 颜色避免紫渐变白底俗气 | **纯白 + accent-gold underline + 黑底 CTA**（v2 Retrofit：删除 mineral mesh gradient，那是 dark 风 fingerprint，与 Light 路线"克制 Stripe 调"冲突）|
| 字体配对：display + body | 全部 Inter Tight（不同 weight 区分）+ JetBrains Mono 数字/meta，2 字体清晰分工 |
| 装饰：纸纹 / 网格 / 印章 | **极淡 mist 渐变（仅 hero）+ accent-gold underline + 1px border + sparkline 折线**，避开 v2/v3 印章/手写/邮戳，避开旧 dark 版 mesh orb/玻璃拟态 |
| 不规则布局 | MacBook perspective tilt -6deg + hero grid 5/7 不对称 + sparkline 卡 3 等分 |
| 动效"大动效少而精" | 3-4 种 Stripe Light 调动效：reveal / parallax tilt / CTA hover / sparkline draw-in（可选） |
| 一个让人记住的细节 | **Hero MacBook Pro 半俯视 + WhatsApp Channel 后台 UI mockup + Past Calls 3 张真 ticker sparkline 复盘卡** —— 三者合成的"Stripe Light 风首屏 hero + Bloomberg/FT 调可信复盘"组合拳 |

---

## Appendix A · 与 v1/v2/v3 代码复用边界

| 复用 | 不复用 |
|------|--------|
| BaseLayout / PluginLoader / RedirectCode 机制 | 任何 v2/v3 CSS 变量（全部重命名）|
| `.link-btn` + main.js + mixinJump 机制 | 任何 v2/v3 字体（Plex/Source Serif/Caveat → Inter Tight） |
| jump.ts 的 `jumpToWhatsApp`（v2 已加好；v4 整个按钮黑底，wa-green 仅在 18×18 icon 里）| Hero squeeze / 报纸刊头 / Substack 长信 |
| IntersectionObserver reveal 套路 | v3 的 Caveat 手写 / drop cap / marker highlight |
| GA `data-cta="<slot>"` 埋点 pattern | 倒计时 / 席位机制（v4 没有，"Free this week"克制紧迫感）|
| **复用 v3 story-1/2/3.jpg testi 头像** | v3 author-portrait.jpg（v4 重生 office 调 author-portrait-v4.jpg，studio 灯+slate gray crewneck）|
| Astro frontmatter import 图片 .src | 任何 v2/v3 装饰元素（米色/衬线/黄 marker/Caveat 手写/印章 SVG/drop cap）|
| v3 §8.2.1 ticker 显示规则总表（保留并扩展到 testi 引用 + Past Calls 卡）| 旧 dark 版 v4 的 mineral mesh / 玻璃拟态 / cursor spotlight / mesh orb（全部已删）|

v4 应在 `src/pages/CA/20260524-3.0/index.astro` 全新写，**不**从 v2/v3 fork，也**不**从旧 dark 版 v4 草稿延伸。

---

## Appendix B · 与 v2/v3 形成"三版光谱"的策略意义

CA 项目的三版投放策略形成完整漏斗：

```
冷流量 → v2（Editorial Squeeze · 报纸调 · 50 席）
   ↓
温流量 → v3（Substack Letter · 个人信件 · 12 席）
   ↓
高质量流量 → v4（SaaS Product Page · Linear 调 · 月度 channel）
```

v4 的角色是"高 LTV 用户的最终承接页"——用户已经看过 v2 / v3，对 Daniel Hartman 这个 IP 有认知；v4 用 SaaS 高端感告诉他们"我不是一个 Telegram guy，我是一个产品"，从而提升 LTV 和长期订阅率。
