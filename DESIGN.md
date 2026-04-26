---
version: alpha
name: courtneyr.dev
description: >
  Personal site with the voice of a patient teacher and the visual confidence
  of a hand-pasted zine. WordPress + IndieWeb + AA contrast.
  Guiding principle: decoration in margins, calm in measure.

colors:
  # ---- Spec idioms (primary / secondary / tertiary / accent / neutral) ----
  primary: "#241c4a" # Russian Violet — main ink, headings, nav
  secondary: "#126782" # Cerulean — links, muted ink, callout bg
  tertiary: "#fb8500" # UT Orange — primary CTA, marker bar, sparkles
  accent: "#ffb703" # Selective Yellow — highlighter, focus ring
  neutral: "#fbfaf5" # Printer Ivory — page surface (light)
  neutral-dark: "#1a1714" # Photocopier Black — page surface (dark)

  # ---- Surface variants ----
  surface-elevated: "#ffffff"
  surface-elevated-dark: "#251f1c"
  surface-soft: "#fee2c3"

  # ---- Specialty inks (AA-validated text-on-color pairs) ----
  on-tertiary: "#023047" # Prussian Blue on UT Orange — 5.58:1 AA
  on-accent: "#023047" # Prussian Blue on Selective Yellow — 7.93:1 AAA
  on-secondary: "#fbfaf5" # Ivory on Cerulean — 6.11:1 AA
  ink-muted: "#126782" # = secondary
  ink-soft: "#4a4566"

  # ---- Palette extensions referenced by components ----
  sky-blue: "#8ecae6" # accent-block-1 bg, button-secondary text
  blue-green: "#219ebc" # post-type: link
  periwinkle: "#bcb5e3" # accent-block-2 bg, dark-mode ink-muted
  glaucous: "#647baf" # background only — fails AA as small text
  prussian-blue: "#023047" # = on-tertiary alias, callout-note bg
  light-orange: "#fee2c3" # = surface-soft alias, callout-note text

  # ---- Masking-tape (chip background) ----
  tape: "#f3e5b8"
  on-tape: "#241c4a" # = primary, 12.47:1 on tape — AAA at small sizes

  # ---- Post-type taxonomy (IndieWeb) ----
  type-blog: "#fb8500"
  type-link: "#219ebc"
  type-video: "#126782"
  type-audio: "#126782"
  type-quote: "#241c4a"
  type-aside: "#647baf"
  type-status: "#647baf"
  type-speaking: "#ffb703"
  type-book: "#241c4a"

typography:
  display:
    fontFamily: "Rock Salt"
    fontSize: 3.75rem
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: -0.01em
  h1:
    fontFamily: "Roboto Slab"
    fontSize: 3rem
    fontWeight: 900
    lineHeight: 1.15
    letterSpacing: -0.01em
  h2:
    fontFamily: "Roboto Slab"
    fontSize: 2.25rem
    fontWeight: 800
    lineHeight: 1.15
  h3:
    fontFamily: "Roboto Slab"
    fontSize: 1.875rem
    fontWeight: 700
    lineHeight: 1.15
  h4:
    fontFamily: "Roboto Slab"
    fontSize: 1.5rem
    fontWeight: 700
    lineHeight: 1.35
  h5:
    fontFamily: "Roboto Slab"
    fontSize: 1.25rem
    fontWeight: 700
  h6:
    fontFamily: "Roboto Slab"
    fontSize: 1.125rem
    fontWeight: 700
    letterSpacing: 0.05em
  lead:
    fontFamily: "Roboto Slab"
    fontSize: 1.5rem
    fontWeight: 400
    lineHeight: 1.35
  body-md:
    fontFamily: "Barlow"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "Barlow"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.55
  pull-quote:
    fontFamily: "Roboto Slab"
    fontSize: 1.875rem
    fontWeight: 400
    lineHeight: 1.35
  blockquote:
    fontFamily: "Roboto Slab"
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.55
  eyebrow:
    fontFamily: "Roboto Slab"
    fontSize: 0.875rem
    fontWeight: 700
    letterSpacing: 0.12em
  meta:
    fontFamily: "Roboto Slab"
    fontSize: 0.75rem
    fontWeight: 700
    letterSpacing: 0.12em
  button:
    fontFamily: "Roboto Slab"
    fontSize: 1.125rem
    fontWeight: 700
  chip:
    fontFamily: "Roboto Slab"
    fontSize: 0.75rem
    fontWeight: 700
    letterSpacing: 0.12em
  label:
    fontFamily: "Roboto Slab"
    fontSize: 1rem
    fontWeight: 600
  code:
    fontFamily: "ui-monospace"
    fontSize: 0.9em

