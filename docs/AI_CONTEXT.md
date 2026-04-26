# AI Context — courtneyr.dev Design System

**Read this first if you are generating designs, UI, content, or assets for courtneyr.dev.**

---

## Who this is for

Courtney Robertson — Senior Open Source Developer Advocate at GoDaddy, WordPress contributor, co-founder of WP Community Collective. Teacher at Learn.WordPress.org since 2014. Publisher of two plugins on WordPress.org ("Post Formats for Block Themes" and "Link Extension for XFN"). Aligned with IndieWeb principles.

## Site context

- **Platform:** WordPress (since 2007, custom DB prefix `wp_38b546a172_`)
- **Theme:** Ollie block theme (with Ollie Pro)
- **Hosting:** GoDaddy Managed WordPress (MWPv2) with bundled Sucuri WAF
- **Server-side cron:** `DISABLE_WP_CRON=true` is correct, not a bug. Late `action_scheduler_run_queue` is expected.
- **Deployment:** GitHub Actions from `courtneyr-dev/courtneyr-dev-site` to GoDaddy via `gd-wordpress-deployer`. Custom code only — never WordPress core, never third-party plugins.
- **CSP:** Lives in custom `font-display-swap-site-performance-security` plugin via the `send_headers` hook. Currently in Report-Only mode. WAF-level headers were disabled by Sucuri support.
- **Font system:** Rock Salt (display) + Roboto Slab (accent) + Barlow (body) + system mono (code). All three webfonts loaded via Ollie's font library. Do NOT swap them.
- **Active IndieWeb plugins:** Post Formats for Block Themes, Link Extension for XFN, ActivityPub, IndieWeb, IndieWeb Post Kinds
- **Accessibility target:** WCAG AA minimum, AAA where achievable. Equalize Digital Accessibility Checker Pro is active in the editor.

## Brand direction in one sentence

Personal site with the voice of a patient teacher and the visual confidence of a hand-pasted zine. WordPress + IndieWeb + AA contrast.

The guiding principle:

> **Decoration in margins, calm in measure.**

What this means in practice:

- **Reading content** — blog posts, long-form — stays calm. Body text is Barlow on printer ivory. Tables are un-rotated. The measure (`65ch`) is respected. Zine moments appear at the edges: TOC card, callout, eyebrow, masking tape on a section header.
- **Marketing/landing** — hero sections, the homepage — gets the full treatment. Rock Salt display, big halftone surfaces, accent blocks, sparkles, rotation.

Don't apply the loud zine treatment to body content. Don't make the marketing pages calm. The two modes coexist deliberately.

## Visual identity — the three moves

### 1. Palette split
- **Primary (CTAs, marker bar, sparkles):** Ut Orange `#fb8500`
- **Highlighter:** Selective Yellow `#ffb703`
- **Ink:** Russian Violet `#241c4a`
- **Soft signature, accent block 1:** Sky Blue `#8ecae6`
- Everything else supports. Do not let secondary colors dominate a composition.

### 2. Zine vocabulary
Hard offset shadows (`4px 4px 0` and `6px 6px 0`, no blur). Slight rotation (-1.2°, 1.5°, -2.5°, 2.8°). Hand-drawn highlighters. Halftone overlays on hero surfaces. Sparkles in margins. Masking-tape labels for tags and callout headers. UT Orange marker stripes between sections.

The depth idiom is hard, photocopied, hand-applied — not soft, blurred, or polished.

### 3. Three (well, four) fonts, four jobs
- **Rock Salt** — wordmark, hero displays kept short. Display only.
- **Roboto Slab** — section headings, eyebrows, blockquote, stream titles. Weight 700–900.
- **Barlow** — body, UI, buttons, navigation, meta. Weight 400–600.
- **system mono** — code, kbd, samp, var.

Do not introduce additional font families.

## Locked decisions you should never silently overturn

These came out of real iteration. Each has a reason.

