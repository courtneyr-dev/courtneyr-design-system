import tokensCss from '../tokens/tokens.css?raw';
import { colorTokens } from './lib/foundations.js';
import { contrastAgainst } from './lib/contrast.js';
import { escapeHtml, floor2 } from './lib/html.js';

export default { title: 'Foundations/Color' };

const LIGHT_GRAY = '--cr-light-gray';

export const Palette = {
  render: () => {
    const tokens = colorTokens(tokensCss);
    const sections = Map.groupBy(tokens, (t) => t.section);
    const groups = [...sections]
      .map(
        ([title, list]) => `
        <h2>${escapeHtml(title)}</h2>
        <ul class="fd-swatches">
          ${list
            .map(
              (t) => `
            <li data-color-token="${t.name}">
              <span class="fd-swatch" style="background: var(${t.name})" aria-hidden="true"></span>
              <code>${t.name}</code>
              <span>${escapeHtml(t.value)}</span>
              ${t.value === t.resolved ? '' : `<span>${escapeHtml(t.resolved)}</span>`}
            </li>`,
            )
            .join('')}
        </ul>`,
      )
      .join('');
    return `
      <h1>Color tokens</h1>
      <p>Every color custom property in <code>tokens/tokens.css</code>, read from the file at build time.
      The swatch paints <code>var(--name)</code>, so it shows the live light-mode value.
      <span data-color-count="${tokens.length}">${tokens.length}</span> tokens.</p>
      ${groups}`;
  },
};

export const LightGrayContrast = {
  name: 'Light gray contrast',
  render: () => {
    const tokens = colorTokens(tokensCss);
    const gray = tokens.find((t) => t.name === LIGHT_GRAY).resolved;
    const rows = contrastAgainst(gray, tokens)
      .map((r) => {
        const sample = r.normal
          ? `<span class="fd-sample" style="color: ${r.hex}">Sample text</span>`
          : r.large
            ? `<span class="fd-sample fd-sample--large" style="color: ${r.hex}">Large text</span>`
            : 'No text use';
        return `
        <tr>
          <td>${sample}</td>
          <td><code>${r.hex}</code></td>
          <td>${r.names.map((n) => `<code>${n}</code>`).join(' ')}</td>
          <td>${floor2(r.ratio)}:1</td>
          <td>${r.normal ? 'Pass' : 'Fail'}</td>
          <td>${r.large ? 'Pass' : 'Fail'}</td>
        </tr>`;
      })
      .join('');
    return `
      <h1>Light gray <code>${gray}</code> contrast</h1>
      <p>Each opaque color token as text on <code>${LIGHT_GRAY}</code>. WCAG 2.2 AA needs 4.5:1 for normal text
      and 3:1 for large text (24px, or 18.66px bold). Ratios are rounded down.</p>
      <table class="fd-table">
        <thead><tr><th scope="col">Sample on light gray</th><th scope="col">Text color</th><th scope="col">Tokens</th>
        <th scope="col">Ratio</th><th scope="col">Normal text</th><th scope="col">Large text</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>`;
  },
};