rounded:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 20px
  xl: 32px
  "2xl": 48px
  full: 9999px

spacing:
  "3xs": 2px
  "2xs": 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  "2xl": 48px
  "3xl": 72px
  "4xl": 96px

components:
  # ---------- Buttons (full family — sharp corners, hard shadows) ----------
  button:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    rounded: 0
    padding: 12px 24px
  button-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.sky-blue}"
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    typography: "{typography.button}"
    rounded: 0
    padding: 12px 24px
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.sky-blue}"
  button-secondary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.sky-blue}"
    typography: "{typography.button}"
    rounded: 0
    padding: 12px 24px
  button-secondary-hover:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.neutral}"
  button-outline:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    rounded: 0
    padding: 12px 24px
  button-outline-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
  button-soft:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    rounded: 0
    padding: 12px 24px
  button-soft-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
  cta: # alias for button-primary
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    typography: "{typography.button}"
    rounded: 0
    padding: 12px 24px

  # ---------- Chips (post-type taxonomy) ----------
  # v2.1 — chip background is IVORY (was masking tape in v2.0). The cream-tape
  # vocabulary is preserved for eyebrows + callout labels but not chips, because
  # too few palette colors passed AA on tape. On ivory, 6 palette accents pass:
  # russian-violet, cerulean, prussian-blue, blue-green, glaucous, plus black.
  # 18 post types map to these 6 accents in 6 thematic groups; the icon shape
  # carries per-type identification within a group.
  # All chip defaults: russian-violet text on ivory (15:1 AAA).
  # Per-type modifiers add a 4px left border in the post-type color.
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-tape}" # russian-violet — 15:1 on ivory
    typography: "{typography.chip}"
    rounded: 0
    padding: 2px 12px
  chip-blog:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-tape}" # russian-violet — 15:1 on ivory
    typography: "{typography.chip}"
  chip-link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-tape}" # russian-violet — 15:1 on ivory
    typography: "{typography.chip}"
  chip-video:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-tape}" # russian-violet — 15:1 on ivory
    typography: "{typography.chip}"
  chip-audio:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-tape}" # russian-violet — 15:1 on ivory
    typography: "{typography.chip}"
  chip-quote:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-tape}" # russian-violet — 15:1 on ivory
    typography: "{typography.chip}"
  chip-aside:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-tape}" # russian-violet — 15:1 on ivory
    typography: "{typography.chip}"
  chip-status:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-tape}" # russian-violet — 15:1 on ivory
    typography: "{typography.chip}"
  chip-speaking:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-tape}" # russian-violet — 15:1 on ivory
    typography: "{typography.chip}"
  chip-book:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-tape}" # russian-violet — 15:1 on ivory
    typography: "{typography.chip}"

  # Solid chips — post-type color fills the chip, text adapts for AA
  chip-blog-solid:
    backgroundColor: "{colors.type-blog}"
    textColor: "{colors.on-tertiary}" # 5.58:1 AA
    typography: "{typography.chip}"
    rounded: 0
    padding: 2px 12px
  chip-link-solid:
    backgroundColor: "{colors.type-link}"
    textColor: "{colors.primary}" # 4.99:1 AA
    typography: "{typography.chip}"
    rounded: 0
    padding: 2px 12px
  chip-video-solid:
    backgroundColor: "{colors.type-video}"
    textColor: "{colors.neutral}" # 6.11:1 AA
    typography: "{typography.chip}"
    rounded: 0
    padding: 2px 12px
  chip-audio-solid:
    backgroundColor: "{colors.type-audio}"
    textColor: "{colors.neutral}" # 6.11:1 AA
    typography: "{typography.chip}"
    rounded: 0
    padding: 2px 12px
  chip-quote-solid:
    backgroundColor: "{colors.type-quote}"
    textColor: "{colors.neutral}" # 15.00:1 AAA
    typography: "{typography.chip}"
    rounded: 0
    padding: 2px 12px
  chip-speaking-solid:
    backgroundColor: "{colors.type-speaking}"
    textColor: "{colors.on-accent}" # 7.93:1 AAA
    typography: "{typography.chip}"
    rounded: 0
    padding: 2px 12px
  chip-book-solid:
    backgroundColor: "{colors.type-book}"
    textColor: "{colors.neutral}" # 15.00:1 AAA
    typography: "{typography.chip}"
    rounded: 0
    padding: 2px 12px
  # NOTE: chip-{aside,chat,status}-solid intentionally omitted —
  # glaucous (the small-group accent) fails AA against both light and dark text
  # when used as a chip background. Use the default chip variant for these
  # types: ivory background + glaucous border + russian-violet text.

  # ---------- Containers (callout, card, accent blocks, toc) ----------
  callout:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.neutral}"
    padding: 16px 24px
  callout-note:
    backgroundColor: "{colors.prussian-blue}"
    textColor: "{colors.light-orange}"
    padding: 16px 24px
  callout-warn:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    padding: 16px 24px
  callout-label: # masking-tape badge inside callout
    backgroundColor: "{colors.tape}"
    textColor: "{colors.on-tape}"
    typography: "{typography.eyebrow}"
    padding: 2px 12px
  card:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.primary}"
    padding: 24px
  toc:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.primary}"
    padding: 16px 24px
  toc-heading:
    typography: "{typography.eyebrow}"
    textColor: "{colors.primary}"
  accent-block-1:
    backgroundColor: "{colors.sky-blue}"
    textColor: "{colors.primary}"
    padding: 32px
  accent-block-2:
    backgroundColor: "{colors.periwinkle}"
    textColor: "{colors.primary}"
    padding: 32px
  accent-block-3:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.primary}"
    padding: 32px

  # ---------- Hero & layout ----------
  hero:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    padding: 72px 32px
  hero-display: # Rock Salt
    typography: "{typography.display}"
    textColor: "{colors.primary}"
  hero-title: # Roboto Slab black weight
    typography: "{typography.h1}"
    textColor: "{colors.primary}"
  hero-title-accent: # color shift inside __title
    textColor: "{colors.tertiary}"
  hero-lead:
    typography: "{typography.lead}"
    textColor: "{colors.ink-muted}"
  reading:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    padding: 48px 16px
    width: 65ch

  # ---------- Stream / feed ----------
  stream:
    backgroundColor: "{colors.neutral}"
    padding: 32px
    width: 80ch
  stream-item:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    padding: 24px 0
  stream-item-avatar:
    typography: "{typography.h3}"
    textColor: "{colors.primary}"
  stream-item-meta:
    typography: "{typography.meta}"
    textColor: "{colors.ink-muted}"
  stream-item-title:
    typography: "{typography.h4}"
    textColor: "{colors.primary}"
  stream-item-tags:
    padding: 8px 0

  # ---------- Inline & decorative ----------
  display:
    typography: "{typography.display}"
    textColor: "{colors.primary}"
  eyebrow:
    typography: "{typography.eyebrow}"
    textColor: "{colors.tertiary}"
  highlight:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.primary}"
    padding: 0 2px
  pull-quote:
    typography: "{typography.pull-quote}"
    textColor: "{colors.primary}"
    padding: 24px 0
  tape: # standalone masking-tape label
    backgroundColor: "{colors.tape}"
    textColor: "{colors.on-tape}"
    typography: "{typography.eyebrow}"
    padding: 4px 12px
  marker-bar: # 8px UT Orange section divider, rotated
    backgroundColor: "{colors.tertiary}"
    height: 8px
  marker-bar-short:
    backgroundColor: "{colors.tertiary}"
    height: 6px
    width: 8rem
  sparkle: # decorative ✦ — always aria-hidden
    textColor: "{colors.tertiary}"
    typography: "{typography.h4}"
  sparkle-margin: # absolutely positioned variant
    textColor: "{colors.accent}"
  halftone: # dot overlay (background utility)
    backgroundColor: "{colors.neutral}"
  skip-link: # accessibility — hidden until focused
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    padding: 12px 16px
---

