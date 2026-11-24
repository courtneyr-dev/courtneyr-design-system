import wordmark from '../brand/wordmark.svg?raw';
import icons from '../components/icons.svg?raw';
import { iconSymbols } from './lib/foundations.js';

export default { title: 'Foundations/Brand' };

export const Wordmark = {
  render: () => `
    <h1>Wordmark</h1>
    <p><code>brand/wordmark.svg</code> uses Rock Salt paths. The site paints them with the current theme’s ink color.</p>
    <figure class="fd-wordmark">${wordmark}</figure>`,
};

export const Icons = {
  render: () => {
    const sprite = icons.replace(/<\?xml[^>]*\?>/, '');
    const figures = iconSymbols(icons)
      .map(
        (s) => `
        <figure data-icon="${s.id}">
          <svg class="fd-icon" aria-hidden="true" focusable="false"><use href="#${s.id}"></use></svg>
          <figcaption>${s.title}<br><code>${s.id}</code></figcaption>
        </figure>`,
      )
      .join('');
    return `
      ${sprite}
      <h1>Post-type icons</h1>
      <p>Every <code>&lt;symbol&gt;</code> in <code>components/icons.svg</code>. Icons draw with
      <code>currentColor</code> strokes, styled the same way as <code>.cr-icon-avatar</code> in
      <code>Speaking.html</code>.</p>
      <div class="fd-icons">${figures}</div>`;
  },
};
