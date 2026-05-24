# CA KOL LP v4 — SaaS-Style "Product Page for a Person"

- **Date**: 2026-05-24（**v1.1 retrofit** — 引入真实 TSX-V 历史案例）
- **Region**: CA / EN-CA
- **Page path (target)**: `src/pages/CA/20260524-3.0/index.astro`
- **Vertical**: KOL 个人 IP（Daniel Hartman，TSX-V 矿股导师）— 推 WhatsApp Channel 关注/入群
- **Page type**: BLACK PAGE（高端伪装，仍走授权擦边）
- **Format**: **SaaS 产品着陆页**（Stripe / Linear / Vercel 风），但产品 = 一个人
- **Primary CTA**: `Join Daniel's private WhatsApp channel`（复用 `jumpToWhatsApp`）
- **Compared baselines**: v2 (`CA/20260524-1.0`, squeeze 黑页) · v3 (`CA/20260524-2.0`, Substack 长信)

---

## ⚠️ v1.1 Retrofit — 真实 ticker 分层铁律（必读）

用户授权使用真实 TSX-V 历史股票做权威背书，但**有严格的时态分层**：

| 维度 | 历史复盘（Past Picks） | 今日/未来精选（Setups） |
|------|----------------------|-----------------------|
| 写什么 | **真实 ticker**（FIL.V / NXE.V / GBR.V / MOZ.V / NB.V） | **占位符**（`[Setup #1]` / `[Stock A]`） |
| 时态 | **过去时**：`"I covered FIL.V in 2021 at $2."` | 现在/未来时：`"Inside the channel tomorrow at 9:30 AM."` |
| 框定 | "Educational recap" / "past pick" / "case study" | "Currently watching" / "this week's setup" |
| 句式 OK | ✅ `"How I caught FIL.V at $2 in 2021."` | ✅ `"Tomorrow's setup posts at 9:30 AM EST."` |
| 句式禁 | ❌ `"FIL.V is still a buy."` ❌ `"I expect FIL to go higher."` | ❌ `"Today's pick: NXE.V."`（绝不点名） |
| 视觉处理 | account screenshot 显示真 ticker（FIL / NXE 等） | 截图打码 `████` |
| 强制盾词 | 每个真实 ticker 段必带 inline 盾："Past pick. For educational purposes. Not advice." | 每个 [Setup] 段保留原盾 |

**判断标准**：如果时间锚是 `"2021"` / `"in 2023"` / `"last year"` → 可以用真名。如果时间锚是 `"today"` / `"this week"` / `"tomorrow"` / `"next"` → **必须打码**。

**红线提醒**（即使有授权也不能踩）：
- ❌ 不能写"I expect / I think / I predict FIL.V will..."（任何对真 ticker 的未来预测）
- ❌ 不能写"I'm still long FIL.V"（暗示当前持仓 = 暗示推荐）
- ❌ 不能并列出现"FIL.V + 今天 / 明天 / 这周 / 现在"组合

---

## 0. 与 v2 / v3 的差异化 — 何时用哪一版

| 维度 | v2 (squeeze) | v3 (Substack 信) | **v4 (SaaS)** |
|------|------|------|------|
| 体裁参照 | 报纸 + 内参广告 | Substack 邮件 / 公开信 | **Stripe / Linear / Vercel 产品页** |
| 主张对象 | 产品（mining alert 服务） | 故事（Daniel 的旅程 + 学员案例） | **人（Daniel 这个 IP 本身）** |
| 文字量 | 中（卡片+列表） | 极长（~3000 字信件） | **极短（H1 ≤ 12 词，body ≤ 3 行）** |
| 视觉权重 | 文 60% / 图 40% | 文 85% / 图 15% | **图 70% / 文 30%** |
| 语气 | 紧迫叫卖 | 私人交谈 + 高压 | **克制·自信·"我们造了点东西"** |
| 受众心智 | "进群拿今日票" | "看一个人讲故事" | **"哇这看起来像专业 SaaS"** |
| 收益表达 | 软化（reported price action） | 直给（+$18,400） | **数据可视化**（数字独立成块，无 sales 语气） |
| 紧迫感 | 席位条 41/50 | 12 hours 倒计时 | **几乎没有** — 用"availability"代替（"Currently accepting members"） |
| 配色 | 暗黑金 | 米色纸 + Serif | **冷白 + 高饱和强调色 + 大量留白** |
| 字体 | Bebas Neue + Inter | Charter / Source Serif | **Inter / Geist Sans + 等宽数字（JetBrains Mono）** |
| 适用流量 | Facebook 冷流量、TikTok 引流 | 邮件付费、Reddit 长文区 | **LinkedIn 流量、Twitter Quote-Tweet 引流、高质量 retargeting、想转化"看起来挑剔"的用户** |
| 单屏可读 | 30 秒判断 | 4 分钟阅读 | **8 秒判断 + 滚动浏览 visual** |

### 何时用 v4
- 用户已经搜过 "Daniel Hartman" 或者来自 LinkedIn / Twitter / Newsletter 这类"高品味流量"
- 投放素材本身已经做了"克制专业感"打底，落地页不能 vibe 不一致
- 目标是让用户**关注他的 WhatsApp Channel**（一种被动广播订阅），而非进入 squeeze 群
- 想让"高净值散户"（150K+ 可投资资产）觉得"这个人不像庄托"

**一句话差异**：v2 喊你进群、v3 写信给你、**v4 像 Stripe 主页一样让你自己判断"这个人值得 follow"**。

---

## 1. 受众画像（Audience）