| Decision | Why |
|---|---|
| `<dfn>` has no underline | It looks like a link otherwise. |
| `figcaption` is cerulean, not glaucous | Glaucous on cream is 3.5:1 — fails AA. |
| Tables are un-rotated | Tables exist to be scanned, not stylized. |
| Surface is *printer* ivory, not warm cream | Warm cream fought the yellow highlighter. |
| Eyebrow is `display: block`, not `inline-block` | Inline-block let it sit on the same line as the h2. |
| Wordmark is all-paths SVG | No font dependency. Works even if Rock Salt fails to load. |
| Rock Salt is display-only | It's an expensive, marker-dense font. Never used for body text. |
| `aria-hidden="true"` decorative SVG icons | Correct decorative implementation. Equalize Digital warnings on these are safe to dismiss via Ignore. |
| `DISABLE_WP_CRON=true` and late `action_scheduler_run_queue` | Expected on GoDaddy. Not actionable. |
| MathML uses Rock Salt for `<mi>`/`<mn>`/`<mtext>`/`<ms>` | Variables, numbers, and inline math text render in the handdrawn display font — like a teacher writing on a whiteboard. Operators (`<mo>`) keep a math-font fallback so Unicode math glyphs render correctly. |

## Layout principles

- Reading containers cap at `65ch` (`var(--cr-measure)`).
- Generous spacing between sections — minimum `var(--cr-space-2xl)` (3rem).
- Hard shadows on cards, callouts, accent blocks, the CTA buttons. No soft drop shadows except on legacy stream-item hover lift and chip subtle shadow.
- Slight rotation on accents (cards, masking tape, callout labels). Body text and headings stay upright.
- Hybrid homepage: hero + newsletter at top, **aggregate stream feed** below (mixes all post types chronologically — modeled on [nerdy.dev](https://nerdy.dev)).

## Post-type taxonomy (for the stream feed)

The taxonomy covers **18 post types**: WordPress's 10 standard post formats, plus `speaking` and `book` (Courtney's custom CPTs), plus 6 IndieWeb extensions. Each type maps to one of **6 AA-passing palette colors** grouped thematically. The icon shape is the primary identifier within a color group; the color tells you what *kind* of action this is.

| # | Type | Token | Accent | Group | Source |
|---|------|-------|--------|-------|--------|
| 01 | blog (default) | `--cr-type-blog` | russian-violet | longform / written | WP default |
| 02 | aside | `--cr-type-aside` | glaucous | small / interstitial | WP standard |
| 03 | image | `--cr-type-image` | blue-green | visual media | WP standard |
| 04 | gallery | `--cr-type-gallery` | blue-green | visual media | WP standard |
| 05 | video | `--cr-type-video` | blue-green | visual media | WP standard |
| 06 | audio | `--cr-type-audio` | black | impact / expression | WP standard |
| 07 | chat | `--cr-type-chat` | glaucous | small / interstitial | WP standard |
| 08 | status | `--cr-type-status` | glaucous | small / interstitial | WP standard |
| 09 | link | `--cr-type-link` | cerulean | shares / outbound | WP standard |
| 10 | bookmark | `--cr-type-bookmark` | cerulean | shares / outbound | IndieWeb |
| 11 | quote | `--cr-type-quote` | russian-violet | longform / written | WP standard |
| 12 | speaking | `--cr-type-speaking` | prussian-blue | events / judgment | Courtney CPT |
| 13 | book | `--cr-type-book` | russian-violet | longform / written | Courtney CPT |
| 14 | like | `--cr-type-like` | black | impact / expression | IndieWeb |
| 15 | repost | `--cr-type-repost` | cerulean | shares / outbound | IndieWeb |
| 16 | reply | `--cr-type-reply` | black | impact / expression | IndieWeb |
| 17 | event | `--cr-type-event` | prussian-blue | events / judgment | IndieWeb |
| 18 | review | `--cr-type-review` | prussian-blue | events / judgment | IndieWeb |

Why only 6 accents instead of 18? Math. Of the 11 brand palette colors, only 6 pass WCAG 1.4.11's 3:1 non-text contrast threshold against the ivory chip surface (`#fbfaf5`). Periwinkle, sky-blue, ut-orange, selective-yellow, light-orange, and gray are too light. Expanding the palette to support 18 distinct accents was rejected — palette discipline wins. The icon shape carries the per-type identification; the color carries the group.

These tokens map to `--cr-type-{type}` in `tokens.css`, applied via `.cr-chip--{type}` (chips with a 4px left border in the type's accent) and `.cr-stream-item--{type}` (per-type accent stripe on the stream feed).

**Dark-mode inversion:** the same groups invert to light-end palette colors (selective-yellow, sky-blue, periwinkle, blue-green, glaucous, white) on photocopier black. See dark-mode block in `tokens.css`.

## Dark mode

Triggered by `prefers-color-scheme: dark`. Optionally honored via a manual `[data-theme="dark"]` attribute on `<html>` (not currently implemented at the JS layer, but tokens.css accepts it without further changes).

Surface flips to **photocopier black** `#1a1714` (not Prussian Blue — that was v1.x). Ink flips to printer ivory. Selective yellow drives accents. Hard shadows recolor to selective yellow as well, so the zine signature stays visible against the dark surface.

Full token mapping in `tokens/tokens.css` under section 10 (dark mode flips).

## Motion

Subtle only. Gentle hover lifts on cards. Quick (80ms) "press" effect on buttons. All motion gated behind `@media (prefers-reduced-motion: no-preference)` — and the global reduced-motion block in tokens.css zeroes out all transitions and animations when the user prefers reduced motion.

## Voice & tone

- Warm, conversational, direct. Speaks in second person when addressing the reader.
- Shows her work — cites sources, names tools.
- **Avoid:** generic AI-speak (`delve`, `leverage`, `navigate the complexities`, `robust solution`), corporate filler, passive voice, em dashes (Courtney removes them in editing), brochure-style polish.
- **Favor:** specific nouns, concrete examples, plain language, technical when needed, the occasional pirate joke.

## Constraints / things to NOT do

- Do not add new fonts. Rock Salt + Roboto Slab + Barlow + system mono only.
- Do not use Automattic or Awesome Motive products in suggestions (user preference).
- Do not recommend replacing Yoast SEO with alternatives (it's chosen).
- Do not auto-fix Permissions-Policy or CSP headers — those live in a custom plugin and at the WAF layer.
- Do not suggest removing inactive plugins/themes — they are intentional.
- Do not use purple-gradient-on-white backgrounds (cliché).
- Do not introduce new rotation values beyond the four locked tokens.
- Do not introduce new shadow values without naming them in `tokens.css` first.
- Do not auto-apply zine treatment to body content. The principle is "decoration in margins, calm in measure."

## How to navigate as a fresh agent

1. Read this file (you're doing it).
2. Open `design-system/mockups/styleguide.html` in a browser. Scroll through. Toggle OS dark mode while scrolling — every block flips correctly.
3. Read `tokens/tokens.css` top to bottom. The order is intentional: raw palette → semantic tokens → typography → spacing → radius → shapes → motion → post-type tokens → texture → dark mode flips → element defaults → legacy defenses → reduced motion.
4. Read `components/components.css`. Each `.cr-*` class is documented inline with why it exists.
5. If asked to extend the system, propose changes in **semantic tokens first**, then components. Don't introduce new raw palette colors without owner sign-off.
6. If asked to add a new component, propose the class first, get approval, then write it.

## Repo map

```
courtneyr-design-system/
├── tokens/tokens.css              ← raw palette, semantic tokens, element defaults
├── components/components.css      ← .cr-* classes
├── brand/
│   ├── brand.json                 ← machine-readable spec
│   ├── wordmark.svg               ← all-paths SVG, no font dependency
│   ├── wordmark-preview.png
│   └── theme.json.fragment.json   ← Ollie integration starter
├── design-system/mockups/
│   ├── hero.html                  ← landing example, full zine treatment
│   ├── reading.html               ← blog post, calm-with-zine-accents
│   └── styleguide.html            ← every common HTML element, OS dark-mode flippable
├── docs/
│   ├── AI_CONTEXT.md              ← you are here
│   ├── COMPONENTS.md              ← class-by-class reference
│   ├── LAYERING.md                ← rotation, layering, z-index conventions (replaces SHAPE_LAYERING.md)
│   └── IMPLEMENTATION.md          ← how to wire into Ollie
├── demo/
│   ├── BrandSystem.jsx            ← deferred cleanup in v2.1
│   └── index.html                 ← deferred refresh in v2.1
└── README.md
```

## What's deferred to v2.1+

- `theme.json.fragment.json` expansion when wiring into the live site
- `demo/index.html` refresh as a quick-tour landing for the design system itself
- `demo/BrandSystem.jsx` cleanup (still references shape-layering and stale font names)
- Real-site deployment + Equalize Digital re-test
- Ollie child theme + Git Backup task (existing roadmap item in Things, Blog area)
- Perfmatters Script Manager scoping for Rock Salt (only loads on pages that use `.cr-display` or `.cr-hero__display`)

## Where to find more

- Full tokens: `tokens/tokens.css`
- Component classes: `components/components.css`
- Class-by-class reference: `docs/COMPONENTS.md`
- Machine-readable brand spec: `brand/brand.json`
- WordPress integration: `docs/IMPLEMENTATION.md`
- Layering / rotation / depth conventions: `docs/LAYERING.md`
- Three reference mockups: `design-system/mockups/`
