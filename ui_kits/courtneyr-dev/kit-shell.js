// kit-shell.js — sidebar injection + theme toggle for every UI kit page.
// Each page sets <body data-kit-page="..."> with one of the slugs below;
// the sidebar marks that slug aria-current.
//
// Theme handling: prefers OS color-scheme by default, but if the user clicks
// the toggle in the sidebar, that choice is persisted in localStorage and
// overrides OS pref via a [data-theme="dark"|"light"] attribute on <html>.
// The pre-paint inline script in each page's <head> reads localStorage and
// applies the attribute BEFORE CSS evaluates so there is no flash.
(function () {
  const PAGES = [
    { group: 'Brand', items: [
      { slug: 'index',     label: 'Cover',           href: 'index.html' },
      { slug: 'tokens',    label: 'Tokens',          href: 'tokens.html' },
      { slug: 'typography',label: 'Typography',      href: 'typography.html' },
      { slug: 'layering',  label: 'Layering',        href: 'layering.html' },
    ]},
    { group: 'Components', items: [
      { slug: 'buttons',     label: 'Buttons',         href: 'buttons.html' },
      { slug: 'chips',       label: 'Chips',           href: 'chips.html' },
      { slug: 'cards',       label: 'Cards & callouts',href: 'cards.html' },
      { slug: 'hero',        label: 'Hero',            href: 'hero.html' },
      { slug: 'stream',      label: 'Stream',          href: 'stream.html' },
      { slug: 'tape',        label: 'Tape & sparkles', href: 'tape.html' },
      { slug: 'icons',       label: 'Icon set',        href: 'icons.html' },
      { slug: 'forms',       label: 'Forms',           href: 'forms.html' },
      { slug: 'long-form',   label: 'Long-form',       href: 'longform.html' },
    ]},
  ];

  const STORAGE_KEY = 'cr-kit-theme';

  function currentMode() {
    const explicit = document.documentElement.getAttribute('data-theme');
    if (explicit) return explicit;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setMode(mode) {
    if (mode === 'dark' || mode === 'light') {
      document.documentElement.setAttribute('data-theme', mode);
      try { localStorage.setItem(STORAGE_KEY, mode); } catch (e) {}
    } else {
      document.documentElement.removeAttribute('data-theme');
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    }
  }

  function buildSidebar(activeSlug) {
    const aside = document.createElement('aside');
    aside.className = 'kit-sidebar';
    aside.setAttribute('aria-label', 'Kit navigation');

    aside.innerHTML = `
      <a class="kit-sidebar__brand" href="index.html">courtneyr.dev</a>
      <div class="kit-sidebar__tagline">UI Kit · v2.0</div>
      ${PAGES.map(grp => `
        <div class="kit-sidebar__group">${grp.group}</div>
        <ul class="kit-sidebar__nav">
          ${grp.items.map(item => `
            <li><a href="${item.href}"${item.slug === activeSlug ? ' aria-current="page"' : ''}>${item.label}</a></li>
          `).join('')}
        </ul>
      `).join('')}
      <div class="kit-sidebar__theme">
        <button type="button" class="kit-theme-toggle" data-cr-theme-toggle aria-pressed="false">
          <span class="kit-theme-toggle__label">View mode</span>
          <span class="kit-theme-toggle__state"></span>
        </button>
      </div>
    `;
    return aside;
  }

  function syncToggle(button) {
    if (!button) return;
    const mode = currentMode();
    const next = mode === 'dark' ? 'light' : 'dark';
    button.setAttribute('aria-pressed', mode === 'dark' ? 'true' : 'false');
    button.setAttribute('aria-label', `Switch to ${next} mode (currently ${mode})`);
    const state = button.querySelector('.kit-theme-toggle__state');
    if (state) state.textContent = `Switch to ${next}`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const slug = document.body.getAttribute('data-kit-page') || '';
    const shell = document.querySelector('.kit-shell');
    if (!shell) return;
    shell.prepend(buildSidebar(slug));

    const button = document.querySelector('[data-cr-theme-toggle]');
    syncToggle(button);
    if (button) {
      button.addEventListener('click', () => {
        const next = currentMode() === 'dark' ? 'light' : 'dark';
        setMode(next);
        syncToggle(button);
      });
    }

    // If user hasn't picked, keep tracking OS changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (!document.documentElement.getAttribute('data-theme')) syncToggle(button);
    });
  });
})();