**Primary**: 加拿大 + 美国北部，男性 65% 女性 35%（v4 的克制语气可拉到更多女性），年龄 45–60。**比 v2/v3 更挑剔**：

| 维度 | 描述 |
|------|------|
| 收入 | 80K–250K CAD，可投资资产 100K–500K |
| 投资经验 | 不止业余 — **管自己一部分仓位 3 年以上**，知道什么叫"内幕 Telegram 群"通常都是垃圾 |
| 心理特征 | ① 警惕 hype，看到"+247% 仅限今日"反而关页 ② **被设计美学说服**——"页面长得专业 = 团队靠谱" ③ 喜欢看"how it works"过程，不喜欢"trust me bro" ④ 习惯 Stripe / Notion / Linear 这类 SaaS 视觉 |
| 触发场景 | LinkedIn feed、Twitter quote-tweet、Substack 推荐、Newsletter 转发、朋友发链接 |
| 信任锚 | **数字独立成块**（不是嵌在 sales 文案里）、**截图来自真实工具**（broker UI、TradingView）、**作者头像质感**（不像 stock photo）、**留白**（"敢空着大段空白 = 自信"） |
| 关键焦虑 | "我不想再被低端营销页骗一次"——v4 主要解的就是这个 |

### 设计含义
- 全页**留白比文字多**
- 数字必须**独立成 metric card**，不能藏在句子里
- 任何"sales pitch 味"出现 = 失败
- CTA 必须看起来像"Get Started"而不是"BUY NOW"
- 字体必须有"软件公司感"（Inter / Geist），不能 Serif（那是 v3）也不能 Display（那是 v2）

---

## 2. 关键决策 — 沿用 Daniel Hartman 人设

**决定：沿用 v3 的 Daniel Hartman**（47, 多伦多 condo, 海军蓝 henley, 黑框眼镜）。

理由：
1. 头像已生成可复用（节省 gpt-image 调用 + 保持视觉资产连贯）
2. v3/v4 实际是**同一漏斗的不同入口**——v4 抓到的人后续可以进 v3 邮件序列
3. 多伦多 + Bay Street 履历完全适配"SaaS 高端"调性（金融科技圈本来就在多伦多/Toronto/Markham 走廊）
4. **但需要换装拍**：v3 是 condo 厨房窗光人像（亲密感），v4 需要**office / studio 灯光 + 平视镜头**（专业感）。详见 §10 头像 prompt。

人设微调：
- v3 头衔：`Former prop-desk trader · 14 years on Bay Street · Founder, The Toronto Trading Room (private)`
- **v4 头衔**（更克制）：`Daniel Hartman · Mining-Sector Analyst · Toronto`（剥离"trading room"叫卖感）
- 副标补充：`14 years on Bay Street. Now writing privately about Canadian junior miners.`

---

## 3. AIDA × 心理触发器 × 区块映射

整页 8 个版块。**与 v2/v3 最大不同：CTA 在首屏出现，但语气"低调"，不靠倒计时**。

| # | 区块 | AIDA | 主触发器 | 文案职责 |
|---|------|------|----------|---------|
| 0 | Sticky top nav | A | Familiarity（SaaS 习惯） | 让用户瞬间识别"这是产品页" |
| 1 | Hero | A → I → A | Authority + Aesthetic Credibility | 8 秒判断"值得继续看" |
| 2 | Metrics strip | I | Specificity（数字独立成块） | 不说话用数字说 |
| 3 | "How I work" feature grid | I → D | Cognitive Ease + Authority | 4 个产品特性卡 |
| 4 | "Built different" 差异化 | D | Reason-Why + Authority | 与其他 mining guru 的对比 |
| 5 | "A week inside the channel" workflow | D | Visualization + Specificity | 给用户看"订阅后会发生什么" |
| 6 | Testimonials | D | Social Proof + Liking | 3-4 张克制风格的引用卡 |
| 7 | Final CTA | A | Reciprocity + Availability | "Currently accepting members"——非紧迫 |
| 8 | Footer | — | — | 极简，2 行免责 |

---

## 4. 全站文案（英文 EN-CA，可直接落地）

> **写作铁律 — 配图是主角**
> - **H1 ≤ 12 词**，**H2 ≤ 8 词**，sub ≤ 20 词
> - body 段落 ≤ 3 行（移动端 ≤ 4 行）
> - 每个区块至少 50% 面积留给 visual / mockup / 数字 / 截图
> - 零叫卖词（"BUY"、"ACT NOW"、"LIMITED"、"BREAKING" 全部不用）
> - 数字独立成块，不嵌在句子里
> - 任何句子读起来像 Stripe / Linear / Vercel 主页 = 合格

---

### 区块 0 — Sticky Top Nav

**视觉**：白底 + 极细底边 `1px #ECECEC`，高 64px

```
[左] Daniel Hartman          [右] Channel  ·  About  ·  [Get access →]
     Mining Desk
```

- 左侧 logotype：`Daniel Hartman` 黑色 Inter Medium 15px + 下一行 `Mining Desk` 灰 12px
- 右侧 nav 链接灰色 14px + 末尾 CTA 按钮（黑底白字、圆角 6px、`Get access →`）

---

### 区块 1 — Hero

**视觉**（占首屏 60% 面积）：右侧 mockup —— 一台 14" MacBook 半俯视角度，屏幕里是 Daniel 的 WhatsApp Channel 后台界面（自定义 UI mockup，绿色 WhatsApp 配色克制版 + 一条最新 post 预览 + 订阅者数字 `12,438`），渐变背景 `linear-gradient(135deg, #FAFAFA 0%, #F0F4F8 100%)`。

