# Image Prompts · CA/20260524-2.0 v3 (Substack Personal Letter)

> Design spec: `/Users/yy/2_Areas/astro-landing/docs/superpowers/specs/2026-05-24-ca-daytrade-v3-design.md`
> Copy spec:   `/Users/yy/2_Areas/astro-landing/docs/superpowers/specs/2026-05-24-ca-daytrade-v3-copy.md`
> Style anchors: white #FFFFFF / charcoal ink #1A1A1F / marker yellow #FFE3B7 / alert orange #FF4828 / WhatsApp green CTA. **No gold. No editorial FT/WSJ polish (that was v2). Author shot is candid documentary, not commissioned editorial. Testimonials are Facebook-iPhone-snapshot.**

## Single source of truth for character details

Per team-lead arbitration: **copy spec wins** on names/ages/cities/occupations. Design spec §11 only contributed crop ratio metrics. Final character data used for image generation:

| Role            | Name           | Age | City                | Profession                |
| --------------- | -------------- | --- | ------------------- | ------------------------- |
| Author          | Daniel Hartman | 47  | Toronto (condo)     | Former Bay Street trader  |
| story-1         | Joshua         | 53  | Markham, ON         | Retired tradesman         |
| story-2         | Marcus         | 47  | Mississauga, ON     | Logistics manager         |
| story-3 (reuse) | Diane          | 58  | Burlington, ON      | Recently widowed retiree  |

---

## Asset roster

| File                       | Final size  | Method                                       | Status     |
| -------------------------- | ----------- | -------------------------------------------- | ---------- |
| `author-portrait.jpg`      | 1200×1200   | gpt-image new master @ 1024×1536 → square crop top → upscale 1200 LANCZOS q92 | regenerated |
| `story-1.jpg` (Joshua)     | 800×800     | gpt-image new master @ 1024×1024 → LANCZOS 800 q88 | regenerated |
| `story-2.jpg` (Marcus)     | 800×800     | `--edit-from story-1-master.png` @ 1024×1024 → LANCZOS 800 q88 | edit-from variant |
| `story-3.jpg` (Diane)      | 400×400     | Direct copy of `v2/testi-2.jpg` (Linda) — visual match for Diane spec | reused from v2 |
| `account-screenshot.png`   | 1600×900    | HTML+Playwright screenshot (`_mockup/account.html` → `shoot.py`) | composed, not AI |
| `letterhead-stamp.svg`     | inline      | NOT produced — designer inlines per spec §6.10 | n/a |

---

## Why these strategy choices

### Why author was NOT reused from v2 analyst-1
v2 Daniel Whelan (52 / no glasses / no stubble / grey suit / CN Tower bookshelf / Hasselblad FT editorial) shares **only the first name** with v3 Daniel Hartman (47 / black wireframe glasses / 3-day stubble / navy henley / Toronto condo with concrete column / 50mm prime candid documentary). Five differentials = unrecoverable via edit-from. Master regen was mandatory.

### Why account-screenshot is HTML+screenshot, NOT gpt-image
1. Spec §13 requires PnL numbers be **inside the image**, not HTML text (anti-crawler compliance) — so precise legibility of `$58,420.16 / +247.13% / +$41,589.74 / May 22 +$4,820.50 …` is non-negotiable; gpt-image still occasionally renders long digit strings as gibberish.
2. The equity curve must tell a specific story (start ~$30k → V-reversal dip to $22k → climb with 3 visible red drawdowns → blow-off to $58k); gpt-image cannot be directed to specific chart shapes.
3. Brokerage UI (top bar / nav tabs / price summary / sidebar trade history) is trivial in HTML/CSS and matches Interactive Brokers / Wealthsimple Trade / Questrade conventions at ~90% fidelity in 30 minutes.
4. The mockup is auditable — every pixel is in `_mockup/account.html` instead of a black-box generation.

The `_mockup/` directory has a leading underscore so Astro file-based routing **does not pick it up as a page**. Files are kept (not deleted) so regeneration is trivial if numbers/dates change.

### Why story-3 was reused
v2 `testi-2.jpg` (Linda P., 55, Vancouver, retired schoolteacher, waterfront overcast, knit cardigan, calm intelligent expression) is a near-perfect visual match for v3 Diane (58, Burlington widow). City difference is invisible at 400×400 round crop; the "thoughtful older woman in muted outdoor light" silhouette carries.

---

## AI prompts — verbatim

### `author-portrait-master.png` · Daniel Hartman, 47, Toronto condo

```
Photorealistic candid documentary headshot photograph of Daniel Hartman, a
47-year-old white Canadian man, former Bay Street prop-desk trader now running
a small private trading room. Half-body close portrait, slight three-quarter
angle, head occupies approximately 70 percent of the frame vertically, eyes
positioned at 38 percent from the top, face centered horizontally. Salt-and-
pepper short hair slightly tousled, light grey 3-day stubble (not full beard),
black wireframe rectangular eyeglasses, calm intelligent expression with the
faintest closed-mouth half-smile (not posing, not grinning). Wearing a plain
dark navy blue cotton henley shirt with the top button undone, no tie no
blazer. Background: Toronto downtown condo interior softly blurred, a raw
concrete column on left, a tall walnut bookshelf with technical finance books
on right, a sliver of warm window light spilling in from camera right at
golden hour 4400K. Lighting: soft natural window light from camera right,
gentle shadow on left cheek, no studio flash, no Rembrandt triangle, looks
like a friend took it. Photographic style: shot on a 50mm prime lens at f/1.8
on a full-frame mirrorless, shallow depth of field, candid documentary feel,
like a Substack author about-page photo or Bulletin newsletter creator
portrait, NOT FT/WSJ commissioned editorial, NOT corporate stock, NOT
LinkedIn glossy. Realistic skin texture with visible pores, faint forehead
lines, natural asymmetry, anatomically correct ears, real human pupils with
soft window catchlight in each eye. Avoid plastic AI render, avoid airbrush,
avoid over-smoothing, avoid symmetrical perfect face. Color palette muted:
navy, charcoal, warm wood, soft window cream. 1024x1536 portrait orientation,
face in upper third with comfortable headroom above.
```

