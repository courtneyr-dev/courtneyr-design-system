// kit-shell.js — sidebar injection for every UI kit page.
// Each page sets <body data-kit-page="..."> with one of the slugs below;
// the sidebar marks that slug aria-current.
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
    `;
    return aside;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const slug = document.body.getAttribute('data-kit-page') || '';
    const shell = document.querySelector('.kit-shell');
    if (!shell) return;
    shell.prepend(buildSidebar(slug));
  });
})();