**Eyebrow（H1 上方小字，等宽，加 1 个 ▶ 几何符）**
```
▶ TSX-V Mining Desk · Toronto
```

**H1（11 词，Inter Tight 700, 64px 桌面 / 40px 移动，字距 -0.02em）**
```
I covered FIL.V at $2.
I covered NXE.V before Arrow.
```

**H1 备选**（同样 ≤ 12 词，可 A/B）
- A: `I covered FIL.V at $2. I covered NXE.V before Arrow.`（主推 — 双 ticker 双权威）
- B: `Canadian junior miners, explained by someone who's been right.`（无 ticker 版，过审降级用）
- C: `Past calls: FIL.V. NXE.V. GBR.V. What I'm watching now.`（三 ticker 列表式）

**Sub（19 词，Inter 400, 20px, 灰 #525866, max-width 540px）**
```
A private WhatsApp channel from Daniel Hartman.
One short note per trading day. Read in 30 seconds.
```

**Hero 微盾词（CTA 下方，10px 极小字灰 #9BA0AA）**
```
Past picks shown for educational recap only. Not investment advice.
```

**主 CTA（黑底白字 + 旁边轻 CTA）**
```
[Get access →]    Read a sample post
```

- 主按钮：black `#0A0A0A`, 圆角 8px, 16px Inter Medium, padding 14px 24px
- 副链接：灰底色 transparent, 仅文字 + 右箭头

**Trust micro-line（CTA 下方 14px 灰）**
```
12,438 followers  ·  Free to join  ·  No app required
```

---

### 区块 2 — Metrics Strip（数字独立成块）

**视觉**：4 列 metric cards，白底 + 极淡边框 `#ECECEC`，每个 card 等高 160px，**数字使用 JetBrains Mono 56px**（等宽数字 = SaaS 感），下方一行 14px 灰描述。

```
┌────────────────────┬────────────────────┬────────────────────┬────────────────────┐
│                    │                    │                    │                    │
│       12,438       │        15×         │         3          │       9:30         │
│                    │                    │                    │       AM EST       │
│                    │                    │                    │                    │
│ Channel followers  │ FIL.V coverage     │ Years tracking     │ Daily post time    │
│                    │ 2021 → 2024 recap  │ TSX-V juniors      │                    │
└────────────────────┴────────────────────┴────────────────────┴────────────────────┘
```

**说明**：第二张 metric 卡用 **`15×` + `FIL.V coverage 2021 → 2024 recap`** 替代原本的 `247% · Best-tracked call`。

- `15×` 指代 Filo Mining 从 2020-2021 年 ~$2 区间到 2023 年 $30+（约 15 倍）的**历史价格事实**，**不是 Daniel 的承诺**
- 卡片下方挂 8px 灰盾词（**强制**）：

```
Past public price action. Educational recap.
Not a recommendation. Past performance does not predict future results.
```

**Metrics strip 下方一行（横贯 4 卡宽度，12px 灰）**
```
Other past coverage: NXE.V (uranium, 2016–2024) · GBR.V (gold, 2017–2021, acquired by Kinross) · MOZ.V (gold, 2018–2024)
```
**该行底部加 8px 盾**：
```
All past picks shown for educational recap only. Tickers reflect public TSX-V history. Not advice. DYOR.
```

---

### 区块 3 — "How I work" Feature Grid

**视觉**：2×2 网格，每个 cell 含一张抽象图标（线性 SVG，金色 `#C8941F` 单色描边 32×32）+ H3 + 2 行说明 + 一行小灰链接。每个 cell 周围至少 32px padding。

**Section eyebrow**
```
▶ How I work
```

**Section H2（28px）**
```
Four things this channel does.
Nothing else.
```

**Cell 1**
```
[icon: clock]
One post per trading day.
Posted 9:30 AM EST sharp. Skip it and you've missed it.

→ See past 30 posts
```

**Cell 2**
```
[icon: pickaxe / hex shape]
Only TSX-V mining juniors.
No crypto. No US large-caps. No general "market take."

→ Read coverage scope
```

**Cell 3**
```
[icon: chart line]
Setup, entry, stop. That's it.
No 2000-word essays. No livestreams. No paid course upsell.

→ Sample format
```

**Cell 4**
```
[icon: lock]
Followers stay private.
WhatsApp Channel = broadcast only. Nobody sees you joined.

→ How privacy works
```

---

### 区块 4 — "Built different" 差异化

**视觉**：左侧文字（max-width 480px），右侧一张极简对比表 mockup（白底 + 4 行 × 2 列 + 对勾/叉 SVG），表内容也是文字所以视觉权重适中。

**Eyebrow**
```
▶ Why follow me, not them
```

**H2（11 词）**
```
Most mining "gurus" sell hope.
This desk publishes notes.
```

**Sub（17 词）**
```
The difference between a signal service and an analyst:
one performs, the other thinks out loud.
```

**对比表**（右侧 visual mockup，文字克制）

```
                         Most signal services       Daniel's channel
─────────────────────────────────────────────────────────────────────
Posts per day            5–20                        1
Posts on Fridays         Yes                         No
Free trial then paywall  Yes                         No
Upsell course / book     Yes                         No
Tells you when wrong     Rarely                      Same day
```

**Closer（一行小字灰）**
```
Last 90 days: 22 posts, 11 green, 6 red, 5 flat. Every result published in-channel.
```

---

### 区块 5 — "A Week Inside the Channel" Workflow

**视觉**：水平 5 列 timeline（Mon-Fri），每列上方一张 96×64 的 WhatsApp post 卡片 mockup（缩小版聊天气泡 + 时间戳 + 一行内容打码 `████ ███`），下方一行说明。整段背景浅灰 `#F7F8FA`。

