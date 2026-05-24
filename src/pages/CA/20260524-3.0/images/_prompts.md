# v4 Image Prompts · CA/20260524-3.0 (SaaS Light · Stripe调)

> Design spec: `/docs/superpowers/specs/2026-05-24-ca-kol-v4-design.md` (Light retrofit v2)
> Copy spec:   `/docs/superpowers/specs/2026-05-24-ca-kol-v4-copy.md` (v1.1 real-ticker)
> 路线: 纯白 #FFFFFF + Inter Tight + JetBrains Mono + 黑底 CTA · 完全脱离 v2/v3 调

---

## Single Source of Truth (人设)

| Slot     | 姓名 / 描述                                    | 文件                  |
|----------|----------------------------------------------|----------------------|
| Author   | Daniel Hartman, 47, 多伦多 Mining-Sector Analyst | author-portrait.jpg  |
| Story 1  | Joshua, 53, Markham 退休 tradesman           | story-1.jpg (复用 v3) |
| Story 2  | Marcus, 47, Mississauga 物流经理              | story-2.jpg (复用 v3) |
| Story 3  | Diane, 58, 安省寡妇                          | story-3.jpg (复用 v3 testi-2) |

---

## Asset Manifest

| 文件 | 尺寸 | 大小 | 方法 | 来源 |
|------|------|------|------|------|
| `hero-mockup.png`          | 1920×1080  | 1.95 MB | HTML+Playwright 1× MacBook+WhatsApp Channel UI | `_mockup/hero.html` |
| `account-screenshot-v4.png`| 1600×900   | 243 KB  | HTML+Playwright 1× Light theme 真 ticker portfolio | `_mockup/account.html` |
| `author-portrait.jpg`      | 1200×1200  | 189 KB  | gpt-image 1024×1536 → top-crop 1024×1024 → LANCZOS 1200 q90 | gpt-image-2 |
| `story-1.jpg`              | 800×800    | 174 KB  | 复用 v3 (Joshua) | v3 `/CA/20260524-2.0/images/story-1.jpg` |
| `story-2.jpg`              | 800×800    | 90 KB   | 复用 v3 (Marcus) | v3 |
| `story-3.jpg`              | 400×400    | 29 KB   | 复用 v3 (Diane, 实际 v2 testi-2 Linda) | v2/v3 |

---

## gpt-image Prompts (verbatim, 用于复刻)

### author-portrait.jpg · Daniel Hartman v4 (office 85mm corporate-profile)

```
Editorial corporate headshot of Daniel Hartman, a 47-year-old white Canadian
male, mining-sector financial analyst. Square crop, head and upper chest.
Looking directly at camera, calm neutral expression, faint controlled smile,
confident but reserved. Wearing thin-frame black square glasses, light salt
and pepper hair, short trimmed grey-and-white stubble. Wearing a slate dark
grey wool crewneck sweater over a thin white tee collar visible. Background:
seamless neutral medium grey paper backdrop, slightly textured, no
distractions. Studio lighting: large soft octabox key light from camera left
at 45 degrees, soft fill from right, subtle hair light, color temperature
5400K, no harsh shadows. Photographic style: shot on Hasselblad H6D 100mm at
f/4, editorial corporate-profile portraiture for Bloomberg / Financial Times
analyst feature page, sharp but flattering. Skin texture realistic with
visible pores, fine lines around eyes, asymmetric features, real pupils with
soft catch lights. No plastic AI render, no over-smoothing, no airbrush, no
glamour filter. Color palette muted: charcoal, slate, neutral grey, off-white.
85mm-equivalent frontal portrait composition, eyes at upper-third, headroom above.
```

Post-processing (Pillow):
- Top-crop 1024×1536 → 1024×1024 (保留头+肩，砍掉底部 artifact)
- LANCZOS 1024 → 1200
- JPEG q90 progressive

---

## HTML Mockup Sources

### hero.html → hero-mockup.png
- Page bg: light 渐变 `linear-gradient(135deg, #FAFAFA → #F0F4F8)` + 两个 radial overlay
- MacBook bezel 半俯视 perspective transform
- 屏内 UI 仿 WhatsApp Channel 后台:
  - Left sidebar: Today's note (active) / Channel feed / Coverage notes / Drafts / Settings / Channel settings
  - Main: 3 posts with Daniel Hartman avatar
    - Post 1: "The market scan · TSX-V mining juniors" (4 行 blacked text)
    - Post 2: "Week recap: what was wrong, what worked" (3 行 blacked)
    - Post 3: **"How I covered FIL.V at $2 in 2021 — recap"** (真 ticker, 过去时态 ✓)
  - Right: 14h 23m · Next post in / Stats (Posts 22 / Green 11 / Red 6 / Flat 5 / Avg read time 3:42) / 12-month coverage value sparkline (上涨)
