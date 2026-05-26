# IT Breaking News Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a new Italian campaign landing page (`20260518-5.0`) with newspaper "breaking news" visual style, using loss aversion / urgency psychology around inflation eroding purchasing power.

**Architecture:** Single static `.astro` file under `src/pages/IT/Gianluca Paolucci/20260518-5.0/`. Reuses `BaseLayout.astro` (with `lang="it"`) and `ITComplianceFooter.astro`. No `getStaticPaths` needed — one version only. All CSS is scoped via `<style is:global>` in the head fragment. Animations are CSS-only (typewriter) + lightweight inline JS (countup, reveal).

**Tech Stack:** Astro 5, Google Fonts (Lora, Source Sans 3, JetBrains Mono), CSS animations, inline JS

**Spec:** `docs/superpowers/specs/2026-05-18-it-breaking-news-lp-design.md`

---

### Task 1: Scaffold file with frontmatter, layout wrapper, and CSS foundation

**Files:**
- Create: `src/pages/IT/Gianluca Paolucci/20260518-5.0/index.astro`

- [ ] **Step 1: Create directory**

```bash
mkdir -p "src/pages/IT/Gianluca Paolucci/20260518-5.0"
```

- [ ] **Step 2: Write the file scaffold**

Create `src/pages/IT/Gianluca Paolucci/20260518-5.0/index.astro` with this content:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro'
import ITComplianceFooter from '@/pages/IT/components/ITComplianceFooter.astro'
import paolucciAvatar from '../20260517-1.0/images/paolucci.png'

const BRAND = {
  nome: 'Bussola Mercati',
  payoff: 'Osservatorio indipendente sui mercati italiani',
}

const PERSONA = {
  nome: 'Gianluca Paolucci',
  titolo: 'Analista indipendente dei mercati finanziari italiani',
  avatar: paolucciAvatar.src,
}

const title = 'Bussola Mercati — I tuoi risparmi perdono valore ogni giorno'
const description = 'L\'inflazione erode il potere d\'acquisto dei tuoi risparmi. Scopri cosa sta succedendo sui mercati italiani e ricevi analisi gratuite su WhatsApp.'
---