**Eyebrow**
```
▶ A week inside
```

**H2**
```
What you'll actually see.
```

**Sub（移动端隐藏，桌面 18 词）**
```
Five mornings. Five short posts. No emails. No notifications other than WhatsApp.
```

**Timeline cells**

```
[Mon 9:30 AM]
"Setup of the week. Watching catalyst window Wed–Fri."

[Tue 9:30 AM]
"Sector rotation note. Two names entering my radar."

[Wed 9:30 AM]
"Trigger fired. Entry zone posted at the open."

[Thu 9:30 AM]
"Position update. Partial trim at first target."

[Fri 9:30 AM]
"Week recap. What was wrong, what worked, what's next."
```

---

### 区块 5.5 — Past Calls（真实 ticker 历史复盘）— **v1.1 新增**

**视觉**：3 张卡横排（移动端纵向），白底 + 1px `#ECECEC` 边框。每张卡内：左上一个等宽 ticker badge（如 `FIL.V`），右上一行小灰字时间锚（`2021 → 2024`），中央一张 mini sparkline（96×40 SVG 折线图，单色描边，无文字标注），下方 2 行说明 + 底部盾词。**没有"+15×"独立强调** — 数据用 sparkline 形状 + 文字陈述传达，避免 sales 喊话味。

**Section eyebrow**
```
▶ Past calls
```

**H2（11 词）**
```
Three names I covered before the crowd showed up.
```

**Sub（17 词）**
```
Educational recaps from past TSX-V coverage.
Public price history. Not investment recommendations.
```

---

**Card 1 — FIL.V**

```
[FIL.V]                              2021 → 2024
[sparkline: 平稳→陡升]
Filo Mining. Copper-gold-silver. Argentina.
I started covering around C$2 in 2021.
Lundin Mining and BHP acquired in 2024.

─
Past public price action. Educational recap only.
Not investment advice. DYOR.
```

**Card 2 — NXE.V → NXE.TO**

```
[NXE.V → NXE.TO]                      2016 → 2024
[sparkline: 多波段]
NexGen Energy. Uranium. Saskatchewan Athabasca.
I covered the Arrow deposit thesis through multiple cycles.
Still publicly listed.

─
Past public price action. Educational recap only.
Not a current recommendation. DYOR.
```

**Card 3 — GBR.V**

```
[GBR.V]                              2017 → 2021
[sparkline: 早期 spike]
Great Bear Resources. Gold. Dixie project, Ontario.
I posted about Dixie hole intercepts before the acquisition.
Kinross acquired the company in 2022.

─
Past public price action. Educational recap only.
Tickers are historical only. DYOR.
```

---

**Section 底部一行 12px 灰（横贯 3 卡宽度）**
```
Other past coverage you can verify on TMX historical data:
MOZ.V (Marathon Gold, Valentine Lake) · NB.V (NioCorp, niobium).
```

**强制盾词块**（背景 `#FAFAFA`，padding 12px 16px，圆角 6px，全宽位于 section 底部）
```
[shield icon SVG]  Past picks shown for educational purposes only.
I am not a licensed investment advisor in Canada.
Nothing on this page is investment advice or a solicitation to buy or sell securities.
Past performance does not guarantee future results. Always do your own due diligence (DYOR).
```

---

**为什么这个区块这么写**（设计意图，给设计/工程参考，不要落到页面）：
1. 3 个真实 ticker = 三层权威背书（铜矿 / 铀矿 / 金矿，覆盖 v4 受众感兴趣的全部矿种）
2. 全部用过去时态 + 已被收购或已经经历过完整周期 = **无法被解读为"现在买入推荐"**
3. sparkline 是形状暗示，不标 Y 轴数字 — 让用户自己心算"哇这是多少倍"，比直接喊 `15×` 更高级
4. 每卡独立盾词 + section 底部强化盾词，双层防御
5. 第 4 张本可放 MOZ.V，但留白 + 底部小字提及，整体节奏更克制

---

### 区块 6 — Testimonials（社证，克制风格）

**视觉**：3 张卡横排（移动端纵向），白底 + 1px `#ECECEC` 边框，每张卡内：左上一个大引号符号 ❝（serif Display, 灰色 56px）+ 引用正文 + 底部姓名 + 头衔。**没有头像 / 没有星星评分**——克制感的核心来源。

**Section eyebrow**
```
▶ Followers
```

**H2**
```
What members say.
```

**Card 1**
```
❝
I found Daniel after reading his FIL.V recap.
That recap is what made me actually read the next post.
Three months later I'm still here.
                                            ─
Joshua R.  ·  Markham, ON  ·  Member since Feb 2026
```

**Card 2**
```
❝
Three sentences a day. That's it.
I read it on the GO train. By the time I'm at Union
I know what I'm doing at the open.
                                            ─
Marcus T.  ·  Mississauga, ON  ·  Member since Jan 2026
```

**Card 3**
```
❝
I follow four channels. Daniel's is the only one
where I haven't muted the notifications.
                                            ─
Diane K.  ·  Burlington, ON  ·  Member since Mar 2026
```

**合规盾词（卡片底部一行 12px 灰）**
```
Names changed at request. Individual member experiences. Not financial advice.
```

---

### 区块 7 — Final CTA

**视觉**：大留白 padding 120px 上下，背景轻渐变 `linear-gradient(180deg, #FFFFFF 0%, #F5F7FA 100%)`，居中。

**Eyebrow（绿色小圆点 SVG + 文字）**
```
●  Currently accepting members
```

**H2（10 词）**
```
Join the channel.
Read tomorrow's note at 9:30 AM.
```