# DESIGN.md — courtneyr.dev

## Overview

courtneyr.dev is the personal site of Courtney Robertson — Senior Open Source Developer Advocate at GoDaddy, WordPress contributor, co-founder of WP Community Collective, IndieWeb participant.

The brand pairs the voice of a patient teacher with the visual confidence of a hand-pasted zine. The guiding principle: **decoration in margins, calm in measure.**

What that means in practice:

- **Reading content** (blog posts, long-form, docs) stays calm. Body text is Barlow on printer ivory. Tables are un-rotated. Measure stays at `65ch`. Zine accents appear at the edges — TOC card, callouts, eyebrows, masking tape on a section header.
- **Marketing/landing** (the homepage hero, marketing pages) gets the full treatment. Rock Salt display, halftone surfaces, accent blocks, sparkles, slight rotation.

The two modes coexist deliberately. Don't apply zine treatment to body content. Don't make marketing pages calm.

The system targets **AA contrast minimum** for every text-on-surface combination. Equalize Digital Accessibility Checker Pro is active in the editor. Where AA is structurally not possible (e.g., glaucous backgrounds, ut-orange text on warm surfaces), the variant is dropped rather than allowed to fail.

## Colors

Five tokens drive everything:

- **Primary** `#241c4a` (Russian Violet) — main ink for headings, body text, navigation. The default text color across the system.
- **Secondary** `#126782` (Cerulean) — link color, muted ink, callout background. Slightly lower contrast than primary; used for supporting text and focused-attention surfaces.
- **Tertiary** `#fb8500` (UT Orange) — primary CTA, marker bar, sparkles. The single warmest color in the system; high visibility, used sparingly for "pay attention to this."
- **Accent** `#ffb703` (Selective Yellow) — highlighter swipe, focus ring, dark-mode primary CTA. Pairs with Prussian Blue ink (`#023047`).
- **Neutral** `#fbfaf5` (Printer Ivory) — page surface in light mode. _Not_ warm cream — that fought the yellow highlighter. The cooler ivory keeps the highlight feeling distinct.