<BaseLayout title={title} description={description} lang="it">
  <Fragment slot="head">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Lora:ital,wght@0,400;0,700;1,700&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet" />

    <style is:global>
      *, *::before, *::after { box-sizing: border-box; }

      :root {
        --bg: #FFFFFF;
        --ink: #1A1A1A;
        --ink-soft: #6B6B6B;
        --rosso: #B71C1C;
        --rule: #1A1A1A;
        --rule-light: #E0E0E0;
        --wa-green: #25D366;
        --max-w: 720px;
      }

      body {
        background: var(--bg);
        color: var(--ink);
        font-family: 'Source Sans 3', sans-serif;
        margin: 0;
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
      }

      h1, h2, h3, .serif {
        font-family: 'Lora', serif;
      }

      .mono {
        font-family: 'JetBrains Mono', monospace;
      }

      .bn-container {
        max-width: var(--max-w);
        margin: 0 auto;
        padding: 0 1.5rem;
      }

      .reveal {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      .reveal.active {
        opacity: 1;
        transform: translateY(0);
      }
    </style>
  </Fragment>

  <!-- sections will go here -->

  <ITComplianceFooter brand={BRAND} />
</BaseLayout>
```

- [ ] **Step 3: Verify scaffold builds**

```bash
cd /Users/yy/2_Areas/astro-landing && bun dev
```

Open `http://localhost:4321/IT/Gianluca%20Paolucci/20260518-5.0/` in browser. Expected: blank white page with only the compliance footer visible at the bottom. No build errors in terminal.

- [ ] **Step 4: Commit**

```bash
git add "src/pages/IT/Gianluca Paolucci/20260518-5.0/index.astro"
git commit -m "scaffold: IT breaking-news campaign page 20260518-5.0"
```

---

### Task 2: Build Section 1 — BREAKING Hero

**Files:**
- Modify: `src/pages/IT/Gianluca Paolucci/20260518-5.0/index.astro`

- [ ] **Step 1: Add Hero CSS**

Add the following CSS rules inside the existing `<style is:global>` block, after the `.reveal.active` rule:

```css
/* ─── BREAKING Hero ─── */
.bn-hero {
  padding: 3.5rem 0 2.5rem;
  border-bottom: 3px solid var(--rule);
}

.bn-breaking-tag {
  display: inline-block;
  background: var(--rosso);
  color: #fff;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 0.3rem 0.75rem;
  margin-bottom: 1.5rem;
}

.bn-hero h1 {
  font-size: clamp(1.75rem, 5vw, 2.65rem);
  font-weight: 700;
  line-height: 1.25;
  color: var(--ink);
  margin: 0 0 1.25rem;
}

.bn-hero-sub {
  font-size: 1.05rem;
  color: var(--ink-soft);
  line-height: 1.7;
  margin: 0 0 2rem;
  font-style: italic;
}

.bn-hero-sub strong {
  color: var(--rosso);
  font-style: normal;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
}

/* typewriter effect */
.bn-typewriter {
  display: inline;
  border-right: 2px solid var(--rosso);
  animation: bn-blink 0.7s step-end infinite;
}

@keyframes bn-blink {
  50% { border-color: transparent; }
}

.bn-byline {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.75rem;
  color: var(--ink-soft);
}

.bn-byline-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid var(--rule-light);
}

.bn-byline-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 480px) {
  .bn-hero { padding: 2.5rem 0 2rem; }
  .bn-hero h1 { font-size: 1.55rem; }
}
```

- [ ] **Step 2: Add Hero HTML**

Replace the `<!-- sections will go here -->` comment with:

```astro
<!-- ─── BREAKING Hero ─── -->
<section class="bn-hero">
  <div class="bn-container">
    <span class="bn-breaking-tag reveal">Ultime Notizie · Mercati</span>

    <h1 class="reveal">
      I tuoi risparmi perdono valore <span class="bn-typewriter" id="bn-typewriter"></span>
    </h1>

    <p class="bn-hero-sub reveal">
      L'inflazione in Italia è al <strong>2,0%</strong>. Il tuo conto deposito rende meno dell'<strong>1%</strong>. Ogni giorno che passa, il tuo potere d'acquisto si riduce. Non è un'opinione — sono i numeri ufficiali.
    </p>

    <div class="bn-byline reveal">
      <div class="bn-byline-avatar">
        <img src={PERSONA.avatar} alt={PERSONA.nome} width="32" height="32" />
      </div>
      <span>A cura di {PERSONA.nome} · Aggiornato a maggio 2026</span>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Verify in browser**

Reload the page. Expected: red BREAKING tag at top, large bold serif headline, italic subtitle with red monospace numbers, small byline with avatar. Thick black border below the section.

- [ ] **Step 4: Commit**

```bash
git add "src/pages/IT/Gianluca Paolucci/20260518-5.0/index.astro"
git commit -m "feat(IT): add BREAKING hero section for campaign 20260518-5"
```

---

### Task 3: Build Section 2 — Data Impact

**Files:**
- Modify: `src/pages/IT/Gianluca Paolucci/20260518-5.0/index.astro`

- [ ] **Step 1: Add Data Impact CSS**

Add after the Hero CSS block:

```css
/* ─── Data Impact ─── */
.bn-data {
  padding: 3rem 0;
  border-bottom: 3px solid var(--rule);
}

.bn-data-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.bn-data-card {
  border: 1px solid var(--rule-light);
  padding: 1.5rem;
  text-align: center;
}

.bn-data-number {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(2.2rem, 6vw, 3.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin: 0 0 0.5rem;
  color: var(--ink);
}

.bn-data-number.negative {
  color: var(--rosso);
}

.bn-data-label {
  font-size: 0.85rem;
  color: var(--ink);
  line-height: 1.5;
  margin: 0 0 0.75rem;
}

.bn-data-source {
  font-size: 0.65rem;
  color: var(--ink-soft);
  border-top: 1px solid var(--rule-light);
  padding-top: 0.6rem;
  margin: 0;
}

.bn-section-h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--ink);
  margin: 0;
}