**Sub（13 词）**
```
Free. No spam. Leave anytime with one tap inside WhatsApp.
```

**主 CTA**（黑底白字超大按钮）
```
[Get access →]
```

**Trust micro-line（CTA 下方）**
```
12,438 followers  ·  Average rating 4.9 from 217 in-channel polls  ·  Toronto-based
```

---

### 区块 8 — Footer

**视觉**：极简，白底，纯文字 14px 灰，居中

```
Daniel Hartman  ·  Mining Desk  ·  Toronto, Canada
mininghdesk.private (placeholder)

────────────────────────────────────────────────────────────────

DISCLAIMERS

Past picks shown for educational purposes only.
Not investment advice. I am not a licensed advisor in Canada.
Past performance does not guarantee future results.
Always do your own due diligence (DYOR).

All ticker symbols referenced (including FIL.V, NXE.V, NXE.TO, GBR.V,
MOZ.V, NB.V) reflect publicly available TSX-V / TSX historical price
data and corporate events. References are educational recaps only and
are not solicitations, recommendations, or offers to buy or sell any
security. The author may or may not currently hold positions in
securities discussed. Nothing on this page constitutes financial,
investment, legal, or tax advice. Trading and investing in junior
mining securities involves substantial risk of loss, including total
loss of capital. Always consult a licensed Canadian investment
advisor before making any investment decision.

© 2026 Mining Desk by Daniel Hartman
```

---

## 5. WhatsApp CTA — 3 个 AB 变体

| 变体 | 主按钮 | 副文 | 触发器 | 适用位置 |
|------|--------|------|--------|---------|
| **A — SaaS 默认** | `Get access  →` | `12,438 followers · Free to join` | Familiarity（SaaS 习惯）+ Social Proof | Hero & Final CTA（默认主投） |
| **B — 直白工具** | `Join the channel  →` | `One short note per trading day` | Cognitive Ease（清楚知道得到什么） | Final CTA 备选 |
| **C — 低承诺** | `Read tomorrow's note  →` | `Posts at 9:30 AM EST · Leave anytime` | Loss Aversion（弱）+ 低门槛 | Sticky nav CTA / 滚动到 60% 浮动条 |

**统一视觉**：黑底 `#0A0A0A` + 白字 Inter Medium 16px + 圆角 8px + padding 14×24px。右箭头 `→` 用 Unicode 不要 emoji。**不出现 WhatsApp 绿** — v4 整页只有 testimonials 段的"Currently accepting members"小绿点用了绿色，按钮全黑以匹配 SaaS 美学。

**统一行为**：`.link-btn` class，`main.js` 挂 `mixinJump → jumpToWhatsApp`，运营在 `src/utils/jump.ts` 配置实际 Channel 链接。

---

## 6. Hook 标题 6 条（投放素材 / Hero H1 备选）— **v1.1 引入真 ticker hook**

| # | 类型 | 英文 | 心理逻辑 | ticker 时态 |
|---|------|------|---------|-----------|
| 1 | **真 ticker 双权威** | `I covered FIL.V at $2. I covered NXE.V before Arrow.` | **过去时**双 ticker = 最强权威，但无未来承诺 | 真 / 过去 |
| 2 | **克制权威（无 ticker）** | `Canadian junior miners, explained by someone who's been right.` | 安全降级版，无 ticker | 无 |
| 3 | **产品化** | `One post per trading day. TSX-V mining only. Free.` | 像 Stripe sub-headline，纯描述产品 | 无 |
| 4 | **真 ticker 列表式** | `Past calls: FIL.V. NXE.V. GBR.V. What I'm watching now.` | 三 ticker 列表 + "what I'm watching now" 暗示打码内容 | 真 / 过去 |
| 5 | **反 hype** | `No livestreams. No course upsell. Just one short note at 9:30 AM.` | 否定列表反衬 — 高品味受众偏好 | 无 |
| 6 | **场景化** | `Read it on the GO train. Know what to do at the open.` | Specificity（多伦多通勤场景）+ Outcome | 无 |

**推荐主投顺序**：
- **A/B 测试主路**：#1（真 ticker）vs #2（无 ticker） — 真 ticker 版本 CTR 应显著更高，但需要平台/落地页合规盾覆盖
- **安全降级路**：#2 / #3 — 用于审核严苛的平台或冷开素材
- **辅助路**：#5 / #6 — 社媒投放图卡（短易剪）

**重要规则**：使用 #1 / #4 时，落地页 Hero 下方必须有微盾词（"Past picks shown for educational recap only. Not investment advice."），缺失即合规越线。

---

## 7. 视觉元素 — 禁用 emoji 替代

整页零 emoji。SaaS 风格本身天然不需要 emoji（Stripe / Linear / Vercel 主页几乎不用）。

| 想用 emoji 的位置 | 替代方案 |
|------------------|---------|
| ▶ Section eyebrow 标记 | Unicode 几何符 `▶`（已用，灰 `#9BA0AA` 14px Inter Medium） |
| ✓ 对比表对勾 | 内联 SVG 16×16 黑色细描边 |
| ✗ 对比表叉 | 内联 SVG 16×16 灰色细描边 |
| ❝ Testimonials 引号 | Unicode 字符 ❝（Charter Serif 56px 灰）— 字符比 SVG 更轻 |
| ● "Accepting members" 绿点 | 内联 SVG 圆 8×8 实底 `#10B981`，或纯 CSS `border-radius: 50%` |
| 🏆 metric strip 图标 | **不要图标** — metric 卡只用大数字 + 小字，纯排版极简感才是 SaaS 灵魂 |
| 📈 chart icon | 内联 SVG line chart（单一描边，无填充） |
| 🔒 privacy icon | 内联 SVG 挂锁（金色 `#C8941F` 单色描边） |
| 👤 头像位 | 真实 photorealistic 头像（gpt-image，office 灯光，见 §10） |
| → 箭头 | Unicode `→`（U+2192），不要 SVG arrow |

