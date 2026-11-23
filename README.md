# courtneyr.dev — Brand Design System

Personal site with the voice of a patient teacher and the visual confidence of a hand-pasted zine. WordPress + IndieWeb + AA contrast.

[courtneyr.dev](https://courtneyr.dev) is the personal site of Courtney Robertson — Senior Open Source Developer Advocate at GoDaddy, WordPress contributor, co-founder of WP Community Collective.

![Built for WordPress + Ollie](https://img.shields.io/badge/built_for-WordPress_%2B_Ollie-fb8500?style=flat-square) ![Version 2.4.0](https://img.shields.io/badge/version-2.4.0-241c4a?style=flat-square)

---

## What's in here

```
courtneyr-design-system/
├── .storybook/                     ← composition-host Storybook config (refs live in main.js)
├── stories/                        ← foundations stories, read from the files below at build time
├── scripts/                        ← version check, contrast table, Storybook a11y and palette tests
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

## Storybook

This repo hosts the composition Storybook for courtneyr.dev. It builds locally only. No Pages site or domain is set up yet.

```sh
npm ci
npm run storybook         # dev server on http://localhost:6006
npm run build-storybook   # static build in storybook-static/ (git-ignored)
npm test                  # version and components checks, build, a11y test, palette test
```

The stories read `tokens/tokens.css`, `components/icons.svg`, `brand/wordmark.svg` and `docs/COMPONENTS.md` at build time, so a token or class added to those files shows up without a story edit:

- **Color.** Every color custom property in `tokens.css`, plus the light gray contrast table.
- **Typography.** Families, type scale, weights, leading and tracking from section 3 of `tokens.css`.
- **Brand.** The wordmark and every symbol in `icons.svg`.
- **Components.** Every section of `COMPONENTS.md` that has an HTML example, rendered with `components.css`.

`npm run test:a11y` opens each story in the built Storybook, in light and dark mode, and runs axe with the WCAG 2.0, 2.1 and 2.2 A and AA rules from `.storybook/a11y-rules.js`. It removes the fiber, halftone and highlighter gradients first, because axe can't measure contrast through a gradient. Any new violation fails the run, and so does a contrast check axe still can't measure. Known violations are listed in `scripts/test-a11y.mjs` with an issue link. The run also fails when a known violation stops occurring, so the list only shrinks.

`npm run check:components` fails when a COMPONENTS.md example uses a `.cr-*` class that `components.css` doesn't define.

`npm run test:palette` counts the color custom properties in `tokens.css` with the browser's CSS engine and checks that the palette story renders exactly that set.

The test scripts drive the installed Google Chrome through `playwright-core`, so they don't download a browser.

### Composition refs

`refs` in `.storybook/main.js` is empty on purpose. Each repo's Storybook joins by reference once it builds and has a URL. The courtneyr-child site Storybook is next. Don't add a ref for a Storybook that doesn't exist yet. An entry looks like:

```js
refs: {
  'courtneyr-child': { title: 'courtneyr.dev theme', url: 'https://example.invalid/storybook' },
},
```

---

## Versioning

The tokens follow [Semantic Versioning](https://semver.org/). `package.json` holds the version:

- **Major.** A token or class is removed or renamed, or changes meaning.
- **Minor.** A token or class is added.
- **Patch.** A value changes and keeps its meaning, such as a contrast fix.

The `tokens.css` header, `brand/brand.json`, the badge above and the Version section below carry the same number. `npm run check:version` fails when any of them disagree. Versions 2.1 through 2.3 shipped in commit messages only, and 2.4.0 brings every place back in line.

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

**v2.4.0** adds `--cr-light-gray` (`#ebebeb`), the 11th brief color. It's a surface color: see "Light gray contrast" in `DESIGN.md` before putting text on it. Also adds the composition-host Storybook and the version check.

**v2.0.0** — Zine pivot. Selective merge from v1.1: button family preserved (zine-restyled), post-type chips restyled as masking-tape, stream-item structure preserved (zine-restyled), shape-layering deprecated entirely.

Generated in collaboration with Claude.
