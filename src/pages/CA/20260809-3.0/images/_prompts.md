# Image Prompts · CA/20260809-3.0 — Energy · Alberta

> 页面：`src/pages/CA/20260809-3.0/index.astro`
> 美学定位：一篇基础设施纪实摄影专题 —— 大图、压缩标题字、沥青色与麦色。**照片本身就是版式**。
> 配色锚点：`--night #16130f` / `--soil #241d16` / `--rust #c2532a` / `--wheat #e0b872` / `--text #f2ece2`
> 字体：Anton（仅 H1、引文、大数字）+ Inter Tight（其余全部）

## 生成策略

5 张全部独立文生图。本页有 3 张实景摄影（hero / 管堆场 / 控制室）+ 1 张城市竖拍 + 1 张工程蓝图，属于不同类型，不需要 master 锁定。一致性靠**统一的配色词表**达成：每条摄影 prompt 都点名 `wheat gold / rust orange / bitumen brown / cold slate blue` 这组色，所以出图天然同调。

摄影类统一否定约束：`no people, no logos, no readable brand names, no HDR halos, no oversaturation, no CGI look`。控制室那张额外要求**不见脸、屏幕内容不可读**。

---

## Prompts (verbatim)

### `hero-prairie-dusk.png` · 1536x1024 · hero CSS 背景

`--landing-template` 字段：product-theme `加拿大能源股与派息研究社群` / position `首屏 Hero 背景氛围图，底部叠深色渐变罩压标题` / target-user `加拿大零售投资者，尤其阿尔伯塔与草原三省` / core-expression `本土 / 实体资产 / 沉稳耐久` / design-style `纪实风景摄影 / 大画幅编辑摄影；非 3D 非插画` / ratio `适合网页首屏横幅，下三分之一留暗区放标题`

```
Wide documentary landscape photograph at dusk in the Alberta foothills. A cleared pipeline
right of way runs from the lower left into the middle distance, a straight corridor of cut
grass through rolling wheat-coloured prairie, a single yellow marker post beside it. Far
behind, the low blue silhouette of the Rocky Mountain front range. Sky is a deep rust and
amber sunset fading to slate at the top, high cirrus, real haze. Late golden light raking
across the grass from camera right. Shot on a 40mm lens from a low fence line, large-format
editorial quality. Palette: wheat gold, rust orange, bitumen brown, cold slate blue. Bottom
third of the frame should be darker and simple for headline text. No people, no vehicles, no
logos, no signage text, no HDR halos, no oversaturation, no CGI look.
```

### `pipe-yard.png` · 1536x1024 · 全宽照片带

`--landing-template` 字段：product-theme `管道与中游基础设施的实体感` / position `全宽照片带，配下方说明文字` / core-expression `重资产 / 枯燥而可靠 / 真实存在` / design-style `工业纪实摄影 / 冷暖对比自然光；非渲染` / ratio `3:2`

```
Industrial documentary photograph of a pipe storage yard in winter. Stacked large-diameter
steel pipe sections in long rows receding to the right, coated dark and stencilled with plain
mill markings, ends catching low sun. Patchy dry snow on gravel between the stacks, deep blue
shadow on the shaded side against warm low sunlight on the tops. A distant chain-link fence
and a flat prairie horizon. 35mm lens, eye level, natural light only, cold clear air.
Palette: gunmetal, rust, dry snow white, cold blue shadow, warm low sun. No people, no
company logos, no readable brand names, no crane, no HDR, no oversaturation, no CGI.
```

### `flow-to-payout.png` · 1536x1024 · 资金链条（承载核心论证）

`--landing-template` 字段：product-theme `从井口到季度派息的资金链条说明图` / position `价值说明区配图，承载核心论证` / core-expression `链条清晰 / 收费而非赌价格 / 可验证` / design-style `工程蓝图 / 技术示意图 / 单色套印；非摄影非 3D` / ratio `3:2`

```
A technical schematic drawn in the style of an engineering drawing on a dark bitumen-brown
ground hex 241D16, lines and type in warm wheat hex E0B872 with one rust accent hex C2532A.
Six labelled stages connected left to right by a single thick flow line with small arrowheads,
each stage a simple line-drawn icon above a readable English label: 'Wellhead', 'Gathering
system', 'Mainline', 'Export terminal', 'Contracted toll', 'Quarterly distribution'. The last
two stages are picked out in rust. Under the flow line a thin annotation reads 'the toll is
charged on volume, not on price'. A drawing-frame border with a small title block in the
lower right reading 'Flow of funds - simplified'. Crisp draughting linework, every word sharp
and correctly spelled. No photographs, no 3D, no gradients, no glow, no dollar figures, no
company names, no logos.
```

> 末两级用锈色挑出、注解写 `the toll is charged on volume, not on price` —— 这张图就是整页论点的图解：过路费不是押价格。

### `calgary-dusk.png` · 1024x1536 · 城市锚点

`--landing-template` 字段：product-theme `卡尔加里作为加拿大能源资本中心` / position `情境配图，竖版，手机端全宽` / core-expression `本土锚点 / 清晨开工 / 真实城市` / design-style `城市纪实摄影 / 蓝调时刻自然光；非渲染非插画` / ratio `2:3 竖版`

```
Vertical street-level photograph of downtown Calgary at blue hour on a cold winter morning.
Looking up a plowed avenue toward a cluster of glass office towers, warm office lights on in
scattered floors, breath-fog cold air, a thin band of pale orange dawn between two towers at
the top. Bare street trees, snow ridged along the curb, headlights of two cars streaking low
in the frame. 28mm lens, tripod-steady, available light only, deep blue shadow against warm
interior glow. No legible signage, no corporate logos, no brand names on the buildings, no
faces, no HDR halos, no oversaturation, no CGI look.
```

### `control-room.png` · 1536x1024 · 全宽照片带

`--landing-template` 字段：product-theme `管道调度控制室，枯燥但可靠的基建` / position `全宽照片带，下方接引言` / core-expression `有人 24 小时在盯 / 系统性 / 不性感但赚钱` / design-style `工业纪实摄影 / 屏幕光为主光源；非渲染` / ratio `3:2`

```
Documentary photograph inside a pipeline control room, shot from behind two seated operators
so no faces are visible, both in plain dark work shirts. In front of them a curved wall of
large screens showing abstract schematic flow diagrams, coloured line networks and simple
valve symbols only, deliberately soft and non-legible, no numbers or text readable. Desk
surfaces with a keyboard, a phone handset, a paper log binder and a travel mug. Cool screen
light is the main source, one warm overhead pool of light at the back. Palette: cold
cyan-grey screen glow, warm amber lamp, bitumen dark walls. 35mm, available light, real depth
of field. No faces, no company logos, no readable text or figures on the screens, no
stock-photo staging, no HDR, no CGI.
```

> 屏幕内容**刻意不可读**：真实控制室画面本就不该在广告里被读出具体数值，虚化同时规避了「一眼假的演示数据」。

---

## 后处理

```js
const HERO_W = 1100   // hero 背景
const BAND_W = 1000   // 两条全宽照片带
const FIG_W  = 880    // flow-to-payout
const POR_W  = 760    // calgary（竖版）
```
quality 72–78。构建后五张合计约 252 KB。
