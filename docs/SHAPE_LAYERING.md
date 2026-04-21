# Shape-Layering — The Signature Pattern

The single visual move that makes this brand recognizable at a glance.

Inspired by the Airo AI Builder template preview (the circle-behind-image + floating trust badge pattern Courtney liked), tuned to this palette.

## The formula

For any feature image, hero portrait, or content that deserves visual emphasis:

```
   ╭─────────────────╮
   │  ◯ SOFT CIRCLE  │     ← sky-blue, light-orange, or periwinkle
   │  ┌───────────┐  │        offset so ~30% peeks out behind the image
   │  │   IMAGE   │  │     ← border-radius: 1.25rem
   │  │           │  │
   │  │           │  │
   │  └───────────┘  │
   │         ┌────┐  │     ← FLOATING BADGE on a corner
   │         │★ 11│  │        white card, shadow, small stat or label
   │         └────┘  │
   ╰─────────────────╯
```

One circle. One badge. That's the rhythm.

## Four variants

### 01 · Circle behind
A soft-blue (or light-orange) circle sits 40–60% offset behind the image. ~115% the size of the image frame. For standalone content images.

### 02 · Circle + floating badge
The signature composition. Circle behind, image centered, white pill badge overlapping the bottom-left or top-right corner. The badge holds a stat ("11 years teaching"), a credit ("Featured on WP Tavern"), or a label ("Core Contributor").

### 03 · Double blob
Two offset circles in different palette colors (e.g. periwinkle + light-orange). Used for hero section backgrounds without a specific subject image. The drift animation optionally applies here.

### 04 · Rectangular note card on corner
Variant where the floating element is a small rectangular card (rounded) rather than a pill. Holds a longer title or multi-line stat.

## Rules

### Do
- Use one circle + one badge per image. That is the whole pattern.
- Stick to **sky-blue**, **light-orange**, or **periwinkle** for the circle fill.
- Keep image corner-radius at `1.25rem` (20px).
- Offset circles so roughly 30% peeks out from behind the image.
- Layer on cream or white backgrounds. The pattern needs breathing room.

### Don't
- Stack more than two shapes behind a single image.
- Use **orange** or **russian-violet** as the big circle (too heavy — they dominate).
- Apply badge-overlap on thumbnails smaller than 200px — it clutters.
- Combine with heavy drop shadows on the image. The shape IS the depth.
- Use inside tight layouts with no padding. The circle needs room to peek.

## Implementation

The `.cr-shape-frame` utility in `components/components.css` handles the circle automatically using a `::before` pseudo-element. Wrap any image:

```html
<figure class="cr-shape-frame">
  <img src="courtney.jpg" alt="Courtney Robertson">
</figure>
```

To add a floating badge:

```html
<div class="hero-portrait" style="position: relative;">
  <figure class="cr-shape-frame cr-shape-frame--periwinkle">
    <img src="courtney.jpg" alt="Courtney Robertson">
  </figure>
  <div class="cr-float-badge" style="position: absolute; bottom: 0; left: -0.5rem;">
    <div class="cr-float-badge__icon">★</div>
    <div>
      <span class="cr-float-badge__label">Teaching WP since</span>
      <span>2014 · Learn.wp</span>
    </div>
  </div>
</div>
```

## In WordPress Block Editor (Ollie)

On any Image block:
1. Select the block.
2. Open *Block settings → Advanced → Additional CSS class(es)*.
3. Add `cr-shape-frame` (or `cr-shape-frame cr-shape-frame--orange` for the orange variant).

For floating badges, wrap the Image block and a Paragraph (or custom HTML block) inside a Group block, then use the Group block's Additional CSS Classes to position the badge absolutely over the image.

## Where it appears

- Homepage hero portrait
- Featured post images
- About page portrait
- Plugin showcase cards
- Speaking / podcast episode thumbnails (circle only, skip the badge at thumbnail size)

## Accessibility notes

- The decorative circle uses a `::before` with no text — screen readers ignore it.
- The floating badge contains real text content; ensure its contrast passes AA on its chosen background (white pill on cream = AAA).
- If the badge contains an icon like `★`, wrap it with `aria-hidden="true"` on the icon container when the adjacent text already conveys the meaning.
