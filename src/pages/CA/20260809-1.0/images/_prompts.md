# Image Prompts · CA/20260809-1.0 — AI / Space Micro-Caps

> 页面：`src/pages/CA/20260809-1.0/index.astro`
> 美学定位：夜班地面站控制室 —— 冷静、纪实、仪器感。**不是赛博朋克，零霓虹，零 3D 渲染**。
> 配色锚点：`--void #05070c` / `--panel #0b1119` / `--ice #6fb4ff`（唯一强调色）/ `--text #e6ebf2`
> 字体：Space Grotesk（正文与标题）+ IBM Plex Mono（日期行、数据、图注）

## 生成策略

5 张全部独立文生图，**没有用 `--edit-from`**。理由：这 5 张分属三种截然不同的类型（实景摄影 / 技术示意图 / 产品实拍），彼此不需要风格锁定，共同的一致性靠配色与构图约束达成，不靠 master 继承。

统一否定约束（每条 prompt 末尾都带）：`no logos, no readable brand names, no CGI look, no HDR, no oversaturation`。摄影类另加 `no stock-photo polish, no faces`；图表类另加 `no photographs, no 3D, no glassmorphism, no glow, no fake numbers, no company names`。

## 重做记录

`funnel-screen.png` **重做过一次**。第一版用 `--landing-template` 出的是横版（1536x1024），有两个问题：
1. 模板往左侧塞了一个 SaaS 风格的营销块（"OUR SCREENING PROCESS" 标题 + 三条带图标的要点），属于项目规范里禁止的「粗体小标题 + 说明」样式；
2. 每级漏斗下带小字说明，导致文字过密，在 375px 手机视口下实测完全读不清 —— 图承载不了内容就等于纯装饰。

第二版改为**竖版 1024x1536 + 不用 `--landing-template` + 只保留五个大字标签**，手机端可读性合格。下面记录的是**第二版**（当前在用）。

---

## Prompts (verbatim)

### `hero-groundstation.png` · 1536x1024 · hero CSS 背景

`--landing-template` 字段：
- product-theme: `Canadian small-cap AI and space infrastructure research group`
- position: `首屏 Hero 背景氛围图，上面会叠深色渐变罩并压标题文字`
- target-user: `加拿大零售投资者，35-60 岁，手机浏览`
- core-expression: `真实存在的基础设施 / 冷静克制 / 被忽视的一层`
- design-style: `纪实摄影 / 编辑纪实 / 自然光；非 UI、非 3D、非霓虹赛博`
- ratio: `适合网页首屏横幅，主体偏右下，左上留大片暗区放标题`

```
Blue-hour documentary photograph of a satellite ground station at the edge of the
Canadian prairie. Three or four white parabolic dish antennas of different sizes, each
pointed at a different angle. A low prefab control building with warm yellow light in two
windows. Chain-link fence, patchy late spring snow on brown grass, bare aspen treeline far
behind, deep indigo sky with one last cold orange band on the horizon. 35mm lens, ground
level, real atmospheric haze. Muted cold palette, indigo and steel grey with a single warm
window glow. Left third and top third must stay dark and empty for headline text. No
people, no logos, no signage text, no lens flare, no neon, no sci-fi rendering, no
holograms, no CGI look, no oversaturation.
```

### `funnel-screen.png` · 1024x1536 · 筛选流程（承载内容）

**不用 `--landing-template`**，纯 prompt：

```
A tall vertical diagram on a near-black background hex 0B1119, thin ice-blue hairlines hex
6FB4FF. A funnel that narrows from top to bottom in five clearly separated horizontal
stages, the widest bar at the top and a small bar at the bottom. Each stage is a plain
horizontal bar with ONE short label inside it in large clean sans-serif white type, big
enough to read on a phone. From top to bottom the five labels read exactly: 'Every TSX and
TSX Venture listing', 'Liquidity floor', 'Revenue or a signed contract', 'Insider ownership
above zero', 'Shortlist we actually read'. Small dot patterns beside the upper bars suggest
many companies thinning out toward the bottom. At the very bottom, one small monospace line
in grey reading 'Screen rebuilt every Monday'. Nothing else at all: no side panel, no
marketing bullet points, no icon list, no headline block, no explanatory paragraphs under
the bars, no percentages, no numbers, no tickers, no company names, no logos. Flat
technical drawing, no photographs, no 3D, no glassmorphism, no glow, no gradients. Every
word sharp and correctly spelled.
```