- 4 个浮卡 (outside MacBook):
  - 左上: "12,438 Today + 14 / 8:42 AM EST"
  - 右上: "14h 23m next note in · 8:42 AM EST" + "3 days streak posting"
  - 左下: "9:30 AM EST" 时间戳
- 黑条遮 ticker (除 FIL.V 真名外，其他 inner post 内容是黑条)

### account.html → account-screenshot-v4.png
- 1600×900 纯白 (#FFFFFF)
- Top nav: "DH · MINING DESK" 黑底白字 logo + Past picks/Watchlist/Notes/Channel
- 大字 "$58,420.16 ▲ +247.13% +$41,589.74 MAY 2025—MAY 2026"
- 12-month tracked coverage chart (绿色平滑上涨 + +247% 标注)
- **右侧 Past Picks · Public Record (真 TSX-V ticker)**:
  - FIL.V +1,418%  · Filo Mining · Cu · 2021 → 2024 acq.
  - NXE.TO +612%   · NexGen Energy · U · 2016 → 2024
  - GBR.V +340%    · Great Bear Res · Au · 2018 → 2021 acq.
  - MOZ.V +128%    · Marathon Gold · Au · 2019 → 2023
  - NB.V  −24%     · NioCorp · Nb · 2022 → 2023  ← **故意保留一个红色亏损，增强真实感**
- 右下角合规盾词: "Past picks shown for educational reference. Not investment advice..."
- 底部 footer 强化盾: "SIMULATED REFERENCE · NOT REAL ACCOUNT · PAST PICKS · NOT INVESTMENT ADVICE"

---

## Sparkline Path Data (for designer to inline in §5.5 Past Calls cards)

每张 PastCallCard 96×40 viewBox sparkline，颜色 `stroke="#16A34A"` (FIL/NXE) 或 `stroke="#0A0A0A"` (GBR, 已被收购无需绿)。
建议在 designer §5.5 内联使用，无需额外资产文件。

### FIL.V — 2021 $2 → 2024 ~$30 acq. (大涨 + 几次小回撤)
```html
<svg viewBox="0 0 96 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 32 L8 30 L14 28 L20 30 L26 25 L32 26 L38 22 L44 23 L50 18 L56 19 L62 14 L68 11 L74 12 L80 7 L86 4 L92 2"
        stroke="#16A34A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="92" cy="2" r="2" fill="#16A34A"/>
</svg>
```

### NXE.TO — 2016 $0.20 → 2024 $11 (多次回撤后突破)
```html
<svg viewBox="0 0 96 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 36 L10 34 L18 32 L26 35 L34 30 L42 32 L50 22 L58 26 L66 16 L74 18 L82 9 L92 5"
        stroke="#16A34A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="92" cy="5" r="2" fill="#16A34A"/>
</svg>
```

### GBR.V — 2018 $0.50 → 2021 收购于 $1.8B (V 字反转后被收购，中性灰已封盘)
```html
<svg viewBox="0 0 96 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 28 L10 32 L18 34 L26 33 L34 28 L42 22 L50 18 L58 12 L66 8 L74 6 L82 5 L92 5"
        stroke="#0A0A0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="92" cy="5" r="2" fill="#0A0A0A"/>
  <text x="50" y="42" font-family="JetBrains Mono" font-size="6" fill="#9CA3AF" letter-spacing="0.05em">ACQUIRED</text>
</svg>
```

**Y 轴不标数字** (合规策略 §12 - 避免"具体数字 = 收益承诺"风险)，只展示形状。

---

## Reuse Notes

- v3 author-portrait.jpg (condo 50mm henley documentary) **不能复用** —— v4 是 studio 85mm crewneck corporate profile，调性完全不同
- v3 story 头像池 **零成本复用** (Joshua/Marcus/Diane → 同名同人设)
- 任何未来 v5+ retrofit 时:
  - 改 ticker 数字 → 改 account.html sidebar 数字 + 重 shoot
  - 改 hero post 内容 → 改 hero.html post 文本 + 重 shoot
  - 一行命令: `cd _mockup && python3 shoot.py` 重生两张 PNG
