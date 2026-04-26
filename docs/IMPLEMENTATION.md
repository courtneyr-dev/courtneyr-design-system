# Implementation — Applying this in Ollie + WordPress

How to wire this design system into the live courtneyr.dev WordPress site.

## Current state

The design system lives in its own repo (`courtneyr-dev/courtneyr-design-system`), separate from the WordPress site repo (`courtneyr-dev/courtneyr-dev-site`). v2.0 is reference material — mockups, docs, tokens — not yet deployed to the live site.

Wiring it in is a separate task tracked in Things → Blog area as "Ollie Child Theme & Git Backup."

---

## Where to put the CSS

Two paths. Pick one.

### Path A · Ollie's Manage CSS Classes (fastest)

1. WordPress admin → **Appearance → Editor → Manage CSS Classes** → *Global Styles* (or the equivalent panel in the Ollie UI).
2. Create a class group called **"Brand Tokens"** and paste the contents of `tokens/tokens.css`.
3. Create a second group called **"Brand Components"** and paste `components/components.css`.
4. Save.

**Pros:** zero file edits, survives Ollie updates, fast iteration.
**Cons:** lives in the database (not in version control), lost if you ever move off Ollie Pro.

This is fine for **iterating** the design system on the live site. Once the design feels right, move to Path B.

### Path B · Ollie Child Theme (recommended long-term)

This is already on the roadmap ("Ollie Child Theme & Git Backup" in Things). Here's how the design system slots in:

1. Create `/wp-content/themes/ollie-child/` with a `style.css` header pointing to Ollie as parent:

   ```css
   /*
    Theme Name:   Ollie Child
    Template:     ollie
    Description:  Child theme for courtneyr.dev with brand tokens and components.
    Version:      1.0.0
   */
   ```

2. Add a `functions.php` that enqueues `tokens.css` and `components.css`:

   ```php
   <?php
   add_action( 'wp_enqueue_scripts', function() {
     $theme_uri = get_stylesheet_directory_uri();
     wp_enqueue_style( 'cr-tokens',     "$theme_uri/assets/css/tokens.css",     [],            '2.0.0' );
     wp_enqueue_style( 'cr-components', "$theme_uri/assets/css/components.css", ['cr-tokens'], '2.0.0' );
   });
   ```

3. Copy `tokens/tokens.css` and `components/components.css` into `ollie-child/assets/css/`.

4. Create `ollie-child/theme.json` and merge the palette fragment from `brand/theme.json.fragment.json` into its `settings.color.palette` array (see next section).

5. Add `ollie-child/` to the `courtneyr-dev/courtneyr-dev-site` repo. Push, let CI/CD deploy via `gd-wordpress-deployer`.

6. Verify styles persist after a theme switch and back.

---

## Getting brand colors into the WordPress color picker

Open `brand/theme.json.fragment.json`, copy the `settings.color.palette` array, and merge it into your child theme's `theme.json`:

```json
{
  "$schema": "https://schemas.wp.org/trunk/theme.json",
  "version": 3,
  "settings": {
    "color": {
      "defaultPalette": false,
      "palette": [
        /* paste the array from theme.json.fragment.json here */
      ]
    }
  }
}
```

After saving, every color picker in WordPress (backgrounds, text, buttons) shows your palette with names like "Ut Orange" and "Russian Violet" — so other contributors (or future-you) stay on-brand without remembering hex codes.

---

## Building the hybrid homepage

Your current homepage keeps its hero and newsletter sections. Below them, add a **Query Loop block** configured like this:

- **Post type:** All (or use a custom query if you want to include IndieWeb Post Kinds)
- **Order by:** Date, descending
- **Posts per page:** 10–15
- **Advanced → CSS classes:** `cr-stream`

Inside the Query Loop's post template, replace the default layout with a Group block using class `cr-stream-item`. Inside that:

- Avatar: Emoji block (or custom block showing the post-format/kind icon) with class `cr-stream-item__avatar`
- Body: Group with class `cr-stream-item__body`, containing:
  - Meta row (Group with `cr-stream-item__meta`): post-type chip + post date
  - Title: Post Title block with class `cr-stream-item__title`
  - Tags: Post Terms block with class `cr-stream-item__tags`

For the post-type chip, key off the Post Format or Post Kind taxonomy and add the right modifier class:

- `cr-chip cr-chip--blog`
- `cr-chip cr-chip--link`
- `cr-chip cr-chip--video`
- `cr-chip cr-chip--audio`
- `cr-chip cr-chip--quote`
- `cr-chip cr-chip--aside`
- `cr-chip cr-chip--status`
- `cr-chip cr-chip--speaking`
- `cr-chip cr-chip--book`

Optionally combine with `cr-chip--solid` for filled chips or `cr-chip--outline` for transparent ones.

For per-type stream items (e.g. visually distinguishing video posts), add `cr-stream-item--blog`, `--video`, etc. as a modifier on the item's Group block.

---

## Hero blocks for landing pages

Use `.cr-hero` as the wrapper (Group block, Advanced → Additional CSS class), `.cr-hero__inner` on a nested Group for the centered content. Inside:

- Hero display heading: Heading block, level H1, class `cr-hero__display` — for short Rock Salt phrasing
- OR hero accent heading: Heading block, level H1, class `cr-hero__title` — for longer Roboto Slab phrasing
- Lead paragraph: Paragraph block, class `cr-hero__lead`

Add `.cr-marker-bar` between sections via an HR block or an empty Group block with the class.

---

## Reading/post layout

For long-form posts, wrap the content in a Group with class `cr-reading`. This caps the measure at 65ch and applies the calm-with-zine-accents container.

Use `.cr-toc` as a Group block class for the table of contents at the top of the post. The TOC heading goes in a Paragraph block with class `cr-toc__heading`.

---

## CTAs, buttons

Use the WordPress Button block with class `cr-button cr-button--primary` (or `--secondary`, `--outline`, `--soft`). For the primary call-to-action on a hero or section, `.cr-cta` is an alias for `.cr-button--primary`.

The default `<button>` element (any submit button on a form) is already styled by `tokens.css` element defaults — no class needed.

---

## Dark mode

Works out of the box via `@media (prefers-color-scheme: dark)`. Surface flips to photocopier black, ink to printer ivory, hard shadows recolor to selective yellow.

To give users a manual toggle, add a small JS that toggles `data-theme="dark"` on the `<html>` element. The semantic tokens already accept this, but the manual toggle isn't currently implemented at the JS layer.

---

## The Perfmatters Rock Salt question

courtneyr.dev uses **Perfmatters** for conditional script/style loading.

- **Rock Salt** is used only by `.cr-display` and `.cr-hero__display`. The wordmark itself is all-paths SVG — no font dependency.
- So Rock Salt only needs to load on pages that use those classes (homepage, marketing, hero sections).
- Use Perfmatters Script Manager to scope the Google Fonts request for Rock Salt accordingly.
- Roboto Slab and Barlow load site-wide (every page uses them).

---

## Custom plugin: `font-display-swap-site-performance-security`

The custom plugin handles delivery-layer concerns:
- `font-display: swap` enforcement
- `Permissions-Policy` header
- CSP via `send_headers` hook

It does not need to be touched for this design system. The plugin handles delivery; the design system handles visual concerns.

If CSP gets tightened in a future pass, the design system's use of `<link rel="stylesheet" href="https://fonts.googleapis.com/...">` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` will need matching entries in `style-src` and `font-src`. The current CSP already includes both.

---

## Accessibility re-test

After deploying, run:

1. **Equalize Digital Accessibility Checker Pro** in the editor on representative pages (home, blog post, about). Expect zero issues — the CSS was built to AA contrast minimums. Decorative SVG icons with `aria-hidden="true"` may trigger warnings; those are correct implementation and safe to dismiss via Ignore.
2. **WAVE** browser extension on the live site.
3. **Lighthouse / PageSpeed Insights** for performance regression check. The design system adds CSS; verify it doesn't push the LCP past target.

---

## What's deferred to v2.1+

- Real-site deployment via Path B (child theme + Git)
- Equalize Digital re-test on a styled page
- Perfmatters Script Manager scoping for Rock Salt
- A demo landing page for the design system itself (`demo/index.html` refresh)
- Cleanup of `demo/BrandSystem.jsx` — still references shape-layering and stale Mona Sans
- `theme.json.fragment.json` expansion to a full Ollie-compatible fragment (currently palette + font-families only)
