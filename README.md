# courtneyr.dev — Brand Design System

Personal site with the voice of a patient teacher and the visual confidence of a hand-pasted zine. WordPress + IndieWeb + AA contrast.

[courtneyr.dev](https://courtneyr.dev) is the personal site of Courtney Robertson — Senior Open Source Developer Advocate at GoDaddy, WordPress contributor, co-founder of WP Community Collective.

![Built for WordPress + Ollie](https://img.shields.io/badge/built_for-WordPress_%2B_Ollie-fb8500?style=flat-square) ![Version 2.4.0](https://img.shields.io/badge/version-2.4.0-241c4a?style=flat-square)

---

## What's in here

```
courtneyr-design-system/
├── .github/workflows/              ← storybook-pages.yml builds, checks and publishes storybook.courtneyr.dev
├── .storybook/                     ← composition-host Storybook config; composed.json lists the composed Storybooks
├── stories/                        ← foundations stories, read from the files below at build time
├── scripts/                        ← version check, contrast table, Storybook a11y and palette tests, Pages build and check
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

This repo hosts the composition Storybook for courtneyr.dev. The `Storybook Pages` workflow can publish it to storybook.courtneyr.dev, but GitHub Pages is off and no DNS record exists yet. See [Publish to storybook.courtneyr.dev](#publish-to-storybookcourtneyrdev).

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

`.storybook/composed.json` lists every Storybook the host composes. `.storybook/main.js` turns it into `refs`, and `scripts/build-pages.mjs` reads it to build the ones published from here. Each entry is one of two kinds:

- **Built here.** `build` names a public repo, a full commit SHA and the folder that holds its Storybook. `path` is where it lands on storybook.courtneyr.dev. The build runs `npm ci --ignore-scripts` and `npm run build-storybook` in that folder. The ref URL is the relative `path`, so the same `dist/` composes on any host.
- **Published elsewhere.** `url` is the Storybook's own address, such as a plugin's `https://courtneyr-dev.github.io/<repo>/storybook/`. Add `"planned": true` while that URL doesn't serve a Storybook yet. The host leaves planned entries out, because a ref that fails to load shows "Something went wrong loading this Storybook" in the sidebar.

```json
{
  "id": "site",
  "title": "courtneyr.dev site",
  "path": "/site/",
  "build": {
    "repo": "courtneyr-dev/courtneyr-child",
    "sha": "2ae06b0cfee9ad3fdd6a2253201f5078314d799d",
    "dir": "storybook"
  }
}
```

To point a ref somewhere else for a local test, set `STORYBOOK_REF_URLS` to a JSON object of id and URL. An override also brings in a planned entry:

```sh
STORYBOOK_REF_URLS='{"post-formats":"http://localhost:6007"}' npm run storybook
```

### Add a Storybook

1. Add one entry to `.storybook/composed.json`. For a plugin that publishes its own Storybook, give its `url`. For a Storybook built here, give `build` and `path`, and update `sha` when you want a newer commit.
2. Run `npm run pages`. It fails if the new Storybook doesn't compose, fails axe, or has a broken link.
3. Open a pull request. Merging to `main` publishes the result once Pages is on.

Outpost and post-kinds-for-indieweb join the same way once their Storybooks publish at their `/storybook/` URLs.

---

## Publish to storybook.courtneyr.dev

`.github/workflows/storybook-pages.yml` runs on every push to `main` and on a manual run. It has two jobs:

1. **Build and check** (`contents: read`). It runs `npm run build:pages`, then `npm run test:pages`, and uploads `dist/` as the Pages artifact.
2. **Deploy to GitHub Pages** (`pages: write`, `id-token: write`, environment `github-pages`). It runs only on `main` and publishes the artifact. Until Pages is on, this job fails with "Ensure GitHub Pages has been enabled" and publishes nothing.

### What the build puts in dist/

`npm run build:pages` builds this repo's Storybook and copies it to `dist/`. For each built-here entry, it fetches the pinned commit into `.pages-work/<id>/`, builds that Storybook into `dist/<path>`, and writes `dist/CNAME`. GitHub ignores `CNAME` for sites published by a workflow. The custom domain comes from Settings > Pages.

| URL | Content |
|---|---|
| `https://storybook.courtneyr.dev/` | This repo's foundations stories, with every composed Storybook in the sidebar |
| `https://storybook.courtneyr.dev/site/` | The courtneyr-child site Storybook, built from the pinned commit |

### What the checks cover

`npm run test:pages` runs `npm run test:a11y` on this repo's stories, then `scripts/check-pages.mjs` on `dist/` served from a local port:

- **Composition.** It opens the host in Chrome, expands each ref in the sidebar, and fails unless the sidebar lists as many stories as the ref's `index.json`. Then it opens every ref story from the sidebar and fails unless each one finishes rendering inside the host.
- **axe on stories.** Every story in each Storybook built here, in light and dark mode, with the WCAG 2.0, 2.1 and 2.2 A and AA rules. A render that errors or throws fails too. A rule that a story turns off in its own `parameters.a11y.config.rules` stays off, the same as in that repo's own test, and the run prints each one. The courtneyr-child page stories turn off two rules and explain why on their Overview story. Storybooks published elsewhere run axe in their own repo.
- **axe on the Storybook UI.** The host page with every ref expanded, in light and dark mode. Storybook 10.6.6's own sidebar markup breaks three rules, listed in `KNOWN_IN_STORYBOOK_UI` with the reason for each. Any other violation fails, and so does a known one that stops occurring.
- **Links.** linkinator crawls the index and iframe pages of every Storybook in `dist/`, including CSS `url()` links. It sees static HTML and CSS only, not links inside rendered stories. It has no skip rules. If one is ever needed, give it a name and a reason, and match only the false failure.

### Run the same checks on your computer

The checks use the installed Google Chrome.

```sh
npm ci
npm run pages    # build:pages, then test:pages
python3 -m http.server 8080 --directory dist   # optional: browse the result at http://localhost:8080
```

### Go live

Courtney takes these steps. Each one is a public change.

1. If courtneyr.dev isn't a verified domain for the courtneyr-dev account yet, verify it in the account's Pages settings. Verification stops anyone else from claiming a subdomain.
2. In this repo, open **Settings > Pages**. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. On the same page, enter `storybook.courtneyr.dev` under **Custom domain** and click **Save**. Do this before the DNS record exists.
4. At the DNS provider, add a `CNAME` record for `storybook` that points to `courtneyr-dev.github.io`.
5. Remove the `do not merge` label and merge the pull request. The push to `main` starts the workflow. If the deploy job ran before Pages was on, open **Actions > Storybook Pages** and click **Run workflow** on `main`.
6. When the certificate is ready, select **Enforce HTTPS** in **Settings > Pages**. GitHub says this can take up to 24 hours.
7. Open `https://storybook.courtneyr.dev/` and `https://storybook.courtneyr.dev/site/`.

### Roll back

- To take the site down, open **Settings > Pages**, click the **...** menu next to **Your site is live at**, and select **Unpublish site**. The next successful workflow run publishes it again, so also open **Actions > Storybook Pages** and select **Disable workflow** from the **...** menu.
- To undo a bad publish, revert the commit on `main`. The push publishes the reverted build.
- To retire the domain, remove the DNS record first, then clear **Custom domain**. A record that points at GitHub Pages with no site claiming it lets someone else claim the subdomain.

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