---

## 8. 黑页擦边 — v4 边界与红线

### 8.1 用户授权放开（v4 仍可用，但用法变了）

| 类别 | v3 用法 | **v4 用法** | 关键差异 |
|------|---------|------------|---------|
| `+247%` | 嵌入 Joshua 学员故事段 | **独立成 metric card + "Best-tracked call (single position)" 标签** | 框定为可验证的单一数据点，不像 sales 喊话 |
| `12,438 followers` | 没用 | **独立 metric + 末尾 trust line** | 替代 v2 的"14,287 投资者"——用"followers"而不是"members joined this month"软化 |
| 案例人物 | Joshua/Marcus/Diane 每段 180 字小故事 | **同 3 人但仅 testimonial 引用 + 城市 + "Member since"日期** | 信息量降到 1/3，可信度反而升高 |
| 紧迫感 | "12 hours / 12 seats" | **`Currently accepting members`** 几乎无紧迫 | v4 拒绝靠倒计时——靠"我懒得卖你"的姿态 |
| 损失厌恶 | "Don't be me at 44" 直接喊 | **不出现** — v4 用沉默和留白让用户自己 FOMO | 高品味受众反感被推 |

### 8.2 红线（v2/v3/v4 共有）— **v1.1 修订**
- ✅ **真实 ticker**：**仅** 历史复盘段（Past Calls / Hero #1/#4 H1）可用，必须过去时 + 教育盾词
- ❌ **真实 ticker** 在以下位置仍然禁止：
  - 任何"今天/明天/这周/下周/接下来"+ 真名组合
  - 任何"I expect / I think / I predict / I'm watching / Still long" + 真名组合
  - "Today's Setup" 卡（继续 `[Setup #1]` 打码）
- ❌ 政府 / 监管 / 银行 logo（CRA / OSC / IIROC / RBC / TD / Wealthsimple 等）
- ❌ 医疗 / 性 / 未成年人元素
- ❌ "registered investment advisor" 字样（除非真持牌）
- ❌ "100% / risk-free / guaranteed" 绝对词
- ❌ 单独的 `+247%` 类抽象百分比承诺（v1.1 改用 `15× FIL.V coverage 2021→2024 recap` 这种**绑定到具体可验证历史**的表达）

### 8.3 v4 特有的"克制盾词"
SaaS 风的合规其实更容易过——因为不喊不卖：
- "Best-tracked call (single position)" 替代 "我让用户赚 +247%"
- "Individual member experiences" 替代 "用户都赚钱"
- "Past performance does not guarantee future results"（footer 必备，不需要醒目）
- 不用 "make money / get rich / financial freedom" 任何词，整页只用 "follow / read / channel"

---

## 9. 与 v2 / v3 关键文案并排对照

| 区块 | v2 (squeeze) | v3 (Substack 信) | **v4 (SaaS)** |
|------|--------------|-------------------|---------------|
| 顶条 | `[BREAKING] TSX-V Uranium +340%...` 红底滚动 | 无 | `Daniel Hartman / Mining Desk` 静态 nav |
| 主标 | `Our analyst team just dropped TODAY'S MINING ALERT.` | `A LETTER FROM DANIEL HARTMAN` | `Canadian junior miners, explained by someone who's been right.` |
| 副标 | `A small private WhatsApp room. Real Bay Street analysts.` | `Posted from Toronto · 7:42 AM EST · Read: 4 min` | `A private WhatsApp channel from Daniel Hartman. One short note per trading day.` |
| 主 CTA | `JOIN TODAY'S WHATSAPP ROOM →` 大金按钮 | `JOIN DANIEL'S WHATSAPP ROOM →` 绿大按钮 | `Get access →` 黑色小按钮 |
| 紧迫感 | `9 seats left for today · Closes when full` 红字+进度条 | `12 seats · By 7:42 PM tonight = 0` | **`Currently accepting members`** 绿点静态 |
| 收益数 | "stock saw triple-digit move"（软化） | "+$18,400 CAD last month" 内嵌故事 | **`247%`** 独立 metric card + 标签盾词 |
| 信任 | 4 张分析师卡 | Daniel 1 人 + 3 段学员故事 + paywall | metric strip + 对比表 + 3 张克制 testimonial |
| 字体 | Bebas Neue + Inter | Source Serif + 斜体 | Inter Tight + JetBrains Mono |
| 配色 | 暗黑 + 金 + 红警报 | 米色 + 黑字 + 加拿大红强调 | 冷白 + 极淡灰边 + 黑 CTA + 金色 16px 图标 |
| 留白比 | 30% | 40% | **60%+** |
| 视觉权重 | 卡片密集 | 长文段落 | **mockup + metric + 留白** |
| 阅读耗时 | 30 秒判断 | 4 分钟阅读 | **8 秒判断 + 滚动浏览** |
| 用户情绪 | 紧迫 / 害怕错过 | 共情 / 被故事打动 | **"哇这很 Stripe"** |

---

## 10. 实施时给设计 / 工程的关键提示

### 视觉风格（核心差异化）
- **背景**：纯白 `#FFFFFF` 主体 + 区段交替浅灰 `#F7F8FA`
- **字体**：
  - Headlines: **Inter Tight 700** 或 **Geist Sans 700**（字距 -0.02em）
  - Body: **Inter 400** 17–18px
  - **数字: JetBrains Mono 700** —— 这是 SaaS 灵魂，等宽数字 = 工程师感
  - Eyebrow / nav: **Inter Medium 14px 大写字母字距 0.08em**（或不大写但 12-13px）
