# Image Prompts · CA/20260809-5.0 — Canadian Power Infrastructure

> 页面：`src/pages/CA/20260809-5.0/index.astro`
> 姊妹页：`src/pages/CA/20260809-2.0/`（矿业版）。美学骨架完全相同，主题换成加拿大电力基础设施。
> 美学定位：一份印出来的工程 / 监管文件 —— 暖新闻纸、衬线墨色、划线表格、letterpress 质感。
> **本页硬禁：闪电符号、电火花、发光、霓虹、蓝色科技感、渐变、金属高光、暗色模式、3D 渲染、图库摆拍感、假数据、公司名 / logo、拼错的单词。**
> 配色锚点：纸 `#F3EEE4` / 卡 `#FBF8F2` / 墨 `#191D21` / 唯一强调色 **氧化铜绿 `#1E6A5B`** / 哑光铜 `#8B6B2E`（仅用于数字）
> ⚠️ 姊妹页强调色是氧化红 `#9C4221`，本页**必须**是铜绿，不能用红 —— 生成时红 / 橙印章反复出现，是最需要盯的一处漂移。

## 生成策略

原计划 **master + `--edit-from` 双图版**：`ppa-master.png` 先出锁死纸面与光线，`queue-plate.png` 以 `--edit-from` 继承、只描述 delta。

**实测结论：本页两张静物不能走 `--edit-from`。** 编辑端点每次都会把密集印刷文字重绘成乱码 ——

- `queue-plate` 三次 `--edit-from` 尝试，表头分别糊成 `INTERCONNECTION QUEIE` / `INTRCHURACTOSI QUIE` / `INTRCONNECTION QUUIE`，变电站照片糊成一团；
- `ppa-master` 后期改加拿大当事方时又试了一次 `--edit-from`，整份合同正文糊掉（`MEEPHILLS POWER CORP.`、`SCOFLDS OF ILECTRICAL ENERGY`、`TERMMATION`）。

改为**两张都用 text-to-image**，在 prompt 里逐条复述纸面 / 光线 / 道具（kraft 平铺俯拍、左上北窗光、蓝色自动铅笔、哑光黄铜计算器、木折尺、编号铝牌），文字全部干净，风格靠道具与光线描述对齐。**后续如需再改这两张，也不要用 `--edit-from`，直接改 text-to-image prompt 重出。**

另两张（`grid-map.png` / `power-ladder.png`）是印刷图表，与静物不同类，独立 text-to-image 生成。

---

## Prompts (verbatim)

### `grid-map.png` · 1536x1024 · 加拿大电网图版

```
A printed two-colour atlas plate on warm paper stock hex F3EEE4, deep ink hex 191D21 with a
single oxidised copper-green accent hex 1E6A5B. A simplified engraved-style map of Canada with
thin hatched landmasses and no city labels, except three copper-green circles over southern
Ontario, southern Alberta and southern Quebec, each joined by a thin rule to a boxed caption on
the right reading 'Ontario', 'Alberta', 'Quebec'. Thin engraved transmission-line symbols run
between the circles. Below the map three ruled fact lines in a clean sans, each a short readable
English phrase: 'Demand forecast up 65% by 2050', 'Data centres queued for gigawatts of load',
'The wires are not built yet'. A thin printed rule frames the plate with a small plate number in
the bottom right. Letterpress feel, visible paper grain, slight ink spread. Every word sharp and
correctly spelled. No photographs, no gradients, no glow, no lightning bolts, no company names,
no logos.
```

一次过。三行 fact lines 拼写全对，铜绿圆点 + 输电塔符号到位，右下 `PLATE 27`。

### `ppa-master.png` · 1536x1024 · 图版 A（PPA 合同 + 单线图）

原始 prompt（美学基准，保留备查）：

