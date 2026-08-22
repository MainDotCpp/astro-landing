# Image Prompts · CA/20260809-4.0 — Banks · Dividends · TFSA/RRSP

> 页面：`src/pages/CA/20260809-4.0/index.astro`
> 美学定位：一份被认真设计过的银行月结单 —— 近白、发丝线、等宽数字、一抹深海军蓝。
> **本页背景零图像、零纹理、零 canvas**。照片全页只出现两次，正因为稀少才有分量。
> 配色锚点：`--bg #fbfbf9` / `--card #ffffff` / `--rule #e2e5e8` / `--navy #0e2a47` / `--pos #17784b`（克制绿）
> 字体：Instrument Sans（全部结构）+ Instrument Serif 斜体（只用两处）

## 生成策略

**master + `--edit-from` 双卡片**：`card-calendar-master.png` 先出，锁定近白底 + 海军蓝 + 发丝线 + 大留白这套版式语言，`card-checklist.png` 用 `--edit-from` 继承。两张卡在页面上相隔几屏出现，必须一眼看出同源。

两张照片（`hands-morning-note` / `branch-street`）独立生成，都要求**无人脸、无任何可读品牌**。

## 重做记录

`card-checklist.png` **重做过一次**。第一版有两处缺陷：
1. 第 5 行 "What would have to break" 渲染成了字符重影的 `What would have to ibreeak`，第 1 行 `recession` 的 n 也有叠影；
2. 右下角残留了从 master 继承来的绿字 `ex-dividend date comes first` —— 那句属于派息月历卡，出现在审核清单卡上是错误信息。

第二版在 delta 里明确要求「完全删除右下角绿色注释，该区域留空」+「每个词只渲染一次，不得有重叠或重复字母」，两个问题都解决了。下面记录的是**第二版**。

---

## Prompts (verbatim)

### `card-calendar-master.png` · 1536x1024 · 派息月份卡 · **MASTER**

`--landing-template` 字段：product-theme `加拿大蓝筹派息的到账月份说明卡` / position `内容说明区配图，承载派息节奏信息` / target-user `加拿大零售投资者，关心被动收入` / core-expression `规律 / 可预期 / 机构级克制` / design-style `极简排版卡片 / 银行月结单气质 / 细发丝线；非摄影非 3D` / ratio `3:2`

```
A clean printed information card on a near-white ground hex FBFBF9, ink in deep navy hex
0E2A47, hairline rules in pale grey hex E2E5E8, one restrained green hex 17784B. Generous
whitespace. At the top left a heading in a modern grotesque reading 'When the money actually
lands'. Below it a twelve-column month strip labelled Jan through Dec in small caps, with a
solid navy dot placed under Mar, Jun, Sep and Dec, and hollow grey dots under the other eight
months. Under the strip a single hairline rule and one line of grey caption text reading
'Most Canadian blue chips pay quarterly. A handful pay monthly.' Bottom right a small green
note reading 'ex-dividend date comes first'. Typography crisp, correctly spelled, sentence
case, no gibberish. No photographs, no 3D, no gradients, no shadows, no logos, no company
names, no dollar figures, no percentages.
```

> 刻意**不放任何金额或百分比** —— 这张卡讲的是「钱什么时候到」的节奏，不是收益暗示。

### `card-checklist.png` · 1536x1024 · 审核清单卡 · `--edit-from card-calendar-master.png`

只描述 delta：

```
Same near-white card, same deep navy ink, same hairline rules, same generous whitespace.
Change the heading to read exactly 'What we check before a name goes in the group'. Replace
the month strip and its caption with five numbered checklist lines separated by hairline
rules, reading exactly: '1. Has it paid through a recession', '2. Payout ratio inside its own
history', '3. Debt cost after the last rate move', '4. Is the raise funded or borrowed', '5.
What would have to break'. Delete the green note in the bottom right corner completely,
leaving that area empty. Every word must be crisp, correctly spelled and rendered once, with
no doubled or overlapping letters.
```

### `hands-morning-note.png` · 1024x1536 · 收尾场景

`--landing-template` 字段：product-theme `每天早上在厨房桌上读晨报` / position `转化区配图，建立日常场景代入感` / target-user `加拿大零售投资者，45-65 岁` / core-expression `日常 / 安静 / 属于我的钱` / design-style `生活纪实摄影 / 清晨自然侧光；非商业图库摆拍` / ratio `2:3 竖版`

```
Vertical documentary photograph at a kitchen table on a winter morning. A pair of hands,
cropped at the forearms with no face and no full person in frame, holding a smartphone whose
screen is soft and unreadable. On the table a warm mug of coffee, a folded paper account
statement with visible ruled lines but no legible text, a pen, and a window on the left
throwing pale cold morning light across the wood grain. Ordinary Canadian home, slightly worn
table, a plant edge out of focus at the back. 50mm lens, available light only, shallow depth
of field, natural colour. Real skin texture on the hands with visible knuckles and veins, no
retouching, no perfect manicure. No faces, no logos, no brand names, no readable screen or
paper text, no stock-photo styling, no HDR, no plastic AI render.
```

> 对账单「有划线但文字不可读」是刻意的：避免出现看着像真账户又其实是编造的余额。

### `branch-street.png` · 1536x1024 · 安静照片带

`--landing-template` 字段：product-theme `加拿大主街上的老银行建筑` / position `全宽安静照片带，收尾前的呼吸` / core-expression `存在很久了 / 熬过很多周期 / 安静可靠` / design-style `建筑纪实摄影 / 冬日冷光；非渲染非插画` / ratio `3:2`

```
Wide architectural photograph of a corner bank building on a Canadian main street in winter.
Early twentieth century stone facade with tall arched windows, a granite plinth, worn steps, a
plain unmarked awning. Snow banked along the curb, a bare street tree, an empty sidewalk, flat
overcast light, a grey sky with no sun. Shot straight on from across the street with a 35mm
lens, corrected verticals, restrained cool palette of grey stone, cold white snow, muted brick.
Completely generic and unbranded: no bank name anywhere, no logos, no wordmarks, no legible
signage of any kind, no flags, no posters. No people, no HDR halos, no oversaturation, no CGI
look.
```

> **完全无品牌**是硬要求：页面正文点名了 BMO / RBC / TD / Scotiabank / CIBC 的真实派息年份，但配图绝不能出现任何一家的招牌，否则等于冒用品牌背书。

---

## 后处理

```js
const FIG_W  = 880    // 两张卡片
const BAND_W = 1000   // branch-street 全宽带
const POR_W  = 700    // hands（竖版）
```
quality 74–78。构建后四张合计约 139 KB（本页图最少、留白最多，是有意的版式选择）。