@media (max-width: 768px) {
  .bn-data-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Add Data Impact HTML**

Insert after the closing `</section>` of the hero, before `<ITComplianceFooter>`:

```astro
<!-- ─── Data Impact ─── -->
<section class="bn-data">
  <div class="bn-container">
    <h2 class="bn-section-h2 reveal">I numeri che il tuo conto in banca non ti mostra</h2>

    <div class="bn-data-grid">
      <div class="bn-data-card reveal">
        <p class="bn-data-number" data-countup="2.0" data-suffix="%">0</p>
        <p class="bn-data-label">Inflazione annua in Italia</p>
        <p class="bn-data-source">Fonte: ISTAT, ultimo dato disponibile. Non costituisce previsione.</p>
      </div>

      <div class="bn-data-card reveal">
        <p class="bn-data-number negative" data-countup="-1580" data-prefix="€" data-duration="2000">0</p>
        <p class="bn-data-label">Perdita reale su €100.000 in un anno</p>
        <p class="bn-data-source">Calcolo indicativo: (inflazione − rendimento depositi) × capitale. Non è consulenza.</p>
      </div>

      <div class="bn-data-card reveal">
        <p class="bn-data-number negative" data-countup="-1.2" data-suffix="%">0</p>
        <p class="bn-data-label">Gap tra rendimento depositi e inflazione</p>
        <p class="bn-data-source">Differenza tra tasso medio depositi e inflazione. Dati pubblici, non raccomandazione.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Verify in browser**

Reload. Expected: 3-column grid of data cards (stacking to 1 column on mobile). Large monospace numbers, with the loss/gap values in red. Small source disclaimers under each card.

- [ ] **Step 4: Commit**

```bash
git add "src/pages/IT/Gianluca Paolucci/20260518-5.0/index.astro"
git commit -m "feat(IT): add data impact section with 3 key inflation metrics"
```

---

### Task 4: Build Section 3 — Editorial Quote

**Files:**
- Modify: `src/pages/IT/Gianluca Paolucci/20260518-5.0/index.astro`

- [ ] **Step 1: Add Editorial Quote CSS**

Add after the Data Impact CSS block:

```css
/* ─── Editorial Quote ─── */
.bn-quote {
  padding: 3rem 0;
  border-bottom: 3px solid var(--rule);
  background: #FAFAFA;
}

.bn-editorial-quote {
  font-family: 'Lora', serif;
  font-size: clamp(1.25rem, 3vw, 1.85rem);
  font-weight: 700;
  font-style: italic;
  line-height: 1.55;
  color: var(--ink);
  margin: 0;
  position: relative;
  padding-left: 2rem;
  border-left: 4px solid var(--rosso);
}
```

- [ ] **Step 2: Add Editorial Quote HTML**

Insert after the Data Impact section:

```astro
<!-- ─── Editorial Quote ─── -->
<section class="bn-quote">
  <div class="bn-container">
    <blockquote class="bn-editorial-quote reveal">
      La domanda non è se i mercati saliranno. È se i tuoi soldi possono permettersi di aspettare.
    </blockquote>
  </div>
</section>
```

- [ ] **Step 3: Verify in browser**

Reload. Expected: subtle gray background band, large italic serif quote with a thick red left border.

- [ ] **Step 4: Commit**

```bash
git add "src/pages/IT/Gianluca Paolucci/20260518-5.0/index.astro"
git commit -m "feat(IT): add editorial quote section"
```

---

### Task 5: Build Section 4 — Persona (minimal) + Section 5 — What You Get

**Files:**
- Modify: `src/pages/IT/Gianluca Paolucci/20260518-5.0/index.astro`

- [ ] **Step 1: Add Persona + Benefits CSS**

Add after the Editorial Quote CSS block:

```css
/* ─── Persona (minimal) ─── */
.bn-persona {
  padding: 2.5rem 0;
  border-bottom: 3px solid var(--rule);
}

.bn-persona-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.bn-persona-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid var(--rule-light);
}

.bn-persona-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.bn-persona-name {
  font-family: 'Lora', serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--ink);
  margin: 0;
}

.bn-persona-title {
  font-size: 0.82rem;
  color: var(--ink-soft);
  margin: 0.15rem 0 0;
}

/* ─── What You Get ─── */
.bn-benefits {
  padding: 2.5rem 0;
  border-bottom: 3px solid var(--rule);
}

.bn-benefits-list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0;
  display: grid;
  gap: 0;
}

.bn-benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--rule-light);
}

.bn-benefit-item:last-child {
  border-bottom: none;
}

.bn-benefit-check {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  color: var(--rosso);
  margin-top: 0.1rem;
}