```
Overhead flat-lay still life photographed straight down on a warm kraft paper surface hex
F3EEE4. A printed multi-page power purchase agreement with a ruled signature block and a stapled
corner, partly covering a folded single-line electrical schematic drawing printed in blueprint
blue. Beside them a mechanical pencil, a small matte brass-cased calculator, a folding wooden
ruler, and a numbered aluminium equipment tag. Cool soft north-window light from the upper left,
gentle real shadows, no artificial rim light. Restrained warm palette: kraft paper, blueprint
blue, deep ink, one muted copper-green inspection stamp on the agreement. Editorial catalogue
photography, sharp texture on the paper fibre. No hands, no faces, no logos, no readable brand
names, no lightning bolts, no HDR, no plastic AI render.
```

原始 prompt 的三个坑，最终交付版已逐一修掉：

1. **画幅** —— 只给 `-s 1536x1024` 会出竖版，必须在 prompt 里补一句 `Wide horizontal landscape 3:2 composition, objects arranged across the full width of the frame.`
2. **地域不符** —— 模型默认编美国当事方（`RIVERDALE ENERGY, LLC, a Delaware limited liability company` / `Portland, OR 97201` / `State of Franklin`），图签栏还是美式 `MM/DD/YYYY`。页面讲的是安省 IESO、艾伯塔 AESO，必须显式写死加拿大当事方与 ISO 日期。
3. **印章颜色** —— 放任不管会出橙红圆形质检章（撞姊妹页的氧化红），且日期早于页面叙述的 2026 年。改成方形 `EXECUTED AUG 2026`。

**最终交付 prompt**（text-to-image，非 `--edit-from`）：

```
Overhead flat-lay still life photographed straight down on a pale warm kraft paper surface hex
F3EEE4, the surface light and evenly lit, sandy beige rather than dark brown. A printed
multi-page power purchase agreement with a stapled corner, headed 'POWER PURCHASE AGREEMENT',
its opening recital naming two Canadian parties: 'KEEPHILLS POWER CORP., a corporation
incorporated under the laws of Alberta, with offices at 200 - 5 Avenue SW, Calgary, Alberta T2P
3H5 ("Seller")' and 'PARKLAND DATA CENTRES LTD., a corporation incorporated under the laws of
Alberta, with offices at 1100 - 4 Street SW, Calgary, Alberta T2R 1M1 ("Buyer")', followed by
numbered generic clauses about the sale and purchase of electrical energy, a ruled signature
block whose lines are blank and labelled only 'SELLER' and 'BUYER', and a plain rectangular
stamp near the foot reading 'EXECUTED AUG 2026'. It partly covers a folded single-line
electrical schematic drawing printed in blueprint blue with generic equipment labels and a title
block dated '2026-08-04'. Beside them a slim blue mechanical pencil, a small matte brass-cased
calculator, a folding wooden ruler, and a numbered aluminium equipment tag. Cool soft
north-window light from the upper left, gentle real shadows, no artificial rim light. Restrained
warm palette: pale kraft paper, blueprint blue, deep ink. Editorial catalogue photography, sharp
texture on the paper fibre. Wide horizontal landscape 3:2 composition, objects arranged across
the full width of the frame. Every printed word crisp and correctly spelled, Canadian place
names and postal codes exactly as given. No logos, no readable brand names, no hands, no faces,
no lightning bolts, no HDR, no plastic AI render.
```

交付版实际渲染：当事方两家艾伯塔公司、邮编 `T2P 3H5` / `T2R 1M1` 间隔正确，第 8 条 Governing Law 写 `laws of the Province of Alberta and the applicable laws of Canada`，图签栏 `DATE: 2026-08-04` / `SCALE: N.T.S.`，方形 `EXECUTED AUG 2026`（蓝墨），`MOTOR CONTROL CENTRE` 用英式拼写。

### `queue-plate.png` · 1536x1024 · 图版 B（并网排队表 + 变电站照片）

原始 delta prompt（`--edit-from ppa-master.png`，**已废弃：三次全部乱码**）：

