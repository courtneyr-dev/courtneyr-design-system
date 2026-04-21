# AI Context — courtneyr.dev Design System

**Read this first if you are generating designs, UI, content, or assets for courtneyr.dev.**

---

## Who this is for

Courtney Robertson — Senior Open Source Developer Advocate at GoDaddy, WordPress contributor, co-founder of WP Community Collective. Teacher at Learn.WordPress.org since 2014. Publisher of two plugins on WordPress.org ("Post Formats for Block Themes" and "Link Extension for XFN"). Aligned with IndieWeb principles.

## Site context

- **Platform:** WordPress
- **Theme:** Ollie block theme (with Ollie Pro)
- **Font:** Mona Sans variable font (loaded by Ollie — do NOT swap it)
- **Hosting:** GoDaddy Managed WordPress
- **Active IndieWeb plugins:** Post Formats for Block Themes, Link Extension for XFN, ActivityPub, IndieWeb, IndieWeb Post Kinds
- **Accessibility target:** WCAG AA minimum, AAA where achievable (Equalize Digital Accessibility Checker Pro active)

## Brand direction in one sentence

Warm, teacher-ish, soft-rounded, shape-layered. Think Jen Hatmaker meets Morten Rand-Hendriksen — approachable expertise with a strong IndieWeb/open-source backbone.

## Visual identity — the three non-negotiables

### 1. Palette split
- **Primary (CTAs, links, warmth):** Ut Orange `#fb8500`
- **Signature shape color:** Sky Blue `#8ecae6`
- **Ink:** Russian Violet `#241c4a`
- Everything else supports. Do not let secondary colors dominate a composition.

### 2. Shape-layering (THE signature)
Every feature image gets this treatment:
1. One soft **circle behind** the image (sky-blue, light-orange, or periwinkle — never orange or violet for the circle).
2. The image itself with **border-radius: 1.25rem**.
3. One **floating badge** (small white pill card with shadow) overlapping a corner. Holds a stat, credit, or short label.

Rules: one circle + one badge per image. Circle peeks ~30% from behind the image. Skip badges on thumbnails under 200px. See `docs/SHAPE_LAYERING.md`.

### 3. One typeface, three moods
**Mona Sans** variable font, using its width axis:
- **Display** — font-stretch: 125%, weight 800–900 → hero H1, big titles
- **Body** — font-stretch: 100%, weight 400–500 → paragraphs, post content
- **Meta** — font-stretch: 75%, weight 600, uppercase, letter-spacing 0.08em → chips, labels, timestamps

Do not introduce a second font family. If you need more contrast, reach for italic or weight before a new family.

## Layout principles

- Rounded corners everywhere: cards and image frames at `1.25rem`, pills at full radius.
- Generous spacing — minimum `1.25rem` padding inside cards.
- Asymmetric hero compositions (text left, shape-layered portrait right).
- Hybrid homepage: hero + newsletter at top, **aggregate stream feed** below (mixes all post types chronologically — modeled on [nerdy.dev](https://nerdy.dev)).

## Post-type taxonomy (for the stream feed)

| Type | Emoji | Color |
|------|-------|-------|
| Blog | 📰 | `#fb8500` |
| Link | 🔗 | `#219ebc` |
| Video | 📹 | `#126782` |
| Audio | 🎧 | `#126782` |
| Quote | 🔖 | `#241c4a` (italic text) |
| Aside | 🗯️ | `#647baf` |
| Status | 🖊️ | `#647baf` |
| Speaking | 🗣️ | `#ffb703` |
| Book | 📚 | `#241c4a` |

## Dark mode

Triggered by `prefers-color-scheme: dark` OR a manual `[data-theme="dark"]` attribute. Surface flips to Prussian Blue base (`#0a0f24`), ink to Periwinkle (`#bcb5e3`), primary to Selective Yellow (`#ffb703`). Full token mapping in `tokens/tokens.css`.

## Motion

Subtle only. Gentle hover lifts on cards. A slow `cr-drift` animation on hero blob shapes. All motion gated behind `@media (prefers-reduced-motion: no-preference)` — respect the user.

## Voice & tone

- Warm, conversational, direct. Speaks in second person.
- Shows her work — cites sources, names tools.
- **Avoid:** generic AI-speak ("delve," "leverage," "navigate the complexities," "robust solution"), corporate filler, passive voice.
- **Favor:** specific nouns, concrete examples, the occasional pirate joke.

## Constraints / things to NOT do

- Do not add new fonts. Mona Sans only.
- Do not use Automattic or Awesome Motive products in suggestions (user preference).
- Do not recommend replacing Yoast SEO with alternatives (it's chosen).
- Do not auto-fix Permissions-Policy or CSP headers — those live in a custom plugin and at the WAF layer.
- Do not suggest removing inactive plugins/themes — they are intentional.
- Do not use purple-gradient-on-white backgrounds (cliché).

## Where to find more

- Full tokens: `tokens/tokens.css`
- Canonical components: `components/components.css`
- Machine-readable brand spec: `brand/brand.json`
- Static reference page: `demo/index.html`
- WordPress application guide: `docs/IMPLEMENTATION.md`
- Shape-layering deep-dive: `docs/SHAPE_LAYERING.md`