.bn-benefit-text {
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--ink);
}
```

- [ ] **Step 2: Add Persona + Benefits HTML**

Insert after the Editorial Quote section:

```astro
<!-- ─── Persona (minimal) ─── -->
<section class="bn-persona">
  <div class="bn-container">
    <div class="bn-persona-row reveal">
      <div class="bn-persona-avatar">
        <img src={PERSONA.avatar} alt={PERSONA.nome} width="56" height="56" />
      </div>
      <div>
        <h3 class="bn-persona-name">{PERSONA.nome}</h3>
        <p class="bn-persona-title">{PERSONA.titolo}</p>
      </div>
    </div>
  </div>
</section>

<!-- ─── What You Get ─── -->
<section class="bn-benefits">
  <div class="bn-container">
    <h2 class="bn-section-h2 reveal">Cosa ricevi, gratuitamente</h2>
    <ul class="bn-benefits-list">
      <li class="bn-benefit-item reveal">
        <svg class="bn-benefit-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span class="bn-benefit-text">Analisi di mercato aggiornate, in italiano, senza gergo tecnico</span>
      </li>
      <li class="bn-benefit-item reveal">
        <svg class="bn-benefit-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span class="bn-benefit-text">Nessuna promessa di rendimento — solo informazione e contesto</span>
      </li>
      <li class="bn-benefit-item reveal">
        <svg class="bn-benefit-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span class="bn-benefit-text">Disiscrizione in un tocco, nessuno spam, zero obblighi</span>
      </li>
    </ul>
  </div>
</section>
```

- [ ] **Step 3: Verify in browser**

Reload. Expected: minimal persona row (avatar + name + title), then a list of 3 benefits with red checkmark icons separated by thin lines.

- [ ] **Step 4: Commit**

```bash
git add "src/pages/IT/Gianluca Paolucci/20260518-5.0/index.astro"
git commit -m "feat(IT): add persona and benefits sections"
```

---

### Task 6: Build Section 6 — CTA + ensure footer works

**Files:**
- Modify: `src/pages/IT/Gianluca Paolucci/20260518-5.0/index.astro`

- [ ] **Step 1: Add CTA CSS**

Add after the Benefits CSS block:

```css
/* ─── CTA Finale ─── */
.bn-cta {
  padding: 3.5rem 0;
  text-align: center;
}

.bn-cta h2 {
  font-size: clamp(1.4rem, 4vw, 2rem);
  line-height: 1.3;
  margin: 0 0 0.75rem;
  color: var(--ink);
}

.bn-cta p {
  color: var(--ink-soft);
  font-size: 0.95rem;
  margin: 0 auto 2rem;
  max-width: 440px;
  line-height: 1.65;
}

.bn-btn-wa {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  background: var(--wa-green);
  color: #fff;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  padding: 1rem 2rem;
  border: none;
  cursor: pointer;
  transition: opacity 0.18s;
  text-align: center;
  width: 100%;
  max-width: 420px;
}

.bn-btn-wa:hover {
  opacity: 0.9;
}

.bn-btn-wa svg {
  flex-shrink: 0;
}

.bn-guarantee {
  font-size: 0.72rem;
  color: var(--ink-soft);
  margin-top: 0.9rem;
}

@media (max-width: 768px) {
  .bn-btn-wa { max-width: 100%; }
}
```

- [ ] **Step 2: Add CTA HTML**

Insert after the Benefits section, before `<ITComplianceFooter>`:

```astro
<!-- ─── CTA Finale ─── -->
<section class="bn-cta">
  <div class="bn-container">
    <h2 class="serif reveal">I tuoi risparmi sono davvero al sicuro?</h2>
    <p class="reveal">Ricevi gratuitamente le analisi di mercato più aggiornate, direttamente su WhatsApp.</p>
    <div style="display: flex; justify-content: center;">
      <button onclick="window.onLinkBtnClick()" class="bn-btn-wa reveal">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        Ricevi le analisi gratis su WhatsApp
      </button>
    </div>
    <p class="bn-guarantee reveal">Gratuito · Nessun obbligo · Nessuna promessa di rendimento · Disiscrizione libera</p>
  </div>
