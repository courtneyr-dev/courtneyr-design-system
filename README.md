# courtneyr.dev — Brand Design System

A warm, teacher-ish, shape-layered design system for [courtneyr.dev](https://courtneyr.dev) — the personal site of Courtney Robertson, Senior Open Source Developer Advocate at GoDaddy, WordPress contributor, and co-founder of WP Community Collective.

![Open source · WordPress · DevRel · IndieWeb](https://img.shields.io/badge/built_for-WordPress_%2B_Ollie-fb8500?style=flat-square)

---

## What's in here

```
courtneyr-design-system/
├── tokens/
│   └── tokens.css                 ← CSS custom properties (colors, type, spacing, radii, motion)
├── components/
│   └── components.css             ← Canonical component classes (.cr-button, .cr-stream-item, etc.)
├── brand/
│   ├── brand.json                 ← Machine-readable brand spec (palette, voice, patterns)
│   ├── theme.json.fragment.json   ← WordPress Ollie child-theme palette fragment
│   ├── wordmark.svg               ← Primary wordmark — all Rock Salt, lowercase "courtneyr.dev"
│   └── wordmark-preview.png       ← PNG preview of the wordmark
├── demo/
│   ├── index.html                 ← Static HTML reference page (canonical examples)
│   └── BrandSystem.jsx             ← Interactive React artifact (the design tour)
├── docs/
│   ├── AI_CONTEXT.md              ← Feed this to Claude.ai/design
│   ├── SHAPE_LAYERING.md          ← The signature pattern, documented
│   └── IMPLEMENTATION.md           ← How to apply this in Ollie
└── README.md
```

---

## Using this with [claude.ai/design](https://claude.ai/design)

When the setup form asks for inputs, provide the following:

### Company name and blurb
```
courtneyr.dev — personal website and brand for Courtney Robertson, Senior Open Source Developer Advocate at GoDaddy, WordPress contributor, and WP Community Collective co-founder. Warm, teacher-ish, built on WordPress + Ollie block theme with IndieWeb principles.
```

### Link code on GitHub
Paste the URL to this repository.

### Any other notes?
```
Read docs/AI_CONTEXT.md first — it's the condensed brief.
Core files: tokens/tokens.css, components/components.css, brand/brand.json.
The shape-layering pattern (soft circle behind any image + floating badge on a corner) is a signature element and should appear on any image-forward composition.
Font system: Rock Salt (display/wordmark) + Barlow (body) + Roboto Slab (accent headings). All three are loaded via Ollie's font library. Do not swap.
Dark mode uses prefers-color-scheme. See tokens.css for the full dual-theme palette.
```

---

## Using this in WordPress (Ollie block theme)

1. **Tokens** — Paste the contents of `tokens/tokens.css` into Ollie's *Manage CSS Classes* panel, or into a child-theme stylesheet.
2. **Components** — Same treatment for `components/components.css`.
3. **Shape-layering in the editor** — On any WordPress Image block, open the block sidebar → *Advanced* → *Additional CSS class(es)* and add `cr-shape-frame`. The soft circle behind the image appears automatically.
4. **Palette in the color picker** — Move the `settings.color.palette` array from `brand/theme.json.fragment.json` into your Ollie child theme's `theme.json`. WordPress will surface your swatches by name across every block.
5. **Dark mode** — Works out of the box via `@media (prefers-color-scheme: dark)`. To give users a manual toggle, add `data-theme="dark"` to the `<html>` element.

For a complete step-by-step, see `docs/IMPLEMENTATION.md`.

---

## The three moves that make this brand

1. **Palette split.** Ut Orange (#fb8500) leads warmth and CTAs. Sky Blue (#8ecae6) carries the signature shapes and soft backgrounds. Russian Violet (#241c4a) is the ink. The remaining eight colors are support.
2. **Shape-layering as signature.** Every feature image sits in front of one soft circle, with one floating badge card orbiting a corner. Borrowed from Airo's visual language, tuned to this palette.
3. **Three fonts, three jobs.** Rock Salt for the handwritten wordmark and select display moments. Barlow for body copy and UI. Roboto Slab for accent headings, stream card titles, and pull-quotes. All three loaded via Ollie's font library.

---

## Previewing the demo

The static HTML demo at `demo/index.html` is self-contained — open it directly in a browser. It imports `tokens.css` and `components.css` via relative paths, so whatever renders there is exactly what the system produces in the wild.

The React version at `demo/BrandSystem.jsx` is an interactive tour with eight tabs (Overview, Color, Typography, Shape System, Logo, Stream, Components, Handoff). It runs inside Claude artifacts or any React environment where Tailwind utility classes are available.

---

## License & use

This brand system is authored for Courtney Robertson's personal use. Code patterns (tokens, components, shape-layering utility) are MIT — borrow them freely. The `brand/` folder (logos, palette, voice) is reserved for Courtney.

## Version

v1.0.0 — Initial system. Generated in collaboration with Claude.
