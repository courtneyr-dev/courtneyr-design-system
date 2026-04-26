# courtneyr.dev — Brand Design System

Personal site with the voice of a patient teacher and the visual confidence of a hand-pasted zine. WordPress + IndieWeb + AA contrast.

[courtneyr.dev](https://courtneyr.dev) is the personal site of Courtney Robertson — Senior Open Source Developer Advocate at GoDaddy, WordPress contributor, co-founder of WP Community Collective.

![Built for WordPress + Ollie](https://img.shields.io/badge/built_for-WordPress_%2B_Ollie-fb8500?style=flat-square) ![v2.0](https://img.shields.io/badge/version-2.0.0-241c4a?style=flat-square)

---

## What's in here

```
courtneyr-design-system/
├── tokens/
│   └── tokens.css                  ← raw palette, semantic tokens, element defaults, dark mode
├── components/
│   └── components.css              ← .cr-* classes (buttons, chips, hero, stream, callout…)
├── brand/
│   ├── brand.json                  ← machine-readable brand spec
│   ├── theme.json.fragment.json    ← WordPress Ollie palette starter
│   ├── wordmark.svg                ← all-paths Rock Salt wordmark, no font dependency
│   └── wordmark-preview.png
├── design-system/
│   └── mockups/
│       ├── hero.html               ← landing example, full zine treatment
│       ├── reading.html            ← blog post, calm-with-zine-accents
│       └── styleguide.html         ← every common HTML element, OS dark-mode flippable
├── demo/                           ← legacy v1.x demo, deferred to v2.1 for cleanup
│   ├── index.html
│   └── BrandSystem.jsx
├── docs/
│   ├── AI_CONTEXT.md               ← feed this to claude.ai/design first
│   ├── COMPONENTS.md               ← class-by-class reference
│   ├── LAYERING.md                 ← rotation, depth, z-index conventions
│   └── IMPLEMENTATION.md           ← how to wire into Ollie
└── README.md
```

---

## Using this with [claude.ai/design](https://claude.ai/design)

When the setup form asks for inputs, provide the following:

### Company name and blurb
```
courtneyr.dev — personal site and brand for Courtney Robertson, Senior Open Source Developer Advocate at GoDaddy, WordPress contributor, IndieWeb participant. Voice of a patient teacher; visual confidence of a hand-pasted zine. Built on WordPress + Ollie block theme.
```

### Link to code on GitHub
Paste the URL to this repository.

### Any other notes?
```
Read docs/AI_CONTEXT.md first — it's the condensed brief.

Core files: tokens/tokens.css, components/components.css, brand/brand.json.

Aesthetic is "zine":
  - Hard offset shadows (4px 4px 0 — no blur)
  - Slight rotation on accents (-2.5° to +2.8°, four locked tokens)
  - Halftone overlay on hero surfaces
  - Masking-tape labels for tags/post-type chips
  - UT Orange marker stripes between sections

Guiding principle: "decoration in margins, calm in measure" — landing pages get
the full zine treatment; blog/long-form stays calm with zine accents at the edges.

Font system: Rock Salt (display, wordmark only) + Roboto Slab (accent headings)
+ Barlow (body, UI) + system mono (code). All loaded via Ollie's font library.
Do not swap.

Dark mode uses prefers-color-scheme. Surface flips to photocopier black (#1a1714);
hard shadows recolor to selective yellow. See tokens.css section 10.
```

---

## Using this in WordPress (Ollie block theme)

1. **Tokens.** Paste `tokens/tokens.css` into Ollie's *Manage CSS Classes* panel, or enqueue it from a child-theme stylesheet (see `docs/IMPLEMENTATION.md` for the `wp_enqueue_style` snippet).
2. **Components.** Same treatment for `components/components.css`.
3. **Palette in the color picker.** Move the `settings.color.palette` array from `brand/theme.json.fragment.json` into your Ollie child theme's `theme.json`. WordPress will surface your swatches by name across every block.
4. **Stream feed on the homepage.** Add a Query Loop block with class `cr-stream`. Inside, replace the post template with the structure described in `docs/COMPONENTS.md` (`.cr-stream-item` with `__avatar`, `__body`, `__meta`, `__title`, `__tags`). The IndieWeb post-type taxonomy maps to `.cr-chip--{type}` modifiers automatically.
5. **Dark mode** works out of the box via `@media (prefers-color-scheme: dark)`. To give users a manual toggle, set `data-theme="dark"` on `<html>` — the semantic tokens already accept it.

For step-by-step including the child-theme `functions.php` enqueue and per-page Perfmatters scoping for Rock Salt, see `docs/IMPLEMENTATION.md`.

---

## The three moves that make this brand

1. **Palette split.** Ut Orange (`#fb8500`) leads warmth and CTAs. Selective Yellow (`#ffb703`) is the highlighter. Russian Violet (`#241c4a`) is the ink. Sky Blue (`#8ecae6`) carries the soft signature and accent block 1. The remaining seven colors are support.
2. **Zine vocabulary.** Hard offset shadows, slight rotation on accents, halftone overlays on hero surfaces, sparkles in margins, masking-tape labels for tags and callout headers, UT Orange marker stripes between sections. Photocopied, hand-applied — never soft, blurred, or polished. See `docs/LAYERING.md` for rotation budget, shadow vocabulary, and z-index conventions.
3. **Four fonts, four jobs.** Rock Salt for the wordmark and short hero displays. Roboto Slab for section headings, eyebrows, blockquote, stream titles. Barlow for body and UI. System mono for code.

---

## Previewing the mockups

Three reference mockups live in `design-system/mockups/`:

- **`hero.html`** — full zine treatment: Rock Salt display, halftone hero, callouts, accent blocks, pull quote, CTA buttons.
- **`reading.html`** — calm-with-zine-accents: long-form blog post layout with TOC, marker bars, callouts.
- **`styleguide.html`** — every common HTML element styled. Toggle OS dark mode while scrolling — every block flips correctly.

All three are self-contained — open them directly in a browser. They import `tokens.css` and `components.css` via relative paths.

---

## What's deferred to v2.1+

- `theme.json.fragment.json` expansion to a full Ollie-compatible fragment
- `demo/index.html` refresh as a quick-tour landing for the design system itself
- `demo/BrandSystem.jsx` cleanup (still references shape-layering and stale Mona Sans — left in place for now as a record of v1.x)
- Real-site deployment via Ollie child theme + Equalize Digital re-test
- Perfmatters Script Manager scoping for Rock Salt

---

## License & use

This brand system is authored for Courtney Robertson's personal use. Code patterns (tokens, components, layering utilities) are MIT — borrow them freely. The `brand/` folder (logo, palette, voice) is reserved for Courtney.

## Version

**v2.0.0** — Zine pivot. Selective merge from v1.1: button family preserved (zine-restyled), post-type chips restyled as masking-tape, stream-item structure preserved (zine-restyled), shape-layering deprecated entirely.

Generated in collaboration with Claude.
