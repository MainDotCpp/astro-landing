# Image Prompts · CA/20260524-1.0 v2 (Editorial Financial Briefing)

> Design spec: `/Users/yy/2_Areas/astro-landing/docs/superpowers/specs/2026-05-24-ca-mining-v2-design.md`
> Style anchors: 报纸米黄 #F4EFE6 / 钢墨蓝 #15212F / 印章红 #A91D2A / WhatsApp 绿 CTA。**零金色 · 零矿坑摄影 · 自然真实人脸 · 避免塑料 AI 感**。

## Assets shipped (NOT AI-generated)

### `logo.svg`
Hand-written SVG. "TSX-V INSIDER" in IBM Plex Serif 600 deep ink + steel-blue mono subline "EDITORIAL DESK · TORONTO". Left red stripe acts as editorial stamp accent. No AI image generation — fonts and color tokens come from the design spec directly so they stay perfectly crisp and on-brand.

### `stamp-members-only.svg`
Per design spec §6.4, inlined inside `index.astro` at implementation time. Not produced as a standalone file.

### `hero-bg.jpg`
Design spec §11 marks this as **optional** and recommends skipping ("CSS 网格 + 颗粒已足够"). Skipped to keep the page light and avoid any photograph that could leak the old v1 "mining-pit dark gold" aesthetic into v2.

---

## AI-generated assets

### Strategy: master + edit-from variants
Per `gpt-image` skill, multi-variant series must use one master → image-edit derivatives to keep style locked. Two pools, two masters:

- **Analyst pool (3 portraits, 1024×1024 → resized 400×400)**
  - Master: `analyst-1-master.png` (Daniel Whelan)
  - Variants via `--edit-from`: `analyst-2.jpg` (Margaret Okafor), `analyst-3.jpg` (Hiroshi Tanaka)
- **Testimonial pool (4 portraits, 1024×1024 → resized 200×200)**
  - Master: `testi-1-master.png` (Robert M. · Calgary)
  - Variants via `--edit-from`: `testi-2.jpg` (Linda P. · Vancouver), `testi-3.jpg` (Don K. · Toronto), `testi-4.jpg` (Susan H. · Edmonton)

Analyst pool: editorial newsroom / boardroom lighting, half-body, FT/WSJ portrait language.
Testimonial pool: candid smartphone-style outdoor/home portraits, NOT stock, NOT studio.

### og-share.png (1536×1024)
Newspaper front-page mockup. Paper beige #F4EFE6 with TSX-V INSIDER masthead, editorial serif headline with yellow-highlighter on "SEE", -12° MEMBERS ONLY red rubber stamp, mono ticker strip bottom. FT Alphaville × Bloomberg printout vibe. Zero gold, zero photos, typographic only.

---

## Prompts (verbatim)

### analyst-1-master.png · Daniel Whelan (LEAD ANALYST)
```
Editorial corporate headshot photograph of Daniel Whelan, a 52-year-old white
Canadian male senior mining analyst. Half-body portrait, slight three-quarter
angle, neutral natural expression (not smiling broadly, confident but reserved).
Wearing a charcoal grey wool suit jacket over a navy blue dress shirt, no tie.
Salt-and-pepper short hair, clean-shaven, weathered intelligent face with
crow's feet. Background: softly blurred Toronto editorial office, dark wood
bookshelves and a window with cold north light behind him, depth of field
f/2.8. Lighting: soft north window light from camera left, gentle fill, cool
blue-grey color temperature 5200K, subtle Rembrandt triangle on left cheek.
Photographic style: shot on Hasselblad H6D with 100mm portrait lens, editorial
reportage photography for Financial Times or Wall Street Journal. Skin texture
realistic with visible pores, natural asymmetry, real pupils with catch
lights, anatomically correct ears, no plastic AI render, no airbrush, no
over-smoothing. Color palette muted: steel blue, charcoal, paper beige. Square
1:1 crop, face centered upper third, headroom above.
```

### analyst-2.jpg · Margaret Okafor (SENIOR EDITOR) — edit from analyst-1
```
Same exact framing, lens, lighting setup, color palette, and editorial newsroom
background as the base image. Replace the subject with Margaret Okafor, a
45-year-old Black Canadian woman of Nigerian heritage, senior business editor.
Short natural hair, no glasses, calm intelligent expression. Wearing a beige
camel wool blazer over a cream silk blouse. Same north-window cool light and
shallow-DOF background, same FT/WSJ portrait language, same realistic skin
texture rules.
```

### analyst-3.jpg · Hiroshi Tanaka (DATA DESK) — edit from analyst-1
```
Same exact framing, lens, lighting, color palette, and editorial-office shallow
depth-of-field as the base image. Replace the subject with Hiroshi Tanaka, a
42-year-old Japanese-Canadian man, data analyst. Wearing thin-frame steel
eyeglasses, dark navy crewneck merino sweater over a light grey oxford shirt
collar. Background should now show out-of-focus warm-glowing data terminal
screens with faint green and white ticker text instead of bookshelves. Keep
the same north-window soft light, same realistic skin texture rules.
```

