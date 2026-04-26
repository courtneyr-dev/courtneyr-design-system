# COMPONENTS.md

Class-by-class reference for every `.cr-*` component. Each entry explains what the class does, when to use it, and gives an HTML example.

All components are opt-in. Markup without `.cr-*` classes still gets sensible zine-aware element defaults from `tokens.css` — you only reach for these classes when you want a specific zine moment.

---

## .cr-display

Rock Salt display heading. Used for the page-topic hero on landing/marketing pages.

**Use sparingly.** Rock Salt is expensive and visually loud. Never on body text, never repeated within a single screen.

```html
<h1 class="cr-display">courtneyr.dev</h1>
```

---

## .cr-eyebrow

Block-level kicker that sits above a heading. UT Orange, uppercase, tracked.

`display: block` is intentional — `inline-block` causes it to share a line with the heading.

```html
<span class="cr-eyebrow">Open Source Developer Advocate</span>
<h1>About me</h1>
```

---

## .cr-highlight

Inline yellow-highlighter swipe. The selective-yellow color sits behind text from ~50% to ~92% of line height, so it reads as a real marker stroke.

In dark mode, the text color stays dark — yellow stays yellow, and dark text on yellow remains AA.

```html
<p>Building <span class="cr-highlight">open source community</span> at GoDaddy.</p>
```

---

## .cr-pull-quote

Big block-level quote for landing pages and marketing. Distinct from the default `<blockquote>` element, which is for inline-in-post quotes.

Roboto Slab italic, with a marker bar above and below.

```html
<blockquote class="cr-pull-quote">
  I want WordPress to be a place where new contributors feel welcome.
  <cite>From a recent meeting</cite>
</blockquote>
```

---

## .cr-callout

Cerulean info box with optional masking-tape label. Hard offset shadow.

Modifiers:
- `.cr-callout--note` — prussian-blue bg, light-orange text
- `.cr-callout--warn` — selective-yellow bg, prussian-blue text (deliberately loud)

```html
<div class="cr-callout">
  <span class="cr-callout__label">Booking note</span>
  <p>I speak about WordPress, open source, IndieWeb, accessibility, DevRel.</p>
</div>

<div class="cr-callout cr-callout--note">
  <span class="cr-callout__label">Note</span>
  <p>Important context goes here.</p>
</div>

<div class="cr-callout cr-callout--warn">
  <span class="cr-callout__label">Warning</span>
  <p>Loud, deliberate, used sparingly.</p>
</div>
```

---

## .cr-card

Hard offset shadow + slight rotation. Photocopied flier feel. Used for sidebar content, secondary callouts, "things on my desk" tiles.

v1.x had `.cr-card--elevated` and `.cr-card--inverse` modifiers. Both removed in v2.0 — the zine treatment is the only card variant now.

```html
<div class="cr-card">
  <h3>Recent talks</h3>
  <ul>
    <li>WordCamp US</li>
  </ul>
</div>
```

---

## .cr-toc

Table-of-contents block. Light-orange background, hard shadow, capped width.

The hover state on TOC links applies the yellow highlighter — discoverable, hand-drawn-feeling.

```html
<nav class="cr-toc" aria-label="Table of contents">
  <p class="cr-toc__heading">In this post</p>
  <ol>
    <li><a href="#why">Why CSP got messy</a></li>
    <li><a href="#fix">The fix</a></li>
  </ol>
</nav>
```

---

## .cr-tape

Inline masking-tape label. Yellow-cream background, rotated slightly, soft shadow.

Used as a tag, badge, or small label above a heading. Don't stack more than two near each other.

```html
<span class="cr-tape">WordPress</span>
<span class="cr-tape">Security</span>
```

---

## .cr-marker-bar

Wide UT Orange stripe used as a section divider. Stronger than the default `<hr>`. Slightly rotated.

Modifier:
- `.cr-marker-bar--short` — narrow, less assertive

```html
<hr class="cr-marker-bar" aria-hidden="true">
<hr class="cr-marker-bar cr-marker-bar--short" aria-hidden="true">
```

---

## .cr-sparkle

Decorative asterisk. Always `aria-hidden="true"` in markup.

