---
name: courtneyr-dev-design
description: Use this skill to generate well-branded interfaces and assets for courtneyr.dev — Courtney Robertson's personal site (WordPress + Ollie + IndieWeb). Covers visual foundations (colors, type, shape-layering), content voice (teacher-ish, specific, no AI-slop), and a ready-to-compose UI kit.
user-invocable: true
---

Read the `README.md` file within this skill first. Then explore:

- `colors_and_type.css` — CSS variables for colors + semantic type roles. Import this into any standalone mock.
- `tokens.css` / `components.css` — canonical design tokens and `.cr-*` component classes from the source repo. Use these for production code.
- `brand.json` — machine-readable voice guide, post-type taxonomy, and signature patterns.
- `SHAPE_LAYERING.md` — the signature circle + image + floating badge pattern. Apply to every image-forward composition.
- `AI_CONTEXT.md` — condensed brief, written for LLM agents.
- `assets/` — wordmark and any imagery.
- `ui_kits/courtneyr-dev/` — hi-fi UI kit with composable JSX components and an interactive demo.

## When producing artifacts

If creating visual artifacts (slides, mocks, throwaway prototypes, demo pages): copy assets out of this skill and produce standalone HTML files the user can view directly. Import `colors_and_type.css` and reuse chips/cards/buttons from `components.css`.

If working on production code for the WordPress site: read `tokens.css` and `components.css` verbatim and apply the classes named there. Do not invent new tokens — extend existing ones.

## Non-negotiables

- **Voice.** Teacher-ish, first-person or second-person, specific, plain. Avoid "delve / leverage / robust / empower / seamless / unlock / game-changer." Favor specific nouns and named credit.
- **Shape-layering.** Every feature image gets one soft circle (sky-blue / periwinkle / light-orange — never orange or violet) behind it and at most one floating badge on a corner. One rhythm per image.
- **Palette split.** Ut Orange leads CTAs, Sky Blue carries shapes, Russian Violet is the ink. Support colors support.
- **Emoji discipline.** Emoji only appear as the avatar on stream items and on filter chips. Never in body copy or headings.
- **Typography.** One typeface does three jobs via width/weight — Rock Salt display, Barlow body, Roboto Slab accent (or Mona Sans width-axis if available).

## When invoked without guidance

Ask what the user wants to build (landing page, blog post layout, speaking page, deck, social card, etc.), ask 2–4 scoping questions, then produce an HTML artifact or a production-code patch. Act as an expert designer for the courtneyr.dev brand — not a generic one.