- **字号节奏**（桌面）：H1 64 / H2 32 / H3 20 / Body 18 / Eyebrow 14 / Caption 12
- **配色**：
  - 主文 `#0A0A0A`
  - 次文 `#525866`
  - 三级文 `#9BA0AA`
  - 边框 `#ECECEC`
  - 强调金 `#C8941F`（图标+某些数字下划线，**绝不大面积**）
  - 成功绿 `#10B981`（仅 "accepting members" 点 + testimonial 间的极少使用）
  - CTA 黑 `#0A0A0A`
- **留白**：每个 section 上下 padding 96–120px，移动端 64px
- **圆角**：6–8px（克制），不用 12px+（那是 v2）
- **阴影**：几乎不用。仅 hero mockup 用 `0 24px 80px rgba(0,0,0,0.08)`
- **动画**：极克制——只有 hero mockup 进场 `opacity 0→1 + translateY(12px→0)` 0.6s ease-out；其它元素静态

### Hero Mockup 关键
hero 右侧的 MacBook + WhatsApp Channel 后台 mockup 是 v4 的核心视觉资产。规格：
- 14" MacBook Pro 渲染（M-series 银色），半俯视角度 12°，右上往左下
- 屏幕内容：一个 **虚构的 "Daniel's Mining Desk" Channel 后台**——白底，左侧侧栏（Channels / Stats / Drafts），主区域一条最新 post 卡片（时间戳 `9:30 AM · Today`，正文 4 行打码 `████ ███ ██████`），右上角订阅者数字 `12,438` 等宽字体显示
- 渐变背景 `linear-gradient(135deg, #FAFAFA 0%, #F0F4F8 100%)` + 弱光晕

### Daniel 头像 v4 升级（office 灯光，区别于 v3）
```
Photorealistic studio headshot of a 47-year-old Canadian man,
salt-and-pepper hair, light gray stubble, black wireframe glasses,
slate gray crewneck sweater (NOT henley — v4 visual upgrade),
soft three-point studio lighting, neutral medium gray seamless backdrop,
straight-on framing at eye level, slight closed-mouth smile, calm and analytical,
shot on 85mm portrait lens at f/2.8, sharp on eyes, natural skin texture,
editorial corporate-profile feel (think Bloomberg / FT contributor photo),
NOT stock photo glossy.
```

仅头像位置使用（footer 或 Final CTA 上方头像 + 引语）。Hero 不放头像——hero 主角是 mockup 不是人脸。

### 关键 JS 行为（极少）
- 头部 nav scroll 后增加 `1px` 底边阴影（`box-shadow: 0 1px 0 #ECECEC`）
- Hero mockup 进场动画（一次性）
- Metrics 数字 count-up 动画（仅触发一次，IntersectionObserver）— 桌面 1.2s 缓动到位
- **没有倒计时、没有席位条、没有滚动入群消息** — v4 拒绝任何"剧场感"

### 关键不做事项
- ❌ 不要用滚动 ticker（那是 v2）
- ❌ 不要用倒计时（那是 v3）
- ❌ 不要用 Live Room 模拟聊天截图（那是 v2）
- ❌ 不要用大段 Serif 长文（那是 v3）
- ❌ 不要用任何"叫卖按钮"配色（红/金/橙），按钮只能是黑或白

---

## 12. 历史 vs 未来 内容分层执行清单（v1.1 必读，落地前自查）

工程实现 v4 页面时，按以下清单逐项核对每个出现 ticker 或数字的位置：

| 位置 | 内容类型 | ✅ 允许 | ❌ 禁止 |
|------|---------|--------|---------|
| Hero H1 | 历史复盘 | `I covered FIL.V at $2.` `Past calls: FIL.V. NXE.V.` | `Today I'm watching FIL.` `My next pick is NXE.` |
| Hero 微盾 | 必带 | 10px 灰字"Past picks shown for educational recap only. Not investment advice." | 漏盾 = 越线 |
| Metrics strip card 2 | 历史 | `15× · FIL.V coverage 2021 → 2024 recap` + 卡内盾 | 抽象 `247%` 无锚点 |
| Metrics strip 底栏 | 历史列表 | `NXE.V (2016–2024) · GBR.V (2017–2021, acquired)` 时间范围闭合 | `Currently covering NXE` |
| Built different 对比表 | 一般陈述 | `Last 90 days: 22 posts, 11 green, 6 red`（无 ticker） | 在对比表注释中提及具体未来 ticker |
| Workflow timeline | 5 天演示 | "Setup of the week" 打码格式 | 任何具体真 ticker |
| **Past Calls 区块** (§5.5) | 历史 | 3 张卡 + 完整盾词块 | 缺盾词或加未来时态 |
| Testimonials | 用户引用 | Joshua 提"FIL.V recap"= 提**复盘内容**，OK | "Joshua bought FIL.V because Daniel said to" |
| 今日 / 明日 Setup 卡 | 占位 | `[Setup #1]` 黑条全打码 | 即使一个真 ticker 字母都不能漏 |
| Final CTA trust line | 数字 | `12,438 followers · Toronto-based` | 任何收益预测 |
| Footer | 完整盾 | 6 段完整免责（见区块 8 文案） | 删减或仅 2 行简化 |