Modifier:
- `.cr-sparkle--margin` — absolutely positioned, larger; place inside a `position: relative` parent

```html
<span class="cr-sparkle" aria-hidden="true">✦</span>

<section style="position: relative;">
  <span class="cr-sparkle cr-sparkle--margin" aria-hidden="true" style="top: -1rem; left: -1rem;">✦</span>
  ...
</section>
```

---

## .cr-halftone

Halftone dot overlay applied as a `background-image` to a wrapper. Useful for hero/landing surfaces.

Modifier:
- `.cr-halftone--soft` — fewer dots, gentler

```html
<section class="cr-hero cr-halftone">...</section>
```

---

## .cr-accent-block

Generic surface treatment with hard shadow and thick border. Use for sectional content, three-up feature blocks, sidebars.

Modifiers:
- `.cr-accent-block--1` — sky blue
- `.cr-accent-block--2` — periwinkle
- `.cr-accent-block--3` — light orange

All three flip cleanly in dark mode (light bg + dark text → dark bg + bright text).

```html
<article class="cr-accent-block cr-accent-block--1">
  <span class="cr-tape">WordPress</span>
  <h3>Post Formats for Block Themes</h3>
  <p>Plugin description.</p>
</article>
```

---

## .cr-button family

Full button system, restyled for zine. Sharp corners, thick border, hard offset shadow, "press" effect on `:active` (translates 2px down/right and shrinks the shadow).

Modifiers:

| Modifier | Background | Text |
|---|---|---|
| `.cr-button` (no modifier) | `--cr-surface-elevated` | `--cr-ink` |
| `.cr-button--primary` | `--cr-cta-bg` (UT Orange) | `--cr-cta-ink` (Prussian Blue) |
| `.cr-button--secondary` | `--cr-russian-violet` | `--cr-sky-blue` |
| `.cr-button--outline` | transparent | `--cr-ink` |
| `.cr-button--soft` | `--cr-light-orange` | `--cr-russian-violet` |

All variants use the same hover behavior (background swaps to a contrasting accent, text recolors). All variants share the same focus ring (`--cr-focus-ring`, selective yellow, 3px outline, 2px offset).

```html
<a href="/contact" class="cr-button cr-button--primary">Get in touch</a>
<button type="button" class="cr-button cr-button--secondary">Read more</button>
<a href="#about" class="cr-button cr-button--outline">About me</a>
<button type="submit" class="cr-button cr-button--soft">Subscribe</button>
```

---

## .cr-cta

Alias for `.cr-button--primary`. Use either; mockups use `.cr-cta` for the primary call-to-action on a hero section because the intent reads cleaner in markup.

```html
<a href="#about" class="cr-cta">Read about me</a>
<button class="cr-cta">Submit</button>
```

---

## .cr-chip family

Post-type taxonomy chip — masking-tape style. Yellow-cream background, slightly rotated, soft shadow. Adjacent chips alternate rotation direction so a row of three reads as hand-applied.

The IndieWeb post-type taxonomy is preserved from v1.x: each post type maps to a token color (`--cr-type-{type}`). The post-type color is carried as a **4px left border accent** — text always stays russian-violet on tape (12.47:1, AAA at small sizes).

Per-type modifiers (left-border accent color):
- `.cr-chip--blog`     · `📰` blog posts
- `.cr-chip--link`     · `🔗` linkblog
- `.cr-chip--video`    · `📹` video
- `.cr-chip--audio`    · `🎧` podcast/audio
- `.cr-chip--quote`    · `🔖` quotes
- `.cr-chip--aside`    · `🗯️` asides
- `.cr-chip--status`   · `🖊️` short-form notes
- `.cr-chip--speaking` · `🗣️` talks
- `.cr-chip--book`     · `📚` book notes

Style modifier:
- `.cr-chip--solid` — fills the chip with the post-type color; text adapts (prussian-blue for blog/speaking, russian-violet for link, ivory for video/audio/quote/book)

**Aside and status do not support `.cr-chip--solid`** — glaucous (`#647baf`) fails AA contrast against both light and dark text. Use the default chip variant (tape + glaucous left border + russian-violet text) for those types.

`.cr-chip--outline` was removed in v2.0.1 — it failed AA contrast for warm/light post-type colors (ut-orange, glaucous, selective-yellow on the ivory page background).

