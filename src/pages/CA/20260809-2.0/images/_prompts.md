# Image Prompts · CA/20260809-2.0 — Gold · Critical Minerals · TSX-V

> 页面：`src/pages/CA/20260809-2.0/index.astro`
> 美学定位：一份印出来的地质勘查报告 —— 暖新闻纸、衬线墨色、划线表格。
> **本页硬禁：金色渐变、金属高光、金块、宝石、暗色模式。** 讲黄金的页面反而一点金光都不能有，靠「证据感」而不是「财富感」建立可信度。
> 配色锚点：`--paper #f3eee4` / `--card #fbf8f2` / `--ink #191d21` / `--assay #9c4221`（氧化红，唯一强调色）/ `--brass #8b6b2e`（哑光，仅数字）
> 字体：Newsreader（编辑体全用）+ Archivo（表头、图注）

## 生成策略

**master + `--edit-from` 双图版**：`specimen-core-master.png` 先出，确认光线与纸面质感后，`specimen-assay.png` 用 `--edit-from` 继承，只描述 delta（≤50 词）。两张要在页面上并排出现（≥760px 两栏），风格必须锁死，独立生成必然漂移。

另外两张（`listings-map.png` / `stage-ladder.png`）是印刷图表，与静物摄影不同类，独立生成。

---

## Prompts (verbatim)

### `specimen-core-master.png` · 1536x1024 · 图版 A · **MASTER**

`--landing-template` 字段：product-theme `初级矿业勘探公司的真实工作证据` / position `内容配图，承载勘探流程说明，报告插图式` / core-expression `真实证据 / 严谨 / 不浪漫` / design-style `静物纪实摄影 / 出版物图版 / 自然北窗光；非商业图库` / ratio `3:2`

```
Overhead flat-lay still life photographed straight down on a warm kraft paper surface hex
F3EEE4. A shallow wooden drill core tray holding four lengths of grey and rust-streaked rock
core, the core split lengthwise. Beside it a printed core log sheet with a ruled grid and
handwritten depth intervals in blue pen, a yellow carpenter pencil, a folding hand lens, a
soft measuring tape, and a small numbered aluminium tag. Cool soft north-window light from
the upper left, gentle real shadows, no artificial rim light. Restrained warm palette: kraft
paper, grey rock, oxidised rust, one muted brass tag. Editorial catalogue photography, sharp
texture on the paper fibre and the rock. No gold nuggets, no shiny metal, no gemstones, no
hands, no faces, no logos, no readable brand names, no HDR, no plastic AI render.
```

### `specimen-assay.png` · 1536x1024 · 图版 B · `--edit-from specimen-core-master.png`

只描述 delta：

```
Same overhead flat-lay, same kraft surface, same north-window light. Replace the wooden core
tray with four numbered cloth sample bags, tops folded and stapled. Replace the handwritten
core log with a printed laboratory assay certificate showing a ruled results table. Keep the
pencil and hand lens.
```

### `listings-map.png` · 1536x1024 · 为什么在加拿大上市

`--landing-template` 字段：product-theme `为什么全球矿业公司在加拿大上市` / position `内容说明区配图，承载事实说明` / core-expression `事实清楚 / 印刷品质感 / 权威而不喧哗` / design-style `印刷地图 / 年鉴插页 / 双色套印；非摄影非 3D` / ratio `3:2`

```
A printed two-colour atlas plate on warm paper stock hex F3EEE4, deep ink hex 191D21 with a
single oxidised red accent hex 9C4221. A simplified engraved-style world map with thin
hatched landmasses, no country labels except a red circle over eastern Canada and another
over the west coast, joined by a thin rule to a boxed caption on the right reading 'Toronto
and Vancouver'. Below the map three ruled fact lines in a clean sans, each a short readable
English phrase: 'Listing rules built for exploration-stage companies', 'A century of mine
finance in one place', 'Disclosure standard the rest of the world copies'. A thin printed
rule frames the plate with a small plate number in the bottom right. Letterpress feel,
visible paper grain, slight ink spread. Every word sharp and correctly spelled. No
photographs, no gradients, no gold, no glossy finish, no percentage figures, no company names.
```

### `stage-ladder.png` · 1024x1536 · 生命周期梯

`--landing-template` 字段：product-theme `初级矿业公司的生命周期阶梯` / position `内容说明区竖版配图，手机端全宽` / core-expression `阶段分明 / 风险坦白 / 印刷严谨` / design-style `印刷图表 / 技术手册插图 / 双色套印；非摄影非 3D` / ratio `2:3 竖版`

```
A tall printed diagram on warm paper stock hex F3EEE4, deep ink hex 191D21 with one oxidised
red accent hex 9C4221. Six rungs of a vertical ladder drawn as ruled horizontal bars, bottom
to top, each labelled in a clean sans with a short italic serif note beneath: 'Grassroots - a
geologist likes the rock', 'Discovery - the first hole hits', 'Resource - enough drilling to
put a number on it', 'Feasibility - does the arithmetic survive', 'Permit - the slow years',
'Build - capital arrives or it does not'. A red bracket down the left side spans the bottom
three rungs with the printed note 'most Venture listings sit here'. Letterpress texture,
visible paper grain, thin registration marks in the corners. Every word crisp and correctly
spelled. No photographs, no gold, no gradients, no glow, no fake figures, no company names.
```

> 左侧红括号框住最下三级 + 「most Venture listings sit here」是这张图的**论点**所在：不是展示矿业有多美好，是坦白说绝大多数标的停在最低三级。与页面的 "The honest part" 一节互为支撑。

---

## 后处理

```js
const FIG_W = 880     // listings-map
const PLATE_W = 720   // 两张 specimen（并排图版）
const POR_W = 760     // stage-ladder（竖版）
await getImage({ src, format: 'webp', width: …, quality: 76~78 })
```
高度手算：`Math.round(W * src.height / src.width)`。构建后四张合计约 168 KB。