```
Same overhead flat-lay, same kraft surface, same north-window light. Replace the power purchase
agreement with a printed interconnection queue table, wide ruled rows of project entries with
megawatt figures handwritten in blue pen in the margin. Replace the folded schematic with a
small printed photograph of a substation switchyard, its corners tucked under. Keep the pencil
and the folding ruler.
```

**最终交付 prompt**（text-to-image，把 master 的纸面 / 光线 / 道具全部复述一遍以锁风格）：

```
Overhead flat-lay still life photographed straight down on a warm kraft paper surface hex
F3EEE4. A printed interconnection queue table headed 'INTERCONNECTION QUEUE', with four wide
ruled columns and eight rows of project entries, each row a short plausible project name and a
capacity figure in large sharp type, and megawatt figures handwritten in blue pen in the right
margin. It partly covers a small printed photograph of a substation switchyard with steel
lattice structures, the photograph's corners tucked under. Beside them a mechanical pencil, a
small matte brass-cased calculator, a folding wooden ruler, and a numbered aluminium equipment
tag. Cool soft north-window light from the upper left, gentle real shadows, no artificial rim
light. Restrained warm palette: kraft paper, deep ink, blue pen, one muted copper-green stamp.
Editorial catalogue photography, sharp texture on the paper fibre. Wide horizontal landscape 3:2
composition, objects arranged across the full width of the frame. Every printed word crisp,
legible and correctly spelled. No hands, no faces, no logos, no readable brand names, no
lightning bolts, no HDR, no plastic AI render.
```

关键是 **`four wide ruled columns and eight rows` + `large sharp type`**：不限行列数就会画十几行密集小字并糊成乱码。交付版表头 `QUEUE POSITION / PROJECT NAME / REQUESTED CAPACITY (MW) / QUEUE DATE` 干净，右侧蓝笔手写实测 MW（`250 → 248 MW`）是这张图的细节说服力所在。

### `power-ladder.png` · 1024x1536 · 电力价值链梯（竖版）

```
A tall printed diagram on warm paper stock hex F3EEE4, deep ink hex 191D21 with one oxidised
copper-green accent hex 1E6A5B. Five rungs of a vertical ladder drawn as ruled horizontal bars,
bottom to top, each labelled in a clean sans with a short italic serif note beneath: 'Small
infrastructure - outside the index', 'Renewable developer - projects still to build',
'Independent producer - sells power under contract', 'Transmission - paid to move it',
'Regulated utility - the rate base pays'. A copper-green bracket down the left side spans the
bottom two rungs with the printed note 'no index has to buy these'. Letterpress texture, visible
paper grain, thin registration marks in the corners. Every word crisp and correctly spelled. No
photographs, no gradients, no glow, no lightning bolts, no fake figures, no company names.
```

> 左侧铜绿括号框住最下两级 + 「no index has to buy these」是这张图的**论点**：被动指数基金没有义务买这两级，所以定价里没有它们。与页面对应章节互为支撑。

**两次「改进」尝试都更差，最终用的是第一版原始 prompt，不要再改：**

- 加 `All label text sits fully inside the two vertical ladder rails` → 梯子**上下颠倒**（Regulated utility 掉到最底、括号框住了受监管公用与输电），论点直接反了。
- 改成逐级点名 `The lowest rung is labelled ... the topmost rung ...` → 顺序对了，但每一级下面都多印一个斜体 `none` 垃圾词。

原始版唯一瑕疵：三条较长的标签（`Independent producer` / `Renewable developer` / `Small infrastructure`）末端轻微压到右侧竖杆。可读性不受影响，判断为可接受，优先保住正确的顺序与括号位置。

---

## 后处理

```js
const FIG_W = 880     // grid-map        → 880x587
const PLATE_W = 720   // ppa-master / queue-plate（并排图版） → 720x480
const POR_W = 760     // power-ladder（竖版） → 760x1140
await getImage({ src, format: 'webp', width: …, quality: 76~78 })
```

高度手算：`Math.round(W * src.height / src.width)`。

