# Ecommerce Headphones Detail Page - Design Spec

## Overview

A premium headphone product detail page in the `common` directory, styled with an Apple-like minimalist tech aesthetic. Korean language. Product images generated via Gemini.

## Location

`src/pages/common/ecommerce-headphones/index.astro`
Images: `src/pages/common/ecommerce-headphones/images/`

## Tech Stack

- **Layout**: `BaseLayout.astro`
- **Fonts**: Google Fonts — `Inter` (body) + `Outfit` (headings)
- **Colors**: Background `#FAFAFA`, Text `#111111`, Accent `#0066FF`, Dark section `#111111`
- **Styles**: Astro scoped `<style>`, responsive at 768px / 480px breakpoints
- **Images**: Generated via Gemini `gemini-image` skill, saved as PNG to `images/`

## Page Sections

### 1. Hero (Full-screen)
- White background, centered product hero image (large)
- Brand: "AURA PRO" + slogan: "소리의 본질을 경험하다"
- Price display + CTA button "지금 구매하기"
- **Gemini prompt**: "A premium wireless noise-cancelling headphone on pure white background, minimalist product photography, 45-degree front angle, soft studio lighting, clean and sharp, no text"

### 2. Active Noise Cancellation
- Left text / right image layout
- Title: "외부 소음, 완벽하게 차단"
- Key stat: -42dB noise cancellation depth
- **Gemini prompt**: "A person wearing sleek headphones in a busy city environment, surrounding noise visualized as fading ripples, minimalist style, cool blue tones, no text"

### 3. Sound Quality
- Right text / left image layout (alternating)
- Title: "40mm 커스텀 드라이버"
- Hi-Res Audio certified, 5Hz-40kHz frequency response
- **Gemini prompt**: "Headphone driver unit close-up exploded view, showing internal components, tech render style, dark background with subtle blue accent lighting, no text"

### 4. Battery Life
- Centered typography-only section
- Giant "48H" as visual focus
- Subtitle: "하루 종일, 그 이상"
- Quick charge: 10min = 3hr playback
- No image needed

### 5. Comfort
- Full-width product close-up image
- Title: "하루 종일 편안한 착용감"
- Memory foam, protein leather ear cushions
- **Gemini prompt**: "Extreme close-up of premium headphone ear cushion, showing soft memory foam texture and protein leather material, macro photography style, warm neutral tones, no text"

### 6. Specifications
- Grid card layout on light gray background `#F5F5F5`
- Cards: Driver (40mm), Frequency (5Hz-40kHz), Impedance (32Ω), Weight (250g), Bluetooth (5.3), Codec (LDAC/aptX), Battery (48h), Charging (USB-C)
- Pure text + minimal SVG icons

### 7. CTA Footer
- Dark background `#111111`
- Product image + price + purchase button
- Trust badges: "무료 배송 | 30일 반품 보장"

## Responsive Behavior

- **Desktop (>768px)**: Alternating left/right text-image layouts, 3-4 column spec grid
- **Mobile (≤768px)**: Vertical stack (image on top, text below), 2-column spec grid
- **Small mobile (≤480px)**: Single column specs, reduced padding/font sizes

## Images to Generate (4 total)

1. `hero-headphone.png` — Product hero shot
2. `noise-cancellation.png` — ANC lifestyle scene
3. `driver-unit.png` — Internal driver exploded view
4. `ear-cushion.png` — Comfort close-up