Light-mode dark surface is `#1a1714` (Photocopier Black) — not Prussian Blue. Prussian Blue was the dark surface in v1.x; v2.0 flipped to photocopier black so hard shadows can recolor to selective yellow and stay visible.

### Locked color decisions

| Decision                                     | Why                                                                           |
| -------------------------------------------- | ----------------------------------------------------------------------------- |
| `figcaption` is **cerulean**, not glaucous   | Glaucous on cream is 3.5:1 — fails AA                                         |
| `dfn` has no underline                       | It looks like a link otherwise                                                |
| Tables stay un-rotated                       | Tables exist to be scanned, not stylized                                      |
| Surface is **printer ivory**, not warm cream | Warm cream fought the yellow highlighter                                      |
| Wordmark renders as all-paths SVG            | No font dependency at runtime                                                 |
| `aria-hidden="true"` decorative SVGs         | Equalize Digital warnings on these are correct-implementation safe-to-dismiss |

### Post-type taxonomy

The IndieWeb post types each map to a token color. These appear in the system as `.cr-chip--{type}` left-border accents and as `.cr-stream-item--{type}` per-type avatar accents.

| Type     | Emoji | Color                      | Token                  |
| -------- | ----- | -------------------------- | ---------------------- |
| Blog     | 📰    | UT Orange `#fb8500`        | `colors.type-blog`     |
| Link     | 🔗    | Blue-Green `#219ebc`       | `colors.type-link`     |
| Video    | 📹    | Cerulean `#126782`         | `colors.type-video`    |
| Audio    | 🎧    | Cerulean `#126782`         | `colors.type-audio`    |
| Quote    | 🔖    | Russian Violet `#241c4a`   | `colors.type-quote`    |
| Aside    | 🗯️    | Glaucous `#647baf`         | `colors.type-aside`    |
| Status   | 🖊️    | Glaucous `#647baf`         | `colors.type-status`   |
| Speaking | 🗣️    | Selective Yellow `#ffb703` | `colors.type-speaking` |
| Book     | 📚    | Russian Violet `#241c4a`   | `colors.type-book`     |

