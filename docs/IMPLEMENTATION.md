# Implementation — Applying this in Ollie + WordPress

## Where to put the CSS

You have two paths. Pick one:

### Path A · Ollie's Manage CSS Classes (fastest)

1. WordPress admin → **Appearance → Ollie** → *Manage CSS Classes* (or the equivalent panel in the Ollie UI).
2. Create a new class group called **"Brand Tokens"** and paste the contents of `tokens/tokens.css`.
3. Create a second group called **"Brand Components"** and paste `components/components.css`.
4. Save.

Pros: zero file edits, survives Ollie updates.
Cons: these lose if you ever move off Ollie Pro.

### Path B · Ollie Child Theme (recommended long-term)

This is already on your roadmap ("Ollie Child Theme & Git Backup"). Here's how the design system slots in:

1. Create `/wp-content/themes/ollie-child/` with a `style.css` header pointing to Ollie as parent.
2. Add a `functions.php` that enqueues `tokens.css` and `components.css`:
   ```php
   <?php
   add_action( 'wp_enqueue_scripts', function() {
     $theme_uri = get_stylesheet_directory_uri();
     wp_enqueue_style( 'cr-tokens',      "$theme_uri/assets/css/tokens.css",      [], '1.0.0' );
     wp_enqueue_style( 'cr-components',  "$theme_uri/assets/css/components.css",  ['cr-tokens'], '1.0.0' );
   });
   ```
3. Copy `tokens/tokens.css` and `components/components.css` into `ollie-child/assets/css/`.
4. Create `ollie-child/theme.json` and merge the palette fragment from `brand/theme.json.fragment.json` into its `settings.color.palette` array.

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

For the post-type chip, you can key off the Post Format or Post Kind taxonomy and add the right modifier class (`cr-chip--blog`, `cr-chip--link`, etc.).

## Applying shape-layering to images

On any Image block:

1. Click the image to select it.
2. Right sidebar → *Block* tab → scroll to *Advanced* → **Additional CSS class(es)**.
3. Add one of:
   - `cr-shape-frame` — default sky-blue circle
   - `cr-shape-frame cr-shape-frame--orange` — light-orange circle
   - `cr-shape-frame cr-shape-frame--periwinkle` — periwinkle circle

That's it. The circle appears behind the image automatically.

For floating badges, use a Group block containing the Image and a small HTML/Paragraph block positioned absolutely. The Group itself needs `position: relative` — which you get by adding class `cr-shape-frame` to the Group.

## Dark mode

Works automatically via `prefers-color-scheme: dark` — when a visitor's OS is in dark mode, the palette flips.

If you want to offer a manual toggle (not required), add a small script that sets `data-theme="dark"` or `data-theme="light"` on `<html>` based on a button click, and persists in `localStorage`.

## Testing checklist

After deploying:

- [ ] Run Equalize Digital Accessibility Checker on the homepage — ensure 0 errors.
- [ ] Toggle OS dark mode and refresh — verify the dark palette activates.
- [ ] Check contrast: russian-violet text on cream should show AAA; ut-orange on cream should show AA Large for headings (18pt+ or 14pt bold); do not use orange for body text.
- [ ] `curl -sI https://courtneyr.dev | grep -i content-security` — confirm your custom CSP plugin still serves the header (shape-layering uses CSS only, no inline scripts, so it shouldn't break CSP).
- [ ] View on mobile (under 640px) — hero portrait should stack below text; shape-layering should remain intact.
- [ ] `prefers-reduced-motion` — enable it in your OS and verify the `cr-drift` animation on hero blobs stops.

## Things to keep in mind

- The design system expects three fonts to be available: **Rock Salt**, **Barlow**, and **Roboto Slab**. On courtneyr.dev these are loaded via Ollie's font library. If you ever move off Ollie, load all three from Google Fonts — the demo/index.html shows the correct `<link>` tag with all three families combined into one request.
- `color-mix()` in the stream card avatar background requires a modern browser — fine for 97%+ of visitors but if you need IE or very old browser support, replace with a solid hex.
- The shape-layering `::before` uses `z-index: -1` on a container that has `isolation: isolate` — if you wrap it inside another stacking context with its own `z-index`, the circle might disappear. Fix: raise the stacking context of the parent, or remove `isolation: isolate` from `.cr-shape-frame`.

## Deployment order (recommended)

1. Commit and push the child theme scaffolding.
2. Deploy via your existing GitHub Actions workflow (`gd-wordpress-deployer`).
3. Activate the child theme in WordPress admin.
4. Test one page first (homepage hero) before rolling out elsewhere.
5. Once confirmed, add `cr-shape-frame` to key images across the site.
6. Then build the aggregate stream on the homepage.