```html
<a href="/category/blog" class="cr-chip cr-chip--blog">Blog</a>
<a href="/category/link" class="cr-chip cr-chip--link">Linkblog</a>

<a href="/talks" class="cr-chip cr-chip--speaking cr-chip--solid">Talk</a>
<a href="/category/aside" class="cr-chip cr-chip--aside">Aside</a>
```

Tags can be plain `.cr-chip` (no per-type) for non-taxonomic labels:

```html
<span class="cr-chip">WordPress</span>
<span class="cr-chip">A11y</span>
```

---

## Layout components

### .cr-hero
Hero section container. Adds the fiber + halftone surface, padding, and a `__inner` wrapper for centered content. Multiple heading treatments available.

```html
<section class="cr-hero">
  <div class="cr-hero__inner">

    <!-- Option 1: Rock Salt display heading (short copy only) -->
    <h1 class="cr-hero__display">courtneyr.dev</h1>

    <!-- Option 2: Roboto Slab heading (longer copy) -->
    <h1 class="cr-hero__title">
      Building open source community at <span class="cr-hero__title--accent">GoDaddy</span>
    </h1>

    <p class="cr-hero__lead">A lead paragraph in slab serif…</p>
    <a href="#about" class="cr-cta">Read about me</a>
  </div>
</section>
```

Elements:
- `.cr-hero__inner` — max-width container (60rem), centered, position-relative for sparkle anchoring
- `.cr-hero__display` — Rock Salt, big, fluid sizing via `clamp()`. Display only — keep copy under ~6 words.
- `.cr-hero__title` — Roboto Slab, weight 900, fluid sizing. The accent voice when Rock Salt would be too loud.
- `.cr-hero__title--accent` — wraps a phrase inside `__title` to recolor it UT Orange.
- `.cr-hero__lead` — slab serif lead paragraph, muted ink, max-width 40rem.

### .cr-stream
Feed layout container for the homepage's aggregate stream feed (mixes all post types chronologically).

```html
<div class="cr-stream">
  <article class="cr-stream-item cr-stream-item--blog">
    <div class="cr-stream-item__avatar" aria-hidden="true">📰</div>
    <div class="cr-stream-item__body">
      <div class="cr-stream-item__meta">
        <span class="cr-chip cr-chip--blog">Blog</span>
        <time>April 15, 2026</time>
      </div>
      <h3 class="cr-stream-item__title"><a href="/post-slug">Post title</a></h3>
      <p>Post excerpt or short description…</p>
      <div class="cr-stream-item__tags">
        <span class="cr-chip">WordPress</span>
        <span class="cr-chip">CSP</span>
      </div>
    </div>
  </article>
  <!-- more items -->
</div>
```

`.cr-stream-item` is a 2-column grid (avatar | body) separated from neighbors by a UT Orange 4px marker bar. On hover, the item translates `-2px, -2px`. On `prefers-reduced-motion: reduce`, the hover translate stays static.

Per-type modifiers: `.cr-stream-item--{type}` recolors the avatar to the post-type accent. The structure is identical for every type — only the avatar color and the chip change.

This is the structure expected by the Query Loop config in `IMPLEMENTATION.md`. If you change class names here, update there too.

### .cr-reading
Long-form reading container. Caps width to `--cr-measure` (`65ch`).

```html
<main class="cr-reading">
  <h1>Post title</h1>
  <p>Body content...</p>
</main>
```

---

## Rotation utilities

Use sparingly. The principle is "decoration in margins, calm in measure" — rotation is reserved for accents, not body text or tables.

- `.cr-rotate-1` — `-1.2deg`
- `.cr-rotate-2` — `1.5deg`
- `.cr-rotate-neg` — `-2.5deg`
- `.cr-rotate-neg2` — `2.8deg`

```html
<span class="cr-tape cr-rotate-2">Tag</span>
```

For depth conventions, layering patterns, and what-not-to-do, see `LAYERING.md`.

---

## Accessibility

### .cr-skip-link

Hidden until focused. Drop in as the first child of `<body>`.

```html
<a href="#main" class="cr-skip-link">Skip to content</a>
```