Post-type colors only appear as **chip border accents** (4px left), as solid chip backgrounds (where AA permits), and as decorative avatar accents. They never appear as small text on the page surface.

## Dark Mode

Dark mode is built on token reassignment, not a separate stylesheet. Every semantic color token has a dark-mode value in the `@media (prefers-color-scheme: dark)` block of `tokens/tokens.css`. Raw palette tokens (`--cr-russian-violet`, `--cr-selective-yellow`, etc.) **do not change between modes** — only semantic tokens are reassigned to point at different palette entries. Components and pages that consume only semantic tokens flip automatically.

### Activation

`@media (prefers-color-scheme: dark)` is currently the only activation mechanism. The system honors the user's OS-level preference. A `[data-theme="dark"]` attribute selector parallel to the media query is reserved for future manual-toggle work but is not wired up today.

### Surface stack

| Role                               | Light                   | Dark                        |
| ---------------------------------- | ----------------------- | --------------------------- |
| Page (`--cr-surface`)              | Printer Ivory `#fbfaf5` | Photocopier Black `#1a1714` |
| Soft panel (`--cr-surface-soft`)   | Light Orange `#fee2c3`  | Prussian Blue `#023047`     |
| Elevated (`--cr-surface-elevated`) | Printer Ivory           | Night Elevated `#251f1c`    |

### Hard shadows

Hard shadows recolor in dark mode. `--cr-shadow-hard` flips from `4px 4px 0 var(--cr-ink)` (russian violet on ivory) to `4px 4px 0 var(--cr-selective-yellow)` so the zine signature stays visible against photocopier black.

### Tape

Cream tape `#f3e5b8` reads as ivory-on-ivory in dark mode, so `--cr-tape` reassigns to `#4a3f1c` (warm aged kraft) and `--cr-tape-ink` flips to selective yellow. Three light-mode elements use tape: eyebrow tape strips, callout labels, and the wordmark sticker. (Chips no longer use tape — v2.1 moved chip background to `--cr-surface`.)

Selective yellow on `#4a3f1c` measures ≈7.0:1 — clears AA Large at any size and AAA at 18pt+.

### Chip behavior

Chips compose three tokens that all flip:

1. **Surface** — `--cr-surface` (chip bg) flips ivory → photocopier black.
2. **Border accent** — the 4px left edge uses the post-type token (`--cr-type-blog`, etc.). In light mode each token points at a darker palette color (russian violet, prussian blue, cerulean, black, blue-green, glaucous). In dark mode it re-points at a brighter end-of-palette equivalent (selective yellow, periwinkle, sky blue, white, blue-green, glaucous) so the edge stays visible against dark tape and dark surfaces.
3. **Solid chip text** — when light-end accents become the chip _background_ in dark mode, text would fail contrast against printer ivory. The `@media (prefers-color-scheme: dark)` block in `components/components.css` flips solid-chip text to russian violet for the longform, shares, events, and impact groups. Media group (blue-green) keeps prussian blue text in both modes.

Three small-group post types — **aside, chat, status** — intentionally have no `.cr-chip--solid` variant in either mode. Glaucous `#647baf` fails AA against both ivory and russian violet, so the bordered variant is the only available form.

### AA verification

Most-used dark-mode pairings, all measured at the dark surface stack:

| Pairing                                                     | Use            | Ratio      |
| ----------------------------------------------------------- | -------------- | ---------- |
| Printer ivory text on photocopier black                     | Body copy      | 16.4:1 AAA |
| Sky blue links on photocopier black                         | Inline link    | 9.7:1 AAA  |
| Periwinkle muted ink on photocopier black                   | Meta, captions | 9.1:1 AAA  |
| Selective yellow on `#4a3f1c` (tape)                        | Tape ink       | 7.0:1 AAA  |
| Russian violet on selective yellow (longform solid chip)    | Chip text      | 8.5:1 AAA  |
| Russian violet on sky blue (shares solid chip)              | Chip text      | 9.3:1 AAA  |
| Russian violet on periwinkle (events solid chip)            | Chip text      | 7.9:1 AAA  |
| Russian violet on white (impact solid chip)                 | Chip text      | 15.0:1 AAA |
| Prussian blue on blue-green (media solid chip — both modes) | Chip text      | 4.9:1 AA   |

### What is intentionally not theme-aware

The kit sidebar (`ui_kits/courtneyr-dev/kit.css`) uses raw palette tokens directly (`--cr-russian-violet` background, `--cr-printer-ivory` text). It stays the same in both modes by design — the sidebar reads as a fixed branded surface against either page background. Documentation swatches in `tokens.html` likewise display literal palette hex values; that is correct.

## Typography

Four fonts, four jobs.

- **Rock Salt** (display) — wordmark and short hero displays. Loud, expensive, marker-dense. Display only — never body text, never repeated within a single screen. The wordmark itself is delivered as all-paths SVG, so the page renders cleanly even if Rock Salt fails to load.
- **Roboto Slab** (accent) — section headings, eyebrows, blockquote, stream titles, button labels, chips. Weight 700–900 for headings, 400 for slab-italic blockquote. The warm slab serif voice that doesn't compete with Rock Salt.
- **Barlow** (body) — paragraph text, UI, navigation, meta. Weight 400–500. Excellent body legibility.
- **System mono** (code) — code samples, `<kbd>`, `<samp>`, `<var>`. Stack: `ui-monospace, "SF Mono", Menlo, Consolas, monospace`.

Do not introduce additional font families.

### Role guidance

| Role          | Family             | Weight  | Notes                                        |
| ------------- | ------------------ | ------- | -------------------------------------------- |
| Wordmark      | Rock Salt          | 400     | Lowercase, all-paths SVG                     |
| Hero display  | Rock Salt          | 400     | Keep copy under ~6 words                     |
| Hero title    | Roboto Slab        | 900     | Roboto Slab when Rock Salt would be too loud |
| Section h2    | Roboto Slab        | 800     | Warm and assertive                           |
| Subsection h3 | Roboto Slab        | 700     |                                              |
| Stream title  | Roboto Slab        | 700     | Slab serif so post titles feel substantial   |
| Eyebrow       | Roboto Slab        | 700     | Block-level, NOT inline-block. UT Orange.    |
| Body          | Barlow             | 400–500 |                                              |
| Meta / chip   | Roboto Slab        | 700     | Uppercase, tracked 0.12em                    |
| Quote         | Roboto Slab italic | 400     | Default `<blockquote>` and `.cr-pull-quote`  |
| Mono          | system mono        | 400     |                                              |

## Layout

Reading containers cap at `65ch` (`spacing.measure`). Generous spacing between sections — minimum `48px` (`spacing.2xl`).

Two layout modes:

**Reading layout** — `.cr-reading` wrapper. Long-form blog posts, articles, docs. Body Barlow, eyebrows in Roboto Slab, callouts and TOC carry the zine accents in the margins. The body itself stays calm.

**Hero/marketing layout** — `.cr-hero` wrapper. Halftone overlay on printer-ivory base, centered `__inner` (max 60rem), display heading (`__display` Rock Salt or `__title` Roboto Slab), `__lead` paragraph, CTA buttons. Sparkles in margins, marker bars between sections, accent blocks for three-up feature areas.

The homepage is hybrid: hero + newsletter at the top, **aggregate stream feed** (`.cr-stream` containing `.cr-stream-item` with full per-type structure) below, mixing all post types chronologically.

### Spacing scale

T-shirt scale, 3xs (2px) through 4xl (96px). See YAML front matter for exact values. Use `spacing.md` (16px) as the default rhythm unit. Use `spacing.2xl` (48px) and above for inter-section gaps. Avoid arbitrary pixel values in components.

## Elevation & Depth

The depth idiom is **photocopier**, not blurred. Hard offset shadows with no blur radius. Two values:

- `4px 4px 0 var(--cr-ink)` — default for callouts, accent blocks, button resting state, `<pre>` blocks
- `6px 6px 0 var(--cr-ink)` — heavier; reserved for `.cr-card` to feel "tossed on top"

In dark mode, hard shadows recolor to selective yellow so the zine signature stays visible against the photocopier-black surface.

A small soft scale exists for legacy components and unobtrusive depth:

- `--cr-shadow-sm` — chip subtle drop (1px)
- `--cr-shadow-md`, `--cr-shadow-lg` — reserved; not used in v2.0 components

**Don't combine soft and hard shadows on the same element.** Pick one. Don't introduce new shadow values without naming them in `tokens.css` first.

Z-index is intentionally minimal:

- `0` (default) for all component layout
- `1–9` for hero overlays (halftone over fiber background)
- `10000+` reserved for the skip link, modal scrim if added later

Hard shadows already provide visual layering. If a card needs to "lift" above neighbors, use `--cr-shadow-hard-2` rather than reaching for `z-index`.

## Shapes

The rotation budget is **four locked values**:

| Token              | Value     | Used on                                                    |
| ------------------ | --------- | ---------------------------------------------------------- |
| `--cr-rotate-1`    | `-1.2deg` | `<hr>`, `.cr-marker-bar--short`, `.cr-card`, callout label |
| `--cr-rotate-2`    | `1.5deg`  | `.cr-marker-bar`                                           |
| `--cr-rotate-neg`  | `-2.5deg` | `.cr-tape`, `.cr-chip` (default), stream-item avatar       |
| `--cr-rotate-neg2` | `2.8deg`  | adjacent `.cr-chip + .cr-chip` (alternates)                |

Don't introduce more rotation values. Don't override these with explicit per-element angles.

**The rotation rule:** Decoration rotates. Content stays upright.

- Rotated: cards, chips, tape labels, callout labels, marker bars, stream-item avatars
- Upright: prose paragraphs, headings, tables, figures, reading containers, hero `__inner`

Two-layer rotation max — typically tape-on-card (card at `-1.2°`, tape at `-2.5°`) or chip-on-stream-item (avatar at `-2.5°`, chip alternating). Three or more rotated layers reads as chaos.

**Borders:**

- `2px solid var(--cr-ink)` — thick — for callouts, accent blocks, cards, buttons
- `1px solid var(--cr-rule)` — thin — for tables, details

No rounded corners on zine components. The radius scale exists for legacy components (image frames in stream items, soft buttons, form inputs) but zine-aesthetic elements stay sharp.

## Components

The component inventory is in the YAML front matter. The `.cr-*` prefix is the project's namespace. Full HTML examples and use guidance live in `docs/COMPONENTS.md`. What follows summarizes what each class is for.

### Buttons (full family — zine restyled)

- `.cr-button` — default; ivory bg, primary text, hard shadow
- `.cr-button--primary` — UT Orange CTA
- `.cr-button--secondary` — Russian Violet bg, sky-blue text
- `.cr-button--outline` — transparent bg, primary text
- `.cr-button--soft` — light-orange bg
- `.cr-cta` — alias for `.cr-button--primary`

All buttons share: sharp corners, thick border, hard offset shadow, "press" effect on `:active` (translates 2px down/right, shrinks shadow). All variants pass AA contrast or better.

### Chips (post-type taxonomy + masking-tape)

- `.cr-chip` (default) — tape bg, primary text, transparent left border
- `.cr-chip--{blog|link|video|audio|quote|aside|status|speaking|book}` — adds 4px post-type-colored left border accent
- `.cr-chip--solid` — fills with post-type color, text adapts for AA

**Aside and status do not support `.cr-chip--solid`** (glaucous fails AA against both light and dark text — use the default variant).

### Hero (composition)

- `.cr-hero` — wrapper with halftone surface
- `.cr-hero__inner` — centered max-width container
- `.cr-hero__display` — Rock Salt heading (short copy only)
- `.cr-hero__title` — Roboto Slab heading (longer copy)
- `.cr-hero__title--accent` — UT Orange recolor for a phrase inside `__title`
- `.cr-hero__lead` — slab serif lead paragraph