### testi-1-master.png · Robert M. · Calgary, AB
```
Authentic candid smartphone-style portrait of Robert M., a 58-year-old white
Canadian rancher / blue collar man from Calgary Alberta. Square crop, head
and upper chest. Weathered tanned face, deep wrinkles around eyes, grey
stubble, slight squint from outdoor work, faint genuine half-smile (not posed).
Wearing a worn navy Carhartt work jacket over a red plaid flannel shirt
collar. Short grey hair, slightly windblown. Background: out-of-focus blue
Ford F-150 pickup truck and Alberta foothills, golden hour late afternoon
light, depth of field shallow. Lighting: warm low-angle sunset light from
camera right at 4500K, natural skin highlights. Photo style: looks like a
Facebook profile picture or testimonial photo taken by family member with
iPhone, not stock photography, not Instagram-filtered. Slight imperfect
framing, natural color, no beauty filter, no studio look. Skin: realistic
pores, natural redness on cheeks/nose, asymmetric features, real human
pupils with sun catchlight, anatomically perfect ears. Avoid plastic AI
render, avoid commercial stock photo polish, avoid symmetrical perfect face.
```

### testi-2.jpg · Linda P. · Vancouver, BC — edit from testi-1
```
Same candid smartphone-style framing, same natural-light unfiltered Facebook-
photo feel as the base image. Replace subject with Linda P., a 55-year-old
white Canadian woman from Vancouver, retired schoolteacher. Shoulder-length
greying brown hair, reading glasses pushed up on her head, warm half-smile.
Wearing a teal fleece zip-up over a cream turtleneck. Background changes to
an out-of-focus Vancouver waterfront with grey overcast sky and faint mountains.
Cooler 5500K daylight from camera left. Keep all skin-realism rules and the
unposed-iPhone-snapshot vibe.
```

### testi-3.jpg · Don K. · Toronto, ON — edit from testi-1
```
Same candid smartphone-portrait language, unposed and natural. Replace subject
with Don K., a 60-year-old white-Italian Canadian retired electrician from
Toronto. Round face, bald with grey side hair, neat grey moustache, reading
glasses, mild closed-mouth smile. Wearing a black quarter-zip pullover. Background
changes to an out-of-focus suburban Toronto kitchen, warm tungsten 3200K
indoor light from camera right, faint window blinds visible. Keep skin
realism, asymmetry, no stock-photo polish.
```

### testi-4.jpg · Susan H. · Edmonton, AB — edit from testi-1
```
Same candid smartphone-portrait approach. Replace subject with Susan H., a
52-year-old white Canadian woman from Edmonton, former accountant. Short
strawberry-blonde bob, light freckles, gentle warm smile with visible
laugh lines. Wearing a soft burgundy cardigan over a white tee. Background
changes to an out-of-focus home living room with a beige sofa and a window
showing late-afternoon prairie light, warm 4000K. Keep iPhone-snapshot
honesty, real skin texture, no AI-smooth.
```

### og-share.png (1536×1024)
```
Newspaper front page mockup design for 'TSX-V INSIDER' financial briefing
publication. Wide landscape composition 1536x1024. Background: aged newsprint
paper texture, off-white #F4EFE6 paper beige, subtle vertical column rules in
steel grey, faint fold crease down middle, very light grain. Top masthead:
large editorial serif logotype 'TSX-V INSIDER' centered in deep navy blue ink
#15212F, IBM Plex Serif 700 weight feel, with a thin steel-blue horizontal
rule below, underneath in mono caps:
'CANADIAN MINING INTELLIGENCE · ISSUE №247 · MAY 24 2026'.
Below masthead: a bold editorial serif headline reading 'THE CANADIAN MINERS
WALL STREET DOESN'T WANT YOU TO SEE' in deep navy ink, with the word 'SEE'
highlighted by a translucent yellow #FFE066 highlighter brush stroke behind it.
Bottom right: a circular red rubber-stamp graphic angled -12 degrees with the
text 'MEMBERS ONLY' visible, color #A91D2A. Bottom strip: a thin row of
monospace ticker text 'TSX-V:URA +18.4%  CCJ +6.1%  NXE +12.3%' in deep navy.
Faint coffee ring stain bottom-left corner for authenticity. Overall vibe:
Financial Times Alphaville meets Bloomberg terminal printout, restrained
editorial typography, zero gold colors, zero photographs, only typographic
composition on paper. Print-quality detail, sharp letterforms, no AI artifacts
in text, no gibberish letters, every visible word readable.
```

---

## Post-processing pipeline

After AI generation:
1. **analysts**: resize 1024×1024 → 400×400 JPEG q90 with Pillow LANCZOS.
2. **testimonials**: resize 1024×1024 → 200×200 JPEG q88 with Pillow LANCZOS.
3. **og-share**: keep as 1536×1024 PNG (Open Graph spec accepts).
4. Delete `*-master.png` after variants and resizing are done — they were only scaffolding.

If any subject comes back with classic AI tells (extra fingers, melted ears, plastic skin), regenerate that single tile with the same prompt + `-q high` and a fresh seed. Do not ship a "plastic person" — the design spec explicitly warns against it.
