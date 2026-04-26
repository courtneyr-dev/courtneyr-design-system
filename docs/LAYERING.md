# Layering — Rotation, Depth, and Z-Index

How the zine vocabulary handles depth without falling into shape-layering or soft-blurred shadows.

This file replaces the deprecated `SHAPE_LAYERING.md`. The v1.x signature pattern (soft circle behind portrait + floating badge) was removed in v2.0. Zine vocabulary handles all depth now.

---

## The four-rotation budget

Only four rotation values exist. Don't introduce more.

| Token             | Value      | Used on                                    |
|-------------------|-----------|---------------------------------------------|
| `--cr-rotate-1`    | `-1.2deg` | `<hr>`, `.cr-marker-bar--short`, `.cr-card`, callout label |
| `--cr-rotate-2`    | `1.5deg`  | `.cr-marker-bar`                            |
| `--cr-rotate-neg`  | `-2.5deg` | `.cr-tape`, `.cr-chip`, stream-item avatar  |
| `--cr-rotate-neg2` | `2.8deg`  | adjacent `.cr-chip + .cr-chip` (alternates) |

**Why four?** More than four reads as chaos. The asymmetry feels hand-applied because the values cluster near zero (-2.8 to +2.8) but are deliberate. Body text, headings, tables, figures, and reading containers all stay at 0.

**The rule:** rotation lives on accents, not content. If you'd put a rectangular border around it (a card, a tape label, a chip), it can rotate. If it's prose, a heading, a list, a table, or a figure with a caption — it stays upright.

---

## The shadow vocabulary

Three hard, one inset, three soft. That's it.

| Token              | Definition                              | Where it lives                          |
|--------------------|-----------------------------------------|------------------------------------------|
| `--cr-shadow-hard`   | `4px 4px 0 var(--cr-ink)`              | callout, accent-block, button default, pre |
| `--cr-shadow-hard-2` | `6px 6px 0 var(--cr-ink)`              | card                                    |
| `--cr-shadow-marker` | `0 -0.4em 0 inset var(--cr-marker)`     | reserved for inline highlight effects   |
| `--cr-shadow-sm`     | `0 1px 2px rgba(36,28,74,0.06)`         | chip soft drop, subtle UI lift          |
| `--cr-shadow-md`     | `0 4px 12px -2px rgba(36,28,74,0.10)`   | reserved for legacy components          |
| `--cr-shadow-lg`     | `0 10px 30px -10px rgba(36,28,74,0.25)…` | reserved for legacy components          |

**Hard shadows have no blur and no opacity below 100%.** They are the photocopier idiom. Soft shadows exist only for cases where a hard shadow would dominate (chips, hover lifts) — never for primary depth on a card or callout.

**In dark mode**, hard shadows recolor to `--cr-selective-yellow` so the zine signature stays visible against the photocopier-black surface.

---

## Z-index conventions

The system uses very few z-index values. They cluster at three altitudes:

| Range    | Used for                                                   |
|----------|------------------------------------------------------------|
| 0 (default) | All component layout. Hard shadows do not need z-index. |
| 1–9      | Hero overlays (halftone over fiber background)              |
| 10–99    | Floating UI inside a section (sticky table-of-contents, in-page tooltips) |
| 100–999  | Reserved for site-chrome (skip link uses 10000, set in components.css) |
| 10000+   | Skip link, modal scrim if added later                       |

**Don't stack rotation + z-index for depth.** Hard shadows already provide visual layering. If you find yourself wanting `z-index: 5` to "lift" a card above its neighbors — use `--cr-shadow-hard-2` instead.

---

## Layering patterns

A handful of tested combinations. Use these.

### Tape on card

A `.cr-tape` floated on top of a `.cr-card` reads as "I scribbled this label and stuck it on." Use HTML order — the tape is a sibling that comes before the card content visually but is part of the same Group block.

```html
<div class="cr-card">
  <span class="cr-tape">draft</span>
  <h3>Section heading</h3>
  <p>Card content…</p>
</div>
```

The card rotates `-1.2deg`, the tape rotates `-2.5deg`. The 1.3-degree mismatch is the trick — same direction, different angle, like real tape applied to real paper.

### Sparkles in hero margin

The `.cr-sparkle--margin` modifier makes a `<span aria-hidden="true">✦</span>` decorative asterisk in the hero margin. Position is up to the layout — typically absolute-positioned within `.cr-hero__inner`.

```html
<section class="cr-hero">
  <div class="cr-hero__inner">
    <span class="cr-sparkle cr-sparkle--margin" aria-hidden="true" style="top: 2rem; right: 4rem;">✦</span>
    <h1 class="cr-hero__display">…</h1>
  </div>
</section>
```

Always `aria-hidden="true"`. Sparkles are decoration, not content. Equalize Digital warnings on these are safe to dismiss via Ignore (they're correctly implemented decorative SVGs).

### Marker-bar between sections

A `.cr-marker-bar` between sections does the work of a horizontal rule but with rotation and weight. Don't combine with `<hr>` — the element default already styles `<hr>` as a marker stripe at the page level. Use `.cr-marker-bar` for explicit, deliberate section dividers in marketing/landing.

```html
<section>…</section>
<div class="cr-marker-bar"></div>
<section>…</section>
```

`.cr-marker-bar--short` (8rem wide) is for in-section breaks. The default full-width version is for major dividers.

### Chip pairs alternate rotation

Adjacent `.cr-chip + .cr-chip` selectors alternate rotation: first chip at `-2.5deg`, second at `+2.8deg`. Three chips look hand-applied because the eye reads the alternation as natural variance.

Don't override this with explicit per-chip rotations. Trust the cascade.

### Callout label as masking tape

`.cr-callout__label` is styled as a small tape badge on the callout. Use it for the kind/title of the callout:

```html
<aside class="cr-callout cr-callout--note">
  <span class="cr-callout__label">heads up</span>
  <p>Body of the note…</p>
</aside>
```

The label rotates `-1.2deg` against the callout's flat background — same rule as tape-on-card.

---

## Things to NOT do

- **Don't introduce new rotation values.** The four locked tokens are intentional.
- **Don't introduce new shadow values without naming them in `tokens.css` first.** Inline `box-shadow: 8px 8px 0 black` should not appear anywhere in components.
- **Don't combine soft and hard shadows on the same element.** Pick one.
- **Don't rotate prose, headings, tables, or figures.** Rotation lives on accents.
- **Don't stack three or more rotated layers on top of each other.** Two is the max — typically tape-on-card or chip-on-stream-item.
- **Don't use blur radius > 0 on accent shadows.** That breaks the photocopier idiom.
- **Don't auto-apply rotation to body content.** Decoration in margins, calm in measure.
- **Don't use `transform: translate` for resting state on cards/callouts.** That's reserved for hover lift on stream-item and "press" effect on buttons.

---

## Reduced-motion behavior

All rotation transforms are static (no animation), so they survive `prefers-reduced-motion: reduce`. The reduced-motion block in `tokens.css` zeroes out animation-duration and transition-duration globally — but `transform: rotate(N)` without animation is unaffected. Cards, chips, and tape stay rotated.

What does change: hover lifts on stream-item, the press transform on buttons. Both transitions get neutralized when the user prefers reduced motion. The visual identity stays; the motion stops.