### Stream (homepage feed)

- `.cr-stream` — container
- `.cr-stream-item` — feed item; 2-column grid (avatar | body); marker-bar separator
- `.cr-stream-item__avatar`, `__body`, `__meta`, `__title`, `__tags` — sub-elements
- `.cr-stream-item--{type}` — per-type avatar color

### Containers & emphasis

- `.cr-callout` (and `--note`, `--warn` modifiers) — info box with masking-tape label
- `.cr-card` — hard-shadowed, slightly rotated card
- `.cr-toc` (with `__heading`) — light-orange table-of-contents
- `.cr-accent-block` (and `--1`, `--2`, `--3`) — sectional surface treatments
- `.cr-pull-quote` — Roboto Slab italic, marker bars top and bottom

### Inline & decorative

- `.cr-display` — standalone Rock Salt heading
- `.cr-eyebrow` — block-level UT Orange kicker
- `.cr-highlight` — yellow-highlighter swipe behind inline text
- `.cr-tape` — masking-tape inline label
- `.cr-marker-bar` (with `--short`) — UT Orange section divider
- `.cr-sparkle` (with `--margin`) — decorative `✦` (always `aria-hidden="true"`)
- `.cr-halftone` (with `--soft`) — dot overlay background utility

### Layout & accessibility

- `.cr-reading` — long-form reading container (max 65ch)
- `.cr-skip-link` — hidden until focused; first child of `<body>`
- `.cr-rotate-{1,2,neg,neg2}` — rotation utilities (use sparingly)

## Do's and Don'ts

### Do

- Treat **AA contrast as the floor** for every text-on-surface pair. The system has been audited; new components must be checked against the same standard.
- Use **semantic color tokens** (`primary`, `secondary`, `tertiary`, `accent`, `neutral`, `on-tertiary`, etc.) rather than raw palette names when defining new components.
- **Apply zine treatment in the margins** — eyebrows, callouts, accent blocks, tape labels, sparkles, marker bars. Keep prose, headings, and tables calm.
- **Honor the rotation budget** — four values, no more.
- **Use hard offset shadows with no blur** for primary depth. The photocopier idiom is the system's signature.
- **Keep Rock Salt to display roles only** — wordmark and short hero displays. Never body text.
- **Mark decorative SVGs `aria-hidden="true"`** and `focusable="false"`. Equalize Digital warnings on these are correct-implementation safe-to-dismiss.
- **Use the post-type taxonomy** for IndieWeb content classification. The token colors and chip variants are designed around it.

### Don't

- **Don't introduce new fonts.** Rock Salt + Roboto Slab + Barlow + system mono only.
- **Don't use Automattic or Awesome Motive products** in suggestions or recommendations (owner preference).
- **Don't recommend replacing Yoast SEO** with alternatives (it's chosen).
- **Don't auto-fix Permissions-Policy or CSP headers** — those live in a custom plugin and at the WAF (Sucuri) layer.
- **Don't suggest removing inactive plugins or themes.** They are intentional.
- **Don't use purple-gradient-on-white backgrounds** (cliché).
- **Don't introduce new rotation values** beyond the four locked tokens. Don't override them with inline angles.
- **Don't introduce new shadow values** without naming them in `tokens.css` first.
- **Don't auto-apply zine treatment to body content.** Decoration in margins, calm in measure.
- **Don't reproduce the v1.x shape-layering pattern** (soft circle behind portrait + floating badge). Removed in v2.0; zine vocabulary handles all depth now.
- **Don't use glaucous as small text on light surfaces.** It fails AA at 3.5:1.
- **Don't combine soft and hard shadows** on the same element. Pick one.
- **Don't auto-fix `DISABLE_WP_CRON=true`.** That's correct on GoDaddy. Late `action_scheduler_run_queue` is expected.

---

_See also: `docs/AI_CONTEXT.md` for site context and constraints; `docs/COMPONENTS.md` for class-by-class HTML examples; `docs/LAYERING.md` for rotation/depth/z-index details; `docs/IMPLEMENTATION.md` for WordPress + Ollie integration._