Size: `1024x1536` portrait, `-q high -r 5`. Got it on attempt 1 (~127s).

### `story-1-master.png` · Joshua, 53, Markham ON, retired tradesman

```
Authentic candid smartphone-style portrait photograph of Joshua, a 53-year-
old white Canadian man, retired tradesman from Markham Ontario (Toronto
suburb commuter belt). Square 1:1 framing, head and upper chest, head
occupies approximately 75 percent of frame vertically, eyes at 38 percent
from top, face centered slightly right of center to look natural in round
crop. Weathered tanned face, deep crow's feet from years of outdoor work,
short grey-brown hair receding slightly at temples, clean-shaven, natural
relaxed expression with faint genuine half-smile (not posed, not grinning),
looking just slightly off-camera. Wearing a charcoal grey zip-up fleece over
a faded blue work tee, no logos. Background: out-of-focus suburban Ontario
driveway, hint of a dark grey Toyota RAV4 SUV behind him, autumn-bare maple
tree branches, overcast soft daylight. Lighting: flat diffuse overcast 5500K
daylight, no harsh shadows, the kind of light when someone takes your photo
on their phone in the front yard. Photo style: looks exactly like a Facebook
profile picture or family iPhone snapshot, NOT studio, NOT stock photo, NOT
Instagram-filtered. Slightly imperfect framing, natural color, no beauty
filter. Realistic skin texture with visible pores, natural redness on cheeks
and nose, faint sun damage spots, asymmetric features, real human pupils.
Avoid plastic AI render, avoid commercial stock polish, avoid symmetrical
perfect face, avoid Carhartt western cowboy look.
```

Size: `1024x1024`, `-q high -r 8` (1024×1024 known 504-prone, retry budget high). Got it on attempt 1 (~57s).

Note: the explicit "avoid Carhartt western cowboy look" negative prompt is there because the v2 testimonial pool over-indexed on that aesthetic and we needed a clear visual fence away from it for the Markham suburban context.

### `story-2.jpg` · Marcus, 47, Mississauga ON, logistics manager — `--edit-from story-1-master.png`

```
Same candid smartphone-style framing, same overcast natural daylight
unfiltered Facebook-photo feel as the base image. Replace the subject with
Marcus, a 47-year-old white Canadian man, logistics warehouse manager from
Mississauga Ontario. Darker brown hair short and combed, no receding, very
faint shadow stubble, slightly slimmer face than the previous subject, mild
closed-mouth smile, looking nearly direct at camera. Wearing a black quarter-
zip pullover over a light grey crew tee collar. Background changes to an
out-of-focus suburban Mississauga home garage interior with hint of grey
concrete floor and warm garage tube light overhead at 4000K. Keep all
skin-realism rules: natural pores, asymmetry, anatomically correct ears,
real pupils, no plastic AI render, no stock-photo polish.
```

Edit-mode prompt deliberately under ~80 words. The base image carries lighting/composition/realism rules; only face/hair/clothing/background change. **Background change is moderate (suburban driveway → suburban garage), not extreme** — heeding the lesson from v2 where analyst-3's bookshelf→data-terminals swap was an over-aggressive edit.

---

## Post-processing pipeline

After AI generation:

1. **author-portrait**: 1024×1536 portrait → crop top 1024×1024 (face is in upper third per prompt) → LANCZOS upscale to 1200×1200 → JPEG q92. The upscale is modest (1.17×) and visually clean given the source quality.
2. **story-1**: 1024×1024 → LANCZOS 800×800 → JPEG q88.
3. **story-2**: 1024×1024 (jpg from edit endpoint) → LANCZOS 800×800 → JPEG q88.
4. **story-3**: 400×400 direct copy of v2 testi-2.jpg, no transformation.
5. **account-screenshot**: Playwright `device_scale_factor=2` produces 3200×1800 PNG → LANCZOS down to 1600×900 → PNG optimize=True for crisp final.
6. Master scaffolding files (`*-master.png`) deleted after derivatives are saved.

If any subject regresses to classic AI tells (extra fingers, melted ears, plastic skin), regenerate the single offending tile with `-q high` and a fresh request — do not ship a "plastic person" (the design spec explicitly warns against it).

---

## `_mockup/` artifact handling

- `_mockup/account.html` — the source of `account-screenshot.png`. Pure HTML+CSS, no JS. **Keep this file** — it's the regeneration source whenever numbers, dates, or curve shape need updating.
- `_mockup/shoot.py` — Playwright wrapper. Renders at 1600×900 viewport, `device_scale_factor=2`, then resize step downsamples to spec 1600×900 final.
- Leading underscore `_mockup/` ensures Astro file-based routing **skips this directory** (verified Astro convention).

To regenerate the screenshot after any tweak:
```bash
python3 src/pages/CA/20260524-2.0/_mockup/shoot.py
# then run the LANCZOS resize step (see post-processing #5) to get final 1600×900
```