</section>
```

- [ ] **Step 3: Verify in browser**

Reload. Expected: centered CTA section with question headline, WhatsApp green button with icon, and small guarantee text. Compliance footer renders below with modals working (click "Informativa sui rischi" etc.).

- [ ] **Step 4: Commit**

```bash
git add "src/pages/IT/Gianluca Paolucci/20260518-5.0/index.astro"
git commit -m "feat(IT): add CTA section with WhatsApp button"
```

---

### Task 7: Add animations — typewriter, countup, reveal

**Files:**
- Modify: `src/pages/IT/Gianluca Paolucci/20260518-5.0/index.astro`

- [ ] **Step 1: Add the inline script block**

Insert after the CTA section and before `<ITComplianceFooter>`, add this script:

```html
<script is:inline>
  // Typewriter effect for hero headline
  (function () {
    const el = document.getElementById('bn-typewriter')
    if (!el) return
    const text = 'ogni giorno. Ecco cosa sta succedendo.'
    let i = 0
    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i)
        i++
        setTimeout(type, 45)
      }
    }
    setTimeout(type, 600)
  })();

  // CountUp effect for data numbers
  (function () {
    const counters = document.querySelectorAll('[data-countup]')
    const observed = new Set()

    function animateCount(el) {
      const target = parseFloat(el.getAttribute('data-countup'))
      const prefix = el.getAttribute('data-prefix') || ''
      const duration = parseInt(el.getAttribute('data-duration')) || 1500
      const isNeg = target < 0
      const abs = Math.abs(target)
      const decimals = (String(abs).split('.')[1] || '').length
      const start = performance.now()

      function step(now) {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = eased * abs
        const formatted = current.toFixed(decimals)
        const suffix = el.getAttribute('data-suffix') || ''
        el.textContent = (isNeg ? '-' : '') + prefix + formatted + suffix
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !observed.has(entry.target)) {
          observed.add(entry.target)
          animateCount(entry.target)
        }
      })
    }, { threshold: 0.3 })

    counters.forEach((el) => io.observe(el))
  })();

  // Reveal on scroll
  (function () {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
  })();
</script>
```

- [ ] **Step 2: Verify in browser**

Reload page. Expected behaviors:
1. Hero headline: "I tuoi risparmi perdono valore" appears immediately, then "ogni giorno. Ecco cosa sta succedendo." types in letter by letter with a blinking red cursor
2. Data numbers: when scrolled into view, animate from 0 to their target values. First shows `2.0%`, second shows `-€1580`, third shows `-1.2%`
3. All `.reveal` elements fade up when scrolled into view

- [ ] **Step 3: Commit**

```bash
git add "src/pages/IT/Gianluca Paolucci/20260518-5.0/index.astro"
git commit -m "feat(IT): add typewriter, countup, and reveal animations"
```

---

### Task 8: Final visual review and responsive check

**Files:**
- Modify: `src/pages/IT/Gianluca Paolucci/20260518-5.0/index.astro` (if fixes needed)

- [ ] **Step 1: Desktop review (1280px)**

Open the page in browser at full desktop width. Walk through all 6 sections and verify:
- BREAKING tag is red with white uppercase text
- Headline typewriter effect works
- Data cards are 3-column grid with correct formatting
- Quote has red left border and italic serif text
- Persona is a compact single row
- Benefits have red checkmarks
- WhatsApp button is green, centered
- Footer modals open and close correctly
- All dividers are thick black (3px), not thin gray

- [ ] **Step 2: Mobile review (375px)**

Use browser DevTools to set viewport to 375px width. Verify:
- Data cards stack to single column
- Hero headline is readable, not truncated
- WhatsApp button is full width
- All text is readable, no horizontal overflow

- [ ] **Step 3: Fix any issues found**

Apply CSS fixes for any visual issues discovered. Common things to check:
- Typewriter text wrapping on mobile (may need to remove `white-space: nowrap` or just let it wrap naturally since we're using JS-based typewriter)
- Data card number sizes on mobile
- Padding consistency

- [ ] **Step 4: Verify build succeeds**

```bash
cd /Users/yy/2_Areas/astro-landing && bun build
```

Expected: clean build with no errors. The page should appear in `dist/` output.

- [ ] **Step 5: Final commit (if changes were made)**

```bash
git add "src/pages/IT/Gianluca Paolucci/20260518-5.0/index.astro"
git commit -m "fix(IT): responsive and visual polish for breaking-news campaign"
```