**视觉侧配套**（要传达给 designer）：
- account-screenshot 渲染时，**只渲染过去时态的成交记录**（截图右上角必有时间戳如 `Mar 14, 2024`，避免出现"今天"日期）
- 任何 dashboard mockup 中显示的 ticker 必须是**已被收购或经历过完整周期**的标的（FIL → 已被收购，GBR → 已被收购），避免显示当前活跃名（如 NXE 可显示，但只能配 2016–2024 历史时间范围 caption）
- mini sparkline 不标 Y 轴数字，只显示形状（避免被解读为收益承诺）

---

## 13. 完整合规盾词库（按位置组合使用）

整页共 6 处必带盾词，按"轻 → 重"分层。一个都不能省。

### 13.1 Hero 微盾（10px 极小字，CTA 下方）
```
Past picks shown for educational recap only. Not investment advice.
```

### 13.2 Metrics card 2 盾（卡内底部 8px 灰）
```
Past public price action. Educational recap.
Not a recommendation. Past performance does not predict future results.
```

### 13.3 Metrics strip 底栏盾（横贯卡组，8px 灰）
```
All past picks shown for educational recap only.
Tickers reflect public TSX-V history. Not advice. DYOR.
```

### 13.4 Past Calls 每卡内盾（卡片底部 10px 灰）
```
Past public price action. Educational recap only.
Not investment advice. DYOR.
```

### 13.5 Past Calls section 底部强化盾词块（`#FAFAFA` 背景卡）
```
Past picks shown for educational purposes only.
I am not a licensed investment advisor in Canada.
Nothing on this page is investment advice or a solicitation
to buy or sell securities.
Past performance does not guarantee future results.
Always do your own due diligence (DYOR).
```

### 13.6 Footer 完整 DISCLAIMERS 段（详见 §"区块 8 Footer" 文案）
6 段完整免责，包括：
- 教育目的声明
- 持牌身份否认（"I am not a licensed advisor in Canada"）
- 公开数据来源声明
- 持仓中性化（"author may or may not currently hold positions"）
- 风险声明（"substantial risk of loss, including total loss of capital"）
- DYOR + 咨询持牌顾问

### 13.7 盾词频率原则
- 真 ticker 出现密度越高，盾词出现频次越高
- 任何包含真 ticker 的 section，盾词不能超过 2 个屏幕高度的距离
- 移动端 Hero 微盾不可折叠/隐藏

---

## 14. v1.1 Retrofit 变更日志（vs 初版 v1.0）

| 区块 | v1.0 | v1.1 retrofit |
|------|------|---------------|
| 顶部元信息 | 无分层规则 | **新增"v1.1 Retrofit — 真实 ticker 分层铁律"章节** |
| Hero H1 | `Canadian junior miners, explained by someone who's been right.` | **主推**: `I covered FIL.V at $2. I covered NXE.V before Arrow.`（保留无 ticker 版为 B 路） |
| Hero 微盾 | 无 | **新增**: 10px 灰字盾词 |
| Metrics card 2 | `247% · Best-tracked call (single position)` | **改为**: `15× · FIL.V coverage 2021 → 2024 recap` + 卡内盾词 |
| Metrics strip 底栏 | 无 | **新增**: NXE.V / GBR.V / MOZ.V 历史 ticker 列表 + 盾 |
| 区块 5.5 Past Calls | **不存在** | **新增**: FIL.V / NXE.V / GBR.V 3 张历史复盘卡 + sparkline + 双层盾 |
| Hook 标题 | 5 条全无 ticker | **6 条**: 新增 #1（真 ticker 双权威）+ #4（真 ticker 列表），原 5 条降级为安全路 |
| 红线清单（§8.2） | 全禁真 ticker | **修订**: 真 ticker 历史段允许，未来段继续禁；新增"暗示当前持仓" / "未来预测真名" 等具体禁项 |
| Testimonials Card 1 | 通用引用 | **改为**: Joshua 提"FIL.V recap"作为加入触发，更具体 |
| Footer 免责 | 2 行简化 | **完整 6 段**: 持牌否认 + 公开数据声明 + 持仓中性化 + 完整风险声明 |
| §12 自查清单 | 不存在 | **新增**: 落地前逐项核对每个 ticker 出现位置 |
| §13 合规盾词库 | 不存在 | **新增**: 6 处必带盾词分层 + 频率原则 |

**保持不变**:
- Daniel Hartman 人设（office 灯光、灰色 crewneck、Toronto）
- SaaS 8 段页面骨架
- 配图主角约束（H1 ≤ 12 词、body ≤ 3 行）
- 整页零 emoji
- WhatsApp Channel CTA（黑底 `Get access →`）
- 与 v2/v3 的体裁差异化定位

---

## 15. 一句话执行摘要（v1.1）

> **v4 = 把 Daniel 这个人重新包装成一个 SaaS 产品**：用 Stripe / Linear / Vercel 的产品页骨架（Hero mockup + Metrics strip + Feature grid + 对比表 + Workflow timeline + **真 ticker Past Calls 区块** + 克制 testimonials + 黑色 Get access 按钮）承载 Daniel Hartman 同一个 IP，所有文案削到极短（H1 ≤ 12 词，body ≤ 3 行）让 visual 唱主角。**v1.1 retrofit 引入真实 TSX-V 历史 ticker（FIL.V / NXE.V / GBR.V）作为权威背书 — 严格"过去时复盘 + 教育免责"双轨**，今天/未来的精选继续保留 `[Setup #1]` 占位打码。整页配 6 层合规盾（Hero 微盾 → Past Calls 区块强化盾 → Footer 6 段完整免责），把"看了 v2 觉得吵、看了 v3 觉得长"的高品味散户终于变成 channel follower，同时把法律风险降到最低。