## 已知偏差（交付时的取舍）

1. **两张静物纸面不同色温**：`ppa-master` 的 kraft 比 `queue-plate` 浅约 45（右下角 `#D2C4B4` vs `#988772`）。姊妹页那一对是 `#C3B39D` / `#C3B299`，几乎完全一致，本页没做到。曾出过一版暖 kraft（`#82613E`，比 queue-plate 更深且偏橙），但它无视了指定的当事方名（自编 `NORTHFIELD ENERGY INC.` / 多伦多地址 `1234 Harbour Street`，`1234` 一眼假），左上角还有一道人工光斑，因此弃用。并排出现时若觉得纸色跳，优先重出 `ppa-master` 的 text-to-image prompt 微调 kraft 描述，不要动 `queue-plate`。
2. **`ppa-master` 的印章是蓝墨方章**，不是铜绿 —— 全页强调色只在 `grid-map` 与 `power-ladder` 上。放任模型自选时它一律给橙红圆章（撞姊妹页配色），蓝章与图纸蓝一致，判断为更小的恶。
3. `ppa-master` 上有自编公司名（`KEEPHILLS POWER CORP.` / `PARKLAND DATA CENTRES LTD.`），与本页「硬禁公司名」相冲，是为了修掉更严重的「美国当事方出现在加拿大页面」而做的取舍。`KEEPHILLS` 与 TransAlta 真实电厂同名，若担心被读成真实实体，换成一个不指向任何真实资产的名字重出即可。

---

## 追加修订 · `ppa-master.png` 第二次重做（当事方去真实化 + 纸色对齐）

**为什么重做**：上一版把当事方写成 `KEEPHILLS POWER CORP.` / `PARKLAND DATA CENTRES LTD.`，而页面正文讲的正是 TransAlta 在 **Keephills（Parkland County）** 的那笔真实交易 —— 读者放大后会把这张生成图误读成那份真实合同的照片，等于伪造真实交易文件。当事方必须指向不存在的实体与不存在的资产。同时上一版纸面 `#DED4C9`（亮度 212）比 `queue-plate.png` 的 `#B4A794`（亮度 165）亮 47，两图在 ≥760px 并排时色调明显不同。

**做法**：不用 `--edit-from`（三次尝试都把合同正文搞成乱码，同一失败模式也毁掉过三次 `queue-plate` 编辑），改为 text-to-image，把当事方段落与 kraft 纸 hex 逐字烧进 prompt。

- Seller → `MERIDIAN POWER CORP.`，Alberta 注册，`300 - 8 Avenue SW, Calgary, Alberta T2P 1C5`
- Buyer → `NORTHBRIDGE DATA CENTRES LTD.`，Alberta 注册，`700 - 2 Street SW, Calgary, Alberta T2P 2M5`
- 纸面指定 `hex A89478`（mid-tone tan kraft，明确排除 pale cream 与 orange）

**结果实测**：纸面中位 `#A98D6B`（亮度 139），与基准差 26（上一版差 47），同一 kraft 家族；九条款、`Governing Law` 的 "laws of the Province of Alberta and the applicable laws of Canada"、`SELLER`/`BUYER` 签署线、矩形 `EXECUTED AUG 2026` 蓝章全部清晰正确；单线图为 text-to-image 重画（UTILITY SOURCE → MAIN DISCONNECT → TRANSFORMER → MAIN SWITCHBOARD → FEEDER 1–5，标注 HVAC / LIGHTING / POWER / IT LOAD / SPARE），图签栏 `E-100 / 2026-08-04 / N.T.S. / REV 0`。

**已知偏差**：本张光线偏正、构图正交，`queue-plate` 是斜射光斜放；两张仍属同系列不同照片，可接受。印章为蓝墨而非铜绿 —— 无约束时模型反复给橙红圆章（姊妹页的强调色，正是要避免的漂移），蓝墨与蓝图一致，铜绿只保留在 `grid-map` 与 `power-ladder` 上。