### `buildout-stack.png` · 1024x1536 · 分层结构（承载内容）

`--landing-template` 字段：product-theme `AI 与航天基建的分层结构说明图` / position `价值说明区配图，竖版，手机端全宽` / core-expression `结构清晰 / 层层依赖 / 瓶颈在下层` / design-style `深色技术示意图 / 剖面结构图 / 极简线条；非摄影非 3D` / ratio `2:3 竖版`

```
A tall dark cross-section diagram on near-black hex 05070C, five stacked horizontal layers
separated by thin ice-blue hairlines hex 6FB4FF, read from top to bottom. Layer labels in
clean sans caps with a one-line grey monospace explanation under each: 'MODEL TRAINING -
what everyone reads about', 'COMPUTE - the chips, already priced', 'OPTICAL LINKS - how
racks talk to each other', 'POWER AND COOLING - the physical limit', 'GROUND AND LAUNCH -
the part nobody counts'. The bottom two layers are drawn slightly brighter to mark them as
the pressure point, with a small ice-blue arrow and the caption 'pressure sits here'. Every
word sharp and correctly spelled. No photographs, no 3D renders, no glassmorphism, no glow
effects, no fake numbers, no company names.
```

### `desk-3am.png` · 1536x1024 · 盘前流程

`--landing-template` 字段：product-theme `研究团队的清晨工作场景` / position `价值说明区配图，展示真实工作流程` / core-expression `有人在做功课 / 不摆拍 / 克制专业` / design-style `纪实摄影 / 自然光 + 屏幕光；非商业图库摆拍` / ratio `3:2`

```
Documentary photograph of a working research desk before dawn. Only a pair of forearms and
hands visible at the keyboard, subject cropped out above the wrists, no face, no full
person. Three monitors angled toward the viewer, the screens deliberately soft and out of
focus so no chart, ticker or number is legible. A spiral notebook open with dense
handwriting, a chipped mug of black coffee, a desk lamp with a warm bulb, a window on the
left showing a cold blue winter dawn over a low Canadian city skyline. Shallow depth of
field, 50mm, available light only, mixed 3000K lamp and 7000K window. Real desk clutter,
cable slack, a coffee ring on the wood. No stock-photo polish, no faces, no logos, no
readable screen text, no plastic AI look.
```

> 屏幕**刻意虚焦不可读**是有意为之：避免出现看着像真行情又其实是编造的数据（项目规范禁止「一眼假」的演示数据）。

### `note-thread.png` · 1024x1536 · 收尾（预期管理）

`--landing-template` 字段：product-theme `每日晨报在手机上的实际样子` / position `转化区配图，让用户预期即将收到什么` / core-expression `具体可预期 / 简短克制 / 真实感` / design-style `产品实拍 / 手持手机特写；非 3D 渲染非 mockup 模板` / ratio `2:3 竖版`

```
Close photograph of a hand holding a modern smartphone, portrait orientation, shot slightly
from above at a kitchen counter in cold morning light. The screen shows a plain green-bubble
messaging thread, generic messenger interface with no brand mark and no app name. Three
short readable message bubbles in English, in order: 'Morning. Three things before the
open.', 'Optical component supplier out of Ottawa filed an updated contract disclosure last
night, reading it now.', 'Launch window slipped again. That matters more for the ground
segment than for the launcher.' A grey timestamp under the last bubble. Text must be crisp,
correctly spelled, sentence case, no gibberish. No percentages, no stock tickers, no price
figures, no profit claims, no company logos, no app store branding, no faces.
```

> 消息内容刻意**不含任何百分比、代码或收益承诺** —— 这张图是用来管理预期（「你会收到什么」），不是用来暗示回报的。

---

## 后处理

源 PNG 保留在本目录（1.3–2.0 MB）。页面不直接引用源文件，一律经 `astro:assets` 的 `getImage()` 压成 WebP：

```js
const HERO_W = 1100
const hero = await getImage({ src: heroSrc, format: 'webp', width: HERO_W, quality: 72 })

const FIG_W = 880   // 横图
const POR_W = 760   // 竖图（funnel / buildout / note）
```

`getImage()` 不返回 intrinsic height，高度手算以保住 `width`/`height` 配对、避免 CLS：

```js
const funnelH = Math.round(POR_W * funnelSrc.height / funnelSrc.width)
```
